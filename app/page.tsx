import Link from "next/link"

export default function Home() {
  return (
    <>
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="pt-6 pb-8">
          <nav className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">public/samc.png</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">TaskTracker</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                href="/login" 
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
              >
                Sign In
              </Link>
              <Link 
                href="/register" 
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-medium transition-all duration-200 shadow-sm hover:shadow-md"
              >
                Get Started
              </Link>
            </div>
          </nav>
        </div>

        {/* Hero Section */}
        <div className="text-center py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
              Organize Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mt-2">
                Tasks & Progress
              </span>
            </h1>
            <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              A beautiful, intuitive task tracker designed to help you stay organized, 
              boost productivity, and achieve your goals effortlessly.
            </p>
            
            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/register"
                className="group relative bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                <span className="relative z-10">Start Tracking Tasks</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              </Link>
              <Link
                href="/login"
                className="border-2 border-gray-200 text-gray-700 px-8 py-4 rounded-xl hover:border-blue-300 hover:text-blue-600 font-semibold text-lg transition-all duration-200 bg-white/50 backdrop-blur-sm"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-16">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Everything you need to stay productive</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Powerful features designed to help you manage tasks efficiently and track your progress with ease.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group">
              <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 h-full">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200">
                  <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Create & Organize!</h3>
                <p className="text-gray-600 leading-relaxed">
                  Easily create tasks with priorities, due dates, and detailed descriptions. 
                  Keep everything organized in your personal workspace.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group">
              <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-green-200 h-full">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200">
                  <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Track Progress</h3>
                <p className="text-gray-600 leading-relaxed">
                  Monitor your productivity with beautiful visual statistics. 
                  See completed tasks, pending items, and overall progress at a glance.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="group">
              <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-purple-200 h-full">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200">
                  <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Secure & Private</h3>
                <p className="text-gray-600 leading-relaxed">
                  Your tasks are completely private and secure. Each user has their own 
                  protected workspace with encrypted data storage.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-16">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl transform rotate-1"></div>
            <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl overflow-hidden">
              <div className="px-8 py-16 sm:px-16">
                <div className="max-w-2xl mx-auto text-center">
                  <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                    Ready to boost your productivity?
                  </h2>
                  <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                    Join thousands of users who have transformed their task management. 
                    Start organizing your life today It&apos;s completely free!

                 
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link
                      href="/register"
                      className="bg-white text-blue-600 px-8 py-4 rounded-xl hover:bg-gray-50 font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-1"
                    >
                      Get Started for Free
                    </Link>
                    <Link
                      href="/login"
                      className="border-2 border-white/30 text-white px-8 py-4 rounded-xl hover:border-white hover:bg-white/10 font-semibold text-lg transition-all duration-200"
                    >
                      Sign In
                    </Link>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-40 h-40 bg-white/5 rounded-full -translate-x-20 -translate-y-20"></div>
              <div className="absolute bottom-0 right-0 w-60 h-60 bg-white/5 rounded-full translate-x-20 translate-y-20"></div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="py-8 border-t border-gray-200 mt-16">
          <div className="text-center text-gray-500">
            <p>&copy; 2025 TaskTracker. Built by Sam Crowe with Next.js and love.</p>
          </div>
        </div>

      </div>
    </div>
    </>
  )
}