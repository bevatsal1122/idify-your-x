'use client';

import Image from 'next/image';
import { MapPin, Users } from 'lucide-react';
import type { AnalysisResult } from '@/types';

interface Props {
  profile: AnalysisResult['profile'];
  summary: string;
  analyzedTweetsCount: number;
}

export function ProfileCard({ profile, summary, analyzedTweetsCount }: Props) {
  return (
    <div className="bg-white border border-surface-border rounded-2xl p-6 animate-slide-up">
      <div className="flex items-start gap-4">
        {profile.avatar && (
          <Image
            src={profile.avatar}
            alt={profile.name}
            width={64}
            height={64}
            className="rounded-full"
          />
        )}
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-bold text-content">{profile.name}</h3>
          <p className="text-content-secondary">@{profile.username}</p>
          <div className="flex items-center gap-4 mt-1 text-sm text-content-tertiary">
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5" />
              {profile.followers.toLocaleString()} followers
            </span>
            {profile.location && (
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                {profile.location}
              </span>
            )}
          </div>
        </div>
        <span className="text-xs bg-surface-secondary text-content-secondary px-2.5 py-1 rounded-full whitespace-nowrap">
          {analyzedTweetsCount} tweets analyzed
        </span>
      </div>

      {profile.bio && (
        <p className="mt-4 text-content-secondary text-sm border-l-2 border-brand-200 pl-3">
          {profile.bio}
        </p>
      )}

      {summary && (
        <div className="mt-4 bg-brand-50 rounded-xl p-4">
          <p className="text-sm text-content leading-relaxed">{summary}</p>
        </div>
      )}
    </div>
  );
}
