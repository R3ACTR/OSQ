
import React from 'react';
import ParticipantsList from '../components/ParticipantsList';

// Define the Participant interface based on the API response
interface Participant {
  UniqueTag?: string;
  FullName: string;
  Role: string;
  LinkedIn?: string;
  GitHub?: string;
  Email?: string;
}

// Function to fetch and filter participants
async function getParticipants(): Promise<Participant[]> {
  try {
    const res = await fetch('https://osq-config-api.sreehari14shr.workers.dev', {
      next: { revalidate: 3600, tags: ['participants'] } // Revalidate every hour or on demand
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    
    const data: Participant[] = await res.json();
    // Filter for participants
    return data.filter(p => p.Role === 'participants');
  } catch (error) {
    console.error('Error fetching participants:', error);
    return [];
  }
}

export default async function ParticipantsPage() {
  const participants = await getParticipants();

  return (
    <div className="relative min-h-screen w-full bg-white text-black overflow-hidden pt-32 pb-20">
      
      {/* Background Texture */}
      <div className="absolute inset-0 z-0 opacity-60 pointer-events-none" style={{
        backgroundImage: "radial-gradient(#e4e4e7 1px, transparent 1px)",
        backgroundSize: "24px 24px"
      }} />

      <ParticipantsList participants={participants} />

    </div>
  );
}
