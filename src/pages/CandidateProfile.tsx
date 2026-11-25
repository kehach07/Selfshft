import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User, Mail, Phone, MapPin, Briefcase, GraduationCap,
  Camera, FileText, Star, CheckCircle, Upload, Calendar,
  Sparkles, Edit3, Plus, X, Award, Globe, Clock, IndianRupee,
  Languages, Link as LinkIcon, Download, Shield, TrendingUp,
  BookOpen, Video, Trash2, Save, Zap, Search
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useAuth, CandidateProfile as ProfileType } from "@/contexts/AuthContext";
import CandidateLayout from "@/components/CandidateLayout";

const skillCategories = [
  "Tutoring", "Fitness Training", "Cooking/Chef", "Retail/Shop Staff",
  "Hotel Management", "Event Help", "Crafts/Pottery", "Freelance Design",
  "Photography", "Video Editing", "Content Writing", "Social Media",
  "Tiffin/Maid Services", "Driving", "Delivery", "Customer Service"
];

const languageOptions = ["English", "Hindi", "Marathi", "Tamil", "Telugu", "Kannada", "Bengali", "Gujarati", "Punjabi", "Urdu"];
const availabilityOptions = ["After College Hours", "Weekends Only", "Vacation Gigs", "Full-time Available", "Morning Shifts", "Evening Shifts", "Night Shifts"];
const normalizeRole = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const CandidateProfilePage = () => {
  const { profile, updateProfile, isLoggedIn, loading, logout, opportunities, bookOpportunity } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<Partial<ProfileType>>(profile || {});
  const [newSkill, setNewSkill] = useState("");
  const [newLanguage, setNewLanguage] = useState("");
  const [immediateLocation, setImmediateLocation] = useState(profile?.city || "");

  useEffect(() => {
    if (!loading && (!isLoggedIn || !profile)) navigate("/login/candidate", { replace: true });
  }, [isLoggedIn, loading, navigate, profile]);

  useEffect(() => {
    if (profile && !editMode) {
      setFormData(profile);
      setImmediateLocation((current) => current || profile.city || "");
    }
  }, [editMode, profile]);

  if (loading) {
    return <div className="min-h-screen bg-background" />;
  }

  if (!isLoggedIn || !profile) return null;

  const handleSave = () => {
    updateProfile(formData);
    setEditMode(false);
    toast({ title: "Profile Updated!", description: "Your changes have been saved." });
  };

  const update = <K extends keyof ProfileType>(key: K, value: ProfileType[K]) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const addSkill = (skill: string) => {
    const current = formData.skills || [];
    if (!current.includes(skill) && current.length < 10) {
      update("skills", [...current, skill]);
    }
  };

  const removeSkill = (skill: string) => {
    update("skills", (formData.skills || []).filter(s => s !== skill));
  };

  const addLanguage = (lang: string) => {
    const current = formData.languages || [];
    if (!current.includes(lang)) update("languages", [...current, lang]);
  };

  const removeLanguage = (lang: string) => {
    update("languages", (formData.languages || []).filter(l => l !== lang));
  };

  const toggleAvailability = (opt: string) => {
    const current = formData.availability || [];
    if (current.includes(opt)) {
      update("availability", current.filter(a => a !== opt));
    } else {
      update("availability", [...current, opt]);
    }
  };

  const addPortfolioItem = () => {
    update("portfolioItems", [...(formData.portfolioItems || []), { title: "", description: "" }]);
  };

  const removePortfolioItem = (index: number) => {
    update("portfolioItems", (formData.portfolioItems || []).filter((_, i) => i !== index));
  };

  const updatePortfolioItem = (index: number, field: string, value: string) => {
    const items = [...(formData.portfolioItems || [])];
    items[index] = { ...items[index], [field]: value };
    update("portfolioItems", items);
  };

  const addSocialLink = () => {
    update("socialLinks", [...(formData.socialLinks || []), { platform: "", url: "" }]);
  };

  const removeSocialLink = (index: number) => {
    update("socialLinks", (formData.socialLinks || []).filter((_, i) => i !== index));
  };

  const completionScore = () => {
    let score = 0;
    const checks = [
      formData.firstName, formData.lastName, formData.email, formData.phone,
      formData.bio, formData.qualification, formData.institution,
      (formData.skills || []).length > 0, formData.city,
      (formData.portfolioItems || []).length > 0, formData.resumeUploaded,
    ];
    checks.forEach(c => { if (c) score += 1; });
    return Math.round((score / checks.length) * 100);
  };

  const score = completionScore();
  const availableImmediate = opportunities.filter((opp) => {
    const location = immediateLocation.trim().toLowerCase();
    const matchesLocation = !location || [opp.city, opp.address, opp.locationHunt].join(" ").toLowerCase().includes(location);
    return opp.immediateJoin && !opp.bookedBy && matchesLocation;
  });

  const handleImmediateBook = (id: string) => {
    bookOpportunity(id, "I am available for immediate joining from my candidate portal.");
    toast({ title: "Application sent!", description: "The customer can now review your candidate profile." });
  };

  return (
    <CandidateLayout active="/candidate/profile">
      <section className="relative pb-4">
        <div className="relative z-10">
          {/* Profile Header Card */}
          <div className="glass rounded-3xl p-6 md:p-8 mb-8 animate-slide-up">
            <div className="flex flex-col md:flex-row items-start gap-6">
              {/* Avatar */}
              <div className="relative shrink-0">
                <div className="w-32 h-32 rounded-2xl bg-muted flex items-center justify-center border-4 border-primary/30 overflow-hidden">
                  {formData.avatar ? (
                    <img src={formData.avatar} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-16 h-16 text-muted-foreground" />
                  )}
                </div>
                {editMode && (
                  <label className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full gradient-bg flex items-center justify-center text-primary-foreground shadow-lg cursor-pointer">
                    <Camera className="w-5 h-5" />
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        const reader = new FileReader();
                        reader.onload = () => update("avatar", String(reader.result));
                        reader.readAsDataURL(file);
                      }}
                    />
                  </label>
                )}
                {profile.verified && (
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between flex-wrap gap-4">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold font-syne">
                      {formData.firstName || "Your"} {formData.lastName || "Name"}
                    </h1>
                    <p className="text-muted-foreground mt-1 flex items-center gap-2">
                      <MapPin className="w-4 h-4" /> {formData.city || "Add your city"}
                      {formData.workRadius && <span className="text-xs">• {formData.workRadius}km radius</span>}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {(formData.skills || []).slice(0, 3).map(skill => (
                        <Badge key={skill} className="gradient-bg text-primary-foreground border-0">{skill}</Badge>
                      ))}
                      {(formData.skills || []).length > 3 && (
                        <Badge variant="outline">+{(formData.skills || []).length - 3} more</Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    {editMode ? (
                      <>
                        <Button variant="outline" onClick={() => { setEditMode(false); setFormData(profile); }}>Cancel</Button>
                        <Button variant="gradient" onClick={handleSave}>
                          <Save className="w-4 h-4 mr-2" /> Save Changes
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button variant="gradient" onClick={() => setEditMode(true)}>
                          <Edit3 className="w-4 h-4 mr-2" /> Edit Profile
                        </Button>
                        <Button variant="outline" onClick={() => { logout(); navigate("/"); }}>Logout</Button>
                      </>
                    )}
                  </div>
                </div>

                {/* Completion Bar */}
                <div className="mt-4 p-3 rounded-xl bg-background/50 border border-border">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="font-medium">Profile Completion</span>
                    <span className="font-bold text-primary">{score}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full gradient-bg transition-all duration-500"
                      style={{ width: `${score}%` }}
                    />
                  </div>
                  {score < 100 && (
                    <p className="text-xs text-muted-foreground mt-2">Complete your profile to get 3x more visibility!</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="glass rounded-3xl p-6 md:p-8 mb-8 animate-slide-up stagger-1 border border-primary/20">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 mb-6">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary mb-3">
                  <Zap className="w-4 h-4" /> Immediate Join
                </span>
                <h2 className="text-2xl md:text-3xl font-syne font-bold">Find shifts available now</h2>
                <p className="text-muted-foreground mt-2">Enter your location to see urgent customer posts near you.</p>
              </div>
              <div className="relative w-full lg:w-[360px]">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input value={immediateLocation} onChange={(e) => setImmediateLocation(e.target.value)} placeholder="Enter city or area" className="h-12 pl-12 bg-background/50" />
              </div>
            </div>
            <div className="grid md:grid-cols-[220px_1fr] gap-5">
              <div className="rounded-2xl bg-primary/10 border border-primary/20 p-5">
                <p className="text-5xl font-syne font-bold gradient-text">{availableImmediate.length}</p>
                <p className="text-sm text-muted-foreground mt-2">immediate shifts available {immediateLocation ? `in ${immediateLocation}` : "near you"}</p>
              </div>
              <div className="grid lg:grid-cols-2 gap-4">
                {availableImmediate.slice(0, 4).map((opp) => (
                  <div key={opp.id} className="rounded-2xl border border-border/50 bg-background/40 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-semibold text-primary">{opp.category}</p>
                        <h3 className="font-bold">{opp.role}</h3>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{opp.customerName} · {opp.locationHunt || opp.city || "Nearby"}</p>
                      </div>
                      <Button size="sm" variant="outline" onClick={() => navigate(`/roles/${normalizeRole(opp.category)}`)}>View</Button>
                    </div>
                    <div className="flex items-center justify-between gap-3 mt-4 pt-4 border-t border-border/50">
                      <span className="text-sm font-semibold">₹{opp.payAmount || opp.budget || "Discuss"}/{opp.payType || "hour"}</span>
                      <Button size="sm" variant="gradient" onClick={() => handleImmediateBook(opp.id)}>Apply</Button>
                    </div>
                  </div>
                ))}
                {availableImmediate.length === 0 && <div className="lg:col-span-2 rounded-2xl border border-border/50 bg-background/40 p-6 text-center text-muted-foreground">No immediate shifts found for this location yet.</div>}
              </div>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="personal" className="animate-slide-up stagger-2">
            <TabsList className="glass w-full flex flex-wrap h-auto p-1.5 rounded-xl mb-6">
              <TabsTrigger value="personal" className="flex-1 min-w-[120px] rounded-lg data-[state=active]:gradient-bg data-[state=active]:text-primary-foreground">
                <User className="w-4 h-4 mr-2" /> Personal
              </TabsTrigger>
              <TabsTrigger value="education" className="flex-1 min-w-[120px] rounded-lg data-[state=active]:gradient-bg data-[state=active]:text-primary-foreground">
                <GraduationCap className="w-4 h-4 mr-2" /> Education
              </TabsTrigger>
              <TabsTrigger value="skills" className="flex-1 min-w-[120px] rounded-lg data-[state=active]:gradient-bg data-[state=active]:text-primary-foreground">
                <Briefcase className="w-4 h-4 mr-2" /> Skills & Work
              </TabsTrigger>
              <TabsTrigger value="portfolio" className="flex-1 min-w-[120px] rounded-lg data-[state=active]:gradient-bg data-[state=active]:text-primary-foreground">
                <FileText className="w-4 h-4 mr-2" /> Portfolio
              </TabsTrigger>
              <TabsTrigger value="resume" className="flex-1 min-w-[120px] rounded-lg data-[state=active]:gradient-bg data-[state=active]:text-primary-foreground">
                <Download className="w-4 h-4 mr-2" /> Resume
              </TabsTrigger>
            </TabsList>

            {/* Personal Info Tab */}
            <TabsContent value="personal">
              <div className="glass rounded-2xl p-6 md:p-8 space-y-6">
                <h2 className="text-xl font-bold font-syne flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" /> Personal Information
                </h2>

                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label>First Name</Label>
                    <Input
                      value={formData.firstName || ""}
                      onChange={e => update("firstName", e.target.value)}
                      disabled={!editMode}
                      className="h-12 bg-background/50"
                      placeholder="Enter first name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Last Name</Label>
                    <Input
                      value={formData.lastName || ""}
                      onChange={e => update("lastName", e.target.value)}
                      disabled={!editMode}
                      className="h-12 bg-background/50"
                      placeholder="Enter last name"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        value={formData.email || ""}
                        onChange={e => update("email", e.target.value)}
                        disabled={!editMode}
                        className="h-12 pl-12 bg-background/50"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        value={formData.phone || ""}
                        onChange={e => update("phone", e.target.value)}
                        disabled={!editMode}
                        className="h-12 pl-12 bg-background/50"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label>Date of Birth</Label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        type="date"
                        value={formData.dob || ""}
                        onChange={e => update("dob", e.target.value)}
                        disabled={!editMode}
                        className="h-12 pl-12 bg-background/50"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Hourly Rate (₹)</Label>
                    <div className="relative">
                      <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        value={formData.hourlyRate || ""}
                        onChange={e => update("hourlyRate", e.target.value)}
                        disabled={!editMode}
                        className="h-12 pl-12 bg-background/50"
                        placeholder="e.g., 200"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Bio</Label>
                  <Textarea
                    value={formData.bio || ""}
                    onChange={e => update("bio", e.target.value)}
                    disabled={!editMode}
                    className="min-h-[120px] bg-background/50"
                    placeholder="Tell employers about yourself..."
                  />
                </div>

                {/* Location */}
                <h3 className="text-lg font-bold font-syne flex items-center gap-2 pt-4 border-t border-border">
                  <MapPin className="w-5 h-5 text-primary" /> Location
                </h3>
                <div className="grid md:grid-cols-3 gap-5">
                  <div className="space-y-2">
                    <Label>City</Label>
                    <Input value={formData.city || ""} onChange={e => update("city", e.target.value)} disabled={!editMode} className="h-12 bg-background/50" placeholder="Your city" />
                  </div>
                  <div className="space-y-2">
                    <Label>Pin Code</Label>
                    <Input value={formData.pincode || ""} onChange={e => update("pincode", e.target.value)} disabled={!editMode} className="h-12 bg-background/50" placeholder="Pin code" />
                  </div>
                  <div className="space-y-2">
                    <Label>Work Radius</Label>
                    <Select value={formData.workRadius || ""} onValueChange={v => update("workRadius", v)} disabled={!editMode}>
                      <SelectTrigger className="h-12 bg-background/50"><SelectValue placeholder="Distance" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">5 km</SelectItem>
                        <SelectItem value="10">10 km</SelectItem>
                        <SelectItem value="20">20 km</SelectItem>
                        <SelectItem value="50">50 km</SelectItem>
                        <SelectItem value="any">Any / Remote</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Full Address</Label>
                  <Textarea value={formData.address || ""} onChange={e => update("address", e.target.value)} disabled={!editMode} className="bg-background/50" placeholder="Full address..." />
                </div>

                {/* Languages */}
                <h3 className="text-lg font-bold font-syne flex items-center gap-2 pt-4 border-t border-border">
                  <Languages className="w-5 h-5 text-primary" /> Languages
                </h3>
                <div className="flex flex-wrap gap-2">
                  {(formData.languages || []).map(lang => (
                    <Badge key={lang} variant="secondary" className="px-3 py-1.5 text-sm">
                      {lang}
                      {editMode && (
                        <button onClick={() => removeLanguage(lang)} className="ml-2 hover:text-destructive">
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </Badge>
                  ))}
                </div>
                {editMode && (
                  <div className="flex flex-wrap gap-2">
                    {languageOptions.filter(l => !(formData.languages || []).includes(l)).map(lang => (
                      <button key={lang} onClick={() => addLanguage(lang)} className="px-3 py-1.5 rounded-full border border-border text-sm hover:border-primary hover:text-primary transition-colors">
                        + {lang}
                      </button>
                    ))}
                  </div>
                )}

                {/* Social Links */}
                <h3 className="text-lg font-bold font-syne flex items-center gap-2 pt-4 border-t border-border">
                  <Globe className="w-5 h-5 text-primary" /> Social Links
                </h3>
                {(formData.socialLinks || []).map((link, i) => (
                  <div key={i} className="flex gap-3 items-center">
                    <Input value={link.platform} placeholder="Platform" disabled={!editMode} onChange={e => {
                      const links = [...(formData.socialLinks || [])];
                      links[i] = { ...links[i], platform: e.target.value };
                      update("socialLinks", links);
                    }} className="h-10 bg-background/50 w-32" />
                    <Input value={link.url} placeholder="URL" disabled={!editMode} onChange={e => {
                      const links = [...(formData.socialLinks || [])];
                      links[i] = { ...links[i], url: e.target.value };
                      update("socialLinks", links);
                    }} className="h-10 bg-background/50 flex-1" />
                    {editMode && (
                      <button onClick={() => removeSocialLink(i)} className="text-destructive"><Trash2 className="w-4 h-4" /></button>
                    )}
                  </div>
                ))}
                {editMode && (
                  <Button variant="outline" size="sm" onClick={addSocialLink}>
                    <Plus className="w-4 h-4 mr-1" /> Add Link
                  </Button>
                )}
              </div>
            </TabsContent>

            {/* Education Tab */}
            <TabsContent value="education">
              <div className="glass rounded-2xl p-6 md:p-8 space-y-6">
                <h2 className="text-xl font-bold font-syne flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-primary" /> Education & Qualifications
                </h2>

                <div className="space-y-2">
                  <Label>Highest Qualification</Label>
                  <Select value={formData.qualification || ""} onValueChange={v => update("qualification", v)} disabled={!editMode}>
                    <SelectTrigger className="h-12 bg-background/50"><SelectValue placeholder="Select qualification" /></SelectTrigger>
                    <SelectContent>
                      {["High School", "Undergraduate", "Graduate", "Post Graduate", "PhD", "Diploma", "Certificate Course"].map(q => (
                        <SelectItem key={q} value={q}>{q}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label>Institution / College</Label>
                    <Input value={formData.institution || ""} onChange={e => update("institution", e.target.value)} disabled={!editMode} className="h-12 bg-background/50" placeholder="Institution name" />
                  </div>
                  <div className="space-y-2">
                    <Label>Course / Degree</Label>
                    <Input value={formData.course || ""} onChange={e => update("course", e.target.value)} disabled={!editMode} className="h-12 bg-background/50" placeholder="e.g., B.Tech, B.Com" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label>Start Year</Label>
                    <Input value={formData.startYear || ""} onChange={e => update("startYear", e.target.value)} disabled={!editMode} className="h-12 bg-background/50" placeholder="2020" />
                  </div>
                  <div className="space-y-2">
                    <Label>End Year (Expected)</Label>
                    <Input value={formData.endYear || ""} onChange={e => update("endYear", e.target.value)} disabled={!editMode} className="h-12 bg-background/50" placeholder="2024" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Achievements & Certifications</Label>
                  <Textarea value={formData.achievements || ""} onChange={e => update("achievements", e.target.value)} disabled={!editMode} className="min-h-[120px] bg-background/50" placeholder="Achievements, certifications, awards..." />
                </div>

                <div className="p-5 rounded-xl bg-primary/10 border border-primary/20">
                  <div className="flex items-start gap-3">
                    <Award className="w-6 h-6 text-primary mt-1" />
                    <div>
                      <p className="font-medium">Upload Certificates</p>
                      <p className="text-sm text-muted-foreground mb-3">Add certificates for a verified badge</p>
                      <Button variant="outline" size="sm" disabled={!editMode}>
                        <Upload className="w-4 h-4 mr-2" /> Upload Files
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Skills & Work Tab */}
            <TabsContent value="skills">
              <div className="glass rounded-2xl p-6 md:p-8 space-y-6">
                <h2 className="text-xl font-bold font-syne flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-primary" /> Skills & Work Preferences
                </h2>

                {/* Skills */}
                <div className="space-y-3">
                  <Label>Your Skills ({(formData.skills || []).length}/10)</Label>
                  <div className="flex flex-wrap gap-2">
                    {(formData.skills || []).map(skill => (
                      <Badge key={skill} className="gradient-bg text-primary-foreground border-0 px-3 py-1.5">
                        {skill}
                        {editMode && (
                          <button onClick={() => removeSkill(skill)} className="ml-2"><X className="w-3 h-3" /></button>
                        )}
                      </Badge>
                    ))}
                  </div>
                  {editMode && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {skillCategories.filter(s => !(formData.skills || []).includes(s)).map(skill => (
                        <button key={skill} onClick={() => addSkill(skill)} className="px-3 py-1.5 rounded-full border border-border text-sm hover:border-primary hover:text-primary transition-colors">
                          + {skill}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Experience Level */}
                <div className="space-y-3">
                  <Label>Experience Level</Label>
                  <div className="grid grid-cols-3 gap-3">
                    {["Beginner", "Intermediate", "Expert"].map(level => (
                      <button
                        key={level}
                        onClick={() => editMode && update("experienceLevel", level)}
                        className={`p-4 rounded-xl border transition-all text-center ${
                          formData.experienceLevel === level
                            ? "border-primary bg-primary/10"
                            : "border-border hover:border-primary/50"
                        } ${!editMode ? "cursor-default" : "cursor-pointer"}`}
                      >
                        <Star className={`w-5 h-5 mx-auto mb-1 ${formData.experienceLevel === level ? "text-primary" : "text-muted-foreground"}`} />
                        <span className="text-sm font-medium">{level}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Availability */}
                <div className="space-y-3">
                  <Label>Availability</Label>
                  <div className="flex flex-wrap gap-2">
                    {availabilityOptions.map(opt => {
                      const selected = (formData.availability || []).includes(opt);
                      return (
                        <button
                          key={opt}
                          onClick={() => editMode && toggleAvailability(opt)}
                          className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all ${
                            selected ? "gradient-bg text-primary-foreground border-transparent" : "border-border hover:border-primary"
                          } ${!editMode ? "cursor-default" : "cursor-pointer"}`}
                        >
                          <Clock className="w-3 h-3 inline mr-1" />
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Portfolio Tab */}
            <TabsContent value="portfolio">
              <div className="glass rounded-2xl p-6 md:p-8 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold font-syne flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" /> Portfolio & Work Samples
                  </h2>
                  {editMode && (
                    <Button variant="gradient" size="sm" onClick={addPortfolioItem}>
                      <Plus className="w-4 h-4 mr-2" /> Add Item
                    </Button>
                  )}
                </div>

                {(formData.portfolioItems || []).length === 0 ? (
                  <div className="border-2 border-dashed border-border rounded-xl p-12 text-center">
                    <Briefcase className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="font-bold text-lg mb-2">No Portfolio Items Yet</h3>
                    <p className="text-muted-foreground mb-4">Showcase your work to attract more employers</p>
                    {editMode && (
                      <Button variant="gradient" onClick={addPortfolioItem}>
                        <Plus className="w-4 h-4 mr-2" /> Add First Item
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-4">
                    {(formData.portfolioItems || []).map((item, index) => (
                      <div key={index} className="p-5 rounded-xl border border-border bg-background/50 space-y-3">
                        <div className="flex items-start justify-between">
                          <span className="text-xs font-medium text-primary">Project {index + 1}</span>
                          {editMode && (
                            <button onClick={() => removePortfolioItem(index)} className="text-destructive hover:bg-destructive/10 p-1 rounded">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                        <Input
                          value={item.title}
                          onChange={e => updatePortfolioItem(index, "title", e.target.value)}
                          disabled={!editMode}
                          placeholder="Project title"
                          className="bg-background"
                        />
                        <Textarea
                          value={item.description}
                          onChange={e => updatePortfolioItem(index, "description", e.target.value)}
                          disabled={!editMode}
                          placeholder="Describe your work..."
                          className="bg-background"
                        />
                        {editMode && (
                          <Button variant="outline" size="sm">
                            <Upload className="w-4 h-4 mr-2" /> Upload Image
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Video Introduction */}
                <div className="p-5 rounded-xl bg-accent/10 border border-accent/20">
                  <div className="flex items-start gap-3">
                    <Video className="w-6 h-6 text-accent mt-1" />
                    <div>
                      <p className="font-bold">Video Introduction</p>
                      <p className="text-sm text-muted-foreground mb-2">Record a 30-second video to stand out</p>
                      {formData.videoIntro ? (
                        <Badge variant="secondary"><CheckCircle className="w-3 h-3 mr-1" /> Video Uploaded</Badge>
                      ) : editMode ? (
                        <Button variant="outline" size="sm"><Camera className="w-4 h-4 mr-2" /> Record Video</Button>
                      ) : (
                        <p className="text-sm text-muted-foreground italic">No video uploaded</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Resume Tab */}
            <TabsContent value="resume">
              <div className="glass rounded-2xl p-6 md:p-8 space-y-6">
                <h2 className="text-xl font-bold font-syne flex items-center gap-2">
                  <Download className="w-5 h-5 text-primary" /> Resume & Documents
                </h2>

                {/* Resume Upload */}
                <div className="border-2 border-dashed border-border rounded-xl p-8 text-center">
                  <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  {formData.resumeUploaded ? (
                    <>
                      <h3 className="font-bold text-lg mb-2 text-primary">Resume Uploaded ✓</h3>
                      <p className="text-muted-foreground mb-4">Your resume is visible to employers</p>
                      <div className="flex gap-3 justify-center">
                        <Button variant="outline" size="sm"><Download className="w-4 h-4 mr-2" /> Download</Button>
                        {editMode && <Button variant="outline" size="sm"><Upload className="w-4 h-4 mr-2" /> Replace</Button>}
                      </div>
                    </>
                  ) : (
                    <>
                      <h3 className="font-bold text-lg mb-2">Upload Your Resume</h3>
                      <p className="text-muted-foreground mb-4">PDF, DOC, or DOCX (Max 5MB)</p>
                      <Button variant="gradient" onClick={() => editMode && update("resumeUploaded", true)}>
                        <Upload className="w-4 h-4 mr-2" /> Upload Resume
                      </Button>
                    </>
                  )}
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                  {[
                    { icon: TrendingUp, label: "Profile Views", value: "0" },
                    { icon: Briefcase, label: "Gigs Applied", value: "0" },
                    { icon: Star, label: "Avg Rating", value: "—" },
                    { icon: Shield, label: "Trust Score", value: `${score}%` },
                  ].map((stat, i) => (
                    <div key={i} className="p-4 rounded-xl bg-background/50 border border-border text-center">
                      <stat.icon className="w-6 h-6 mx-auto text-primary mb-2" />
                      <p className="text-xl font-bold">{stat.value}</p>
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </CandidateLayout>
  );
};

export default CandidateProfilePage;
