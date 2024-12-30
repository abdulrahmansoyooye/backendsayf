import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const activities = [
  {
    name: "John Doe",
    action: "paid school fees",
    amount: "$500",
    time: "2 hours ago"
  },
  {
    name: "Jane Smith",
    action: "enrolled in Class 5A",
    time: "3 hours ago"
  },
  {
    name: "Mike Johnson",
    action: "submitted term report",
    time: "5 hours ago"
  },
]

export function RecentActivity() {
  return (
    <div className="space-y-8">
      {activities.map((activity, index) => (
        <div key={index} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarFallback>
              {activity.name.split(" ").map(n => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">
              {activity.name}
            </p>
            <p className="text-sm text-muted-foreground">
              {activity.action}
              {activity.amount && ` - ${activity.amount}`}
            </p>
          </div>
          <div className="ml-auto font-medium text-sm text-muted-foreground">
            {activity.time}
          </div>
        </div>
      ))}
    </div>
  )
}