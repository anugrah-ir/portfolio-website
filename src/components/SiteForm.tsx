"use client";
import Form from "next/form";
import { useState } from "react";
import { updateSite, uploadFile } from "@/app/admin/actions";
import { CloudUpload } from "lucide-react";

interface Site {
  title: string;
  description: string;
  favicon: string;
}

interface SiteFormProps {
  site: Site;
}

function UploadFileForm() {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [result, setResult] = useState<string>("");

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
      setFile(file);
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
  const handleCancelFile = () => {
    setFile(null);
    setResult("");
  };

  async function handleSubmit(formData: FormData) {
    setIsUploading(true);
    setResult("");

    try {
      const url = await uploadFile(formData);
      setResult(`File uploaded successfully! URL: ${url}`);
    } catch (error) {
      setResult(
        `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <Form
      action={handleSubmit}
      className="flex flex-col items-center gap-10 lg:flex-row"
    >
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
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isUploading}
          className="cursor-pointer rounded-xl border border-neutral-500 px-4 py-2 text-lg hover:bg-neutral-800 disabled:opacity-50"
        >
          {isUploading ? "Uploading..." : "Save"}
        </button>
        {file && (
          <button
            type="button"
            onClick={handleCancelFile}
            disabled={isUploading}
            className="cursor-pointer rounded-xl border border-neutral-500 px-4 py-2 text-lg hover:bg-neutral-800 disabled:opacity-50"
          >
            Cancel
          </button>
        )}
      </div>
    </Form>
  );
}

export default function SiteForm({ site }: SiteFormProps) {
  const [formData, setFormData] = useState(site);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [titleMessage, setTitleMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [descriptionMessage, setDescriptionMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleTitleCancel = () => {
    setFormData({ ...formData, title: site.title });
    setIsEditingTitle(false);
    setTitleMessage(null);
  };

  const handleTitleSave = async () => {
    try {
      const success = await updateSite("title", formData.title);
      if (!success) {
        setTitleMessage({ type: "error", text: "Failed to save title" });
      }

      setIsEditingTitle(false);
      setTitleMessage({ type: "success", text: "Title saved successfully" });
    } catch (error) {
      setTitleMessage({ type: "error", text: "Failed to save title" });
    }
  };

  const handleDescriptionCancel = () => {
    setFormData({ ...formData, description: site.description });
    setIsEditingDescription(false);
    setDescriptionMessage(null);
  };

  const handleDescriptionSave = async () => {
    try {
      const success = await updateSite("description", formData.description);
      if (!success) {
        setTitleMessage({ type: "error", text: "Failed to save description" });
      }

      setIsEditingDescription(false);
      setDescriptionMessage({
        type: "success",
        text: "Description saved successfully",
      });
    } catch (error) {
      setDescriptionMessage({
        type: "error",
        text: "Failed to save description",
      });
    }
  };

  return (
    <div className="flex w-[80vw] flex-col gap-5 rounded-2xl border border-neutral-700 bg-neutral-900 p-5 lg:w-[50vw] lg:gap-10 lg:rounded-4xl lg:p-10">
      <h2 className="font-base text-xl lg:text-3xl">Site</h2>

      <div className="flex flex-col gap-3 lg:gap-6">
        <div className="flex flex-col gap-1 lg:gap-2">
          <label className="text-md lg:text-xl">Title</label>
          <p className="text-sm text-neutral-300 lg:text-lg">
            The title of the website, visible on the tab bar
          </p>
          <div className="mt-2 flex items-center gap-5">
            <input
              name="title"
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              disabled={!isEditingTitle}
              className="flex-1 rounded-md border border-neutral-600 bg-neutral-800 px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50 lg:rounded-lg lg:text-lg" // ADDED: disabled styles
            />
            <button
              type="button"
              onClick={() =>
                isEditingTitle ? handleTitleSave() : setIsEditingTitle(true)
              }
              className="rounded-md border border-neutral-600 bg-neutral-800 px-6 py-2 text-sm hover:bg-neutral-700 lg:text-base"
            >
              {isEditingTitle ? "Save" : "Edit"}
            </button>
            {isEditingTitle && (
              <button
                type="button"
                onClick={handleTitleCancel}
                className="rounded-md border border-neutral-600 bg-neutral-800 px-6 py-2 text-sm hover:bg-neutral-700 lg:text-base"
              >
                Cancel
              </button>
            )}
          </div>
          {titleMessage && (
            <p
              className={`mt-1 text-sm ${titleMessage.type === "success" ? "text-green-400" : "text-red-400"}`}
            >
              {titleMessage.text}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-1 lg:gap-2">
          <label className="text-md lg:text-xl">Description</label>
          <p className="text-sm text-neutral-300 lg:text-lg">
            Not visible on the website, but will appears on search engine
            results
          </p>
          <div className="mt-2 flex items-center gap-5">
            <input
              name="description"
              type="text"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              disabled={!isEditingDescription}
              className="flex-1 rounded-md border border-neutral-600 bg-neutral-800 px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50 lg:rounded-lg lg:text-lg" // ADDED: disabled styles
            />
            <button
              type="button"
              onClick={() =>
                isEditingDescription
                  ? handleDescriptionSave()
                  : setIsEditingDescription(true)
              }
              className="rounded-md border border-neutral-600 bg-neutral-800 px-6 py-2 text-sm hover:bg-neutral-700 lg:text-base"
            >
              {isEditingDescription ? "Save" : "Edit"}
            </button>
            {isEditingDescription && (
              <button
                type="button"
                onClick={handleDescriptionCancel}
                className="rounded-md border border-neutral-600 bg-neutral-800 px-6 py-2 text-sm hover:bg-neutral-700 lg:text-base"
              >
                Cancel
              </button>
            )}
          </div>
          {descriptionMessage && (
            <p
              className={`mt-1 text-sm ${descriptionMessage.type === "success" ? "text-green-400" : "text-red-400"}`}
            >
              {descriptionMessage.text}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-1 lg:gap-2">
          <label className="text-md lg:text-xl">Favicon</label>
          <p className="text-sm text-neutral-300 lg:text-lg">
            The icon of your website, visible on the tab bar
          </p>
        </div>

        <UploadFileForm />
      </div>
    </div>
  );
}
