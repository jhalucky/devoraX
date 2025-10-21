"use client";

import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex items-center justify-center mt-40">
    <SignIn
      path="/sign-in"       // your route
      routing="path"        // important! tells Clerk to stay in your domain
      signUpUrl="/sign-up"  // link to sign-up page
    />
    </div>
  );
}
