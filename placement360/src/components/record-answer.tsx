import { useEffect, useState } from "react";
import { Button } from "./ui/Button";
import Webcam from "react-webcam";
import { Mic, StopCircle, Video, VideoOff, Activity, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { chatSession } from "@/scripts";
import { db } from "@/config/firebase.config";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useAuth } from "@clerk/clerk-react";
import { useParams } from "react-router";
import { cn } from "@/lib/utils";

interface RecordAnswerProps {
  question: { question: string; answer: string };
  isWebCam: boolean;
  setIsWebCam: (value: boolean) => void;
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

  const toggleRecording = () => {
    if (isRecording) {
      recognition?.stop();
      setIsRecording(false);
      if (userAnswer.length > 10) {
        updateUserAnswer();
      } else {
        toast.error("Answer too short", {
          description: "Please speak more to record an answer.",
        });
      }
    } else {
      setUserAnswer("");
      recognition?.start();
      setIsRecording(true);
    }
  };

  const cleanAiResponse = (responseText: string) => {
    let cleanText = responseText.trim();
    cleanText = cleanText.replace(/(json|```|`)/g, "");
    const jsonArrayMatch = cleanText.match(/\{.*\}/s);
    if (jsonArrayMatch) {
      cleanText = jsonArrayMatch[0];
    } else {
      throw new Error("No JSON object found in response");
    }

    try {
      return JSON.parse(cleanText);
    } catch (error) {
      throw new Error("Invalid JSON format: " + (error as Error)?.message);
    }
  };

  const updateUserAnswer = async () => {
    setLoading(true);
    const feedbackPrompt = `
      Question: ${question.question}
      User Answer: ${userAnswer}
      Correct Answer: ${question.answer}

      Based on the user answer for the given interview question, please provide a rating (out of 10) and feedback as area of improvement if any. Return the response strictly in JSON format with "rating" and "feedback" fields.
    `;

    try {
      const result = await chatSession.sendMessage(feedbackPrompt);
      const jsonResponse = cleanAiResponse(result.response.text());

      await addDoc(collection(db, "userAnswers"), {
        mockIdRef: interviewId,
        question: question.question,
        correct_ans: question.answer,
        user_ans: userAnswer,
        feedback: jsonResponse.feedback,
        rating: jsonResponse.rating,
        userId: userId,
        createdAt: serverTimestamp(),
      });

      toast.success("Answer Recorded", {
        description: "Your answer has been saved with AI feedback.",
      });
      setUserAnswer("");
    } catch (error) {
      console.error(error);
      toast.error("Error saving answer", {
        description: "Failed to process your answer. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col xl:flex-row items-stretch gap-6 w-full">
      {/* Webcam Section - More compact */}
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
             <p className="text-[9px] font-black uppercase tracking-[0.2em] text-neutral-700">Video Disabled</p>
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

      {/* Controls & Transcript Section - Narrower & Tighter */}
      <div className="w-full xl:w-[320px] flex flex-col gap-4 justify-between">
        <div className="flex flex-col gap-4 h-full">
          {/* Transcript Area */}
          <div className={cn(
            "flex-[2] min-h-[220px] p-6 rounded-[1.5rem] border transition-all duration-500 flex flex-col",
            isRecording ? "bg-red-50/30 border-red-100 shadow-inner" : "bg-neutral-50/50 border-neutral-100"
          )}>
            <div className="flex items-center justify-between mb-4">
               <div className="flex items-center gap-2">
                 <Activity className={cn("w-3.5 h-3.5", isRecording ? "text-red-500" : "text-neutral-400")} />
                 <span className="text-[9px] font-black text-neutral-400 uppercase tracking-widest">Live Capture</span>
               </div>
            </div>
            
            <div className="flex-1 overflow-y-auto max-h-[180px] pr-2">
              <p className={cn(
                "text-base leading-relaxed font-medium",
                userAnswer ? (isRecording ? "text-red-900/80" : "text-neutral-700") : "text-neutral-300 italic"
              )}>
                {userAnswer || "Awaiting voice input..."}
              </p>
            </div>
          </div>

          {/* Record Button - More compact to give space to transcript */}
          <Button
            onClick={toggleRecording}
            disabled={loading}
            className={cn(
              "w-full h-14 rounded-[1.2rem] text-sm font-black transition-all duration-500 shadow-xl relative overflow-hidden group",
              isRecording 
                ? "bg-red-500 hover:bg-red-600 text-white" 
                : "bg-neutral-900 hover:bg-black text-white"
            )}
          >
            <div className="flex items-center justify-center gap-3 relative z-10">
              {isRecording ? (
                <>
                  <StopCircle className="w-5 h-5" /> Stop Recording
                </>
              ) : (
                <>
                  <Mic className={cn("w-5 h-5 transition-transform group-hover:scale-110", loading && "animate-pulse")} />
                  {loading ? "Analyzing..." : "Record Answer"}
                </>
              )}
            </div>
          </Button>
        </div>

        {/* Small Navigation/Hint */}
        <div className="flex items-center justify-center gap-2 text-neutral-400">
           <span className="text-[9px] font-bold uppercase tracking-widest">Interview Active</span>
           <ChevronRight className="w-2.5 h-2.5" />
        </div>
      </div>
    </div>
  );
};
