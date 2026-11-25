import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Clock, MapPin, Play, Square, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import CandidateLayout from "@/components/CandidateLayout";

const CandidateCalendar = () => {
  const navigate = useNavigate();
  const [cursor, setCursor] = useState(() => new Date());
  const [selectedDay, setSelectedDay] = useState<number>(new Date().getDate());
  const [inShift, setInShift] = useState(false);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!inShift) return;
    const t = setInterval(() => setElapsed((v) => v + 1), 1000);
    return () => clearInterval(t);
  }, [inShift]);

  const fmt = (s: number) => {
    const h = String(Math.floor(s / 3600)).padStart(2, "0");
    const m = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
    const sec = String(s % 60).padStart(2, "0");
    return `${h}:${m}:${sec}`;
  };

  const bookedDays = new Set([5, 12, 18, 24]);
  const availableDays = new Set([2, 3, 8, 9, 10, 15, 16, 17, 22, 23, 27]);

  const { grid, monthLabel } = useMemo(() => {
    const y = cursor.getFullYear(), m = cursor.getMonth();
    const first = new Date(y, m, 1);
    const startDay = first.getDay();
    const daysIn = new Date(y, m + 1, 0).getDate();
    const cells: { day: number; inMonth: boolean; state: "available" | "booked" | "off" | "" }[] = [];
    for (let i = 0; i < startDay; i++) cells.push({ day: 0, inMonth: false, state: "" });
    for (let d = 1; d <= daysIn; d++) {
      const state = bookedDays.has(d) ? "booked" : availableDays.has(d) ? "available" : "off";
      cells.push({ day: d, inMonth: true, state });
    }
    while (cells.length % 7 !== 0) cells.push({ day: 0, inMonth: false, state: "" });
    return { grid: cells, monthLabel: first.toLocaleString("default", { month: "long", year: "numeric" }) };
  }, [cursor]);

  const scheduled = [
    { id: "s1", date: new Date(cursor.getFullYear(), cursor.getMonth(), 5), role: "Weekend Barista", customer: "Bloom Cafe", time: "08:00–14:00", location: "Manchester M1", pay: "£81.00" },
    { id: "s2", date: new Date(cursor.getFullYear(), cursor.getMonth(), 12), role: "Evening KP Cover", customer: "Nolita Kitchen", time: "17:30–22:30", location: "Deansgate", pay: "£60.00" },
    { id: "s3", date: new Date(cursor.getFullYear(), cursor.getMonth(), 18), role: "Lunch Rider", customer: "GreenBox", time: "11:30–14:30", location: "Central MCR", pay: "£45.00" },
  ];

  return (
    <CandidateLayout active="/candidate/calendar">
      <div className="space-y-8">
        <div className="flex items-start justify-between gap-6 flex-wrap">
          <div>
            <Badge variant="secondary" className="rounded-full mb-4 font-semibold">↗ Calendar</Badge>
            <h1 className="text-5xl md:text-6xl font-syne font-bold tracking-tight">Your month</h1>
            <p className="text-muted-foreground mt-4 max-w-2xl">
              Mark availability, review upcoming shifts, and clock in when the moment starts.
            </p>
          </div>
          <Button className="rounded-full h-12 px-6" onClick={() => navigate("/candidate/availability")}>
            <Plus className="w-4 h-4 mr-2" /> Add availability
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 rounded-2xl bg-card border border-border p-6">
            <div className="flex items-center justify-between mb-5">
              <p className="font-syne font-bold text-lg">{monthLabel}</p>
              <div className="flex items-center gap-4">
                <div className="hidden sm:flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-primary" />Available</span>
                  <span className="inline-flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-destructive" />Booked</span>
                  <span className="inline-flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-muted-foreground/40" />Off</span>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))} className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-muted"><ChevronLeft className="w-4 h-4" /></button>
                  <button onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))} className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-muted"><ChevronRight className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-semibold text-muted-foreground uppercase mb-2">
              {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => <div key={i}>{d}</div>)}
            </div>
            <div className="grid grid-cols-7 gap-2">
              {grid.map((c, idx) => {
                const active = c.inMonth && c.day === selectedDay;
                const dot = c.state === "booked" ? "bg-destructive" : c.state === "available" ? "bg-primary" : "bg-transparent";
                return (
                  <button
                    key={idx}
                    disabled={!c.inMonth}
                    onClick={() => setSelectedDay(c.day)}
                    className={`aspect-square rounded-xl text-sm font-medium relative flex items-center justify-center transition-colors ${
                      active ? "bg-primary text-primary-foreground" :
                      c.inMonth ? "bg-muted/40 hover:bg-muted text-foreground" :
                      "text-muted-foreground/30"
                    }`}
                  >
                    {c.day || ""}
                    {c.inMonth && c.state !== "off" && !active && (
                      <span className={`absolute bottom-1.5 w-1.5 h-1.5 rounded-full ${dot}`} />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-5">
            <div className="rounded-2xl bg-primary text-primary-foreground p-6">
              <p className="text-[10px] uppercase tracking-widest opacity-70">Month at a glance</p>
              <p className="text-4xl font-bold font-syne mt-1">12 gigs</p>
              <p className="text-sm opacity-80">Completed or scheduled</p>
              <div className="mt-4 pt-4 border-t border-primary-foreground/20 flex items-center justify-between">
                <span className="text-sm opacity-80">Total earnings</span>
                <span className="font-syne font-bold">£2,450</span>
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6">
              {!inShift ? (
                <>
                  <p className="text-sm font-semibold text-muted-foreground">Next shift ready</p>
                  <p className="text-2xl font-bold font-syne mt-1">Weekend Barista</p>
                  <p className="text-xs text-muted-foreground mt-1">Bloom Cafe · 08:00</p>
                  <Button className="w-full mt-4 rounded-full" onClick={() => { setInShift(true); setElapsed(0); }}>
                    <Play className="w-4 h-4 mr-2" /> Clock in
                  </Button>
                </>
              ) : (
                <>
                  <Badge className="rounded-full bg-primary/15 text-primary hover:bg-primary/15 gap-1">● Shift in progress</Badge>
                  <p className="text-3xl font-bold font-syne mt-3 tabular-nums">{fmt(elapsed)}</p>
                  <p className="text-[11px] uppercase tracking-widest text-muted-foreground mt-1">Elapsed time</p>
                  <Button variant="destructive" className="w-full mt-4 rounded-full" onClick={() => setInShift(false)}>
                    <Square className="w-4 h-4 mr-2" /> End shift
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="font-syne font-bold text-xl mb-5">Scheduled gigs</h2>
          <div className="space-y-3">
            {scheduled.map((s) => (
              <div key={s.id} className="rounded-2xl bg-muted/40 border border-border/60 p-4 flex items-center gap-4 flex-wrap">
                <div className="w-14 h-14 rounded-2xl bg-primary text-primary-foreground flex flex-col items-center justify-center shrink-0">
                  <span className="text-[10px] font-bold uppercase tracking-widest">{s.date.toLocaleString("default", { month: "short" })}</span>
                  <span className="font-syne font-bold text-lg leading-none">{s.date.getDate()}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold">{s.role}</p>
                  <p className="text-sm text-muted-foreground flex items-center gap-2 flex-wrap mt-1">
                    <span>{s.customer}</span>
                    <span className="opacity-40">·</span>
                    <span className="inline-flex items-center gap-1"><Clock className="w-3 h-3" />{s.time}</span>
                    <span className="opacity-40">·</span>
                    <span className="inline-flex items-center gap-1"><MapPin className="w-3 h-3" />{s.location}</span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-syne font-bold text-primary">{s.pay}</p>
                </div>
                <Button size="sm" className="rounded-full" onClick={() => { setInShift(true); setElapsed(0); }}>Clock in</Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </CandidateLayout>
  );
};

export default CandidateCalendar;