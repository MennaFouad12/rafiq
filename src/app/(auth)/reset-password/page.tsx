// "use client";

import ResetPassowrdForm from "./_components/Reset-pass-form";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { resetPass } from "@/lib/auth";
// import Check from "@/components/Check";


// export default function ResetPasswordPage() {
//   const router = useRouter();

//   const [accessToken, setAccessToken] = useState<string | null>(null);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [loading, setLoading] = useState(false);

//   const [password, setPassword] = useState("");
//   const [confirm, setConfirm] = useState("");


//   useEffect(() => {
//     const hash = window.location.hash;

//     if (!hash) {
//       setError("Invalid or expired reset link.");
//       return;
//     }

//     const params = new URLSearchParams(hash.replace("#", ""));
//     const token = params.get("access_token");
//     const type = params.get("type");

//     if (type === "recovery" && token) {
//       setAccessToken(token);
//     } else {
//       setError("Invalid or expired reset link.");
//     }
//   }, []);

//   // 🔥 validation
//   const checks = {
//     length: password.length >= 8,
//     lowercase: /[a-z]/.test(password),
//     uppercase: /[A-Z]/.test(password),
//     number: /\d/.test(password),
//     special: /[^\w\s]/.test(password),
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!accessToken) return;

//     if (password !== confirm) {
//       return setError("Passwords do not match");
//     }

//     setLoading(true);
//     setError("");
//     setSuccess("");

//     try {
//       await resetPass(password, accessToken);

//       setSuccess("Password updated successfully ");

//       setTimeout(() => {
//         router.push("/login");
//       }, 2000);

//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#F5F7FB]">
//       <div className="w-[400px] bg-white p-6 rounded-xl shadow-md">

//         {!accessToken ? (
//           <p className="text-red-500 text-center">{error}</p>
//         ) : (
//           <>
//             <h2 className="text-xl font-semibold text-center mb-2">
//               Create a New Password
//             </h2>

//             <p className="text-sm text-gray-500 text-center mb-6">
//               Create a new, strong password to secure your workspace access.
//             </p>

//             <form onSubmit={handleSubmit} className="space-y-4">

//               {/* Password */}
//               <div>
//                 <label className= " text-neutral text-sm font-bold ">
//                   NEW PASSWORD
//                 </label>
//                 <input
//                   type="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                     className="w-full mt-1 p-2 rounded-sm focus:outline-none bg-surface-low"
//                 />
//               </div>

//               {/* Confirm */}
//               <div>
//                 <label className= " text-neutral text-sm font-bold ">
//                   CONFIRM PASSWORD
//                 </label>
//                 <input
//                   type="password"
//                   value={confirm}
//                   onChange={(e) => setConfirm(e.target.value)}
//                     className="w-full mt-1 p-2 rounded-sm focus:outline-none bg-surface-low"
//                 />
//               </div>

//               {/* Requirements */}
//               <div className="bg-surface-low p-3 rounded text-sm">
//                 <p className= " text-neutral text-sm font-bold mb-5">
//                   SECURITY REQUIREMENTS
//                 </p>

//                 <div className="grid grid-cols-2 gap-2">
//                   <Check valid={checks.length} text="8–64 characters" />
//                   <Check valid={checks.uppercase} text="Uppercase letter" />
//                   <Check valid={checks.lowercase} text="Lowercase letter" />
//                   <Check valid={checks.number} text="One digit" />
//                   <Check valid={checks.special} text="Special character" />
//                 </div>
//               </div>

//               {/* Button */}
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full bg-[linear-gradient(95.71deg,var(--color-primary)_0%,var(--color-primary-container)_100%)] shadow-[0px_1px_2px_0px_#0000000D]  text-white py-2 rounded-md "
//               >
//                 {loading ? "Updating..." : "Update Password"}
//               </button>

//               {/* Messages */}
//               {error && <p className="text-red-500 text-sm">{error}</p>}
//               {success && <p className="text-green-500 text-sm">{success}</p>}
//             </form>

//             <p
//               onClick={() => router.push("/login")}
//               className="text-center text-sm mt-4 text-primary cursor-pointer"
//             >
//               Back to sign in
//             </p>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }



export default function page() {
  return <ResetPassowrdForm />;
}

