import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  PlusCircle, ArrowRight, MapPin, Star, Building2, Plus,
  User as UserIcon, Sigma, PawPrint, Briefcase, CheckCircle2, Bike,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import CustomerLayout from "@/components/CustomerLayout";

const computeCompletion = (p: Record<string, unknown> | null) => {
  if (!p) return 0;
  const fields = [
    "businessName", "contactPerson", "email", "phone", "businessType", "industry",
    "city", "address", "description", "preferredSchedule", "budget", "logo",
  ];
  const filled = fields.filter((f) => {
    const v = p[f];
    return typeof v === "string" ? v.trim().length > 0 : Boolean(v);
  }).length;
  const needs = (p as { hiringNeeds?: string[] }).hiringNeeds || [];
  const total = fields.length + 1;
  return Math.round(((filled + (needs.length ? 1 : 0)) / total) * 100);
};

const CustomerDashboard = () => {
  const { isLoggedIn, userRole, customerProfile, opportunities, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && (!isLoggedIn || userRole !== "customer")) {
      navigate("/login/customer", { replace: true });
    }
  }, [isLoggedIn, loading, navigate, userRole]);

  const myGigs = useMemo(
    () => opportunities.filter((o) => o.customerId === customerProfile?.id),
    [opportunities, customerProfile?.id]
  );

  if (loading) return <div className="min-h-screen bg-background" />;
  if (!isLoggedIn || !customerProfile) return null;

  const completion = computeCompletion(customerProfile as unknown as Record<string, unknown>);
  const firstName = (customerProfile.contactPerson || customerProfile.businessName || "there").split(" ")[0];

  const activeGigs = myGigs.slice(0, 2);
  const topRated = [
    { name: "Sarah J.", role: "Senior Math & Physics Tutor", distance: "0.8 miles away", rating: 4.9, initials: "SJ" },
    { name: "Marcus T.", role: "Expert Caretaker & Pet Sitter", distance: "1.2 miles away", rating: 5.0, initials: "MT" },
  ];

  const gigIcon = (category?: string) => {
    if ((category || "").toLowerCase().includes("pet")) return PawPrint;
    return Sigma;
  };

  const liveCount = myGigs.filter((g) => !g.bookedBy).length;
  const bookedCount = myGigs.filter((g) => g.bookedBy).length;

  return (
    <CustomerLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-2 text-sm">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted text-foreground/80">
            <Building2 className="w-3.5 h-3.5" /> Customer Portal
          </span>
        </div>
        <div>
          <h1 className="text-3xl md:text-4xl font-syne font-bold">Welcome, {firstName}!</h1>
          <p className="text-muted-foreground mt-1 max-w-2xl">
            Add your hiring details once. SelfShft will automatically show them inside the right role
            category for candidates to browse and book.
          </p>
        </div>

        {/* Complete profile */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center justify-between mb-3">
            <p className="font-syne font-bold">Complete your profile</p>
            <span className="font-syne font-bold text-primary">{completion}%</span>
          </div>
          <div className="h-2 rounded-full bg-muted overflow-hidden">
            <div className="h-full bg-primary transition-all" style={{ width: `${completion}%` }} />
          </div>
          <p className="text-xs text-muted-foreground mt-3">Almost there! Add a payment method to hire faster.</p>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            onClick={() => navigate("/customer/post-gig")}
            className="rounded-2xl border border-border bg-card p-4 text-left hover:border-primary transition-colors"
          >
            <div className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center mb-3">
              <Plus className="w-5 h-5" />
            </div>
            <p className="font-syne font-bold">Add Opportunity</p>
            <p className="text-xs text-muted-foreground">Auto-categorized into roles.</p>
          </button>
          <div className="rounded-2xl border border-border bg-card p-4">
            <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center mb-3">
              <Briefcase className="w-5 h-5" />
            </div>
            <p className="text-2xl font-syne font-bold">{liveCount}</p>
            <p className="text-xs text-muted-foreground">Live roles</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-4">
            <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center mb-3">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <p className="text-2xl font-syne font-bold">{bookedCount}</p>
            <p className="text-xs text-muted-foreground">Booked</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-4">
            <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center mb-3">
              <Bike className="w-5 h-5" />
            </div>
            <p className="font-syne font-bold">Bike + Parcel Rider</p>
            <p className="text-xs text-muted-foreground">Top roles</p>
          </div>
        </div>

        {/* Post a new gig */}
        <button
          onClick={() => navigate("/customer/post-gig")}
          className="w-full text-left rounded-2xl bg-foreground text-background p-6 border-2 border-dashed border-primary/60 hover:opacity-95 transition-opacity"
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-background/10 flex items-center justify-center">
                <PlusCircle className="w-6 h-6 text-primary" />
              </div>
              <p className="text-xl md:text-2xl font-syne font-bold text-primary">Post a New Gig</p>
            </div>
            <ArrowRight className="w-5 h-5 opacity-80" />
          </div>
        </button>

        {/* Active gigs */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl md:text-2xl font-syne font-bold">Active Gigs</h2>
            <button onClick={() => navigate("/customer/gigs")} className="text-sm font-medium text-muted-foreground hover:text-primary">View all</button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {activeGigs.map((g) => {
              const Icon = gigIcon(g.category);
              const status = g.bookedBy ? "Awaiting Review" : "Active";
              return (
                <div key={g.id} className="rounded-2xl border border-border bg-card p-4 flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-primary/15 text-primary">{status}</span>
                  </div>
                  <p className="font-syne font-bold leading-tight">{g.role}</p>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{g.description || "No description"}</p>
                  <div className="border-t border-border mt-3 pt-2 text-[11px] text-muted-foreground flex items-center gap-1">
                    <UserIcon className="w-3 h-3" /> {g.applications?.length || 0} candidates interested
                  </div>
                </div>
              );
            })}
            <button
              onClick={() => navigate("/customer/post-gig")}
              className="rounded-2xl border-2 border-dashed border-border p-4 flex flex-col items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-colors min-h-[140px]"
            >
              <Plus className="w-6 h-6 mb-1" />
              <span className="text-sm font-medium">New Request</span>
            </button>
          </div>
        </section>

        {/* Top Rated Nearby */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl md:text-2xl font-syne font-bold">Top Rated Nearby</h2>
            <button onClick={() => navigate("/customer/search")} className="text-sm font-medium text-muted-foreground hover:text-primary">Explore map</button>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {topRated.map((c) => (
              <div key={c.name} className="rounded-2xl border border-border bg-card p-4 flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/30 to-accent flex items-center justify-center font-syne font-bold text-primary shrink-0">{c.initials}</div>
                <div className="flex-1 min-w-0">
                  <p className="font-syne font-bold truncate">{c.name}</p>
                  <p className="text-sm text-muted-foreground truncate">{c.role}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5"><MapPin className="w-3 h-3" /> {c.distance}</p>
                </div>
                <div className="flex items-center gap-1 text-sm font-semibold">
                  <Star className="w-4 h-4 fill-primary text-primary" /> {c.rating.toFixed(1)}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </CustomerLayout>
  );
};

export default CustomerDashboard;