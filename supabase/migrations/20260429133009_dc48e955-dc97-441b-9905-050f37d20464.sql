ALTER TABLE public.opportunities
ADD COLUMN IF NOT EXISTS duration text DEFAULT '',
ADD COLUMN IF NOT EXISTS timing text DEFAULT '',
ADD COLUMN IF NOT EXISTS pay_amount text DEFAULT '',
ADD COLUMN IF NOT EXISTS pay_type text DEFAULT 'hour',
ADD COLUMN IF NOT EXISTS location_hunt text DEFAULT '';

ALTER TABLE public.opportunity_bookings
ADD COLUMN IF NOT EXISTS application_note text DEFAULT '';

CREATE INDEX IF NOT EXISTS idx_opportunities_location_hunt ON public.opportunities (location_hunt);
CREATE INDEX IF NOT EXISTS idx_opportunities_category_city ON public.opportunities (category, city);