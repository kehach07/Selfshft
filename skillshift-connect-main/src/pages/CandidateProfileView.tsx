import { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Bell, Pencil, ShieldCheck, Check, Star, Video, Settings, Mail, Phone, MapPin,
  IdCard, GraduationCap, Sparkles, Palette, ExternalLink, Plus, Home, Compass,
  Briefcase, User as UserIcon, ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import CandidateSideMenu from "@/components/CandidateSideMenu";

const trustPillars = [
  { key: "phone", label: "Phone", points: "+20" },
  { key: "identity", label: "Identity", points: "+20" },
  { key: "location", label: "Location", points: "+20" },
  { key: "payment", label: "Payment", points: "+20" },
  { key: "reviews", label: "Reviews", points: "+5" },
];

const CandidateProfileView = () => {
  const { profile } = useAuth();
  const navigate = useNavigate();

  const name = `${profile?.firstName || "Your"} ${profile?.lastName || "Name"}`.trim();
  const trust = useMemo(() => {
    if (!profile) return 40;
    let score = 20;
    if (profile.phone) score += 20;
    if (profile.verified) score += 20;
    if (profile.city) score += 20;
    if (profile.hourlyRate) score += 15;
    return Math.min(100, score);
  }, [profile]);

  const completed: Record<string, boolean> = {
    phone: !!profile?.phone,
    identity: !!profile?.verified,
    location: !!profile?.city,
    payment: !!profile?.hourlyRate,
    reviews: false,
  };

  const skills = (profile?.skills?.length ? profile.skills : ["Communication", "Team Leadership", "Project Management"]).slice(0, 6);
  const portfolio = profile?.portfolioItems?.length
    ? profile.portfolioItems
    : [
        { title: "Campaign Case Study", description: "Marketing Design" },
        { title: "Product Strategy Deck", description: "Strategy" },
        { title: "Workshop Series", description: "Education / Tutoring" },
      ];

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <CandidateSideMenu />
            <Link to="/" className="font-syne font-extrabold text-xl text-primary">SelfShft</Link>
          </div>
          <div className="flex items-center gap-2">
            <button className="w-9 h-9 rounded-full border border-border flex items-center justify-center"><Bell className="w-4 h-4" /></button>
            <div className="w-9 h-9 rounded-full bg-muted overflow-hidden border border-border">
              {profile?.avatar ? <img src={profile.avatar} alt="" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-xs font-semibold text-primary">{(profile?.firstName || "U")[0]}</div>}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6 space-y-6">
        {/* Hero */}
        <section className="flex flex-col md:flex-row gap-5 pb-6 border-b border-border">
          <div className="relative w-28 h-28 md:w-32 md:h-32 shrink-0">
            <div className="w-full h-full rounded-full overflow-hidden bg-muted border border-border">
              {profile?.avatar ? <img src={profile.avatar} alt="" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-primary">{(profile?.firstName || "U")[0]}</div>}
            </div>
            <button onClick={() => navigate("/candidate/profile")} className="absolute bottom-1 right-1 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center border-2 border-background">
              <Pencil className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-syne font-bold">{name}</h1>
            <p className="text-muted-foreground mt-1 max-w-2xl">
              {profile?.bio || "Add a short bio describing your goals, interests and the kind of gigs you love."}
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              <Badge className={`rounded-full gap-1 ${profile?.verified ? "bg-primary/15 text-primary hover:bg-primary/15" : "bg-muted text-muted-foreground hover:bg-muted"}`}>
                <ShieldCheck className="w-3 h-3" />{profile?.verified ? "Identity Verified" : "Not Verified"}
              </Badge>
              <Badge variant="secondary" className="rounded-full gap-1"><Star className="w-3 h-3" /> 4.9 (12 Gigs)</Badge>
            </div>
          </div>
        </section>

        {/* Trust score */}
        <section className="rounded-2xl bg-card border border-border p-5">
          <div className="flex flex-col lg:flex-row lg:items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="relative w-20 h-20">
                <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                  <circle cx="18" cy="18" r="16" fill="none" className="stroke-muted" strokeWidth="3" />
                  <circle cx="18" cy="18" r="16" fill="none" className="stroke-primary" strokeWidth="3"
                    strokeDasharray={`${trust} 100`} pathLength={100} strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xl font-bold font-syne leading-none">{trust}</span>
                  <span className="text-[10px] text-muted-foreground">/100</span>
                </div>
              </div>
              <div>
                <p className="font-syne font-bold text-lg flex items-center gap-1">Trust Score <ShieldCheck className="w-4 h-4 text-primary" /></p>
                <p className="text-sm text-muted-foreground">Your profile reliability and verification status.</p>
              </div>
            </div>
            <div className="grid grid-cols-5 gap-3 flex-1">
              {trustPillars.map((p) => (
                <div key={p.key} className="flex flex-col items-center text-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${completed[p.key] ? "bg-primary text-primary-foreground" : "border border-border text-muted-foreground"}`}>
                    {completed[p.key] ? <Check className="w-4 h-4" /> : <div className="w-2 h-2 rounded-full bg-muted-foreground/40" />}
                  </div>
                  <p className="text-[11px] font-semibold">{p.label}</p>
                  <p className="text-[10px] text-muted-foreground">{p.points}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Video + Personal info */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="rounded-2xl bg-card border border-border p-5 md:col-span-2">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-syne font-bold text-lg flex items-center gap-2"><Video className="w-5 h-5 text-primary" /> Video Introduction</h2>
              <button className="text-muted-foreground hover:text-primary"><Settings className="w-4 h-4" /></button>
            </div>
            <div className="aspect-video rounded-xl bg-gradient-to-br from-muted to-accent/40 flex items-center justify-center relative overflow-hidden">
              <button className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg">
                <span className="ml-1 border-l-[10px] border-l-primary-foreground border-y-[7px] border-y-transparent" />
              </button>
            </div>
          </div>
          <div className="rounded-2xl bg-card border border-border p-5">
            <h2 className="font-syne font-bold text-lg flex items-center gap-2 mb-4"><IdCard className="w-5 h-5 text-primary" /> Personal Info</h2>
            <div className="space-y-4 text-sm">
              <div className="flex gap-3"><Mail className="w-4 h-4 text-muted-foreground mt-0.5" /><div><p className="text-xs text-muted-foreground">Email</p><p className="font-medium break-all">{profile?.email || "—"}</p></div></div>
              <div className="flex gap-3"><Phone className="w-4 h-4 text-muted-foreground mt-0.5" /><div><p className="text-xs text-muted-foreground">Phone Number</p><p className="font-medium">{profile?.phone || "—"}</p></div></div>
              <div className="flex gap-3"><MapPin className="w-4 h-4 text-muted-foreground mt-0.5" /><div><p className="text-xs text-muted-foreground">Location</p><p className="font-medium">{profile?.city || "—"}</p><p className="text-xs text-muted-foreground">{profile?.address || ""}</p></div></div>
            </div>
          </div>
        </section>

        {/* Education + Skills */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="rounded-2xl bg-card border border-border p-5">
            <h2 className="font-syne font-bold text-lg flex items-center gap-2 mb-4"><GraduationCap className="w-5 h-5 text-primary" /> Education</h2>
            <div className="relative pl-5">
              <span className="absolute left-1 top-2 bottom-2 w-px bg-primary/30" />
              {[{
                title: profile?.course || "Master of Business Administration",
                sub: profile?.qualification || "Marketing & Brand Management",
                inst: profile?.institution || "Indian Institute of Management",
                years: `${profile?.startYear || "2021"} — ${profile?.endYear || "2023"}`,
              }].map((e, i) => (
                <div key={i} className="mb-4 relative">
                  <span className="absolute -left-[18px] top-1.5 w-2.5 h-2.5 rounded-full bg-primary" />
                  <p className="font-semibold">{e.title}</p>
                  <p className="text-sm text-primary">{e.sub}</p>
                  <p className="text-sm">{e.inst}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{e.years}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl bg-card border border-border p-5">
            <h2 className="font-syne font-bold text-lg flex items-center gap-2 mb-4"><Sparkles className="w-5 h-5 text-primary" /> Skills & Expertise</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {skills.map((s, i) => {
                const level = ["Expert", "Intermediate", "Expert", "Beginner"][i % 4];
                const pct = level === "Expert" ? 95 : level === "Intermediate" ? 65 : 35;
                return (
                  <div key={s} className="rounded-xl bg-muted/40 p-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{s}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary text-primary-foreground font-semibold">{level.toUpperCase()}</span>
                    </div>
                    <div className="mt-2 h-1.5 rounded-full bg-background overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Portfolio */}
        <section className="rounded-2xl bg-card border border-border p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-syne font-bold text-lg flex items-center gap-2"><Palette className="w-5 h-5 text-primary" /> Portfolio Showcase</h2>
            <button onClick={() => navigate("/candidate/profile")} className="text-sm font-semibold text-primary flex items-center gap-1">Manage Items <ExternalLink className="w-3 h-3" /></button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {portfolio.slice(0, 3).map((p, i) => (
              <div key={i} className="space-y-2">
                <div className="aspect-square rounded-xl bg-gradient-to-br from-primary/20 to-accent/50 border border-border" />
                <p className="font-semibold text-sm">{p.title}</p>
                <p className="text-xs text-muted-foreground">{p.description}</p>
              </div>
            ))}
            <button onClick={() => navigate("/candidate/profile")} className="aspect-square rounded-xl border border-dashed border-border flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-primary hover:border-primary/40">
              <Plus className="w-6 h-6" />
              <span className="text-sm font-medium">Add New Item</span>
            </button>
          </div>
        </section>

        <div className="flex justify-center pt-2">
          <Button className="rounded-full px-8" onClick={() => navigate("/candidate/profile")}><Pencil className="w-4 h-4 mr-2" /> Edit Profile</Button>
        </div>
      </main>

      {/* Bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur border-t border-border">
        <div className="max-w-5xl mx-auto grid grid-cols-4 px-2 py-2">
          {[
            { id: "home", label: "Home", icon: Home, path: "/candidate/dashboard" },
            { id: "explore", label: "Explore", icon: Compass, path: "/candidate/map" },
            { id: "gigs", label: "Gigs", icon: Briefcase, path: "/candidate/calendar" },
            { id: "profile", label: "Profile", icon: UserIcon, path: "/candidate/profile-view" },
          ].map(({ id, label, icon: Icon, path }) => {
            const active = id === "profile";
            return (
              <button key={id} onClick={() => navigate(path)} className="flex flex-col items-center gap-1 py-2">
                <span className={`px-5 py-1.5 rounded-full flex items-center justify-center ${active ? "bg-accent text-foreground" : "text-muted-foreground"}`}>
                  <Icon className="w-5 h-5" />
                </span>
                <span className={`text-[11px] font-medium ${active ? "text-foreground" : "text-muted-foreground"}`}>{label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default CandidateProfileView;