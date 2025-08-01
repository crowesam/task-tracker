// src/components/ui/BadgeAlert.tsx
'use client'

import React, { useState, useEffect } from 'react';
import { X, Eye } from 'lucide-react';
import { Achievement, BADGE_DEFINITIONS } from '@/src/types/badges';

interface BadgeAlertProps {
  achievement: Achievement;
  onClose: () => void;
  isVisible: boolean;
}

const BadgeAlert: React.FC<BadgeAlertProps> = ({ achievement, onClose, isVisible }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const badge = BADGE_DEFINITIONS[achievement.badgeId];

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true);
      // Auto-close after 8 seconds
      const timer = setTimeout(() => {
        onClose();
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible || !badge) return null;

  const rarityColors = {
    common: 'from-green-500 to-green-600',
    rare: 'from-blue-500 to-blue-600', 
    epic: 'from-purple-500 to-purple-600',
    legendary: 'from-yellow-500 to-yellow-600'
  };

  const rarityGlow = {
    common: 'shadow-green-500/25',
    rare: 'shadow-blue-500/25',
    epic: 'shadow-purple-500/25', 
    legendary: 'shadow-yellow-500/25'
  };

  return (
    <div className="fixed top-6 right-6 z-50 max-w-sm">
      <div 
        className={`transform transition-all duration-500 ${
          isAnimating 
            ? 'translate-x-0 opacity-100 scale-100' 
            : 'translate-x-full opacity-0 scale-95'
        }`}
      >
        <div 
          className={`p-6 rounded-2xl backdrop-blur-md border border-white/20 
                     bg-gradient-to-r ${rarityColors[badge.rarity]} 
                     shadow-2xl ${rarityGlow[badge.rarity]} hover:scale-105 transition-all duration-300`}
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="text-3xl animate-bounce">{badge.icon}</div>
              <div>
                <h3 className="text-white font-bold text-lg">{badge.name}</h3>
                <p className="text-white/80 text-sm capitalize">{badge.rarity} Badge</p>
              </div>
            </div>
            
           <button
            onClick={onClose}
            className="text-white/70 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
            title="Close"           // ✅ This is the accessibility fix
             aria-label="Close"      // ✅ Even better - this is what Copilot suggested
            >
            <X size={16} />
            </button>
          </div>

          {/* AI Comment */}
          <div className="mb-4 p-3 rounded-lg bg-black/20 border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <Eye className="w-4 h-4 text-red-400 animate-pulse" />
              <span className="text-white/90 text-xs font-medium uppercase tracking-wide">
                AI Observation
              </span>
            </div>
            <p className="text-white text-sm italic">
              &ldquo;{achievement.aiComment}&rdquo;
            </p>
          </div>

          {/* Special Message */}
          {achievement.specialMessage && (
            <div className="mb-4 p-3 rounded-lg bg-white/10 border border-white/20">
              <p className="text-white text-sm font-medium">
                {achievement.specialMessage}
              </p>
            </div>
          )}

          {/* Badge Description */}
          <p className="text-white/70 text-sm mb-4">{badge.description}</p>

          {/* Achievement Timestamp */}
          <div className="text-white/50 text-xs">
            Unlocked {achievement.unlockedAt.toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BadgeAlert;