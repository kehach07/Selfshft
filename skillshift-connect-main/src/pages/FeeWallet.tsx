import { 
  Wallet, 
  Target, 
  Lock, 
  TrendingUp, 
  Bell, 
  PiggyBank,
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const FeeWallet = () => {
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
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-4 py-2 rounded-full bg-teal/20 text-teal text-sm font-semibold mb-4">
                Fee Wallet
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-syne font-bold mb-6">
                Save Smart, <span className="gradient-text">Pay Your Fees</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                A dedicated digital savings account where you can save specifically for education fees, 
                track progress, and achieve your financial goals.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button variant="gradient" size="xl">
                  Activate Fee Wallet
                </Button>
                <Button variant="outline" size="xl">
                  Learn More
                </Button>
              </div>
            </div>

            {/* Wallet Preview Card */}
            <div className="relative">
              <div className="bg-card rounded-3xl p-8 border border-border shadow-xl">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center">
                      <Wallet className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Balance</p>
                      <p className="text-2xl font-syne font-bold">₹24,500</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Bell className="w-5 h-5" />
                  </Button>
                </div>

                {/* Fee Goal Progress */}
                <div className="bg-muted rounded-2xl p-6 mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Target className="w-5 h-5 text-primary" />
                      <span className="font-semibold">Semester Fee Goal</span>
                    </div>
                    <span className="text-sm text-muted-foreground">75%</span>
                  </div>
                  <Progress value={75} className="h-3 mb-3" />
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">₹18,000 saved</span>
                    <span className="font-semibold text-primary">₹24,000 goal</span>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-3 gap-3">
                  <button className="p-4 rounded-xl bg-muted hover:bg-muted/80 transition-colors text-center">
                    <ArrowUpRight className="w-5 h-5 mx-auto mb-1 text-teal" />
                    <span className="text-xs">Add Money</span>
                  </button>
                  <button className="p-4 rounded-xl bg-muted hover:bg-muted/80 transition-colors text-center">
                    <CreditCard className="w-5 h-5 mx-auto mb-1 text-coral" />
                    <span className="text-xs">Pay Fees</span>
                  </button>
                  <button className="p-4 rounded-xl bg-muted hover:bg-muted/80 transition-colors text-center">
                    <Lock className="w-5 h-5 mx-auto mb-1 text-purple" />
                    <span className="text-xs">Fee Safe</span>
                  </button>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 px-4 py-2 rounded-full glass floating">
                <span className="text-sm font-semibold text-teal">+₹2,500 today</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-syne font-bold mb-4">
              Wallet Features
            </h2>
            <p className="text-muted-foreground">Everything you need to manage your education savings</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: "Set Fee Goals",
                description: "Define your semester fee target and track progress visually",
                color: "bg-teal",
              },
              {
                icon: Lock,
                title: "Fee Safe Mode",
                description: "Lock a portion of savings until your goal is reached",
                color: "bg-purple",
              },
              {
                icon: Bell,
                title: "Smart Reminders",
                description: "Get AI alerts about gigs that can help reach your goal",
                color: "bg-coral",
              },
              {
                icon: TrendingUp,
                title: "Progress Dashboard",
                description: "Visual tracking of earnings, savings, and spending",
                color: "bg-pink",
              },
              {
                icon: CreditCard,
                title: "Direct Fee Payment",
                description: "Pay college fees directly via UPI/QR from wallet",
                color: "bg-secondary",
              },
              {
                icon: PiggyBank,
                title: "Auto-Save",
                description: "Automatically transfer % of earnings to fee savings",
                color: "bg-accent",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group bg-card rounded-2xl p-6 border border-border hover:border-primary/30 transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-4`}>
                  <feature.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-syne font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fee Savings Dashboard Preview */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-syne font-bold mb-4">
                Track Every Rupee
              </h2>
              <p className="text-muted-foreground mb-6">
                Our detailed dashboard shows you exactly where your money is going and how close you are to your fee goals.
              </p>
              
              <div className="space-y-4">
                {[
                  { label: "Total Earnings", value: "₹45,000", change: "+12% this month" },
                  { label: "Amount Saved", value: "₹18,000", change: "40% of earnings" },
                  { label: "Amount Spent", value: "₹12,000", change: "On essentials" },
                  { label: "Pending Goal", value: "₹6,000", change: "~3 gigs away" },
                ].map((stat, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-card rounded-xl border border-border">
                    <span className="text-muted-foreground">{stat.label}</span>
                    <div className="text-right">
                      <p className="font-syne font-bold">{stat.value}</p>
                      <p className="text-xs text-muted-foreground">{stat.change}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card rounded-3xl p-8 border border-border">
              <h3 className="font-syne font-bold mb-6 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                Suggested Gigs to Reach Goal
              </h3>
              
              <div className="space-y-4">
                {[
                  { title: "Weekend Tutoring", pay: "₹2,500", time: "5 hrs" },
                  { title: "Event Photography", pay: "₹3,000", time: "1 day" },
                  { title: "Gym Training Sessions", pay: "₹1,500", time: "3 sessions" },
                ].map((gig, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-muted rounded-xl">
                    <div>
                      <p className="font-semibold">{gig.title}</p>
                      <p className="text-sm text-muted-foreground">{gig.time}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-syne font-bold text-primary">{gig.pay}</p>
                      <Button variant="ghost" size="sm">Apply</Button>
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

export default FeeWallet;
