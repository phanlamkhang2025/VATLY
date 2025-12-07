import React, { useState } from 'react';
import { QuizState, Topic } from '../types';
import { generateQuizQuestions } from '../services/geminiService';
import { Icons } from '../constants';

interface QuizInterfaceProps {
  topic: Topic | null;
}

const QuizInterface: React.FC<QuizInterfaceProps> = ({ topic }) => {
  const [quizState, setQuizState] = useState<QuizState | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startQuiz = async () => {
    if (!topic) return;
    setIsLoading(true);
    setError(null);
    try {
      const questions = await generateQuizQuestions(topic.name);
      if (questions.length === 0) {
        setError("Không thể tạo câu hỏi. Vui lòng thử lại.");
      } else {
        setQuizState({
          questions,
          currentQuestionIndex: 0,
          score: 0,
          isFinished: false,
          userAnswers: {}
        });
      }
    } catch (e) {
      setError("Có lỗi xảy ra khi kết nối API.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswer = (option: string) => {
    if (!quizState || quizState.isFinished) return;
    
    // Only allow answering once per question
    if (quizState.userAnswers[quizState.currentQuestionIndex]) return;

    const isCorrect = option === quizState.questions[quizState.currentQuestionIndex].correctAnswer;
    
    setQuizState(prev => {
      if (!prev) return null;
      return {
        ...prev,
        score: isCorrect ? prev.score + 1 : prev.score,
        userAnswers: {
          ...prev.userAnswers,
          [prev.currentQuestionIndex]: option
        }
      };
    });
  };

  const nextQuestion = () => {
    if (!quizState) return;
    
    if (quizState.currentQuestionIndex < quizState.questions.length - 1) {
      setQuizState(prev => prev ? ({ ...prev, currentQuestionIndex: prev.currentQuestionIndex + 1 }) : null);
    } else {
      setQuizState(prev => prev ? ({ ...prev, isFinished: true }) : null);
    }
  };

  const resetQuiz = () => {
    setQuizState(null);
  };

  // 1. Initial State: No Topic or Start Screen
  if (!topic) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-white rounded-2xl border border-slate-200 p-8 text-center">
        <div className="w-20 h-20 bg-teal-50 rounded-full flex items-center justify-center mb-6 text-teal-600">
           <Icons.Quiz className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Luyện thi Trắc nghiệm</h2>
        <p className="text-slate-500 max-w-md">
          Vui lòng chọn một chủ đề từ menu bên trái để bắt đầu tạo đề kiểm tra năng lực.
        </p>
      </div>
    );
  }

  if (!quizState) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-white rounded-2xl border border-slate-200 p-8 text-center">
        <div className="w-16 h-16 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mb-4">
          {topic.icon}
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">{topic.name}</h2>
        <p className="text-slate-500 mb-8 max-w-md">
          Hệ thống sẽ tạo ngẫu nhiên 5 câu hỏi trắc nghiệm về chủ đề này để bạn luyện tập.
        </p>
        
        {error && <div className="text-red-500 mb-4 bg-red-50 px-4 py-2 rounded-lg text-sm">{error}</div>}

        <button
          onClick={startQuiz}
          disabled={isLoading}
          className="bg-teal-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg shadow-teal-200 hover:bg-teal-700 transition-all flex items-center disabled:opacity-70"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Đang tạo đề thi...
            </>
          ) : (
            'Bắt đầu làm bài'
          )}
        </button>
      </div>
    );
  }

  // 2. Quiz Active State
  const currentQ = quizState.questions[quizState.currentQuestionIndex];
  const hasAnswered = !!quizState.userAnswers[quizState.currentQuestionIndex];
  const userAnswer = quizState.userAnswers[quizState.currentQuestionIndex];

  if (quizState.isFinished) {
      return (
          <div className="h-full flex flex-col items-center justify-center bg-white rounded-2xl border border-slate-200 p-8 text-center">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Kết quả</h2>
            <div className="text-6xl font-black text-teal-600 mb-2">
                {quizState.score}/{quizState.questions.length}
            </div>
            <p className="text-slate-500 mb-8">Số câu trả lời đúng</p>
            <button
                onClick={resetQuiz}
                className="bg-slate-800 text-white px-6 py-2 rounded-lg hover:bg-slate-900 transition-colors"
            >
                Làm lại bài khác
            </button>
          </div>
      )
  }

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Progress Bar */}
      <div className="w-full bg-slate-100 h-2">
        <div 
          className="bg-teal-500 h-2 transition-all duration-300" 
          style={{ width: `${((quizState.currentQuestionIndex + 1) / quizState.questions.length) * 100}%` }}
        />
      </div>

      <div className="p-8 flex-1 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
            <span className="text-sm font-bold text-teal-600 bg-teal-50 px-3 py-1 rounded-full border border-teal-100">
                Câu hỏi {quizState.currentQuestionIndex + 1} / {quizState.questions.length}
            </span>
            <span className="text-sm text-slate-400">Chủ đề: {topic.name}</span>
        </div>

        <h3 className="text-xl font-bold text-slate-800 mb-8 leading-relaxed">
            {currentQ.question}
        </h3>

        <div className="space-y-3">
          {currentQ.options.map((option, idx) => {
            let btnClass = "border-slate-200 hover:bg-slate-50 hover:border-teal-300";
            let icon = <span className="w-6 h-6 rounded-full border border-slate-300 mr-3 flex items-center justify-center text-xs font-bold text-slate-500">{String.fromCharCode(65+idx)}</span>;

            if (hasAnswered) {
                if (option === currentQ.correctAnswer) {
                    btnClass = "bg-teal-50 border-teal-500 ring-1 ring-teal-500";
                    icon = <span className="w-6 h-6 rounded-full bg-teal-500 mr-3 flex items-center justify-center text-white"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg></span>;
                } else if (option === userAnswer) {
                    btnClass = "bg-red-50 border-red-300 ring-1 ring-red-300";
                    icon = <span className="w-6 h-6 rounded-full bg-red-500 mr-3 flex items-center justify-center text-white"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></span>;
                } else {
                    btnClass = "opacity-50 border-slate-100";
                }
            }

            return (
              <button
                key={idx}
                onClick={() => handleAnswer(option)}
                disabled={hasAnswered}
                className={`w-full flex items-center p-4 text-left border rounded-xl transition-all duration-200 ${btnClass}`}
              >
                {icon}
                <span className="text-slate-700 font-medium">{option}</span>
              </button>
            );
          })}
        </div>

        {/* Explanation Area */}
        {hasAnswered && (
          <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h4 className="font-bold text-blue-800 mb-2 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Giải thích
            </h4>
            <p className="text-blue-900 leading-relaxed">{currentQ.explanation}</p>
          </div>
        )}
      </div>

      {/* Footer Controls */}
      <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
        <button
          onClick={nextQuestion}
          disabled={!hasAnswered}
          className={`px-6 py-2.5 rounded-lg font-semibold transition-all flex items-center
            ${hasAnswered 
              ? 'bg-teal-600 text-white hover:bg-teal-700 shadow-md' 
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
        >
          {quizState.currentQuestionIndex === quizState.questions.length - 1 ? 'Xem kết quả' : 'Câu tiếp theo'}
          <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default QuizInterface;