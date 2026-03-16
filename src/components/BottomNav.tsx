'use client';

import { Home, Search, Sparkles, Bell, Mail } from 'lucide-react';

interface Props {
  onHomeClick: () => void;
}

const NAV_ITEMS = [
  { icon: Home, label: 'Home', action: 'home' },
  { icon: Search, label: 'Search', action: null },
  { icon: Bell, label: 'Notifications', action: null },
  { icon: Mail, label: 'Chat', action: null },
];

export function BottomNav({ onHomeClick }: Props) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-x-bg/80 backdrop-blur-md border-t border-x-border lg:hidden">
      <div className="flex items-center justify-around h-[60px]">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              onClick={item.action === 'home' ? onHomeClick : undefined}
              className="flex-1 flex items-center justify-center py-3 cursor-pointer"
            >
              <Icon className="w-[26px] h-[26px] text-x-text" strokeWidth={1.75} />
            </button>
          );
        })}
      </div>
    </nav>
  );
}
