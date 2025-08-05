'use client'

import { SignIn } from '@stackframe/stack';

export default function SignInPage() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-teal-800 via-teal-700 to-teal-800 flex items-center justify-center p-4">
        <div className="w-full max-w-md p-8 rounded-2xl backdrop-blur-md border border-white/10 bg-white/10">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
              Welcome Back
            </h1>
            <p className="text-white/70">Sign in to your account</p>
          </div>
                     
          {/* Stack Auth Sign In component with only email/OTP */}
          <SignIn />
                             
          <div className="text-center mt-6">
            <p className="text-white/50 text-xs">
              By signing in, you agree to our{' '}
              <a href="/terms-of-service" className="text-orange-400 hover:underline">
                Terms of Service
              </a>
              {' '}and{' '}
              <a href="/privacy-policy" className="text-orange-400 hover:underline">
                Privacy Policy
              </a>.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}