
// src/components/Climatemonitoring.jsx

import React, { useEffect } from 'react'; // --- 1. IMPORT useEffect ---
import { Link } from 'react-router-dom';

// ... (The rest of your code, like helper components and icons, remains the same) ...
const ArrowLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
);

const YearlyBarChart = ({ data, barColor }) => {
    const allValues = data.map(d => Math.abs(d.value));
    const maxValue = Math.max(...allValues);
    
    return (
        <div className="h-full w-full flex items-end justify-between gap-2 pt-2 border-t border-slate-700/50">
            {data.map(item => (
                <div key={item.year} className="group flex-1 h-full flex flex-col items-center justify-end">
                       <div 
                           className="w-full transition-all duration-300 rounded-t-sm"
                           style={{ 
                               height: `${(Math.abs(item.value) / maxValue) * 100}%`, 
                               backgroundColor: barColor,
                               opacity: 0.7
                           }}
                       >
                           <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 -mt-8 text-center text-xs font-bold text-white bg-slate-900/80 rounded-sm px-1 py-0.5">
                               {item.value}
                           </div>
                       </div>
                    <span className="text-xs font-mono text-slate-500 mt-1">{`'${item.year.toString().slice(2)}`}</span>
                </div>
            ))}
        </div>
    );
};


// --- Main ClimateMonitoring Component ---
export default function Climatemonitoring() {
    
    // ✨ --- 2. ADD THIS EFFECT TO SCROLL TO TOP ON PAGE LOAD --- ✨
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // ... (Your mock data remains the same) ...
    const climateData = {
        temp: { 
            value: "+1.1°", unit: "C Anomaly",
            text: "Global surface temperatures continue their long-term upward trend. This anomaly is measured against the 1951-1980 baseline, with recent years consistently ranking as the warmest on record.",
            yearlyData: [
                { year: 2020, value: 1.02 }, { year: 2021, value: 0.95 }, { year: 2022, value: 1.01 }, { year: 2023, value: 1.18 }, { year: 2024, value: 1.1 }
            ]
        },
        seaLevel: { 
            value: "+98.5", unit: "mm",
            text: "Driven by thermal expansion of warming ocean water and the melting of terrestrial ice sheets, the global mean sea level is rising at an accelerating rate, posing a direct threat to coastal communities.",
            yearlyData: [
                { year: 2020, value: 91.3 }, { year: 2021, value: 94.4 }, { year: 2022, value: 95.8 }, { year: 2023, value: 97.2 }, { year: 2024, value: 98.5 }
            ]
        },
        oceanHeat: { 
            value: "+450", unit: "Zettajoules",
            text: "The ocean has absorbed the vast majority of excess heat trapped by greenhouse gases. This metric, Ocean Heat Content (OHC), reflects the immense energy imbalance in the Earth's climate system.",
            yearlyData: [
                { year: 2020, value: 390 }, { year: 2021, value: 405 }, { year: 2022, value: 420 }, { year: 2023, value: 436 }, { year: 2024, value: 450 }
            ]
        },
        co2: { 
            value: "421", unit: "ppm",
            text: "Atmospheric carbon dioxide concentration is a primary driver of climate change. Current levels are unprecedented in human history and continue to rise due to fossil fuel combustion and land-use change.",
             yearlyData: [
                { year: 2020, value: 414 }, { year: 2021, value: 416 }, { year: 2022, value: 418 }, { year: 2023, value: 420 }, { year: 2024, value: 421 }
            ]
        },
        arcticIce: { 
            value: "-12.6", unit: "% / decade",
            text: "The annual minimum extent of Arctic sea ice is shrinking dramatically. This reduction has significant feedback effects, as darker open water absorbs more solar radiation than reflective ice.",
             yearlyData: [
                { year: 2020, value: -12.2 }, { year: 2021, value: -12.0 }, { year: 2022, value: -12.4 }, { year: 2023, value: -12.9 }, { year: 2024, value: -12.6 }
            ]
        },
        iceSheets: { 
            value: "-424", unit: "Billion Tons/yr",
            text: "The Greenland and Antarctic ice sheets are losing mass at an accelerating pace. This meltwater is a primary contributor to global sea level rise, with profound long-term consequences.",
            yearlyData: [
                { year: 2020, value: -390 }, { year: 2021, value: -405 }, { year: 2022, value: -410 }, { year: 2023, value: -430 }, { year: 2024, value: -424 }
            ]
        },
        methane: {
            value: "1923", unit: "ppb",
            text: "Methane is a potent greenhouse gas with a much stronger short-term warming effect than CO₂. Monitoring its concentration is vital for near-term climate mitigation strategies.",
            yearlyData: [
                { year: 2020, value: 1895 }, { year: 2021, value: 1908 }, { year: 2022, value: 1912 }, { year: 2023, value: 1919 }, { year: 2024, value: 1923 }
            ]
        },
        oceanPH: {
            value: "8.05", unit: "pH",
            text: "As the ocean absorbs atmospheric CO₂, its chemistry changes, leading to acidification. This harms marine life, particularly organisms with calcium carbonate shells and skeletons, like corals.",
            yearlyData: [
                { year: 2020, value: 8.08 }, { year: 2021, value: 8.07 }, { year: 2022, value: 8.06 }, { year: 2023, value: 8.05 }, { year: 2024, value: 8.05 }
            ]
        },
        glacierMass: {
            value: "-2720", unit: "Gigatonnes",
            text: "This represents the cumulative net loss of ice from the world's reference glaciers since 1970. This loss contributes to sea level rise and threatens water supplies for millions of people.",
            yearlyData: [
                { year: 2020, value: -2220 }, { year: 2021, value: -2350 }, { year: 2022, value: -2490 }, { year: 2023, value: -2620 }, { year: 2024, value: -2720 }
            ]
        }
    };
    
    // ... (Your DataCard and SVG icon components remain the same) ...
    const DataCard = ({ title, data, color, icon }) => (
        <div className="bg-slate-800/60 p-5 rounded-xl border border-slate-700 flex flex-col justify-between transition-all duration-300 hover:border-sky-500/80 hover:-translate-y-1">
            <div>
                <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-slate-700/80 flex items-center justify-center">{icon}</div>
                    <h3 className="font-semibold text-slate-200">{title}</h3>
                </div>
                <div className="mt-4 mb-3">
                    <span className={`text-4xl font-bold text-white`}>{data.value}</span>
                    <span className="text-lg text-slate-400 ml-2">{data.unit}</span>
                </div>
                <p className="text-sm text-slate-400 font-light leading-relaxed h-28">{data.text}</p>
            </div>
            <div className="h-24 w-full mt-4">
                 <YearlyBarChart data={data.yearlyData} barColor={color} />
            </div>
        </div>
    );
    
    const ThermometerIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
    const WaterIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
    const FireIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.657 7.343A8 8 0 0117.657 18.657z" /></svg>;
    const CloudIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>;
    const GlobeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h8a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.881 4.043A9.045 9.045 0 0112 3c2.32 0 4.453.825 6.119 2.201M12 21a9.045 9.045 0 01-6.119-2.201" /></svg>;
    const MountainIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" /></svg>;
    const BeakerIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547a2 2 0 00-.547 1.806l.477 2.387a6 6 0 00.517 3.86l.158.318a6 6 0 003.86.517l2.387.477a2 2 0 001.806-.547a2 2 0 00.547-1.806l-.477-2.387a6 6 0 00-.517-3.86l-.158-.318z" /></svg>;

    return (
        <div className="p-4 sm:p-6 lg:p-8 animate-fade-in text-white bg-slate-900 professional-background">
             <style>{`
                 .professional-background {
                     background: linear-gradient(-45deg, #0f172a, #1e293b, #0f172a, #334155);
                     background-size: 400% 400%;
                     animation: gradient 15s ease infinite;
                 }
                 @keyframes gradient {
                     0% { background-position: 0% 50%; }
                     50% { background-position: 100% 50%; }
                     100% { background-position: 0% 50%; }
                 }
             `}</style>
             <div className="max-w-7xl mx-auto">
                 <Link
                     to="/"
                     className="inline-flex items-center mb-10 px-4 py-2 bg-slate-700/50 hover:bg-slate-700 font-semibold rounded-lg shadow-md transition-colors duration-300 border border-slate-600"
                 >
                     <ArrowLeftIcon />
                     Back to Home
                 </Link>
            
                 <div className="mb-12">
                     <h1 className="text-4xl md:text-5xl font-bold text-slate-100">Global Climate Indicators</h1>
                     <p className="text-slate-400 mt-4 max-w-3xl text-lg">
                         A comprehensive dashboard of key planetary health metrics, providing a quantitative look at the state of Earth's changing climate.
                     </p>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                     <DataCard title="Global Temperature" data={climateData.temp} color="#f97316" icon={<ThermometerIcon />} />
                     <DataCard title="Sea Level Rise" data={climateData.seaLevel} color="#38bdf8" icon={<WaterIcon />}/>
                     <DataCard title="Ocean Heat Content" data={climateData.oceanHeat} color="#ef4444" icon={<FireIcon />}/>
                     <DataCard title="Atmospheric CO₂" data={climateData.co2} color="#34d399" icon={<CloudIcon />} />
                     <DataCard title="Arctic Sea Ice Minimum" data={climateData.arcticIce} color="#22d3ee" icon={<GlobeIcon />} />
                     <DataCard title="Ice Sheet Mass Loss" data={climateData.iceSheets} color="#818cf8" icon={<MountainIcon />} />
                     <DataCard title="Methane (CH4) Levels" data={climateData.methane} color="#a3e635" icon={<CloudIcon />} />
                     <DataCard title="Ocean Acidity" data={climateData.oceanPH} color="#facc15" icon={<BeakerIcon />} />
                     <DataCard title="Glacier Mass Balance" data={climateData.glacierMass} color="#60a5fa" icon={<MountainIcon />} />
                 </div>

                 <div className="mt-16 bg-slate-800/40 p-8 rounded-2xl border border-slate-700/80">
                     <h2 className="text-2xl font-bold text-white mb-4">Global Impact Analysis</h2>
                     <p className="text-slate-400 leading-relaxed">
                         The interconnected nature of these indicators paints a clear picture of a planet under significant stress. Rising temperatures are not an isolated issue; they directly cause thermal expansion of seawater and accelerate the melting of ice sheets and glaciers, both of which are primary drivers of sea level rise.
                         <br/><br/>
                         Increased atmospheric CO₂ and methane trap more heat, creating a powerful feedback loop. The ocean absorbs a significant portion of this heat and CO₂, which mitigates atmospheric warming but leads to devastating ocean acidification and disrupts marine ecosystems. The loss of reflective Arctic ice further amplifies warming, a phenomenon known as the albedo effect. These are not separate issues but deeply linked components of a single, global climate crisis.
                     </p>
                 </div>
             </div>
        </div>
    );
}