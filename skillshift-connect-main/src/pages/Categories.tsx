import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ShoppingBag, 
  Utensils, 
  Dumbbell, 
  ChefHat, 
  Hotel, 
  Home,
  GraduationCap,
  Palette,
  ArrowRight,
  Search,
  MapPin,
  Filter,
  Bike,
  Package
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import categoryTuition from "@/assets/category-tuition.jpg";
import categoryChef from "@/assets/category-chef.jpg";
import categoryFitness from "@/assets/category-fitness.jpg";
import categoryCrafts from "@/assets/category-crafts.jpg";
import categoryRetail from "@/assets/category-retail.jpg";
import categoryHotel from "@/assets/category-hotel.jpg";

const categories = [
  {
    icon: Bike,
    title: "Bike Rides",
    description: "Local rider gigs, pickup runs, and short mobility tasks",
    jobs: 760,
    image: categoryRetail,
    color: "from-primary to-secondary",
    avgPay: "₹200-450/hr",
    slug: "bike-rides",
  },
  {
    icon: Package,
    title: "Parcel Drop",
    description: "Package pickup, store drops, and same-day local delivery",
    jobs: 640,
    image: categoryHotel,
    color: "from-secondary to-primary",
    avgPay: "₹150-350/hr",
    slug: "parcel-drop",
  },
  {
    icon: ShoppingBag,
    title: "Shop Staff",
    description: "Retail, cashier, and customer service positions",
    jobs: 1250,
    image: categoryRetail,
    color: "from-teal to-teal-light",
    avgPay: "₹250-400/hr",
    slug: "shop-staff",
  },
  {
    icon: Utensils,
    title: "Restaurant Staff",
    description: "Waiters, hosts, and service positions",
    jobs: 890,
    image: categoryChef,
    color: "from-coral to-coral-light",
    avgPay: "₹200-350/hr",
    slug: "restaurant-staff",
  },
  {
    icon: Dumbbell,
    title: "Gym Trainers",
    description: "Personal training and fitness coaching",
    jobs: 430,
    image: categoryFitness,
    color: "from-purple to-purple-light",
    avgPay: "₹500-1000/hr",
    slug: "gym-trainers",
  },
  {
    icon: ChefHat,
    title: "Chefs & Cooks",
    description: "Kitchen staff and culinary positions",
    jobs: 670,
    image: categoryChef,
    color: "from-secondary to-pink",
    avgPay: "₹300-600/hr",
    slug: "chefs-cooks",
  },
  {
    icon: Hotel,
    title: "Hotel Management",
    description: "Front desk, housekeeping, and hospitality",
    jobs: 520,
    image: categoryHotel,
    color: "from-teal to-purple",
    avgPay: "₹250-500/hr",
    slug: "hotel-management",
  },
  {
    icon: Home,
    title: "Home Services",
    description: "Maids, mess workers, and domestic help",
    jobs: 980,
    image: categoryTuition,
    color: "from-coral to-purple",
    avgPay: "₹150-300/hr",
    slug: "home-services",
  },
  {
    icon: GraduationCap,
    title: "Tutoring",
    description: "Academic tutoring and coaching",
    jobs: 1500,
    image: categoryTuition,
    color: "from-accent to-pink",
    avgPay: "₹300-800/hr",
    slug: "tutoring",
  },
  {
    icon: Palette,
    title: "Creative Work",
    description: "Crafts, pottery, and artistic services",
    jobs: 340,
    image: categoryCrafts,
    color: "from-pink to-coral",
    avgPay: "₹400-1000/hr",
    slug: "creative-work",
  },
];

const Categories = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationTerm, setLocationTerm] = useState("");
  const { opportunities } = useAuth();
  const navigate = useNavigate();

  const normalizeRole = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const immediateCount = opportunities.filter((opp) => {
    const location = locationTerm.trim().toLowerCase();
    const matchesLocation = !location || [opp.city, opp.address].join(" ").toLowerCase().includes(location);
    return opp.immediateJoin && !opp.bookedBy && matchesLocation;
  }).length;

  const filteredCategories = categories.filter((cat) => {
    const query = searchTerm.trim().toLowerCase();
    const location = locationTerm.trim().toLowerCase();
    const matchingOpenings = opportunities.filter((opp) => {
      const sameCategory = normalizeRole(opp.category) === cat.slug;
      const matchesLocation = !location || [opp.city, opp.address, opp.locationHunt].join(" ").toLowerCase().includes(location);
      return sameCategory && !opp.bookedBy && matchesLocation;
    });
    const matchesText = !query || [cat.title, cat.description, ...matchingOpenings.map((opp) => `${opp.role} ${opp.description} ${opp.customerName}`)].join(" ").toLowerCase().includes(query);
    return matchesText && (!location || matchingOpenings.length > 0);
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="blob blob-1 opacity-20" />
          <div className="blob blob-2 opacity-20" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
              Browse Opportunities
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-syne font-bold mb-6">
              Find Your <span className="gradient-text">Perfect Role</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Explore diverse employment categories and discover opportunities that match your skills and interests
            </p>
          </div>

          {/* Search and Filters */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search categories..."
                  className="pl-12 h-14 rounded-xl"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Input
                placeholder="Your location"
                className="h-14 rounded-xl max-w-[190px]"
                value={locationTerm}
                onChange={(e) => setLocationTerm(e.target.value)}
              />
              <Button variant="outline" size="lg" className="h-14 px-6" onClick={() => navigate("/candidate/profile")}>
                <MapPin className="w-5 h-5 mr-2" />
                {immediateCount} Immediate
              </Button>
              <Button variant="outline" size="lg" className="h-14 px-6">
                <Filter className="w-5 h-5 mr-2" />
                Filters
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="pb-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredCategories.map((category, index) => (
              <div
                key={index}
                className="group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-2"
                onClick={() => navigate(`/roles/${category.slug}`)}
              >
                <div className="aspect-[4/5] relative">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-60 group-hover:opacity-70 transition-opacity duration-500`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                </div>

                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                    <category.icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  
                  <h3 className="text-xl font-syne font-bold text-primary-foreground mb-2">
                    {category.title}
                  </h3>
                  <p className="text-primary-foreground/80 text-sm mb-3 line-clamp-2">
                    {category.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-primary-foreground/70 text-sm block">
                         {(category.jobs + opportunities.filter((opp) => normalizeRole(opp.category) === category.slug).length).toLocaleString()} roles
                      </span>
                      <span className="text-primary-foreground font-semibold text-sm">
                        {category.avgPay}
                      </span>
                    </div>
                    <ArrowRight className="w-5 h-5 text-primary-foreground transition-all duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredCategories.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No categories found matching your search.</p>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="p-6 rounded-2xl glass">
              <p className="text-4xl font-syne font-bold gradient-text mb-2">8+</p>
              <p className="text-muted-foreground">Job Categories</p>
            </div>
            <div className="p-6 rounded-2xl glass">
              <p className="text-4xl font-syne font-bold gradient-text-secondary mb-2">6,500+</p>
              <p className="text-muted-foreground">Active Jobs</p>
            </div>
            <div className="p-6 rounded-2xl glass">
              <p className="text-4xl font-syne font-bold gradient-text mb-2">500+</p>
              <p className="text-muted-foreground">Cities</p>
            </div>
            <div className="p-6 rounded-2xl glass">
              <p className="text-4xl font-syne font-bold gradient-text-secondary mb-2">₹15K</p>
              <p className="text-muted-foreground">Avg. Monthly</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Categories;
