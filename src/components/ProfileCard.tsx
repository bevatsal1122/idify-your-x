'use client';

import Image from 'next/image';
import { ArrowLeft, MapPin, CalendarDays, LinkIcon } from 'lucide-react';
import { IdifyAvatar } from './IdifyAvatar';
import type { AnalysisResult } from '@/types';

interface Props {
  profile: AnalysisResult['profile'];
  summary: string;
  analyzedTweetsCount: number;
  analyzedHighlightsCount: number;
  onBack: () => void;
}

export function ProfileCard({ profile, summary, analyzedTweetsCount, analyzedHighlightsCount, onBack }: Props) {
  return (
    <div className="animate-slide-up">
      {/* Profile header bar */}
      <div className="sticky top-0 z-20 bg-x-bg/80 backdrop-blur-md px-4 h-[53px] flex items-center gap-7">
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-[#181919] transition-colors cursor-pointer -ml-1"
        >
          <ArrowLeft className="w-5 h-5 text-x-text" />
        </button>
        <div className="min-w-0">
          <div className="flex items-center gap-1">
            <h2 className="text-[17px] font-extrabold text-x-text leading-5 truncate">{profile.name}</h2>
            <svg viewBox="0 0 22 22" className="w-[18px] h-[18px] fill-x-blue shrink-0">
              <path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.855-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.69-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.636.433 1.221.878 1.69.47.446 1.055.752 1.69.883.635.13 1.294.083 1.902-.141.27.587.7 1.086 1.24 1.44.54.354 1.167.551 1.813.568.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.223 1.26.27 1.894.14.634-.132 1.22-.437 1.69-.882.445-.47.749-1.055.878-1.691.13-.634.08-1.29-.144-1.898.587-.27 1.087-.7 1.443-1.242.355-.54.554-1.17.573-1.817z" /><path d="M9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z" fill="black" />
            </svg>
          </div>
          <p className="text-[13px] text-x-secondary leading-4">
            {analyzedTweetsCount} tweets{analyzedHighlightsCount > 0 ? ` · ${analyzedHighlightsCount} highlights` : ''} scanned
          </p>
        </div>
      </div>

      {/* Banner — shorter on mobile */}
      {profile.banner ? (
        <div className="h-[130px] sm:h-[200px] relative overflow-hidden">
          <Image
            src={profile.banner}
            alt="Banner"
            fill
            className="object-cover"
          />
        </div>
      ) : (
        <div className="h-[130px] sm:h-[200px] bg-[#333639]" />
      )}

      {/* Avatar + action button row */}
      <div className="px-4">
        <div className="flex justify-between items-start">
          {/* Avatar — smaller on mobile */}
          <div className="-mt-[48px] sm:-mt-[67px] relative">
            {profile.avatar ? (
              <>
                <Image
                  src={profile.avatar}
                  alt={profile.name}
                  width={134}
                  height={134}
                  className="rounded-full border-[4px] border-x-bg hidden sm:block"
                />
                <Image
                  src={profile.avatar}
                  alt={profile.name}
                  width={82}
                  height={82}
                  className="rounded-full border-[3px] border-x-bg sm:hidden"
                />
              </>
            ) : (
              <>
                <div className="w-[134px] h-[134px] rounded-full border-[4px] border-x-bg bg-x-tertiary hidden sm:block" />
                <div className="w-[82px] h-[82px] rounded-full border-[3px] border-x-bg bg-x-tertiary sm:hidden" />
              </>
            )}
          </div>
          <div className="mt-3">
            <button className="px-3 sm:px-4 py-1.5 border border-x-border rounded-full text-[13px] sm:text-[14px] font-bold text-x-text hover:bg-[#181919] transition-colors cursor-pointer">
              {analyzedTweetsCount} tweets{analyzedHighlightsCount > 0 ? ` · ${analyzedHighlightsCount} highlights` : ''}
            </button>
          </div>
        </div>

        {/* Name + handle */}
        <div className="mt-1 mb-3">
          <div className="flex items-center gap-1">
            <h2 className="text-[18px] sm:text-[20px] font-extrabold text-x-text leading-6">{profile.name}</h2>
            <svg viewBox="0 0 22 22" className="w-5 h-5 fill-x-blue shrink-0">
              <path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.855-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.69-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.636.433 1.221.878 1.69.47.446 1.055.752 1.69.883.635.13 1.294.083 1.902-.141.27.587.7 1.086 1.24 1.44.54.354 1.167.551 1.813.568.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.223 1.26.27 1.894.14.634-.132 1.22-.437 1.69-.882.445-.47.749-1.055.878-1.691.13-.634.08-1.29-.144-1.898.587-.27 1.087-.7 1.443-1.242.355-.54.554-1.17.573-1.817z" /><path d="M9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z" fill="black" />
            </svg>
          </div>
          <p className="text-[15px] text-x-secondary">@{profile.username}</p>
        </div>

        {/* Bio */}
        {profile.bio && (
          <p className="text-[15px] font-medium text-x-text leading-5 mb-3">{profile.bio}</p>
        )}

        {/* Meta row */}
        <div className="flex items-center gap-3 text-[14px] sm:text-[15px] text-x-secondary flex-wrap mb-3">
          {profile.location && (
            <span className="flex items-center gap-1">
              <MapPin className="w-[16px] h-[16px] sm:w-[18px] sm:h-[18px]" />
              {profile.location}
            </span>
          )}
          <span className="flex items-center gap-1">
            <LinkIcon className="w-[16px] h-[16px] sm:w-[18px] sm:h-[18px]" />
            <span className="text-x-blue font-medium hover:underline cursor-pointer">idifyyourx.com</span>
          </span>
          <span className="flex items-center gap-1">
            <CalendarDays className="w-[16px] h-[16px] sm:w-[18px] sm:h-[18px]" />
            Scanned just now
          </span>
        </div>

        {/* Follower counts */}
        <div className="flex items-center gap-5 mb-4">
          <span className="text-[14px]">
            <span className="font-bold text-x-text">{profile.following.toLocaleString()}</span>
            <span className="text-x-secondary ml-1">Following</span>
          </span>
          <span className="text-[14px]">
            <span className="font-bold text-x-text">{profile.followers.toLocaleString()}</span>
            <span className="text-x-secondary ml-1">Followers</span>
          </span>
        </div>
      </div>

      {/* Tabs — scrollable on mobile */}
      <div className="flex border-b border-x-border overflow-x-auto scrollbar-hide">
        {['Posts', 'Replies', 'Highlights', 'Articles', 'Media', 'Likes'].map((tab) => (
          <button
            key={tab}
            className={`flex-1 min-w-[70px] py-4 text-center text-[14px] sm:text-[15px] hover:bg-[#181919] transition-colors relative cursor-pointer whitespace-nowrap ${
              tab === 'Posts' ? 'font-bold text-x-text' : 'font-medium text-x-secondary'
            }`}
          >
            {tab}
            {tab === 'Posts' && (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-1 bg-x-blue rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Summary as pinned tweet */}
      {summary && (
        <div className="border-b border-x-border px-4 py-3">
          <div className="flex gap-3">
            <div className="shrink-0">
              <IdifyAvatar size={36} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1 mb-1 flex-wrap">
                <span className="text-[15px] font-bold text-x-text">idify your X</span>
                <svg viewBox="0 0 22 22" className="w-[18px] h-[18px] fill-x-blue shrink-0">
                  <path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.855-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.69-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.636.433 1.221.878 1.69.47.446 1.055.752 1.69.883.635.13 1.294.083 1.902-.141.27.587.7 1.086 1.24 1.44.54.354 1.167.551 1.813.568.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.223 1.26.27 1.894.14.634-.132 1.22-.437 1.69-.882.445-.47.749-1.055.878-1.691.13-.634.08-1.29-.144-1.898.587-.27 1.087-.7 1.443-1.242.355-.54.554-1.17.573-1.817z" /><path d="M9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z" fill="black" />
                </svg>
                <span className="text-[15px] text-x-secondary">@idifyyourx · now</span>
              </div>
              <p className="text-[15px] font-medium text-x-text leading-5">{summary}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
