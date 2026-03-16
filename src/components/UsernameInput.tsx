'use client';

import { useState } from 'react';
import { Image as ImageIcon, Smile, MapPin, ListOrdered, Clock, Bold, Italic, Flag } from 'lucide-react';
import { IdifyAvatar } from './IdifyAvatar';

const EXAMPLES = ['xvatsall', 'levelsio', 'elonmusk', 'naval'];

interface Props {
  onSubmit: (username: string) => void;
}

export function UsernameInput({ onSubmit }: Props) {
  const [value, setValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = value.replace(/^@/, '').trim();
    if (clean) onSubmit(clean);
  };

  return (
    <div>
      {/* Compose area - looks like X's tweet compose */}
      <form onSubmit={handleSubmit} className="border-b border-x-border px-4 pt-3 pb-2">
        {/* Avatar + input row */}
        <div className="flex items-center gap-3 mb-3">
          <IdifyAvatar />
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter a username to idify..."
            className="flex-1 bg-transparent text-[20px] font-medium text-x-text placeholder:text-x-tertiary placeholder:font-medium py-2 outline-none"
            autoFocus
          />
        </div>

        {/* Toolbar — icons left, Post button right */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-0">
            {/* GIF-like icons row matching screenshot */}
            <button type="button" className="p-2 rounded-full hover:bg-x-blue/10 transition-colors cursor-pointer">
              <ImageIcon className="w-[19px] h-[19px] text-x-blue" />
            </button>
            <button type="button" className="p-2 rounded-full hover:bg-x-blue/10 transition-colors cursor-pointer">
              <svg viewBox="0 0 24 24" className="w-[19px] h-[19px] fill-x-blue"><path d="M3 5.5C3 4.119 4.12 3 5.5 3h13C19.88 3 21 4.119 21 5.5v13c0 1.381-1.12 2.5-2.5 2.5h-13C4.12 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v13c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-13c0-.276-.224-.5-.5-.5h-13zM18 10.711V9.25h-3.74v5.5h1.44v-1.719h1.7V11.57h-1.7v-.859H18zM11.79 9.25h1.44v5.5h-1.44v-5.5zm-3.07 1.375c.34 0 .77.172.77.59v.03h1.44v-.09c0-1.184-1.05-1.9-2.17-1.9-1.14 0-2.2.69-2.2 2.08v1.37c0 1.39 1.06 2.08 2.2 2.08 1.13 0 2.17-.72 2.17-1.9v-.09H9.49v.03c0 .418-.43.59-.77.59-.48 0-.78-.29-.78-.78v-1.27c0-.49.3-.74.78-.74z" /></svg>
            </button>
            <button type="button" className="p-2 rounded-full hover:bg-x-blue/10 transition-colors cursor-pointer">
              <svg viewBox="0 0 24 24" className="w-[19px] h-[19px] fill-x-blue"><path d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z" /></svg>
            </button>
            <button type="button" className="p-2 rounded-full hover:bg-x-blue/10 transition-colors cursor-pointer">
              <ListOrdered className="w-[19px] h-[19px] text-x-blue" />
            </button>
            <button type="button" className="p-2 rounded-full hover:bg-x-blue/10 transition-colors cursor-pointer">
              <Smile className="w-[19px] h-[19px] text-x-blue" />
            </button>
            <button type="button" className="p-2 rounded-full hover:bg-x-blue/10 transition-colors cursor-pointer">
              <Clock className="w-[19px] h-[19px] text-x-blue" />
            </button>
            <button type="button" className="p-2 rounded-full hover:bg-x-blue/10 transition-colors cursor-pointer">
              <MapPin className="w-[19px] h-[19px] text-x-blue" />
            </button>
            <button type="button" className="p-2 rounded-full hover:bg-x-blue/10 transition-colors cursor-pointer">
              <Flag className="w-[19px] h-[19px] text-x-blue" />
            </button>
            <button type="button" className="p-2 rounded-full hover:bg-x-blue/10 transition-colors cursor-pointer">
              <Bold className="w-[19px] h-[19px] text-x-blue" />
            </button>
            <button type="button" className="p-2 rounded-full hover:bg-x-blue/10 transition-colors cursor-pointer">
              <Italic className="w-[19px] h-[19px] text-x-blue" />
            </button>
          </div>
          <button
            type="submit"
            disabled={!value.replace(/^@/, '').trim()}
            className="px-5 py-1.5 bg-white hover:bg-white/90 disabled:bg-[#787a7a] disabled:text-[#bbb] text-black font-extrabold text-[15px] rounded-full transition-colors cursor-pointer"
          >
            Idify
          </button>
        </div>
      </form>

      {/* Example profiles styled as tweets */}
      <div className="border-b border-x-border px-4 py-3">
        <p className="text-[13px] text-x-secondary mb-3">Try scanning a profile</p>
        <div className="flex flex-wrap gap-2">
          {EXAMPLES.map((name) => (
            <button
              key={name}
              onClick={() => {
                setValue(name);
                onSubmit(name);
              }}
              className="px-4 py-2 border border-x-border rounded-full text-[15px] text-x-blue hover:bg-x-blue/10 transition-colors cursor-pointer"
            >
              @{name}
            </button>
          ))}
        </div>
      </div>

      {/* Fake timeline tweets to fill the page */}
      {[
        {
          name: 'idify your X',
          handle: '@idifyyourx',
          time: '2h',
          text: 'Enter any X username above and we\'ll analyze their tweets to generate personalized startup ideas 💡',
          likes: '2.4K',
          retweets: '891',
          views: '124K',
        },
        {
          name: 'idify your X',
          handle: '@idifyyourx',
          time: '5h',
          text: 'We scan your bio, recent tweets, pinned tweets, and interests to find patterns. Then AI generates startup ideas tailored specifically to YOU.\n\ninterest clusters → problems mentioned → opportunity extraction',
          likes: '1.8K',
          retweets: '423',
          views: '89K',
        },
        {
          name: 'idify your X',
          handle: '@idifyyourx',
          time: '8h',
          text: 'Just analyzed @levelsio\'s profile:\n\ndetected interests: remote work, indie hacking, travel\ngenerated ideas:\n• nomad tax calculator\n• AI Airbnb price optimizer\n• digital nomad health insurance marketplace',
          likes: '5.2K',
          retweets: '1.2K',
          views: '302K',
        },
      ].map((tweet, i) => (
        <div key={i} className="border-b border-x-border px-4 py-3 hover:bg-[#080808] transition-colors cursor-pointer">
          <div className="flex gap-3">
            <IdifyAvatar />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1">
                <span className="text-[15px] font-bold text-x-text">{tweet.name}</span>
                <svg viewBox="0 0 22 22" className="w-[18px] h-[18px] fill-x-blue">
                  <path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.855-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.69-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.636.433 1.221.878 1.69.47.446 1.055.752 1.69.883.635.13 1.294.083 1.902-.141.27.587.7 1.086 1.24 1.44.54.354 1.167.551 1.813.568.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.223 1.26.27 1.894.14.634-.132 1.22-.437 1.69-.882.445-.47.749-1.055.878-1.691.13-.634.08-1.29-.144-1.898.587-.27 1.087-.7 1.443-1.242.355-.54.554-1.17.573-1.817z" /><path d="M9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z" fill="black" />
                </svg>
                <span className="text-[15px] text-x-secondary">{tweet.handle}</span>
                <span className="text-[15px] text-x-secondary">·</span>
                <span className="text-[15px] text-x-secondary">{tweet.time}</span>
              </div>
              <p className="text-[15px] font-medium text-x-text leading-5 mt-0.5 whitespace-pre-line">{tweet.text}</p>
              <div className="flex items-center justify-between mt-3 max-w-[425px] text-x-secondary">
                <span className="flex items-center gap-1 text-[13px] hover:text-x-blue transition-colors cursor-pointer">
                  <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-current"><path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.25-.893 4.306-2.394 5.862l-5.091 5.28c-.33.34-.872.34-1.202.003l-5.11-5.285A8.15 8.15 0 011.751 10zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 1.665.662 3.258 1.838 4.433l4.412 4.56 4.382-4.555C15.542 13.29 16.2 11.702 16.2 10.13 16.2 6.894 13.607 4 10.122 4H9.756z" /></svg>
                  42
                </span>
                <span className="flex items-center gap-1 text-[13px] hover:text-x-green transition-colors cursor-pointer">
                  <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-current"><path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z" /></svg>
                  {tweet.retweets}
                </span>
                <span className="flex items-center gap-1 text-[13px] hover:text-x-pink transition-colors cursor-pointer">
                  <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-current"><path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.56-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z" /></svg>
                  {tweet.likes}
                </span>
                <span className="flex items-center gap-1 text-[13px]">
                  <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-current"><path d="M8.75 21V3h2v18h-2zM18.25 21V8.5h2V21h-2zM13.5 21V13h2v8h-2zM3.25 21v-6h2v6h-2z" /></svg>
                  {tweet.views}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
