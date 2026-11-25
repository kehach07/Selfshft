import { ReactNode } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutGrid, UserCircle, Calendar as CalendarIcon, ClipboardList,
  History, Wallet, Bell, Sun, Moon, Menu,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import logoIcon from "@/assets/selfshft-icon.png";

const sideItems = [
  { label: "Dashboard", href: "/candidate/dashboard", icon: LayoutGrid },
  { label: "My Profile", href: "/candidate/profile", icon: UserCircle },
  { label: "Calendar", href: "/candidate/calendar", icon: CalendarIcon },
  { label: "Applications", href: "/candidate/applications", icon: ClipboardList },
  { label: "Shift History", href: "/candidate/history", icon: History },
  { label: "Fee Wallet", href: "/candidate/wallet", icon: Wallet },
  { label: "Notifications", href: "/candidate/notifications", icon: Bell },
];

const topLinks = [
  { label: "Find Gigs", href: "/candidate/dashboard" },
  { label: "Calendar", href: "/candidate/calendar" },
  { label: "Applications", href: "/candidate/applications" },
  { label: "Wallet", href: "/candidate/wallet" },
];

interface Props { children: ReactNode; active?: string }

const CandidateLayout = ({ children, active }: Props) => {
  const { profile, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const name = profile?.firstName || "Candidate";
  const initial = name[0]?.toUpperCase() || "C";
  const isActive = (href: string) =>
    active ? active === href : location.pathname === href || location.pathname.startsWith(href + "/");

  const handleLogout = async () => { await logout(); navigate("/"); };

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="sticky top-0 z-40 bg-background border-b border-border">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between gap-4">
          <Link to="/candidate/dashboard" className="flex items-center gap-3 shrink-0">
            <div className="w-14 h-14 rounded-2xl bg-accent/40 flex items-center justify-center">
              <img src={logoIcon} alt="SelfShft" className="h-9 w-auto object-contain" />
            </div>
            <div className="hidden sm:flex flex-col leading-tight">
              <span className="font-syne font-extrabold text-lg tracking-tight">SELFSHFT</span>
              <span className="text-[10px] font-semibold text-muted-foreground tracking-[0.2em] uppercase">Candidate Portal</span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {topLinks.map((l) => (
              <NavLink
                key={l.href}
                to={l.href}
                className={({ isActive: on }) =>
                  `text-sm font-medium transition-colors ${on ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <Link
              to="/candidate/notifications"
              aria-label="Notifications"
              className="relative w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary" />
            </Link>
            <Link
              to="/candidate/profile"
              className="flex items-center gap-2 pl-1 pr-4 py-1 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
            >
              <span className="w-8 h-8 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center text-sm font-bold overflow-hidden">
                {profile?.avatar ? <img src={profile.avatar} alt="" className="w-full h-full object-cover" /> : initial}
              </span>
              <span className="text-sm font-semibold">{name}</span>
            </Link>
            <Button variant="outline" size="sm" className="rounded-full h-10 px-4" onClick={handleLogout}>Logout</Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-6">
          {/* Sidebar */}
          <aside className="hidden md:block w-64 shrink-0">
            <nav className="sticky top-28 rounded-2xl border border-border bg-card p-3 space-y-1">
              {sideItems.map(({ label, href, icon: Icon }) => {
                const on = isActive(href);
                return (
                  <Link
                    key={href}
                    to={href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                      on ? "bg-primary text-primary-foreground" : "text-foreground/70 hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </Link>
                );
              })}
            </nav>
          </aside>

          {/* Mobile menu */}
          <div className="md:hidden fixed bottom-4 left-4 right-4 z-40">
            <details className="rounded-2xl border border-border bg-card shadow-lg">
              <summary className="flex items-center justify-between px-4 py-3 cursor-pointer list-none">
                <span className="flex items-center gap-2 font-syne font-bold text-sm">
                  <Menu className="w-4 h-4" /> Candidate menu
                </span>
              </summary>
              <div className="p-2 space-y-1">
                {sideItems.map(({ label, href, icon: Icon }) => (
                  <Link key={href} to={href} className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm ${isActive(href) ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}>
                    <Icon className="w-4 h-4" /> {label}
                  </Link>
                ))}
              </div>
            </details>
          </div>

          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default CandidateLayout;