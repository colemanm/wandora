
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Map, Upload } from "lucide-react";

const ShareGemstoneGuide = () => {
  return (
    <Card className="bg-white shadow-sm animate-fade-in">
      <CardHeader>
        <CardTitle className="font-serif text-xl text-wandora-charcoal">
          What Makes a Great Gemstone?
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start space-x-3">
          <User className="w-5 h-5 text-wandora-terracotta mt-1 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-wandora-charcoal">Authentic</h4>
            <p className="text-sm text-wandora-stone">Share your genuine, personal experience</p>
          </div>
        </div>
        <div className="flex items-start space-x-3">
          <Map className="w-5 h-5 text-wandora-terracotta mt-1 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-wandora-charcoal">Specific</h4>
            <p className="text-sm text-wandora-stone">Include specific details about the location</p>
          </div>
        </div>
        <div className="flex items-start space-x-3">
          <Upload className="w-5 h-5 text-wandora-terracotta mt-1 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-wandora-charcoal">Visual</h4>
            <p className="text-sm text-wandora-stone">A compelling photo helps tell your story</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ShareGemstoneGuide;
