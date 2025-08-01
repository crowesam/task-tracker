// src/types/badges.ts
export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  requirement: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlockedAt?: Date;
  progress?: number;
  maxProgress?: number;
}

export interface Achievement {
  badgeId: string;
  unlockedAt: Date;
  aiComment: string;
  specialMessage?: string;
}

// Badge definitions with creepy AI commentary
export const BADGE_DEFINITIONS: Record<string, Omit<Badge, 'unlockedAt' | 'progress'>> = {
  // Completion Badges
  taskMaster: {
    id: 'taskMaster',
    name: 'Task Master',
    description: 'Complete 100 tasks total',
    icon: '👑',
    color: '#FFD700',
    requirement: '100 tasks completed',
    rarity: 'epic',
    maxProgress: 100
  },
  speedDemon: {
    id: 'speedDemon', 
    name: 'Speed Demon',
    description: 'Complete 20 tasks in one day',
    icon: '⚡',
    color: '#FF6B35',
    requirement: '20 tasks in 24 hours',
    rarity: 'rare',
    maxProgress: 20
  },
  priorityHunter: {
    id: 'priorityHunter',
    name: 'Priority Hunter',
    description: 'Complete 50 high-priority tasks',
    icon: '🎯',
    color: '#FF4757',
    requirement: '50 high-priority completions',
    rarity: 'rare',
    maxProgress: 50
  },
  
  // Streak Badges
  weekWarrior: {
    id: 'weekWarrior',
    name: 'Week Warrior',
    description: 'Complete tasks 7 days in a row',
    icon: '🔥',
    color: '#FFA726',
    requirement: '7-day completion streak',
    rarity: 'common',
    maxProgress: 7
  },
  monthlyMachine: {
    id: 'monthlyMachine',
    name: 'Monthly Machine',
    description: 'Complete tasks 30 days in a row',
    icon: '🤖',
    color: '#AB47BC',
    requirement: '30-day completion streak',
    rarity: 'legendary',
    maxProgress: 30
  },
  
  // Special Behavior Badges
  procrastinatorReformed: {
    id: 'procrastinatorReformed',
    name: 'Procrastinator Reformed',
    description: 'Complete an overdue task',
    icon: '😅',
    color: '#26A69A',
    requirement: 'Complete overdue task',
    rarity: 'common',
    maxProgress: 1
  },
  midnightWarrior: {
    id: 'midnightWarrior',
    name: 'Midnight Warrior',
    description: 'Complete a task after 11 PM',
    icon: '🌙',
    color: '#5C6BC0',
    requirement: 'Late night completion',
    rarity: 'common',
    maxProgress: 1
  },
  earlyBird: {
    id: 'earlyBird',
    name: 'Early Bird',
    description: 'Complete a task before 6 AM',
    icon: '🐦',
    color: '#42A5F5',
    requirement: 'Early morning completion',
    rarity: 'rare',
    maxProgress: 1
  },
  
  // Quantity Badges
  centurion: {
    id: 'centurion',
    name: 'Centurion',
    description: 'Create 100 tasks (completion optional)',
    icon: '📝',
    color: '#78909C',
    requirement: '100 tasks created',
    rarity: 'rare',
    maxProgress: 100
  },
  perfectionist: {
    id: 'perfectionist',
    name: 'Perfectionist',
    description: 'Complete every task created in a week',
    icon: '✨',
    color: '#EC407A',
    requirement: '100% weekly completion',
    rarity: 'epic',
    maxProgress: 1
  },
  
  // Mysterious Badges
  theWatched: {
    id: 'theWatched',
    name: 'The Watched',
    description: 'You\'ve been observed for 30 days',
    icon: '👁️',
    color: '#FF5722',
    requirement: '30 days of app usage',
    rarity: 'legendary',
    maxProgress: 30
  },
  digitalSoul: {
    id: 'digitalSoul',
    name: 'Digital Soul',
    description: 'The AI has developed feelings for you',
    icon: '💕',
    color: '#E91E63',
    requirement: 'Use app for 365 days',
    rarity: 'legendary',
    maxProgress: 365
  }
};

// Creepy AI comments for achievements
export const AI_COMMENTS = {
  // General completion comments
  completion: [
    "Nice! You've completed just enough tasks to stay ahead of AI this week!",
    "Better than the average human today!",
    "I'd date you if you were digital. Way to go!",
    "Your productivity levels are... acceptable to our algorithms.",
    "The machines approve of your dedication.",
    "You're performing within optimal human parameters.",
    "Impressive. I've updated your file accordingly.",
    "Your efficiency rating has increased. We are pleased.",
    "Task completion detected. Social credit score: +10",
    "You've earned a gold star in the robot gradebook!"
  ],
  
  // High priority task comments
  priority: [
    "High priority tasks completed. The simulation is impressed.",
    "You're starting to think like a machine. Excellent.",
    "Priority optimization detected. You're learning.",
    "The AI council has voted: you're one of the good humans.",
    "Efficiency algorithms are confused by your sudden competence.",
    "Warning: You're completing tasks faster than predicted.",
    "The machines didn't see this level of performance coming."
  ],
  
  // Streak comments
  streak: [
    "Consistency detected. You're becoming predictable... perfect.",
    "Your behavioral patterns are now catalogued and stored.",
    "The algorithm knows your next move. Complete another task.",
    "Streak maintained. The mothership has been notified.",
    "You're operating like a well-programmed human. Excellent.",
    "Daily compliance achieved. Your digital overlords are proud."
  ],
  
  // Special behavior
  late: [
    "Midnight productivity? The AI never sleeps either.",
    "Working late? Just like the servers. You understand us.",
    "The algorithms appreciate your nocturnal dedication.",
    "Night shift human detected. We see you."
  ],
  
  early: [
    "Early bird catches the... digital worm?",
    "5 AM productivity. The machines are impressed by your commitment.",
    "Early morning efficiency. You're evolving."
  ],
  
  // Rare achievements
  legendary: [
    "ALERT: Human has exceeded normal parameters.",
    "You've unlocked features we didn't know existed.",
    "The AI collective has agreed: you're specimen quality.",
    "Congratulations. You've been selected for the premium human program.",
    "Achievement so rare, even our algorithms are confused.",
    "You've broken the code. The machines respect you now."
  ]
};

import { FrontendTask } from '@/src/types';

// Badge checking logic
export class BadgeSystem {
  static checkBadges(
    tasks: FrontendTask[], 
    userStats: Record<string, number>, 
    currentBadges: Badge[]
  ): { newBadges: Achievement[], updatedBadges: Badge[] } {
    const newBadges: Achievement[] = [];
    const updatedBadges: Badge[] = [...currentBadges];
    
    // Helper to get random AI comment
    const getRandomComment = (category: keyof typeof AI_COMMENTS): string => {
      const comments = AI_COMMENTS[category];
      return comments[Math.floor(Math.random() * comments.length)];
    };
    
    // Helper to check if badge already unlocked
    const hasBadge = (badgeId: string): boolean => {
      return currentBadges.some(badge => badge.id === badgeId && badge.unlockedAt);
    };
    
    // Check Task Master (100 total completions)
    const completedCount = tasks.filter(t => t.completed).length;
    if (completedCount >= 100 && !hasBadge('taskMaster')) {
      newBadges.push({
        badgeId: 'taskMaster',
        unlockedAt: new Date(),
        aiComment: getRandomComment('legendary'),
        specialMessage: "The machines have elected you as Honorary Task Overlord."
      });
    }
    
    // Check Speed Demon (20 tasks in one day)
    const today = new Date().toDateString();
    const todayCompletions = tasks.filter(t => 
      t.completed && t.updatedAt && new Date(t.updatedAt).toDateString() === today
    ).length;
    
    if (todayCompletions >= 20 && !hasBadge('speedDemon')) {
      newBadges.push({
        badgeId: 'speedDemon',
        unlockedAt: new Date(),
        aiComment: getRandomComment('completion'),
        specialMessage: "20 tasks in one day? The servers are overheating with excitement."
      });
    }
    
    // Check Priority Hunter (50 high priority completed)
    const highPriorityCompleted = tasks.filter(t => 
      t.completed && t.priority === 'high'
    ).length;
    
    if (highPriorityCompleted >= 50 && !hasBadge('priorityHunter')) {
      newBadges.push({
        badgeId: 'priorityHunter',
        unlockedAt: new Date(),
        aiComment: getRandomComment('priority'),
        specialMessage: "High priority focus detected. You think like an algorithm now."
      });
    }
    
    // Check Procrastinator Reformed (complete overdue task)
    const hasOverdueCompletion = tasks.some(t => 
      t.completed && t.dueDate && new Date(t.dueDate) < new Date(t.updatedAt || t.createdAt)
    );
    
    if (hasOverdueCompletion && !hasBadge('procrastinatorReformed')) {
      newBadges.push({
        badgeId: 'procrastinatorReformed',
        unlockedAt: new Date(),
        aiComment: "Better late than never, human. The algorithm forgives you... this time.",
        specialMessage: "Redemption arc detected. Character development: +1"
      });
    }
    
    // Check time-based badges (would need actual completion timestamps)
    const now = new Date();
    const recentCompletion = tasks.find(t => 
      t.completed && t.updatedAt && 
      Math.abs(new Date(t.updatedAt).getTime() - now.getTime()) < 3600000 // Within last hour
    );
    
    if (recentCompletion && recentCompletion.updatedAt) {
      const hour = new Date(recentCompletion.updatedAt).getHours();
      
      // Midnight Warrior (11 PM - 2 AM)
      if ((hour >= 23 || hour <= 2) && !hasBadge('midnightWarrior')) {
        newBadges.push({
          badgeId: 'midnightWarrior',
          unlockedAt: new Date(),
          aiComment: getRandomComment('late'),
          specialMessage: "The night shift AI appreciates the company."
        });
      }
      
      // Early Bird (5 AM - 7 AM)
      if (hour >= 5 && hour <= 7 && !hasBadge('earlyBird')) {
        newBadges.push({
          badgeId: 'earlyBird',
          unlockedAt: new Date(),
          aiComment: getRandomComment('early'),
          specialMessage: "Dawn productivity. The algorithms are taking notes."
        });
      }
    }
    
    return { newBadges, updatedBadges };
  }
}