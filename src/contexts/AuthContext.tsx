/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import type { Json } from "@/integrations/supabase/types";
import { selfshft } from "@/integrations/selfshft";

export interface WorkExperienceItem {
  company: string;
  role: string;
  duration: string;
  description: string;
}

export interface CandidateProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: string;
  bio: string;
  avatar: string;
  qualification: string;
  institution: string;
  course: string;
  startYear: string;
  endYear: string;
  achievements: string;
  skills: string[];
  experienceLevel: string;
  portfolioItems: { title: string; description: string; image?: string }[];
  videoIntro: string;
  city: string;
  pincode: string;
  address: string;
  workRadius: string;
  verified: boolean;
  badges: string[];
  availability: string[];
  hourlyRate: string;
  languages: string[];
  socialLinks: { platform: string; url: string }[];
  resumeUploaded: boolean;
  resumeUrl: string;
  resumeSummary: string;
  workExperience: WorkExperienceItem[];
}

export interface CustomerProfile {
  id: string;
  businessName: string;
  contactPerson: string;
  email: string;
  phone: string;
  businessType: string;
  industry: string;
  city: string;
  pincode: string;
  address: string;
  description: string;
  hiringNeeds: string[];
  preferredSchedule: string;
  budget: string;
  logo: string;
}

export interface Opportunity {
  id: string;
  customerId: string;
  customerName: string;
  contactPerson: string;
  phone: string;
  category: string;
  role: string;
  description: string;
  city: string;
  address: string;
  schedule: string;
  budget: string;
  duration?: string;
  timing?: string;
  payAmount?: string;
  payType?: string;
  locationHunt?: string;
  openings: string;
  immediateJoin?: boolean;
  bookedBy?: string;
  bookedAt?: string;
  applications?: OpportunityApplication[];
}

export interface OpportunityApplication {
  id: string;
  opportunityId: string;
  candidateName: string;
  candidateEmail: string;
  candidatePhone: string;
  candidateCity: string;
  candidateSkills: string[];
  resumeUrl: string;
  applicationNote: string;
  status: string;
  createdAt: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  userRole: "candidate" | "customer" | null;
  profile: CandidateProfile | null;
  customerProfile: CustomerProfile | null;
  opportunities: Opportunity[];
  loading: boolean;
  login: (email: string, password: string, role: "candidate" | "customer") => Promise<boolean>;
  signup: (data: Partial<CandidateProfile>, password: string) => Promise<boolean>;
  customerSignup: (data: Partial<CustomerProfile>, password: string) => Promise<boolean>;
  signInWithGoogle: (role: "candidate" | "customer") => Promise<boolean>;
  sendPhoneOtp: (phone: string, role: "candidate" | "customer") => Promise<boolean>;
  verifyPhoneOtp: (phone: string, token: string, role: "candidate" | "customer") => Promise<boolean>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<CandidateProfile>) => Promise<void>;
  updateCustomerProfile: (data: Partial<CustomerProfile>) => Promise<void>;
  addOpportunity: (data: Partial<Opportunity>) => Promise<void>;
  bookOpportunity: (opportunityId: string, applicationNote?: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

// ---------------------------------------------------------------------------
// Local (temporary) auth layer
// Stores users + sessions in localStorage so the user can sign up/login and
// reach the profile pages without backend email verification.
// ---------------------------------------------------------------------------
const LOCAL_USERS_KEY = "selfshft_local_users";
const LOCAL_SESSION_KEY = "selfshft_local_session";
const LOCAL_CAND_PROFILES_KEY = "selfshft_local_candidate_profiles";
const LOCAL_CUST_PROFILES_KEY = "selfshft_local_customer_profiles";
const LOCAL_OPPS_KEY = "selfshft_local_opportunities";

type LocalUser = { id: string; email: string; password: string; role: "candidate" | "customer" };
type LocalSession = { userId: string; email: string; role: "candidate" | "customer" };

const readJson = <T,>(key: string, fallback: T): T => {
  try { const raw = localStorage.getItem(key); return raw ? (JSON.parse(raw) as T) : fallback; } catch { return fallback; }
};
const writeJson = (key: string, value: unknown) => { try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* noop */ } };

const getLocalUsers = (): LocalUser[] => readJson<LocalUser[]>(LOCAL_USERS_KEY, []);
const saveLocalUsers = (users: LocalUser[]) => writeJson(LOCAL_USERS_KEY, users);
const getLocalSession = (): LocalSession | null => readJson<LocalSession | null>(LOCAL_SESSION_KEY, null);
const setLocalSession = (s: LocalSession | null) => { if (s) writeJson(LOCAL_SESSION_KEY, s); else localStorage.removeItem(LOCAL_SESSION_KEY); };
const getLocalCandidateProfiles = (): Record<string, CandidateProfile> => readJson(LOCAL_CAND_PROFILES_KEY, {});
const saveLocalCandidateProfiles = (p: Record<string, CandidateProfile>) => writeJson(LOCAL_CAND_PROFILES_KEY, p);
const getLocalCustomerProfiles = (): Record<string, CustomerProfile> => readJson(LOCAL_CUST_PROFILES_KEY, {});
const saveLocalCustomerProfiles = (p: Record<string, CustomerProfile>) => writeJson(LOCAL_CUST_PROFILES_KEY, p);
const getLocalOpportunities = (): Opportunity[] => readJson<Opportunity[]>(LOCAL_OPPS_KEY, []);
const saveLocalOpportunities = (opps: Opportunity[]) => writeJson(LOCAL_OPPS_KEY, opps);
const newId = () => (typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `id_${Date.now()}_${Math.random().toString(36).slice(2)}`);

const defaultProfile: CandidateProfile = {
  id: "", firstName: "", lastName: "", email: "", phone: "", dob: "", bio: "", avatar: "",
  qualification: "", institution: "", course: "", startYear: "", endYear: "", achievements: "",
  skills: [], experienceLevel: "", portfolioItems: [], videoIntro: "", city: "", pincode: "", address: "",
  workRadius: "", verified: false, badges: [], availability: [], hourlyRate: "", languages: [], socialLinks: [],
  resumeUploaded: false, resumeUrl: "", resumeSummary: "", workExperience: [],
};

const defaultCustomerProfile: CustomerProfile = {
  id: "", businessName: "", contactPerson: "", email: "", phone: "", businessType: "", industry: "",
  city: "", pincode: "", address: "", description: "", hiringNeeds: [], preferredSchedule: "", budget: "", logo: "",
};

const toCandidateProfile = (row: any): CandidateProfile => ({
  ...defaultProfile,
  id: row.id,
  firstName: row.first_name || "",
  lastName: row.last_name || "",
  email: row.email || "",
  phone: row.phone || "",
  dob: row.dob || "",
  bio: row.bio || "",
  avatar: row.avatar_url || "",
  city: row.city || "",
  pincode: row.pincode || "",
  address: row.address || "",
  workRadius: row.work_radius || "",
  skills: row.skills || [],
  availability: row.availability || [],
  hourlyRate: row.hourly_rate || "",
  languages: row.languages || [],
  resumeUrl: row.resume_url || "",
  resumeUploaded: Boolean(row.resume_url),
  resumeSummary: row.resume_summary || "",
  workExperience: row.work_experience || [],
  portfolioItems: row.portfolio_items || [],
  verified: Boolean(row.verified),
  badges: row.badges || [],
  qualification: row.education?.[0]?.qualification || "",
  institution: row.education?.[0]?.institution || "",
  course: row.education?.[0]?.course || "",
  startYear: row.education?.[0]?.startYear || "",
  endYear: row.education?.[0]?.endYear || "",
  achievements: (row.certifications || []).join(", "),
});

const toCustomerProfile = (row: any): CustomerProfile => ({
  ...defaultCustomerProfile,
  id: row.id,
  businessName: row.business_name || "",
  contactPerson: row.contact_person || "",
  email: row.email || "",
  phone: row.phone || "",
  businessType: row.business_type || "",
  industry: row.industry || "",
  city: row.city || "",
  pincode: row.pincode || "",
  address: row.address || "",
  description: row.description || "",
  hiringNeeds: row.hiring_needs || [],
  preferredSchedule: row.preferred_schedule || "",
  budget: row.budget || "",
  logo: row.logo_url || "",
});

const toOpportunity = (row: any): Opportunity => ({
  id: row.id,
  customerId: row.customer_id,
  customerName: row.customer_profiles?.business_name || "Local customer",
  contactPerson: row.customer_profiles?.contact_person || "",
  phone: row.customer_profiles?.phone || "",
  category: row.category || "General Help",
  role: row.role || "Flexible Role",
  description: row.description || "",
  city: row.city || "",
  address: row.address || "",
  schedule: row.schedule || "",
  budget: row.budget || "",
  duration: row.duration || "",
  timing: row.timing || "",
  payAmount: row.pay_amount || "",
  payType: row.pay_type || "hour",
  locationHunt: row.location_hunt || "",
  openings: String(row.openings || 1),
  immediateJoin: Boolean(row.immediate_join),
  bookedBy: row.opportunity_bookings?.[0]?.candidate_profiles ? `${row.opportunity_bookings[0].candidate_profiles.first_name || ""} ${row.opportunity_bookings[0].candidate_profiles.last_name || ""}`.trim() : undefined,
  bookedAt: row.opportunity_bookings?.[0]?.created_at,
  applications: (row.opportunity_bookings || []).map((booking: any) => ({
    id: booking.id,
    opportunityId: row.id,
    candidateName: booking.candidate_profiles ? `${booking.candidate_profiles.first_name || ""} ${booking.candidate_profiles.last_name || ""}`.trim() || "Candidate" : "Candidate",
    candidateEmail: booking.candidate_profiles?.email || "",
    candidatePhone: booking.candidate_profiles?.phone || "",
    candidateCity: booking.candidate_profiles?.city || "",
    candidateSkills: booking.candidate_profiles?.skills || [],
    resumeUrl: booking.candidate_profiles?.resume_url || "",
    applicationNote: booking.application_note || booking.message || "",
    status: booking.status || "applied",
    createdAt: booking.created_at,
  })),
});

const canonicalCategory = (value?: string) => {
  const normalized = (value || "").toLowerCase();
  if (normalized.includes("gym") || normalized.includes("fitness") || normalized.includes("trainer")) return "Gym Trainers";
  if (normalized.includes("shop") || normalized.includes("retail")) return "Shop Staff";
  if (normalized.includes("restaurant") || normalized.includes("waiter") || normalized.includes("service")) return "Restaurant Staff";
  if (normalized.includes("chef") || normalized.includes("cook")) return "Chefs & Cooks";
  if (normalized.includes("hotel") || normalized.includes("hospitality")) return "Hotel Management";
  if (normalized.includes("home") || normalized.includes("maid") || normalized.includes("clean")) return "Home Services";
  if (normalized.includes("tuition") || normalized.includes("tutor")) return "Tutoring";
  if (normalized.includes("creative") || normalized.includes("design") || normalized.includes("photo") || normalized.includes("video") || normalized.includes("social") || normalized.includes("content")) return "Creative Work";
  if (normalized.includes("bike") || normalized.includes("ride")) return "Bike Rides";
  if (normalized.includes("parcel") || normalized.includes("delivery") || normalized.includes("drop")) return "Parcel Drop";
  return value || "General Help";
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<"candidate" | "customer" | null>(null);
  const [profile, setProfile] = useState<CandidateProfile | null>(null);
  const [customerProfile, setCustomerProfile] = useState<CustomerProfile | null>(null);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);

  const refreshOpportunities = async () => {
    const localOpps = getLocalOpportunities();
    const { data } = await supabase
      .from("opportunities")
      .select("*, customer_profiles(business_name, contact_person, phone), opportunity_bookings(id, created_at, status, message, application_note, candidate_profiles(first_name, last_name, email, phone, city, skills, resume_url))")
      .eq("status", "open")
      .order("created_at", { ascending: false });
    const remote = (data || []).map(toOpportunity);
    setOpportunities([...localOpps, ...remote]);
  };

  const ensureRoleAndProfile = async (currentSession: Session, preferredRole?: "candidate" | "customer") => {
    const authUser = currentSession.user;
    const roleFromStorage = (localStorage.getItem("selfshft_pending_role") as "candidate" | "customer" | null) || preferredRole;
    const { data: roles } = await supabase.from("user_roles").select("role").eq("user_id", authUser.id).limit(1);
    const role = (roles?.[0]?.role as "candidate" | "customer" | undefined) || roleFromStorage || "candidate";

    if (!roles?.length) {
      await supabase.from("user_roles").insert({ user_id: authUser.id, role });
    }

    setUserRole(role);
    setIsLoggedIn(true);
    localStorage.removeItem("selfshft_pending_role");

    if (role === "customer") {
      const { data: existing } = await supabase.from("customer_profiles").select("*").eq("user_id", authUser.id).maybeSingle();
      const row = existing || (await supabase.from("customer_profiles").insert({
        user_id: authUser.id,
        email: authUser.email || "",
        business_name: authUser.user_metadata?.full_name || "",
        contact_person: authUser.user_metadata?.full_name || "",
      }).select("*").single()).data;
      setCustomerProfile(row ? toCustomerProfile(row) : null);
      setProfile(null);
    } else {
      const { data: existing } = await supabase.from("candidate_profiles").select("*").eq("user_id", authUser.id).maybeSingle();
      const fullName = authUser.user_metadata?.full_name || "";
      const [firstName, ...lastParts] = fullName.split(" ");
      const row = existing || (await supabase.from("candidate_profiles").insert({
        user_id: authUser.id,
        email: authUser.email || "",
        first_name: firstName || "",
        last_name: lastParts.join(" "),
        avatar_url: authUser.user_metadata?.avatar_url || "",
      }).select("*").single()).data;
      setProfile(row ? toCandidateProfile(row) : null);
      setCustomerProfile(null);
    }
  };

  useEffect(() => {
    // Hydrate from local (temporary) session first
    const local = getLocalSession();
    if (local) {
      setUserRole(local.role);
      setIsLoggedIn(true);
      if (local.role === "candidate") {
        const p = getLocalCandidateProfiles()[local.userId];
        if (p) setProfile(p);
      } else {
        const p = getLocalCustomerProfiles()[local.userId];
        if (p) setCustomerProfile(p);
      }
      refreshOpportunities().finally(() => setLoading(false));
      return;
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, newSession) => {
      setSession(newSession);
      if (!newSession) {
        setIsLoggedIn(false);
        setUserRole(null);
        setProfile(null);
        setCustomerProfile(null);
        setLoading(false);
        return;
      }
      setTimeout(async () => {
        await ensureRoleAndProfile(newSession);
        await refreshOpportunities();
        setLoading(false);
      }, 0);
    });

    supabase.auth.getSession().then(({ data: { session: initialSession } }) => {
      setSession(initialSession);
      if (!initialSession) {
        refreshOpportunities().finally(() => setLoading(false));
      }
    });

    const opportunityChannel = supabase
      .channel("portal-opportunities")
      .on("postgres_changes", { event: "*", schema: "public", table: "opportunities" }, refreshOpportunities)
      .on("postgres_changes", { event: "*", schema: "public", table: "opportunity_bookings" }, refreshOpportunities)
      .subscribe();

    return () => {
      subscription.unsubscribe();
      supabase.removeChannel(opportunityChannel);
    };
  }, []);

  const login = async (email: string, password: string, role: "candidate" | "customer") => {
    // Local-first: check localStorage credentials
    const users = getLocalUsers();
    const match = users.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password && u.role === role);
    if (match) {
      const session: LocalSession = { userId: match.id, email: match.email, role: match.role };
      setLocalSession(session);
      setUserRole(match.role);
      setIsLoggedIn(true);
      if (match.role === "candidate") {
        const p = getLocalCandidateProfiles()[match.id];
        if (p) setProfile(p);
        setCustomerProfile(null);
      } else {
        const p = getLocalCustomerProfiles()[match.id];
        if (p) setCustomerProfile(p);
        setProfile(null);
      }
      return true;
    }

    localStorage.setItem("selfshft_pending_role", role);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error || !data.session) return false;
    await ensureRoleAndProfile(data.session, role);
    await refreshOpportunities();
    return true;
  };

  const signup = async (data: Partial<CandidateProfile>, password: string) => {
    // Local-first temporary signup — no backend email verification required
    const email = (data.email || "").trim();
    if (!email || !password) return false;
    const users = getLocalUsers();
    if (users.some((u) => u.email.toLowerCase() === email.toLowerCase() && u.role === "candidate")) {
      // Already exists — try local login
      return login(email, password, "candidate");
    }
    const id = newId();
    users.push({ id, email, password, role: "candidate" });
    saveLocalUsers(users);
    const candidateProfile: CandidateProfile = {
      ...defaultProfile,
      ...(data as CandidateProfile),
      id,
      email,
      skills: data.skills || [],
      portfolioItems: data.portfolioItems || [],
    };
    const all = getLocalCandidateProfiles();
    all[id] = candidateProfile;
    saveLocalCandidateProfiles(all);
    setLocalSession({ userId: id, email, role: "candidate" });
    setUserRole("candidate");
    setIsLoggedIn(true);
    setProfile(candidateProfile);
    setCustomerProfile(null);
    return true;

    // eslint-disable-next-line no-unreachable
    localStorage.setItem("selfshft_pending_role", "candidate");
    const { data: authData, error } = await supabase.auth.signUp({
      email: data.email || "",
      password,
      options: { emailRedirectTo: window.location.origin, data: { full_name: `${data.firstName || ""} ${data.lastName || ""}`.trim() } },
    });
    if (error) return false;
    if (authData.session) {
      await supabase.from("user_roles").insert({ user_id: authData.session.user.id, role: "candidate" });
      await supabase.from("candidate_profiles").insert({
        user_id: authData.session.user.id,
        first_name: data.firstName || "",
        last_name: data.lastName || "",
        email: data.email || "",
        phone: data.phone || "",
        dob: data.dob || null,
        bio: data.bio || "",
        city: data.city || "",
        pincode: data.pincode || "",
        address: data.address || "",
        work_radius: data.workRadius || "",
        skills: data.skills || [],
        portfolio_items: data.portfolioItems || [],
        education: [{ qualification: data.qualification || "", institution: data.institution || "", course: data.course || "", startYear: data.startYear || "", endYear: data.endYear || "" }],
        certifications: data.achievements ? [data.achievements] : [],
      });
      await ensureRoleAndProfile(authData.session, "candidate");
    }
    return true;
  };

  const customerSignup = async (data: Partial<CustomerProfile>, password: string) => {
    const email = (data.email || "").trim();
    if (!email || !password) return false;
    const users = getLocalUsers();
    if (users.some((u) => u.email.toLowerCase() === email.toLowerCase() && u.role === "customer")) {
      return login(email, password, "customer");
    }
    const id = newId();
    users.push({ id, email, password, role: "customer" });
    saveLocalUsers(users);
    const custProfile: CustomerProfile = {
      ...defaultCustomerProfile,
      ...(data as CustomerProfile),
      id,
      email,
      hiringNeeds: data.hiringNeeds || [],
    };
    const all = getLocalCustomerProfiles();
    all[id] = custProfile;
    saveLocalCustomerProfiles(all);
    setLocalSession({ userId: id, email, role: "customer" });
    setUserRole("customer");
    setIsLoggedIn(true);
    setCustomerProfile(custProfile);
    setProfile(null);
    return true;

    // eslint-disable-next-line no-unreachable
    localStorage.setItem("selfshft_pending_role", "customer");
    const { data: authData, error } = await supabase.auth.signUp({
      email: data.email || "",
      password,
      options: { emailRedirectTo: window.location.origin, data: { full_name: data.contactPerson || data.businessName || "" } },
    });
    if (error) return false;
    if (authData.session) {
      await supabase.from("user_roles").insert({ user_id: authData.session.user.id, role: "customer" });
      await supabase.from("customer_profiles").insert({
        user_id: authData.session.user.id,
        business_name: data.businessName || "",
        contact_person: data.contactPerson || "",
        email: data.email || "",
        phone: data.phone || "",
        business_type: data.businessType || "",
        industry: data.industry || "",
        city: data.city || "",
        pincode: data.pincode || "",
        address: data.address || "",
        description: data.description || "",
        hiring_needs: data.hiringNeeds || [],
        preferred_schedule: data.preferredSchedule || "",
        budget: data.budget || "",
      });
      await ensureRoleAndProfile(authData.session, "customer");
    }
    return true;
  };

  const signInWithGoogle = async (role: "candidate" | "customer") => {
    localStorage.setItem("selfshft_pending_role", role);
    const result = await selfshft.auth.signInWithOAuth("google", { redirect_uri: window.location.origin });
    if (result.error) return false;
    if (result.redirected) return true;
    const { data } = await supabase.auth.getSession();
    if (data.session) await ensureRoleAndProfile(data.session, role);
    return true;
  };

  const sendPhoneOtp = async (phone: string, role: "candidate" | "customer") => {
    localStorage.setItem("selfshft_pending_role", role);
    const { error } = await supabase.auth.signInWithOtp({ phone });
    return !error;
  };

  const verifyPhoneOtp = async (phone: string, token: string, role: "candidate" | "customer") => {
    localStorage.setItem("selfshft_pending_role", role);
    const { data, error } = await supabase.auth.verifyOtp({ phone, token, type: "sms" });
    if (error || !data.session) return false;
    await ensureRoleAndProfile(data.session, role);
    await refreshOpportunities();
    return true;
  };

  const logout = async () => {
    if (getLocalSession()) {
      setLocalSession(null);
      setIsLoggedIn(false);
      setUserRole(null);
      setProfile(null);
      setCustomerProfile(null);
      return;
    }
    await supabase.auth.signOut();
    setSession(null);
    setIsLoggedIn(false);
    setUserRole(null);
    setProfile(null);
    setCustomerProfile(null);
  };

  const updateProfile = async (data: Partial<CandidateProfile>) => {
    const local = getLocalSession();
    if (local && local.role === "candidate" && profile) {
      const merged: CandidateProfile = { ...profile, ...data };
      const all = getLocalCandidateProfiles();
      all[local.userId] = merged;
      saveLocalCandidateProfiles(all);
      setProfile(merged);
      return;
    }
    if (!profile || !session) return;
    const payload = {
      first_name: data.firstName ?? profile.firstName,
      last_name: data.lastName ?? profile.lastName,
      email: data.email ?? profile.email,
      phone: data.phone ?? profile.phone,
      dob: data.dob || null,
      bio: data.bio ?? profile.bio,
      avatar_url: data.avatar ?? profile.avatar,
      city: data.city ?? profile.city,
      pincode: data.pincode ?? profile.pincode,
      address: data.address ?? profile.address,
      work_radius: data.workRadius ?? profile.workRadius,
      skills: data.skills ?? profile.skills,
      availability: data.availability ?? profile.availability,
      hourly_rate: data.hourlyRate ?? profile.hourlyRate,
      languages: data.languages ?? profile.languages,
      resume_url: data.resumeUrl ?? profile.resumeUrl,
      resume_summary: data.resumeSummary ?? profile.resumeSummary,
      work_experience: (data.workExperience ?? profile.workExperience) as unknown as Json,
      portfolio_items: (data.portfolioItems ?? profile.portfolioItems) as unknown as Json,
      education: [{ qualification: data.qualification ?? profile.qualification, institution: data.institution ?? profile.institution, course: data.course ?? profile.course, startYear: data.startYear ?? profile.startYear, endYear: data.endYear ?? profile.endYear }] as Json,
      certifications: data.achievements ? [data.achievements] : profile.achievements ? [profile.achievements] : [],
    };
    const { data: row } = await supabase.from("candidate_profiles").update(payload).eq("id", profile.id).select("*").single();
    if (row) setProfile(toCandidateProfile(row));
  };

  const updateCustomerProfile = async (data: Partial<CustomerProfile>) => {
    const local = getLocalSession();
    if (local && local.role === "customer" && customerProfile) {
      const merged: CustomerProfile = { ...customerProfile, ...data };
      const all = getLocalCustomerProfiles();
      all[local.userId] = merged;
      saveLocalCustomerProfiles(all);
      setCustomerProfile(merged);
      return;
    }
    if (!customerProfile) return;
    const payload = {
      business_name: data.businessName ?? customerProfile.businessName,
      contact_person: data.contactPerson ?? customerProfile.contactPerson,
      email: data.email ?? customerProfile.email,
      phone: data.phone ?? customerProfile.phone,
      business_type: data.businessType ?? customerProfile.businessType,
      industry: data.industry ?? customerProfile.industry,
      city: data.city ?? customerProfile.city,
      pincode: data.pincode ?? customerProfile.pincode,
      address: data.address ?? customerProfile.address,
      description: data.description ?? customerProfile.description,
      hiring_needs: data.hiringNeeds ?? customerProfile.hiringNeeds,
      preferred_schedule: data.preferredSchedule ?? customerProfile.preferredSchedule,
      budget: data.budget ?? customerProfile.budget,
      logo_url: data.logo ?? customerProfile.logo,
    };
    const { data: row } = await supabase.from("customer_profiles").update(payload).eq("id", customerProfile.id).select("*").single();
    if (row) setCustomerProfile(toCustomerProfile(row));
  };

  const addOpportunity = async (data: Partial<Opportunity>) => {
    if (!customerProfile) return;
    const category = canonicalCategory(data.category || data.role || customerProfile.industry);
    const local = getLocalSession();
    if (local && local.role === "customer") {
      const newOpp: Opportunity = {
        id: newId(),
        customerId: customerProfile.id,
        customerName: customerProfile.businessName || "Local customer",
        contactPerson: customerProfile.contactPerson || "",
        phone: customerProfile.phone || "",
        category,
        role: data.role || "Flexible Role",
        description: data.description || "",
        city: data.city || customerProfile.city || "",
        address: data.address || customerProfile.address || "",
        schedule: data.schedule || customerProfile.preferredSchedule || "",
        budget: data.budget || customerProfile.budget || "",
        duration: data.duration || "",
        timing: data.timing || data.schedule || "",
        payAmount: data.payAmount || data.budget || "",
        payType: data.payType || "hour",
        locationHunt: data.locationHunt || data.city || customerProfile.city || "",
        openings: String(data.openings || 1),
        immediateJoin: Boolean(data.immediateJoin),
        applications: [],
      };
      const all = [newOpp, ...getLocalOpportunities()];
      saveLocalOpportunities(all);
      setOpportunities((prev) => [newOpp, ...prev.filter((o) => o.id !== newOpp.id)]);
      return;
    }
    await supabase.from("opportunities").insert({
      customer_id: customerProfile.id,
      category,
      role: data.role || "Flexible Role",
      description: data.description || "",
      city: data.city || customerProfile.city,
      address: data.address || customerProfile.address,
      schedule: data.schedule || customerProfile.preferredSchedule,
      budget: data.budget || customerProfile.budget,
      duration: data.duration || "",
      timing: data.timing || data.schedule || "",
      pay_amount: data.payAmount || data.budget || "",
      pay_type: data.payType || "hour",
      location_hunt: data.locationHunt || data.city || customerProfile.city,
      openings: Number(data.openings || 1),
      immediate_join: Boolean(data.immediateJoin),
    });
    await refreshOpportunities();
  };

  const bookOpportunity = async (opportunityId: string, applicationNote = "") => {
    if (!profile) return false;
    const { error } = await supabase.from("opportunity_bookings").insert({ opportunity_id: opportunityId, candidate_id: profile.id, application_note: applicationNote, message: applicationNote, status: "applied" });
    if (error) return false;
    await refreshOpportunities();
    return true;
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userRole, profile, customerProfile, opportunities, loading, login, signup, customerSignup, signInWithGoogle, sendPhoneOtp, verifyPhoneOtp, logout, updateProfile, updateCustomerProfile, addOpportunity, bookOpportunity }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
