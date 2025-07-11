
import React, { useState, useMemo } from 'react';
import { resources, categories } from '../data/resources';
import { ResourceLink } from '../types';

const ExternalLinkIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 ml-1.5 opacity-70">
        <path d="M12.232 4.232a2.5 2.5 0 013.536 3.536l-1.225 1.224a.75.75 0 001.061 1.06l1.224-1.224a4 4 0 00-5.656-5.656l-3 3a4 4 0 00.225 5.865.75.75 0 00.977-1.138 2.5 2.5 0 01-.142-3.667l3-3z" />
        <path d="M11.603 7.963a.75.75 0 00-.977 1.138 2.5 2.5 0 01.142 3.667l-3 3a2.5 2.5 0 01-3.536-3.536l1.225-1.224a.75.75 0 00-1.061-1.06l-1.224 1.224a4 4 0 105.656 5.656l3-3a4 4 0 00-.225-5.865z" />
    </svg>
);


const ResourceCard: React.FC<{ resource: ResourceLink }> = ({ resource }) => (
    <a
        href={resource.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block bg-slate-800 p-5 rounded-xl shadow-lg border border-slate-700 h-full transform transition-all duration-300 hover:-translate-y-1.5 hover:border-sky-500/50 hover:shadow-sky-500/10 group"
    >
        <div className="flex flex-col justify-between h-full">
            <div>
                <span className="text-xs font-semibold bg-sky-500/20 text-sky-300 px-3 py-1 rounded-full border border-sky-500/30">
                    {resource.category}
                </span>
                <h4 className="text-md font-bold text-slate-100 mt-3 group-hover:text-sky-400 transition-colors">
                    {resource.title}
                </h4>
            </div>
            <div className="mt-4 flex items-center text-sm font-medium text-slate-400 group-hover:text-white transition-colors">
                Read Article
                <ExternalLinkIcon />
            </div>
        </div>
    </a>
);


const Resources: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');

    const filteredResources = useMemo(() => {
        return resources
            .filter(resource => activeCategory === 'All' || resource.category === activeCategory)
            .filter(resource => resource.title.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [searchTerm, activeCategory]);

    return (
        <div className="space-y-8 animate-slide-in">
            <div>
                <h3 className="text-2xl font-bold text-white">Knowledge Base & Resources</h3>
                <p className="mt-2 text-slate-400 max-w-2xl">
                    Explore our curated library of articles from <a href="https://affiliatemarketingforsuccess.com" target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:underline font-semibold">affiliatemarketingforsuccess.com</a>. Find expert insights on SEO, AI, content strategy, and more to elevate your affiliate game.
                </p>
            </div>

            <div className="sticky top-[85px] z-10 bg-slate-800/50 backdrop-blur-md p-4 rounded-xl border border-slate-700/50">
                 <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-grow">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        <input
                            type="text"
                            placeholder="Search articles..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-slate-900/80 border border-slate-700 rounded-lg p-2.5 pl-10 text-slate-300 placeholder-slate-500 focus:ring-2 focus:ring-sky-500 focus:outline-none transition-all duration-300"
                        />
                    </div>
                 </div>
                 <div className="mt-3 flex flex-wrap gap-2">
                    <button
                        onClick={() => setActiveCategory('All')}
                        className={`px-3 py-1 text-sm font-medium rounded-full transition-colors ${activeCategory === 'All' ? 'bg-sky-600 text-white' : 'text-slate-300 bg-slate-700 hover:bg-slate-600'}`}
                    >
                        All
                    </button>
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`px-3 py-1 text-sm font-medium rounded-full transition-colors ${activeCategory === category ? 'bg-sky-600 text-white' : 'text-slate-300 bg-slate-700 hover:bg-slate-600'}`}
                        >
                            {category}
                        </button>
                    ))}
                 </div>
            </div>
            
            {filteredResources.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredResources.map(resource => (
                        <ResourceCard key={resource.url} resource={resource} />
                    ))}
                </div>
            ) : (
                 <div className="text-center py-16">
                    <h4 className="text-lg font-semibold text-white">No results found</h4>
                    <p className="text-slate-400 mt-2">Try adjusting your search or category filter.</p>
                </div>
            )}

        </div>
    );
};

export default Resources;
