import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User, Mail, Phone, Lock, MapPin, Briefcase, GraduationCap,
  Camera, FileText, Star, CheckCircle, Upload, Calendar,
  Sparkles, ArrowRight, Eye, EyeOff, Plus, X
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

const skillCategories = [
  "Tutoring", "Fitness Training", "Cooking/Chef", "Retail/Shop Staff",
  "Hotel Management", "Event Help", "Crafts/Pottery", "Freelance Design",
  "Photography", "Video Editing", "Content Writing", "Social Media",
  "Tiffin/Maid Services", "Driving", "Delivery", "Customer Service"
];

const qualificationLevels = [
  "High School", "Undergraduate", "Graduate", "Post Graduate", "PhD", "Diploma", "Certificate Course"
];

const CandidateLogin = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [portfolioItems, setPortfolioItems] = useState<{ title: string; description: string }[]>([]);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [phoneOtpMode, setPhoneOtpMode] = useState(false);
  const [otpPhone, setOtpPhone] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [regData, setRegData] = useState({
    firstName: "", lastName: "", email: "", phone: "", dob: "", bio: "", password: "", confirmPassword: "",
    qualification: "", institution: "", course: "", startYear: "", endYear: "", achievements: "",
    experienceLevel: "", city: "", pincode: "", address: "", workRadius: "",
  });

  const { login, signup, signInWithGoogle, sendPhoneOtp, verifyPhoneOtp, isLoggedIn, userRole, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!loading && isLoggedIn && userRole === "candidate") navigate("/candidate/dashboard", { replace: true });
  }, [isLoggedIn, loading, navigate, userRole]);

  if (!loading && isLoggedIn && userRole === "candidate") return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      toast({ title: "Error", description: "Please fill in all fields", variant: "destructive" });
      return;
    }
    const ok = await login(loginEmail, loginPassword, "candidate");
    if (!ok) {
      toast({ title: "Login failed", description: "Check your email/password and try again.", variant: "destructive" });
      return;
    }
    toast({ title: "Welcome back! 🎉", description: "Redirecting to your profile..." });
    navigate("/candidate/profile");
  };

  const handleSignup = async () => {
    if (!regData.firstName || !regData.email || !regData.password) {
      toast({ title: "Error", description: "Please fill required fields", variant: "destructive" });
      return;
    }
    const ok = await signup({
      ...regData,
      skills: selectedSkills,
      portfolioItems,
    }, regData.password);
    if (!ok) {
      toast({ title: "Signup failed", description: "Please try another email or password.", variant: "destructive" });
      return;
    }
    toast({ title: "Account Created! 🎉", description: "You can start exploring shifts right away." });
    navigate("/candidate/profile");
  };

  const handlePhoneOtp = async () => {
    if (!otpPhone) {
      toast({ title: "Phone required", description: "Enter your phone number with country code.", variant: "destructive" });
      return;
    }
    if (!otpSent) {
      const ok = await sendPhoneOtp(otpPhone, "candidate");
      if (!ok) return toast({ title: "OTP failed", description: "Could not send OTP. Check the phone number.", variant: "destructive" });
      setOtpSent(true);
      toast({ title: "OTP sent", description: "Enter the code received on your phone." });
      return;
    }
    const ok = await verifyPhoneOtp(otpPhone, otpCode, "candidate");
    if (!ok) return toast({ title: "Invalid OTP", description: "Please check the code and try again.", variant: "destructive" });
    toast({ title: "Welcome! 🎉", description: "Logged in with phone OTP." });
    navigate("/candidate/profile");
  };

  const addSkill = (skill: string) => {
    if (!selectedSkills.includes(skill) && selectedSkills.length < 5) setSelectedSkills([...selectedSkills, skill]);
  };
  const removeSkill = (skill: string) => setSelectedSkills(selectedSkills.filter(s => s !== skill));
  const addPortfolioItem = () => setPortfolioItems([...portfolioItems, { title: "", description: "" }]);
  const removePortfolioItem = (index: number) => setPortfolioItems(portfolioItems.filter((_, i) => i !== index));

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
                <span>Join 50,000+ Youth Earners</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-slide-up stagger-1">
                {isLogin ? "Welcome Back, " : "Start Your Journey, "}
                <span className="gradient-text">Candidate!</span>
              </h1>
              <p className="text-lg text-muted-foreground animate-slide-up stagger-2">
                {isLogin ? "Log in to access your dashboard and explore opportunities" : "Create your profile and start earning for your education goals"}
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
                    <div className="w-20 h-20 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-4">
                      <Phone className="w-10 h-10 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">Login with Phone OTP</h3>
                    <p className="text-sm text-muted-foreground">Use your mobile number to enter the candidate portal</p>
                  </div>
                  <div className="space-y-2">
                    <Label>Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input value={otpPhone} onChange={(e) => setOtpPhone(e.target.value)} placeholder="+91 98765 43210" className="pl-12 h-12 bg-background/50" />
                    </div>
                  </div>
                  {otpSent && <div className="space-y-2"><Label>OTP Code</Label><Input value={otpCode} onChange={(e) => setOtpCode(e.target.value)} placeholder="Enter 6 digit OTP" className="h-12 bg-background/50" /></div>}
                  <Button type="button" variant="gradient" size="lg" className="w-full" onClick={handlePhoneOtp}>{otpSent ? "Verify OTP" : "Send OTP"} <ArrowRight className="w-5 h-5 ml-2" /></Button>
                  <Button type="button" variant="outline" size="lg" className="w-full" onClick={() => setPhoneOtpMode(false)}>Back to email login</Button>
                </div>
              ) : (
                <form onSubmit={handleLogin} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input id="email" type="email" placeholder="your@email.com" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} className="pl-12 h-12 bg-background/50 border-border/50 focus:border-primary" />
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
                    <Button type="button" variant="outline" size="lg" className="w-full" onClick={() => signInWithGoogle("candidate")}>
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
                    {[1, 2, 3, 4].map(s => (
                      <div key={s} className="flex items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${step >= s ? "gradient-bg text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                          {step > s ? <CheckCircle className="w-5 h-5" /> : s}
                        </div>
                        {s < 4 && <div className={`w-12 h-1 rounded ${step > s ? "gradient-bg" : "bg-muted"}`} />}
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mb-8 px-2">
                    <span className={step === 1 ? "text-primary font-medium" : ""}>Basic Info</span>
                    <span className={step === 2 ? "text-primary font-medium" : ""}>Qualifications</span>
                    <span className={step === 3 ? "text-primary font-medium" : ""}>Skills & Portfolio</span>
                    <span className={step === 4 ? "text-primary font-medium" : ""}>Location & Verify</span>
                  </div>

                  {/* Step 1 */}
                  {step === 1 && (
                    <div className="space-y-6 animate-slide-up">
                      <div className="flex justify-center mb-6">
                        <div className="relative">
                          <div className="w-28 h-28 rounded-full bg-muted flex items-center justify-center border-4 border-primary/30">
                            <User className="w-12 h-12 text-muted-foreground" />
                          </div>
                          <button className="absolute bottom-0 right-0 w-10 h-10 rounded-full gradient-bg flex items-center justify-center text-primary-foreground shadow-lg">
                            <Camera className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2"><Label>First Name *</Label><div className="relative"><User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" /><Input value={regData.firstName} onChange={e => setRegData({ ...regData, firstName: e.target.value })} placeholder="Enter first name" className="pl-12 h-12 bg-background/50" /></div></div>
                        <div className="space-y-2"><Label>Last Name *</Label><Input value={regData.lastName} onChange={e => setRegData({ ...regData, lastName: e.target.value })} placeholder="Enter last name" className="h-12 bg-background/50" /></div>
                      </div>
                      <div className="space-y-2"><Label>Email Address *</Label><div className="relative"><Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" /><Input value={regData.email} onChange={e => setRegData({ ...regData, email: e.target.value })} type="email" placeholder="your@email.com" className="pl-12 h-12 bg-background/50" /></div></div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2"><Label>Phone Number *</Label><div className="relative"><Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" /><Input value={regData.phone} onChange={e => setRegData({ ...regData, phone: e.target.value })} placeholder="+91 98765 43210" className="pl-12 h-12 bg-background/50" /></div></div>
                        <div className="space-y-2"><Label>Date of Birth *</Label><div className="relative"><Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" /><Input value={regData.dob} onChange={e => setRegData({ ...regData, dob: e.target.value })} type="date" className="pl-12 h-12 bg-background/50" /></div></div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2"><Label>Create Password *</Label><div className="relative"><Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" /><Input value={regData.password} onChange={e => setRegData({ ...regData, password: e.target.value })} type="password" placeholder="Min 8 characters" className="pl-12 h-12 bg-background/50" /></div></div>
                        <div className="space-y-2"><Label>Confirm Password *</Label><Input value={regData.confirmPassword} onChange={e => setRegData({ ...regData, confirmPassword: e.target.value })} type="password" placeholder="Re-enter password" className="h-12 bg-background/50" /></div>
                      </div>
                      <div className="space-y-2"><Label>Short Bio</Label><Textarea value={regData.bio} onChange={e => setRegData({ ...regData, bio: e.target.value })} placeholder="Tell customers about yourself..." className="min-h-[100px] bg-background/50" /></div>
                    </div>
                  )}

                  {/* Step 2 */}
                  {step === 2 && (
                    <div className="space-y-6 animate-slide-up">
                      <div className="text-center mb-6"><GraduationCap className="w-16 h-16 mx-auto text-primary mb-4" /><h3 className="text-xl font-bold">Education & Qualifications</h3><p className="text-muted-foreground">Add your educational background</p></div>
                      <div className="space-y-2"><Label>Highest Qualification *</Label><Select value={regData.qualification} onValueChange={v => setRegData({ ...regData, qualification: v })}><SelectTrigger className="h-12 bg-background/50"><SelectValue placeholder="Select your qualification" /></SelectTrigger><SelectContent>{qualificationLevels.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}</SelectContent></Select></div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2"><Label>Institution/College *</Label><Input value={regData.institution} onChange={e => setRegData({ ...regData, institution: e.target.value })} placeholder="Institution name" className="h-12 bg-background/50" /></div>
                        <div className="space-y-2"><Label>Course/Degree *</Label><Input value={regData.course} onChange={e => setRegData({ ...regData, course: e.target.value })} placeholder="e.g., B.Tech" className="h-12 bg-background/50" /></div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2"><Label>Start Year</Label><Input value={regData.startYear} onChange={e => setRegData({ ...regData, startYear: e.target.value })} placeholder="2020" className="h-12 bg-background/50" /></div>
                        <div className="space-y-2"><Label>End Year (Expected)</Label><Input value={regData.endYear} onChange={e => setRegData({ ...regData, endYear: e.target.value })} placeholder="2024" className="h-12 bg-background/50" /></div>
                      </div>
                      <div className="space-y-2"><Label>Achievements & Certifications</Label><Textarea value={regData.achievements} onChange={e => setRegData({ ...regData, achievements: e.target.value })} placeholder="List relevant achievements..." className="min-h-[100px] bg-background/50" /></div>
                      <div className="p-4 rounded-xl bg-primary/10 border border-primary/20"><div className="flex items-start gap-3"><FileText className="w-6 h-6 text-primary mt-1" /><div><p className="font-medium">Upload Documents (Optional)</p><p className="text-sm text-muted-foreground">Add certificates for verification badge</p><Button variant="outline" size="sm" className="mt-2"><Upload className="w-4 h-4 mr-2" /> Upload Files</Button></div></div></div>
                    </div>
                  )}

                  {/* Step 3 */}
                  {step === 3 && (
                    <div className="space-y-6 animate-slide-up">
                      <div className="text-center mb-6"><Briefcase className="w-16 h-16 mx-auto text-primary mb-4" /><h3 className="text-xl font-bold">Skills & Portfolio</h3><p className="text-muted-foreground">Showcase what you can offer</p></div>
                      <div className="space-y-3">
                        <Label>Select Your Skills (Max 5) *</Label>
                        <div className="flex flex-wrap gap-2 mb-3">{selectedSkills.map(skill => (<span key={skill} className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full gradient-bg text-primary-foreground text-sm font-medium">{skill}<button onClick={() => removeSkill(skill)} className="hover:bg-primary-foreground/20 rounded-full p-0.5"><X className="w-3 h-3" /></button></span>))}</div>
                        <div className="flex flex-wrap gap-2">{skillCategories.filter(s => !selectedSkills.includes(s)).map(skill => (<button key={skill} onClick={() => addSkill(skill)} className="px-3 py-1.5 rounded-full border border-border text-sm hover:border-primary hover:text-primary transition-colors">+ {skill}</button>))}</div>
                      </div>
                      <div className="space-y-2"><Label>Experience Level</Label><div className="grid grid-cols-3 gap-3">{["Beginner", "Intermediate", "Expert"].map(level => (<button key={level} onClick={() => setRegData({ ...regData, experienceLevel: level })} className={`p-3 rounded-xl border transition-all text-center ${regData.experienceLevel === level ? "border-primary bg-primary/5" : "border-border hover:border-primary"}`}><Star className={`w-5 h-5 mx-auto mb-1 ${regData.experienceLevel === level ? "text-primary" : "text-muted-foreground"}`} /><span className="text-sm font-medium">{level}</span></button>))}</div></div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between"><Label>Portfolio Items</Label><Button variant="outline" size="sm" onClick={addPortfolioItem}><Plus className="w-4 h-4 mr-1" /> Add Item</Button></div>
                        {portfolioItems.length === 0 ? (
                          <div className="border-2 border-dashed border-border rounded-xl p-8 text-center"><Upload className="w-10 h-10 mx-auto text-muted-foreground mb-3" /><p className="text-muted-foreground">Add portfolio items to showcase your work</p><Button variant="outline" className="mt-3" onClick={addPortfolioItem}><Plus className="w-4 h-4 mr-2" /> Add First Item</Button></div>
                        ) : (
                          <div className="space-y-4">{portfolioItems.map((_, index) => (<div key={index} className="p-4 rounded-xl border border-border bg-background/50"><div className="flex items-start justify-between mb-3"><span className="text-sm font-medium text-muted-foreground">Item {index + 1}</span><button onClick={() => removePortfolioItem(index)} className="text-destructive hover:bg-destructive/10 p-1 rounded"><X className="w-4 h-4" /></button></div><Input placeholder="Project title" className="mb-2 bg-background" /><Textarea placeholder="Brief description..." className="bg-background" /><Button variant="outline" size="sm" className="mt-2"><Upload className="w-4 h-4 mr-2" /> Upload Image</Button></div>))}</div>
                        )}
                      </div>
                      <div className="p-4 rounded-xl bg-accent/10 border border-accent/20"><div className="flex items-start gap-3"><Camera className="w-6 h-6 text-accent mt-1" /><div><p className="font-medium">Video Introduction (Recommended)</p><p className="text-sm text-muted-foreground">Record a 30-sec video to stand out</p><Button variant="outline" size="sm" className="mt-2"><Camera className="w-4 h-4 mr-2" /> Record Video</Button></div></div></div>
                    </div>
                  )}

                  {/* Step 4 */}
                  {step === 4 && (
                    <div className="space-y-6 animate-slide-up">
                      <div className="text-center mb-6"><MapPin className="w-16 h-16 mx-auto text-primary mb-4" /><h3 className="text-xl font-bold">Location & Availability</h3><p className="text-muted-foreground">Help employers find you nearby</p></div>
                      <div className="rounded-xl overflow-hidden border border-border h-48 bg-muted relative"><div className="absolute inset-0 flex items-center justify-center flex-col gap-2"><MapPin className="w-8 h-8 text-primary" /><Button variant="outline" size="sm"><MapPin className="w-4 h-4 mr-2" /> Enable Location</Button></div></div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2"><Label>City *</Label><Input value={regData.city} onChange={e => setRegData({ ...regData, city: e.target.value })} placeholder="Enter your city" className="h-12 bg-background/50" /></div>
                        <div className="space-y-2"><Label>Pin Code *</Label><Input value={regData.pincode} onChange={e => setRegData({ ...regData, pincode: e.target.value })} placeholder="Enter pin code" className="h-12 bg-background/50" /></div>
                      </div>
                      <div className="space-y-2"><Label>Full Address</Label><Textarea value={regData.address} onChange={e => setRegData({ ...regData, address: e.target.value })} placeholder="Enter your address..." className="bg-background/50" /></div>
                      <div className="space-y-2"><Label>Work Radius</Label><Select value={regData.workRadius} onValueChange={v => setRegData({ ...regData, workRadius: v })}><SelectTrigger className="h-12 bg-background/50"><SelectValue placeholder="How far can you travel?" /></SelectTrigger><SelectContent><SelectItem value="5">Within 5 km</SelectItem><SelectItem value="10">Within 10 km</SelectItem><SelectItem value="20">Within 20 km</SelectItem><SelectItem value="50">Within 50 km</SelectItem><SelectItem value="any">Any / Remote</SelectItem></SelectContent></Select></div>
                      <div className="p-4 rounded-xl bg-primary/10 border border-primary/20"><div className="flex items-start gap-3"><CheckCircle className="w-6 h-6 text-primary mt-1" /><div><p className="font-medium mb-2">Instant access enabled</p><p className="text-sm text-muted-foreground">No email verification after signup. Your profile opens immediately and can be improved anytime.</p></div></div></div>
                      <div className="flex items-start gap-2"><Checkbox id="terms" className="mt-1" /><Label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer">I agree to the <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link></Label></div>
                    </div>
                  )}

                  {/* Nav Buttons */}
                  <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
                    {step > 1 ? <Button variant="outline" onClick={() => setStep(step - 1)}>Back</Button> : <div />}
                    {step < 4 ? (
                      <Button variant="gradient" onClick={() => setStep(step + 1)}>Continue <ArrowRight className="w-4 h-4 ml-2" /></Button>
                    ) : (
                      <Button variant="gradient" size="lg" onClick={handleSignup}>Create Profile <CheckCircle className="w-5 h-5 ml-2" /></Button>
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

      <Footer />
    </div>
  );
};

export default CandidateLogin;
