import React, { useState, useRef, useEffect } from 'react';
import { Message, Topic } from '../types';
import { sendChatMessage } from '../services/geminiService';
import { Icons } from '../constants';

interface ChatInterfaceProps {
  topic: Topic | null;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ topic }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'model',
      text: topic 
        ? `Chào bạn! Mình là trợ lý ảo về chủ đề **${topic.name}**. Bạn cần giúp đỡ về lý thuyết hay bài tập nào không?`
        : `Chào bạn! Mình là PhysiTutor. Hãy chọn một chủ đề hoặc hỏi mình bất cứ điều gì về Vật Lý THPT nhé!`,
      timestamp: Date.now()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Reset chat when topic changes (optional, but good for context)
  useEffect(() => {
    if (topic) {
       setMessages(prev => [
         ...prev,
         {
           id: Date.now().toString(),
           role: 'model',
           text: `Chúng ta đã chuyển sang chủ đề **${topic.name}**. Có phần nào bạn cảm thấy khó hiểu không?`,
           timestamp: Date.now()
         }
       ]);
    }
  }, [topic]);

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: inputText,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      // Prepare history for Gemini
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      // Add current context if needed, but history handles it mostly.
      // If a topic is selected, we could prepend it to the prompt invisibly, 
      // but the system instruction handles general physics role.
      
      const responseText = await sendChatMessage(userMsg.text, history);

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: "Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại.",
        timestamp: Date.now(),
        isError: true
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Simple formatting for bold text (**text**) and line breaks
  const formatText = (text: string) => {
    return text.split('\n').map((line, i) => (
      <React.Fragment key={i}>
        {line.split(/(\*\*.*?\*\*)/g).map((part, j) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={j} className="font-bold text-teal-800 dark:text-teal-300">{part.slice(2, -2)}</strong>;
          }
          return <span key={j}>{part}</span>;
        })}
        <br />
      </React.Fragment>
    ));
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
        <div>
           <h2 className="text-lg font-bold text-slate-800">Hỏi đáp & Giải bài tập</h2>
           <p className="text-sm text-slate-500">{topic ? `Đang thảo luận: ${topic.name}` : 'Hỏi bất kỳ điều gì về Vật lý'}</p>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] md:max-w-[70%] rounded-2xl px-5 py-3.5 shadow-sm text-sm md:text-base leading-relaxed
                ${msg.role === 'user' 
                  ? 'bg-teal-600 text-white rounded-br-none' 
                  : msg.isError 
                    ? 'bg-red-50 text-red-600 border border-red-100 rounded-bl-none'
                    : 'bg-white text-slate-700 border border-slate-100 rounded-bl-none'
                }`}
            >
              {msg.role === 'model' ? (
                <div className="prose prose-sm prose-teal max-w-none">
                  {formatText(msg.text)}
                </div>
              ) : (
                msg.text
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
             <div className="bg-white border border-slate-100 rounded-2xl rounded-bl-none px-5 py-4 shadow-sm">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-slate-100">
        <div className="relative flex items-end gap-2 bg-slate-50 p-2 rounded-xl border border-slate-200 focus-within:border-teal-400 focus-within:ring-1 focus-within:ring-teal-400 transition-all">
          <textarea
            className="w-full bg-transparent border-none focus:ring-0 text-slate-700 placeholder-slate-400 resize-none max-h-32 py-2 px-2"
            rows={1}
            placeholder="Nhập câu hỏi hoặc đề bài tập..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim() || isLoading}
            className={`p-2 rounded-lg transition-all flex-shrink-0 mb-0.5
              ${inputText.trim() && !isLoading 
                ? 'bg-teal-600 text-white hover:bg-teal-700 shadow-md shadow-teal-200' 
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 transform rotate-0">
              <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
            </svg>
          </button>
        </div>
        <p className="text-center text-xs text-slate-400 mt-2">PhysiTutor có thể mắc lỗi. Hãy kiểm tra thông tin quan trọng.</p>
      </div>
    </div>
  );
};

export default ChatInterface;