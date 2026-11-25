import { 
  Heart, 
  Users, 
  Star, 
  Trophy,
  Gift,
  MessageCircle,
  TrendingUp,
  Sparkles,
  Quote
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const successStories = [
  {
    name: "Aman Sharma",
    role: "Tutor",
    earnings: "₹18,000",
    story: "Paid my entire semester fees through weekend tutoring sessions!",
    avatar: "A",
  },
  {
    name: "Priya Patel",
    role: "Event Helper",
    earnings: "₹12,500",
    story: "Started as an event helper, now I run my own event coordination service.",
    avatar: "P",
  },
  {
    name: "Rahul Kumar",
    role: "Gym Trainer",
    earnings: "₹25,000",
    story: "My fitness passion became my income source. Now training 15 clients!",
    avatar: "R",
  },
];

const Community = () => {
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
              Community
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-syne font-bold mb-6">
              Stories That <span className="gradient-text">Inspire</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Join our thriving community of young earners and read real success stories from students just like you
            </p>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-syne font-bold mb-4">
              Real Success Stories
            </h2>
            <p className="text-muted-foreground">From students who achieved their fee goals</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <div
                key={index}
                className="group bg-card rounded-3xl p-8 border border-border hover:border-primary/30 transition-all duration-300 hover:-translate-y-2 relative overflow-hidden"
              >
                <Quote className="absolute top-4 right-4 w-12 h-12 text-primary/10" />
                
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full gradient-bg flex items-center justify-center text-2xl font-bold text-primary-foreground">
                    {story.avatar}
                  </div>
                  <div>
                    <h3 className="font-syne font-bold text-lg">{story.name}</h3>
                    <p className="text-muted-foreground">{story.role}</p>
                  </div>
                </div>
                
                <p className="text-lg mb-6 italic">"{story.story}"</p>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Monthly Earnings</p>
                    <p className="text-2xl font-syne font-bold gradient-text">{story.earnings}</p>
                  </div>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow text-yellow" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button variant="outline-gradient" size="xl">
              Read More Stories
            </Button>
          </div>
        </div>
      </section>

      {/* Community Stats */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { icon: Users, value: "50K+", label: "Active Members" },
              { icon: Trophy, value: "₹5Cr+", label: "Total Earned" },
              { icon: Star, value: "25K+", label: "Gigs Completed" },
              { icon: Heart, value: "4.9", label: "Avg. Rating" },
            ].map((stat, index) => (
              <div key={index} className="p-6 rounded-2xl glass">
                <stat.icon className="w-10 h-10 text-primary mx-auto mb-3" />
                <p className="text-4xl font-syne font-bold gradient-text mb-2">{stat.value}</p>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Referral Program */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="rounded-3xl gradient-bg p-1">
            <div className="bg-card rounded-[calc(1.5rem-4px)] p-12">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 mb-4">
                    <Gift className="w-5 h-5 text-primary" />
                    <span className="font-semibold text-primary">Referral Program</span>
                  </div>
                  <h2 className="text-3xl font-syne font-bold mb-4">
                    Earn by Referring Friends
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Share SelfShft with friends, local shops, and tutoring seekers. 
                    Earn bonus money for every successful referral!
                  </p>
                  
                  <div className="space-y-4 mb-6">
                    {[
                      { label: "Refer a Friend", bonus: "₹100" },
                      { label: "Refer a Shop/Business", bonus: "₹250" },
                      { label: "Friend Completes First Gig", bonus: "₹150" },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-muted rounded-xl">
                        <span>{item.label}</span>
                        <span className="font-syne font-bold text-primary">{item.bonus}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button variant="gradient" size="xl">
                    <Gift className="w-5 h-5 mr-2" />
                    Start Referring
                  </Button>
                </div>

                <div className="bg-muted rounded-2xl p-8 text-center">
                  <Sparkles className="w-16 h-16 text-primary mx-auto mb-4" />
                  <h3 className="font-syne font-bold text-2xl mb-2">Your Referral Code</h3>
                  <div className="bg-card rounded-xl p-4 mb-4">
                    <p className="text-3xl font-mono font-bold tracking-wider">SELFSHFT2024</p>
                  </div>
                  <p className="text-muted-foreground mb-4">Share this code with friends</p>
                  <Button variant="outline" className="w-full">
                    Copy Code
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Financial Discipline */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-syne font-bold mb-4">
              Financial Discipline Challenges
            </h2>
            <p className="text-muted-foreground">Gamified savings to help you reach your goals faster</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: TrendingUp,
                title: "10-Day Earning Streak",
                description: "Earn every day for 10 days straight",
                reward: "₹500 bonus",
                color: "from-teal to-teal-light",
              },
              {
                icon: Trophy,
                title: "No-Spend Week",
                description: "7 days of saving all earnings for fees",
                reward: "Special badge",
                color: "from-coral to-coral-light",
              },
              {
                icon: Star,
                title: "Goal Crusher",
                description: "Reach your fee goal before deadline",
                reward: "₹1000 bonus",
                color: "from-purple to-purple-light",
              },
            ].map((challenge, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl p-6 border border-border hover:border-primary/30 transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${challenge.color} flex items-center justify-center mb-4`}>
                  <challenge.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="font-syne font-bold text-lg mb-2">{challenge.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{challenge.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-primary font-semibold">{challenge.reward}</span>
                  <Button variant="ghost" size="sm">Join</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Youth Gig Kit */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-syne font-bold mb-4">
              Youth Gig Kit
            </h2>
            <p className="text-muted-foreground">Free resources to help you succeed</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Invoice Templates", downloads: "2.5K" },
              { title: "Gig Agreement Templates", downloads: "1.8K" },
              { title: "Profile Improvement Tips", downloads: "3.2K" },
              { title: "Hourly Rate Guide", downloads: "4.1K" },
            ].map((resource, index) => (
              <div key={index} className="bg-card rounded-xl p-6 border border-border text-center hover:border-primary/30 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{resource.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{resource.downloads} downloads</p>
                <Button variant="outline" size="sm" className="w-full">
                  Download Free
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Community;
