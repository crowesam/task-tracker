// src/hooks/useGamification.ts
'use client'

import { useState, useEffect, useCallback } from 'react';
import { Badge, Achievement, BadgeSystem } from '@/src/types/badges';

import { FrontendTask } from '@/src/types';

export const useGamification = (tasks: FrontendTask[], userId: string | null) => {
  const [badges, setBadges] = useState<Badge[]>([]);
  const [currentAchievement, setCurrentAchievement] = useState<Achievement | null>(null);
  const [showTrophyCase, setShowTrophyCase] = useState(false);

  // Load badges from localStorage
  useEffect(() => {
    if (userId) {
      const savedBadges = localStorage.getItem(`badges_${userId}`);
      if (savedBadges) {
        const parsedBadges = JSON.parse(savedBadges);
        const badgesWithDates = parsedBadges.map((badge: Badge & { unlockedAt?: string }) => ({
          ...badge,
          unlockedAt: badge.unlockedAt ? new Date(badge.unlockedAt) : undefined,
        }));
        setBadges(badgesWithDates);
      }
    }
  }, [userId]);

  // Save badges to localStorage
  useEffect(() => {
    if (userId && badges.length > 0) {
      localStorage.setItem(`badges_${userId}`, JSON.stringify(badges));
    }
  }, [badges, userId]);

  // Track processed achievements to prevent duplicates
  const [processedAchievements, setProcessedAchievements] = useState<Set<string>>(new Set());

  // Check for new achievements when tasks change
  const checkAchievements = useCallback(() => {
    if (!userId || tasks.length === 0 || badges.length === 0) return;

    console.log('Checking achievements for', tasks.length, 'tasks');

    const userStats = {
      totalTasks: tasks.length,
      completedTasks: tasks.filter(t => t.completed).length,
      highPriorityCompleted: tasks.filter(t => t.completed && t.priority === 'high').length,
      todayCompletions: tasks.filter(t => {
        if (!t.completed || !t.updatedAt) return false;
        const today = new Date().toDateString();
        return new Date(t.updatedAt).toDateString() === today;
      }).length,
      daysUsed: calculateDaysUsed(tasks)
    };

    console.log('User stats:', userStats);

    const { newBadges, updatedBadges } = BadgeSystem.checkBadges(tasks, userStats, badges);
    
    console.log('New badges found:', newBadges.length);
    
    if (newBadges.length > 0) {
      // Filter out already processed achievements
      const unprocessedBadges = newBadges.filter(badge => 
        !processedAchievements.has(badge.badgeId)
      );
      
      console.log('Unprocessed badges:', unprocessedBadges.length);
      
      if (unprocessedBadges.length > 0) {
        // Update badges state
        setBadges(updatedBadges);
        
        // Show achievement alert for the first new badge only
        const firstBadge = unprocessedBadges[0];
        setCurrentAchievement(firstBadge);
        
        // Mark as processed
        setProcessedAchievements(prev => new Set([...prev, firstBadge.badgeId]));
        
        console.log('Badge unlocked:', firstBadge.badgeId);
        
        // Play celebration sound
        playAchievementSound();
      }
    }
  }, [tasks, userId, badges, processedAchievements]);

  // Calculate days the user has been using the app
  const calculateDaysUsed = (tasks: FrontendTask[]): number => {
    if (tasks.length === 0) return 0;
    
    const dates = tasks.map(t => new Date(t.createdAt).toDateString());
    const uniqueDates = new Set(dates);
    return uniqueDates.size;
  };

  // Play achievement sound
  const playAchievementSound = () => {
    try {
      const audio = new Audio('/sounds/achievement.mp3');
      audio.volume = 0.5;
      audio.play().catch(() => console.log('Playing achievement sound'));
    } catch {
      console.log('Achievement unlocked!');
    }
  };

  // Check achievements when tasks change
  useEffect(() => {
    checkAchievements();
  }, [checkAchievements]);

  // Close achievement alert and prevent re-triggering
  const closeAchievementAlert = () => {
    setCurrentAchievement(null);
  };

  // Get progress for specific badge
  const getBadgeProgress = (badgeId: string): { current: number, max: number } => {
    const badge = badges.find(b => b.id === badgeId);
    if (badge?.unlockedAt) {
      return { current: badge.maxProgress || 1, max: badge.maxProgress || 1 };
    }

    // Calculate current progress for locked badges
    const completedCount = tasks.filter(t => t.completed).length;
    const highPriorityCount = tasks.filter(t => t.completed && t.priority === 'high').length;
    const todayCount = tasks.filter(t => {
      if (!t.completed || !t.updatedAt) return false;
      const today = new Date().toDateString();
      return new Date(t.updatedAt).toDateString() === today;
    }).length;

    switch (badgeId) {
      case 'taskMaster':
        return { current: Math.min(completedCount, 100), max: 100 };
      case 'priorityHunter':
        return { current: Math.min(highPriorityCount, 50), max: 50 };
      case 'speedDemon':
        return { current: Math.min(todayCount, 20), max: 20 };
      case 'weekWarrior':
        // Calculate streak (simplified)
        return { current: Math.min(calculateStreak(), 7), max: 7 };
      default:
        return { current: 0, max: 1 };
    }
  };

  // Calculate current completion streak (simplified)
  const calculateStreak = (): number => {
    // This is a simplified version - you'd want more sophisticated streak tracking
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    
    const completedToday = tasks.some(t => 
      t.completed && t.updatedAt && new Date(t.updatedAt).toDateString() === today
    );
    const completedYesterday = tasks.some(t => 
      t.completed && t.updatedAt && new Date(t.updatedAt).toDateString() === yesterday
    );
    
    if (completedToday && completedYesterday) return 2;
    if (completedToday) return 1;
    return 0;
  };

  // Get unlocked badge count
  const unlockedBadgeCount = badges.filter(b => b.unlockedAt).length;

  return {
    badges,
    currentAchievement,
    showTrophyCase,
    unlockedBadgeCount,
    setShowTrophyCase,
    closeAchievementAlert,
    getBadgeProgress,
    checkAchievements: () => checkAchievements()
  };
};