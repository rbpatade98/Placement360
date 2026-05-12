import { useState } from "react";
import { cn } from "@/lib/utils";
import { TooltipButton } from "./tooltip-button";
import { Volume2, VolumeX, CheckCircle2, ChevronRight, LayoutGrid } from "lucide-react";
import { RecordAnswer } from "./record-answer";

interface QuestionSectionProps {
  questions: { question: string; answer: string }[];
}

export const QuestionSection = ({ questions }: QuestionSectionProps) => {
  const [activeTab, setActiveTab] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isWebCam, setIsWebCam] = useState(false);
  const [currentSpeech, setCurrentSpeech] = useState<SpeechSynthesisUtterance | null>(null);

  const handlePlayQuestion = (qst: string) => {
    if (isPlaying && currentSpeech) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setCurrentSpeech(null);
    } else {
      if ("speechSynthesis" in window) {
        const speech = new SpeechSynthesisUtterance(qst);
        window.speechSynthesis.speak(speech);
        setIsPlaying(true);
        setCurrentSpeech(speech);
        speech.onend = () => {
          setIsPlaying(false);
          setCurrentSpeech(null);
        };
      }
    }
  };

  return (
    <div className="w-full grid grid-cols-1 xl:grid-cols-12 gap-8 mt-6">
      {/* Question Selection - Collapsible or Mini-Sidebar */}
      <div className="xl:col-span-3 flex flex-col gap-4">
        <div className="flex items-center justify-between px-2">
          <h3 className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em] flex items-center gap-2">
            <LayoutGrid className="w-3 h-3" /> Question Progress
          </h3>
          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
            {activeTab + 1} / {questions.length}
          </span>
        </div>
        
        <div className="flex flex-row xl:flex-col gap-3 overflow-x-auto xl:overflow-x-visible pb-4 xl:pb-0 scrollbar-hide">
          {questions?.map((tab, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className={cn(
                "group relative flex items-center gap-4 min-w-[160px] xl:w-full p-3 rounded-2xl border transition-all duration-300",
                activeTab === i
                  ? "bg-white border-emerald-200 shadow-md ring-1 ring-emerald-100"
                  : "bg-neutral-50/50 border-transparent hover:bg-white hover:border-neutral-200"
              )}
            >
              <div className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold shrink-0 transition-all",
                activeTab === i ? "bg-emerald-500 text-white shadow-lg shadow-emerald-200" : "bg-white text-neutral-400 border border-neutral-100"
              )}>
                {i + 1}
              </div>
              <div className="flex flex-col items-start overflow-hidden">
                <span className={cn(
                  "text-[10px] font-black uppercase tracking-widest",
                  activeTab === i ? "text-emerald-500" : "text-neutral-400"
                )}>
                  Question
                </span>
                <span className={cn(
                  "text-xs font-bold truncate w-full",
                  activeTab === i ? "text-neutral-900" : "text-neutral-500"
                )}>
                  {tab.question.substring(0, 20)}...
                </span>
              </div>
              {activeTab === i && (
                <div className="absolute right-3 w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Main Interview Area - User Friendly Content Area */}
      <div className="xl:col-span-9 bg-white border border-neutral-100 rounded-[2rem] shadow-sm overflow-hidden flex flex-col">
        {/* Content Section */}
        <div className="p-6 md:p-10 flex-1">
          <div className="flex flex-col md:flex-row items-start justify-between gap-6">
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-2 text-emerald-600 font-black text-[9px] uppercase tracking-[0.3em] bg-emerald-50 w-fit px-2.5 py-1 rounded-full">
                <CheckCircle2 className="w-3 h-3" /> Interviewing Now
              </div>
              <h2 className="text-base md:text-lg font-bold text-neutral-800 leading-relaxed tracking-tight">
                {questions[activeTab]?.question}
              </h2>
            </div>
            
            <TooltipButton
              content={isPlaying ? "Stop" : "Read Aloud"}
              buttonClassName={cn(
                "h-10 w-10 rounded-xl transition-all duration-500 shrink-0 shadow-sm",
                isPlaying ? "bg-red-500 text-white" : "bg-neutral-900 text-white"
              )}
              icon={isPlaying ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              onClick={() => handlePlayQuestion(questions[activeTab].question)}
            />
          </div>

          <div className="mt-12">
            <RecordAnswer
              question={questions[activeTab]}
              isWebCam={isWebCam}
              setIsWebCam={setIsWebCam}
            />
          </div>
        </div>
      </div>
    </div>
  );
};