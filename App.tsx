import React, { useState, useEffect, useRef, useMemo } from 'react';
import Loader from './components/Loader';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import SidebarNav from './components/SidebarNav';
import Dashboard from './components/Dashboard';
import DailyStrategies from './components/DailyStrategies';
import ProgressTracker from './components/ProgressTracker';
import HelpAndSupport from './components/Community';
import NotificationPanel from './components/NotificationPanel';
import ChecklistPage from './components/ChecklistPage';
import RewardBadgesPage from './components/RewardBadgesPage';
import FloatingTimer from './components/FloatingTimer';
import ContactPage from './components/ContactPage';
import UserInfoModal from './components/UserInfoModal';
import ResourcesPage from './components/ResourcesPage';
import ArticleListPage from './components/ArticleListPage';
import ArticleDetailPage from './components/ArticleDetailPage';
import TutorialsPage from './components/TutorialsPage';
import LinksPage from './components/LinksPage';
import VideoPlayerModal from './components/VideoPlayerModal';
import HoneyStorePage from './components/HoneyStorePage';
import HoneyDropAnimation from './components/HoneyDropAnimation';
import StrategyChallengePage from './components/StrategyChallengePage';
import StrategyDetailPage from './components/StrategyDetailPage';
import DayCompletionCelebration from './components/DayCompletionCelebration';
import VoucherPage from './components/VoucherPage';
import { Page, Notification, DailyChallenge, TimerState, UserInfo, Article, NaturalisticStrategyType, StrategyChallenge, VoucherInfo } from './types';
import { NAV_ITEMS, NOTIFICATIONS, THIRTY_DAY_CHALLENGE, NATURALISTIC_STRATEGIES } from './constants';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<Page>(Page.Dashboard);
  const [animationClass, setAnimationClass] = useState('animate-fadeIn');
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isNotificationsOpen, setNotificationsOpen] = useState(false);
  const [strategyChallengesData, setStrategyChallengesData] = useState<StrategyChallenge[]>(NATURALISTIC_STRATEGIES);
  const [claimedBadges, setClaimedBadges] = useState<number[]>([]);
  const [timerState, setTimerState] = useState<TimerState>({ isActive: false, startTime: null, strategyType: null, dayIndex: null, activityId: null });
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isUserInfoModalOpen, setUserInfoModalOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);
  const [isAnimatingDrops, setIsAnimatingDrops] = useState<boolean>(false);
  const [selectedStrategyCategory, setSelectedStrategyCategory] = useState<NaturalisticStrategyType | null>(null);
  const [celebrationInfo, setCelebrationInfo] = useState<{ day: number } | null>(null);
  const [voucherInfo, setVoucherInfo] = useState<VoucherInfo | null>(null);
  const isSavingUserInfoRef = useRef(false);

  // Load all data from local storage on initial mount
  useEffect(() => {
    const loadData = () => {
      const savedUserInfo = localStorage.getItem('speechiveUserInfo');
      if (savedUserInfo) {
        const parsedInfo = JSON.parse(savedUserInfo);
        setUserInfo(parsedInfo);
      }

      const savedChallenges = localStorage.getItem('speechiveChallengesData');
      if (savedChallenges) setStrategyChallengesData(JSON.parse(savedChallenges));

      const savedBadges = localStorage.getItem('speechiveClaimedBadges');
      if (savedBadges) setClaimedBadges(JSON.parse(savedBadges));
      
      const savedNotifications = localStorage.getItem('speechiveNotifications');
      setNotifications(savedNotifications ? JSON.parse(savedNotifications) : NOTIFICATIONS);

      setIsLoading(false);
    };

    const timer = setTimeout(loadData, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Save data to local storage whenever it changes
  useEffect(() => {
    if (userInfo) localStorage.setItem('speechiveUserInfo', JSON.stringify(userInfo));
  }, [userInfo]);

  useEffect(() => {
    localStorage.setItem('speechiveChallengesData', JSON.stringify(strategyChallengesData));
  }, [strategyChallengesData]);

  useEffect(() => {
    localStorage.setItem('speechiveClaimedBadges', JSON.stringify(claimedBadges));
  }, [claimedBadges]);

  useEffect(() => {
    localStorage.setItem('speechiveNotifications', JSON.stringify(notifications));
  }, [notifications]);
  
  const addNotification = (text: string, icon: string, iconBgColor: string) => {
    const newNotification: Notification = {
        id: Date.now(),
        text,
        timestamp: 'Just now',
        read: false,
        icon,
        iconBgColor,
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const awardHoneyDrops = (amount: number) => {
    setUserInfo(prev => prev ? { ...prev, honeyDrops: (prev.honeyDrops || 0) + amount } : prev);
    setIsAnimatingDrops(true);
  };

  const todaysCompletedActivitiesCount = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return strategyChallengesData
        .flatMap(challenge => 
            challenge.challenge.flatMap(day => 
                day.activities
            )
        )
        .filter(activity => 
            activity.completed && activity.completionDate && 
            activity.completionDate >= today.getTime() && activity.completionDate < tomorrow.getTime()
        )
        .length;
  }, [strategyChallengesData]);

  const handleStartTimer = (strategyType: NaturalisticStrategyType, dayIndex: number, activityId: string) => {
    if (todaysCompletedActivitiesCount >= 3) {
      alert("You have completed the maximum of 3 activities for today. Come back tomorrow!");
      return;
    }
    setTimerState({ isActive: true, startTime: Date.now(), strategyType, dayIndex, activityId });
  };
  
  const handleStopTimer = () => {
    if (timerState.isActive && timerState.startTime && timerState.strategyType && timerState.dayIndex !== null && timerState.activityId) {
      const duration = Math.round((Date.now() - timerState.startTime) / 1000);
      const { strategyType, dayIndex, activityId } = timerState;
  
      let wasAlreadyCompleted = false;
      const completionTimestamp = Date.now();
      let activityTitle = 'activity';
      
      const updatedChallenges = strategyChallengesData.map(challenge => {
        if (challenge.type === strategyType) {
          const updatedChallengeDays = challenge.challenge.map((day, index) => {
            if (index === dayIndex) {
              return {
                ...day,
                activities: day.activities.map(activity => {
                  if (activity.id === activityId) {
                    wasAlreadyCompleted = activity.completed;
                    activityTitle = activity.title;
                    return { 
                        ...activity, 
                        duration: (activity.duration || 0) + duration, 
                        completed: true,
                        completionDate: completionTimestamp,
                        honeyDropsEarned: wasAlreadyCompleted ? activity.honeyDropsEarned : 33
                    };
                  }
                  return activity;
                }),
              };
            }
            return day;
          });
          return { ...challenge, challenge: updatedChallengeDays };
        }
        return challenge;
      });

      setStrategyChallengesData(updatedChallenges);
      
      if (!wasAlreadyCompleted) {
        awardHoneyDrops(33);
        addNotification(`'${activityTitle}' complete! +33 Honey Drops earned.`, 'fas fa-check-circle', 'bg-green-500');

        const updatedChallenge = updatedChallenges.find(c => c.type === strategyType);
        if (updatedChallenge) {
          const updatedDay = updatedChallenge.challenge[dayIndex];
          if (updatedDay && updatedDay.activities.length > 0 && updatedDay.activities.every(a => a.completed)) {
            setCelebrationInfo({ day: dayIndex + 1 });
            addNotification(`Day ${dayIndex + 1} complete! You've unlocked a new badge.`, 'fas fa-trophy', 'bg-amber-500');
          }
        }
      }
    }
    setTimerState({ isActive: false, startTime: null, strategyType: null, dayIndex: null, activityId: null });
  };

  const handleClaimBadge = (day: number) => {
    if (!claimedBadges.includes(day)) {
      setClaimedBadges(prev => [...prev, day].sort((a, b) => a - b));
      awardHoneyDrops(33);
      addNotification(`Badge for Day ${day} claimed! +33 Honey Drops earned.`, 'fas fa-award', 'bg-indigo-500');
    }
  };

  const handleChecklistComplete = () => {
    awardHoneyDrops(25);
  };

  const handleResetProgress = () => {
    if (window.confirm("Are you sure you want to reset all progress? This action cannot be undone.")) {
      localStorage.removeItem('speechiveUserInfo');
      localStorage.removeItem('speechiveChallengesData');
      localStorage.removeItem('speechiveClaimedBadges');
      localStorage.removeItem('speechiveNotifications');
      window.location.reload();
    }
  };

  const handleSaveUserInfo = (info: UserInfo) => {
    isSavingUserInfoRef.current = true;
    setUserInfo(info);
    setUserInfoModalOpen(false);
    handlePageChange(Page.Strategies);
  };

  const handleSelectStrategyCategory = (categoryType: NaturalisticStrategyType) => {
    setSelectedStrategyCategory(categoryType);
    handlePageChange(Page.StrategyChallenge);
  };

  const handleViewStrategyDetails = (categoryType: NaturalisticStrategyType) => {
    setSelectedStrategyCategory(categoryType);
    handlePageChange(Page.StrategyDetail);
  };

  const handleRedeem = () => {
    if (userInfo && userInfo.honeyDrops >= 990) {
      const redeemedAmount = 10;
      const newVoucher: VoucherInfo = {
        code: `SPEECHIVE-${Date.now()}`,
        amount: redeemedAmount,
        date: new Date().toLocaleDateString('en-GB'),
        redeemedTo: userInfo.caregiverName,
      };
      
      setUserInfo(prev => ({ ...prev!, honeyDrops: prev!.honeyDrops - 990 }));
      setVoucherInfo(newVoucher);
      handlePageChange(Page.Voucher);
    } else {
      alert("You don't have enough Honey Drops to redeem a voucher.");
    }
  };

  const handlePageChange = (newPage: Page) => {
    if (newPage === currentPage) return;
    
    if (newPage === Page.Strategies && !userInfo && !isSavingUserInfoRef.current) {
        setUserInfoModalOpen(true);
        return;
    }
    
    if (isSavingUserInfoRef.current) {
        isSavingUserInfoRef.current = false;
    }

    setNotificationsOpen(false);
    const mainNavPages = NAV_ITEMS.map(item => item.id);
    const currentIndex = mainNavPages.indexOf(currentPage);
    const newIndex = mainNavPages.indexOf(newPage);

    if (currentIndex !== -1 && newIndex !== -1) {
      if (newIndex > currentIndex) {
        setAnimationClass('page-transition-enter-right');
      } else {
        setAnimationClass('page-transition-enter-left');
      }
    } else {
      setAnimationClass('animate-fadeIn');
    }
    
    setCurrentPage(newPage);
  };

  const handleSelectArticle = (article: Article) => {
    setSelectedArticle(article);
    handlePageChange(Page.ArticleDetail);
  };

  const handleToggleNotifications = () => {
    setNotificationsOpen(prev => !prev);
  };

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };
  
  const handleClearAllNotifications = () => {
    setNotifications([]);
  };

  const handlePlayVideo = (videoId: string) => {
    setPlayingVideoId(videoId);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const renderPage = () => {
    switch (currentPage) {
      case Page.Dashboard:
        return <Dashboard setActivePage={handlePageChange} />;
      case Page.Strategies:
        return <DailyStrategies onSelectCategory={handleSelectStrategyCategory} />;
      case Page.StrategyChallenge: {
        const challenge = strategyChallengesData.find(c => c.type === selectedStrategyCategory);
        return challenge ? <StrategyChallengePage challenge={challenge} setActivePage={handlePageChange} onStartTimer={handleStartTimer} isTimerActive={timerState.isActive} activitiesCompletedToday={todaysCompletedActivitiesCount} /> : <DailyStrategies onSelectCategory={handleSelectStrategyCategory} />;
      }
      case Page.Progress:
        return <ProgressTracker userInfo={userInfo} strategyChallengesData={strategyChallengesData} setActivePage={handlePageChange} onViewStrategyDetails={handleViewStrategyDetails} />;
      case Page.StrategyDetail: {
        const challenge = strategyChallengesData.find(c => c.type === selectedStrategyCategory);
        return challenge ? <StrategyDetailPage challenge={challenge} setActivePage={handlePageChange} /> : <ProgressTracker userInfo={userInfo} strategyChallengesData={strategyChallengesData} setActivePage={handlePageChange} onViewStrategyDetails={handleViewStrategyDetails} />;
      }
      case Page.Help:
        return <HelpAndSupport onResetProgress={handleResetProgress} setActivePage={handlePageChange} />;
      case Page.Checklist:
        return <ChecklistPage onAllCompleted={handleChecklistComplete} />;
      case Page.Badges:
        return <RewardBadgesPage strategyChallengesData={strategyChallengesData} claimedBadges={claimedBadges} onClaimBadge={handleClaimBadge} />;
      case Page.Contact:
        return <ContactPage setActivePage={handlePageChange} />;
      case Page.Resources:
        return <ResourcesPage setActivePage={handlePageChange} />;
      case Page.ArticleList:
        return <ArticleListPage setActivePage={handlePageChange} onSelectArticle={handleSelectArticle} />;
      case Page.ArticleDetail:
        return selectedArticle ? <ArticleDetailPage article={selectedArticle} setActivePage={handlePageChange} /> : <ArticleListPage setActivePage={handlePageChange} onSelectArticle={handleSelectArticle} />;
      case Page.Tutorials:
        return <TutorialsPage setActivePage={handlePageChange} onPlayVideo={handlePlayVideo} />;
      case Page.Links:
        return <LinksPage setActivePage={handlePageChange} />;
      case Page.HoneyStore:
        return <HoneyStorePage setActivePage={handlePageChange} honeyDrops={userInfo?.honeyDrops || 0} onRedeem={handleRedeem} />;
      case Page.Voucher:
        return voucherInfo ? <VoucherPage voucher={voucherInfo} setActivePage={handlePageChange} /> : <HoneyStorePage setActivePage={handlePageChange} honeyDrops={userInfo?.honeyDrops || 0} onRedeem={handleRedeem} />;
      default:
        return <Dashboard setActivePage={handlePageChange} />;
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="md:flex md:h-screen font-sans text-gray-800">
      <SidebarNav activePage={currentPage} setActivePage={handlePageChange} />
      <div className="relative max-w-md mx-auto bg-white shadow-2xl flex flex-col h-screen overflow-hidden md:h-full md:max-w-none md:flex-1 md:mx-0">
        <Header 
          onToggleNotifications={handleToggleNotifications} 
          unreadCount={unreadCount} 
          honeyDrops={userInfo?.honeyDrops || 0}
          setActivePage={handlePageChange}
        />
        <UserInfoModal isOpen={isUserInfoModalOpen} onSave={handleSaveUserInfo} onClose={() => setUserInfoModalOpen(false)} />
        {isNotificationsOpen && (
            <NotificationPanel
                notifications={notifications}
                onClose={() => setNotificationsOpen(false)}
                onMarkAllRead={handleMarkAllRead}
                onClearAll={handleClearAllNotifications}
            />
        )}
        {isAnimatingDrops && <HoneyDropAnimation onAnimationEnd={() => setIsAnimatingDrops(false)} />}
        {celebrationInfo && (
          <DayCompletionCelebration 
            day={celebrationInfo.day} 
            onClose={() => setCelebrationInfo(null)}
          />
        )}
        <main className={`flex-1 p-3 md:p-6 pb-20 md:pb-3 overflow-y-auto ${animationClass} custom-scrollbar`} key={currentPage}>
          {renderPage()}
        </main>
        {timerState.isActive && timerState.startTime && (
          <FloatingTimer startTime={timerState.startTime} onStop={handleStopTimer} />
        )}
        {playingVideoId && (
          <VideoPlayerModal videoId={playingVideoId} onClose={() => setPlayingVideoId(null)} />
        )}
        <BottomNav activePage={currentPage} setActivePage={handlePageChange} />
      </div>
    </div>
  );
};

export default App;