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
      const success = await updateSite(name, value);
      if (!success) {
        setMessage({ type: "error", text: `Failed to save ${name}` });
      }

      setIsEditing(false);
      setMessage({ type: "success", text: `${label} saved successfully` });
    } catch (error) {
      setMessage({ type: "error", text: `Failed to save ${name}` });
    }
  };

  const handleCancel = () => {
    setValue(initialValue);
    setIsEditing(false);
    setMessage(null);
  };

  return (
    <div className="flex flex-col gap-1 lg:gap-2">
      <label className="text-md lg:text-xl">{label}</label>
      <p className="text-sm text-neutral-300 lg:text-lg">{description}</p>
      <div className="mt-2 flex items-center gap-5">
        <input
          name={name}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={!isEditing}
          className="flex-1 rounded-md border border-neutral-600 bg-neutral-800 px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50 lg:rounded-lg lg:text-lg"
        />
        <button
          type="button"
          onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
          className="rounded-md border border-neutral-600 bg-neutral-800 px-6 py-2 text-sm hover:bg-neutral-700 lg:text-base"
        >
          {isEditing ? "Save" : "Edit"}
        </button>
        {isEditing && (
          <button
            type="button"
            onClick={handleCancel}
            className="rounded-md border border-neutral-600 bg-neutral-800 px-6 py-2 text-sm hover:bg-neutral-700 lg:text-base"
          >
            Cancel
          </button>
        )}
      </div>
      {message && (
        <p
          className={`mt-1 text-sm ${message.type === "success" ? "text-green-400" : "text-red-400"}`}
        >
          {message.text}
        </p>
      )}
    </div>
  );
}
