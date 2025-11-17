import { cn } from "@/lib/utils";

interface WelcomeBannerProps {
  userName: string;
  message: string;
  subtitle?: string;
  gradient?: string;
  className?: string;
}

export function WelcomeBanner({
  userName,
  message,
  subtitle,
  gradient = "from-teal-600 to-cyan-600",
  className,
}: WelcomeBannerProps) {
  return (
    <div
      className={cn(
        "bg-linear-to-r rounded-lg p-6 text-white mb-8",
        gradient,
        className
      )}
    >
      <h2 className="text-2xl font-bold mb-2">
        {message}, {userName}!
      </h2>
      {subtitle && <p className="text-teal-100">{subtitle}</p>}
    </div>
  );
}
