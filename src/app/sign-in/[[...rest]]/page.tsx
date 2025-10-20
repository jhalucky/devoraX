// app/sign-in/[[...rest]]/page.tsx
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return <SignIn routing="path" path="/sign-in" />;
}
