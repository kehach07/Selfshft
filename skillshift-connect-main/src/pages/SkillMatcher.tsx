import { 
  Brain, 
  Sparkles, 
  Target, 
  Zap,
  ChefHat,
  Dumbbell,
  Palette,
  BookOpen,
  Music,
  Camera,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const skillCategories = [
  { icon: ChefHat, label: "Cooking", gigs: ["Chef", "Tiffin Service", "Mess Worker"] },
  { icon: Dumbbell, label: "Fitness", gigs: ["Gym Trainer", "Yoga Instructor", "Sports Coach"] },
  { icon: Palette, label: "Creative", gigs: ["Pottery", "Crafts", "Design"] },
  { icon: BookOpen, label: "Teaching", gigs: ["Tutor", "Coach", "Mentor"] },
  { icon: Music, label: "Music", gigs: ["Instrument Teacher", "DJ", "Singer"] },
  { icon: Camera, label: "Photography", gigs: ["Event Photos", "Portraits", "Product"] },
];

const SkillMatcher = () => {
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
            <span className="inline-block px-4 py-2 rounded-full bg-purple/20 text-purple text-sm font-semibold mb-4">
              AI-Powered Matching
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-syne font-bold mb-6">
              Your Skills, <span className="gradient-text">Perfect Gigs</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Our AI analyzes your interests and skills to recommend the best earning opportunities for you
            </p>
            <Button variant="gradient" size="xl">
              <Brain className="w-5 h-5 mr-2" />
              Start Skill Assessment
            </Button>
          </div>
        </div>
      </section>

      {/* How AI Matching Works */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-syne font-bold mb-4">
              How It Works
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: "01",
                icon: Target,
                title: "Share Your Interests",
                description: "Tell us what you love doing - cooking, fitness, teaching, creative work, or anything else",
              },
              {
                step: "02",
                icon: Brain,
                title: "AI Analysis",
                description: "Our smart algorithm matches your interests with high-demand gig categories in your area",
              },
              {
                step: "03",
                icon: Zap,
                title: "Get Recommendations",
                description: "Receive personalized gig suggestions that align with your skills and maximize earnings",
              },
            ].map((item, index) => (
              <div key={index} className="relative group">
                <div className="bg-card rounded-2xl p-8 border border-border text-center hover:border-primary/30 transition-all duration-300">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full gradient-bg flex items-center justify-center font-bold text-sm text-primary-foreground">
                    {item.step}
                  </div>
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-syne font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skill Categories */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-syne font-bold mb-4">
              Select Your Interests
            </h2>
            <p className="text-muted-foreground">Choose what excites you and see matching opportunities</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {skillCategories.map((category, index) => (
              <div
                key={index}
                className="group bg-card rounded-2xl p-6 border border-border hover:border-primary cursor-pointer transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-2xl gradient-bg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <category.icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-syne font-bold">{category.label}</h3>
                </div>
                
                <div className="space-y-2">
                  {category.gigs.map((gig, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <ArrowRight className="w-4 h-4 text-primary" />
                      {gig}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Recommendations Preview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-syne font-bold mb-4">
                Smart Recommendations
              </h2>
              <p className="text-muted-foreground mb-6">
                Based on your profile, our AI continuously finds new opportunities that match your evolving skills and interests.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-teal/10 rounded-xl border border-teal/20">
                  <Sparkles className="w-5 h-5 text-teal" />
                  <span>Real-time gig matching based on profile updates</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-purple/10 rounded-xl border border-purple/20">
                  <Sparkles className="w-5 h-5 text-purple" />
                  <span>Location-aware recommendations</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-coral/10 rounded-xl border border-coral/20">
                  <Sparkles className="w-5 h-5 text-coral" />
                  <span>Fee goal integrated suggestions</span>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-3xl p-8 border border-border">
              <div className="flex items-center gap-2 mb-6">
                <Brain className="w-6 h-6 text-primary" />
                <h3 className="font-syne font-bold">AI Says: "You'd be great at..."</h3>
              </div>
              
              <div className="space-y-4">
                {[
                  { title: "Photography Gigs", match: "95%", reason: "Based on your creative interest" },
                  { title: "Event Coordination", match: "88%", reason: "Your organizational skills" },
                  { title: "Social Media Help", match: "82%", reason: "Digital native profile" },
                ].map((rec, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-muted rounded-xl">
                    <div>
                      <p className="font-semibold">{rec.title}</p>
                      <p className="text-xs text-muted-foreground">{rec.reason}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-syne font-bold text-primary">{rec.match}</p>
                      <span className="text-xs text-muted-foreground">match</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SkillMatcher;
