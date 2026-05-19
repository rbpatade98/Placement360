import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/config/firebase.config";
import { useAuth } from "@clerk/clerk-react";
import type { UserAnswer } from "@/types";
import { CustomBreadCrumb } from "@/components/CustomBreadCrumb";
import { Button } from "@/components/ui/Button";
import { LoaderPage } from "./LoaderPage";
import { 
  ChevronDown,  
  ChevronUp, 
  Star, 
  MessageSquare, 
  CheckCircle2, 
  AlertCircle,
  Home,
  Trophy
} from "lucide-react";
import { cn } from "@/lib/utils";

export const Feedback = () => {
  const { interviewId } = useParams();
  const { userId } = useAuth();
  const navigate = useNavigate();
  const [feedbackList, setFeedbackList] = useState<UserAnswer[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const q = query(
          collection(db, "userAnswers"),
          where("mockIdRef", "==", interviewId),
          where("userId", "==", userId)
        );
        const querySnap = await getDocs(q);
        const feedbackData = querySnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as UserAnswer[];
        
        setFeedbackList(feedbackData);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      } finally {
        setLoading(false);
      }
    };

    if (interviewId && userId) {
      fetchFeedback();
    }
  }, [interviewId, userId]);

  const totalRating = feedbackList.length > 0 
    ? (feedbackList.reduce((acc, item) => acc + item.rating, 0) / feedbackList.length).toFixed(1)
    : 0;

  if (loading) return <LoaderPage className="w-full h-[70vh]" />;

  return (
    <div className="flex flex-col w-full gap-8 py-8 px-4 md:px-0 max-w-4xl mx-auto animate-in fade-in duration-700">
      <CustomBreadCrumb
        breadCrumbPage="Feedback"
        breadCrumbItems={[{ label: "Mock Interviews", link: "/generate" }]}
      />

      {feedbackList.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-6 py-20 bg-white rounded-3xl border border-neutral-100 shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-neutral-50 flex items-center justify-center text-neutral-400">
            <AlertCircle className="w-8 h-8" />
          </div>
          <div className="text-center space-y-2 px-6">
            <h2 className="text-xl font-bold text-neutral-800">No Feedback Found</h2>
            <p className="text-neutral-500 max-w-xs">Complete an interview first to see your personalized feedback here.</p>
          </div>
          <Button variant="outline" className="rounded-xl px-8" onClick={() => navigate("/generate")}>
            Go to Dashboard
          </Button>
        </div>
      ) : (
        <>
          {/* Hero Section */}
          <div className="bg-white border border-neutral-100 p-8 rounded-[2rem] shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-100 shrink-0">
                <Trophy className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h1 className="text-2xl font-black text-neutral-900 tracking-tight">Interview Evaluation</h1>
                <p className="text-neutral-500 text-sm">
                  Review your performance across {feedbackList.length} questions.
                </p>
              </div>
            </div>

            <div className="bg-neutral-50/50 border border-neutral-100 rounded-3xl p-6 flex items-center gap-8">
               <div className="flex flex-col items-center">
                  <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400 mb-1">Score</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-neutral-900">{totalRating}</span>
                    <span className="text-sm font-bold text-neutral-300">/ 10</span>
                  </div>
               </div>
               
               <div className="w-px h-10 bg-neutral-200" />

               <div className="flex flex-col items-center">
                  <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400 mb-1">Status</span>
                  <span className="text-sm font-bold text-emerald-600">Completed</span>
               </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between px-2">
              <h3 className="text-xs font-black text-neutral-400 uppercase tracking-widest">Question Analysis</h3>
              <span className="text-xs font-bold text-neutral-400">{feedbackList.length} Questions</span>
            </div>
            
            {feedbackList.map((item, index) => (
              <div 
                key={item.id} 
                className={cn(
                  "bg-white border transition-all duration-300 rounded-3xl overflow-hidden",
                  expandedIndex === index ? "border-emerald-500 ring-4 ring-emerald-50" : "border-neutral-100 hover:border-neutral-200 shadow-sm"
                )}
              >
                <button 
                  onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <div className="flex items-center gap-5">
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 font-bold text-sm",
                      expandedIndex === index ? "bg-emerald-500 text-white" : "bg-neutral-50 text-neutral-500"
                    )}>
                      {index + 1}
                    </div>
                    <div className="space-y-1">
                      <p className={cn(
                        "text-sm font-bold leading-tight line-clamp-1 md:line-clamp-none",
                        expandedIndex === index ? "text-neutral-900" : "text-neutral-600"
                      )}>
                        {item.question}
                      </p>
                      <div className="flex items-center gap-3">
                         <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-lg">
                           <Star className="w-3 h-3 fill-emerald-600" /> {item.rating}/10
                         </div>
                      </div>
                    </div>
                  </div>
                  {expandedIndex === index ? <ChevronUp className="w-5 h-5 text-emerald-500" /> : <ChevronDown className="w-5 h-5 text-neutral-300" />}
                </button>

                {expandedIndex === index && (
                  <div className="px-6 pb-6 space-y-6 animate-in fade-in slide-in-from-top-2">
                    <div className="h-px bg-neutral-100 w-full" />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-[10px] font-black text-neutral-400 uppercase tracking-widest">
                          <MessageSquare className="w-3 h-3" /> Your Response
                        </div>
                        <div className="p-5 bg-neutral-50 rounded-2xl border border-neutral-100 text-sm leading-relaxed text-neutral-700 italic">
                          "{item.user_ans}"
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-[10px] font-black text-emerald-600 uppercase tracking-widest">
                          <CheckCircle2 className="w-3 h-3" /> Ideal Answer
                        </div>
                        <div className="p-5 bg-emerald-50/30 rounded-2xl border border-emerald-100 text-sm leading-relaxed text-emerald-900">
                          {item.correct_ans}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 bg-neutral-900 rounded-[2rem] p-6 md:p-8 text-white relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl" />
                      <div className="flex items-center gap-2 text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-2 relative z-10">
                        <Star className="w-3 h-3" /> AI Feedback & Insights
                      </div>
                      <p className="text-sm md:text-base leading-relaxed text-neutral-300 relative z-10">
                        {item.feedback}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-center pt-10">
            <Button 
              variant="ghost" 
              className="rounded-2xl px-10 h-14 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50"
              onClick={() => navigate("/generate")}
            >
              <Home className="w-4 h-4 mr-2" /> Back to Dashboard
            </Button>
          </div>
        </>
      )}
    </div>
  );
};
