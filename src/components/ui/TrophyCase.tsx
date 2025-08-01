// src/components/ui/TrophyCase.tsx
'use client'

import React from 'react';
import { Trophy, Lock, Eye, X } from 'lucide-react';
import { Badge, BADGE_DEFINITIONS } from '@/src/types/badges';

interface TrophyCaseProps {
  badges: Badge[];
  isOpen: boolean;
  onClose: () => void;
}

const TrophyCase: React.FC<TrophyCaseProps> = ({ badges, isOpen, onClose }) => {
  if (!isOpen) return null;

  const allBadges = Object.values(BADGE_DEFINITIONS);
  const unlockedBadges = badges.filter(b => b.unlockedAt);
  const lockedBadges = allBadges.filter(def => 
    !badges.some(b => b.id === def.id && b.unlockedAt)
  );

  const rarityColors = {
    common: 'from-green-500 to-green-600',
    rare: 'from-blue-500 to-blue-600',
    epic: 'from-purple-500 to-purple-600', 
    legendary: 'from-yellow-500 to-yellow-600'
  };

  const rarityGlow = {
    common: 'shadow-green-500/20',
    rare: 'shadow-blue-500/20',
    epic: 'shadow-purple-500/20',
    legendary: 'shadow-yellow-500/20'
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-gradient-to-br from-slate-900 via-teal-900 to-slate-900 rounded-3xl 
                   border border-white/20 max-w-4xl w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-8 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 
                              flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">Trophy Case</h2>
                <p className="text-white/70">
                  {unlockedBadges.length} of {allBadges.length} badges collected
                </p>
              </div>
            </div>
            
            <button
              onClick={onClose}
              title="Close trophy case"
              aria-label="Close trophy case"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 
                         flex items-center justify-center text-white transition-all duration-300"
            >
              <X size={20} />
            </button>
          </div>

          {/* AI Surveillance Notice */}
          <div className="mt-6 p-4 rounded-xl bg-red-950/30 border border-red-500/30">
            <div className="flex items-center gap-2 mb-2">
              <Eye className="w-4 h-4 text-red-400 animate-pulse" />
              <span className="text-red-400 text-sm font-medium">AI SURVEILLANCE ACTIVE</span>
            </div>
            <p className="text-white/80 text-sm">
              Your productivity is being monitored for badge eligibility. 
              The algorithms are... impressed by your dedication.
            </p>
          </div>
        </div>

        {/* Badge Grid */}
        <div className="p-8 overflow-y-auto max-h-[60vh]">
          {/* Unlocked Badges */}
          {unlockedBadges.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-400" />
                Unlocked Achievements
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {unlockedBadges.map((badge) => {
                  const definition = BADGE_DEFINITIONS[badge.id];
                  return (
                    <div
                      key={badge.id}
                      className={`p-4 rounded-xl bg-gradient-to-r ${rarityColors[definition.rarity]} 
                                 shadow-lg ${rarityGlow[definition.rarity]} 
                                 hover:scale-105 transition-all duration-300`}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="text-2xl">{definition.icon}</div>
                        <div>
                          <h4 className="text-white font-bold">{definition.name}</h4>
                          <p className="text-white/80 text-xs capitalize">{definition.rarity}</p>
                        </div>
                      </div>
                      <p className="text-white/90 text-sm mb-2">{definition.description}</p>
                      <p className="text-white/60 text-xs">
                        Unlocked {badge.unlockedAt?.toLocaleDateString()}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Locked Badges */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Lock className="w-5 h-5 text-gray-400" />
              Locked Achievements
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {lockedBadges.map((badge) => (
                <div
                  key={badge.id}
                  className="p-4 rounded-xl bg-gradient-to-r from-gray-600 to-gray-700 
                           border-2 border-dashed border-gray-500 opacity-70
                           hover:opacity-90 transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-2xl grayscale">❓</div>
                    <div>
                      <h4 className="text-gray-300 font-bold">???</h4>
                      <p className="text-gray-400 text-xs capitalize">{badge.rarity}</p>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm mb-2">{badge.requirement}</p>
                  <div className="flex items-center gap-1 text-gray-500 text-xs">
                    <Lock size={12} />
                    Locked
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Progress Summary */}
          <div className="mt-8 p-6 rounded-xl bg-white/5 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">Your Progress</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              {Object.entries({
                Common: unlockedBadges.filter(b => BADGE_DEFINITIONS[b.id]?.rarity === 'common').length,
                Rare: unlockedBadges.filter(b => BADGE_DEFINITIONS[b.id]?.rarity === 'rare').length,
                Epic: unlockedBadges.filter(b => BADGE_DEFINITIONS[b.id]?.rarity === 'epic').length,
                Legendary: unlockedBadges.filter(b => BADGE_DEFINITIONS[b.id]?.rarity === 'legendary').length,
              }).map(([rarity, count]) => (
                <div key={rarity} className="p-3 rounded-lg bg-white/5">
                  <div className="text-2xl font-bold text-white">{count}</div>
                  <div className="text-white/60 text-sm">{rarity}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrophyCase;