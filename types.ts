export enum Page {
  Dashboard = 'Dashboard',
  Strategies = 'Strategies',
  Progress = 'Progress',
  Help = 'Help',
  Checklist = 'Checklist',
  Badges = 'Badges',
  Contact = 'Contact',
  Resources = 'Resources',
  ArticleList = 'ArticleList',
  ArticleDetail = 'ArticleDetail',
  Tutorials = 'Tutorials',
  Links = 'Links',
  HoneyStore = 'HoneyStore',
  StrategyChallenge = 'StrategyChallenge',
  StrategyDetail = 'StrategyDetail',
  Voucher = 'Voucher',
}

export interface Strategy {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  completed: boolean;
  details: string[];
  duration: number; // in seconds
}

export interface DailyChallenge {
  day: number;
  strategies: Strategy[];
}

export interface ChecklistItemData {
  id: number;
  text: string;
  completed: boolean;
}

export interface Notification {
  id: number;
  text: string;
  timestamp: string;
  read: boolean;
  icon: string;
  iconBgColor: string;
}

export interface Badge {
  day: number;
  title: string;
  icon: string;
}

export interface TimerState {
  isActive: boolean;
  startTime: number | null;
  strategyType: NaturalisticStrategyType | null;
  dayIndex: number | null;
  activityId: string | null;
}

export interface UserInfo {
  caregiverName: string;
  childName: string;
  childDob: string;
  honeyDrops: number;
  parentalEducation: string;
  homeLanguage: string;
}

export interface Article {
  id: number;
  title: string;
  summary: string;
  image: string;
  content: { type: 'heading' | 'paragraph'; text: string }[];
}

// New types for Naturalistic Strategies
export enum NaturalisticStrategyType {
  Expansion = 'Expansion',
  Recast = 'Recast',
  OpenEQ = 'Open EQ',
  Comment = 'Comment',
}

export interface Activity {
  id: string;
  title: string;
  image: string;
  description: string;
  script: {
    title: string;
    dialogue: { speaker: 'Child' | 'Parent'; line: string }[];
  }[];
  completed: boolean;
  duration: number; // in seconds
  recommendedTime: number; // in minutes
  skills: string[];
  completionDate?: number;
  honeyDropsEarned?: number;
}

export interface ChallengeDay {
  day: number;
  activities: Activity[];
}

export interface StrategyChallenge {
  type: NaturalisticStrategyType;
  title: string;
  description: string;
  icon: string;
  color: string;
  challenge: ChallengeDay[];
}

export interface VoucherInfo {
  code: string;
  amount: number;
  date: string;
  redeemedTo: string;
}