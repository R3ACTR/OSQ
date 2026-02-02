"use client";

import React, { useState, useMemo, useTransition } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Github, Linkedin, User, Search, RefreshCw } from 'lucide-react';
import { refreshParticipants } from '../participants/actions';

interface Participant {
  UniqueTag?: string;
  FullName: string;
  Role: string;
  LinkedIn?: string;
  GitHub?: string;
  Email?: string;
}

interface ParticipantsListProps {
  participants: Participant[];
}

// Helper: Extract GitHub Username from URL
function getGithubUsername(url: string = ''): string | null {
  try {
     let cleanUrl = url.trim();
     if (!cleanUrl) return null;
     cleanUrl = cleanUrl.replace(/^https?:\/\//, '');
     cleanUrl = cleanUrl.replace(/^www\./, '');
     if (!cleanUrl.toLowerCase().startsWith('github.com/')) return null;
     const parts = cleanUrl.split('/');
     return parts[1] || null;
  } catch {
     return null;
  }
}

export default function ParticipantsList({ participants }: ParticipantsListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleRefresh = () => {
    startTransition(async () => {
      await refreshParticipants();
    });
  };

  const filteredParticipants = useMemo(() => {
    if (!searchQuery.trim()) return participants;
    const query = searchQuery.toLowerCase();
    return participants.filter(p => 
      p.FullName.toLowerCase().includes(query)
    );
  }, [participants, searchQuery]);

  return (
    <div className="relative z-10 container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col items-center mb-16">
          <h1 className="text-5xl md:text-7xl font-[family-name:var(--font-passero)] tracking-wider text-center mb-6">
            PARTICIPANTS
          </h1>
          <div className="h-2 w-32 bg-[#bfff00] border-2 border-black rotate-2" />
          
          <div className="mt-8 flex flex-col items-center gap-6 w-full max-w-2xl">
             <p className="text-xl font-bold text-zinc-600 text-center">
                Meet the amazing individuals taking part in the Open Source Quest.
             </p>
             
             {/* Stats & Search Row */}
             <div className="flex flex-col md:flex-row items-center gap-4 w-full">
                <div className="px-6 py-3 bg-black text-white font-[family-name:var(--font-passero)] text-xl rounded-full border-2 border-[#bfff00] shrink-0">
                    TOTAL: {filteredParticipants.length}
                </div>
                
                <button 
                  onClick={handleRefresh}
                  disabled={isPending}
                  className="px-4 py-3 bg-white hover:bg-zinc-100 text-black border-2 border-black rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  title="Refresh List"
                >
                  <RefreshCw className={`w-5 h-5 ${isPending ? 'animate-spin' : ''}`} />
                  <span className="font-bold hidden md:inline">REFRESH</span>
                </button>
                
                <div className="relative w-full">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400">
                        <Search className="w-5 h-5" />
                    </div>
                    <input 
                        type="text"
                        placeholder="Search participants..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-6 py-3 bg-white border-2 border-zinc-200 rounded-full focus:outline-none focus:border-black focus:ring-2 focus:ring-[#bfff00]/50 transition-all font-bold placeholder:font-normal"
                    />
                </div>
             </div>
          </div>
        </div>

        {/* Participants List */}
        {filteredParticipants.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredParticipants.map((participant, index) => {
              const githubUsername = getGithubUsername(participant.GitHub);
              const avatarUrl = githubUsername ? `https://github.com/${githubUsername}.png` : null;

              return (
                <div 
                    key={index} 
                    className="group relative bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-200 flex flex-col items-center text-center h-full"
                >
                    {/* Avatar / Initials */}
                    <div className="w-24 h-24 mb-6 rounded-full bg-[#fae8ff] border-4 border-black flex items-center justify-center overflow-hidden shrink-0 group-hover:scale-110 transition-transform duration-300 relative">
                         {avatarUrl ? (
                            <Image 
                                src={avatarUrl}
                                alt={participant.FullName}
                                fill
                                className="object-cover"
                                unoptimized
                            />
                         ) : (
                            <span className="font-[family-name:var(--font-passero)] text-3xl">
                                {participant.FullName ? participant.FullName.charAt(0).toUpperCase() : '?'}
                            </span>
                         )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 w-full mb-6">
                        <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tight break-words line-clamp-2 min-h-[3rem]">
                        {participant.FullName}
                        </h3>
                        <div className="inline-block px-3 py-1 bg-zinc-100 text-xs font-bold uppercase tracking-widest mt-2 border border-zinc-200 rounded-full">
                        Participant
                        </div>
                    </div>

                    {/* Social Links */}
                    <div className="flex items-center gap-4 mt-auto">
                        {participant.GitHub && (
                        <Link 
                            href={participant.GitHub.startsWith('http') ? participant.GitHub : `https://${participant.GitHub}`} 
                            target="_blank"
                             className="p-3 bg-zinc-50 hover:bg-black hover:text-white border-2 border-zinc-200 hover:border-black rounded-xl transition-all"
                            title="GitHub"
                        >
                            <Github className="w-5 h-5" />
                        </Link>
                        )}
                        
                        {participant.LinkedIn && (
                        <Link 
                            href={participant.LinkedIn.startsWith('http') ? participant.LinkedIn : `https://${participant.LinkedIn}`} 
                            target="_blank"
                            className="p-3 bg-zinc-50 hover:bg-[#0077b5] hover:text-white border-2 border-zinc-200 hover:border-black rounded-xl transition-all"
                            title="LinkedIn"
                        >
                            <Linkedin className="w-5 h-5" />
                        </Link>
                        )}

                        {!participant.GitHub && !participant.LinkedIn && (
                            <div className="p-3 bg-zinc-50 opacity-20 cursor-not-allowed border-2 border-zinc-200 rounded-xl">
                                <User className="w-5 h-5" />
                            </div>
                        )}
                    </div>
                </div>
              );
            })}
          </div>
        ) : (
           <div className="text-center py-20 flex flex-col items-center">
              <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center mb-4">
                <Search className="w-8 h-8 text-zinc-300" />
              </div>
              <h2 className="text-2xl font-bold text-zinc-400">No participants found matching "{searchQuery}"</h2>
           </div>
        )}
        
        {/* Back Button */}
         <div className="mt-20 text-center">
            <Link 
                href="/" 
                className="inline-block px-8 py-3 bg-black text-white font-bold text-lg hover:bg-[#bfff00] hover:text-black border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all"
            >
                BACK TO HOME
            </Link>
         </div>
    </div>
  );
}
