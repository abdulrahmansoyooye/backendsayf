"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { School, Users, BookOpen, Receipt, CreditCard, Calendar } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const routes = [
  {
    label: 'Dashboard',
    icon: School,
    href: '/dashboard',
  },
  {
    label: 'Classes',
    icon: BookOpen,
    href: '/dashboard/classes',
  },
  {
    label: 'Students',
    icon: Users,
    href: '/dashboard/students',
  },
  {
    label: 'Bills',
    icon: CreditCard,
    href: '/dashboard/bills',
  },
  {
    label: 'Receipts',
    icon: Receipt,
    href: '/dashboard/receipts',
  },
  {
    label: 'Terms & Sessions',
    icon: Calendar,
    href: '/dashboard/terms',
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-slate-900 text-white">
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <h1 className="text-2xl font-bold">Rawaaq</h1>
        </Link>
        <ScrollArea className="flex-1">
          <div className="space-y-1">
            {routes.map((route) => (
              <Button
                key={route.href}
                asChild
                variant={pathname === route.href ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  pathname === route.href ? "bg-white/10" : "hover:bg-white/10"
                )}
              >
                <Link href={route.href}>
                  <route.icon className="h-5 w-5 mr-3" />
                  {route.label}
                </Link>
              </Button>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}