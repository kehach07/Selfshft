import { useNavigate } from "react-router-dom";
import {
  Sheet, SheetContent, SheetTrigger,
} from "@/components/ui/sheet";
import {
  Menu, Star, UserCog, Search, Calendar, ClipboardList, Wallet,
  ClipboardCheck, MonitorPlay, Settings, HelpCircle, LogOut,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface Props { trigger?: React.ReactNode }

const items = [
  { label: "Update profile", icon: UserCog, path: "/candidate/profile" },
  { label: "Gig scheduling", icon: Search, path: "/candidate/availability" },
  { label: "My Calendar", icon: Calendar, path: "/candidate/calendar" },
  { label: "My Applications", icon: ClipboardList, path: "/candidate/dashboard", badge: 2 },
  { label: "My Wallet", icon: Wallet, path: "/features/wallet" },
];

const secondary = [
  { label: "Skill Assessments", icon: ClipboardCheck, path: "/features/matcher" },
  { label: "Certificates", icon: MonitorPlay, path: "/features/learn" },
];

const tertiary = [
  { label: "Settings", icon: Settings, path: "/candidate/profile" },
  { label: "Help & Support", icon: HelpCircle, path: "/community" },
];

const CandidateSideMenu = ({ trigger }: Props) => {
  const navigate = useNavigate();
  const { profile, logout } = useAuth();
  const name = profile?.firstName || "Karan";
  const avatar = profile?.avatar;

  const go = (path: string) => navigate(path);

  return (
    <Sheet>
      <SheetTrigger asChild>
        {trigger || (
          <button className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-muted" aria-label="Open menu">
            <Menu className="w-5 h-5" />
          </button>
        )}
      </SheetTrigger>
      <SheetContent side="left" className="w-[86%] max-w-sm p-0 flex flex-col bg-background">
        <div className="p-5 border-b border-border">
          <div className="w-14 h-14 rounded-full bg-muted overflow-hidden border border-border mb-3">
            {avatar ? <img src={avatar} alt="" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center font-syne font-bold text-primary">{name[0]}</div>}
          </div>
          <p className="font-syne font-bold text-xl">{name}</p>
          <p className="text-sm text-muted-foreground">Professional Candidate</p>
          <span className="inline-flex items-center gap-1 mt-2 px-2.5 py-0.5 rounded-full bg-muted text-xs font-semibold">
            <Star className="w-3 h-3 fill-primary text-primary" /> 4.9 <span className="text-muted-foreground font-normal">(124 reviews)</span>
          </span>
        </div>

        <nav className="flex-1 overflow-y-auto py-3">
          <ul className="px-2">
            {items.map(({ label, icon: Icon, path, badge }) => (
              <li key={label}>
                <button onClick={() => go(path)} className="w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-muted transition-colors">
                  <Icon className="w-5 h-5 text-muted-foreground" />
                  <span className="flex-1 text-left font-medium">{label}</span>
                  {badge ? <span className="w-5 h-5 rounded-full bg-destructive text-destructive-foreground text-[11px] font-bold flex items-center justify-center">{badge}</span> : null}
                </button>
              </li>
            ))}
          </ul>
          <div className="my-2 border-t border-border mx-4" />
          <ul className="px-2">
            {secondary.map(({ label, icon: Icon, path }) => (
              <li key={label}>
                <button onClick={() => go(path)} className="w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-muted transition-colors">
                  <Icon className="w-5 h-5 text-muted-foreground" />
                  <span className="flex-1 text-left font-medium">{label}</span>
                </button>
              </li>
            ))}
          </ul>
          <div className="my-2 border-t border-border mx-4" />
          <ul className="px-2">
            {tertiary.map(({ label, icon: Icon, path }) => (
              <li key={label}>
                <button onClick={() => go(path)} className="w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-muted transition-colors">
                  <Icon className="w-5 h-5 text-muted-foreground" />
                  <span className="flex-1 text-left font-medium">{label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-border p-4">
          <button
            onClick={async () => { await logout(); navigate("/"); }}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-destructive hover:bg-destructive/10 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-semibold">Sign Out</span>
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CandidateSideMenu;