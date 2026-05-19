import { useEffect, useState } from "react";
import { Button } from "./ui/Button";
import Webcam from "react-webcam";
import { Mic, StopCircle, Video, VideoOff, Activity, Save, RefreshCw, Loader } from "lucide-react";
import { toast } from "sonner";
import { chatSession } from "@/scripts";
import { db } from "@/config/firebase.config";
import { addDoc, collection, serverTimestamp, getDocs, query, where } from "firebase/firestore";
import { useAuth } from "@clerk/clerk-react";
import { useParams } from "react-router";
import { cn } from "@/lib/utils";
import { SaveModal } from "./SaveModal";

interface RecordAnswerProps {
  question: { question: string; answer: string };
  isWebCam: boolean;
  setIsWebCam: (value: boolean) => void;
}

interface AIResponse {
  ratings: number;
  feedback: string;
}

const SpeechRecognition =
  (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

export const RecordAnswer = ({
  question,
  isWebCam,
  setIsWebCam,
}: RecordAnswerProps) => {
  const [userAnswer, setUserAnswer] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [aiResult, setAiResult] = useState<AIResponse | null>(null);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  
  const { userId } = useAuth();
  const { interviewId } = useParams<{ interviewId: string }>();
  const [recognition, setRecognition] = useState<any>(null);

  useEffect(() => {
    if (SpeechRecognition) {
      const recog = new SpeechRecognition();
      recog.continuous = true;
      recog.interimResults = true;
      recog.lang = "en-US";

      recog.onresult = (event: any) => {
        let transcript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setUserAnswer(transcript);
      };

      recog.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
        setIsRecording(false);
      };

      setRecognition(recog);
    }
  }, []);

  const toggleRecording = async () => {
    if (isRecording) {
      recognition?.stop();
      setIsRecording(false);
      
      if (userAnswer.length < 30) {
        toast.error("Answer too short", {
          description: "Your answer should be at least 30 characters for AI analysis.",
        });
        return;
      }
      
      await generateFeedback();
    } else {
      setUserAnswer("");
      setAiResult(null);
      recognition?.start();
      setIsRecording(true);
    }
  };

  const cleanAiResponse = (responseText: string) => {
    let cleanText = responseText.trim();
    cleanText = cleanText.replace(/(json|```|`)/g, "");
    const jsonMatch = cleanText.match(/\{.*\}/s);
    if (jsonMatch) {
      cleanText = jsonMatch[0];
    }
    try {
      return JSON.parse(cleanText);
    } catch (error) {
      throw new Error("Invalid JSON format");
    }
  };

  const generateFeedback = async () => {
    setIsAiGenerating(true);
    const feedbackPrompt = `
      Question: "${question.question}"
      User Answer: "${userAnswer}"
      Correct Answer: "${question.answer}"
      Please compare the user's answer to the correct answer. 
      Evaluation Criteria:
      1. Be encouraging and supportive. 
      2. If the user captures the main idea, give a high rating (7-10) even if not perfectly worded.
      3. Provide constructive feedback that highlights strengths first, then suggests small improvements.
      4. Rating scale: 1 to 10 (be generous if the answer is logically sound).
      
      Return the result strictly in JSON format with "ratings" (number) and "feedback" (string).
    `;

    try {
      const result = await chatSession.sendMessage(feedbackPrompt);
      const jsonResponse = cleanAiResponse(result.response.text());
      setAiResult(jsonResponse);
      toast.success("Feedback Generated", {
        description: "Your answer has been analyzed. You can now save it.",
      });
    } catch (error) {
      console.error(error);
      toast.error("AI Error", {
        description: "Failed to generate feedback. Please try again.",
      });
    } finally {
      setIsAiGenerating(false);
    }
  };

  const onSaveConfirm = async () => {
    if (!aiResult) return;
    setLoading(true);

    try {
      // Check for existing answer
      const q = query(
        collection(db, "userAnswers"),
        where("userId", "==", userId),
        where("question", "==", question.question)
      );
      const querySnap = await getDocs(q);

      if (!querySnap.empty) {
        toast.info("Already Answered", {
          description: "You have already saved an answer for this question.",
        });
        setIsSaveModalOpen(false);
        return;
      }

      await addDoc(collection(db, "userAnswers"), {
        mockIdRef: interviewId,
        question: question.question,
        correct_ans: question.answer,
        user_ans: userAnswer,
        feedback: aiResult.feedback,
        rating: aiResult.ratings,
        userId: userId,
        createdAt: serverTimestamp(),
      });

      toast.success("Saved Successfully", {
        description: "Your progress has been recorded.",
      });
      setUserAnswer("");
      setAiResult(null);
    } catch (error) {
      console.error(error);
      toast.error("Save Failed", {
        description: "An error occurred while saving. Please try again.",
      });
    } finally {
      setLoading(false);
      setIsSaveModalOpen(false);
    }
  };

  return (
    <div className="flex flex-col xl:flex-row items-stretch gap-6 w-full">
      <SaveModal
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        onConfirm={onSaveConfirm}
        loading={loading}
      />

      {/* Webcam Section */}
      <div className="flex-1 min-h-[240px] relative rounded-[1.5rem] bg-neutral-900 overflow-hidden shadow-xl border-4 border-neutral-50">
        {isWebCam ? (
          <Webcam
            mirrored={true}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-full text-neutral-600 bg-neutral-950 gap-3">
             <div className="w-12 h-12 rounded-2xl bg-neutral-900 flex items-center justify-center border border-neutral-800">
               <VideoOff className="w-5 h-5 text-neutral-600" />
             </div>
             <p className="text-[9px] font-black uppercase tracking-[0.2em] text-neutral-700">Video Signal Lost</p>
          </div>
        )}

        <div className="absolute top-3 right-3 z-10 flex gap-2">
          <Button
            variant="secondary"
            size="icon"
            className="rounded-lg bg-black/40 hover:bg-black/60 backdrop-blur-md border-white/10 text-white transition-all shadow-xl h-8 w-8"
            onClick={() => setIsWebCam(!isWebCam)}
          >
            {isWebCam ? <VideoOff className="w-3.5 h-3.5" /> : <Video className="w-3.5 h-3.5" />}
          </Button>
        </div>

        {isRecording && (
          <div className="absolute bottom-3 left-3 z-10 flex items-center gap-2 bg-red-500 text-white px-2.5 py-1 rounded-full font-black text-[9px] uppercase tracking-widest shadow-xl">
             <span className="w-1 h-1 rounded-full bg-white animate-ping" />
             Rec
          </div>
        )}
      </div>

      {/* Controls & Transcript Section */}
      <div className="w-full xl:w-[320px] flex flex-col gap-4">
        <div className={cn(
          "flex-[2] min-h-[200px] p-5 rounded-[1.5rem] border transition-all duration-500 flex flex-col",
          isRecording ? "bg-red-50/30 border-red-100" : "bg-neutral-50/50 border-neutral-100"
        )}>
          <div className="flex items-center justify-between mb-3">
             <div className="flex items-center gap-2">
               <Activity className={cn("w-3.5 h-3.5", isRecording ? "text-red-500" : "text-neutral-400")} />
               <span className="text-[9px] font-black text-neutral-400 uppercase tracking-widest">Voice Capture</span>
             </div>
          </div>
          
          <div className="flex-1 overflow-y-auto max-h-[140px] pr-2">
            <p className={cn(
              "text-sm leading-relaxed font-medium",
              userAnswer ? (isRecording ? "text-red-900/80" : "text-neutral-700") : "text-neutral-300 italic"
            )}>
              {userAnswer || "Awaiting voice input..."}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Button
            onClick={toggleRecording}
            disabled={isAiGenerating || loading}
            className={cn(
              "w-full h-14 rounded-[1.2rem] text-sm font-black transition-all duration-500 shadow-xl",
              isRecording 
                ? "bg-red-500 hover:bg-red-600 text-white shadow-red-100" 
                : "bg-neutral-900 hover:bg-black text-white"
            )}
          >
            {isRecording ? (
              <div className="flex items-center gap-3"><StopCircle className="w-5 h-5" /> Stop Recording</div>
            ) : (
              <div className="flex items-center gap-3">
                {isAiGenerating ? <Loader className="w-5 h-5 animate-spin" /> : <Mic className="w-5 h-5" />}
                {isAiGenerating ? "Analyzing..." : "Record Answer"}
              </div>
            )}
          </Button>

          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              size="sm"
              className="rounded-xl h-10 text-[10px] font-black uppercase tracking-widest hover:bg-sky-50"
              onClick={() => { setUserAnswer(""); setAiResult(null); }}
            >
              <RefreshCw className="w-3 h-3 mr-2" /> Reset
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={!aiResult || loading}
              className="rounded-xl h-10 text-[10px] font-black uppercase tracking-widest border-emerald-200 text-emerald-600 hover:bg-emerald-50"
              onClick={() => setIsSaveModalOpen(true)}
            >
              <Save className="w-3 h-3 mr-2" /> Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
