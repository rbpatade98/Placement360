import { Target, Sparkles, Users, BookOpen } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

const About = () => {
  return (
    <div className="w-full h-full flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="text-center mb-16 max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight lg:text-5xl text-primary mb-6">About Placement360</h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          We are dedicated to helping students and professionals track, prepare, and succeed in their placement journeys through AI-driven mock interviews and real-time actionable feedback.
        </p>
      </div>

      {/* Core Values Section */}
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        <Card className="border-none shadow-md bg-white/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex flex-col items-center gap-4 text-center">
              <div className="p-3 rounded-full bg-primary/10 text-primary">
                <Target className="w-8 h-8" />
              </div>
              Our Mission
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center text-muted-foreground">
            To bridge the gap between academic learning and industry expectations by providing accessible interview preparation tools.
          </CardContent>
        </Card>

        <Card className="border-none shadow-md bg-white/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex flex-col items-center gap-4 text-center">
              <div className="p-3 rounded-full bg-primary/10 text-primary">
                <Sparkles className="w-8 h-8" />
              </div>
              AI-Powered
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center text-muted-foreground">
            Leveraging cutting-edge AI to simulate real interview environments and deliver personalized, actionable feedback instantly.
          </CardContent>
        </Card>

        <Card className="border-none shadow-md bg-white/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex flex-col items-center gap-4 text-center">
              <div className="p-3 rounded-full bg-primary/10 text-primary">
                <Users className="w-8 h-8" />
              </div>
              For Everyone
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center text-muted-foreground">
            Whether you are a fresh graduate or an experienced professional, our platform adapts to your specific role and experience level.
          </CardContent>
        </Card>

        <Card className="border-none shadow-md bg-white/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex flex-col items-center gap-4 text-center">
              <div className="p-3 rounded-full bg-primary/10 text-primary">
                <BookOpen className="w-8 h-8" />
              </div>
              Continuous Growth
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center text-muted-foreground">
            We believe in continuous learning. Practice repeatedly, analyze your past performance, and watch your confidence grow.
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;
