import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, Star, User } from "lucide-react";
import CustomerLayout from "@/components/CustomerLayout";
import { useAuth } from "@/contexts/AuthContext";

const CustomerHistory = () => {
  const { isLoggedIn, userRole, customerProfile, opportunities, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && (!isLoggedIn || userRole !== "customer")) {
      navigate("/login/customer", { replace: true });
    }
  }, [isLoggedIn, loading, navigate, userRole]);

  const history = useMemo(
    () => opportunities.filter((o) => o.customerId === customerProfile?.id && o.bookedBy),
    [opportunities, customerProfile?.id]
  );

  if (loading || !customerProfile) return <CustomerLayout><div /></CustomerLayout>;

  return (
    <CustomerLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-syne font-bold">Hiring History</h1>
          <p className="text-sm text-muted-foreground">Every candidate you've hired through SelfShft.</p>
        </div>

        {history.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-12 text-center">
            <p className="font-syne font-bold mb-2">No completed hires yet</p>
            <p className="text-sm text-muted-foreground">Once you book candidates, their records will appear here.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {history.map((h) => (
              <div key={h.id} className="rounded-2xl border border-border bg-card p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/15 text-primary flex items-center justify-center">
                  <User className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-syne font-bold truncate">{h.role}</p>
                  <p className="text-xs text-muted-foreground truncate">{h.category} • Booked</p>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span className="hidden sm:inline text-muted-foreground">Completed</span>
                </div>
                <div className="flex items-center gap-1 text-sm font-semibold">
                  <Star className="w-4 h-4 fill-primary text-primary" /> 5.0
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </CustomerLayout>
  );
};

export default CustomerHistory;