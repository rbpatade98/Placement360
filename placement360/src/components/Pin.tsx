import type { Interview } from "@/types";
import { useNavigate } from "react-router";
import {
  Card,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/Card";
import { Badge } from "./ui/Badge";
import { cn } from "@/lib/utils";
import { TooltipButton } from "./tooltip-button";
import { Eye, Newspaper, Sparkles } from "lucide-react";

interface InterviewPinProps {
  interview: Interview;
  onMockPage?: boolean;
}

export const InterviewPin = ({
  interview,
  onMockPage = false,
}: InterviewPinProps) => {
  const navigate = useNavigate();

  // Helper to split tech stack by various delimiters (comma, slash, or multiple spaces)
  const techStackArray = interview?.techStack
    ? interview.techStack.split(/[,\/]+|\s{2,}/).map((s) => s.trim()).filter(Boolean)
    : [];

  return (
    <Card className="p-5 rounded-xl shadow-sm border border-border hover:shadow-md hover:border-primary/20 transition-all duration-300 flex flex-col justify-between min-h-[280px]">
      <div className="space-y-4">
        <CardTitle className="text-xl font-bold line-clamp-1 text-foreground">
          {interview?.position}
        </CardTitle>
        
        <CardDescription className="line-clamp-3 text-sm text-muted-foreground min-h-[60px]">
          {interview?.description}
        </CardDescription>

        <div className="w-full flex flex-wrap gap-1.5 pt-2">
          {techStackArray.map((word, index) => (
            <Badge
              key={index}
              variant={"secondary"}
              className="text-[10px] px-2 py-0.5 font-medium bg-muted/50 text-muted-foreground border-transparent hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 transition-colors"
            >
              {word}
            </Badge>
          ))}
        </div>
      </div>

      <CardFooter
        className={cn(
          "w-full flex items-center p-0 mt-6 pt-4 border-t border-border/50",
          onMockPage ? "justify-end" : "justify-between"
        )}
      >
        <div className="flex flex-col">
          <p className="text-[10px] font-medium text-muted-foreground/70 uppercase tracking-wider">
            Created on
          </p>
          <p className="text-[11px] font-semibold text-muted-foreground">
            {new Date(interview?.createdAt.toDate()).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>

        {!onMockPage && (
          <div className="flex items-center gap-1">
            <TooltipButton
              content="View Details"
              buttonVariant={"ghost"}
              onClick={() => navigate(`/generate/${interview?.id}`, { replace: true })}
              disabled={false}
              buttonClassName="h-8 w-8 hover:bg-sky-50 hover:text-sky-600 rounded-full"
              icon={<Eye className="h-4 w-4" />}
              loading={false}
            />

            <TooltipButton
              content="View Feedback"
              buttonVariant={"ghost"}
              onClick={() => navigate(`/generate/feedback/${interview?.id}`, { replace: true })}
              disabled={false}
              buttonClassName="h-8 w-8 hover:bg-yellow-50 hover:text-yellow-600 rounded-full"
              icon={<Newspaper className="h-4 w-4" />}
              loading={false}
            />

            <TooltipButton
              content="Start Interview"
              buttonVariant={"ghost"}
              onClick={() => navigate(`/generate/interview/${interview?.id}`, { replace: true })}
              disabled={false}
              buttonClassName="h-8 w-8 hover:bg-emerald-50 hover:text-emerald-600 rounded-full"
              icon={<Sparkles className="h-4 w-4" />}
              loading={false}
            />
          </div>
        )}
      </CardFooter>
    </Card>
  );
};