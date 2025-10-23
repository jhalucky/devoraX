"use client";

import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="scale-90 sm:scale-75 md:scale-80 lg:scale-90 transform">
        <SignUp
          path="/sign-up"
          routing="path"
          signInUrl="/sign-in"
          afterSignInUrl="/dashboard"
        />
      </div>
    </div>
  );
}
