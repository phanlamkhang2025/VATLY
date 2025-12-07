import React from 'react';
import { AppMode, Topic } from '../types';
import { Icons, PHYSICS_TOPICS } from '../constants';

interface SidebarProps {
  currentMode: AppMode;
  setMode: (mode: AppMode) => void;
  currentTopic: Topic | null;
  setTopic: (topic: Topic | null) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  currentMode, 
  setMode, 
  currentTopic, 
  setTopic,
  isMobileOpen,
  setIsMobileOpen
}) => {
  
  const handleTopicClick = (topic: Topic) => {
    setTopic(topic);
    // Auto switch to chat if on dashboard, keep quiz if on quiz
    if (currentMode === AppMode.DASHBOARD) {
        setMode(AppMode.CHAT);
    }
    setIsMobileOpen(false);
  };

  const menuItems = [
    { mode: AppMode.DASHBOARD, label: 'Tổng quan', icon: <Icons.Chart className="w-5 h-5" /> },
    { mode: AppMode.CHAT, label: 'Hỏi đáp & Bài tập', icon: <Icons.Chat className="w-5 h-5" /> },
    { mode: AppMode.QUIZ, label: 'Luyện thi trắc nghiệm', icon: <Icons.Quiz className="w-5 h-5" /> },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside className={`
        fixed lg:static top-0 left-0 h-full w-64 bg-white border-r border-slate-200 z-30 transition-transform duration-300 ease-in-out
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-slate-100 flex items-center justify-center">
            <div className="w-10 h-10 bg-teal-600 rounded-xl flex items-center justify-center text-white mr-3 shadow-teal-200 shadow-lg">
              <Icons.Atom className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold text-slate-800 tracking-tight">PhysiTutor</h1>
          </div>

          {/* Main Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            <div className="mb-6">
              <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Chức năng</p>
              {menuItems.map((item) => (
                <button
                  key={item.mode}
                  onClick={() => {
                    setMode(item.mode);
                    setIsMobileOpen(false);
                  }}
                  className={`w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200
                    ${currentMode === item.mode 
                      ? 'bg-teal-50 text-teal-700' 
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                >
                  <span className={`mr-3 ${currentMode === item.mode ? 'text-teal-600' : 'text-slate-400'}`}>
                    {item.icon}
                  </span>
                  {item.label}
                </button>
              ))}
            </div>

            <div>
              <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Chủ đề Vật Lý 12</p>
              <div className="space-y-1">
                {PHYSICS_TOPICS.map((topic) => (
                  <button
                    key={topic.id}
                    onClick={() => handleTopicClick(topic)}
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 group
                      ${currentTopic?.id === topic.id
                        ? 'bg-teal-50 text-teal-700 border border-teal-100'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                  >
                    <span className={`mr-3 transition-colors ${currentTopic?.id === topic.id ? 'text-teal-500' : 'text-slate-400 group-hover:text-teal-400'}`}>
                      {topic.icon}
                    </span>
                    <div className="text-left">
                      <div className="leading-none">{topic.name}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-slate-100">
            <div className="bg-teal-600 rounded-xl p-4 text-white shadow-lg shadow-teal-200/50">
              <h3 className="text-sm font-bold mb-1">Mẹo học tập</h3>
              <p className="text-xs text-teal-100 opacity-90">Hãy yêu cầu mình giải thích từng bước nếu bài toán quá khó nhé!</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;