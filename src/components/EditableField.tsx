import { useState } from "react";
import { updateSite } from "@/app/admin/actions";

interface EditableFieldProps {
  name: string;
  label: string;
  description: string;
  initialValue: string;
}

export default function EditableField({
  name,
  label,
  description,
  initialValue,
}: EditableFieldProps) {
  const [value, setValue] = useState(initialValue);
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleSave = async () => {
    try {
      const result = await updateSite(name, value);
      if (!result?.success) {
        setMessage({
          type: "error",
          text: result?.error || `Failed to save ${label}`,
        });
        return;
      }

      setIsEditing(false);
      setMessage({ type: "success", text: `${label} saved successfully` });
    } catch (error) {
      setMessage({ type: "error", text: `Failed to save ${label}` });
    }
  };

  const handleCancel = () => {
    setValue(initialValue);
    setIsEditing(false);
    setMessage(null);
  };

  return (
    <div className="flex flex-col gap-1 sm:gap-1.5">
      <label className="text-sm font-medium text-neutral-200 sm:text-base lg:text-lg">
        {label}
      </label>
      <p className="text-xs text-neutral-400 sm:text-sm">{description}</p>
      <div className="mt-1.5 flex flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:gap-3">
        <input
          name={name}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={!isEditing}
          className="flex-1 rounded-md border border-neutral-700 bg-neutral-950/60 px-3 py-2 text-sm text-white transition-colors focus:border-neutral-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 sm:text-base"
        />
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
            className="flex-1 rounded-md border border-neutral-600 bg-neutral-800 px-5 py-2 text-xs font-medium transition hover:border-neutral-400 hover:bg-neutral-700 sm:flex-none sm:text-sm"
          >
            {isEditing ? "Save" : "Edit"}
          </button>
          {isEditing && (
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 rounded-md border border-neutral-600 bg-neutral-800 px-5 py-2 text-xs font-medium transition hover:border-neutral-400 hover:bg-neutral-700 sm:flex-none sm:text-sm"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
      {message && (
        <p
          className={`mt-1 text-xs sm:text-sm ${
            message.type === "success" ? "text-green-400" : "text-red-400"
          }`}
        >
          {message.text}
        </p>
      )}
    </div>
  );
}
