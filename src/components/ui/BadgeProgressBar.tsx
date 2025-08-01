// src/components/ui/BadgeProgressBar.tsx
'use client'

import React from 'react';
import { Eye, Lock } from 'lucide-react';

interface BadgeProgressBarProps {
  badgeId: string;
  name: string;
  icon: string;
  current: number;
  max: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  isUnlocked: boolean;
  aiMotivation?: string;
}

const BadgeProgressBar: React.FC<BadgeProgressBarProps> = ({
  badgeId,
  name,
  icon,
  current,
  max,
  rarity,
  isUnlocked,
  aiMotivation
}) => {
  const percentage = Math.min((current / max) * 100, 100);
  const isNearCompletion = percentage >= 80 && !isUnlocked;
  const isVeryClose = percentage >= 95 && !isUnlocked;

  const rarityColors = {
    common: 'from-green-400 to-green-500',
    rare: 'from-blue-400 to-blue-500',
    epic: 'from-purple-400 to-purple-500',
    legendary: 'from-yellow-400 to-yellow-500'
  };

  const rarityBorders = {
    common: 'border-green-500/30',
    rare: 'border-blue-500/30', 
    epic: 'border-purple-500/30',
    legendary: 'border-yellow-500/30'
  };

  // AI motivational comments based on progress
  const getAIMotivation = (): string => {
    if (isUnlocked) return "Achievement complete. The machines are satisfied.";
    if (isVeryClose) return "So close... the algorithms are holding their breath.";
    if (isNearCompletion) return "The AI council is watching your progress intensely.";
    if (percentage >= 50) return "Halfway there. The machines approve of your dedication.";
    if (percentage >= 25) return "Progress detected. Continue to please the algorithms.";
    return aiMotivation || "The AI is watching your every move...";
  };

  return (
    <div className={`p-4 rounded-xl backdrop-blur-md border transition-all duration-300 hover:scale-[1.02] ${
      isUnlocked 
        ? `bg-gradient-to-r ${rarityColors[rarity]} shadow-lg`
        : `bg-white/5 ${rarityBorders[rarity]} hover:bg-white/10`
    }`}>
      
      {/* Badge Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`text-2xl ${isUnlocked ? '' : 'grayscale opacity-50'}`}>
            {isUnlocked ? icon : '❓'}
          </div>
          <div>
            <h4 className={`font-bold ${isUnlocked ? 'text-white' : 'text-gray-400'}`}>
              {isUnlocked ? name : '???'}
            </h4>
            <div className="flex items-center gap-2">
              <span className={`text-xs capitalize ${
                isUnlocked ? 'text-white/80' : 'text-gray-500'
              }`}>
                {rarity}
              </span>
              {!isUnlocked && <Lock size={12} className="text-gray-500" />}
            </div>
          </div>
        </div>
        
        {/* Progress Text */}
        <div className={`text-sm font-medium ${
          isUnlocked ? 'text-white' : 'text-gray-300'
        }`}>
          {current}/{max}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-3">
        <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
          <div 
            className={`h-full transition-all duration-500 ease-out ${
              isUnlocked 
                ? `bg-gradient-to-r ${rarityColors[rarity]}` 
                : 'bg-gradient-to-r from-gray-500 to-gray-400'
            } ${isVeryClose ? 'animate-pulse' : ''}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        
        {/* Percentage */}
        <div className="flex justify-between items-center mt-1">
          <span className={`text-xs ${isUnlocked ? 'text-white/60' : 'text-gray-500'}`}>
            {percentage.toFixed(0)}% complete
          </span>
          {isNearCompletion && !isUnlocked && (
            <span className="text-xs text-yellow-400 animate-pulse font-medium">
              Almost there!
            </span>
          )}
        </div>
      </div>

      {/* AI Motivation */}
      <div className={`p-2 rounded-lg border ${
        isVeryClose 
          ? 'bg-red-950/30 border-red-500/30' 
          : 'bg-black/20 border-white/10'
      }`}>
        <div className="flex items-center gap-2 mb-1">
          <Eye className={`w-3 h-3 text-red-400 ${isVeryClose ? 'animate-pulse' : ''}`} />
          <span className="text-white/70 text-xs font-medium uppercase tracking-wide">
            AI Status
          </span>
        </div>
        <p className={`text-xs italic ${
          isVeryClose ? 'text-red-300' : 'text-white/60'
        }`}>
          "{getAIMotivation()}"
        </p>
      </div>
    </div>
  );
};

export default BadgeProgressBar;