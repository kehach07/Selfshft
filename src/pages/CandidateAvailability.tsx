import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronLeft, ChevronRight, Sun, Coffee, CalendarDays, Moon, CalendarPlus, Home, Compass, Briefcase, User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

type DayState = "available" | "booked" | "off";

const presets = [
  { id: "after", title: "After College Hours", sub: "4 PM - 9 PM weekdays", icon: Sun },
  { id: "weekend", title: "Weekend Gigs", sub: "Full days on Sat & Sun", icon: Coffee },
  { id: "vacation", title: "Vacation Only", sub: "Summer & winter breaks", icon: CalendarDays },
  { id: "night", title: "Night Shifts", sub: "For those who prefer late hours", icon: Moon },
];

const CandidateAvailability = () => {
  const navigate = useNavigate();
  const [cursor, setCursor] = useState(() => new Date());
  const [days, setDays] = useState<Record<string, DayState>>({});
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);

  const monthKey = `${cursor.getFullYear()}-${cursor.getMonth()}`;
  const { grid, monthLabel } = useMemo(() => {
    const year = cursor.getFullYear();
    const month = cursor.getMonth();
    const first = new Date(year, month, 1);
    const startDay = first.getDay();
    const daysIn = new Date(year, month + 1, 0).getDate();
    const cells: { day: number; inMonth: boolean; key: string }[] = [];
    for (let i = 0; i < startDay; i++) {
      const d = new Date(year, month, -startDay + i + 1).getDate();
      cells.push({ day: d, inMonth: false, key: `prev-${d}` });
    }
    for (let d = 1; d <= daysIn; d++) cells.push({ day: d, inMonth: true, key: `${monthKey}-${d}` });
    while (cells.length % 7 !== 0) cells.push({ day: cells.length, inMonth: false, key: `next-${cells.length}` });
    return { grid: cells, monthLabel: first.toLocaleString("default", { month: "long", year: "numeric" }) };
  }, [cursor, monthKey]);

  const cycle = (key: string) => setDays((prev) => {
    const cur = prev[key] || "off";
    const next: DayState = cur === "off" ? "available" : cur === "available" ? "booked" : "off";
    return { ...prev, [key]: next };
  });

  return (
    <div className="min-h-screen bg-background pb-28">
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-full border border-border flex items-center justify-center"><ArrowLeft className="w-4 h-4" /></button>
            <span className="font-syne font-extrabold text-xl text-primary">SelfShft</span>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6 space-y-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-syne font-bold">Set Your Availability</h1>
          <p className="text-muted-foreground mt-1">Mark when you're free to work and get gigs that match your schedule perfectly.</p>
        </div>

        {/* Calendar */}
        <div className="rounded-2xl bg-card border border-border p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="font-syne font-bold text-lg">{monthLabel}</p>
            <div className="flex gap-1">
              <button onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))} className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-muted"><ChevronLeft className="w-4 h-4" /></button>
              <button onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))} className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-muted"><ChevronRight className="w-4 h-4" /></button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-2 text-center text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => <div key={i}>{d}</div>)}
          </div>
          <div className="grid grid-cols-7 gap-2">
            {grid.map((c) => {
              const state = c.inMonth ? days[c.key] || "off" : "off";
              const cls =
                state === "available" ? "bg-primary text-primary-foreground border-primary" :
                state === "booked" ? "bg-accent text-foreground border-accent" :
                c.inMonth ? "bg-transparent text-foreground border-transparent hover:bg-muted" :
                "bg-transparent text-muted-foreground/40 border-transparent";
              return (
                <button
                  key={c.key}
                  disabled={!c.inMonth}
                  onClick={() => cycle(c.key)}
                  className={`aspect-square rounded-full border text-sm font-medium transition-colors ${cls}`}
                >
                  {c.day}
                </button>
              );
            })}
          </div>
          <div className="flex items-center gap-5 mt-5 text-xs">
            <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-primary" /> Available</span>
            <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-accent" /> Booked</span>
            <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full border border-border" /> Off</span>
          </div>
        </div>

        {/* Presets */}
        <div className="space-y-3">
          {presets.map((p) => {
            const Icon = p.icon;
            const active = selectedPreset === p.id;
            return (
              <div key={p.id} className="rounded-2xl border border-border bg-card p-4 flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-accent/50 flex items-center justify-center"><Icon className="w-5 h-5 text-primary" /></div>
                <div className="flex-1">
                  <p className="font-semibold">{p.title}</p>
                  <p className="text-xs text-muted-foreground">{p.sub}</p>
                </div>
                <Button size="sm" variant={active ? "secondary" : "default"} className="rounded-full" onClick={() => setSelectedPreset(active ? null : p.id)}>
                  {active ? "Selected" : "Select"}
                </Button>
              </div>
            );
          })}
        </div>

        <div className="rounded-2xl border border-dashed border-primary/60 bg-accent/20 p-8 text-center space-y-3">
          <h2 className="font-syne font-bold text-2xl">Ready to Set Your Schedule?</h2>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">Create your profile and mark your availability to start receiving gig offers that fit your life.</p>
          <Button className="rounded-full px-6" onClick={() => navigate("/candidate/profile")}><CalendarPlus className="w-4 h-4 mr-2" /> Set My Availability</Button>
        </div>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur border-t border-border">
        <div className="max-w-5xl mx-auto grid grid-cols-4 px-2 py-2">
          {[
            { id: "home", label: "Home", icon: Home, path: "/candidate/dashboard" },
            { id: "explore", label: "Explore", icon: Compass, path: "/candidate/map" },
            { id: "gigs", label: "Gigs", icon: Briefcase, path: "/candidate/calendar", active: true },
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

export default CandidateAvailability;