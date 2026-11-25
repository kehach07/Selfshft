import { 
  MapPin, 
  Search, 
  Navigation, 
  Users,
  Filter,
  Star,
  Briefcase
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const LocalMap = () => {
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
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-4 py-2 rounded-full bg-pink/20 text-pink text-sm font-semibold mb-4">
              Location-Based Discovery
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-syne font-bold mb-6">
              Find Talent <span className="gradient-text">Near You</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Discover candidates and opportunities in your neighborhood with our interactive map
            </p>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-card rounded-2xl p-6 border border-border">
                <h3 className="font-syne font-bold mb-4 flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Filters
                </h3>

                {/* Location Search */}
                <div className="mb-6">
                  <label className="text-sm font-medium mb-2 block">Location</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input placeholder="Enter location..." className="pl-10" />
                  </div>
                </div>

                {/* Distance */}
                <div className="mb-6">
                  <label className="text-sm font-medium mb-2 block">Distance</label>
                  <div className="flex flex-wrap gap-2">
                    {['5 km', '10 km', '20 km', '50 km'].map((dist) => (
                      <Button key={dist} variant="outline" size="sm" className="flex-1">
                        {dist}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Category */}
                <div className="mb-6">
                  <label className="text-sm font-medium mb-2 block">Category</label>
                  <select className="w-full p-2 rounded-lg border border-border bg-background">
                    <option>All Categories</option>
                    <option>Tutoring</option>
                    <option>Fitness</option>
                    <option>Cooking</option>
                    <option>Creative</option>
                  </select>
                </div>

                <Button variant="gradient" className="w-full">
                  Apply Filters
                </Button>
              </div>

              {/* Quick Stats */}
              <div className="bg-card rounded-2xl p-6 border border-border">
                <h3 className="font-syne font-bold mb-4">In Your Area</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Candidates</span>
                    <span className="font-bold">247</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Open Gigs</span>
                    <span className="font-bold">89</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Avg. Rating</span>
                    <span className="font-bold flex items-center gap-1">
                      4.8 <Star className="w-4 h-4 fill-yellow text-yellow" />
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Area */}
            <div className="lg:col-span-3">
              <div className="bg-card rounded-3xl border border-border overflow-hidden h-[600px] relative">
                {/* Placeholder Map */}
                <div className="absolute inset-0 bg-gradient-to-br from-teal/5 to-purple/5 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <MapPin className="w-12 h-12 text-primary" />
                    </div>
                    <h3 className="font-syne font-bold text-xl mb-2">Interactive Map</h3>
                    <p className="text-muted-foreground mb-4">See candidates and gigs on a real-time map</p>
                    <Button variant="gradient">
                      <Navigation className="w-4 h-4 mr-2" />
                      Enable Location
                    </Button>
                  </div>
                </div>

                {/* Sample Map Markers */}
                <div className="absolute top-20 left-1/4 animate-bounce-gentle">
                  <div className="w-10 h-10 rounded-full bg-teal flex items-center justify-center shadow-lg">
                    <Users className="w-5 h-5 text-primary-foreground" />
                  </div>
                </div>
                <div className="absolute top-1/3 right-1/4 animate-bounce-gentle" style={{ animationDelay: '0.5s' }}>
                  <div className="w-10 h-10 rounded-full bg-coral flex items-center justify-center shadow-lg">
                    <Briefcase className="w-5 h-5 text-primary-foreground" />
                  </div>
                </div>
                <div className="absolute bottom-1/3 left-1/3 animate-bounce-gentle" style={{ animationDelay: '1s' }}>
                  <div className="w-10 h-10 rounded-full bg-purple flex items-center justify-center shadow-lg">
                    <Users className="w-5 h-5 text-primary-foreground" />
                  </div>
                </div>
              </div>

              {/* Nearby Results */}
              <div className="mt-8">
                <h3 className="font-syne font-bold text-xl mb-4">Nearby Candidates</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    { name: "Priya S.", skill: "Tutor", distance: "1.2 km", rating: 4.9 },
                    { name: "Rahul M.", skill: "Trainer", distance: "2.5 km", rating: 4.8 },
                    { name: "Anita K.", skill: "Chef", distance: "3.1 km", rating: 4.7 },
                  ].map((candidate, index) => (
                    <div key={index} className="bg-card rounded-xl p-4 border border-border hover:border-primary/30 transition-colors">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-full gradient-bg" />
                        <div>
                          <p className="font-semibold">{candidate.name}</p>
                          <p className="text-sm text-muted-foreground">{candidate.skill}</p>
                        </div>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          {candidate.distance}
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow text-yellow" />
                          {candidate.rating}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LocalMap;
