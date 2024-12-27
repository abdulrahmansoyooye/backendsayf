import { Avatar, AvatarFallback } from "@/components/ui/avatar"

import {formatMonth, formatDay}  from "@/constants/index"; 
export function ActivityItem({ message }) {
  return (
    <div className="w-full flex flex-wrap gap-3 justify-between">
      <div className=" space-y-1">
        <div className="text-sm font-medium leading-none">
         <div  dangerouslySetInnerHTML={{ __html: message.content }}/>
        </div>
      </div>
      <div className="font-medium text-sm text-muted-foreground">
        {formatMonth(message.createdAt)}{" "}
        {formatDay(message.createdAt)}
      </div>
    </div>
  )
}