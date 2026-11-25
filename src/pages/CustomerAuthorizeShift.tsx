import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, Bell, Clock, Wallet, ShieldCheck, Copy, Info, Home, Search, Briefcase, User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const CustomerAuthorizeShift = () => {
  const navigate = useNavigate();
  const code = useMemo(() => String(Math.floor(1000 + Math.random() * 9000)), []);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    toast({ title: "Code copied", description: "Share it with your candidate." });
    setTimeout(() => setCopied(false), 2000);
  };

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
          <h1 className="text-2xl md:text-3xl font-syne font-bold">Authorize Shift</h1>
          <p className="text-sm text-muted-foreground">Share the code below with your candidate to officially start their shift.</p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 space-y-5">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/30 to-accent flex items-center justify-center font-syne font-bold text-primary">KS</div>
            <div className="flex-1">
              <p className="font-syne font-bold text-lg">Karan Sharma</p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold">SENIOR</span>
                Frontend Developer
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-border">
            <div>
              <p className="text-[10px] tracking-wider text-muted-foreground font-semibold">SHIFT TIME</p>
              <p className="flex items-center gap-1 mt-1 font-semibold"><Clock className="w-4 h-4 text-primary" /> 09:00 AM - 05:00 PM</p>
            </div>
            <div>
              <p className="text-[10px] tracking-wider text-muted-foreground font-semibold">HOURLY RATE</p>
              <p className="flex items-center gap-1 mt-1 font-semibold"><Wallet className="w-4 h-4 text-primary" /> $85.00/hr</p>
            </div>
          </div>

          <div className="rounded-xl border-2 border-dashed border-primary/40 p-5 space-y-4">
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              Verification Code <ShieldCheck className="w-4 h-4 text-primary" />
            </div>
            <div className="flex justify-center gap-3">
              {code.split("").map((d, i) => (
                <div key={i} className="w-14 h-14 rounded-lg border border-border bg-background flex items-center justify-center font-syne font-bold text-2xl">{d}</div>
              ))}
            </div>
            <div className="flex justify-center">
              <Button variant="outline" size="sm" className="rounded-full" onClick={copy}><Copy className="w-3.5 h-3.5 mr-1" /> {copied ? "Copied" : "Copy Code"}</Button>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-muted/50 p-4 flex gap-3 text-sm text-muted-foreground">
          <Info className="w-4 h-4 mt-0.5 shrink-0" />
          <p>"This code ensures the candidate has arrived and is ready to work."</p>
        </div>

        <div className="text-center space-y-3">
          <button className="text-sm font-semibold underline">Need help with verification?</button>
          <div>
            <Button className="rounded-full px-8" onClick={() => navigate("/customer/finalize")}>Proceed to Finalize</Button>
          </div>
        </div>
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

export default CustomerAuthorizeShift;