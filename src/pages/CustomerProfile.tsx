import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Building2, Mail, Phone, MapPin, Briefcase, Camera, Save, Edit3,
  CheckCircle, Sparkles, Users, IndianRupee, Calendar, X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useAuth, CustomerProfile as ProfileType } from "@/contexts/AuthContext";
import CustomerLayout from "@/components/CustomerLayout";

const hiringCategories = [
  "Bike Rides", "Parcel Drop", "Shop Staff", "Restaurant Staff", "Gym Trainers",
  "Chefs & Cooks", "Hotel Management", "Home Services", "Tutoring", "Creative Work",
  "Event Help", "Maid/Cleaning", "Tiffin Service", "Photography", "Video Editing",
  "Delivery", "Customer Service", "Freelance Design", "Social Media", "Content Writing", "Driving"
];

const businessTypes = [
  "Individual/Home", "Small Business", "Restaurant/Cafe", "Retail Store",
  "Gym/Fitness Studio", "Hotel/Hospitality", "Event Company", "Coaching Institute",
  "Startup", "Corporate", "NGO/Non-Profit", "Other"
];

const CustomerProfilePage = () => {
  const { customerProfile, updateCustomerProfile, isLoggedIn, userRole, loading, opportunities } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<Partial<ProfileType>>(customerProfile || {});

  useEffect(() => {
    if (!loading && (!isLoggedIn || userRole !== "customer")) navigate("/login/customer", { replace: true });
  }, [isLoggedIn, loading, navigate, userRole]);

  useEffect(() => {
    if (customerProfile && !editMode) setFormData(customerProfile);
  }, [editMode, customerProfile]);

  if (loading) return <div className="min-h-screen bg-background" />;
  if (!isLoggedIn || !customerProfile) return null;

  const update = <K extends keyof ProfileType>(key: K, value: ProfileType[K]) =>
    setFormData((prev) => ({ ...prev, [key]: value }));

  const handleSave = async () => {
    await updateCustomerProfile(formData);
    setEditMode(false);
    toast({ title: "Profile Updated", description: "Your business profile has been saved." });
  };

  const toggleNeed = (need: string) => {
    const current = formData.hiringNeeds || [];
    update("hiringNeeds", current.includes(need) ? current.filter((n) => n !== need) : [...current, need]);
  };

  const myOpps = opportunities.filter((opp) => opp.customerId === customerProfile.id);
  const completion = () => {
    const fields = [formData.businessName, formData.contactPerson, formData.email, formData.phone, formData.city, formData.address, formData.description, formData.businessType, formData.industry, (formData.hiringNeeds || []).length > 0, formData.logo];
    return Math.round((fields.filter(Boolean).length / fields.length) * 100);
  };
  const score = completion();

  return (
    <CustomerLayout>
      <div>
        <div>
          <div className="rounded-3xl p-6 md:p-8 mb-8 border border-border bg-card">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="relative shrink-0">
                <div className="w-32 h-32 rounded-2xl bg-muted flex items-center justify-center border-4 border-primary/30 overflow-hidden">
                  {formData.logo ? (
                    <img src={formData.logo} alt="Logo" className="w-full h-full object-cover" />
                  ) : (
                    <Building2 className="w-16 h-16 text-muted-foreground" />
                  )}
                </div>
                {editMode && (
                  <label className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-lg cursor-pointer">
                    <Camera className="w-5 h-5" />
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        const reader = new FileReader();
                        reader.onload = () => update("logo", String(reader.result));
                        reader.readAsDataURL(file);
                      }}
                    />
                  </label>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between flex-wrap gap-4">
                  <div>
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-2">
                      <Sparkles className="w-3 h-3" /> Customer Account
                    </span>
                    <h1 className="text-2xl md:text-3xl font-bold font-syne">
                      {formData.businessName || "Your Business"}
                    </h1>
                    <p className="text-muted-foreground mt-1 flex items-center gap-2">
                      <MapPin className="w-4 h-4" /> {formData.city || "Add your city"}
                      {formData.industry && <span className="text-xs">• {formData.industry}</span>}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {(formData.hiringNeeds || []).slice(0, 4).map((n) => (
                        <Badge key={n} className="bg-primary text-primary-foreground border-0">{n}</Badge>
                      ))}
                      {(formData.hiringNeeds || []).length > 4 && (
                        <Badge variant="outline">+{(formData.hiringNeeds || []).length - 4} more</Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    {editMode ? (
                      <>
                        <Button variant="outline" onClick={() => { setEditMode(false); setFormData(customerProfile); }}>Cancel</Button>
                        <Button onClick={handleSave}>
                          <Save className="w-4 h-4 mr-2" /> Save Changes
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button onClick={() => setEditMode(true)}>
                          <Edit3 className="w-4 h-4 mr-2" /> Edit Profile
                        </Button>
                        <Button variant="outline" onClick={() => navigate("/customer/post-gig")}>
                          <Briefcase className="w-4 h-4 mr-2" /> Post Job
                        </Button>
                      </>
                    )}
                  </div>
                </div>

                <div className="mt-4 p-3 rounded-xl bg-background/50 border border-border">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="font-medium">Profile Completion</span>
                    <span className="font-bold text-primary">{score}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${score}%` }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            {[
              { label: "Live roles", value: myOpps.length, icon: Briefcase },
              { label: "Applications", value: myOpps.reduce((acc, o) => acc + (o.applications?.length || 0), 0), icon: Users },
              { label: "Booked", value: myOpps.filter((o) => o.bookedBy).length, icon: CheckCircle },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl p-5 border border-border bg-card">
                <s.icon className="w-5 h-5 text-primary mb-3" />
                <p className="text-2xl font-bold">{s.value}</p>
                <p className="text-sm text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <Tabs defaultValue="business">
            <TabsList className="w-full flex flex-wrap h-auto p-1.5 rounded-xl mb-6 bg-card border border-border">
              <TabsTrigger value="business" className="flex-1 min-w-[120px] rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Building2 className="w-4 h-4 mr-2" /> Business
              </TabsTrigger>
              <TabsTrigger value="contact" className="flex-1 min-w-[120px] rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Mail className="w-4 h-4 mr-2" /> Contact & Location
              </TabsTrigger>
              <TabsTrigger value="hiring" className="flex-1 min-w-[120px] rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Briefcase className="w-4 h-4 mr-2" /> Hiring Preferences
              </TabsTrigger>
            </TabsList>

            <TabsContent value="business">
              <div className="rounded-2xl p-6 md:p-8 space-y-6 border border-border bg-card">
                <h2 className="text-xl font-bold font-syne flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-primary" /> Business Information
                </h2>

                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label>Business Name</Label>
                    <Input value={formData.businessName || ""} onChange={(e) => update("businessName", e.target.value)} disabled={!editMode} className="h-12 bg-background/50" />
                  </div>
                  <div className="space-y-2">
                    <Label>Contact Person</Label>
                    <Input value={formData.contactPerson || ""} onChange={(e) => update("contactPerson", e.target.value)} disabled={!editMode} className="h-12 bg-background/50" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label>Business Type</Label>
                    <Select value={formData.businessType || ""} onValueChange={(v) => update("businessType", v)} disabled={!editMode}>
                      <SelectTrigger className="h-12 bg-background/50"><SelectValue placeholder="Select" /></SelectTrigger>
                      <SelectContent>{businessTypes.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Industry</Label>
                    <Input value={formData.industry || ""} onChange={(e) => update("industry", e.target.value)} disabled={!editMode} className="h-12 bg-background/50" placeholder="e.g., F&B, Retail" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>About Your Business</Label>
                  <Textarea value={formData.description || ""} onChange={(e) => update("description", e.target.value)} disabled={!editMode} className="min-h-[120px] bg-background/50" placeholder="What does your business do? What kind of help do you need?" />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="contact">
              <div className="rounded-2xl p-6 md:p-8 space-y-6 border border-border bg-card">
                <h2 className="text-xl font-bold font-syne flex items-center gap-2">
                  <Mail className="w-5 h-5 text-primary" /> Contact & Location
                </h2>

                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input value={formData.email || ""} onChange={(e) => update("email", e.target.value)} disabled={!editMode} className="h-12 pl-12 bg-background/50" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input value={formData.phone || ""} onChange={(e) => update("phone", e.target.value)} disabled={!editMode} className="h-12 pl-12 bg-background/50" />
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label>City</Label>
                    <Input value={formData.city || ""} onChange={(e) => update("city", e.target.value)} disabled={!editMode} className="h-12 bg-background/50" />
                  </div>
                  <div className="space-y-2">
                    <Label>Pin Code</Label>
                    <Input value={formData.pincode || ""} onChange={(e) => update("pincode", e.target.value)} disabled={!editMode} className="h-12 bg-background/50" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Address</Label>
                  <Textarea value={formData.address || ""} onChange={(e) => update("address", e.target.value)} disabled={!editMode} className="bg-background/50" placeholder="Full business address" />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="hiring">
              <div className="rounded-2xl p-6 md:p-8 space-y-6 border border-border bg-card">
                <h2 className="text-xl font-bold font-syne flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-primary" /> Hiring Preferences
                </h2>

                <div className="space-y-3">
                  <Label>Roles You Hire For ({(formData.hiringNeeds || []).length})</Label>
                  <div className="flex flex-wrap gap-2">
                    {(formData.hiringNeeds || []).map((n) => (
                      <Badge key={n} className="bg-primary text-primary-foreground border-0 px-3 py-1.5">
                        {n}
                        {editMode && (
                          <button onClick={() => toggleNeed(n)} className="ml-2"><X className="w-3 h-3" /></button>
                        )}
                      </Badge>
                    ))}
                  </div>
                  {editMode && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {hiringCategories.filter((c) => !(formData.hiringNeeds || []).includes(c)).map((c) => (
                        <button key={c} onClick={() => toggleNeed(c)} className="px-3 py-1.5 rounded-full border border-border text-sm hover:border-primary hover:text-primary transition-colors">
                          + {c}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label>Preferred Schedule</Label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input value={formData.preferredSchedule || ""} onChange={(e) => update("preferredSchedule", e.target.value)} disabled={!editMode} className="h-12 pl-12 bg-background/50" placeholder="e.g., Weekends, Evenings" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Budget Range</Label>
                    <div className="relative">
                      <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input value={formData.budget || ""} onChange={(e) => update("budget", e.target.value)} disabled={!editMode} className="h-12 pl-12 bg-background/50" placeholder="e.g., 200-500/hr" />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </CustomerLayout>
  );
};

export default CustomerProfilePage;