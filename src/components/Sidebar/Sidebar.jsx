import React, { useContext } from 'react';

import { Context } from "../../context/Context";

// --- SVG Icon Components (from your original file) ---
const MenuIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>
);
const PlusIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
);
const HistoryIcon = ({ className = "w-6 h-6" }) => ( // Renamed from MessageSquareIcon for clarity
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
);
const SettingsIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.438.995s.145.755.438.995l1.003.827c.48.398.668 1.03.26 1.431l-1.296 2.247a1.125 1.125 0 01-1.37.49l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.063-.374-.313-.686-.645-.87a6.52 6.52 0 01-.22-.127c-.324-.196-.72-.257-1.075-.124l-1.217.456a1.125 1.125 0 01-1.37-.49l-1.296-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.437-.995s-.145-.755-.437-.995l-1.004-.827a1.125 1.125 0 01-.26-1.431l1.296-2.247a1.125 1.125 0 011.37.49l1.217.456c.355.133.75.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.213-1.28z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
);


export default function Sidebar({ isSidebarOpen, setIsSidebarOpen }) {
    const { onSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context);

    const loadPrompt = async (prompt) => {
        setRecentPrompt(prompt);
        await onSent(prompt);
    }

    return (
        <aside className={`flex flex-col bg-[#1E1F20] transition-all duration-300 ease-in-out ${isSidebarOpen ? 'w-64' : 'w-20'}`}>
            <div className="p-2 flex-shrink-0">
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-zinc-700/50 transition-colors"
                >
                    <MenuIcon className="w-6 h-6 text-gray-400" />
                </button>
                <button
                    onClick={newChat}
                    className="mt-4 w-full flex items-center justify-start gap-3 p-3 rounded-full bg-blue-500/20 hover:bg-blue-500/40 text-blue-300 transition-colors"
                >
                    <PlusIcon className="w-6 h-6 flex-shrink-0" />
                    <span className={`transition-opacity duration-200 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 whitespace-nowrap'}`}>New Chat</span>
                </button>
            </div>

            <div className={`flex-1 overflow-y-auto px-2 ${isSidebarOpen ? 'block' : 'hidden'}`}>
                <p className="text-gray-400 text-sm font-medium my-4">Recent</p>
                {prevPrompts.map((item, index) => (
                    <button
                        key={index}
                        onClick={() => loadPrompt(item)}
                        className="w-full flex items-center justify-start gap-3 p-3 rounded-full hover:bg-zinc-700/50 transition-colors text-gray-300 mb-1"
                    >
                        <HistoryIcon className="w-5 h-5 flex-shrink-0" />
                        <span className="truncate">{item}</span>
                    </button>
                ))}
            </div>

            <div className="p-2 flex flex-col gap-2 flex-shrink-0">
                <button className="w-full flex items-center justify-start gap-3 p-3 rounded-full hover:bg-zinc-700/50 transition-colors text-gray-400">
                    <SettingsIcon className="w-6 h-6 flex-shrink-0" />
                    <span className={`transition-opacity duration-200 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 whitespace-nowrap'}`}>Settings</span>
                </button>
            </div>
        </aside>
    );
}