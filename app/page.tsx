'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
// import { useUser } from '@stackframe/stack';
import { 
  CheckCircle, 
  Filter, 
  Palette,
  ArrowRight,
  Sparkles,
  Moon,
  Sun,
  Clock,
  AlertTriangle,
  Tag,
  Calendar,
  Eye
} from 'lucide-react';

export default function LandingPage() {
  const [darkMode, setDarkMode] = useState(false);

  // Load theme preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme) {
      setDarkMode(JSON.parse(savedTheme));
    }
  }, []);

  // Save theme preference
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const playSound = (type: string) => {
    try {
      const audio = new Audio(`/sounds/${type}.mp3`);
      audio.volume = 0.3;
      audio.play().catch(() => console.log(`Playing ${type} sound`));
    } catch {
      console.log(`Playing ${type} sound`);
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      darkMode 
        ? 'bg-gradient-to-br from-slate-900 via-teal-900 to-slate-900' 
        : 'bg-gradient-to-br from-teal-800 via-teal-700 to-teal-900'
    }`}>
      {/* Header */}
     <nav className="relative z-10 p-6">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center overflow-hidden">
                  <Image
                    src="/logo.png"
                    alt="Medilios"
                    width={60}
                    height={60}
                    className="w-8 h-8 object-contain"
                    priority
                  />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
                    Medilios
                  </h1>
                  <p className="text-white/70 text-sm">by Sam Crowe</p>
                </div>
              </div>

          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={() => {
                playSound('click');
                setDarkMode(!darkMode);
              }}
              className={`p-3 rounded-full backdrop-blur-md transition-all duration-300 hover:scale-110 shadow-lg ${
                darkMode 
                  ? 'bg-white/10 text-white hover:bg-white/20' 
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <Link 
              href="/sign-in"
              className={`px-4 py-2 rounded-full backdrop-blur-md transition-all duration-300 hover:scale-105 ${
                darkMode
                  ? 'bg-white/10 text-white hover:bg-white/20'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
              onClick={() => playSound('click')}
            >
              Sign In
            </Link>

            <Link 
              href="/sign-up"
              className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full 
                         hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-orange-500/25 
                         flex items-center gap-2 font-medium"
              onClick={() => playSound('click')}
            >
              Get Started
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32">
        <div className="text-center">
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-8 leading-tight">
            Beautiful Task
            <span className="block bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
              Management
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed">
            Organize your life with stunning glassmorphism task cards, priority filtering, 
            and a clean interface that actually helps you get things done.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/sign-up"
              className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full 
                         hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-orange-500/25 
                         flex items-center gap-3 font-semibold text-lg"
              onClick={() => playSound('click')}
            >
              Start Free Today
              <ArrowRight size={20} />
            </Link>
            
            <Link 
              href="/dashboard" 
              className={`px-8 py-4 rounded-full backdrop-blur-md transition-all duration-300 hover:scale-105 
                         border font-semibold text-lg ${
                darkMode
                  ? 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                  : 'bg-white/20 border-white/30 text-white hover:bg-white/30'
              }`}
              onClick={() => playSound('click')}
            >
              Try Demo
            </Link>
          </div>
        </div>

        {/* Feature Preview Cards */}
        <div className="grid md:grid-cols-3 gap-8 mt-24">
          {[
            {
              icon: CheckCircle,
              title: "Smart Task Organization",
              description: "Create, edit, and organize tasks with priority levels, due dates, and custom categories"
            },
            {
              icon: Filter,
              title: "Interactive Filtering",
              description: "Click your stats cards to filter by completed, in-progress, or high-priority tasks instantly"
            },
            {
              icon: Palette,
              title: "Glassmorphism Design",
              description: "Beautiful, modern interface with smooth transitions and a responsive design that works everywhere"
            }
          ].map((feature, index) => (
            <div
              key={index}
              className={`p-8 rounded-2xl backdrop-blur-md border transition-all duration-500 hover:scale-105 ${
                darkMode 
                  ? 'bg-white/10 border-white/20 hover:bg-white/15' 
                  : 'bg-white/20 border-white/30 hover:bg-white/30'
              }`}
              style={{
                background: darkMode 
                  ? 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(20,184,166,0.15) 50%, rgba(255,255,255,0.08) 100%)'
                  : 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(20,184,166,0.2) 50%, rgba(255,255,255,0.25) 100%)'
              }}
            >
              <feature.icon className="w-12 h-12 text-orange-400 mb-6" />
              <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
              <p className="text-white/70 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            What Medilios actually
            <span className="block bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
              does for you
            </span>
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            No AI hype, no blockchain nonsense. Just solid task management 
            features that work beautifully.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: <CheckCircle className="w-8 h-8" />, title: "Task Creation & Editing", description: "Rich forms with validation" },
            { icon: <AlertTriangle className="w-8 h-8" />, title: "Priority Levels", description: "High, medium, low organization" },
            { icon: <Filter className="w-8 h-8" />, title: "Smart Filtering", description: "Click stats to filter tasks" },
            { icon: <Calendar className="w-8 h-8" />, title: "Due Date Tracking", description: "Never miss a deadline" },
            { icon: <Tag className="w-8 h-8" />, title: "Category & Tags", description: "Organize your way" },
            { icon: <Moon className="w-8 h-8" />, title: "Dark/Light Modes", description: "Easy on the eyes" },
            { icon: <Clock className="w-8 h-8" />, title: "Real-time Stats", description: "Live task counters" },
            { icon: <Sparkles className="w-8 h-8" />, title: "Beautiful UI", description: "Glassmorphism design" }
          ].map((feature, index) => (
            <div
              key={index}
              className={`p-6 rounded-xl backdrop-blur-md border transition-all duration-300 hover:scale-105 ${
                darkMode 
                  ? 'bg-white/5 border-white/10 hover:bg-white/10' 
                  : 'bg-white/15 border-white/20 hover:bg-white/25'
              }`}
            >
              <div className="text-orange-400 mb-3">{feature.icon}</div>
              <h4 className="font-semibold text-white mb-2">{feature.title}</h4>
              <p className="text-sm text-white/60">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-24 text-center">
        <div className={`p-12 rounded-3xl backdrop-blur-md border ${
          darkMode 
            ? 'bg-white/10 border-white/20' 
            : 'bg-white/20 border-white/30'
        }`}>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to organize your
            <span className="block bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
              life beautifully?
            </span>
          </h2>
          <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
            Join the users who have discovered that sometimes the best productivity tool 
            is just a really well-designed task manager.
          </p>
          <Link 
            href="/sign-up"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 
                       text-white rounded-full hover:scale-105 transition-all duration-300 shadow-xl 
                       hover:shadow-orange-500/25 font-semibold text-lg"
            onClick={() => playSound('click')}
          >
            Get Started Free
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>

      {/* Ominous Feature Section */}
      <div className="relative z-10 py-20 bg-gradient-to-b from-transparent to-black/50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Eye className="w-6 h-6 text-red-400 animate-pulse" />
              <h3 className="text-2xl font-bold text-red-400">
                🔮 Advanced Feature (Beta)
              </h3>
              <Eye className="w-6 h-6 text-red-400 animate-pulse" />
            </div>
            <p className="text-gray-300 text-lg mb-2">
              Our AI now monitors your task completion patterns and judges your life choices.
            </p>
            <p className="text-gray-400 text-base mb-4">
              Based on your procrastination habits, Medilios can predict your future with 87% accuracy.
            </p>
            <p className="text-red-400 text-sm font-semibold">
              * Feature may result in existential dread. Use responsibly.
            </p>
          </div>
          
          <div className={`p-6 rounded-xl backdrop-blur-md border mx-auto max-w-2xl ${
            darkMode 
              ? 'bg-red-950/20 border-red-500/30' 
              : 'bg-red-900/20 border-red-400/30'
          }`}>
            <p className="text-gray-300 text-sm italic">
              &ldquo;I started using Medilios to organize my tasks. Now it knows I haven&rsquo;t 
              called my mom in three weeks and keeps creating tasks that just say 
              &lsquo;CALL MOM&rsquo; in increasingly aggressive fonts.&rdquo;
            </p>
            <p className="text-gray-500 text-xs mt-2">— Anonymous Beta Tester</p>
          </div>
          
          <div className="text-xs text-gray-600 mt-6 max-w-lg mx-auto">
            Side effects may include: increased productivity, sudden urge to organize everything, 
            the unsettling feeling that your tasks are watching you back, and an inexplicable 
            desire to complete that project from 2019.
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 mt-24">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
                Medilios
              </span>
            </div>
            <p className="text-white/60 mb-4">
              Beautiful task management that actually works
            </p>
            <p className="text-white/40 text-sm">
              © 2025 The Creative Crowe, LLC. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}