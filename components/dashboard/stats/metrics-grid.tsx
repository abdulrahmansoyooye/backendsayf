import { Users, BookOpen, Receipt, CreditCard } from "lucide-react"
import { MetricCard } from "./metric-card"

export function MetricsGrid({data}) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {data.map((metric,index) => (
        <MetricCard
          key={index}
          title={metric.title}
          value={metric.value}
          icon={metric.icon}
        />
      ))}
    </div>
  )
}