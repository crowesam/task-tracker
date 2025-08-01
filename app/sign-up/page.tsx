'use client'

import { SignUp } from '@stackframe/stack';

export default function SignUpPage() {
  return (
  <>
    <div className="min-h-screen bg-gradient-to-br from-teal-800 via-teal-700 to-teal-900 flex items-center justify-center p-6">
      <div className="w-full max-w-md p-8 rounded-2xl backdrop-blur-md border border-white/20 bg-white/10">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent mb-2">
            Join Medilios
          </h1>
          <p className="text-white/70">Create your account to get started</p>
        </div>
        <SignUp /><br/>

        <div className="text-center mt-6">
          <p className="text-white/70">
            Already have an account?{' '}
            <a href="/sign-in" className="text-orange-400 hover:underline">
              Sign in
            </a>
          </p>
        </div>
        
        <div className="text-center mt-4">
          <p className="text-white/50 text-xs">
            By signing in, you agree to our{' '}
            <a href="/terms-of-service" className="text-orange-400 hover:underline">
              Terms of Service
            </a>{' '}
            and{' '}
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
