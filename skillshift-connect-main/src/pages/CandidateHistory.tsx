import { Badge } from "@/components/ui/badge";
import CandidateLayout from "@/components/CandidateLayout";
import { Star } from "lucide-react";

const CandidateHistory = () => {
  const history = [
    { id: "h1", date: "18 Jul", role: "Weekend Barista", customer: "Bloom Cafe", hours: 6, pay: "£81.00", rating: 5 },
    { id: "h2", date: "12 Jul", role: "Evening KP Cover", customer: "Nolita Kitchen", hours: 5, pay: "£60.00", rating: 5 },
    { id: "h3", date: "5 Jul", role: "Lunch Rider", customer: "GreenBox", hours: 3, pay: "£45.00", rating: 4 },
    { id: "h4", date: "28 Jun", role: "Retail Cover", customer: "Loop & Co.", hours: 4, pay: "£52.00", rating: 5 },
  ];

  return (
    <CandidateLayout active="/candidate/history">
      <div className="space-y-8">
        <div>
          <Badge variant="secondary" className="rounded-full mb-4 font-semibold">↗ Shift history</Badge>
          <h1 className="text-5xl md:text-6xl font-syne font-bold tracking-tight">Completed shifts</h1>
          <p className="text-muted-foreground mt-4 max-w-2xl">A record of every shift you've finished, with the pay and rating from the business.</p>
        </div>
        <div className="rounded-2xl border border-border bg-card divide-y divide-border">
          {history.map((h) => (
            <div key={h.id} className="flex items-center gap-4 p-5 flex-wrap">
              <div className="w-14 text-sm font-semibold text-muted-foreground">{h.date}</div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold">{h.role}</p>
                <p className="text-sm text-muted-foreground">{h.customer} · {h.hours}h</p>
              </div>
              <div className="flex items-center gap-1 text-sm">
                {Array.from({ length: h.rating }).map((_, i) => <Star key={i} className="w-4 h-4 fill-primary text-primary" />)}
              </div>
              <p className="font-syne font-bold text-primary w-20 text-right">{h.pay}</p>
            </div>
          ))}
        </div>
      </div>
    </CandidateLayout>
  );
};

export default CandidateHistory;