"use client";
import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import UploadZone from "./components/ui/upload-zone";
import PlantInfoCard from "./components/ui/plant-info-card";
import { Leaf, Droplets, Sun, Wind, ThermometerSun } from "lucide-react";

interface PlantInfo {
  name: string;
  description: string;
  care: string;
  scientificName?: string;
  family?: string;
  nativeRegion?: string;
  wateringNeeds?: string;
  sunlightRequirements?: string;
  temperature?: string;
  humidity?: string;
  soilType?: string;
  growthRate?: string;
}

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [result, setResult] = useState<PlantInfo | null>(null);

  const handleImageSelect = (file: File) => {
    setSelectedImage(file);
    setError("");
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const identifyPlant = async () => {
    if (!selectedImage) return;
    setLoading(true);
    setError("");

    try {
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY!;
      if (!apiKey) {
        throw new Error("API key is not configured");
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
      });

      const imageData = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64Data = (reader.result as string).split(",")[1];
          resolve(base64Data);
        };
        reader.readAsDataURL(selectedImage);
      });

      const imagePart = {
        inlineData: {
          data: imageData,
          mimeType: selectedImage.type,
        },
      };

      const prompt = `Analyze this plant image and provide detailed information in the following JSON format:
      {
        "name": "common name of the plant",
        "scientificName": "scientific name",
        "family": "plant family",
        "description": "detailed description of physical characteristics",
        "care": "comprehensive care instructions",
        "nativeRegion": "native habitat and region",
        "wateringNeeds": "specific watering requirements",
        "sunlightRequirements": "sunlight needs",
        "temperature": "ideal temperature range",
        "humidity": "humidity requirements",
        "soilType": "preferred soil conditions",
        "growthRate": "growth rate and mature size"
      }
      Ensure the response is only the JSON object with these fields.`;

      const result = await model.generateContent([prompt, imagePart]);
      const response = await result.response;
      const text = response.text();

      let plantData: PlantInfo;
      try {
        plantData = JSON.parse(text);
        if (!plantData.name || !plantData.description || !plantData.care) {
          throw new Error("Invalid response format");
        }
      } catch (e) {
        throw new Error("Failed to parse plant information");
      }

      setResult(plantData);
    } catch (error) {
      console.error("Error details:", error);
      if (error instanceof Error) {
        if (error.message.includes("403")) {
          setError(
            "API key doesn't have access to Gemini Vision API. Please check your API key permissions.",
          );
        } else if (error.message.includes("404")) {
          setError("Invalid model specified. Please check the model name.");
        } else {
          setError(error.message);
        }
      } else {
        setError("Failed to identify plant. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-100 to-green-100 animated-gradient">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-5">
            Plant Identifier
          </h1>
          <p className="text-lg text-white max-w-2xl mx-auto">
            Upload a photo of any plant and get detailed information about its
            characteristics, care requirements, and growing conditions. Perfect
            for gardeners and plant enthusiasts!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-green-800 mb-6">
              Upload Your Plant Photo
            </h2>
            <UploadZone onImageSelect={handleImageSelect} preview={preview} />

            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}

            <button
              onClick={identifyPlant}
              disabled={!selectedImage || loading}
              className={`w-full mt-6 px-6 py-3 rounded-lg text-white font-semibold ${
                !selectedImage || loading
                  ? "bg-gray-400"
                  : "bg-green-600 hover:bg-green-700"
              } transition-colors duration-300 ${
                loading ? "loading-animation" : ""
              }`}
            >
              {loading ? "Analyzing Plant..." : "Identify Plant"}
            </button>
          </div>

          {result && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-green-800 mb-6">
                Plant Details
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-700">Scientific Name</h3>
                  <p className="text-lg text-green-800 italic">
                    {result.scientificName}
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-700">Family</h3>
                  <p className="text-lg text-green-800">{result.family}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-700">Native Region</h3>
                  <p className="text-lg text-green-800">
                    {result.nativeRegion}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {result && (
          <>
            <PlantInfoCard plantInfo={result} />

            <div className="mt-8 bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-green-800 mb-6">
                Growing Conditions
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="flex items-start space-x-3">
                  <Droplets className="w-6 h-6 text-blue-500" />
                  <div>
                    <h3 className="font-medium text-gray-700">
                      Watering Needs
                    </h3>
                    <p className="text-gray-600">{result.wateringNeeds}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Sun className="w-6 h-6 text-yellow-500" />
                  <div>
                    <h3 className="font-medium text-gray-700">Sunlight</h3>
                    <p className="text-gray-600">
                      {result.sunlightRequirements}
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <ThermometerSun className="w-6 h-6 text-red-500" />
                  <div>
                    <h3 className="font-medium text-gray-700">Temperature</h3>
                    <p className="text-gray-600">{result.temperature}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Wind className="w-6 h-6 text-teal-500" />
                  <div>
                    <h3 className="font-medium text-gray-700">Humidity</h3>
                    <p className="text-gray-600">{result.humidity}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Leaf className="w-6 h-6 text-green-500" />
                  <div>
                    <h3 className="font-medium text-gray-700">Soil Type</h3>
                    <p className="text-gray-600">{result.soilType}</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
