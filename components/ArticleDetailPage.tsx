
import React from 'react';
import { Page, Article } from '../types';

interface ArticleDetailPageProps {
    article: Article;
    setActivePage: (page: Page) => void;
}

const ArticleDetailPage: React.FC<ArticleDetailPageProps> = ({ article, setActivePage }) => {
  return (
    <div className="animate-fadeIn">
        <div className="flex items-center space-x-4 mb-6">
            <button onClick={() => setActivePage(Page.ArticleList)} className="text-gray-500 hover:text-amber-500 p-2 rounded-full hover:bg-gray-100 transition-colors" aria-label="Go back to articles list">
                <i className="fas fa-arrow-left text-xl"></i>
            </button>
        </div>

        <img src={article.image} alt={article.title} className="w-full h-48 object-cover rounded-xl mb-6"/>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{article.title}</h1>
        
        <div className="article-content">
            {article.content.map((item, index) => {
                if (item.type === 'heading') {
                    return <h3 key={index}>{item.text}</h3>;
                }
                return <p key={index}>{item.text}</p>;
            })}
        </div>
    </div>
  );
};

export default ArticleDetailPage;
