// File: components/HeirList.tsx
import { Button } from "@/components/ui/button"
import { X } from 'lucide-react'

interface HeirListProps {
  heirs: Heir[];
  shares: {[key: string]: { amount: number, fraction: string }};
  onRemoveHeir: (id: string) => void;
}

export function HeirList({ heirs, shares, onRemoveHeir }: HeirListProps) {
  return (
    <ul className="space-y-2">
      {heirs.map((heir) => (
        <li key={heir.id} className="flex items-center justify-between bg-gray-100 p-2 rounded">
          <span>
            {heir.count} {heir.relationship}(s)
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onRemoveHeir(heir.id)}
            aria-label={`Remove ${heir.count} ${heir.relationship}(s)`}
          >
            <X className="h-4 w-4" />
          </Button>
        </li>
      ))}
    </ul>
  )
}
