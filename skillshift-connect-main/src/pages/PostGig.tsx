import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft, ArrowRight, Building2, User, Briefcase, MapPin, Clock,
  IndianRupee, Sparkles, CheckCircle
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
import CustomerLayout from "@/components/CustomerLayout";

const hiringCategories = [
  "Bike Rides", "Parcel Drop", "Shop Staff", "Restaurant Staff", "Gym Trainers",
  "Chefs & Cooks", "Hotel Management", "Home Services", "Tutoring", "Creative Work",
  "Event Help", "Maid/Cleaning", "Delivery", "Customer Service", "Photography",
  "Video Editing", "Social Media", "Content Writing", "Driving",
];

type EmployerType = "business" | "individual" | null;

const PostGig = () => {
  const { isLoggedIn, userRole, customerProfile, addOpportunity, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!loading && (!isLoggedIn || userRole !== "customer")) {
      navigate("/login/customer", { replace: true });
    }
  }, [isLoggedIn, loading, navigate, userRole]);

  const [step, setStep] = useState<0 | 1 | 2>(0);
  const [employerType, setEmployerType] = useState<EmployerType>(null);
  const [form, setForm] = useState({
    category: "", role: "", description: "",
    city: customerProfile?.city || "", address: "", locationHunt: "",
    duration: "", timing: "",
    payAmount: "", payType: "hour",
    openings: "1", immediateJoin: false,
  });

  if (loading || !customerProfile) return <div className="min-h-screen bg-background" />;

  const update = <K extends keyof typeof form>(k: K, v: typeof form[K]) =>
    setForm((p) => ({ ...p, [k]: v }));

  const handleSelectEmployer = (type: EmployerType) => {
    setEmployerType(type);
    setStep(1);
  };

  const handlePublish = async () => {
    if (!form.category || !form.role) {
      toast({ title: "Add role & category", description: "Category and role title are required.", variant: "destructive" });
      return;
    }
    await addOpportunity(form);
    toast({ title: "Gig posted 🎉", description: "Candidates in the right role will see it instantly." });
    navigate("/customer/dashboard");
  };

  return (
    <CustomerLayout>
      <div className="max-w-3xl">
          <button
            onClick={() => (step === 0 ? navigate("/customer/dashboard") : setStep((s) => (s - 1) as 0 | 1 | 2))}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>

          {/* Step indicator */}
          <div className="flex items-center gap-2 mb-8">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`h-1.5 flex-1 rounded-full ${i <= step ? "bg-primary" : "bg-muted"}`}
              />
            ))}
          </div>

          {step === 0 && (
            <div>
              <h1 className="text-3xl md:text-4xl font-syne font-bold mb-2">Post a New Gig</h1>
              <p className="text-muted-foreground mb-8">First, tell us who's hiring.</p>

              <div className="grid sm:grid-cols-2 gap-4">
                <button
                  onClick={() => handleSelectEmployer("business")}
                  className="rounded-2xl border border-border bg-card p-6 text-left hover:border-primary transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Building2 className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg mb-1">Business</h3>
                  <p className="text-sm text-muted-foreground">Shop, restaurant, gym, studio, or any registered business.</p>
                </button>
                <button
                  onClick={() => handleSelectEmployer("individual")}
                  className="rounded-2xl border border-border bg-card p-6 text-left hover:border-primary transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg mb-1">Individual</h3>
                  <p className="text-sm text-muted-foreground">Home help, personal tasks, tuition, one-off gigs.</p>
                </button>
              </div>
            </div>
          )}

          {step === 1 && (
            <div>
              <h1 className="text-2xl md:text-3xl font-syne font-bold mb-2">Gig details</h1>
              <p className="text-muted-foreground mb-6">Posting as <span className="font-semibold text-foreground">{employerType === "business" ? "Business" : "Individual"}</span>.</p>

              <div className="space-y-5 rounded-2xl border border-border bg-card p-6">
                <div className="space-y-2">
                  <Label>Role category</Label>
                  <Select value={form.category} onValueChange={(v) => update("category", v)}>
                    <SelectTrigger className="h-12"><SelectValue placeholder="Select a category" /></SelectTrigger>
                    <SelectContent>
                      {hiringCategories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">This auto-categorizes your gig in the candidate portal.</p>
                </div>

                <div className="space-y-2">
                  <Label>Role title</Label>
                  <Input value={form.role} onChange={(e) => update("role", e.target.value)} placeholder="e.g., Evening gym trainer" className="h-12" />
                </div>

                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea value={form.description} onChange={(e) => update("description", e.target.value)} placeholder="Tasks, expectations, requirements" className="min-h-[110px]" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label>City</Label>
                    <Input value={form.city} onChange={(e) => update("city", e.target.value)} className="h-12" />
                  </div>
                  <div className="space-y-2">
                    <Label>Openings</Label>
                    <Input value={form.openings} onChange={(e) => update("openings", e.target.value)} className="h-12" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Location hunt (area)</Label>
                  <Input value={form.locationHunt} onChange={(e) => update("locationHunt", e.target.value)} placeholder="e.g., Andheri West, near metro" className="h-12" />
                </div>

                <Button variant="gradient" size="lg" className="w-full" onClick={() => setStep(2)}>
                  Continue <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h1 className="text-2xl md:text-3xl font-syne font-bold mb-2">Timing & pay</h1>
              <p className="text-muted-foreground mb-6">Add duration, timing and pay details.</p>

              <div className="space-y-5 rounded-2xl border border-border bg-card p-6">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />Duration</Label>
                    <Input value={form.duration} onChange={(e) => update("duration", e.target.value)} placeholder="2 weeks / 3 months" className="h-12" />
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />Timing</Label>
                    <Input value={form.timing} onChange={(e) => update("timing", e.target.value)} placeholder="6 PM - 10 PM" className="h-12" />
                  </div>
                </div>

                <div className="grid grid-cols-[1fr_140px] gap-3">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-1"><IndianRupee className="w-3.5 h-3.5" />Pay amount</Label>
                    <Input value={form.payAmount} onChange={(e) => update("payAmount", e.target.value)} placeholder="200-400" className="h-12" />
                  </div>
                  <div className="space-y-2">
                    <Label>Pay type</Label>
                    <Select value={form.payType} onValueChange={(v) => update("payType", v)}>
                      <SelectTrigger className="h-12"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hour">/ hour</SelectItem>
                        <SelectItem value="day">/ day</SelectItem>
                        <SelectItem value="week">/ week</SelectItem>
                        <SelectItem value="month">/ month</SelectItem>
                        <SelectItem value="task">/ task</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-xl border border-primary/20 bg-primary/5 p-4">
                  <Checkbox
                    id="immediateJoin"
                    checked={form.immediateJoin}
                    onCheckedChange={(c) => update("immediateJoin", Boolean(c))}
                  />
                  <div className="space-y-1">
                    <Label htmlFor="immediateJoin" className="cursor-pointer flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-primary" /> Immediate join available
                    </Label>
                    <p className="text-xs text-muted-foreground">Show this gig in the candidate immediate-join section.</p>
                  </div>
                </div>

                <Button variant="gradient" size="lg" className="w-full" onClick={handlePublish}>
                  <CheckCircle className="w-4 h-4 mr-2" /> Publish Gig
                </Button>
              </div>
            </div>
          )}
      </div>
    </CustomerLayout>
  );
};

export default PostGig;