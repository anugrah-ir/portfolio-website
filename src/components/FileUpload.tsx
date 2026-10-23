import { useState } from "react";
import { CloudUpload } from "lucide-react";

interface FileUploadProps {
  file: File | null;
  onFileSelect: (file: File) => void;
  allowedTypes?: string[];
  maxSize?: number;
}

export default function FileUpload({
  file,
  onFileSelect,
  allowedTypes,
  maxSize,
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const sizeInMB = maxSize ? maxSize / (1024 * 1024) : undefined;

  const validateFile = (file: File): boolean => {
    if (allowedTypes && allowedTypes.length > 0) {
      const extension = "." + file.name.split(".").pop()?.toLowerCase();
      if (!allowedTypes.includes(extension)) {
        alert(`Invalid file format. Allowed: ${allowedTypes.join(", ")}`);
        return false;
      }
    }

    if (maxSize) {
      if (file.size > maxSize) {
        alert(`File size exceeds ${maxSize / (1024 * 1024)}MB`);
        return false;
      }
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
      className={`flex w-full flex-col items-center justify-center rounded-xl border-2 sm:rounded-2xl ${
        isDragging ? "border-blue-500 bg-blue-500/10" : "border-neutral-700 bg-neutral-950/40"
      } border-dashed p-4 text-center sm:p-8`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <CloudUpload className="h-10 w-10 text-neutral-400 sm:h-12 sm:w-12" />
      <p className="mt-3 text-sm font-medium text-white sm:mt-4 sm:text-base">
        Choose a file or drag & drop here
      </p>
      <p className="mt-1 text-xs text-neutral-400 sm:mt-2 sm:text-sm">
        {allowedTypes
          ? `${allowedTypes.join(", ").toUpperCase().replace(/\./g, "")} formats`
          : ""}
        {sizeInMB ? `, up to ${sizeInMB}MB` : ""}
      </p>
      <label className="mt-3 inline-block cursor-pointer rounded-lg border border-neutral-600 bg-neutral-800/80 px-4 py-1.5 text-xs font-medium transition hover:border-neutral-400 hover:bg-neutral-700 sm:mt-4 sm:py-2 sm:text-sm">
        Browse
        <input
          name="file"
          type="file"
          className="hidden"
          accept={allowedTypes?.join(",")}
          onChange={handleBrowse}
        />
      </label>
      {file && (
        <p className="mt-3 max-w-full break-all text-xs font-medium text-green-500 sm:text-sm">
          Selected: {file.name}
        </p>
      )}
    </div>
  );
}
