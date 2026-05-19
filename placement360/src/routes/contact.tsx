import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";

const Contact = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight lg:text-5xl text-primary mb-4">Contact Us</h1>
        <p className="max-w-[600px] text-lg text-muted-foreground mx-auto">
          Have questions? Reach out to our support team and we'll be happy to help you.
        </p>
      </div>

      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col gap-6">
          <Card className="border-none shadow-md bg-white/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="text-primary" />
                Office Location
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>123 Innovation Drive</p>
              <p>Tech Valley, CA 94043</p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md bg-white/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="text-primary" />
                Phone
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>+1 (555) 123-4567</p>
              <p>Mon-Fri, 9am - 6pm PST</p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md bg-white/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="text-primary" />
                Email
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>support@placement360.com</p>
              <p>sales@placement360.com</p>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-lg border-primary/10">
          <CardHeader>
            <CardTitle>Send us a Message</CardTitle>
            <CardDescription>
              Fill out the form below and we'll get back to you as soon as possible.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="firstName" className="text-sm font-medium">First Name</label>
                  <Input id="firstName" placeholder="John" />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="lastName" className="text-sm font-medium">Last Name</label>
                  <Input id="lastName" placeholder="Doe" />
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-medium">Email Address</label>
                <Input id="email" type="email" placeholder="john.doe@example.com" />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                <Input id="subject" placeholder="How can we help?" />
              </div>
              
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm font-medium">Message</label>
                <Textarea id="message" placeholder="Type your message here..." className="min-h-[120px]" />
              </div>

              <Button type="submit" className="w-full mt-2 gap-2">
                Send Message
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Contact;
