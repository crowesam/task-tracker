// lib/stack-auth.ts
import { StackServerApp } from "@stackframe/stack";

export const stackServerApp = new StackServerApp({
  tokenStore: "nextjs-cookie",
  urls: {
    home: "/dashboard",         // Changed from "/" to "/dashboard"
    signIn: "/sign-in",
    signUp: "/sign-up", 
    afterSignIn: "/dashboard",  // Redirect here after sign in
    afterSignUp: "/dashboard",  // Redirect here after sign up
    afterSignOut: "/",         // Back to landing page after sign out
  },
});