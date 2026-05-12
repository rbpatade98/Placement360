import { useState } from "react";
import { Volume2 } from "lucide-react";
import { Button } from "./ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card";

interface QuestionSectionProps {
  questions: { question: string; answer: string }[];
}

export const QuestionSection = ({ questions }: QuestionSectionProps) => {
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  const textToSpeach = (text: string) => {
    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      alert("Sorry, your browser does not support text to speech");
    }
  };

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {questions.map((_, index) => (
            <Button
              key={index}
              variant={activeQuestionIndex === index ? "default" : "outline"}
              className="text-xs md:text-sm"
              onClick={() => setActiveQuestionIndex(index)}
            >
              Question #{index + 1}
            </Button>
          ))}
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-lg">Question</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg font-medium leading-relaxed">
              {questions[activeQuestionIndex]?.question}
            </p>
            <Button
              size="sm"
              variant="outline"
              onClick={() => textToSpeach(questions[activeQuestionIndex]?.question)}
            >
              <Volume2 className="mr-2 h-4 w-4" />
              Listen
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {/* Webcam and Recording section would go here */}
        <div className="p-8 border-2 border-dashed rounded-xl bg-muted/50 flex items-center justify-center min-h-[300px]">
          <p className="text-muted-foreground text-center">
            Webcam and Voice Recording Interface <br />
            (Coming soon in implementation)
          </p>
        </div>
      </div>
    </div>
  );
};
