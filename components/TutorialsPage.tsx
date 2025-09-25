
import React from 'react';
import { Page } from '../types';
import Card from './Card';

const getYouTubeThumbnail = (videoId: string) => `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;

const TUTORIALS = [
  { id: 'U0xEPS-AxpY', title: 'Turn-Taking Games' },
  { id: 'DOtGK0odCYg', title: 'Speech Therapy Games' },
];

interface TutorialsPageProps {
    setActivePage: (page: Page) => void;
    onPlayVideo: (videoId: string) => void;
}

const TutorialsPage: React.FC<TutorialsPageProps> = ({ setActivePage, onPlayVideo }) => {
  return (
    <div className="space-y-8 animate-fadeIn">
        <div className="flex items-center space-x-4">
            <button onClick={() => setActivePage(Page.Resources)} className="text-gray-500 hover:text-amber-500 p-2 rounded-full hover:bg-gray-100 transition-colors" aria-label="Go back to resources">
                <i className="fas fa-arrow-left text-xl"></i>
            </button>
            <div>
                <h2 className="text-2xl font-bold text-gray-800">Video Tutorials</h2>
                <p className="text-gray-500">Practical tips and game ideas.</p>
            </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
            {TUTORIALS.map(tutorial => (
                <button key={tutorial.id} onClick={() => onPlayVideo(tutorial.id)} className="w-full text-left focus:outline-none focus:ring-2 focus:ring-amber-500 rounded-xl">
                    <Card className="p-0 overflow-hidden h-full">
                         <div className="relative">
                            <img src={getYouTubeThumbnail(tutorial.id)} alt={`${tutorial.title} video thumbnail`} className="w-full h-24 object-cover"/>
                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                <div className="w-10 h-10 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center">
                                    <i className="fas fa-play text-white text-xl pl-1"></i>
                                </div>
                            </div>
                        </div>
                        <div className="p-3">
                             <h5 className="font-semibold text-gray-800 text-sm">{tutorial.title}</h5>
                        </div>
                    </Card>
                </button>
            ))}
        </div>
    </div>
  );
};

export default TutorialsPage;