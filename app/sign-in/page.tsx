'use client'

import { SignIn } from '@stackframe/stack';

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-800 via-teal-700 to-teal-900 flex items-center justify-center p-6">
      <div className="w-full max-w-md p-8 rounded-2xl backdrop-blur-md border border-white/20 bg-white/10">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent mb-2">
            Welcome Back
          </h1>
          <p className="text-white/70">Sign in to your account</p>
        </div>
        <SignIn />
      </div>
    </div>
  );
}