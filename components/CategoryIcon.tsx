import { Bitcoin, Building2, Cpu, Layers, Zap, type LucideIcon } from "lucide-react";

const MAP: Record<string, LucideIcon> = {
  Zap,
  Cpu,
  Building2,
  Layers,
  Bitcoin,
};

export function CategoryIcon({
  name,
  className,
  size = 20,
}: {
  name: string;
  className?: string;
  size?: number;
}) {
  const Icon = MAP[name] ?? Layers;
  return <Icon size={size} className={className} strokeWidth={1.75} />;
}
