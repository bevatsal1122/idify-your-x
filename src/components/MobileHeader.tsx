'use client';

interface Props {
  avatarUrl?: string;
}

export function MobileHeader({ avatarUrl }: Props) {
  return (
    <div className="sticky top-0 z-10 bg-x-bg/80 backdrop-blur-md border-b border-x-border lg:hidden">
      {/* Top row: avatar + logo */}
      <div className="flex items-center justify-between px-4 h-[48px] mt-2">
        <div className="w-8" />
        <div className="flex items-center gap-1.5">
          <span className="text-[17px] font-bold text-x-text">idify your</span>
          <svg viewBox="0.5 2 23 20" className="w-6 fill-x-text">
          <path d="M21.742 21.75l-7.563-11.179 7.056-8.321h-2.456l-5.691 6.714-4.54-6.714H2.359l7.29 10.776L2.25 21.75h2.456l6.035-7.118 4.818 7.118h6.191-.008zM7.739 3.818L18.81 20.182h-2.447L5.29 3.818h2.447z"></path>
          </svg>
        </div>
        <div className="w-8" />
      </div>

      {/* Tabs row */}
      <div className="flex">
        <button className="flex-1 py-3 text-center text-[15px] font-bold text-x-text relative cursor-pointer">
          For you
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-1 bg-x-blue rounded-full" />
        </button>
        <button className="flex-1 py-3 text-center text-[15px] text-x-secondary cursor-pointer">
          Following
        </button>
      </div>
    </div>
  );
}
