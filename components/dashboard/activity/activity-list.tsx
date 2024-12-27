import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ActivityItem } from "./activity-item"



export function ActivityList({messages}) {
  return (
    <Card className="w-full col-span-3">
      <CardHeader>
        <CardTitle>Recent Messages ({messages.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {messages.map((message, index) => (
            <ActivityItem key={index} message={message} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}