"use client";
import Form from "next/form";
import { useState } from "react";
import { updateSite } from "@/app/admin/actions";

interface Site {
  id: number;
  title: string;
  description: string;
  favicon: string;
}

interface SiteFormProps {
  site: Site;
}

function handleSubmit() {
  return;
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

      <Form action={handleSubmit} className="flex flex-col gap-3 lg:gap-6">
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
          <input
            name="favicon"
            type="text"
            value={formData.favicon}
            onChange={(e) =>
              setFormData({ ...formData, favicon: e.target.value })
            }
            className="mt-2 rounded-md border border-neutral-600 bg-neutral-800 px-3 py-2 text-sm lg:rounded-lg lg:text-lg"
          />
        </div>

        <button
          type="submit"
          className="text-md mt-5 self-center rounded-xl border border-neutral-600 bg-neutral-800 px-3 py-2 hover:cursor-pointer hover:border-neutral-500 hover:bg-neutral-700 hover:text-neutral-300 lg:text-xl"
        >
          Save
        </button>
      </Form>
    </div>
  );
}
