import { 
  GraduationCap, 
  Award, 
  BookOpen, 
  Star,
  Trophy,
  Clock,
  Users,
  ArrowRight,
  Play,
  CheckCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const courses = [
  {
    title: "Basic Shopkeeping",
    duration: "2 hours",
    students: 1250,
    badge: "Retail Ready",
    color: "from-teal to-teal-light",
  },
  {
    title: "Gym Trainer Starter",
    duration: "4 hours",
    students: 890,
    badge: "Fitness Certified",
    color: "from-coral to-coral-light",
  },
  {
    title: "Hotel Staff Basics",
    duration: "3 hours",
    students: 670,
    badge: "Hospitality Pro",
    color: "from-purple to-purple-light",
  },
  {
    title: "Kitchen Skills 101",
    duration: "5 hours",
    students: 1100,
    badge: "Chef Starter",
    color: "from-pink to-coral",
  },
];

const LearnEarn = () => {
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
              <span className="inline-block px-4 py-2 rounded-full bg-accent/20 text-accent text-sm font-semibold mb-4">
                Learn & Earn
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-syne font-bold mb-6">
                Get Certified, <span className="gradient-text">Get Hired</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Complete micro-certifications, earn verified skill badges, and unlock higher visibility 
                in the job marketplace
              </p>
              <div className="flex flex-wrap gap-4">
                <Button variant="gradient" size="xl">
                  <Play className="w-5 h-5 mr-2" />
                  Start Learning
                </Button>
                <Button variant="outline" size="xl">
                  Browse Courses
                </Button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-card rounded-2xl p-6 border border-border">
                <Trophy className="w-10 h-10 text-yellow mb-3" />
                <p className="text-3xl font-syne font-bold">15+</p>
                <p className="text-muted-foreground">Courses</p>
              </div>
              <div className="bg-card rounded-2xl p-6 border border-border">
                <Award className="w-10 h-10 text-primary mb-3" />
                <p className="text-3xl font-syne font-bold">8K+</p>
                <p className="text-muted-foreground">Certified</p>
              </div>
              <div className="bg-card rounded-2xl p-6 border border-border">
                <Star className="w-10 h-10 text-coral mb-3" />
                <p className="text-3xl font-syne font-bold">+40%</p>
                <p className="text-muted-foreground">Hire Rate</p>
              </div>
              <div className="bg-card rounded-2xl p-6 border border-border">
                <Users className="w-10 h-10 text-purple mb-3" />
                <p className="text-3xl font-syne font-bold">25K+</p>
                <p className="text-muted-foreground">Students</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-syne font-bold mb-4">
              Learn → Certify → Earn More
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: "1",
                icon: BookOpen,
                title: "Take Micro-Courses",
                description: "Short, focused courses designed for busy students. Learn at your own pace.",
              },
              {
                step: "2",
                icon: Award,
                title: "Earn Badges",
                description: "Complete assessments and get verified skill badges on your profile.",
              },
              {
                step: "3",
                icon: Trophy,
                title: "Get Hired Faster",
                description: "Certified candidates get 40% more views and higher-paying gigs.",
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 rounded-full gradient-bg flex items-center justify-center mx-auto mb-4 relative">
                  <item.icon className="w-10 h-10 text-primary-foreground" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-card border-2 border-primary flex items-center justify-center font-bold">
                    {item.step}
                  </div>
                </div>
                <h3 className="font-syne font-bold text-xl mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-syne font-bold mb-4">
              Popular Certifications
            </h2>
            <p className="text-muted-foreground">Start with free courses and level up your skills</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((course, index) => (
              <div
                key={index}
                className="group bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/30 transition-all duration-300 hover:-translate-y-2"
              >
                <div className={`h-32 bg-gradient-to-br ${course.color} p-6 flex items-end`}>
                  <h3 className="font-syne font-bold text-lg text-primary-foreground">
                    {course.title}
                  </h3>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {course.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {course.students.toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <Award className="w-5 h-5 text-primary" />
                    <span className="text-sm font-semibold">{course.badge}</span>
                  </div>
                  
                  <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground">
                    Start Course
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button variant="outline-gradient" size="xl">
              View All Courses
            </Button>
          </div>
        </div>
      </section>

      {/* Progress Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="bg-card rounded-3xl p-8 border border-border">
              <h3 className="font-syne font-bold text-xl mb-6">Your Learning Progress</h3>
              
              <div className="space-y-6">
                {[
                  { title: "Kitchen Skills 101", progress: 75, badge: "In Progress" },
                  { title: "Hotel Staff Basics", progress: 100, badge: "Completed" },
                  { title: "Customer Service", progress: 30, badge: "In Progress" },
                ].map((course, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold">{course.title}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        course.progress === 100 
                          ? 'bg-teal/20 text-teal' 
                          : 'bg-coral/20 text-coral'
                      }`}>
                        {course.badge}
                      </span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-syne font-bold mb-4">
                Why Get Certified?
              </h2>
              <div className="space-y-4">
                {[
                  "Stand out from other candidates",
                  "Get 40% more profile views",
                  "Access higher-paying gigs",
                  "Build trust with customers",
                  "Learn industry-relevant skills",
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-primary" />
                    <span className="text-lg">{benefit}</span>
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

export default LearnEarn;
