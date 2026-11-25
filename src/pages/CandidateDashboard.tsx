import { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Calendar as CalendarIcon, FileText, Wallet, Star, MapPin, Clock, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import CandidateLayout from "@/components/CandidateLayout";

const CandidateDashboard = () => {
  const { profile, opportunities } = useAuth();
  const navigate = useNavigate();
  const firstName = profile?.firstName || "there";

  const upcoming = useMemo(
    () => opportunities.slice(0, 4).map((o, i) => ({
      id: o.id,
      date: new Date(Date.now() + (i + 1) * 86400000 * 2),
      role: o.role,
      customer: o.customerName,
      time: o.timing || "08:00–14:00",
      location: `${o.city || "Manchester"}${o.locationHunt ? " · " + o.locationHunt : ""}`,
      pay: o.payAmount ? `£${o.payAmount}.00` : "£65.00",
    })),
    [opportunities],
  );

  const shifts = upcoming.length ? upcoming : [
    { id: "d1", date: new Date(), role: "Weekend Barista", customer: "Bloom Cafe", time: "08:00–14:00", location: "Manchester M1", pay: "£81.00" },
    { id: "d2", date: new Date(Date.now() + 3 * 86400000), role: "Evening KP Cover", customer: "Nolita Kitchen", time: "17:30–22:30", location: "Deansgate", pay: "£60.00" },
    { id: "d3", date: new Date(Date.now() + 7 * 86400000), role: "Lunch Rider", customer: "GreenBox", time: "11:30–14:30", location: "Central MCR", pay: "£45.00" },
  ];

  const stats = [
    { icon: CalendarIcon, value: String(shifts.length), label: "Upcoming shifts" },
    { icon: FileText, value: "3", label: "Active applications" },
    { icon: Wallet, value: "£201.00", label: "Earned this month" },
    { icon: Star, value: "4.8", label: "Average rating" },
  ];

  return (
    <CandidateLayout>
      <div className="space-y-8">
        <div className="flex items-start justify-between gap-6 flex-wrap">
          <div>
            <Badge variant="secondary" className="rounded-full mb-4 font-semibold">↗ Candidate Portal</Badge>
            <h1 className="text-5xl md:text-6xl font-syne font-bold tracking-tight">Hey, {firstName}</h1>
            <p className="text-muted-foreground mt-4 max-w-2xl">
              You've got {shifts.length} scheduled shifts and 3 live applications. Keep your calendar fresh — recruiters book fastest on availability that's under 48 hours old.
            </p>
          </div>
          <Button className="rounded-full h-12 px-6" onClick={() => navigate("/candidate/calendar")}>
            <CalendarIcon className="w-4 h-4 mr-2" /> Set availability
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map(({ icon: Icon, value, label }) => (
            <div key={label} className="rounded-2xl border border-border bg-card p-5">
              <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center mb-4">
                <Icon className="w-5 h-5 text-foreground/70" />
              </div>
              <p className="text-3xl font-syne font-bold">{value}</p>
              <p className="text-sm text-muted-foreground mt-1">{label}</p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-syne font-bold">Upcoming shifts</h2>
            <Link to="/candidate/calendar" className="text-sm font-semibold text-foreground/70 hover:text-foreground inline-flex items-center gap-1">
              Open calendar <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="space-y-3">
            {shifts.map((s) => (
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
                <Button size="sm" className="rounded-full" onClick={() => navigate("/candidate/calendar")}>Clock in</Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </CandidateLayout>
  );
};

export default CandidateDashboard;