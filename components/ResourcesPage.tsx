
import React from 'react';
import { Page } from '../types';
import Card from './Card';

interface ResourcesPageProps {
    setActivePage: (page: Page) => void;
}

const ResourceCard: React.FC<{
    icon: string;
    iconBgColor: string;
    iconColor: string;
    title: string;
    description: string;
    onClick: () => void;
}> = ({ icon, iconBgColor, iconColor, title, description, onClick }) => (
    <Card onClick={onClick} className="text-center !p-4 flex flex-col items-center justify-center h-full">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${iconBgColor} mb-3`}>
            <i className={`${icon} ${iconColor} text-2xl`}></i>
        </div>
        <h3 className="font-bold text-base text-gray-800">{title}</h3>
        <p className="text-xs text-gray-500 mt-1">{description}</p>
    </Card>
);

const ResourcesPage: React.FC<ResourcesPageProps> = ({ setActivePage }) => {
    const resources = [
        {
            page: Page.ArticleList,
            icon: "fas fa-newspaper",
            iconBgColor: "bg-sky-100",
            iconColor: "text-sky-500",
            title: "Read Articles",
            description: "Insights and tips for development.",
        },
        {
            page: Page.Tutorials,
            icon: "fas fa-video",
            iconBgColor: "bg-rose-100",
            iconColor: "text-rose-500",
            title: "Watch Tutorials",
            description: "Engaging videos with practical games.",
        },
        {
            page: Page.Links,
            icon: "fas fa-link",
            iconBgColor: "bg-green-100",
            iconColor: "text-green-500",
            title: "Useful Links",
            description: "Trusted organizations for support.",
        },
        {
            page: Page.Help,
            icon: "fas fa-question-circle",
            iconBgColor: "bg-gray-100",
            iconColor: "text-gray-500",
            title: "Help & Settings",
            description: "FAQs and app management.",
        }
    ];

  return (
    <div className="space-y-8 animate-fadeIn">
        <div className="flex items-center space-x-4">
            <button onClick={() => setActivePage(Page.Dashboard)} className="text-gray-500 hover:text-amber-500 p-2 rounded-full hover:bg-gray-100 transition-colors" aria-label="Go back to dashboard">
                <i className="fas fa-arrow-left text-xl"></i>
            </button>
            <div>
                <h2 className="text-2xl font-bold text-gray-800">Resources</h2>
                <p className="text-gray-500">Curated content to help you on your journey.</p>
            </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
            {resources.map(resource => (
                 <ResourceCard 
                    key={resource.page}
                    icon={resource.icon}
                    iconBgColor={resource.iconBgColor}
                    iconColor={resource.iconColor}
                    title={resource.title}
                    description={resource.description}
                    onClick={() => setActivePage(resource.page)}
                />
            ))}
        </div>
    </div>
  );
};

export default ResourcesPage;