import { Info, Book } from "lucide-react";

interface PlantInfo {
  name: string;
  description: string;
  care: string;
  scientificName?: string;
  growthRate?: string;
}

interface PlantInfoCardProps {
  plantInfo: PlantInfo;
}

export default function PlantInfoCard({ plantInfo }: PlantInfoCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="border-b border-green-100 pb-4 mb-6">
        <h2 className="text-3xl font-bold text-green-800">{plantInfo.name}</h2>
        {plantInfo.scientificName && (
          <p className="text-lg text-green-600 italic mt-1">
            {plantInfo.scientificName}
          </p>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-green-700 mb-2 flex items-center">
              <Info className="w-5 h-5 mr-2" />
              Description
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {plantInfo.description}
            </p>
          </div>
          {plantInfo.growthRate && (
            <div className="mt-4 p-4 bg-green-50 rounded-lg">
              <p className="text-green-800">
                <span className="font-medium">Growth Rate: </span>
                {plantInfo.growthRate}
              </p>
            </div>
          )}
        </div>

        <div>
          <h3 className="text-lg font-semibold text-green-700 mb-2 flex items-center">
            <Book className="w-5 h-5 mr-2" />
            Care Instructions
          </h3>
          <div className="prose prose-green">
            <p className="text-gray-700 leading-relaxed">{plantInfo.care}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
