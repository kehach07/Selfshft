import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Bike, Briefcase, CheckCircle, Clock, MapPin, Package, Phone, Search, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Opportunity, useAuth } from "@/contexts/AuthContext";

const roleMeta: Record<string, { title: string; description: string; icon: typeof Briefcase }> = {
  "bike-rides": { title: "Bike Rides", description: "Quick rider jobs, errands, pickup support, and mobility help.", icon: Bike },
  "parcel-drop": { title: "Parcel Drop", description: "Package pickup, local delivery, and same-day drop opportunities.", icon: Package },
};

const fallbackOpportunities: Opportunity[] = [
  {
    id: "sample-bike-1",
    customerId: "sample",
    customerName: "Swift Local Store",
    contactPerson: "Rohan",
    phone: "+91 90000 12345",
    category: "Bike Rides",
    role: "Evening bike rider",
    description: "Support nearby customer pickups and short-distance item movement after college hours.",
    city: "Your City",
    address: "Central market area",
    schedule: "Evening / part-time",
    budget: "200-400",
    openings: "2",
  },
  {
    id: "sample-parcel-1",
    customerId: "sample",
    customerName: "Campus Courier Desk",
    contactPerson: "Anika",
    phone: "+91 90000 54321",
    category: "Parcel Drop",
    role: "Parcel drop assistant",
    description: "Pick parcels from store counters and drop them to nearby hostels and apartments.",
    city: "Your City",
    address: "College road",
    schedule: "Daily 2-3 hours",
    budget: "100-200",
    openings: "3",
  },
];

const normalize = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const roleAliases: Record<string, string[]> = {
  "gym-trainers": ["gym-trainers", "fitness-training", "fitness", "gym", "trainer", "personal-training"],
  "shop-staff": ["shop-staff", "retail-shop-staff", "retail", "cashier"],
  "restaurant-staff": ["restaurant-staff", "customer-service", "waiter", "service"],
  "chefs-cooks": ["chefs-cooks", "cooking-chef", "chef", "cook"],
  "home-services": ["home-services", "maid-cleaning", "tiffin-service", "cleaning"],
  "creative-work": ["creative-work", "freelance-design", "photography", "video-editing", "social-media", "content-writing"],
  "parcel-drop": ["parcel-drop", "delivery", "drop"],
};

const RoleOpportunities = () => {
  const { role = "" } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [applicationNotes, setApplicationNotes] = useState<Record<string, string>>({});
  const { opportunities, isLoggedIn, userRole, bookOpportunity } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const meta = roleMeta[role] || { title: role.replace(/-/g, " ") || "All Roles", description: "Browse customer-posted roles in this category.", icon: Briefcase };
  const Icon = meta.icon;
  const allItems = opportunities.length ? opportunities : fallbackOpportunities;
  const filtered = useMemo(() => allItems.filter((opp) => {
    const aliases = roleAliases[role] || [role];
    const categorySlug = normalize(opp.category || "");
    const roleSlug = normalize(opp.role || "");
    const matchesRole = role === "" || aliases.some((alias) => categorySlug === alias || roleSlug.includes(alias) || categorySlug.includes(alias));
    const matchesSearch = [opp.customerName, opp.role, opp.category, opp.description, opp.city, opp.address, opp.locationHunt, opp.timing, opp.duration, opp.payAmount].join(" ").toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRole && matchesSearch;
  }), [allItems, role, searchTerm]);

  const handleBook = (id: string) => {
    if (!isLoggedIn || userRole !== "candidate") {
      toast({ title: "Candidate login needed", description: "Login as a candidate to book this opportunity." });
      navigate("/login/candidate");
      return;
    }
    bookOpportunity(id, applicationNotes[id] || "I am interested in this opportunity.");
    toast({ title: "Application sent!", description: "The customer can now review your profile and contact details." });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="blob blob-1 opacity-20" />
        <div className="container mx-auto px-4 relative z-10">
          <Link to="/categories" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to roles
          </Link>
          <div className="grid lg:grid-cols-[1fr_360px] gap-8 items-end">
            <div>
              <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center mb-5 shadow-lg shadow-primary/20">
                <Icon className="w-8 h-8 text-primary-foreground" />
              </div>
              <h1 className="text-4xl md:text-6xl font-syne font-bold mb-4 capitalize">{meta.title} <span className="gradient-text">Opportunities</span></h1>
              <p className="text-lg text-muted-foreground max-w-2xl">{meta.description} Customer posts from the portal appear here automatically by category.</p>
            </div>
            <div className="glass rounded-2xl p-5 border border-border/40">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search customers or area" className="pl-12 h-12 bg-background/50" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-6">
            {filtered.map((opp) => (
              <article key={opp.id} className="glass rounded-2xl p-6 border border-border/40 hover:border-primary/50 transition-all">
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div>
                    <p className="text-sm font-semibold text-primary mb-1">{opp.category}</p>
                    <h2 className="text-2xl font-syne font-bold">{opp.role}</h2>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    {opp.immediateJoin ? <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary"><Clock className="w-3 h-3" /> Immediate</span> : null}
                    {opp.bookedBy ? <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary"><CheckCircle className="w-3 h-3" /> Booked</span> : null}
                  </div>
                </div>
                <p className="text-muted-foreground mb-5">{opp.description}</p>
                <div className="grid sm:grid-cols-2 gap-3 text-sm mb-6">
                  <div className="flex items-center gap-2"><Users className="w-4 h-4 text-primary" /> {opp.customerName}</div>
                  <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-primary" /> {opp.phone || "Phone after booking"}</div>
                  <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /> {opp.locationHunt || opp.city || "Nearby"}</div>
                  <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-primary" /> {opp.timing || opp.schedule || "Flexible"}</div>
                  <div className="flex items-center gap-2"><Briefcase className="w-4 h-4 text-primary" /> {opp.duration || "Short-term"}</div>
                </div>
                {isLoggedIn && userRole === "candidate" && !opp.bookedBy && <Textarea value={applicationNotes[opp.id] || ""} onChange={(e) => setApplicationNotes((prev) => ({ ...prev, [opp.id]: e.target.value }))} placeholder="Add a short application note for the customer" className="mb-5 bg-background/50" />}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-5 border-t border-border/50">
                  <div>
                    <p className="text-xs text-muted-foreground">Pay / Openings</p>
                    <p className="font-bold">₹{opp.payAmount || opp.budget || "Discuss"}/{opp.payType || "hour"} · {opp.openings || "1"} open</p>
                  </div>
                  <Button variant="gradient" onClick={() => handleBook(opp.id)} disabled={Boolean(opp.bookedBy)}>
                    {opp.bookedBy ? "Applied" : "Apply Now"}
                  </Button>
                </div>
              </article>
            ))}
          </div>
          {filtered.length === 0 && <div className="glass rounded-2xl p-10 text-center text-muted-foreground">No customer opportunities yet in this role.</div>}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default RoleOpportunities;