"use client";
import Form from "next/form";
import { useState } from "react";
import { updateSite, updateFavicon } from "@/app/admin/actions";
import Image from "next/image";
import FileUpload from "./FileUpload";
import EditableField from "./EditableField";

interface Site {
  title: string;
  description: string;
  favicon: string;
}

interface SiteFormProps {
  site: Site;
}

interface UploadFileFormProps {
  onCancel: () => void;
}

function UploadFileForm({ onCancel }: UploadFileFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [result, setResult] = useState<string>("");

  const handleCancelFile = () => {
    setFile(null);
    setResult("");
    onCancel();
  };

  async function handleSubmit(formData: FormData) {
    if (!file) {
      alert("Please select a file first");
      return;
    }

    setIsUploading(true);
    setResult("");

    formData.set("file", file);

    try {
      const result = await updateFavicon(formData);
      if (!result || !result.success) {
        setResult(
          result?.error || "An error occurred while uploading the file",
        );
        return;
      }
      setResult(`File uploaded successfully! URL: ${result.data}`);
    } catch (error) {
      setResult(
        `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <Form action={handleSubmit} className="flex flex-col gap-5">
      <div className="flex flex-col items-center gap-6 lg:flex-row">
        <FileUpload
          file={file}
          onFileSelect={setFile}
          allowedTypes={[".ico", ".svg", ".png", ".jpg", ".jpeg"]}
          maxSize={1024 * 1024}
        />
        <div className="flex w-full justify-center gap-3 sm:w-auto">
          <button
            type="submit"
            disabled={isUploading || !file}
            className="cursor-pointer rounded-xl border border-neutral-600 bg-neutral-800 px-5 py-2 text-sm font-medium transition hover:border-neutral-400 hover:bg-neutral-700 disabled:opacity-50 sm:text-base"
          >
            {isUploading ? "Uploading..." : "Save"}
          </button>
          <button
            type="button"
            onClick={handleCancelFile}
            disabled={isUploading}
            className="cursor-pointer rounded-xl border border-neutral-600 bg-neutral-800 px-5 py-2 text-sm font-medium transition hover:border-neutral-400 hover:bg-neutral-700 disabled:opacity-50 sm:text-base"
          >
            Cancel
          </button>
        </div>
      </div>
      <p
        className={`text-sm font-medium sm:text-base ${
          result.startsWith("File uploaded") ? "text-green-500" : "text-red-400"
        }`}
      >
        {result}
      </p>
    </Form>
  );
}

export default function SiteForm({ site }: SiteFormProps) {
  const [isEditingFavicon, setIsEditingFavicon] = useState(false);

  return (
    <div className="flex w-full max-w-3xl flex-col gap-6 rounded-2xl border border-neutral-800 bg-neutral-900/90 p-5 shadow-xl sm:gap-8 sm:rounded-3xl sm:p-8 lg:p-10">
      <h2 className="text-xl font-bold tracking-tight sm:text-2xl lg:text-3xl">
        Site
      </h2>

      <div className="flex flex-col gap-4 sm:gap-6">
        <EditableField
          name="title"
          label="Title"
          description="The title of the website, visible on the tab bar"
          initialValue={site.title}
        />
        <EditableField
          name="description"
          label="Description"
          description="Not visible on the website, but will appears on search engine results"
          initialValue={site.description}
        />
        <div className="flex flex-col gap-1.5 sm:gap-2">
          <label className="text-sm font-medium text-neutral-200 sm:text-base lg:text-lg">
            Favicon
          </label>
          <p className="text-xs text-neutral-400 sm:text-sm lg:text-base">
            The icon of your website, visible on the tab bar
          </p>
          {isEditingFavicon ? (
            <div className="pt-2">
              <UploadFileForm onCancel={() => setIsEditingFavicon(false)} />
            </div>
          ) : (
            <div className="flex flex-row items-center gap-6 pt-2">
              <div className="relative flex h-16 w-16 items-center justify-center rounded-lg border border-neutral-700 bg-neutral-950 p-2">
                <Image
                  src={site.favicon || "/favicon.ico"}
                  alt="Favicon"
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
              <button
                type="button"
                onClick={() => setIsEditingFavicon(true)}
                className="rounded-md border border-neutral-600 bg-neutral-800 px-5 py-2 text-xs font-medium transition hover:cursor-pointer hover:border-neutral-400 hover:bg-neutral-700 sm:text-sm lg:text-base"
              >
                Edit
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
