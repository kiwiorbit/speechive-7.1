

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import Card from './Card';
import Modal from './Modal';
import { UserInfo, StrategyChallenge, NaturalisticStrategyType, Page, Activity } from '../types';

declare var html2canvas: any;
declare var jspdf: any;

interface ProgressTrackerProps {
  strategyChallengesData: StrategyChallenge[];
  userInfo: UserInfo | null;
  setActivePage: (page: Page) => void;
  onViewStrategyDetails: (categoryType: NaturalisticStrategyType) => void;
}

const ProgressTab: React.FC<{ label: string; isActive: boolean; onClick: () => void }> = ({ label, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-200 focus:outline-none ${
            isActive ? 'bg-amber-400 text-white shadow-md' : 'text-gray-500 hover:bg-amber-100'
        }`}
    >
        {label}
    </button>
);

const UserInfoHeader: React.FC<{ userInfo: UserInfo }> = ({ userInfo }) => {
    const calculateAge = (dobString: string): string => {
        if (!dobString) return '';
        try {
            const dob = new Date(dobString + 'T00:00:00');
            const now = new Date();
            let months = (now.getFullYear() - dob.getFullYear()) * 12;
            months -= dob.getMonth();
            months += now.getMonth();
            
            let days = now.getDate() - dob.getDate();
            if (days < 0) {
                months--;
                const lastDayOfPreviousMonth = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
                days += lastDayOfPreviousMonth;
            }

            if (months < 0) { months = 0; days = 0; }

            const formattedDob = dob.toLocaleDateString('en-GB', {
                day: '2-digit', month: 'short', year: 'numeric'
            }).replace(/ /g, '-');
            
            return `${formattedDob} ( ${months} Months, ${days} Days )`;
        } catch (e) {
            return 'Invalid Date';
        }
    };

    return (
        <Card id="user-info-report" className="!p-4 bg-gray-50 border-l-4 border-amber-400">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Participant Information</h3>
            <div className="text-sm space-y-1">
                <p><span className="font-semibold w-28 inline-block">Caregiver:</span> {userInfo.caregiverName}</p>
                <p><span className="font-semibold w-28 inline-block">Child:</span> {userInfo.childName}</p>
                {userInfo.childDob && <p><span className="font-semibold w-28 inline-block">Date of Birth:</span> {calculateAge(userInfo.childDob)}</p>}
                {userInfo.parentalEducation && userInfo.parentalEducation !== 'Prefer not to say' && <p><span className="font-semibold w-28 inline-block">Education Level:</span> {userInfo.parentalEducation}</p>}
                {userInfo.homeLanguage && <p><span className="font-semibold w-28 inline-block">Home Language:</span> {userInfo.homeLanguage}</p>}
            </div>
        </Card>
    );
};


const formatSeconds = (seconds: number): string => {
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    if (remainingSeconds === 0) return `${minutes}m`;
    return `${minutes}m ${remainingSeconds}s`;
}

const StatCard: React.FC<{ icon: string; label: string; value: string | number; subValue?: string; className?: string }> = ({ icon, label, value, subValue, className = '' }) => (
    <div className={`bg-white p-3 rounded-lg shadow-sm border border-gray-100 ${className}`}>
        <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                <i className={`${icon} text-amber-500 text-sm`}></i>
            </div>
            <div>
                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">{label}</p>
                <p className="font-bold text-gray-800 text-sm leading-tight">{value}</p>
                {subValue && <p className="text-xs text-gray-500">{subValue}</p>}
            </div>
        </div>
    </div>
);

const SectionHeader: React.FC<{ title: string, subtitle: string }> = ({ title, subtitle }) => (
    <div className="mb-4">
        <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
        <p className="text-gray-500">{subtitle}</p>
    </div>
);

const StrategiesSection: React.FC<{ strategyChallengesData: StrategyChallenge[], onSelectStrategy: (type: NaturalisticStrategyType) => void }> = ({ strategyChallengesData, onSelectStrategy }) => (
    <div className="space-y-4">
        {strategyChallengesData.map(challenge => {
            const allActivities = challenge.challenge.flatMap(day => day.activities);
            const completedActivities = allActivities.filter(a => a.completed).length;
            const totalTime = allActivities.reduce((acc, activity) => acc + (activity.duration || 0), 0);
            
            return (
                <Card 
                    key={challenge.type} 
                    onClick={() => onSelectStrategy(challenge.type)}
                    className="flex items-center space-x-4 cursor-pointer hover:bg-amber-50 transition-colors"
                >
                   <div className={`w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center ${challenge.color} text-white`}>
                       <i className={`${challenge.icon} text-2xl`}></i>
                   </div>
                   <div className="flex-grow">
                       <h4 className="font-bold text-gray-800">{challenge.title}</h4>
                       <p className="text-sm text-gray-500">{completedActivities} / {allActivities.length} activities</p>
                   </div>
                   <div className="text-right">
                        <p className="font-bold text-lg text-amber-600">{formatSeconds(totalTime)}</p>
                        <p className="text-xs text-gray-500">Total time</p>
                   </div>
                   <div className="pl-2">
                        <i className="fas fa-chevron-right text-gray-400"></i>
                   </div>
                </Card>
            )
        })}
    </div>
);

interface DayTotal {
    day: number;
    time: number;
    completedActivities: Activity[];
    completedCount: number;
}

const WeeklySection: React.FC<{ dailyTotals: DayTotal[] }> = ({ dailyTotals }) => {
    const [weekPage, setWeekPage] = useState(0);
    const itemsPerPage = 7;
    const totalDays = 30;
    const totalWeekPages = Math.ceil(totalDays / itemsPerPage);

    const weeklyChartData = useMemo(() => {
        const start = weekPage * itemsPerPage;
        const end = start + itemsPerPage;
        return dailyTotals.slice(start, end).map(dayData => ({
            name: `Day ${dayData.day}`,
            time: parseFloat((dayData.time / 60).toFixed(1)),
        }));
    }, [dailyTotals, weekPage]);

    return (
        <Card className="!p-4 md:!p-6">
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyChartData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={false} tickLine={false} unit="m" />
                  <Tooltip cursor={{fill: 'rgba(251, 191, 36, 0.2)'}} contentStyle={{ backgroundColor: '#fff', border: '1px solid #f3f4f6', borderRadius: '0.5rem' }} />
                  <Bar dataKey="time" name="Time (mins)" fill="#fbbf24" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-between items-center pt-4 mt-4 border-t border-gray-100">
                <button onClick={() => setWeekPage(p => Math.max(0, p - 1))} disabled={weekPage === 0} className="px-3 py-1 text-sm bg-gray-200 rounded-md disabled:opacity-50">Previous</button>
                <span className="text-sm text-gray-600">Week {weekPage + 1}</span>
                <button onClick={() => setWeekPage(p => Math.min(totalWeekPages - 1, p + 1))} disabled={weekPage >= totalWeekPages - 1} className="px-3 py-1 text-sm bg-gray-200 rounded-md disabled:opacity-50">Next</button>
            </div>
        </Card>
    );
};

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ strategyChallengesData, userInfo, setActivePage, onViewStrategyDetails }) => {
  const TABS = ['Daily', 'Strategies', 'Weekly', 'Monthly'];
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const [selectedDay, setSelectedDay] = useState<DayTotal | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const sections = {
    Daily: useRef<HTMLDivElement>(null),
    Strategies: useRef<HTMLDivElement>(null),
    Weekly: useRef<HTMLDivElement>(null),
    Monthly: useRef<HTMLDivElement>(null),
  };

  const handleDownloadReport = async () => {
    if (isDownloading) return;
    setIsDownloading(true);
    document.body.classList.add('is-exporting');
    await new Promise(resolve => setTimeout(resolve, 100));

    try {
        const { jsPDF } = jspdf;
        const pdf = new jsPDF('p', 'pt', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const margin = 40;
        const contentWidth = pdfWidth - margin * 2;

        const reportPages = [
            ['user-info-report', 'daily-stats-report'],
            ['daily-log-report', 'Strategies'],
            ['Weekly', 'monthly-calendar-report'],
            ['monthly-chart-report', 'top-activities-report']
        ];
        
        for (let i = 0; i < reportPages.length; i++) {
            if (i > 0) pdf.addPage();
            
            let yPos = margin;

            for (const id of reportPages[i]) {
                const element = document.getElementById(id);
                if (!element || (id === 'user-info-report' && !userInfo)) continue;
                
                const canvas = await html2canvas(element, { scale: 2, useCORS: true, logging: false });
                const imgHeight = (canvas.height * contentWidth) / canvas.width;

                if (yPos > margin && (yPos + imgHeight > pdfHeight - margin)) {
                    pdf.addPage();
                    yPos = margin;
                }

                pdf.addImage(canvas.toDataURL('image/png'), 'PNG', margin, yPos, contentWidth, imgHeight);
                yPos += imgHeight + 20;
            }
        }
        
        pdf.save('speechive-progress-report.pdf');

    } catch (error) {
        console.error("Failed to generate PDF:", error);
        alert("Sorry, there was an error creating the report.");
    } finally {
        document.body.classList.remove('is-exporting');
        setIsDownloading(false);
    }
  };

  const processedData = useMemo(() => {
    const dailyTotals: DayTotal[] = Array.from({ length: 30 }, (_, i) => ({
        day: i + 1,
        time: 0,
        completedActivities: [],
        completedCount: 0,
    }));

    const activityTimeMap = new Map<string, number>();

    strategyChallengesData.forEach(challenge => {
        challenge.challenge.forEach(dayData => {
            const dayIndex = dayData.day - 1;
            if (dayIndex >= 0 && dayIndex < 30) {
                dayData.activities.forEach(activity => {
                    if (activity.completed && activity.duration > 0) {
                        dailyTotals[dayIndex].time += activity.duration;
                        dailyTotals[dayIndex].completedCount++;
                        dailyTotals[dayIndex].completedActivities.push(activity);
                        
                        const currentTotal = activityTimeMap.get(activity.title) || 0;
                        activityTimeMap.set(activity.title, currentTotal + activity.duration);
                    }
                });
            }
        });
    });

    const topActivities = Array.from(activityTimeMap.entries())
        .sort(([, timeA], [, timeB]) => timeB - timeA)
        .slice(0, 5)
        .map(([name, time]) => ({
            name,
            time: parseFloat((time / 60).toFixed(1)),
        })).reverse();

    return { dailyTotals, topActivities };
  }, [strategyChallengesData]);

  const todaysCompletedActivities = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return strategyChallengesData
        .flatMap(challenge => 
            challenge.challenge.flatMap(day => 
                day.activities.map(activity => ({...activity, strategyType: challenge.type, strategyTitle: challenge.title }))
            )
        )
        .filter(activity => 
            activity.completed && activity.completionDate && 
            activity.completionDate >= today.getTime() && activity.completionDate < tomorrow.getTime()
        )
        .sort((a, b) => b.completionDate! - a.completionDate!);
  }, [strategyChallengesData]);

  const totalTimeToday = useMemo(() => todaysCompletedActivities.reduce((sum, act) => sum + (act.duration || 0), 0), [todaysCompletedActivities]);
  const honeyDropsEarnedToday = useMemo(() => todaysCompletedActivities.reduce((sum, act) => sum + (act.honeyDropsEarned || 0), 0), [todaysCompletedActivities]);
    
  const monthlyChartData = useMemo(() => {
    return processedData.dailyTotals.map(dayData => ({
        name: `${dayData.day}`,
        time: parseFloat((dayData.time / 60).toFixed(1)),
    }));
  }, [processedData.dailyTotals]);

  const getColorForCount = (count: number) => {
    if (count === 0) return 'bg-gray-100 text-gray-400';
    if (count === 1) return 'bg-amber-100 text-amber-700';
    if (count === 2) return 'bg-amber-200 text-amber-800';
    if (count === 3) return 'bg-amber-300 text-amber-900';
    if (count >= 4) return 'bg-amber-400 text-white';
    return 'bg-gray-100 text-gray-400';
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveTab(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -80% 0px', threshold: 0 }
    );

    Object.values(sections).forEach(ref => ref.current && observer.observe(ref.current));
    return () => Object.values(sections).forEach(ref => ref.current && observer.unobserve(ref.current));
  }, []);

  const handleTabClick = (tab: string) => {
    const sectionRef = sections[tab as keyof typeof sections];
    if (sectionRef.current) {
        sectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
        <div className="flex justify-between items-start">
            <div>
                <h2 className="text-2xl font-bold text-gray-800">Progress Dashboard</h2>
                <p className="text-gray-500">Your entire journey, all in one place.</p>
            </div>
            <button
              onClick={handleDownloadReport}
              disabled={isDownloading}
              className="flex items-center space-x-2 px-3 py-2 text-sm font-semibold text-gray-600 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-400 disabled:opacity-50"
            >
              {isDownloading ? <svg className="animate-spin h-4 w-4 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> : <i className="fas fa-file-download text-gray-500"></i>}
              <span>{isDownloading ? '...' : 'Report'}</span>
            </button>
        </div>

        <div>
            <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm py-2">
                <div className="flex justify-center space-x-2 p-1 bg-gray-100 rounded-full">
                    {TABS.map(tab => <ProgressTab key={tab} label={tab} isActive={activeTab === tab} onClick={() => handleTabClick(tab)} />)}
                </div>
            </div>
            
            <div className="space-y-10 pt-4">
                {userInfo && <UserInfoHeader userInfo={userInfo} />}

                <section id="Daily" ref={sections.Daily} className="scroll-mt-20">
                    <SectionHeader title="Today's Snapshot" subtitle="A summary of your activities today." />
                    <div id="daily-stats-report" className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <StatCard icon="fas fa-stopwatch" label="Total Time Today" value={formatSeconds(totalTimeToday)} className="md:col-span-1"/>
                        <StatCard icon="fas fa-tasks" label="Activities Completed" value={`${todaysCompletedActivities.length} Activities`} className="md:col-span-1"/>
                        <StatCard icon="fas fa-coins" label="Honey Drops Earned" value={`${honeyDropsEarnedToday} Drops`} className="md:col-span-1"/>
                    </div>
                    <div id="daily-log-report" className="mt-6">
                        <h4 className="text-lg font-bold text-gray-700 mb-3">Today's Activity Log</h4>
                        {todaysCompletedActivities.length > 0 ? (
                            <div className="space-y-3">
                                {todaysCompletedActivities.map((activity, index) => (
                                    <Card key={`${activity.id}-${index}`} className="flex items-center justify-between">
                                        <div className="flex flex-col items-start mr-2">
                                            <p className="font-semibold text-gray-700 break-words">{activity.title}</p>
                                            <span className="text-xs font-medium bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full mt-1">{activity.strategyTitle}</span>
                                        </div>
                                        <div className="text-right flex-shrink-0">
                                            <p className="font-bold text-amber-600">{formatSeconds(activity.duration)}</p>
                                            <p className="text-xs text-gray-500">Time Spent</p>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            <Card className="text-center p-8 bg-gray-50">
                                <i className="fas fa-seedling text-4xl text-green-300 mb-4"></i>
                                <h3 className="text-lg font-bold text-gray-700">No activities tracked for today.</h3>
                                <p className="text-gray-500 mt-1 mb-6">A little practice goes a long way!</p>
                                <button onClick={() => setActivePage(Page.Strategies)} className="px-6 py-2 bg-amber-400 text-white font-semibold rounded-lg shadow-sm hover:bg-amber-500 transition-colors">Start a Strategy Now!</button>
                            </Card>
                        )}
                    </div>
                </section>
                
                <section id="Strategies" ref={sections.Strategies} className="scroll-mt-20">
                    <SectionHeader title="Strategies Overview" subtitle="Track your time and progress in each category." />
                    <StrategiesSection strategyChallengesData={strategyChallengesData} onSelectStrategy={onViewStrategyDetails} />
                </section>

                <section id="Weekly" ref={sections.Weekly} className="scroll-mt-20">
                    <SectionHeader title="Weekly Performance" subtitle="Minutes spent on strategies each day." />
                    <WeeklySection dailyTotals={processedData.dailyTotals} />
                </section>

                <section id="Monthly" ref={sections.Monthly} className="scroll-mt-20 space-y-10">
                    <Card id="monthly-calendar-report" className="!p-4 md:!p-6">
                        <SectionHeader title="30-Day Calendar View" subtitle="See your consistency at a glance." />
                        <div className="grid grid-cols-7 gap-2 text-center">
                            {processedData.dailyTotals.map(dayData => (
                                <button key={dayData.day} onClick={() => setSelectedDay(dayData)} className={`w-10 h-10 flex items-center justify-center rounded-full font-semibold text-sm transition-transform duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 ${getColorForCount(dayData.completedCount)}`} aria-label={`View progress for Day ${dayData.day}`}>{dayData.day}</button>
                            ))}
                        </div>
                        <div className="flex justify-center items-center space-x-2 mt-4 text-xs text-gray-500">
                            <span>Less</span><div className="w-3 h-3 rounded-sm bg-gray-100"></div><div className="w-3 h-3 rounded-sm bg-amber-100"></div><div className="w-3 h-3 rounded-sm bg-amber-200"></div><div className="w-3 h-3 rounded-sm bg-amber-300"></div><div className="w-3 h-3 rounded-sm bg-amber-400"></div><span>More</span>
                        </div>
                    </Card>

                    <Card id="monthly-chart-report" className="!p-4 md:!p-6">
                        <SectionHeader title="Monthly Performance" subtitle="Total minutes spent across all 30 days." />
                        <div className="h-64"><ResponsiveContainer width="100%" height="100%"><BarChart data={monthlyChartData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}><CartesianGrid strokeDasharray="3 3" vertical={false} /><XAxis dataKey="name" tick={{ fill: '#6b7280', fontSize: 10 }} axisLine={false} tickLine={false} interval={1} /><YAxis tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={false} tickLine={false} unit="m" /><Tooltip cursor={{fill: 'rgba(251, 191, 36, 0.2)'}} contentStyle={{ backgroundColor: '#fff', border: '1px solid #f3f4f6', borderRadius: '0.5rem' }} /><Bar dataKey="time" name="Time (mins)" fill="#fbbf24" radius={[4, 4, 0, 0]} /></BarChart></ResponsiveContainer></div>
                    </Card>
                    
                    <Card id="top-activities-report" className="!p-4 md:!p-6">
                        <SectionHeader title="Top 5 Activities" subtitle="Your most practiced activities by time." />
                        <div className="h-72">
                            {processedData.topActivities.length > 0 ? <ResponsiveContainer width="100%" height="100%"><BarChart layout="vertical" data={processedData.topActivities} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}><CartesianGrid strokeDasharray="3 3" horizontal={false} /><XAxis type="number" unit="m" tick={{ fill: '#6b7280', fontSize: 12 }} /><YAxis type="category" dataKey="name" width={100} tick={{ fill: '#6b7280', fontSize: 12, width: 95 }} tickLine={false} axisLine={false} /><Tooltip cursor={{fill: 'rgba(251, 191, 36, 0.2)'}} contentStyle={{ backgroundColor: '#fff', border: '1px solid #f3f4f6', borderRadius: '0.5rem' }} /><Bar dataKey="time" name="Time (mins)" fill="#f59e0b" radius={[0, 4, 4, 0]} barSize={20} /></BarChart></ResponsiveContainer> : <div className="flex items-center justify-center h-full text-gray-500"><p>Complete some activities to see your top performers here!</p></div>}
                        </div>
                    </Card>
                </section>
            </div>
        </div>

      <Modal isOpen={!!selectedDay} onClose={() => setSelectedDay(null)}>
        {selectedDay && (
            <div className="p-4 max-h-[70vh] flex flex-col">
                <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Day {selectedDay.day} Summary</h3>
                <div className="flex-grow overflow-y-auto custom-scrollbar pr-2">
                    {selectedDay.completedActivities.length > 0 ? (
                        <div className="space-y-2">
                             <div className="flex justify-between items-center p-3 bg-amber-50 rounded-lg mb-4"><span className="font-semibold text-amber-800">Total Time</span><span className="font-bold text-amber-800 text-lg">{formatSeconds(selectedDay.time)}</span></div>
                            <h4 className="font-semibold text-gray-700 pb-1 border-b">Completed Activities:</h4>
                            <ul className="space-y-2">
                                {selectedDay.completedActivities.map((activity, index) => (
                                    <li key={`${activity.id}-${index}`} className="flex justify-between items-center p-2 bg-gray-50 rounded-md"><span className="text-sm text-gray-700 pr-2">{activity.title}</span><span className="font-semibold text-amber-600 text-sm whitespace-nowrap">{formatSeconds(activity.duration)}</span></li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <div className="text-center py-8"><i className="fas fa-moon text-4xl text-gray-300 mb-3"></i><p className="text-center text-gray-500">No activities were completed on this day.</p></div>
                    )}
                </div>
                <div className="mt-6 text-center flex-shrink-0"><button onClick={() => setSelectedDay(null)} className="w-full sm:w-auto px-8 py-2 bg-amber-400 text-white font-semibold rounded-lg shadow-sm hover:bg-amber-500 transition-colors">Close</button></div>
            </div>
        )}
    </Modal>
    </div>
  );
};

export default ProgressTracker;