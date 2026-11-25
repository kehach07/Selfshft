import { useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import {
  Building2, Mail, Phone, Lock, MapPin, Briefcase,
  CheckCircle, Sparkles, ArrowRight, Eye, EyeOff,
  Users, Clock, Shield, Zap, DollarSign, Star, Search,
  LogOut, PlusCircle, Bike, Package
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const hiringCategories = [
  "Bike Rides", "Parcel Drop",
  "Shop Staff", "Restaurant Staff", "Gym Trainers", "Chefs & Cooks",
  "Hotel Management", "Home Services", "Tutoring", "Creative Work",
  "Event Help", "Maid/Cleaning", "Tiffin Service",
  "Photography", "Video Editing", "Delivery", "Customer Service",
  "Freelance Design", "Social Media", "Content Writing", "Driving"
];

const businessTypes = [
  "Individual/Home", "Small Business", "Restaurant/Cafe", "Retail Store",
  "Gym/Fitness Studio", "Hotel/Hospitality", "Event Company", "Coaching Institute",
  "Startup", "Corporate", "NGO/Non-Profit", "Other"
];

const opportunities = [
  { title: "Hire Local Talent Instantly", desc: "Browse verified candidates near you with skill badges and ratings.", icon: Users },
  { title: "Flexible Hiring Options", desc: "Hire hourly, daily, or weekly — perfect for events, peak hours, or seasonal needs.", icon: Clock },
  { title: "Verified & Trusted Profiles", desc: "Every candidate goes through skill verification and background checks.", icon: Shield },
  { title: "Smart Skill Matching", desc: "Our AI matches your requirements with the best-fit candidates.", icon: Zap },
  { title: "Location-Based Discovery", desc: "Find candidates within 5km, 10km, or 20km using local hiring map.", icon: MapPin },
  { title: "Cost-Effective Solutions", desc: "No middleman fees. Direct hiring at fair rates. Save up to 40%.", icon: DollarSign },
];

const CustomerLogin = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedNeeds, setSelectedNeeds] = useState<string[]>([]);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [phoneOtpMode, setPhoneOtpMode] = useState(false);
  const [otpPhone, setOtpPhone] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [regData, setRegData] = useState({
    businessName: "", contactPerson: "", email: "", phone: "", password: "", confirmPassword: "",
    businessType: "", industry: "", city: "", pincode: "", address: "", description: "",
    preferredSchedule: "", budget: "",
  });

  const emptyOpportunityForm = { category: "", role: "", description: "", city: "", address: "", locationHunt: "", duration: "", timing: "", payAmount: "", payType: "hour", schedule: "", budget: "", openings: "1", immediateJoin: false };
  const [oppForm, setOppForm] = useState(emptyOpportunityForm);

  const { login, customerSignup, signInWithGoogle, sendPhoneOtp, verifyPhoneOtp, isLoggedIn, userRole, customerProfile, opportunities: postedOpportunities, addOpportunity, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  if (isLoggedIn && userRole === "customer") {
    return <Navigate to="/customer/dashboard" replace />;
    // eslint-disable-next-line no-unreachable
    const myOpportunities = postedOpportunities.filter((opp) => opp.customerId === customerProfile?.id);
    const applications = myOpportunities.flatMap((opp) => (opp.applications || []).map((app) => ({ ...app, role: opp.role, category: opp.category })));
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <section className="pt-32 pb-20 relative overflow-hidden">
          <div className="blob blob-1 opacity-20" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
              <div>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
                  <Building2 className="w-4 h-4" /> Customer Portal
                </span>
                <h1 className="text-4xl md:text-6xl font-syne font-bold mb-3">
                  Welcome, <span className="gradient-text">{customerProfile?.businessName || "Customer"}</span>
                </h1>
                <p className="text-muted-foreground max-w-2xl">Add your hiring details once. SelfShft will automatically show them inside the right role category for candidates to browse and book.</p>
              </div>
              <Button variant="outline" onClick={logout} className="rounded-xl w-fit"><LogOut className="w-4 h-4 mr-2" /> Logout</Button>
            </div>

            <div className="grid lg:grid-cols-[420px_1fr] gap-8">
              <div className="glass rounded-2xl p-6 border border-border/40 h-fit">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl gradient-bg flex items-center justify-center"><PlusCircle className="w-6 h-6 text-primary-foreground" /></div>
                  <div>
                    <h2 className="text-xl font-bold">Add Opportunity</h2>
                    <p className="text-sm text-muted-foreground">This auto-categorizes into roles.</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2"><Label>Role Category</Label><Select value={oppForm.category} onValueChange={(v) => setOppForm({ ...oppForm, category: v })}><SelectTrigger className="h-12 bg-background/50"><SelectValue placeholder="Select category" /></SelectTrigger><SelectContent>{hiringCategories.map((cat) => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}</SelectContent></Select><p className="text-xs text-muted-foreground">Candidates will see this post under this role automatically.</p></div>
                  <div className="space-y-2"><Label>Role Title</Label><Input value={oppForm.role} onChange={(e) => setOppForm({ ...oppForm, role: e.target.value })} placeholder="e.g., Parcel drop assistant" className="h-12 bg-background/50" /></div>
                  <div className="space-y-2"><Label>Work Details</Label><Textarea value={oppForm.description} onChange={(e) => setOppForm({ ...oppForm, description: e.target.value })} placeholder="Describe timing, tasks, and expectations" className="min-h-[110px] bg-background/50" /></div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2"><Label>City</Label><Input value={oppForm.city} onChange={(e) => setOppForm({ ...oppForm, city: e.target.value })} placeholder={customerProfile?.city || "City"} className="h-12 bg-background/50" /></div>
                    <div className="space-y-2"><Label>Openings</Label><Input value={oppForm.openings} onChange={(e) => setOppForm({ ...oppForm, openings: e.target.value })} className="h-12 bg-background/50" /></div>
                  </div>
                  <div className="space-y-2"><Label>Address / Area</Label><Input value={oppForm.address} onChange={(e) => setOppForm({ ...oppForm, address: e.target.value })} placeholder="Pickup area or business address" className="h-12 bg-background/50" /></div>
                  <div className="space-y-2"><Label>Location Hunt</Label><Input value={oppForm.locationHunt} onChange={(e) => setOppForm({ ...oppForm, locationHunt: e.target.value })} placeholder="e.g., Andheri West, near metro" className="h-12 bg-background/50" /></div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2"><Label>Duration</Label><Input value={oppForm.duration} onChange={(e) => setOppForm({ ...oppForm, duration: e.target.value })} placeholder="2 weeks / 3 months" className="h-12 bg-background/50" /></div>
                    <div className="space-y-2"><Label>Timing</Label><Input value={oppForm.timing} onChange={(e) => setOppForm({ ...oppForm, timing: e.target.value, schedule: e.target.value })} placeholder="6 PM - 10 PM" className="h-12 bg-background/50" /></div>
                  </div>
                  <div className="grid grid-cols-[1fr_130px] gap-3">
                    <div className="space-y-2"><Label>Pay Amount</Label><Input value={oppForm.payAmount} onChange={(e) => setOppForm({ ...oppForm, payAmount: e.target.value, budget: e.target.value })} placeholder="200-400" className="h-12 bg-background/50" /></div>
                    <div className="space-y-2"><Label>Pay Type</Label><Select value={oppForm.payType} onValueChange={(v) => setOppForm({ ...oppForm, payType: v })}><SelectTrigger className="h-12 bg-background/50"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="hour">/ hour</SelectItem><SelectItem value="day">/ day</SelectItem><SelectItem value="week">/ week</SelectItem><SelectItem value="month">/ month</SelectItem><SelectItem value="task">/ task</SelectItem></SelectContent></Select></div>
                  </div>
                  <div className="flex items-start gap-3 rounded-xl border border-primary/20 bg-primary/5 p-4">
                    <Checkbox id="immediateJoin" checked={oppForm.immediateJoin} onCheckedChange={(checked) => setOppForm({ ...oppForm, immediateJoin: Boolean(checked) })} />
                    <div className="space-y-1">
                      <Label htmlFor="immediateJoin" className="cursor-pointer">Immediate join available</Label>
                      <p className="text-xs text-muted-foreground">Show this shift in the candidate immediate-location section.</p>
                    </div>
                  </div>
                  <Button variant="gradient" className="w-full" onClick={() => { if (!oppForm.category || !oppForm.role) { toast({ title: "Add category and role", variant: "destructive" }); return; } addOpportunity(oppForm); setOppForm(emptyOpportunityForm); toast({ title: "Opportunity added", description: "Candidates can now find it by role and location." }); }}>
                    Publish Opportunity <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>

              <div className="space-y-6">
                <div className="grid sm:grid-cols-3 gap-4">
                  {[{ label: "Live roles", value: myOpportunities.length, icon: Briefcase }, { label: "Booked", value: myOpportunities.filter((o) => o.bookedBy).length, icon: CheckCircle }, { label: "Top roles", value: "Bike + Parcel", icon: Bike }].map((stat) => <div key={stat.label} className="glass rounded-2xl p-5 border border-border/40"><stat.icon className="w-5 h-5 text-primary mb-3" /><p className="text-2xl font-bold">{stat.value}</p><p className="text-sm text-muted-foreground">{stat.label}</p></div>)}
                </div>
                <div className="glass rounded-2xl p-6 border border-border/40">
                  <h2 className="text-2xl font-syne font-bold mb-5">Your Opportunities</h2>
                  <div className="space-y-4">
                    {myOpportunities.map((opp) => <div key={opp.id} className="rounded-xl border border-border/50 p-4 bg-background/40"><div className="flex items-start justify-between gap-4"><div><p className="text-sm text-primary font-semibold">{opp.category}</p><h3 className="font-bold text-lg">{opp.role}</h3><p className="text-sm text-muted-foreground mt-1">{opp.description}</p></div>{opp.category === "Parcel Drop" ? <Package className="w-6 h-6 text-primary" /> : <Briefcase className="w-6 h-6 text-primary" />}</div><div className="flex flex-wrap gap-3 mt-4 text-xs text-muted-foreground"><span>{opp.locationHunt || opp.city || customerProfile?.city || "Nearby"}</span><span>{opp.timing || opp.schedule || "Flexible"}</span><span>{opp.duration || "Short-term"}</span><span>₹{opp.payAmount || opp.budget || "Discuss"}/{opp.payType || "hour"}</span><span>{opp.openings} openings</span>{opp.immediateJoin && <span className="text-primary font-semibold">Immediate join</span>}<span className="text-primary font-semibold">{opp.applications?.length || 0} applications</span></div></div>)}
                    {myOpportunities.length === 0 && <div className="text-center py-10 text-muted-foreground">No opportunities yet. Add your first role for candidates to book.</div>}
                  </div>
                </div>
                <div className="glass rounded-2xl p-6 border border-border/40">
                  <h2 className="text-2xl font-syne font-bold mb-5">Candidate Applications</h2>
                  <div className="space-y-4">
                    {applications.map((app) => <div key={app.id} className="rounded-xl border border-border/50 p-4 bg-background/40"><div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4"><div><p className="text-sm text-primary font-semibold">{app.category} · {app.role}</p><h3 className="font-bold text-lg">{app.candidateName}</h3><p className="text-sm text-muted-foreground mt-1">{app.applicationNote || "Interested and available for this opportunity."}</p><div className="flex flex-wrap gap-2 mt-3">{app.candidateSkills.slice(0, 4).map((skill) => <span key={skill} className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">{skill}</span>)}</div></div><div className="text-sm text-muted-foreground md:text-right"><p>{app.candidatePhone || "Phone not added"}</p><p>{app.candidateEmail || "Email not added"}</p><p>{app.candidateCity || "City not added"}</p>{app.resumeUrl && <a className="text-primary hover:underline" href={app.resumeUrl} target="_blank" rel="noreferrer">Resume</a>}</div></div></div>)}
                    {applications.length === 0 && <div className="text-center py-10 text-muted-foreground">No applications yet. They will appear here when candidates apply.</div>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  const toggleNeed = (need: string) => {
    setSelectedNeeds((prev) =>
      prev.includes(need) ? prev.filter((n) => n !== need) : [...prev, need]
    );
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      toast({ title: "Error", description: "Please fill in all fields", variant: "destructive" });
      return;
    }
    const ok = await login(loginEmail, loginPassword, "customer");
    if (!ok) {
      toast({ title: "Login failed", description: "Check your email/password and try again.", variant: "destructive" });
      return;
    }
    toast({ title: "Welcome back! 🎉", description: "Logged in as Customer" });
  };

  const handleSignup = async () => {
    if (!regData.email || !regData.password || !regData.businessName) {
      toast({ title: "Error", description: "Please fill required fields", variant: "destructive" });
      return;
    }
    if (regData.password !== regData.confirmPassword) {
      toast({ title: "Passwords don't match", variant: "destructive" });
      return;
    }
    const ok = await customerSignup({ ...regData, hiringNeeds: selectedNeeds }, regData.password);
    if (!ok) {
      toast({ title: "Signup failed", description: "Please try another email or password.", variant: "destructive" });
      return;
    }
    toast({ title: "Account Created! 🎉", description: "You can post opportunities right away." });
  };

  const handlePhoneOtp = async () => {
    if (!otpPhone) return toast({ title: "Phone required", description: "Enter your phone number with country code.", variant: "destructive" });
    if (!otpSent) {
      const ok = await sendPhoneOtp(otpPhone, "customer");
      if (!ok) return toast({ title: "OTP failed", description: "Could not send OTP. Check the phone number.", variant: "destructive" });
      setOtpSent(true);
      toast({ title: "OTP sent", description: "Enter the code received on your phone." });
      return;
    }
    const ok = await verifyPhoneOtp(otpPhone, otpCode, "customer");
    if (!ok) return toast({ title: "Invalid OTP", description: "Please check the code and try again.", variant: "destructive" });
    toast({ title: "Welcome! 🎉", description: "Logged in with phone OTP." });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="blob blob-1" />
        <div className="blob blob-2" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium mb-6 animate-slide-up">
                <Sparkles className="w-4 h-4 text-primary" />
                <span>Trusted by 10,000+ Businesses</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-slide-up stagger-1">
                {isLogin ? "Welcome Back, " : "Start Hiring, "}
                <span className="gradient-text">Customer!</span>
              </h1>
              <p className="text-lg text-muted-foreground animate-slide-up stagger-2">
                {isLogin ? "Log in to browse talent and manage your hires" : "Create your business profile and find the perfect candidates"}
              </p>
            </div>

            {/* Toggle */}
            <div className="flex justify-center mb-8 animate-slide-up stagger-3">
              <div className="glass p-1.5 rounded-xl flex">
                <button onClick={() => setIsLogin(true)} className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${isLogin ? "gradient-bg text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>Login</button>
                <button onClick={() => { setIsLogin(false); setStep(1); }} className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${!isLogin ? "gradient-bg text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>Sign Up</button>
              </div>
            </div>

            {/* Form */}
            <div className="glass rounded-3xl p-8 md:p-10 animate-scale-in">
              {isLogin ? phoneOtpMode ? (
                <div className="space-y-6">
                  <div className="text-center mb-4">
                    <div className="w-20 h-20 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-4"><Phone className="w-10 h-10 text-primary-foreground" /></div>
                    <h3 className="text-xl font-bold text-foreground">Login with Phone OTP</h3>
                    <p className="text-sm text-muted-foreground">Use your mobile number to enter the customer portal</p>
                  </div>
                  <div className="space-y-2"><Label>Phone Number</Label><div className="relative"><Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" /><Input value={otpPhone} onChange={(e) => setOtpPhone(e.target.value)} placeholder="+91 98765 43210" className="pl-12 h-12 bg-background/50" /></div></div>
                  {otpSent && <div className="space-y-2"><Label>OTP Code</Label><Input value={otpCode} onChange={(e) => setOtpCode(e.target.value)} placeholder="Enter 6 digit OTP" className="h-12 bg-background/50" /></div>}
                  <Button type="button" variant="gradient" size="lg" className="w-full" onClick={handlePhoneOtp}>{otpSent ? "Verify OTP" : "Send OTP"} <ArrowRight className="w-5 h-5 ml-2" /></Button>
                  <Button type="button" variant="outline" size="lg" className="w-full" onClick={() => setPhoneOtpMode(false)}>Back to email login</Button>
                </div>
              ) : (
                <form onSubmit={handleLogin} className="space-y-6">
                  <div className="text-center mb-4">
                    <div className="w-20 h-20 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-4">
                      <Building2 className="w-10 h-10 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">Customer Portal</h3>
                    <p className="text-sm text-muted-foreground">Hire talent, grow your business</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input id="email" type="email" placeholder="you@business.com" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} className="pl-12 h-12 bg-background/50 border-border/50 focus:border-primary" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input id="password" type={showPassword ? "text" : "password"} placeholder="••••••••" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} className="pl-12 pr-12 h-12 bg-background/50 border-border/50 focus:border-primary" />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Checkbox id="remember" />
                      <Label htmlFor="remember" className="text-sm text-muted-foreground cursor-pointer">Remember me</Label>
                    </div>
                    <Link to="/forgot-password" className="text-sm text-primary hover:underline">Forgot password?</Link>
                  </div>
                  <Button type="submit" variant="gradient" size="lg" className="w-full">
                    Login to Dashboard <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
                    <div className="relative flex justify-center text-sm"><span className="px-4 bg-card text-muted-foreground">Or continue with</span></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Button type="button" variant="outline" size="lg" className="w-full" onClick={() => signInWithGoogle("customer")}>
                      <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5 mr-2" /> Google
                    </Button>
                    <Button type="button" variant="outline" size="lg" className="w-full" onClick={() => setPhoneOtpMode(true)}>
                      <Phone className="w-5 h-5 mr-2" /> Phone OTP
                    </Button>
                  </div>
                </form>
              ) : (
                <div>
                  {/* Progress */}
                  <div className="flex items-center justify-center gap-2 mb-8">
                    {[1, 2, 3].map(s => (
                      <div key={s} className="flex items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${step >= s ? "gradient-bg text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                          {step > s ? <CheckCircle className="w-5 h-5" /> : s}
                        </div>
                        {s < 3 && <div className={`w-12 h-1 rounded ${step > s ? "gradient-bg" : "bg-muted"}`} />}
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mb-8 px-2">
                    <span className={step === 1 ? "text-primary font-medium" : ""}>Business Info</span>
                    <span className={step === 2 ? "text-primary font-medium" : ""}>Hiring Needs</span>
                    <span className={step === 3 ? "text-primary font-medium" : ""}>Location & Confirm</span>
                  </div>

                  {/* Step 1: Business Details */}
                  {step === 1 && (
                    <div className="space-y-6 animate-slide-up">
                      <div className="text-center mb-6">
                        <Building2 className="w-16 h-16 mx-auto text-primary mb-4" />
                        <h3 className="text-xl font-bold">Business Details</h3>
                        <p className="text-muted-foreground">Tell us about your business or requirements</p>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Business / Your Name *</Label>
                          <div className="relative">
                            <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <Input placeholder="Your business name" className="pl-12 h-12 bg-background/50" value={regData.businessName} onChange={e => setRegData({ ...regData, businessName: e.target.value })} />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Contact Person</Label>
                          <Input placeholder="Full name" className="h-12 bg-background/50" value={regData.contactPerson} onChange={e => setRegData({ ...regData, contactPerson: e.target.value })} />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Email Address *</Label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                          <Input type="email" placeholder="email@business.com" className="pl-12 h-12 bg-background/50" value={regData.email} onChange={e => setRegData({ ...regData, email: e.target.value })} />
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Phone Number</Label>
                          <div className="relative">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <Input placeholder="+91 98765 43210" className="pl-12 h-12 bg-background/50" value={regData.phone} onChange={e => setRegData({ ...regData, phone: e.target.value })} />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Business Type</Label>
                          <Select value={regData.businessType} onValueChange={v => setRegData({ ...regData, businessType: v })}>
                            <SelectTrigger className="h-12 bg-background/50"><SelectValue placeholder="Select type" /></SelectTrigger>
                            <SelectContent>{businessTypes.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Create Password *</Label>
                          <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <Input type="password" placeholder="Min 8 characters" className="pl-12 h-12 bg-background/50" value={regData.password} onChange={e => setRegData({ ...regData, password: e.target.value })} />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Confirm Password *</Label>
                          <Input type="password" placeholder="Re-enter password" className="h-12 bg-background/50" value={regData.confirmPassword} onChange={e => setRegData({ ...regData, confirmPassword: e.target.value })} />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>About Your Business</Label>
                        <Textarea placeholder="Tell candidates what you do, what kind of work environment you offer..." className="min-h-[100px] bg-background/50" value={regData.description} onChange={e => setRegData({ ...regData, description: e.target.value })} />
                      </div>
                    </div>
                  )}

                  {/* Step 2: Hiring Needs */}
                  {step === 2 && (
                    <div className="space-y-6 animate-slide-up">
                      <div className="text-center mb-6">
                        <Briefcase className="w-16 h-16 mx-auto text-primary mb-4" />
                        <h3 className="text-xl font-bold">Hiring Needs</h3>
                        <p className="text-muted-foreground">What kind of talent are you looking for?</p>
                      </div>
                      <div className="space-y-3">
                        <Label>Select Categories You Want to Hire For *</Label>
                        <div className="flex flex-wrap gap-2">
                          {hiringCategories.map(cat => (
                            <button
                              key={cat}
                              onClick={() => toggleNeed(cat)}
                              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                                selectedNeeds.includes(cat)
                                  ? "gradient-bg text-primary-foreground"
                                  : "border border-border text-muted-foreground hover:border-primary hover:text-primary"
                              }`}
                            >
                              {selectedNeeds.includes(cat) && <CheckCircle className="w-3 h-3 inline mr-1" />}
                              {cat}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Preferred Hiring Schedule</Label>
                          <Select value={regData.preferredSchedule} onValueChange={v => setRegData({ ...regData, preferredSchedule: v })}>
                            <SelectTrigger className="h-12 bg-background/50"><SelectValue placeholder="Hiring frequency" /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="one-time">One-Time Gig</SelectItem>
                              <SelectItem value="weekly">Weekly Recurring</SelectItem>
                              <SelectItem value="monthly">Monthly Basis</SelectItem>
                              <SelectItem value="as-needed">As Needed</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Budget Range (per hour)</Label>
                          <Select value={regData.budget} onValueChange={v => setRegData({ ...regData, budget: v })}>
                            <SelectTrigger className="h-12 bg-background/50"><SelectValue placeholder="Select budget" /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="100-200">₹100 - ₹200/hr</SelectItem>
                              <SelectItem value="200-400">₹200 - ₹400/hr</SelectItem>
                              <SelectItem value="400-700">₹400 - ₹700/hr</SelectItem>
                              <SelectItem value="700+">₹700+/hr</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {/* What you get */}
                      <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
                        <div className="flex items-start gap-3">
                          <Star className="w-6 h-6 text-primary mt-1" />
                          <div>
                            <p className="font-medium">What You Get as a Customer</p>
                            <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                              <li>✅ AI-matched candidate recommendations</li>
                              <li>✅ Verified profiles with skill badges</li>
                              <li>✅ Flexible hourly/daily/weekly hiring</li>
                              <li>✅ Direct chat with candidates</li>
                              <li>✅ Rating & review system</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Location & Confirm */}
                  {step === 3 && (
                    <div className="space-y-6 animate-slide-up">
                      <div className="text-center mb-6">
                        <MapPin className="w-16 h-16 mx-auto text-primary mb-4" />
                        <h3 className="text-xl font-bold">Location & Confirmation</h3>
                        <p className="text-muted-foreground">Help us find candidates near you</p>
                      </div>
                      <div className="rounded-xl overflow-hidden border border-border h-48 bg-muted relative">
                        <div className="absolute inset-0 flex items-center justify-center flex-col gap-2">
                          <MapPin className="w-8 h-8 text-primary" />
                          <Button variant="outline" size="sm"><MapPin className="w-4 h-4 mr-2" /> Enable Location</Button>
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2"><Label>City *</Label><Input value={regData.city} onChange={e => setRegData({ ...regData, city: e.target.value })} placeholder="Enter your city" className="h-12 bg-background/50" /></div>
                        <div className="space-y-2"><Label>Pin Code *</Label><Input value={regData.pincode} onChange={e => setRegData({ ...regData, pincode: e.target.value })} placeholder="Enter pin code" className="h-12 bg-background/50" /></div>
                      </div>
                      <div className="space-y-2">
                        <Label>Full Address</Label>
                        <Textarea value={regData.address} onChange={e => setRegData({ ...regData, address: e.target.value })} placeholder="Enter your business/home address..." className="bg-background/50" />
                      </div>

                      {/* Summary */}
                      <div className="p-5 rounded-xl bg-primary/5 border border-primary/20">
                        <h4 className="font-bold text-foreground mb-3">📋 Registration Summary</h4>
                        <div className="grid grid-cols-2 gap-y-2 text-sm">
                          <span className="text-muted-foreground">Business:</span>
                          <span className="text-foreground font-medium">{regData.businessName || "—"}</span>
                          <span className="text-muted-foreground">Email:</span>
                          <span className="text-foreground font-medium">{regData.email || "—"}</span>
                          <span className="text-muted-foreground">Type:</span>
                          <span className="text-foreground font-medium">{regData.businessType || "—"}</span>
                          <span className="text-muted-foreground">Hiring For:</span>
                          <span className="text-foreground font-medium">{selectedNeeds.length > 0 ? selectedNeeds.join(", ") : "—"}</span>
                          <span className="text-muted-foreground">Location:</span>
                          <span className="text-foreground font-medium">{regData.city || "—"}</span>
                          <span className="text-muted-foreground">Budget:</span>
                          <span className="text-foreground font-medium">{regData.budget ? `₹${regData.budget}/hr` : "—"}</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <Checkbox id="terms" className="mt-1" />
                        <Label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer">
                          I agree to the <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                        </Label>
                      </div>
                    </div>
                  )}

                  {/* Nav Buttons */}
                  <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
                    {step > 1 ? <Button variant="outline" onClick={() => setStep(step - 1)}>Back</Button> : <div />}
                    {step < 3 ? (
                      <Button variant="gradient" onClick={() => setStep(step + 1)}>Continue <ArrowRight className="w-4 h-4 ml-2" /></Button>
                    ) : (
                      <Button variant="gradient" size="lg" onClick={handleSignup}>Create Account <CheckCircle className="w-5 h-5 ml-2" /></Button>
                    )}
                  </div>
                </div>
              )}
            </div>

            <p className="text-center mt-6 text-muted-foreground animate-slide-up stagger-4">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button onClick={() => { setIsLogin(!isLogin); setStep(1); }} className="text-primary font-semibold hover:underline">
                {isLogin ? "Sign up now" : "Login here"}
              </button>
            </p>
          </div>
        </div>
      </section>

      {/* Opportunities Section */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why <span className="gradient-text">Hire on SelfShft?</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need to find, hire, and manage talented youth for your business or home needs.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {opportunities.map((opp, i) => (
              <div key={i} className="glass rounded-2xl p-6 border border-border/30 hover:border-primary/50 hover:shadow-lg transition-all group animate-slide-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="w-14 h-14 rounded-2xl gradient-bg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <opp.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{opp.title}</h3>
                <p className="text-muted-foreground text-sm">{opp.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="gradient-bg rounded-3xl p-10 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Ready to Hire Talented Youth?
            </h2>
            <p className="text-primary-foreground/80 mb-6 max-w-xl mx-auto">
              Join thousands of businesses finding affordable, skilled candidates on SelfShft.
            </p>
            <Button
              size="lg"
              className="bg-background text-foreground hover:bg-background/90"
              onClick={() => { setIsLogin(false); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            >
              Get Started Free <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CustomerLogin;
