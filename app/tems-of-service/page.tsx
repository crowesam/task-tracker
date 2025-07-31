// app/terms-of-service/page.tsx
import React from 'react';
import Link from 'next/link';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-green-400 via-teal-500 to-purple-600">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-4xl font-bold text-white">Terms of Service</h1>
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
              <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
              <p className="text-white/90 leading-relaxed">
                By accessing or using the Medilios Task Tracker application ("Service"), you agree to be bound by these 
                Terms of Service ("Terms"). If you disagree with any part of these terms, you may not access the Service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">2. Description of Service</h2>
              <p className="text-white/90 mb-4">
                The Service is a web-based task management application that allows users to:
              </p>
              <ul className="text-white/90 list-disc list-inside space-y-1">
                <li>Create, organize, and manage personal tasks</li>
                <li>Set priorities, categories, and due dates</li>
                <li>Track task completion</li>
                <li>Access data across multiple devices</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">3. User Accounts and Registration</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Account Creation</h3>
                  <ul className="text-white/90 list-disc list-inside space-y-1">
                    <li>You must provide accurate and complete information</li>
                    <li>You are responsible for maintaining account security</li>
                    <li>One account per person is permitted</li>
                    <li>You must be at least 13 years old to use the Service</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Account Responsibility</h3>
                  <ul className="text-white/90 list-disc list-inside space-y-1">
                    <li>You are responsible for all activities under your account</li>
                    <li>Notify us immediately of any unauthorized use</li>
                    <li>We are not liable for losses due to unauthorized account access</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">4. Acceptable Use</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold text-green-400 mb-3">✅ You May</h3>
                  <ul className="text-white/90 list-disc list-inside space-y-1">
                    <li>Use the Service for personal task management</li>
                    <li>Share task lists with authorized collaborators</li>
                    <li>Export your own data</li>
                    <li>Provide feedback and suggestions</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-red-400 mb-3">❌ You May Not</h3>
                  <ul className="text-white/90 list-disc list-inside space-y-1">
                    <li>Use the Service for illegal activities</li>
                    <li>Attempt to hack or disrupt the Service</li>
                    <li>Share your account credentials</li>
                    <li>Upload malicious content or spam</li>
                    <li>Reverse engineer the Service</li>
                    <li>Use the Service to compete with us</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">5. User Content and Data</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Your Data Rights</h3>
                  <ul className="text-white/90 list-disc list-inside space-y-1">
                    <li>You retain ownership of your task data and content</li>
                    <li>We do not claim ownership of your personal information</li>
                    <li>You can export or delete your data at any time</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Content Standards</h3>
                  <p className="text-white/90 mb-2">Your content must not:</p>
                  <ul className="text-white/90 list-disc list-inside space-y-1">
                    <li>Violate any laws or regulations</li>
                    <li>Infringe on intellectual property rights</li>
                    <li>Contain harmful, offensive, or inappropriate material</li>
                    <li>Include personal information of others without consent</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">6. Service Availability and Modifications</h2>
              <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-4 mb-4">
                <h3 className="text-white font-semibold mb-2">⚠️ Important Service Terms</h3>
                <ul className="text-white/90 text-sm space-y-1">
                  <li>• Service is provided "as is" without guarantees of uptime</li>
                  <li>• We may modify, suspend, or discontinue features at any time</li>
                  <li>• Scheduled maintenance may cause temporary downtime</li>
                  <li>• We will provide reasonable notice for major changes</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">7. Intellectual Property</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Our Rights</h3>
                  <ul className="text-white/90 list-disc list-inside space-y-1">
                    <li>The Service, including software, design, and trademarks, belongs to Medilios</li>
                    <li>Users may not copy, modify, or redistribute our intellectual property</li>
                    <li>All Service improvements and features remain our property</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">License to You</h3>
                  <p className="text-white/90">
                    We grant you a limited, non-exclusive, non-transferable license to use the Service 
                    for personal task management purposes only.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">8. Limitation of Liability</h2>
              <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4">
                <h3 className="text-white font-semibold mb-2">🛡️ Liability Limitations</h3>
                <div className="text-white/90 text-sm space-y-2">
                  <p><strong>TO THE MAXIMUM EXTENT PERMITTED BY LAW:</strong></p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>The Service is provided "AS IS" without warranties of any kind</li>
                    <li>We are not liable for any indirect, incidental, or consequential damages</li>
                    <li>Our total liability shall not exceed $100 or the amount you paid us (if any)</li>
                    <li>We are not responsible for data loss, though we use reasonable backup measures</li>
                    <li>You use the Service at your own risk</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">9. Indemnification</h2>
              <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4">
                <p className="text-white/90 text-sm">
                  You agree to indemnify and hold Medilios harmless from any claims, damages, or expenses 
                  arising from your use of the Service, violation of these Terms, or infringement of any rights.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">10. Termination</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">By You</h3>
                  <ul className="text-white/90 list-disc list-inside space-y-1">
                    <li>You may terminate your account at any time</li>
                    <li>Contact us to request account deletion</li>
                    <li>Data will be deleted within 30 days</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">By Us</h3>
                  <ul className="text-white/90 list-disc list-inside space-y-1">
                    <li>We may terminate accounts for Terms violations</li>
                    <li>We may suspend accounts during investigations</li>
                    <li>We'll provide reasonable notice when possible</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">11. Dispute Resolution</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Governing Law</h3>
                  <p className="text-white/90">
                    These Terms are governed by the laws of [Your State/Country], without regard to conflict of law principles.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Dispute Process</h3>
                  <ol className="text-white/90 list-decimal list-inside space-y-1">
                    <li>Contact us first to resolve disputes informally</li>
                    <li>If unresolved, disputes will be handled through binding arbitration</li>
                    <li>Class action lawsuits are waived</li>
                    <li>Any legal proceedings must be filed within one year</li>
                  </ol>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">12. Changes to Terms</h2>
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <ul className="text-white/90 space-y-2">
                  <li>• We may update these Terms at any time</li>
                  <li>• Significant changes will be communicated via email or Service notification</li>
                  <li>• Continued use after changes constitutes acceptance</li>
                  <li>• If you disagree with changes, you must stop using the Service</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">13. Miscellaneous</h2>
              <div className="grid md:grid-cols-2 gap-6 text-sm">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Severability</h3>
                  <p className="text-white/90">
                    If any provision is found unenforceable, the remaining terms remain in effect.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Entire Agreement</h3>
                  <p className="text-white/90">
                    These Terms constitute the entire agreement between you and Medilios.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Assignment</h3>
                  <p className="text-white/90">
                    We may assign these Terms; you may not assign without our consent.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Waiver</h3>
                  <p className="text-white/90">
                    Our failure to enforce any right does not waive that right.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">14. Contact Information</h2>
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <p className="text-white/90 mb-2">
                  Questions about these Terms? Contact us:
                </p>
                <ul className="text-white/90 space-y-1">
                  <li><strong>Email:</strong> crowesam@gmail.com</li>
                  <li><strong>Website:</strong> https://medilios.com</li>
                  <li><strong>Service:</strong> Task Tracker Application</li>
                </ul>
              </div>
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