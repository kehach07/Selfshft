import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import CandidateLayout from "@/components/CandidateLayout";
import { useAuth } from "@/contexts/AuthContext";

const statusStyles: Record<string, string> = {
  Pending: "bg-muted text-foreground",
  Shortlisted: "bg-primary/15 text-primary",
  Confirmed: "bg-primary text-primary-foreground",
  Declined: "bg-destructive/15 text-destructive",
};

const CandidateApplications = () => {
  const { opportunities } = useAuth();
  const seed = opportunities.slice(0, 5);
  const rows = (seed.length ? seed : [
    { id: "a1", role: "Weekend Barista", customerName: "Bloom Cafe", city: "Manchester" },
    { id: "a2", role: "Evening KP Cover", customerName: "Nolita Kitchen", city: "Deansgate" },
    { id: "a3", role: "Lunch Rider", customerName: "GreenBox", city: "Central MCR" },
  ]).map((o, i) => ({
    id: o.id,
    role: o.role,
    customer: o.customerName,
    city: (o as { city?: string }).city || "Manchester",
    status: ["Pending", "Shortlisted", "Confirmed", "Declined"][i % 4],
    applied: `${i + 1}d ago`,
  }));

  return (
    <CandidateLayout active="/candidate/applications">
      <div className="space-y-8">
        <div>
          <Badge variant="secondary" className="rounded-full mb-4 font-semibold">↗ Applications</Badge>
          <h1 className="text-5xl md:text-6xl font-syne font-bold tracking-tight">Your applications</h1>
          <p className="text-muted-foreground mt-4 max-w-2xl">Track every gig you've applied to and jump back in when a business responds.</p>
        </div>

        <div className="rounded-2xl border border-border bg-card divide-y divide-border">
          {rows.map((r) => (
            <div key={r.id} className="flex items-center gap-4 p-5 flex-wrap">
              <div className="flex-1 min-w-0">
                <p className="font-semibold">{r.role}</p>
                <p className="text-sm text-muted-foreground">{r.customer} · {r.city} · Applied {r.applied}</p>
              </div>
              <Badge className={`rounded-full ${statusStyles[r.status]}`}>{r.status}</Badge>
              <Button variant="outline" size="sm" className="rounded-full">View</Button>
            </div>
          ))}
        </div>
      </div>
    </CandidateLayout>
  );
};

export default CandidateApplications;