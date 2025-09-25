
import React from 'react';
import { Page } from '../types';

const USEFUL_LINKS = [
    { 
        href: "https://www.hearinghouse.co.nz/", 
        icon: "fas fa-clinic-medical", 
        iconBg: "bg-sky-100", 
        iconColor: "text-sky-500", 
        title: "The Hearing House", 
        desc: "Supporting children with hearing loss." 
    },
    { 
        href: "https://www.whanautalk.com/", 
        icon: "fas fa-comments", 
        iconBg: "bg-rose-100", 
        iconColor: "text-rose-500", 
        title: "Whānau Talk", 
        desc: "Speech and language resources." 
    },
    { 
        href: "https://www.auckland.ac.nz/en/on-campus/our-services/health-wellbeing-safety/clinics/speech-language-therapy-clinic.html", 
        icon: "fas fa-university", 
        iconBg: "bg-indigo-100", 
        iconColor: "text-indigo-500", 
        title: "UoA Speech Clinic", 
        desc: "University of Auckland clinic services." 
    }
];


interface LinksPageProps {
    setActivePage: (page: Page) => void;
}

const LinksPage: React.FC<LinksPageProps> = ({ setActivePage }) => {
  return (
    <div className="space-y-8 animate-fadeIn">
        <div className="flex items-center space-x-4">
            <button onClick={() => setActivePage(Page.Resources)} className="text-gray-500 hover:text-amber-500 p-2 rounded-full hover:bg-gray-100 transition-colors" aria-label="Go back to resources">
                <i className="fas fa-arrow-left text-xl"></i>
            </button>
            <div>
                <h2 className="text-2xl font-bold text-gray-800">Useful Links</h2>
                <p className="text-gray-500">Trusted organizations for more support.</p>
            </div>
        </div>

        <div className="space-y-3">
            {USEFUL_LINKS.map(link => (
                <a key={link.title} href={link.href} target="_blank" rel="noopener noreferrer" className="flex items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200 hover:shadow-sm">
                    <div className={`w-12 h-12 flex-shrink-0 ${link.iconBg} rounded-lg flex items-center justify-center mr-4`}>
                        <i className={`${link.icon} ${link.iconColor} text-xl`}></i>
                    </div>
                    <div className="flex-grow">
                        <p className="font-semibold text-gray-800">{link.title}</p>
                        <p className="text-sm text-gray-500">{link.desc}</p>
                    </div>
                    <i className="fas fa-external-link-alt text-gray-400 ml-2"></i>
                </a>
            ))}
        </div>
    </div>
  );
};

export default LinksPage;