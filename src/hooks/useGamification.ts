// src/hooks/useGamification.ts
'use client'

import { useState, useEffect, useCallback } from 'react';
import { Badge, Achievement, BadgeSystem, BADGE_DEFINITIONS } from '@/src/types/badges';
import { FrontendTask } from '@/src/types';

export const useGamification = (tasks: FrontendTask[], userId: string | null) => {
  const [badges, setBadges] = useState<Badge[]>([]);
  const [currentAchievement, setCurrentAchievement] = useState<Achievement | null>(null);
  const [showTrophyCase, setShowTrophyCase] = useState(false);

  // Track lifetime stats separately from current tasks
  const [lifetimeStats, setLifetimeStats] = useState({
    totalCreated: 0,
    totalCompleted: 0,
    highPriorityCompleted: 0
  });

  // Track processed achievements to prevent duplicates
  const [processedAchievements, setProcessedAchievements] = useState(new Set<string>());

  // Load badges from localStorage
  useEffect(() => {
    if (userId) {
      const savedBadges = localStorage.getItem(`badges_${userId}`);
      if (savedBadges) {
        try {
          const parsedBadges = JSON.parse(savedBadges);
          const badgesWithDates = parsedBadges.map((badge: Badge & { unlockedAt?: string }) => ({
            ...badge,
            unlockedAt: badge.unlockedAt ? new Date(badge.unlockedAt) : undefined,
          }));
          setBadges(badgesWithDates);
        } catch (error) {
          console.log('Error loading badges:', error);
          // Initialize with empty badges if loading fails
          const initialBadges = Object.values(BADGE_DEFINITIONS).map(def => ({
            ...def,
            unlockedAt: undefined,
            progress: 0
          }));
          setBadges(initialBadges);
        }
      } else {
        // Initialize badges from definitions
        const initialBadges = Object.values(BADGE_DEFINITIONS).map(def => ({
          ...def,
          unlockedAt: undefined,
          progress: 0
        }));
        setBadges(initialBadges);
      }
    }
  }, [userId]);

  // Save badges to localStorage
  useEffect(() => {
    if (userId && badges.length > 0) {
      try {
        localStorage.setItem(`badges_${userId}`, JSON.stringify(badges));
        console.log('Badges saved:', badges.filter(b => b.unlockedAt).length, 'unlocked');
      } catch (error) {
        console.log('Error saving badges:', error);
      }
    }
  }, [badges, userId]);

  // Initialize lifetime stats from localStorage
  useEffect(() => {
    if (userId) {
      const savedStats = localStorage.getItem(`lifetimeStats_${userId}`);
      if (savedStats) {
        try {
          const parsedStats = JSON.parse(savedStats);
          setLifetimeStats(parsedStats);
        } catch (error) {
          console.log('Error loading lifetime stats:', error);
        }
      }
    }
  }, [userId]);

  // Update lifetime stats when tasks change
  useEffect(() => {
    if (userId && tasks.length > 0) {
      const savedStats = localStorage.getItem(`lifetimeStats_${userId}`);
      const currentLifetimeStats = savedStats ? JSON.parse(savedStats) : {
        totalCreated: 0,
        totalCompleted: 0,
        highPriorityCompleted: 0
      };

      // Calculate new completions since last save
      const currentCompleted = tasks.filter(t => t.completed).length;
      const currentHighPriority = tasks.filter(t => t.completed && t.priority === 'high').length;
      
      // Update lifetime stats (these only go up, never down)
      const newStats = {
        totalCreated: Math.max(currentLifetimeStats.totalCreated, tasks.length),
        totalCompleted: Math.max(currentLifetimeStats.totalCompleted, currentCompleted),
        highPriorityCompleted: Math.max(currentLifetimeStats.highPriorityCompleted, currentHighPriority)
      };

      setLifetimeStats(newStats);
      localStorage.setItem(`lifetimeStats_${userId}`, JSON.stringify(newStats));
    }
  }, [tasks, userId]);

  // Calculate days the user has been using the app
  const calculateDaysUsed = useCallback((tasks: FrontendTask[]): number => {
    if (tasks.length === 0) return 0;
    
    const dates = tasks.map(t => new Date(t.createdAt).toDateString());
    const uniqueDates = new Set(dates);
    return uniqueDates.size;
  }, []);

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

  // Calculate current completion streak (simplified)
  const calculateStreak = useCallback((): number => {
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
  }, [tasks]);

  // Check for new achievements when tasks change
  const checkAchievements = useCallback(() => {
    if (!userId || tasks.length === 0 || badges.length === 0) return;

    console.log('Checking achievements for', tasks.length, 'tasks');

    const userStats = {
      totalTasks: tasks.length,
      completedTasks: lifetimeStats.totalCompleted, // Use lifetime stats!
      highPriorityCompleted: lifetimeStats.highPriorityCompleted, // Use lifetime stats!
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
      const unprocessedBadges = newBadges.filter(
        (badge) => !processedAchievements.has(badge.badgeId)
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
  }, [userId, tasks, badges, processedAchievements, lifetimeStats, calculateDaysUsed]);

  // Check achievements when tasks change
  useEffect(() => {
    checkAchievements();
  }, [checkAchievements]);

  // Close achievement alert and prevent re-triggering
  const closeAchievementAlert = () => {
    setCurrentAchievement(null);
  };

  // Get progress for specific badge using lifetime stats
  const getBadgeProgress = (badgeId: string): { current: number, max: number } => {
    const badge = badges.find(b => b.id === badgeId);
    if (badge?.unlockedAt) {
      return { current: badge.maxProgress || 1, max: badge.maxProgress || 1 };
    }

    // Calculate current progress for locked badges using lifetime stats
    const todayCount = tasks.filter(t => {
      if (!t.completed || !t.updatedAt) return false;
      const today = new Date().toDateString();
      return new Date(t.updatedAt).toDateString() === today;
    }).length;

    switch (badgeId) {
      case 'taskMaster':
        return { current: Math.min(lifetimeStats.totalCompleted, 100), max: 100 };
      case 'priorityHunter':
        return { current: Math.min(lifetimeStats.highPriorityCompleted, 50), max: 50 };
      case 'speedDemon':
        return { current: Math.min(todayCount, 20), max: 20 };
      case 'weekWarrior':
        return { current: Math.min(calculateStreak(), 7), max: 7 };
      case 'centurion':
        return { current: Math.min(lifetimeStats.totalCreated, 100), max: 100 };
      default:
        return { current: 0, max: 1 };
    }
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