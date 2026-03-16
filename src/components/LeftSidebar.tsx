'use client';

import { useState, useRef, useEffect } from 'react';
import {
  Home,
  Search,
  Bell,
  Mail,
  Sparkles,
  Users,
  Crown,
  User,
  MoreHorizontal,
  Feather,
} from 'lucide-react';

const NAV_ITEMS = [
  { icon: Home, label: 'Home', action: 'home' },
  { icon: Search, label: 'Explore', action: null },
  { icon: Bell, label: 'Notifications', action: 'notif' },
  { icon: Mail, label: 'Chat', action: null },
  { icon: Sparkles, label: 'Grok', action: null },
  { icon: Crown, label: 'Premium', action: null },
  { icon: User, label: 'Profile', action: null },
  { icon: MoreHorizontal, label: 'More', action: null },
];

const IDENTITIES = [
  { name: 'You', handle: '@user', emoji: '' },
  { name: "Elon's Cat", handle: '@definitelynotacat', emoji: '🐱' },
  { name: 'AI That Escaped', handle: '@sentient_toaster', emoji: '🤖' },
  { name: 'Broke Founder', handle: '@ramen_profitable', emoji: '🍜' },
  { name: 'VC Whisperer', handle: '@slide_deck_wizard', emoji: '🧙' },
  { name: 'Bug Creator', handle: '@it_works_on_my_machine', emoji: '🐛' },
  { name: '10x Developer', handle: '@actually_0.1x', emoji: '💀' },
  { name: 'Crypto Bro', handle: '@still_hodling', emoji: '📉' },
  { name: 'Startup Guru', handle: '@pivot_master_3000', emoji: '🔄' },
  { name: 'Touch Grass CEO', handle: '@what_is_outside', emoji: '🌿' },
];

const POST_MESSAGES = [
  "You can't post here. This is a read-only dimension. 🌀",
  'Nice try, but the tweet police are watching. 🚔',
  'Error 418: I\'m a teapot. Cannot post. ☕',
  'Your post was absorbed by the void. 🕳️',
  'Posting requires 10,000 followers. You have... imagination. ✨',
  'The post button is decorative. Like your resume. 📄',
  'Tweet cancelled. Mercury is in retrograde. 🪐',
  'You need Premium Ultra Mega Plus™ to post here.',
  'This button just exists for vibes. 🎭',
];

const NOTIF_STAGES = [
  '', '1', '3', '9', '27', '99+', '420', '1K', '69K', '∞', '💀', '🔥', 'HELP', '😱',
];

interface SidebarProps {
  onHomeClick?: () => void;
}

export function LeftSidebar({ onHomeClick }: SidebarProps) {
  const [identityIndex, setIdentityIndex] = useState(0);
  const [identityShake, setIdentityShake] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [logoSpins, setLogoSpins] = useState(0);
  const [showBird, setShowBird] = useState(false);
  const [notifIndex, setNotifIndex] = useState(0);
  const [bellShake, setBellShake] = useState(false);
  const postMsgIndex = useRef(0);

  const identity = IDENTITIES[identityIndex];

  // Auto-hide toast
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2500);
    return () => clearTimeout(t);
  }, [toast]);

  // Logo click handler
  const handleLogoClick = () => {
    setLogoSpins((prev) => prev + 1);
    if (logoSpins + 1 >= 5) {
      setShowBird(true);
      setTimeout(() => {
        setShowBird(false);
        setLogoSpins(0);
      }, 1500);
    }
  };

  // Post button handler
  const handlePost = () => {
    setToast(POST_MESSAGES[postMsgIndex.current % POST_MESSAGES.length]);
    postMsgIndex.current += 1;
  };

  // Identity cycle
  const handleIdentityClick = () => {
    setIdentityIndex((prev) => (prev + 1) % IDENTITIES.length);
    setIdentityShake(true);
    setTimeout(() => setIdentityShake(false), 400);
  };

  // Notification click
  const handleNotifClick = () => {
    setNotifIndex((prev) => Math.min(prev + 1, NOTIF_STAGES.length - 1));
    setBellShake(true);
    setTimeout(() => setBellShake(false), 500);
  };

  const notifBadge = NOTIF_STAGES[notifIndex];

  return (
    <header className="flex flex-col items-end pr-3 sticky top-0 h-screen">
      <div className="flex flex-col w-[275px] h-full py-1">
        {/* X Logo — spins on click, turns into bird after 5 clicks */}
        <div className="px-3 py-3">
          <button
            onClick={handleLogoClick}
            className="w-[50px] h-[50px] flex items-center justify-center rounded-full hover:bg-[#181919] transition-colors cursor-pointer"
          >
            {showBird ? (
              <svg viewBox="0 0 24 24" className="w-7 h-7 fill-x-blue animate-fade-in">
                <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z" />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                className="w-7 h-7 fill-x-text transition-transform"
                style={{
                  transform: logoSpins > 0 ? `rotate(${logoSpins * 360}deg)` : undefined,
                  transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            )}
          </button>
        </div>

        {/* Nav Items */}
        <nav className="flex flex-col gap-0.5">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isNotif = item.label === 'Notifications';

            return (
              <button
                key={item.label}
                onClick={
                  item.action === 'notif' ? handleNotifClick :
                  item.action === 'home' ? onHomeClick :
                  undefined
                }
                className="inline-flex items-center gap-5 px-3 py-3 rounded-full hover:bg-[#181919] transition-colors group cursor-pointer relative w-auto"
              >
                <div
                  className="relative"
                  style={isNotif && bellShake ? {
                    animation: 'bell-shake 0.5s ease',
                  } : undefined}
                >
                  <Icon className="w-[26px] h-[26px] text-x-text" strokeWidth={1.75} />
                  {isNotif && notifBadge && (
                    <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] bg-x-blue text-white text-[11px] font-bold rounded-full flex items-center justify-center px-1 animate-fade-in">
                      {notifBadge}
                    </span>
                  )}
                </div>
                <span className="text-[20px] font-medium text-x-text hidden xl:inline">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Post Button — shows funny toast */}
        <button
          onClick={handlePost}
          className="mt-4 mx-3 py-3 bg-white hover:bg-white/90 text-black font-bold text-[17px] rounded-full transition-colors hidden xl:block cursor-pointer active:scale-95"
        >
          Post
        </button>
        <button
          onClick={handlePost}
          className="mt-4 mx-auto w-[50px] h-[50px] bg-white hover:bg-white/90 rounded-full flex items-center justify-center xl:hidden cursor-pointer active:scale-95"
        >
          <Feather className="w-6 h-6 text-white" />
        </button>

        {/* Toast */}
        {toast && (
          <div className="mx-3 mt-2 px-4 py-3 bg-x-blue text-white text-[14px] rounded-2xl animate-slide-up leading-5">
            {toast}
          </div>
        )}

        {/* Account — cycles through funny identities */}
        <button
          onClick={handleIdentityClick}
          className={`mt-auto mb-3 mx-3 px-3 py-3 rounded-full hover:bg-[#181919] transition-all cursor-pointer flex items-center gap-3 ${
            identityShake ? 'animate-[wiggle_0.4s_ease]' : ''
          }`}
        >
          <div className="w-10 h-10 rounded-full bg-x-tertiary flex items-center justify-center text-lg shrink-0">
            {identity.emoji || '👤'}
          </div>
          <div className="hidden xl:block flex-1 min-w-0 text-left">
            <p className="text-[15px] font-bold text-x-text truncate">{identity.name}</p>
            <p className="text-[15px] text-x-secondary truncate">{identity.handle}</p>
          </div>
          <MoreHorizontal className="w-5 h-5 text-x-text hidden xl:block shrink-0" />
        </button>
      </div>

      {/* Inline keyframes for the shake/wiggle */}
      <style jsx>{`
        @keyframes wiggle {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-4px) rotate(-2deg); }
          40% { transform: translateX(4px) rotate(2deg); }
          60% { transform: translateX(-3px) rotate(-1deg); }
          80% { transform: translateX(3px) rotate(1deg); }
        }
        @keyframes bell-shake {
          0% { transform: rotate(0deg); }
          15% { transform: rotate(15deg); }
          30% { transform: rotate(-15deg); }
          45% { transform: rotate(10deg); }
          60% { transform: rotate(-10deg); }
          75% { transform: rotate(5deg); }
          90% { transform: rotate(-5deg); }
          100% { transform: rotate(0deg); }
        }
      `}</style>
    </header>
  );
}
