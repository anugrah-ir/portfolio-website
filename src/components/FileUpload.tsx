import { useState } from "react";
import { CloudUpload } from "lucide-react";

interface FileUploadProps {
  file: File | null;
  onFileSelect: (file: File) => void;
}

export default function FileUpload({ file, onFileSelect }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const allowedTypes = [".ico", ".svg", ".png", ".jpg", ".jpeg"];
  const maxSize = 1024 * 1024;

  const validateFile = (file: File): boolean => {
    const extension = "." + file.name.split(".").pop()?.toLowerCase();
    if (!allowedTypes.includes(extension)) {
      alert("Invalid file format");
      return false;
    }
    if (file.size > maxSize) {
      alert("File size exceeds 1MB");
      return false;
    }
    return true;
  };

  const handleFile = (file: File) => {
    if (validateFile(file)) {
      onFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) handleFile(droppedFile);
  };

  const handleBrowse = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    if (files.length > 1) {
      alert("Please select only one file.");
      e.target.value = "";
      return;
    }

    const selectedFile = e.target.files?.[0];
    if (selectedFile) handleFile(selectedFile);
  };

  return (
    <div
      className={`flex flex-col items-center justify-center border-2 ${isDragging ? "border-blue-500" : "border-neutral-500"} rounded-2xl border-dashed p-8 text-center`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <CloudUpload className="h-12 w-12" />
      <p className="mt-4">Choose a file or drag & drop here</p>
      <p className="mt-2 text-sm text-neutral-300">
        ICO, SVG, PNG, and JPG formats, up to 1MB
      </p>
      <label className="mt-4 inline-block cursor-pointer rounded-lg border border-neutral-300 px-4 py-2 hover:bg-neutral-800">
        Browse
        <input
          name="file"
          type="file"
          className="hidden"
          accept=".ico,.svg,.png,.jpg,.jpeg"
          onChange={handleBrowse}
        />
      </label>
      {file && (
        <p className="mt-4 text-sm text-green-600">Selected: {file.name}</p>
      )}
    </div>
  );
}
