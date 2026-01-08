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
      const success = await updateFavicon(formData);
      if (!success) {
        setResult("An error occured while uploading the file");
      }
      setResult(`File uploaded successfully! URL: ${success.data}`);
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
      <div className="flex flex-col items-center gap-10 lg:flex-row">
        <FileUpload
          file={file}
          onFileSelect={setFile}
          allowedTypes={[".ico", ".svg", ".png", ".jpg", ".jpeg"]}
          maxSize={1024 * 1024}
        />
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={isUploading || !file}
            className="cursor-pointer rounded-xl border border-neutral-500 px-4 py-2 text-lg hover:bg-neutral-800 disabled:opacity-50"
          >
            {isUploading ? "Uploading..." : "Save"}
          </button>
          <button
            type="button"
            onClick={handleCancelFile}
            disabled={isUploading}
            className="cursor-pointer rounded-xl border border-neutral-500 px-4 py-2 text-lg hover:bg-neutral-800 disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      </div>
      <p className="font-base text-xl text-green-500">{result}</p>
    </Form>
  );
}

export default function SiteForm({ site }: SiteFormProps) {
  const [isEditingFavicon, setIsEditingFavicon] = useState(false);

  return (
    <div className="flex w-[80vw] flex-col gap-5 rounded-2xl border border-neutral-700 bg-neutral-900 p-5 lg:w-[50vw] lg:gap-10 lg:rounded-4xl lg:p-10">
      <h2 className="font-base text-xl lg:text-3xl">Site</h2>

      <div className="flex flex-col gap-3 lg:gap-6">
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
        <div className="flex flex-col gap-1 lg:gap-2">
          <label className="text-md lg:text-xl">Favicon</label>
          <p className="text-sm text-neutral-300 lg:text-lg">
            The icon of your website, visible on the tab bar
          </p>
          {isEditingFavicon ? (
            <UploadFileForm onCancel={() => setIsEditingFavicon(false)} />
          ) : (
            <div className="flex flex-row items-center gap-10">
              <Image
                src={site.favicon}
                alt="Favicon"
                width={100}
                height={100}
              />
              <button
                type="button"
                onClick={() => setIsEditingFavicon(true)}
                className="rounded-md border border-neutral-600 bg-neutral-800 px-6 py-2 text-sm hover:cursor-pointer hover:bg-neutral-700 lg:text-base"
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
