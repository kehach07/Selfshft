import { useMemo, useState } from "react";
import { Bookmark, Search, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import CustomerLayout from "@/components/CustomerLayout";

const seed = [
  { name: "Arjun Mehta", role: "Senior Frontend Developer", distance: "2.5 km away", status: "Available Now", score: 98, initials: "AM" },
  { name: "Sarah Jenkins", role: "Lead UX Designer", distance: "4.8 km away", status: "On Project", score: 94, initials: "SJ" },
  { name: "Marcus Thorne", role: "Data Scientist", distance: "1.2 km away", status: "Available Now", score: 99, initials: "MT" },
];

const CustomerSaved = () => {
  const [q, setQ] = useState("");
  const results = useMemo(
    () => seed.filter((c) => !q || c.name.toLowerCase().includes(q.toLowerCase()) || c.role.toLowerCase().includes(q.toLowerCase())),
    [q]
  );

  return (
    <CustomerLayout>
      <div className="space-y-5">
        <div>
          <h1 className="text-2xl md:text-3xl font-syne font-bold mb-1">Saved Candidates</h1>
          <p className="text-sm text-muted-foreground">Your shortlist of favorite talent.</p>
        </div>
        <div className="relative">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search your saved talent..." className="w-full pl-11 pr-4 h-12 rounded-2xl bg-card border border-border text-sm outline-none focus:border-primary/40" />
        </div>

        <div className="space-y-4">
          {results.map((c) => (
            <div key={c.name} className="rounded-2xl border border-border bg-card p-4">
              <div className="flex items-start gap-4">
                <div className="relative shrink-0">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/30 to-accent flex items-center justify-center font-syne font-bold text-primary">{c.initials}</div>
                  <span className="absolute -bottom-1 -left-1 px-1.5 py-0.5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold">{c.score}/100</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-syne font-bold">{c.name}</p>
                  <p className="text-sm text-muted-foreground">{c.role}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-2 mt-1">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {c.distance}</span>
                    <span className="text-primary font-medium">• {c.status}</span>
                  </p>
                </div>
                <button className="text-primary"><Bookmark className="w-5 h-5 fill-primary" /></button>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-4">
                <Button className="rounded-xl"><Send className="w-3.5 h-3.5 mr-1" /> Message</Button>
                <Button variant="outline" className="rounded-xl">View Profile</Button>
              </div>
            </div>
          ))}
          {results.length === 0 && <div className="rounded-2xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">No saved profiles match.</div>}
        </div>
      </div>
    </CustomerLayout>
  );
};

export default CustomerSaved;