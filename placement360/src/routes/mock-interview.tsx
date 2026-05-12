import type { Interview } from "@/types/index";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { LoaderPage } from "./LoaderPage";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/config/firebase.config";
import { CustomBreadCrumb } from "../components/CustomBreadCrumb";

import { Lightbulb, Info } from "lucide-react";
import { QuestionSection } from "@/components/QuestionSection";

export const MockInterviewPage = () => {
  const { interviewId } = useParams<{ interviewId: string }>();
  const [interview, setInterview] = useState<Interview | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    const fetchInterview = async () => {
      if (interviewId) {
        try {
          const interviewDoc = await getDoc(doc(db, "interviews", interviewId));
          if (interviewDoc.exists()) {
            setInterview({
              id: interviewDoc.id,
              ...interviewDoc.data(),
            } as Interview);
          }
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchInterview();
  }, [interviewId, navigate]);

  if (isLoading) {
    return <LoaderPage className="w-full h-[70vh]" />;
  }

  if (!interviewId || !interview) {
    return <LoaderPage className="w-full h-[70vh]" />;
  }

  return (
    <div className="flex flex-col w-full gap-8 py-8 px-4 md:px-0 max-w-7xl mx-auto">
      <CustomBreadCrumb
        breadCrumbPage="Start"
        breadCrumbItems={[
          { label: "Mock Interviews", link: "/generate" },
          {
            label: interview?.position || "",
            link: `/generate/interview/${interview?.id}`,
          },
        ]}
      />

      {/* Modern Information Banner */}
      <div className="w-full bg-gradient-to-r from-sky-500/5 to-emerald-500/5 border border-sky-100 rounded-[2rem] p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
        <div className="w-16 h-16 rounded-2xl bg-sky-100 flex items-center justify-center text-sky-600 shrink-0">
          <Lightbulb className="w-8 h-8" />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-lg font-bold text-sky-900 mb-1 flex items-center justify-center md:justify-start gap-2">
            Interviewing for <span className="text-emerald-600">{interview.position}</span>
          </h3>
          <p className="text-sm text-sky-700/80 leading-relaxed max-w-3xl">
            Click "Record Answer" to start. We'll transcribe your voice in real-time and provide AI-powered feedback comparing your response to industry standards. 
            <span className="inline-flex items-center gap-1 ml-1 text-sky-900 font-semibold"><Info className="w-3 h-3" /> Your video is never saved.</span>
          </p>
        </div>
      </div>

      {interview?.questions && interview?.questions.length > 0 && (
        <div className="w-full">
          <QuestionSection questions={interview?.questions} />
        </div>
      )}
    </div>
  );
};