"use client";

import React, { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Shield, BookOpen, Code, Trophy, AlertTriangle, HelpCircle, Users, Clock, Ban, Gavel, Award } from "lucide-react";
import Footer from "../components/Footer";

gsap.registerPlugin(ScrollTrigger);

const rules = [
  {
    icon: <Shield className="w-8 h-8 md:w-10 md:h-10 text-black" />,
    title: "Code of Conduct",
    content: "All participants must follow professional and respectful behavior. Harassment, discrimination, hate speech, or abusive language will lead to immediate disqualification. Maintain a collaborative and inclusive environment for everyone.",
    color: "bg-[#bfff00]",
    textColor: "text-black"
  },
  {
    icon: <Code className="w-8 h-8 md:w-10 md:h-10 text-[#bfff00]" />,
    title: "Contribution Rules",
    content: "Contributions must be made only to the projects listed on the OSQ platform. Only meaningful contributions (valid pull requests, issue resolutions, feature implementations, documentation improvements) will be considered. Spam PRs, low-effort commits, or irrelevant changes will not be counted.",
    color: "bg-zinc-900",
    textColor: "text-white"
  },
  {
    icon: <BookOpen className="w-8 h-8 md:w-10 md:h-10 text-black" />,
    title: "Pull Requests (PRs)",
    content: "PRs must be clearly described, properly linked to an issue (if applicable), and follow the project’s contribution guidelines. Duplicate PRs or copied code will result in rejection. Maintainers’ decisions on PR acceptance are final.",
    color: "bg-white",
    textColor: "text-black"
  },
  {
    icon: <Award className="w-8 h-8 md:w-10 md:h-10 text-[#bfff00]" />,
    title: "Scoring & Evaluation",
    content: "Points are awarded based on: Quality of contribution, Complexity of work, and Impact on the project. Quantity alone does not guarantee higher scores. The OSQ team reserves the right to adjust scores to maintain fairness.",
    color: "bg-zinc-900",
    textColor: "text-white"
  },
  {
    icon: <Users className="w-8 h-8 md:w-10 md:h-10 text-black" />,
    title: "Project Maintainers",
    content: "Maintainers must review PRs honestly and fairly. Any misuse of maintainer privileges will result in project removal from OSQ. Maintainers must not favor specific contributors.",
    color: "bg-[#bfff00]",
    textColor: "text-black"
  },
  {
    icon: <Clock className="w-8 h-8 md:w-10 md:h-10 text-[#bfff00]" />,
    title: "Deadlines",
    content: "Contributions made after the event deadline will not be considered. All timestamps will follow IST (Indian Standard Time).",
    color: "bg-zinc-900",
    textColor: "text-white"
  },
  {
    icon: <Ban className="w-8 h-8 md:w-10 md:h-10 text-black" />,
    title: "Disqualification",
    content: "Participants may be disqualified for: Violating rules or code of conduct, Spamming PRs/issues, Plagiarism or misconduct, or Attempting to manipulate the leaderboard.",
    color: "bg-white",
    textColor: "text-black"
  },
  {
    icon: <Gavel className="w-8 h-8 md:w-10 md:h-10 text-[#bfff00]" />,
    title: "Final Authority",
    content: "The OSQ organizing team’s decisions are final. Rules may be updated during the event; participants will be notified accordingly.",
    color: "bg-zinc-900",
    textColor: "text-white"
  },
];

const faqs = [
  {
    q: "Will I get a confirmation email after registration?",
    a: "No. We do not send confirmation emails. You can verify your registration by checking the Participants List on our official website."
  },
  {
    q: "How can I check if my registration is successful?",
    a: "Visit the Participants page on the OSQ website and search using your registered email ID or name."
  },
  {
    q: "How do I get my OSQ ID Card?",
    a: "You can generate your OSQ ID Card from the ID Card page using your registered email address."
  },
  {
    q: "When does OSQ start and end?",
    a: "The event timeline, including start and end dates, is clearly mentioned on the official OSQ website. All deadlines follow IST (Indian Standard Time)."
  },
  {
    q: "Can I participate as a team?",
    a: "No. OSQ is an individual-based event. Each participant must contribute using their own GitHub account."
  },
  {
    q: "What kind of contributions are allowed?",
    a: "Valid contributions include: Bug fixes, Feature implementations, Documentation improvements, Issue resolutions. Low-effort, spam, or irrelevant PRs will not be considered."
  },
  {
    q: "Is the use of AI tools allowed?",
    a: "Yes, AI tools are allowed. However, you must clearly mention the use of AI tools in your Pull Request description."
  },
  {
    q: "How is scoring done?",
    a: "Scoring is based on: Quality of contribution, Complexity, Impact on the project. Quantity alone does not guarantee higher points."
  },
  {
    q: "Is there a public leaderboard?",
    a: "Yes. The leaderboard is available on the official OSQ website and is updated periodically."
  },
  {
    q: "What happens if my PR is rejected?",
    a: "Rejected PRs will not be counted for scoring. The decision of the project maintainer is final."
  },
  {
    q: "Can I change my registered email or GitHub username?",
    a: "No. Once registered, details cannot be changed. Make sure to register with correct information."
  },
  {
    q: "Will all participants get certificates?",
    a: "Certificates will be provided only to eligible participants, as per OSQ guidelines. Details will be announced officially."
  },
  {
    q: "Where will official updates be shared?",
    a: "All official announcements will be shared via: OSQ Website, Official WhatsApp / Discord / Community channels. Avoid trusting information from unofficial sources."
  },
  {
    q: "How can I contact the OSQ team?",
    a: "You can reach out via the contact section on the OSQ website or through official community channels."
  }
];

export default function RulesPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.from(".header-reveal", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out",
      });




      
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen w-full bg-white relative overflow-hidden flex flex-col">
      {/* Background Texture */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none" style={{
        backgroundImage: "radial-gradient(#e4e4e7 1px, transparent 1px)",
        backgroundSize: "24px 24px"
      }} />

      <main className="flex-grow pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto w-full z-10">
        
        {/* Header Section */}
        <div className="mb-20 space-y-4 text-center">
          <h1 className="header-reveal text-6xl md:text-9xl font-[family-name:var(--font-passero)] text-black leading-none">
            RULES & INFO
          </h1>
          <p className="header-reveal text-xl md:text-2xl text-zinc-500 font-light max-w-2xl mx-auto">
            Everything you need to know to navigate the Open Source Quest.
          </p>
        </div>

        {/* Rules Grid */}
        <div className="rules-grid grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
          {rules.map((rule, index) => (
            <div 
              key={index}
              className={`rule-card p-8 md:p-12 rounded-3xl ${rule.color} ${rule.textColor} shadow-xl hover:scale-[1.02] transition-transform duration-300 flex flex-col justify-between border-2 border-black h-full`}
            >
              <div className="mb-6">
                {rule.icon}
              </div>
              <div>
                <h3 className="text-3xl font-[family-name:var(--font-passero)] mb-4">{rule.title}</h3>
                <p className="text-lg opacity-90 leading-relaxed font-medium">
                  {rule.content}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Separator */}
        <div className="w-full flex items-center justify-center py-12 mb-12">
           <div className="w-full max-w-lg h-[2px] bg-gradient-to-r from-transparent via-zinc-300 to-transparent relative">
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-[#bfff00] border-2 border-black rotate-45" />
           </div>
        </div>

        {/* FAQ Section */}
        <div className="faq-section max-w-4xl mx-auto mb-20">
          <div className="flex items-center gap-4 mb-12 justify-center">
             <HelpCircle className="w-10 h-10 md:w-12 md:h-12 text-[#bfff00] fill-black" />
             <h2 className="text-5xl md:text-7xl font-[family-name:var(--font-passero)] text-black">
               FAQ
             </h2>
          </div>
          
          <div className="grid gap-6">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item group bg-zinc-50 border border-zinc-200 p-8 rounded-2xl hover:bg-black hover:text-white transition-all duration-300">
                <h3 className="text-xl md:text-2xl font-bold mb-3 font-[family-name:var(--font-passero)] group-hover:text-[#bfff00] transition-colors">{faq.q}</h3>
                <p className="text-lg text-zinc-600 group-hover:text-zinc-300">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center py-12">
          <Link 
            href="/title"
            className="inline-block px-12 py-5 bg-[#bfff00] text-black rounded-full font-[family-name:var(--font-passero)] text-2xl md:text-3xl tracking-wider shadow-2xl border-4 border-black hover:scale-105 active:scale-95 transition-transform duration-200"
          >
            VIEW TITLES
          </Link>
          <p className="mt-6 text-zinc-400 font-mono text-sm">Check out the exclusive titles awarded to contributors.</p>
        </div>

        {/* CTA */}


      </main>

      <Footer />
    </div>
  );
}
