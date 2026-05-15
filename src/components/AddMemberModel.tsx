import { useForm } from "react-hook-form";
import AddMemberIcon from "./icons/AddMember-icon";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useState } from "react";
import { useParams } from "next/navigation";
import { inviteMember } from "@/lib/projects";


const schema = z
  .object({

    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email")
  })

type FormData = z.infer<typeof schema>;

export default function AddMemberModel({
  
  onClose,
}: {

  onClose: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const [loading, setLoading] = useState(false);
  const [Error, setError] = useState("");

const params = useParams();
const projectId = Array.isArray(params.projectId)
    ? params.projectId[0]
    : params.projectId;

const onSubmit = async (data: FormData) => {
  try {
    setLoading(true);
    setError("");

    await inviteMember(
      data.email,
      projectId as string,
      window.location.origin, // p_app_url
    "https://lwsctewpcxlvwjixzdky.supabase.co"
    );

    alert("Invitation sent successfully ✅");
    onClose();

  } catch (err: any) {
    setError(err.message || "Something went wrong");
  } finally {
    setLoading(false);
  }
};

  return (
   <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      
      <div className="bg-white w-[400px] rounded-2xl shadow-xl p-6 relative">

<div className="flex justify-between items-center mb-5 ">
  <div className="p-3 bg-surface-low rounded-lg">
            <AddMemberIcon />
          </div>
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500"
        >
          ✕
        </button>

</div>
        {/* Header */}
        
          

          <div>
            <h3 className="font-bold text-xl mb-3">Invite Team Member</h3>
            <p className="text-gray-400 text-sm mb-5">
              Send an invitation to join the workspace
            </p>
          </div>
      

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          <div>
            <label className="text-sm font-bold">Email</label>
            <input
              {...register("email")}
              className="w-full mt-1 p-2 rounded-sm bg-surface-highest"
              placeholder="name@company.com"
            />
            {errors.email && (
              <p className="text-red-500 text-xs">
                {errors.email.message}
              </p>
            )}
          </div>
            {Error && (
    <p className="text-red-500 text-sm">{Error}</p>
  )}

          <div className="flex justify-between items-center  ">
  <button
            type="button"
            className="  py-2 rounded-md"
          >
          cancel
          </button>
          <button
  type="submit"
  disabled={loading}
  className="bg-[linear-gradient(95.71deg,var(--color-primary)_0%,var(--color-primary-container)_100%)] px-6 text-white py-2 disabled:opacity-50"
>
  {loading ? "Sending..." : "Send Invite"}
</button>
          </div>

        </form>
      </div>
    </div>
  );
}