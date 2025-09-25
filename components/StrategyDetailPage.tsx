import React, { useMemo, useRef, useState } from 'react';
import { Page, StrategyChallenge } from '../types';
import Card from './Card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

declare var html2canvas: any;
declare var jspdf: any;

interface StrategyDetailPageProps {
  challenge: StrategyChallenge;
  setActivePage: (page: Page) => void;
}

const formatSeconds = (seconds: number): string => {
    if (!seconds || seconds < 0) return '0s';
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    if (remainingSeconds === 0) return `${minutes}m`;
    return `${minutes}m ${remainingSeconds}s`;
};

const StatCard: React.FC<{ icon: string; label: string; value: string; subValue?: string; fullWidth?: boolean }> = ({ icon, label, value, subValue, fullWidth = false }) => (
    <Card className={`flex items-center space-x-4 !p-3 ${fullWidth ? 'col-span-2' : ''}`}>
        <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
            <i className={`${icon} text-amber-500 text-xl`}></i>
        </div>
        <div className="overflow-hidden">
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">{label}</p>
            <p className="font-bold text-gray-800 text-lg leading-tight truncate">{value}</p>
            {subValue && <p className="text-xs text-gray-500">{subValue}</p>}
        </div>
    </Card>
);

const StrategyDetailPage: React.FC<StrategyDetailPageProps> = ({ challenge, setActivePage }) => {
  const reportRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async (type: 'pdf' | 'image' | 'share') => {
      if (!reportRef.current || isExporting) return;
      
      setIsExporting(true);
      document.body.classList.add('is-exporting');
      // Brief delay to allow browser to apply the style change and disable animations
      await new Promise(resolve => setTimeout(resolve, 100));

      try {
          const canvas = await html2canvas(reportRef.current, { scale: 2, useCORS: true, logging: false });
          const imgDataUrl = canvas.toDataURL('image/png', 1.0);

          if (type === 'pdf') {
              const { jsPDF } = jspdf;
              const pdf = new jsPDF({ orientation: 'portrait', unit: 'px', format: [canvas.width, canvas.height] });
              pdf.addImage(imgDataUrl, 'PNG', 0, 0, canvas.width, canvas.height);
              pdf.save(`${challenge.title}-progress.pdf`);
          } else if (type === 'image') {
              const link = document.createElement('a');
              link.href = imgDataUrl;
              link.download = `${challenge.title}-progress.png`;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
          } else if (type === 'share') {
              if (navigator.share) {
                  const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
                  const file = new File([blob as Blob], `${challenge.title}-progress.png`, { type: 'image/png' });
                  await navigator.share({
                      title: `${challenge.title} Progress`,
                      text: `Here's my progress on the ${challenge.title} strategy in the Speechive app!`,
                      files: [file],
                  });
              } else {
                  alert('Sharing is not supported on this browser. Try downloading the image instead.');
              }
          }
      } catch (error) {
          console.error("Export failed:", error);
          alert("Sorry, there was an error creating the export.");
      } finally {
          document.body.classList.remove('is-exporting');
          setIsExporting(false);
      }
  };


  const stats = useMemo(() => {
      const allActivities = challenge.challenge.flatMap(day => day.activities);
      const completedActivities = allActivities.filter(a => a.completed && a.duration > 0);

      const totalSessions = completedActivities.length;
      const totalTimeSeconds = completedActivities.reduce((acc, activity) => acc + (activity.duration || 0), 0);
      const averageTimeSeconds = totalSessions > 0 ? Math.round(totalTimeSeconds / totalSessions) : 0;

      const mostPracticedActivity = completedActivities.length > 0
          ? completedActivities.reduce((most, current) => ((current.duration || 0) > (most.duration || 0) ? current : most))
          : null;

      const activityLog = completedActivities
          .map(activity => {
              const dayData = challenge.challenge.find(d => d.activities.some(a => a.id === activity.id));
              return { ...activity, day: dayData?.day || 0 };
          })
          .sort((a, b) => (b.completionDate || 0) - (a.completionDate || 0));
        
      const activityTimeMap = new Map<string, number>();
      completedActivities.forEach(activity => {
          const currentTotal = activityTimeMap.get(activity.title) || 0;
          activityTimeMap.set(activity.title, currentTotal + (activity.duration || 0));
      });

      const topActivities = Array.from(activityTimeMap.entries())
          .sort(([, timeA], [, timeB]) => timeB - timeA)
          .slice(0, 5)
          .map(([name, time]) => ({
              name,
              time: parseFloat((time / 60).toFixed(1)),
          })).reverse(); // Reverse for horizontal bar chart display

      return { totalSessions, totalTimeSeconds, averageTimeSeconds, mostPracticedActivity, activityLog, topActivities };
  }, [challenge]);

  return (
      <div className="space-y-6 animate-fadeIn">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
                <button onClick={() => setActivePage(Page.Progress)} className="text-gray-500 hover:text-amber-500 p-2 rounded-full hover:bg-gray-100 transition-colors" aria-label="Go back to progress dashboard">
                    <i className="fas fa-arrow-left text-xl"></i>
                </button>
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">{challenge.title}</h2>
                    <p className="text-gray-500">Progress Details</p>
                </div>
            </div>
          </div>
          
          <div className="flex items-center justify-center space-x-2 p-1 bg-gray-100 rounded-full">
            <button onClick={() => handleExport('pdf')} disabled={isExporting} className="flex-1 text-center py-2 px-3 text-sm font-semibold text-gray-600 bg-white rounded-full shadow-sm hover:bg-gray-50 disabled:opacity-50"><i className="fas fa-file-pdf mr-2 text-rose-500"></i>PDF</button>
            <button onClick={() => handleExport('image')} disabled={isExporting} className="flex-1 text-center py-2 px-3 text-sm font-semibold text-gray-600 bg-white rounded-full shadow-sm hover:bg-gray-50 disabled:opacity-50"><i className="fas fa-camera mr-2 text-sky-500"></i>Image</button>
            <button onClick={() => handleExport('share')} disabled={isExporting} className="flex-1 text-center py-2 px-3 text-sm font-semibold text-gray-600 bg-white rounded-full shadow-sm hover:bg-gray-50 disabled:opacity-50"><i className="fas fa-share-alt mr-2 text-green-500"></i>Share</button>
          </div>

          <div ref={reportRef} className="p-2 bg-white rounded-lg">
            <div>
                <h3 className="text-xl font-bold text-gray-700 mb-3">Summary Stats</h3>
                <div className="grid grid-cols-2 gap-3">
                    <StatCard icon="fas fa-play-circle" label="Total Sessions" value={String(stats.totalSessions)} />
                    <StatCard icon="fas fa-stopwatch" label="Average Time" value={formatSeconds(stats.averageTimeSeconds)} />
                    {stats.mostPracticedActivity && (
                        <StatCard 
                            icon="fas fa-star" 
                            label="Most Practiced" 
                            value={stats.mostPracticedActivity.title} 
                            subValue={`Total: ${formatSeconds(stats.mostPracticedActivity.duration)}`}
                            fullWidth
                        />
                    )}
                    <StatCard icon="fas fa-clock" label="Total Time" value={formatSeconds(stats.totalTimeSeconds)} fullWidth />
                </div>
            </div>

            <div className="mt-6">
                <h3 className="text-xl font-bold text-gray-700 mb-3">Activity Log</h3>
                {stats.activityLog.length > 0 ? (
                    <div className="space-y-3">
                        {stats.activityLog.map(activity => (
                            <Card key={activity.id} className="flex items-center justify-between !p-4">
                                <div>
                                    <p className="font-semibold text-gray-700">{activity.title}</p>
                                    <p className="text-sm text-gray-500">Completed on Day {activity.day}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-xl text-amber-600">{formatSeconds(activity.duration)}</p>
                                    <p className="text-xs text-gray-500">Time Spent</p>
                                </div>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <Card className="text-center p-6 bg-gray-50">
                        <p className="text-gray-500">No activities completed for this strategy yet.</p>
                    </Card>
                )}
            </div>
            
            <div className="mt-6">
                <h3 className="text-xl font-bold text-gray-700 mb-3">Top Activities</h3>
                <Card className="!p-4 h-72">
                    {stats.topActivities.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart layout="vertical" data={stats.topActivities} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                                <XAxis type="number" unit="m" tick={{ fill: '#6b7280', fontSize: 12 }} />
                                <YAxis type="category" dataKey="name" width={100} tick={{ fill: '#6b7280', fontSize: 12, width: 95 }} tickLine={false} axisLine={false} />
                                <Tooltip cursor={{fill: 'rgba(251, 191, 36, 0.2)'}} contentStyle={{ backgroundColor: '#fff', border: '1px solid #f3f4f6', borderRadius: '0.5rem' }} />
                                <Bar dataKey="time" name="Time (mins)" fill="#f59e0b" radius={[0, 4, 4, 0]} barSize={20} />
                            </BarChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="flex items-center justify-center h-full text-gray-500">
                            <p>Complete activities to see your top performers here.</p>
                        </div>
                    )}
                </Card>
            </div>
          </div>
      </div>
  );
};
export default StrategyDetailPage;