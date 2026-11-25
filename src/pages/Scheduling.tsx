import { 
  Calendar, 
  Clock, 
  CalendarDays, 
  CalendarRange,
  Sun,
  Moon,
  Coffee,
  Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Scheduling = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="blob blob-1 opacity-20" />
          <div className="blob blob-3 opacity-20" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-4 py-2 rounded-full bg-coral/20 text-coral text-sm font-semibold mb-4">
              Flexible Scheduling
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-syne font-bold mb-6">
              Work On <span className="gradient-text-secondary">Your Terms</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Set your availability and get hired for gigs that fit your schedule - hourly, daily, or weekly
            </p>
          </div>
        </div>
      </section>

      {/* Hiring Options */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-syne font-bold mb-4">
              Flexible Hiring Options
            </h2>
            <p className="text-muted-foreground">Customers can hire based on their needs</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: Clock,
                title: "Hourly",
                description: "Perfect for quick tasks, consultations, or trial periods",
                examples: ["1-hour tutoring session", "2-hour event help", "Quick photography"],
                color: "from-teal to-teal-light",
              },
              {
                icon: CalendarDays,
                title: "Daily",
                description: "Ideal for full-day events, projects, or intensive work",
                examples: ["Wedding photography", "Full-day event staff", "Deep cleaning"],
                color: "from-coral to-coral-light",
              },
              {
                icon: CalendarRange,
                title: "Weekly",
                description: "Great for ongoing support, regular services, or contracts",
                examples: ["Weekly tutoring", "Regular gym training", "Ongoing tiffin service"],
                color: "from-purple to-purple-light",
              },
            ].map((option, index) => (
              <div
                key={index}
                className="group bg-card rounded-3xl p-8 border border-border hover:border-primary/30 transition-all duration-300 hover:-translate-y-2"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${option.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <option.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-syne font-bold mb-3">{option.title}</h3>
                <p className="text-muted-foreground mb-6">{option.description}</p>
                <div className="space-y-2">
                  {option.examples.map((ex, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary" />
                      {ex}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Availability Settings */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-syne font-bold mb-4">
                Set Your Availability
              </h2>
              <p className="text-muted-foreground mb-6">
                Mark when you're free to work and get gigs that match your schedule perfectly.
              </p>

              <div className="space-y-4">
                {[
                  { icon: Sun, label: "After College Hours", desc: "4 PM - 9 PM weekdays" },
                  { icon: Coffee, label: "Weekend Gigs", desc: "Full days on Sat & Sun" },
                  { icon: CalendarRange, label: "Vacation Only", desc: "Summer & winter breaks" },
                  { icon: Moon, label: "Night Shifts", desc: "For those who prefer late hours" },
                ].map((slot, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <slot.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold">{slot.label}</p>
                      <p className="text-sm text-muted-foreground">{slot.desc}</p>
                    </div>
                    <Button variant="outline" size="sm">Select</Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Calendar Preview */}
            <div className="bg-card rounded-3xl p-8 border border-border">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-syne font-bold">December 2024</h3>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon">←</Button>
                  <Button variant="ghost" size="icon">→</Button>
                </div>
              </div>
              
              <div className="grid grid-cols-7 gap-2 text-center text-sm">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                  <div key={i} className="py-2 text-muted-foreground font-medium">{day}</div>
                ))}
                {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                  <div
                    key={day}
                    className={`py-2 rounded-lg cursor-pointer transition-colors ${
                      [7, 8, 14, 15, 21, 22, 28, 29].includes(day)
                        ? 'bg-primary text-primary-foreground'
                        : [3, 10, 17, 24].includes(day)
                        ? 'bg-coral/20 text-coral'
                        : 'hover:bg-muted'
                    }`}
                  >
                    {day}
                  </div>
                ))}
              </div>
              
              <div className="flex gap-4 mt-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  <span>Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-coral" />
                  <span>Booked</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-syne font-bold mb-4">
            Ready to Set Your Schedule?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Create your profile and mark your availability to start receiving gig offers that fit your life.
          </p>
          <Button variant="gradient" size="xl">
            <Calendar className="w-5 h-5 mr-2" />
            Set My Availability
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Scheduling;
