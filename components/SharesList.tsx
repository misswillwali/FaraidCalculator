// File: components/SharesList.tsx
interface SharesListProps {
  heirs: Heir[];
  shares: {[key: string]: { amount: number, fraction: string }};
}

export function SharesList({ heirs, shares }: SharesListProps) {
  return (
    <ul className="space-y-2">
      {heirs.map((heir) => (
        <li key={heir.id} className="flex justify-between items-center">
          <span>
            {heir.count} {heir.relationship}(s):
          </span>
          <span className="font-semibold">
            {shares[heir.id].fraction} (RM {shares[heir.id].amount.toFixed(2)})
          </span>
        </li>
      ))}
    </ul>
  )
}
