
interface GemstoneQuickInfoProps {
  className?: string;
}

const GemstoneQuickInfo = ({ className }: GemstoneQuickInfoProps) => {
  return (
    <div className={`space-y-3 p-4 border rounded-lg ${className}`}>
      <h4 className="font-semibold text-wandora-charcoal">Quick Info</h4>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-wandora-stone">Best time to visit:</span>
          <span>Early morning</span>
        </div>
        <div className="flex justify-between">
          <span className="text-wandora-stone">Difficulty level:</span>
          <span>Moderate</span>
        </div>
        <div className="flex justify-between">
          <span className="text-wandora-stone">Duration:</span>
          <span>Half day</span>
        </div>
      </div>
    </div>
  );
};

export default GemstoneQuickInfo;
