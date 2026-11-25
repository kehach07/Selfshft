import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, MapPin, Clock, IndianRupee, Users, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import CustomerLayout from "@/components/CustomerLayout";
import { useAuth } from "@/contexts/AuthContext";

const tabs = ["All", "Live", "Booked", "Closed"] as const;
type Tab = (typeof tabs)[number];

const CustomerMyGigs = () => {
  const { isLoggedIn, userRole, customerProfile, opportunities, loading } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("All");

  useEffect(() => {
    if (!loading && (!isLoggedIn || userRole !== "customer")) {
      navigate("/login/customer", { replace: true });
    }
  }, [isLoggedIn, loading, navigate, userRole]);

  const myGigs = useMemo(
    () => opportunities.filter((o) => o.customerId === customerProfile?.id),
    [opportunities, customerProfile?.id]
  );

  const filtered = useMemo(() => {
    if (tab === "Live") return myGigs.filter((g) => !g.bookedBy);
    if (tab === "Booked") return myGigs.filter((g) => g.bookedBy);
    if (tab === "Closed") return myGigs.filter((g) => (g as { status?: string }).status === "closed");
    return myGigs;
  }, [myGigs, tab]);

  if (loading || !customerProfile) return <CustomerLayout><div /></CustomerLayout>;

  return (
    <CustomerLayout>
      <div className="space-y-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl md:text-3xl font-syne font-bold">My Gigs</h1>
            <p className="text-sm text-muted-foreground">Manage every role you've posted.</p>
          </div>
          <Button onClick={() => navigate("/customer/post-gig")}>
            <Plus className="w-4 h-4 mr-2" /> Post a Gig
          </Button>
        </div>

        <div className="flex gap-2 border-b border-border">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
                tab === t ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-12 text-center">
            <p className="font-syne font-bold mb-2">No gigs here yet</p>
            <p className="text-sm text-muted-foreground mb-4">Post your first opportunity to start receiving applications.</p>
            <Button onClick={() => navigate("/customer/post-gig")}>
              <Plus className="w-4 h-4 mr-2" /> Post a Gig
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {filtered.map((g) => {
              const status = g.bookedBy ? "Booked" : "Live";
              return (
                <div key={g.id} className="rounded-2xl border border-border bg-card p-5 flex flex-col">
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-primary/15 text-primary">
                      {status}
                    </span>
                    <span className="text-xs text-muted-foreground">{g.category}</span>
                  </div>
                  <p className="font-syne font-bold text-lg leading-tight">{g.role}</p>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{g.description || "No description."}</p>

                  <div className="grid grid-cols-2 gap-2 mt-4 text-xs text-muted-foreground">
                    {g.city && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {g.city}</span>}
                    {g.timing && <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {g.timing}</span>}
                    {g.payAmount && <span className="flex items-center gap-1"><IndianRupee className="w-3 h-3" /> {g.payAmount}/{g.payType}</span>}
                    <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {g.applications?.length || 0} applied</span>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Button size="sm" variant="outline" className="flex-1" onClick={() => navigate("/customer/manage")}>
                      View Applicants
                    </Button>
                    <Button size="sm" variant="ghost" className="text-muted-foreground">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </CustomerLayout>
  );
};

export default CustomerMyGigs;