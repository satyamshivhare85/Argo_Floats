import React, { useState, useEffect, useMemo } from 'react';

// --- SVG ICONS ---
const FilterIcon = ({ className = 'w-6 h-6' }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
);
const CalendarIcon = ({ className = 'w-6 h-6' }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
);
const GlobeIcon = ({ className = 'w-6 h-6' }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
);
const LayersIcon = ({ className = 'w-6 h-6' }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
);
const SlidersHorizontalIcon = ({ className = 'w-6 h-6' }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="21" x2="3" y1="10" y2="10"></line><line x1="21" x2="3" y1="6" y2="6"></line><line x1="21" x2="3" y1="14" y2="14"></line><line x1="21" x2="3" y1="18" y2="18"></line></svg>
);
const SunIcon = ({ className = 'w-6 h-6' }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
);
const MoonIcon = ({ className = 'w-6 h-6' }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
);
const ChevronDownIcon = ({ className = 'w-6 h-6' }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
);
const ActivityIcon = ({ className = 'w-6 h-6' }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
);
const AlertTriangleIcon = ({ className = 'w-6 h-6' }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
);


// --- UI COMPONENTS ---
const KpiCard = ({ icon, title, value, change, changeType }) => (
    <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-white/20 dark:border-slate-700/50 rounded-2xl p-4 flex items-start justify-between transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
        <div className="flex flex-col">
            <div className="flex items-center text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">
                {icon}
                <span className="ml-2">{title}</span>
            </div>
            <p className="text-3xl font-bold text-slate-900 dark:text-white">{value}</p>
        </div>
        <div className={`text-sm font-semibold flex items-center px-2 py-1 rounded-full ${changeType === 'increase' ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400' : 'bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400'}`}>
            {change}
        </div>
    </div>
);

const FilterSection = ({ title, icon, children }) => {
    const [isOpen, setIsOpen] = useState(true);
    return (
        <div className="py-4">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center justify-between text-md font-semibold text-slate-800 dark:text-slate-200 focus:outline-none">
                <span className="flex items-center">
                    {icon}
                    <span className="ml-3">{title}</span>
                </span>
                <ChevronDownIcon className={`w-5 h-5 text-slate-400 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 pt-4' : 'max-h-0'}`}>
                {children}
            </div>
        </div>
    );
};

const FilterSidebar = ({ filters, setFilters }) => {
    const handleProfileChange = (profile) => {
        const newProfiles = filters.profiles.includes(profile)
            ? filters.profiles.filter((p) => p !== profile)
            : [...filters.profiles, profile];
        setFilters({ ...filters, profiles: newProfiles });
    };
    
    const profileOptions = ["Temperature", "Salinity", "Pressure", "Density", "Chlorophyll"];

    return (
        <aside className="w-full lg:w-80 xl:w-96 bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border border-white/20 dark:border-slate-700/50 p-6 rounded-2xl shadow-2xl flex-shrink-0 transition-colors duration-300">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center">
                <FilterIcon className="w-6 h-6 mr-3 text-indigo-500" />
                Data Filters
            </h2>
            <div className="divide-y divide-slate-200 dark:divide-slate-700">
                 <FilterSection title="Date Range" icon={<CalendarIcon className="w-5 h-5 text-slate-500" />}>
                    <div className="space-y-3">
                        <div>
                            <label className="text-xs text-slate-500 dark:text-slate-400 block mb-1">From</label>
                            <input type="date" className="w-full bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-white rounded-lg border-transparent focus:ring-2 focus:ring-indigo-500 p-2 text-sm" value={filters.dateFrom} onChange={e => setFilters({...filters, dateFrom: e.target.value})} />
                        </div>
                        <div>
                            <label className="text-xs text-slate-500 dark:text-slate-400 block mb-1">To</label>
                            <input type="date" className="w-full bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-white rounded-lg border-transparent focus:ring-2 focus:ring-indigo-500 p-2 text-sm" value={filters.dateTo} onChange={e => setFilters({...filters, dateTo: e.target.value})} />
                        </div>
                    </div>
                </FilterSection>
                <FilterSection title="Profile" icon={<SlidersHorizontalIcon className="w-5 h-5 text-slate-500" />}>
                    <div className="space-y-2">
                        {profileOptions.map((profile, index) => (
                            <label key={profile} className="flex items-center space-x-3 text-sm text-slate-600 dark:text-slate-300 cursor-pointer p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors" style={{ animation: `fadeInUp 0.5s ease ${index * 0.05}s forwards`, opacity: 0 }}>
                                <input 
                                    type="checkbox" 
                                    className="h-4 w-4 rounded-md bg-slate-200 dark:bg-slate-600 border-transparent text-indigo-500 focus:ring-indigo-600"
                                    checked={filters.profiles.includes(profile)}
                                    onChange={() => handleProfileChange(profile)}
                                />
                                <span>{profile}</span>
                            </label>
                        ))}
                    </div>
                </FilterSection>
                <FilterSection title="Region" icon={<GlobeIcon className="w-5 h-5 text-slate-500" />}>
                    <select className="w-full bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-white rounded-lg border-transparent focus:ring-2 focus:ring-indigo-500 p-2 text-sm" value={filters.region} onChange={e => setFilters({...filters, region: e.target.value})}>
                        <option>Indian Ocean</option>
                        <option>Atlantic Ocean</option>
                        <option>Pacific Ocean</option>
                        <option>Arctic Ocean</option>
                        <option>Southern Ocean</option>
                    </select>
                </FilterSection>
                <FilterSection title="Comparison" icon={<LayersIcon className="w-5 h-5 text-slate-500" />}>
                    <select className="w-full bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-white rounded-lg border-transparent focus:ring-2 focus:ring-indigo-500 p-2 text-sm" value={filters.comparison} onChange={e => setFilters({...filters, comparison: e.target.value})}>
                        <option>None</option>
                        <option>Previous Year</option>
                        <option>5-Year Average</option>
                        <option>Region vs Global</option>
                    </select>
                </FilterSection>
            </div>
            <button className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-indigo-500/50 transform hover:-translate-y-0.5 mt-6">
                Apply Filters
            </button>
        </aside>
    );
};

const DataVisualizationContainer = ({ title, children, filters }) => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(timer);
    }, [filters]);

    return (
        <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border border-white/20 dark:border-slate-700/50 p-6 rounded-2xl shadow-2xl w-full h-full flex flex-col transition-colors duration-300">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                {title}
            </h3>
            {loading ? (
                <div className="flex-grow animate-pulse">
                    <div className="w-full h-full bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
                </div>
            ) : (
                <div className="flex-grow">{children}</div>
            )}
        </div>
    );
};

const HeatmapVisualization = ({ filters }) => {
    const gradientColors = ['#4f46e5', '#6366f1', '#818cf8', '#a5b4fc', '#c7d2fe', '#fecaca', '#f87171', '#ef4444', '#dc2626'];
    const grid = useMemo(() => Array.from({ length: 15 }, () => Array.from({ length: 30 }, () => Math.random())), [filters]);
    
    if (filters.profiles.length === 0) {
        return <div className="flex items-center justify-center h-full text-slate-500">Please select a profile to view data.</div>;
    }
    
    return (
        <DataVisualizationContainer title={`${filters.profiles[0] || 'Data'} Heatmap for ${filters.region}`} filters={filters}>
            <div className="flex-grow grid grid-cols-30 gap-1">
                {grid.flat().map((value, i) => (
                    <div
                        key={i}
                        className="w-full h-full rounded-sm transform transition-all duration-300 hover:scale-125 hover:z-10"
                        style={{ 
                            backgroundColor: gradientColors[Math.floor(value * gradientColors.length)],
                            opacity: 0,
                            animation: `fadeIn 0.5s ease ${i * 0.002}s forwards`
                        }}
                        title={`Value: ${value.toFixed(2)}`}
                    ></div>
                ))}
            </div>
            <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400 mt-2">
                <span>Low</span>
                <div className="flex-grow flex items-center mx-2">
                    <div className="w-full h-2 rounded-full" style={{ background: `linear-gradient(to right, ${gradientColors.join(',')})`}}></div>
                </div>
                <span>High</span>
            </div>
        </DataVisualizationContainer>
    );
};

const PredictionChart = ({ filters }) => {
    const generatePath = (offset, amplitude) => {
        let path = "M 0 100 ";
        for(let i = 1; i <= 20; i++) {
            const y = 100 - (Math.sin(i / 3 + offset) * amplitude + Math.random() * 15 + 30);
            const x = (i / 20) * 300;
            path += ` L ${x} ${y}`;
        }
        return path;
    }
    const dataPath = useMemo(() => generatePath(0, 30), [filters]);
    const comparisonPath = useMemo(() => generatePath(1.5, 20), [filters]);

    if (filters.profiles.length === 0) {
        return <div className="flex items-center justify-center h-full text-slate-500">Please select a profile to predict data.</div>;
    }
    
    return (
        <DataVisualizationContainer title={`Next 12-Month Prediction: ${filters.profiles[0] || 'Data'}`} filters={filters}>
            <div className="flex-grow flex items-center justify-center">
                <svg viewBox="0 0 300 120" className="w-full h-full">
                    <defs>
                        <linearGradient id="predictionGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    <line x1="0" y1="0" x2="0" y2="100" stroke="currentColor" className="text-slate-200 dark:text-slate-700" strokeWidth="0.5" />
                    <line x1="0" y1="50" x2="300" y2="50" stroke="currentColor" className="text-slate-200 dark:text-slate-700" strokeWidth="0.5" strokeDasharray="2" />
                    <line x1="0" y1="100" x2="300" y2="100" stroke="currentColor" className="text-slate-300 dark:text-slate-600" strokeWidth="0.5" />
                    {filters.comparison !== 'None' && <path d={comparisonPath} fill="none" stroke="#a5b4fc" strokeWidth="2" className="animate-draw" style={{ animationDelay: '0.5s' }} />}
                    <path d={`${dataPath} L 300 100 L 0 100 Z`} fill="url(#predictionGradient)" />
                    <path d={dataPath} fill="none" stroke="#4f46e5" strokeWidth="2.5" className="animate-draw" />
                    <text x="-5" y="8" fill="currentColor" className="text-slate-500 dark:text-slate-400" fontSize="8" textAnchor="end">High</text>
                    <text x="-5" y="104" fill="currentColor" className="text-slate-500 dark:text-slate-400" fontSize="8" textAnchor="end">Low</text>
                    <text x="0" y="115" fill="currentColor" className="text-slate-500 dark:text-slate-400" fontSize="8">Now</text>
                    <text x="280" y="115" fill="currentColor" className="text-slate-500 dark:text-slate-400" fontSize="8">+12 Mo</text>
                </svg>
            </div>
            <div className="flex items-center justify-end space-x-4 text-xs mt-2 text-slate-500 dark:text-slate-400">
                <div className="flex items-center"><span className="w-3 h-0.5 bg-indigo-600 mr-2"></span> Prediction</div>
                {filters.comparison !== 'None' && <div className="flex items-center"><span className="w-3 h-0.5 bg-indigo-300 mr-2"></span> Comparison</div>}
            </div>
        </DataVisualizationContainer>
    );
};

const HistoricalDashboard = () => {
    const [filters, setFilters] = useState({
        dateFrom: '2023-01-01',
        dateTo: '2023-12-31',
        profiles: ['Temperature'],
        region: 'Pacific Ocean',
        comparison: 'Previous Year'
    });
    return (
        <div className="flex flex-col lg:flex-row gap-6 h-full">
            <FilterSidebar filters={filters} setFilters={setFilters} />
            <main className="flex-grow">
                <HeatmapVisualization filters={filters} />
            </main>
        </div>
    );
};

const PredictionDashboard = () => {
    const [filters, setFilters] = useState({
        dateFrom: '2024-01-01',
        dateTo: '2024-12-31',
        profiles: ['Salinity'],
        region: 'Atlantic Ocean',
        comparison: 'None'
    });
    return (
        <div className="flex flex-col lg:flex-row gap-6 h-full">
            <FilterSidebar filters={filters} setFilters={setFilters} />
            <main className="flex-grow">
                <PredictionChart filters={filters} />
            </main>
        </div>
    );
};


// --- Main Dashboard Component ---
export default function App() {
    const [activeTab, setActiveTab] = useState('historical');
    const [theme, setTheme] = useState('dark');

    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    const TabButton = ({ tabName, title }) => (
        <button
            onClick={() => setActiveTab(tabName)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-300 relative focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 dark:focus-visible:ring-offset-slate-900 ${
                activeTab !== tabName && 'text-slate-500 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
        >
            {activeTab === tabName && (
                <span className="absolute inset-0 bg-white dark:bg-slate-700 rounded-lg shadow-md" style={{animation: 'tab-change 0.3s ease-out'}}></span>
            )}
            <span className="relative z-10 font-semibold">{title}</span>
        </button>
    );

    const kpiData = {
        historical: [
            { id: 1, icon: <ActivityIcon className="w-5 h-5"/>, title: "Avg. Temp", value: "18.2°C", change: "+1.1%", changeType: 'increase' },
            { id: 2, icon: <LayersIcon className="w-5 h-5"/>, title: "Peak Salinity", value: "35.4 psu", change: "-0.2%", changeType: 'decrease' },
            { id: 3, icon: <AlertTriangleIcon className="w-5 h-5"/>, title: "Anomalies", value: "12", change: "+3", changeType: 'increase' },
        ],
        prediction: [
            { id: 1, icon: <ActivityIcon className="w-5 h-5"/>, title: "Predicted Temp", value: "19.5°C", change: "+1.3°C", changeType: 'increase' },
            { id: 2, icon: <LayersIcon className="w-5 h-5"/>, title: "Salinity Change", value: "-0.8 psu", change: "-2.2%", changeType: 'decrease' },
            { id: 3, icon: <AlertTriangleIcon className="w-5 h-5"/>, title: "Confidence", value: "88%", change: "High", changeType: 'increase' },
        ],
    };

    return (
        <div className="bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white font-sans py-12 relative">
             <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
                <div className="absolute -top-1/2 -left-12 w-[200%] h-[200%] bg-gradient-radial from-indigo-200/40 dark:from-indigo-900/40 via-transparent to-transparent animate-spin-slow"></div>
            </div>
            
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="text-center p-3 mb-6 bg-indigo-100/50 dark:bg-indigo-900/20 text-indigo-800 dark:text-indigo-200 rounded-xl border border-indigo-200/50 dark:border-indigo-800/50 backdrop-blur-sm shadow-sm">
                    <p className="text-sm font-medium">Please note: This is a demonstration of upcoming dashboard functionality. Data is procedurally generated.</p>
                </div>
                <header className="mb-8 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">Oceanographic Dashboard</h1>
                        <p className="text-slate-500 dark:text-slate-400 mt-1">Visualize historical trends and future predictions.</p>
                    </div>
                    <button onClick={toggleTheme} className="p-2 rounded-full bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-white/20 dark:border-slate-700/50 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500">
                        {theme === 'light' ? <MoonIcon className="w-6 h-6"/> : <SunIcon className="w-6 h-6"/>}
                    </button>
                </header>
                <nav className="mb-6 flex items-center space-x-2 bg-slate-200/50 dark:bg-slate-800/50 backdrop-blur-sm border border-white/20 dark:border-slate-700/50 p-1.5 rounded-xl max-w-md shadow-md transition-colors duration-300">
                    <TabButton tabName="historical" title="Historical Analysis" />
                    <TabButton tabName="prediction" title="Future Prediction" />
                </nav>
                <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {kpiData[activeTab].map((item, index) => (
                         <div key={item.id} style={{ animation: `fadeInUp 0.5s ease ${index * 0.1}s forwards`, opacity: 0 }}>
                            <KpiCard {...item} />
                        </div>
                    ))}
                </div>
                <div className="w-full h-full">
                    {activeTab === 'historical' ? <HistoricalDashboard /> : <PredictionDashboard />}
                </div>
            </div>
            <style jsx>{`
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-spin-slow { animation: spin-slow 20s linear infinite; }
                @keyframes tab-change {
                    from { transform: scale(0.9); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
                @keyframes fadeIn { to { opacity: 1; } }
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-draw {
                    stroke-dasharray: 1000;
                    stroke-dashoffset: 1000;
                    animation: draw 2s ease-in-out forwards;
                }
                @keyframes draw { to { stroke-dashoffset: 0; } }
                ::-webkit-scrollbar { width: 8px; }
                ::-webkit-scrollbar-track { background: transparent; }
                ::-webkit-scrollbar-thumb { background: #a5b4fc; border-radius: 10px; }
                ::-webkit-scrollbar-thumb:hover { background: #818cf8; }
                .dark ::-webkit-scrollbar-thumb { background: #4f46e5; }
                .dark ::-webkit-scrollbar-thumb:hover { background: #4338ca; }
            `}</style>
        </div>
    );
}