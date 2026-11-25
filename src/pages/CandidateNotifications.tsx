import { Badge } from "@/components/ui/badge";
import CandidateLayout from "@/components/CandidateLayout";
import { Bell, Calendar, MessageSquare, Wallet } from "lucide-react";

const items = [
  { id: "n1", icon: Calendar, title: "Shift confirmed", body: "Bloom Cafe confirmed your Weekend Barista shift on Sat 08:00.", time: "2h ago", unread: true },
  { id: "n2", icon: Wallet, title: "Payout on the way", body: "£81.00 will land in your bank by tomorrow.", time: "1d ago", unread: true },
  { id: "n3", icon: MessageSquare, title: "New message from Nolita Kitchen", body: "Hey Marcus, can you cover Friday evening?", time: "2d ago", unread: false },
  { id: "n4", icon: Bell, title: "New matching gig", body: "GreenBox posted a Lunch Rider gig 0.6 miles away.", time: "3d ago", unread: false },
];

const CandidateNotifications = () => (
  <CandidateLayout active="/candidate/notifications">
    <div className="space-y-8">
      <div>
        <Badge variant="secondary" className="rounded-full mb-4 font-semibold">↗ Notifications</Badge>
        <h1 className="text-5xl md:text-6xl font-syne font-bold tracking-tight">Inbox</h1>
        <p className="text-muted-foreground mt-4 max-w-2xl">Shift updates, payouts and messages from businesses in one place.</p>
      </div>
      <div className="rounded-2xl border border-border bg-card divide-y divide-border">
        {items.map(({ id, icon: Icon, title, body, time, unread }) => (
          <div key={id} className="flex gap-4 p-5">
            <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center shrink-0">
              <Icon className="w-5 h-5 text-foreground/70" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-semibold">{title}</p>
                {unread && <span className="w-2 h-2 rounded-full bg-primary" />}
              </div>
              <p className="text-sm text-muted-foreground mt-1">{body}</p>
              <p className="text-xs text-muted-foreground mt-1">{time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </CandidateLayout>
);

export default CandidateNotifications;