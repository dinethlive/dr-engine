import { Loader2 } from "lucide-react";

interface ProgressDisplayProps {
  current: number;
  total: number;
}

export function ProgressDisplay({ current, total }: ProgressDisplayProps) {
  return (
    <div className="flex justify-center py-6">
      <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-muted">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span className="text-sm">
          Generating answers: {current} / {total}
        </span>
      </div>
    </div>
  );
}
