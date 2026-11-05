import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type Props = {
  children: React.ReactNode;
  active?: boolean;
  className?: string;
};

/** Atome : étiquette de catégorie (shadcn Badge, habillée aux tokens du blog). */
export function CategoryTag({ children, active = false, className }: Props) {
  return (
    <Badge
      variant="secondary"
      className={cn(
        'h-6 rounded-[4px] border-0 px-2 py-1 font-mono text-[11px] font-normal uppercase leading-4',
        active && 'bg-foreground text-background',
        className,
      )}
    >
      {children}
    </Badge>
  );
}
