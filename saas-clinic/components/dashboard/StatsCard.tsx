import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon?: LucideIcon;
  iconBgColor?: string;
  iconColor?: string;
  className?: string;
}

export function StatsCard({
  title,
  value,
  icon: Icon,
  iconBgColor = "bg-blue-100",
  iconColor = "text-blue-600",
  className,
}: StatsCardProps) {
  return (
    <Card className={cn("p-6", className)}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
        {Icon && (
          <div
            className={cn(
              "w-12 h-12 rounded-lg flex items-center justify-center",
              iconBgColor
            )}
          >
            <Icon className={cn("w-6 h-6", iconColor)} />
          </div>
        )}
      </div>
    </Card>
  );
}
