
interface GemstoneStatsProps {
  filteredCount: number;
  totalCount: number;
}

const GemstoneStats = ({ filteredCount, totalCount }: GemstoneStatsProps) => {
  return (
    <div className="mb-8">
      <p className="text-wandora-stone">
        Showing {filteredCount} of {totalCount} gemstones
      </p>
    </div>
  );
};

export default GemstoneStats;
