import { BrainCircuit, FileText, BarChart, Code } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

const Services = () => {
  return (
    <div className="w-full h-full flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="text-center mb-16 max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight lg:text-5xl text-primary mb-6">Our Services</h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Elevate your interview preparation with our comprehensive suite of AI-powered tools designed to help you land your dream job.
        </p>
      </div>

      {/* Services Grid */}
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <Card className="border-none shadow-md bg-white/50 backdrop-blur-sm hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <div className="p-3 w-14 h-14 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
              <BrainCircuit className="w-8 h-8" />
            </div>
            <CardTitle className="text-2xl">AI Mock Interviews</CardTitle>
            <CardDescription className="text-base">
              Experience realistic interview scenarios with our advanced AI.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            Our AI generates highly relevant, technical, and behavioral questions based on your target job role and experience level. Practice speaking your answers aloud in a pressure-free environment.
          </CardContent>
        </Card>

        <Card className="border-none shadow-md bg-white/50 backdrop-blur-sm hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <div className="p-3 w-14 h-14 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
              <BarChart className="w-8 h-8" />
            </div>
            <CardTitle className="text-2xl">Real-time Feedback</CardTitle>
            <CardDescription className="text-base">
              Instant, actionable insights to improve your performance.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            Get immediate feedback on your answers, including suggestions for improvement, missing keywords, and better phrasing to ensure you hit all the critical points in your actual interview.
          </CardContent>
        </Card>

        <Card className="border-none shadow-md bg-white/50 backdrop-blur-sm hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <div className="p-3 w-14 h-14 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
              <Code className="w-8 h-8" />
            </div>
            <CardTitle className="text-2xl">Custom Tech Stacks</CardTitle>
            <CardDescription className="text-base">
              Tailored questions for your specific technology stack.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            Whether you're a React developer, a Python data scientist, or a DevOps engineer, our platform generates domain-specific questions to test your exact technical expertise.
          </CardContent>
        </Card>

        <Card className="border-none shadow-md bg-white/50 backdrop-blur-sm hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <div className="p-3 w-14 h-14 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
              <FileText className="w-8 h-8" />
            </div>
            <CardTitle className="text-2xl">Interview History</CardTitle>
            <CardDescription className="text-base">
              Track your progress and review past performances.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            Access a comprehensive dashboard of all your past interviews. Review your answers, monitor your improvement over time, and revisit complex questions before the big day.
          </CardContent>
        </Card>
      </div>

      {/* CTA Section */}
      <div className="w-full max-w-4xl text-center bg-primary/5 p-10 rounded-2xl">
        <h2 className="text-3xl font-bold mb-4">Ready to ace your next interview?</h2>
        <p className="text-muted-foreground text-lg mb-8">
          Join Placement360 today and start practicing with our AI-driven tools.
        </p>
        <Button size="lg" className="px-8 py-6 text-lg">
          Get Started Now
        </Button>
      </div>
    </div>
  );
};

export default Services;
