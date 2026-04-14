import { Info, AlertTriangle, CheckCircle } from 'lucide-react';

export default function Callout({ type = 'info', children }) {
  const types = {
    info: {
      icon: Info,
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      border: 'border-blue-200 dark:border-blue-800',
      iconColor: 'text-blue-500',
    },
    warning: {
      icon: AlertTriangle,
      bg: 'bg-yellow-50 dark:bg-yellow-900/20',
      border: 'border-yellow-200 dark:border-yellow-800',
      iconColor: 'text-yellow-500',
    },
    success: {
      icon: CheckCircle,
      bg: 'bg-green-50 dark:bg-green-900/20',
      border: 'border-green-200 dark:border-green-800',
      iconColor: 'text-green-500',
    },
  };

  const config = types[type];
  const Icon = config.icon;

  return (
    <div className={`flex gap-3 p-4 rounded-lg border ${config.bg} ${config.border} my-4`}>
      <Icon className={`w-5 h-5 ${config.iconColor} flex-shrink-0 mt-0.5`} />
      <div className="text-sm text-gray-700 dark:text-gray-300">
        {children}
      </div>
    </div>
  );
}
