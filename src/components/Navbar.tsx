import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, Sun, Moon } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/contexts/AuthContext";
import logoIcon from "@/assets/selfshft-icon.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navItems = [
  { label: "Categories", href: "/categories" },
  { label: "Services", href: "/services" },
  { label: "How It Works", href: "/how-it-works" },
  {
    label: "Features",
    href: "/features",
    children: [
      { label: "Fee Wallet", href: "/features/fee-wallet" },
      { label: "Skill Matcher", href: "/features/skill-matcher" },
      { label: "Gig Scheduling", href: "/features/scheduling" },
      { label: "Local Hiring Map", href: "/features/map" },
      { label: "Learn & Earn", href: "/features/learn-earn" },
    ],
  },
  { label: "Map", href: "/features/map" },
  { label: "Community", href: "/community" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { isLoggedIn, userRole, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => location.pathname === href;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "py-2 bg-background/95 backdrop-blur-md border-b border-border"
          : "bg-background/80 backdrop-blur-sm py-3 border-b border-transparent"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <img
            src={logoIcon}
            alt="SelfShft"
            className="h-10 md:h-11 w-auto object-contain"
          />
          <div className="hidden sm:flex flex-col leading-none">
            <span className="font-syne font-extrabold text-xl text-primary tracking-tight">
              SELFSHFT
            </span>
            <span className="text-[9px] font-semibold text-muted-foreground tracking-[0.18em] uppercase mt-0.5">
              Skills That Pay Your Bills
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1">
          {navItems.map((item) =>
            item.children ? (
              <DropdownMenu key={item.label}>
                <DropdownMenuTrigger
                  className={`flex items-center gap-1 px-3.5 py-2 rounded-md text-sm font-medium transition-colors outline-none ${
                    isActive(item.href)
                      ? "text-primary"
                      : "text-foreground/70 hover:text-primary"
                  }`}
                >
                  {item.label}
                  <ChevronDown className="w-3.5 h-3.5" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-background border-border shadow-md rounded-md p-1 mt-2">
                  <DropdownMenuItem asChild>
                    <Link to={item.href} className="cursor-pointer rounded px-3 py-2 text-sm font-medium hover:bg-muted hover:text-primary transition-colors">
                      All Features
                    </Link>
                  </DropdownMenuItem>
                  {item.children.map((child) => (
                    <DropdownMenuItem key={child.href} asChild>
                      <Link to={child.href} className="cursor-pointer rounded px-3 py-2 text-sm hover:bg-muted hover:text-primary transition-colors">
                        {child.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                key={item.label}
                to={item.href}
                className={`relative px-3.5 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? "text-primary"
                    : "text-foreground/70 hover:text-primary"
                }`}
              >
                {item.label}
                {isActive(item.href) && (
                  <span className="absolute -bottom-0.5 left-3.5 right-3.5 h-0.5 rounded-full bg-primary" />
                )}
              </Link>
            )
          )}
        </div>

        {/* CTA Buttons */}
        <div className="hidden lg:flex items-center gap-2.5">
          <button
            onClick={toggleTheme}
            className="relative w-9 h-9 rounded-md bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors border border-border overflow-hidden"
            aria-label="Toggle theme"
          >
            <Sun className={`w-4 h-4 absolute transition-all duration-300 text-foreground ${theme === 'light' ? 'rotate-0 scale-100 opacity-100' : 'rotate-90 scale-0 opacity-0'}`} />
            <Moon className={`w-4 h-4 absolute transition-all duration-300 text-foreground ${theme === 'dark' ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'}`} />
          </button>
          {isLoggedIn ? (
            <>
              <Link to={userRole === "customer" ? "/customer/dashboard" : "/candidate/dashboard"}>
                <Button variant="default" size="sm" className="rounded-md">
                  {userRole === "customer" ? "Dashboard" : "My Profile"}
                </Button>
              </Link>
              <Button variant="outline" size="sm" onClick={logout} className="rounded-md">
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login/customer">
                <Button variant="outline" size="sm" className="rounded-md">
                  Customer Login
                </Button>
              </Link>
              <Link to="/login/candidate">
                <Button variant="default" size="sm" className="rounded-md">
                  Get Started
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 rounded-xl hover:bg-muted/60 transition-colors border border-transparent hover:border-border/30"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <div className="relative w-6 h-6">
            <Menu className={`w-6 h-6 absolute transition-all duration-300 ${isMobileMenuOpen ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'}`} />
            <X className={`w-6 h-6 absolute transition-all duration-300 ${isMobileMenuOpen ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'}`} />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden absolute top-full left-0 right-0 transition-all duration-300 ${
        isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
      }`}>
        <div className="mx-3 mt-2 bg-background/95 backdrop-blur-xl border border-border/40 rounded-2xl p-4 shadow-xl shadow-primary/10">
          <div className="flex flex-col gap-1">
            {navItems.map((item) => (
              <div key={item.label}>
                <Link
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-2 py-2.5 px-3 rounded-xl font-medium text-sm transition-all ${
                    isActive(item.href)
                      ? "bg-primary/10 text-primary"
                      : "text-foreground/70 hover:bg-muted/60 hover:text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="pl-4 space-y-0.5 mb-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        to={child.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block py-1.5 px-3 rounded-lg text-xs text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="flex flex-col gap-2 pt-3 mt-2 border-t border-border/30">
              {isLoggedIn ? (
                <div className="flex items-center gap-2">
                  <Link to={userRole === "customer" ? "/customer/dashboard" : "/candidate/dashboard"} onClick={() => setIsMobileMenuOpen(false)} className="flex-1">
                    <Button variant="gradient" size="sm" className="w-full rounded-xl">
                      {userRole === "customer" ? "Dashboard" : "My Profile"}
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm" onClick={() => { logout(); setIsMobileMenuOpen(false); }} className="flex-1 rounded-xl">
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link to="/login/customer" onClick={() => setIsMobileMenuOpen(false)} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full rounded-xl">
                      Customer Login
                    </Button>
                  </Link>
                  <Link to="/login/candidate" onClick={() => setIsMobileMenuOpen(false)} className="flex-1">
                    <Button variant="default" size="sm" className="w-full rounded-md">
                      Get Started
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
