import { ArrowDownRight, ArrowUpRight, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import CandidateLayout from "@/components/CandidateLayout";

const CandidateWallet = () => {
  const stats = [
    { label: "Earnings (this month)", value: "£201.00" },
    { label: "Platform fees", value: "£12.05" },
    { label: "Withdrawals", value: "£243.90" },
    { label: "Effective rate", value: "£11.32/hr" },
  ];
  const transactions = [
    { id: "t1", date: "24 Jul", label: "Bloom Cafe · Weekend Barista", type: "credit", amount: "+£81.00" },
    { id: "t2", date: "22 Jul", label: "Withdrawal to bank •• 4029", type: "debit", amount: "-£120.00" },
    { id: "t3", date: "19 Jul", label: "Nolita Kitchen · Evening KP", type: "credit", amount: "+£60.00" },
    { id: "t4", date: "17 Jul", label: "Platform fee", type: "debit", amount: "-£4.05" },
    { id: "t5", date: "12 Jul", label: "GreenBox · Lunch Rider", type: "credit", amount: "+£45.00" },
  ];
  return (
    <CandidateLayout active="/candidate/wallet">
      <div className="space-y-8">
        <div className="flex items-start justify-between gap-6 flex-wrap">
          <div>
            <Badge variant="secondary" className="rounded-full mb-4 font-semibold">↗ Fee Wallet</Badge>
            <h1 className="text-5xl md:text-6xl font-syne font-bold tracking-tight">Available balance</h1>
            <p className="text-6xl md:text-7xl font-syne font-bold text-primary mt-4">£-54.95</p>
            <p className="text-muted-foreground mt-3 max-w-2xl">
              Balance updates when a shift closes. Withdraw to a linked bank in one working day.
            </p>
          </div>
          <div className="flex gap-2">
            <Button className="rounded-full h-12 px-6"><Wallet className="w-4 h-4 mr-2" /> Withdraw</Button>
            <Button variant="outline" className="rounded-full h-12 px-6">Statements</Button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl border border-border bg-card p-5">
              <p className="text-sm text-muted-foreground">{s.label}</p>
              <p className="text-3xl font-syne font-bold mt-2">{s.value}</p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="font-syne font-bold text-xl mb-5">Transactions</h2>
          <div className="divide-y divide-border">
            {transactions.map((t) => (
              <div key={t.id} className="flex items-center gap-4 py-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${t.type === "credit" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                  {t.type === "credit" ? <ArrowDownRight className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{t.label}</p>
                  <p className="text-xs text-muted-foreground">{t.date}</p>
                </div>
                <p className={`font-syne font-bold ${t.type === "credit" ? "text-primary" : "text-foreground"}`}>{t.amount}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </CandidateLayout>
  );
};

export default CandidateWallet;