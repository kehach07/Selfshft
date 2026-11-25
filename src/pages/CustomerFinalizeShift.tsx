import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, Bell, Clock, User as UserIcon, Info, ArrowRight, Home, Search, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";

const CustomerFinalizeShift = () => {
  const navigate = useNavigate();
  const [digits, setDigits] = useState(["", "", "", ""]);
  const refs = useRef<Array<HTMLInputElement | null>>([]);

  const setDigit = (i: number, v: string) => {
    const clean = v.replace(/\D/g, "").slice(-1);
    const next = [...digits];
    next[i] = clean;
    setDigits(next);
    if (clean && i < 3) refs.current[i + 1]?.focus();
  };

  const complete = digits.every((d) => d.length === 1);

  return (
    <div className="min-h-screen bg-background pb-28">
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <button className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-muted"><Menu className="w-5 h-5" /></button>
            <span className="font-syne font-extrabold text-xl text-primary">SelfShft</span>
          </div>
          <button className="w-9 h-9 rounded-full border border-border flex items-center justify-center"><Bell className="w-4 h-4" /></button>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl md:text-3xl font-syne font-bold">Finalize &amp; Release</h1>
          <p className="text-sm text-muted-foreground">Provide this code to the candidate to complete the shift and release the escrow payment.</p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 space-y-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center"><UserIcon className="w-5 h-5 text-muted-foreground" /></div>
              <div>
                <p className="text-[10px] tracking-wider text-muted-foreground font-semibold">CANDIDATE</p>
                <p className="font-syne font-bold text-lg leading-tight">Karan Sharma</p>
                <p className="text-sm text-muted-foreground">Senior Frontend Developer</p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-[10px] font-bold whitespace-nowrap">IN PROGRESS</span>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-border">
            <div>
              <p className="text-[10px] tracking-wider text-muted-foreground font-semibold">TIME LOGGED</p>
              <p className="flex items-center gap-1 mt-1 font-semibold"><Clock className="w-4 h-4 text-primary" /> 8 Hours</p>
              <p className="text-xs text-muted-foreground">09:00 AM - 05:00 PM</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] tracking-wider text-muted-foreground font-semibold">TOTAL AMOUNT</p>
              <p className="mt-1 font-syne font-bold text-2xl">$680.00</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-muted/40 border border-dashed border-border p-5 space-y-4">
          <p className="text-center text-xs tracking-wider font-semibold text-muted-foreground">SECURITY RELEASE CODE</p>
          <div className="flex justify-center gap-3">
            {digits.map((d, i) => (
              <input
                key={i}
                ref={(el) => (refs.current[i] = el)}
                value={d}
                onChange={(e) => setDigit(i, e.target.value)}
                inputMode="numeric"
                maxLength={1}
                className="w-14 h-14 rounded-lg border border-border bg-background text-center font-syne font-bold text-2xl outline-none focus:border-primary"
              />
            ))}
          </div>
          <div className="rounded-xl bg-primary text-primary-foreground p-3 flex gap-2 text-sm">
            <Info className="w-4 h-4 mt-0.5 shrink-0" />
            <p>Sharing this code releases the $680.00 directly to the candidate's Fee Wallet.</p>
          </div>
        </div>

        <Button className="w-full rounded-xl h-14 text-base" disabled={!complete} onClick={() => navigate("/customer/completed")}>
          Back to Dashboard <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
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

export default CustomerFinalizeShift;