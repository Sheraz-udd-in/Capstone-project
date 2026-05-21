import { ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface DashboardCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  to: string;
  emoji: string;
  disabled?: boolean;
  index: number;
}

const DashboardCard = ({
  title,
  description,
  icon: Icon,
  to,
  emoji,
  disabled = false,
  index,
}: DashboardCardProps) => {
  const card = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className={`card-hover ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-primary/50'} overflow-hidden group relative`}>
        <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity" />
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="bg-gradient-primary p-3 rounded-xl text-white group-hover:scale-110 transition-transform">
              <Icon className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-xl font-bold">{title}</h3>
                <span className="text-2xl">{emoji}</span>
              </div>
              <p className="text-sm text-muted-foreground">{description}</p>
              {disabled && (
                <span className="inline-block mt-2 text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-full">
                  Coming Soon
                </span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  if (disabled) {
    return card;
  }

  return <Link to={to}>{card}</Link>;
};

export default DashboardCard;
