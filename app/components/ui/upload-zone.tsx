import { useState, useEffect } from "react";
import Image from "next/image";

interface UploadZoneProps {
  onImageSelect: (file: File) => void;
  preview: string;
}

export default function UploadZone({
  onImageSelect,
  preview,
}: UploadZoneProps) {
  const [hasCameraAccess, setHasCameraAccess] = useState(false);

  useEffect(() => {
    navigator.mediaDevices
      .enumerateDevices()
      .then((devices) => {
        setHasCameraAccess(
          devices.some((device) => device.kind === "videoinput"),
        );
      })
      .catch((error) => console.error("Error checking camera access:", error));
  }, []);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      onImageSelect(file);
    }
  };

  const handleCameraClick = async () => {
    if (!hasCameraAccess) {
      alert("Your device doesn't seem to have a camera.");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const video = document.createElement("video");
      video.srcObject = stream;
      video.play();
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      context!.drawImage(video, 0, 0);

      const dataURL = canvas.toDataURL("image/jpeg");
      const imageBlob = await fetch(dataURL).then((response) =>
        response.blob(),
      );
      onImageSelect(new File([imageBlob], "captured-image.jpg"));

      video.pause();
      video.srcObject = null;
      stream.getTracks().forEach((track) => track.stop());
    } catch (error) {
      console.error("Error capturing image from camera:", error);
      alert("Failed to capture image from camera. Please try again.");
    }
  };

  return (
    <label
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className="w-full max-w-md h-64 flex flex-col items-center justify-center border-2 border-dashed border-primary/30 rounded-lg cursor-pointer hover:bg-primary/5 transition-all duration-300 relative overflow-hidden group"
    >
      {preview ? (
        <div className="w-full h-full relative">
          <Image
            src={preview}
            alt="Preview"
            fill
            className="object-contain p-2"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <p
              className="text-white   
 text-sm"
            >
              Click or drag to change image
            </p>
          </div>
        </div>
      ) : (
        <>
          {hasCameraAccess ? (
            <button
              onClick={handleCameraClick}
              className="mb-4 w-full rounded-md bg-green-600 hover:bg-green-700 text-white px-4 py-2 transition-colors duration-300"
            >
              Capture Image
            </button>
          ) : (
            <p className="text-gray-500 text-sm">No camera detected</p>
          )}
          <svg
            className="w-12 h-12 text-primary mb-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6   
 0H6"
            />
          </svg>
          <span className="text-foreground">
            Drop your image here or click to browse
          </span>
        </>
      )}
      <input
        type="file"
        className="hidden"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onImageSelect(file);
        }}
      />
    </label>
  );
}
