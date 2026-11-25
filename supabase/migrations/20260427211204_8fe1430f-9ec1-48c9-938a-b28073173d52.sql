CREATE TYPE public.app_role AS ENUM ('candidate', 'customer');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

CREATE TABLE public.candidate_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE,
  first_name TEXT DEFAULT '',
  last_name TEXT DEFAULT '',
  email TEXT DEFAULT '',
  phone TEXT DEFAULT '',
  dob DATE,
  bio TEXT DEFAULT '',
  avatar_url TEXT DEFAULT '',
  city TEXT DEFAULT '',
  pincode TEXT DEFAULT '',
  address TEXT DEFAULT '',
  work_radius TEXT DEFAULT '',
  skills TEXT[] NOT NULL DEFAULT '{}',
  availability TEXT[] NOT NULL DEFAULT '{}',
  hourly_rate TEXT DEFAULT '',
  languages TEXT[] NOT NULL DEFAULT '{}',
  resume_url TEXT DEFAULT '',
  resume_summary TEXT DEFAULT '',
  work_experience JSONB NOT NULL DEFAULT '[]'::jsonb,
  education JSONB NOT NULL DEFAULT '[]'::jsonb,
  certifications TEXT[] NOT NULL DEFAULT '{}',
  portfolio_items JSONB NOT NULL DEFAULT '[]'::jsonb,
  verified BOOLEAN NOT NULL DEFAULT false,
  badges TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.customer_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE,
  business_name TEXT DEFAULT '',
  contact_person TEXT DEFAULT '',
  email TEXT DEFAULT '',
  phone TEXT DEFAULT '',
  business_type TEXT DEFAULT '',
  industry TEXT DEFAULT '',
  city TEXT DEFAULT '',
  pincode TEXT DEFAULT '',
  address TEXT DEFAULT '',
  description TEXT DEFAULT '',
  hiring_needs TEXT[] NOT NULL DEFAULT '{}',
  preferred_schedule TEXT DEFAULT '',
  budget TEXT DEFAULT '',
  logo_url TEXT DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.opportunities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID NOT NULL REFERENCES public.customer_profiles(id) ON DELETE CASCADE,
  category TEXT NOT NULL DEFAULT 'General Help',
  role TEXT NOT NULL DEFAULT 'Flexible Role',
  description TEXT DEFAULT '',
  city TEXT DEFAULT '',
  address TEXT DEFAULT '',
  schedule TEXT DEFAULT '',
  budget TEXT DEFAULT '',
  openings INTEGER NOT NULL DEFAULT 1,
  immediate_join BOOLEAN NOT NULL DEFAULT false,
  status TEXT NOT NULL DEFAULT 'open',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.opportunity_bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  opportunity_id UUID NOT NULL REFERENCES public.opportunities(id) ON DELETE CASCADE,
  candidate_id UUID NOT NULL REFERENCES public.candidate_profiles(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'booked',
  message TEXT DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (opportunity_id, candidate_id)
);

ALTER TABLE public.candidate_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customer_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.opportunity_bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can choose their own portal role" ON public.user_roles FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Candidates manage their own profile" ON public.candidate_profiles FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Customers can view candidate basics through bookings" ON public.candidate_profiles FOR SELECT TO authenticated USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'customer'));

CREATE POLICY "Customers manage their own profile" ON public.customer_profiles FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Signed in users can view customer profiles" ON public.customer_profiles FOR SELECT TO authenticated USING (true);

CREATE POLICY "Signed in users can view open opportunities" ON public.opportunities FOR SELECT TO authenticated USING (status = 'open' OR EXISTS (SELECT 1 FROM public.customer_profiles cp WHERE cp.id = customer_id AND cp.user_id = auth.uid()));
CREATE POLICY "Customers create their own opportunities" ON public.opportunities FOR INSERT TO authenticated WITH CHECK (EXISTS (SELECT 1 FROM public.customer_profiles cp WHERE cp.id = customer_id AND cp.user_id = auth.uid()));
CREATE POLICY "Customers update their own opportunities" ON public.opportunities FOR UPDATE TO authenticated USING (EXISTS (SELECT 1 FROM public.customer_profiles cp WHERE cp.id = customer_id AND cp.user_id = auth.uid())) WITH CHECK (EXISTS (SELECT 1 FROM public.customer_profiles cp WHERE cp.id = customer_id AND cp.user_id = auth.uid()));
CREATE POLICY "Customers delete their own opportunities" ON public.opportunities FOR DELETE TO authenticated USING (EXISTS (SELECT 1 FROM public.customer_profiles cp WHERE cp.id = customer_id AND cp.user_id = auth.uid()));

CREATE POLICY "Candidates create their own bookings" ON public.opportunity_bookings FOR INSERT TO authenticated WITH CHECK (EXISTS (SELECT 1 FROM public.candidate_profiles cp WHERE cp.id = candidate_id AND cp.user_id = auth.uid()));
CREATE POLICY "Candidates and customers view relevant bookings" ON public.opportunity_bookings FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM public.candidate_profiles cp WHERE cp.id = candidate_id AND cp.user_id = auth.uid()) OR EXISTS (SELECT 1 FROM public.opportunities o JOIN public.customer_profiles c ON c.id = o.customer_id WHERE o.id = opportunity_id AND c.user_id = auth.uid()));
CREATE POLICY "Candidates update their own bookings" ON public.opportunity_bookings FOR UPDATE TO authenticated USING (EXISTS (SELECT 1 FROM public.candidate_profiles cp WHERE cp.id = candidate_id AND cp.user_id = auth.uid())) WITH CHECK (EXISTS (SELECT 1 FROM public.candidate_profiles cp WHERE cp.id = candidate_id AND cp.user_id = auth.uid()));

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_candidate_profiles_updated_at BEFORE UPDATE ON public.candidate_profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_customer_profiles_updated_at BEFORE UPDATE ON public.customer_profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_opportunities_updated_at BEFORE UPDATE ON public.opportunities FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX idx_candidate_profiles_user_id ON public.candidate_profiles(user_id);
CREATE INDEX idx_customer_profiles_user_id ON public.customer_profiles(user_id);
CREATE INDEX idx_opportunities_customer_id ON public.opportunities(customer_id);
CREATE INDEX idx_opportunities_category_city ON public.opportunities(category, city);
CREATE INDEX idx_opportunities_immediate_join ON public.opportunities(immediate_join) WHERE immediate_join = true;
CREATE INDEX idx_bookings_opportunity_id ON public.opportunity_bookings(opportunity_id);
CREATE INDEX idx_bookings_candidate_id ON public.opportunity_bookings(candidate_id);