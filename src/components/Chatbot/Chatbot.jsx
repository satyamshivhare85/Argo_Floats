import React, { useState, useContext, useEffect, useRef } from 'react';

import { Context } from "../../context/Context";
import Sidebar from '../Sidebar/Sidebar'; // Import the new sidebar

// --- SVG Icon Components ---
const PlusIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
);
const MicIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
);
// Gemini Icon for the response
const GeminiIcon = () => (
    <div className="w-9 h-9 rounded-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 flex items-center justify-center flex-shrink-0">
        <svg className="w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
    </div>
);


// --- Chat Input Component ---
const ChatInput = () => {
    const { onSent, input, setInput } = useContext(Context);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            onSent();
        }
    };

    return (
        <div className="relative">
            <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Message Chatbot..."
                className="w-full bg-[#1E1F20] rounded-2xl p-4 pr-24 text-lg text-gray-200 resize-none outline-none border border-zinc-700/50 focus:border-blue-500/50 transition-colors"
                rows="1"
                style={{ overflowY: 'hidden' }}
                onInput={(e) => {
                    e.target.style.height = 'auto';
                    e.target.style.height = `${e.target.scrollHeight}px`;
                }}
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-4">
                <button className="text-gray-400 hover:text-white"><PlusIcon className="w-6 h-6" /></button>
                <button className="text-gray-400 hover:text-white"><MicIcon className="w-6 h-6" /></button>
            </div>
        </div>
    );
};


// --- Main Chatbot UI Component ---
export default function Chatbot() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const { showResult, loading, recentPrompt, resultData } = useContext(Context);
    
    // Ref for the scrollable area
    const scrollRef = useRef(null);

    // Effect to scroll to the bottom when new results come in
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [resultData, loading]);

    return (
        <div className="bg-[#131314] text-gray-200 flex h-screen w-full font-sans overflow-hidden">
            
            <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

            <main className="flex-1 flex flex-col w-full">
                <header className="flex items-center justify-between p-4 h-16 flex-shrink-0 border-b border-zinc-700/50">
                    <h1 className="text-xl font-medium text-gray-300">Chatbot</h1>
                    <div className="w-9 h-9 rounded-full bg-purple-500 flex items-center justify-center font-bold text-white">U</div>
                </header>

                <div ref={scrollRef} className="flex-1 w-full p-4 overflow-y-auto">
                    <div className="w-full max-w-4xl mx-auto">
                        {!showResult ? (
                            <div className="flex flex-col justify-center items-center h-full text-center">
                                <h2 className="text-4xl md:text-5xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                                    Hello, User
                                </h2>
                                <p className="text-gray-500 text-lg mt-2">How can I help you today?</p>
                            </div>
                        ) : (
                            <div className="space-y-8">
                                {/* User's Prompt */}
                                <div className="flex items-start gap-4">
                                    <div className="w-9 h-9 rounded-full bg-purple-500 flex items-center justify-center font-bold text-white flex-shrink-0">U</div>
                                    <div className="flex flex-col">
                                        <span className="font-bold text-gray-200">You</span>
                                        <p className="text-gray-300 mt-1 whitespace-pre-wrap">{recentPrompt}</p>
                                    </div>
                                </div>
                                {/* AI's Response */}
                                <div className="flex items-start gap-4">
                                    <GeminiIcon />
                                    <div className="flex flex-col flex-1">
                                        <span className="font-bold text-gray-200">Chatbot</span>
                                        {loading ? (
                                             <div className="w-full flex flex-col gap-2.5 mt-2">
                                                <div className="h-5 w-full bg-zinc-700/80 rounded-md animate-pulse"></div>
                                                <div className="h-5 w-4/5 bg-zinc-700/80 rounded-md animate-pulse"></div>
                                             </div>
                                        ) : (
                                            <p className="text-gray-300 mt-1 leading-relaxed" dangerouslySetInnerHTML={{ __html: resultData }}></p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                
                <div className="w-full px-4 pb-4 flex-shrink-0">
                    <div className="max-w-4xl mx-auto">
                        <ChatInput />
                    </div>
                </div>
            </main>
        </div>
    );
}