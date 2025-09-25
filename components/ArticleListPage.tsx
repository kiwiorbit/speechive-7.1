
import React from 'react';
import { Page, Article } from '../types';
import { ARTICLES } from '../constants';
import Card from './Card';

interface ArticleListPageProps {
    setActivePage: (page: Page) => void;
    onSelectArticle: (article: Article) => void;
}

const ArticleListPage: React.FC<ArticleListPageProps> = ({ setActivePage, onSelectArticle }) => {
  return (
    <div className="space-y-8 animate-fadeIn">
        <div className="flex items-center space-x-4">
            <button onClick={() => setActivePage(Page.Resources)} className="text-gray-500 hover:text-amber-500 p-2 rounded-full hover:bg-gray-100 transition-colors" aria-label="Go back to resources">
                <i className="fas fa-arrow-left text-xl"></i>
            </button>
            <div>
                <h2 className="text-2xl font-bold text-gray-800">Articles</h2>
                <p className="text-gray-500">Insights and tips for your journey.</p>
            </div>
        </div>
        
        <div className="space-y-4">
            {ARTICLES.map(article => (
                <Card key={article.id} onClick={() => onSelectArticle(article)} className="flex items-start space-x-4">
                    <img src={article.image} alt={article.title} className="w-20 h-20 object-cover rounded-lg flex-shrink-0" />
                    <div className="flex-grow">
                        <h3 className="font-bold text-gray-800">{article.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{article.summary}</p>
                    </div>
                </Card>
            ))}
        </div>
    </div>
  );
};

export default ArticleListPage;
