
import { Card, CardContent } from "@/components/ui/card";

const ShareGemstonePromo = () => {
  return (
    <Card className="bg-gradient-to-br from-wandora-terracotta to-wandora-sage text-white shadow-sm">
      <CardContent className="p-6">
        <h3 className="font-serif text-xl font-semibold mb-3">
          Join Our Community
        </h3>
        <p className="text-white/90 mb-4">
          Your story becomes part of a global tapestry of travel experiences, inspiring others to explore and discover.
        </p>
        <p className="text-sm text-white/80">
          All submissions are reviewed by our team to ensure quality and authenticity.
        </p>
      </CardContent>
    </Card>
  );
};

export default ShareGemstonePromo;
