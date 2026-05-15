import { Suspense } from "react";
import LoginForm from "./_components/Login-form";


export default function LoginPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <LoginForm />
    </Suspense>
  );
}