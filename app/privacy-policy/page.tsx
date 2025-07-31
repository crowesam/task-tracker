// app/privacy-policy/page.tsx
import React from 'react';
import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-green-400 via-teal-500 to-purple-600">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-4xl font-bold text-white">Privacy Policy</h1>
            <Link 
              href="/"
              className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
            >
              ← Back to App
            </Link>
          </div>
          <p className="text-white/80 text-lg">
            Effective Date: January 30, 2025 | Last Updated: January 30, 2025
          </p>
        </div>

        {/* Content */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8">
          <div className="prose prose-invert max-w-none">
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Overview</h2>
              <p className="text-white/90 leading-relaxed">
                Medilios (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) operates the Task Tracker application (the &ldquo;Service&rdquo;). 
                This privacy policy explains how we collect, use, and protect your information when you use our Service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Information We Collect</h2>
              
              <h3 className="text-xl font-semibold text-white mb-3">Personal Information</h3>
              <p className="text-white/90 mb-4">When you create an account, we collect:</p>
              <ul className="text-white/90 list-disc list-inside mb-4 space-y-1">
                <li><strong>Email address</strong> (for authentication and account management)</li>
                <li><strong>Name</strong> (from your Google or GitHub profile)</li>
                <li><strong>Profile picture</strong> (optional, from your social login provider)</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3">Task Data</h3>
              <p className="text-white/90 mb-4">We collect and store the information you create within the app:</p>
              <ul className="text-white/90 list-disc list-inside mb-4 space-y-1">
                <li>Task titles and descriptions</li>
                <li>Task categories and priorities</li>
                <li>Tags and due dates</li>
                <li>Completion status</li>
                <li>Creation and modification timestamps</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">How We Use Your Information</h2>
              <p className="text-white/90 mb-4">We use your information to:</p>
              <ul className="text-white/90 list-disc list-inside space-y-1">
                <li><strong>Provide the Service</strong> - Enable task management functionality</li>
                <li><strong>Authenticate your account</strong> - Secure login via Google or GitHub</li>
                <li><strong>Sync your data</strong> - Keep your tasks accessible across devices</li>
                <li><strong>Improve the Service</strong> - Analyze usage patterns to enhance features</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Data Storage and Security</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">Storage</h3>
                  <ul className="text-white/90 list-disc list-inside space-y-1">
                    <li>Your data is stored securely on cloud servers</li>
                    <li>Task data is private to your account</li>
                    <li>Industry-standard security measures</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">Security</h3>
                  <ul className="text-white/90 list-disc list-inside space-y-1">
                    <li>Data encrypted in transit and at rest</li>
                    <li>Secure OAuth login</li>
                    <li>Strict access controls</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Third-Party Services</h2>
              <p className="text-white/90 mb-4">We use the following third-party services:</p>
              <ul className="text-white/90 list-disc list-inside space-y-1">
                <li><strong>Google OAuth</strong> - For Google account authentication</li>
                <li><strong>GitHub OAuth</strong> - For GitHub account authentication</li>
                <li><strong>Vercel</strong> - For hosting and deployment</li>
                <li><strong>Stack Auth</strong> - For authentication management</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Data Sharing</h2>
              <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 mb-4">
                <p className="text-white font-semibold">
                  We <strong>do not sell, trade, or rent</strong> your personal information to third parties.
                </p>
              </div>
              <p className="text-white/90">
                We may share your information only when required by law or with your explicit consent.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Your Rights</h2>
              <p className="text-white/90 mb-4">You have the right to:</p>
              <ul className="text-white/90 list-disc list-inside space-y-1">
                <li>Access your personal information</li>
                <li>Update your account details</li>
                <li>Delete your account and associated data</li>
                <li>Export your task data</li>
              </ul>
              
              <div className="mt-4 bg-blue-500/20 border border-blue-500/30 rounded-lg p-4">
                <h4 className="text-white font-semibold mb-2">Data Deletion</h4>
                <p className="text-white/90 text-sm">
                  To delete your account: Contact us at crowesam@gmail.com. 
                  We will permanently delete your data within 30 days.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Contact Information</h2>
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <p className="text-white/90 mb-2">
                  If you have questions about this privacy policy, please contact us:
                </p>
                <ul className="text-white/90 space-y-1">
                  <li><strong>Email:</strong> crowesam@gmail.com</li>
                  <li><strong>Website:</strong> https://medilios.com</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Updates to This Policy</h2>
              <p className="text-white/90">
                We may update this privacy policy from time to time. When we do, we will post 
                the updated policy on this page and update the &ldquo;Last Updated&rdquo; date.
              </p>
            </section>

          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors font-semibold"
          >
            ← Return to Task Tracker
          </Link>
        </div>
      </div>
    </div>
  );
}
