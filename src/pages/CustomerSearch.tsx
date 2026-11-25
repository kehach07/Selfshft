import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ShieldCheck, MapPin, Send, UserSearch, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import CustomerLayout from "@/components/CustomerLayout";

const filters = ["Verified Only", "Top Rated", "Near Me", "Available Now", "Full Time"];

const seedCandidates = [
  { name: "Arjun Mehta", role: "Senior Frontend Developer", distance: "2.5 km away", score: 98, initials: "AM" },
  { name: "Sarah Jenkins", role: "Creative Director", distance: "4.1 km away", score: 95, initials: "SJ" },
  { name: "David Chen", role: "Cloud Architect", distance: "1.2 km away", score: 99, initials: "DC" },
  { name: "Priya Nair", role: "Content Strategist", distance: "3.7 km away", score: 92, initials: "PN" },
  { name: "Marco Ruiz", role: "Backend Engineer", distance: "5.6 km away", score: 90, initials: "MR" },
];

const CustomerSearch = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<string[]>(["Verified Only"]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return seedCandidates.filter((c) => !q || c.role.toLowerCase().includes(q) || c.name.toLowerCase().includes(q));
  }, [query]);

  const toggle = (f: string) => setActive((prev) => prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]);

  return (
    <CustomerLayout>
      <div className="space-y-5">
        <div>
          <h1 className="text-2xl md:text-3xl font-syne font-bold mb-1">Search Candidates</h1>
          <p className="text-sm text-muted-foreground">Find verified talent nearby ready to book.</p>
        </div>
        <div className="space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by job title (e.g. Frontend Developer)"
              className="w-full pl-11 pr-4 h-12 rounded-full bg-card border border-border text-sm outline-none focus:border-primary/40"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
            {filters.map((f) => {
              const on = active.includes(f);
              return (
                <button
                  key={f}
                  onClick={() => toggle(f)}
                  className={`shrink-0 px-4 py-1.5 rounded-full border text-sm font-medium flex items-center gap-1 transition-colors ${
                    on ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border hover:border-primary/40"
                  }`}
                >
                  {f === "Verified Only" && <ShieldCheck className="w-3.5 h-3.5" />}
                  {f}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Sort by:</span>
            <button className="px-3 py-1 rounded-lg border border-border flex items-center gap-1 font-medium">Relevance <ChevronDown className="w-3 h-3" /></button>
          </div>
          <span className="text-xs text-muted-foreground">{results.length * 65} results</span>
        </div>

        <div>
          <p className="text-sm text-muted-foreground mb-3">Recommended Candidates</p>
          <div className="space-y-3">
            {results.map((c) => (
              <div key={c.name} className="rounded-2xl border border-border bg-card p-4 flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/30 to-accent flex items-center justify-center font-syne font-bold text-primary shrink-0">
                  {c.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-syne font-bold">{c.name}</p>
                  <p className="text-sm text-muted-foreground">{c.role}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5"><MapPin className="w-3 h-3" /> {c.distance}</p>
                </div>
                <div className="hidden sm:block">
                  <span className="px-2 py-1 rounded-full bg-primary/15 text-primary text-xs font-bold">{c.score}/100</span>
                </div>
                <div className="flex flex-col gap-2">
                  <Button size="sm" variant="outline" className="rounded-full">View Profile</Button>
                  <Button size="sm" className="rounded-full"><Send className="w-3.5 h-3.5 mr-1" /> Message</Button>
                </div>
              </div>
            ))}
            {results.length === 0 && (
              <div className="rounded-2xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">No candidates match your search.</div>
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-dashed border-primary/50 bg-accent/20 p-8 text-center space-y-3">
          <UserSearch className="w-8 h-8 mx-auto text-primary" />
          <p className="font-syne font-bold text-lg">Can't find the perfect fit?</p>
          <p className="text-sm text-muted-foreground">Post a custom shift request and let elite talent come to you.</p>
          <Button className="rounded-full px-6" onClick={() => navigate("/customer/post-gig")}>Post a Shift</Button>
        </div>
      </div>
    </CustomerLayout>
  );
};

export default CustomerSearch;