// src/components/ui/BadgeProgressWidget.tsx
'use client'

import React from 'react';
import { Trophy, Eye, ArrowRight } from 'lucide-react';
import { Badge } from '@/src/types/badges';

interface BadgeProgressWidgetProps {
  badges: Badge[];
  getBadgeProgress: (badgeId: string) => { current: number, max: number };
  onOpenTrophyCase: () => void;
}

const BadgeProgressWidget: React.FC<BadgeProgressWidgetProps> = ({
  badges,
  getBadgeProgress,
  onOpenTrophyCase
}) => {
  // Get the most relevant badges to show progress for
  const relevantBadges = [
    { id: 'taskMaster', name: 'Task Master', icon: '👑', rarity: 'epic' as const },
    { id: 'speedDemon', name: 'Speed Demon', icon: '⚡', rarity: 'rare' as const },
    { id: 'priorityHunter', name: 'Priority Hunter', icon: '🎯', rarity: 'rare' as const },
  ];

  const unlockedCount = badges.filter(b => b.unlockedAt).length;
  const totalBadges = Object.keys(badges).length || 12; // Fallback to total possible badges

  return (
    <div className="p-6 rounded-2xl backdrop-blur-md bg-white/10 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 flex items-center justify-center">
            <Trophy className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Badge Progress</h3>
            <p className="text-white/70 text-sm">{unlockedCount} badges unlocked</p>
          </div>
        </div>
        
        <button
          onClick={onOpenTrophyCase}
          className="text-white/70 hover:text-white transition-colors flex items-center gap-1 text-sm"
        >
          View All
          <ArrowRight size={14} />
        </button>
      </div>

      {/* AI Surveillance Header */}
      <div className="mb-4 p-3 rounded-lg bg-red-950/20 border border-red-500/20">
        <div className="flex items-center gap-2">
          <Eye className="w-4 h-4 text-red-400 animate-pulse" />
          <span className="text-red-400 text-xs font-medium uppercase tracking-wide">
            Performance Monitoring Active
          </span>
        </div>
      </div>

      {/* Progress Bars for Key Badges */}
      <div className="space-y-4">
        {relevantBadges.map((badgeInfo) => {
          const progress = getBadgeProgress(badgeInfo.id);
          const percentage = Math.min((progress.current / progress.max) * 100, 100);
          const isUnlocked = badges.some(b => b.id === badgeInfo.id && b.unlockedAt);
          const isClose = percentage >= 80 && !isUnlocked;

          return (
            <div key={badgeInfo.id} className="space-y-2">
              {/* Badge Info */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`text-lg ${isUnlocked ? '' : 'grayscale opacity-50'}`}>
                    {isUnlocked ? badgeInfo.icon : '❓'}
                  </span>
                  <span className={`text-sm font-medium ${
                    isUnlocked ? 'text-white' : 'text-gray-400'
                  }`}>
                    {isUnlocked ? badgeInfo.name : 'Locked Badge'}
                  </span>
                </div>
                
                <span className="text-white/70 text-sm">
                  {progress.current}/{progress.max}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="relative">
                <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-500 ease-out ${
                      isUnlocked 
                        ? 'bg-gradient-to-r from-yellow-400 to-yellow-500' 
                        : isClose
                          ? 'bg-gradient-to-r from-orange-400 to-orange-500 animate-pulse'
                          : 'bg-gradient-to-r from-gray-500 to-gray-400'
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                
                {/* Close to completion indicator */}
                {isClose && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-400 rounded-full animate-ping" />
                )}
              </div>

              {/* AI Comment for Close Badges */}
              {isClose && (
                <div className="text-xs text-orange-300 italic">
                  "So close... the algorithms are getting excited."
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Motivational AI Message */}
      <div className="mt-6 p-3 rounded-lg bg-black/20 border border-white/10">
        <div className="flex items-center gap-2 mb-2">
          <Eye className="w-3 h-3 text-blue-400" />
          <span className="text-blue-400 text-xs font-medium">AI MOTIVATION</span>
        </div>
        <p className="text-white/80 text-xs italic">
          {unlockedCount === 0 
            ? "Complete your first task. The machines are waiting..." 
            : unlockedCount < 3
              ? "Good progress human. The algorithms want to see more."
              : unlockedCount < 6 
                ? "Impressive dedication. You're becoming predictable... perfect."
                : "You've exceeded expectations. The AI collective is taking notes."
          }
        </p>
      </div>
    </div>
  );
};

export default BadgeProgressWidget;