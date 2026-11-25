import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Bell, MapPin, Bookmark, Crosshair, Home, Compass, Briefcase, User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const radii = [5, 10, 20, 50] as const;

const CandidateMap = () => {
  const navigate = useNavigate();
  const { profile, opportunities } = useAuth();
  const [location, setLocation] = useState(profile?.city || "San Francisco, CA");
  const [radius, setRadius] = useState<(typeof radii)[number]>(10);

  const nearby = useMemo(() => {
    const list = opportunities.slice(0, 6);
    return list.map((o, i) => ({
      id: o.id,
      distance: [0.8, 1.2, 2.5, 3.4, 4.1, 5.2][i] || 6,
      pay: o.payAmount ? `$${o.payAmount}/${o.payType || "hr"}` : ["$35/hr", "$28/hr", "$42/hr"][i % 3],
      role: o.role,
      customer: o.customerName,
    }));
  }, [opportunities]);

  const pins = [
    { top: "32%", left: "38%", pay: "$35/hr" },
    { top: "26%", left: "62%", pay: "$42/hr" },
    { top: "58%", left: "68%", pay: "$28/hr" },
  ];

  return (
    <div className="min-h-screen bg-background pb-28 flex flex-col">
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-full border border-border flex items-center justify-center"><ArrowLeft className="w-4 h-4" /></button>
            <h1 className="font-syne font-bold text-xl">Opportunity Map</h1>
          </div>
          <div className="flex items-center gap-2">
            <button className="w-9 h-9 rounded-full border border-border flex items-center justify-center"><Bell className="w-4 h-4" /></button>
            <div className="w-9 h-9 rounded-full bg-muted overflow-hidden border border-border">
              {profile?.avatar ? <img src={profile.avatar} alt="" className="w-full h-full object-cover" /> : null}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto w-full px-4 py-4 flex-1 flex flex-col gap-4">
        {/* Search + radius */}
        <div className="rounded-2xl border border-border bg-card p-4 space-y-3">
          <div className="flex items-center gap-2 rounded-xl bg-muted/50 px-3 py-2">
            <MapPin className="w-4 h-4 text-primary" />
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="bg-transparent flex-1 outline-none text-sm font-medium"
              placeholder="Search a city or neighborhood"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {radii.map((r) => (
              <button
                key={r}
                onClick={() => setRadius(r)}
                className={`px-4 py-1.5 rounded-full border text-sm font-medium transition-colors ${
                  radius === r ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border hover:border-primary/40"
                }`}
              >
                {r}km
              </button>
            ))}
          </div>
        </div>

        {/* Fake map */}
        <div className="relative flex-1 min-h-[360px] rounded-2xl overflow-hidden border border-border bg-gradient-to-br from-accent/50 via-muted to-accent/30">
          <div className="absolute inset-0 opacity-40" style={{
            backgroundImage: "linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }} />
          <div className="absolute top-4 left-4 text-xs font-semibold text-foreground/60">{location}</div>
          {pins.map((p, i) => (
            <div key={i} className="absolute -translate-x-1/2 -translate-y-full" style={{ top: p.top, left: p.left }}>
              <div className="px-2 py-1 rounded-md bg-foreground text-background text-[10px] font-bold mb-1">{p.pay}</div>
              <MapPin className="w-6 h-6 text-primary mx-auto -mt-1" fill="currentColor" />
            </div>
          ))}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-3 h-3 rounded-full bg-primary ring-4 ring-primary/30" />
          </div>
          <button className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-background shadow-lg border border-border flex items-center justify-center">
            <Crosshair className="w-4 h-4 text-primary" />
          </button>
        </div>

        {/* Nearby gigs */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-syne font-bold text-lg">Nearby Gigs</h2>
            <button onClick={() => navigate("/candidate/dashboard")} className="text-sm font-medium text-primary">See all</button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 snap-x">
            {nearby.length === 0 && (
              <div className="rounded-2xl border border-dashed border-border p-6 text-sm text-muted-foreground w-full text-center">No gigs in this radius yet.</div>
            )}
            {nearby.map((g) => (
              <div key={g.id} className="min-w-[240px] snap-start rounded-2xl border border-border bg-card p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">{g.distance} km away</p>
                    <p className="font-semibold mt-1">{g.role}</p>
                    <p className="text-xs text-muted-foreground">{g.customer}</p>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/15 text-primary font-bold">{g.pay}</span>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="rounded-full flex-1">View Details</Button>
                  <button className="w-9 h-9 rounded-full border border-border flex items-center justify-center"><Bookmark className="w-4 h-4" /></button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur border-t border-border">
        <div className="max-w-5xl mx-auto grid grid-cols-4 px-2 py-2">
          {[
            { id: "home", label: "Home", icon: Home, path: "/candidate/dashboard" },
            { id: "explore", label: "Explore", icon: Compass, path: "/candidate/map", active: true },
            { id: "gigs", label: "Gigs", icon: Briefcase, path: "/candidate/calendar" },
            { id: "profile", label: "Profile", icon: UserIcon, path: "/candidate/profile-view" },
          ].map(({ id, label, icon: Icon, path, active }) => (
            <button key={id} onClick={() => navigate(path)} className="flex flex-col items-center gap-1 py-2">
              <span className={`px-5 py-1.5 rounded-full flex items-center justify-center ${active ? "bg-accent text-foreground" : "text-muted-foreground"}`}>
                <Icon className="w-5 h-5" />
              </span>
              <span className={`text-[11px] font-medium ${active ? "text-foreground" : "text-muted-foreground"}`}>{label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default CandidateMap;