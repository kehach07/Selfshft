import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, CheckCircle2, Clock, ShieldCheck, Star, Home, Search, Briefcase, User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const surveys = ["Safe Environment?", "Accurate Job Description?", "On-time Release?", "Supportive Staff?"];

const CustomerShiftCompleted = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<Record<string, "yes" | "no" | null>>({});
  const [rating, setRating] = useState(0);

  return (
    <div className="min-h-screen bg-background pb-28">
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-muted overflow-hidden border border-border" />
            <span className="font-syne font-extrabold text-xl text-primary">SelfShft</span>
          </div>
          <button className="w-9 h-9 rounded-full border border-border flex items-center justify-center"><Bell className="w-4 h-4" /></button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-full bg-primary/20 text-primary flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          <h1 className="text-2xl md:text-3xl font-syne font-bold">Shift Completed! Well done.</h1>
          <p className="text-sm text-muted-foreground">Your payment is being processed through escrow.</p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] tracking-wider text-primary font-bold">COMPLETED JOB</p>
              <p className="font-syne font-bold text-xl mt-1">Frontend Developer</p>
              <p className="text-sm text-muted-foreground">TechNova Startups</p>
            </div>
            <div className="rounded-xl bg-primary text-primary-foreground px-4 py-2 text-right">
              <p className="text-[10px]">Earned</p>
              <p className="font-syne font-bold text-lg leading-tight">$180.00</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 pt-4 mt-4 border-t border-border">
            <div className="flex gap-3"><div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center"><Clock className="w-4 h-4" /></div><div><p className="text-[10px] text-muted-foreground">Duration</p><p className="font-semibold">4 Hours</p></div></div>
            <div className="flex gap-3"><div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center"><ShieldCheck className="w-4 h-4" /></div><div><p className="text-[10px] text-muted-foreground">Status</p><p className="font-semibold text-primary">Verified</p></div></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="rounded-2xl border border-border bg-card p-5 space-y-3">
            <div className="flex items-center justify-between">
              <p className="font-syne font-bold">Escrow Release</p>
              <span className="text-primary font-bold text-sm">100%</span>
            </div>
            <Progress value={100} />
            <p className="text-xs text-muted-foreground pt-8">Funds will be available in your wallet within 24 hours.</p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5 space-y-3">
            <div>
              <p className="font-syne font-bold">Workplace Survey</p>
              <p className="text-xs text-muted-foreground">Help other candidates by sharing insights about this location.</p>
            </div>
            <div className="space-y-2">
              {surveys.map((s) => (
                <div key={s} className="flex items-center justify-between text-sm">
                  <span>{s}</span>
                  <div className="flex gap-2">
                    {(["no", "yes"] as const).map((val) => {
                      const active = answers[s] === val;
                      return (
                        <button
                          key={val}
                          onClick={() => setAnswers((a) => ({ ...a, [s]: val }))}
                          className={`px-3 py-1 rounded-full text-xs font-semibold border transition-colors ${
                            active
                              ? val === "yes"
                                ? "bg-primary text-primary-foreground border-primary"
                                : "bg-destructive text-destructive-foreground border-destructive"
                              : "border-border text-muted-foreground"
                          }`}
                        >
                          {val === "yes" ? "Yes" : "No"}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 text-center space-y-3">
          <p className="font-syne font-bold">Rate your Experience</p>
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((n) => (
              <button key={n} onClick={() => setRating(n)}>
                <Star className={`w-8 h-8 ${n <= rating ? "fill-primary text-primary" : "text-muted-foreground"}`} />
              </button>
            ))}
          </div>
        </div>

        <Button className="w-full rounded-xl h-12" onClick={() => navigate("/customer/dashboard")}>Back to Dashboard</Button>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur border-t border-border">
        <div className="max-w-5xl mx-auto grid grid-cols-4 px-2 py-2">
          {[
            { id: "home", label: "Home", icon: Home, path: "/customer/dashboard" },
            { id: "search", label: "Search", icon: Search, path: "/customer/search" },
            { id: "manage", label: "Manage", icon: Briefcase, path: "/customer/manage", active: true },
            { id: "profile", label: "Profile", icon: UserIcon, path: "/customer/saved" },
          ].map(({ id, label, icon: Icon, path, active }) => (
            <button key={id} onClick={() => navigate(path)} className="flex flex-col items-center gap-1 py-2">
              <span className={`px-5 py-1.5 rounded-full flex items-center justify-center ${active ? "bg-accent text-foreground" : "text-muted-foreground"}`}><Icon className="w-5 h-5" /></span>
              <span className={`text-[11px] font-medium ${active ? "text-foreground" : "text-muted-foreground"}`}>{label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default CustomerShiftCompleted;