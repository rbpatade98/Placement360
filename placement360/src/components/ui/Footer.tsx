import React from "react";
import { Globe, Mail, MapPin, Phone, Send, Camera, User2 } from "lucide-react";
import { Link } from "react-router";
import { Container } from "@/components/Container";
import { MainRoutes } from "@/lib/helpers";

interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
  hoverColor: string;
}

const SocialLink: React.FC<SocialLinkProps> = ({ href, icon, hoverColor }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`p-2 rounded-full bg-neutral-800 text-neutral-400 transition-all duration-300 hover:scale-110 ${hoverColor}`}
    >
      {icon}
    </a>
  );
};

interface FooterLinkProps {
  to: string;
  children: React.ReactNode;
}

const FooterLink: React.FC<FooterLinkProps> = ({ to, children }) => {
  return (
    <li>
      <Link
        to={to}
        className="text-neutral-400 hover:text-white transition-colors duration-200 text-sm"
      >
        {children}
      </Link>
    </li>
  );
};

const Footer = () => {
  return (
    <footer className="w-full bg-neutral-950 border-t border-neutral-800 text-neutral-300 py-16 mt-auto">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand Column */}
          <div className="md:col-span-4 space-y-6">
            <div className="font-bold text-2xl tracking-tight flex items-center gap-2 text-white">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
              </div>
              Placement360
            </div>
            <p className="text-neutral-400 text-sm leading-relaxed max-w-sm">
              Empowering candidates with AI-driven interview preparation and career insights. Unleash your full potential and land your dream job with Placement360.
            </p>
            <div className="flex gap-3">
              <SocialLink
                href="https://facebook.com"
                icon={<Globe size={18} />}
                hoverColor="hover:bg-blue-600 hover:text-white"
              />
              <SocialLink
                href="https://twitter.com"
                icon={<Send size={18} />}
                hoverColor="hover:bg-sky-500 hover:text-white"
              />
              <SocialLink
                href="https://instagram.com"
                icon={<Camera size={18} />}
                hoverColor="hover:bg-pink-600 hover:text-white"
              />
              <SocialLink
                href="https://linkedin.com"
                icon={<User2 size={18} />}
                hoverColor="hover:bg-blue-700 hover:text-white"
              />
            </div>
          </div>

          {/* Links Column */}
          <div className="md:col-span-2">
            <h3 className="font-semibold text-white mb-6 uppercase tracking-wider text-xs">Quick Links</h3>
            <ul className="space-y-4">
              {MainRoutes.map((route) => (
                <FooterLink key={route.href} to={route.href}>
                  {route.Label}
                </FooterLink>
              ))}
            </ul>
          </div>

          {/* Services Column */}
          <div className="md:col-span-3">
            <h3 className="font-semibold text-white mb-6 uppercase tracking-wider text-xs">Services</h3>
            <ul className="space-y-4">
              <FooterLink to="/services/interview-prep">AI Mock Interviews</FooterLink>
              <FooterLink to="/services/career-coaching">Career Coaching</FooterLink>
              <FooterLink to="/services/resume-building">Resume Analysis</FooterLink>
              <FooterLink to="/services/skill-gap">Skill Gap Analysis</FooterLink>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="md:col-span-3 space-y-6">
            <h3 className="font-semibold text-white mb-6 uppercase tracking-wider text-xs">Contact Us</h3>
            <div className="space-y-4 text-sm text-neutral-400">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-primary shrink-0" />
                <span>123 AI Street, Tech City, Silicon Valley, CA 94043</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-primary shrink-0" />
                <span>+1 (555) 000-0000</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-primary shrink-0" />
                <span>support@placement360.ai</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-neutral-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-neutral-500">
          <p>© 2026 Placement360. All rights reserved.</p>
          <div className="flex gap-8">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/cookies" className="hover:text-white transition-colors">Cookie Settings</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;