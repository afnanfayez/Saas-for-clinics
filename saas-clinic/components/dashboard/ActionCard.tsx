import { LucideIcon } from "lucide-react";

interface ActionCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  onClick?: () => void;
  variant?: 'blue' | 'teal' | 'purple' | 'yellow' | 'green';
}

const variantStyles = {
  blue: { bg: 'bg-blue-100', icon: 'text-blue-600', hover: 'hover:border-blue-500 hover:bg-blue-50' },
  teal: { bg: 'bg-teal-100', icon: 'text-teal-600', hover: 'hover:border-teal-500 hover:bg-teal-50' },
  purple: { bg: 'bg-purple-100', icon: 'text-purple-600', hover: 'hover:border-purple-500 hover:bg-purple-50' },
  yellow: { bg: 'bg-yellow-100', icon: 'text-yellow-600', hover: 'hover:border-yellow-500 hover:bg-yellow-50' },
  green: { bg: 'bg-green-100', icon: 'text-green-600', hover: 'hover:border-green-500 hover:bg-green-50' },
};

export function ActionCard({
  title,
  description,
  icon: Icon,
  onClick,
  variant = 'teal',
}: ActionCardProps) {
  const styles = variantStyles[variant];

  return (
    <button
      onClick={onClick}
      className={`flex items-center p-4 border-2 border-gray-200 rounded-lg ${styles.hover} transition-all w-full text-left`}
    >
      <div className={`w-10 h-10 ${styles.bg} rounded-lg flex items-center justify-center mr-3`}>
        <Icon className={`w-5 h-5 ${styles.icon}`} />
      </div>
      <div>
        <p className="font-medium text-gray-900">{title}</p>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </button>
  );
}
