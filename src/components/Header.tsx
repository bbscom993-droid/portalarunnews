import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Bookmark, 
  PenSquare, 
  Menu, 
  X, 
  Bell, 
  Radio, 
  Flame, 
  Sparkles,
  Type,
  CheckCircle2,
  ChevronRight,
  Landmark,
  Trophy,
  ShieldAlert,
  TrendingUp,
  MapPin,
  GraduationCap,
  MessageSquare,
  Mail,
  FileCheck,
  Train,
  Tag,
  Megaphone,
  Minimize2
} from 'lucide-react';
import { Category, SiteSettings } from '../types';
import { ModernGraffitiLogo } from './ModernGraffitiLogo';

interface HeaderProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  savedCount: number;
  onOpenSavedDrawer: () => void;
  onOpenCitizenModal?: () => void;
  siteSettings?: SiteSettings;
  isCompactMode?: boolean;
  onToggleCompactMode?: () => void;
}

const getCategoryIcon = (iconName: string, className: string) => {
  switch (iconName) {
    case 'Landmark': return <Landmark className={className} />;
    case 'Trophy': return <Trophy className={className} />;
    case 'ShieldAlert': return <ShieldAlert className={className} />;
    case 'TrendingUp': return <TrendingUp className={className} />;
    case 'MapPin': return <MapPin className={className} />;
    case 'GraduationCap': return <GraduationCap className={className} />;
    case 'MessageSquare': return <MessageSquare className={className} />;
    case 'Mail': return <Mail className={className} />;
    case 'FileCheck': return <FileCheck className={className} />;
    case 'Train': return <Train className={className} />;
    case 'Tag': return <Tag className={className} />;
    case 'Megaphone': return <Megaphone className={className} />;
    case 'Flame': return <Flame className={className} />;
    case 'Sparkles': return <Sparkles className={className} />;
    default: return null;
  }
};

export const Header: React.FC<HeaderProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  savedCount,
  onOpenSavedDrawer,
  onOpenCitizenModal,
  siteSettings,
  isCompactMode = false,
  onToggleCompactMode,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);

  // Global Theme Mode (Light / Dark) with localStorage persistence
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('arun_news_theme');
      if (saved === 'dark' || saved === 'light') return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      localStorage.setItem('arun_news_theme', theme);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const quickSearchTags = ['Timnas', 'Ekonomi', 'Satelit', 'Smart Farming', 'IKN', 'Batik Paris'];

  return (
    <header id="main-header" className="sticky top-0 z-40 bg-gradient-to-r from-sky-950 via-slate-950 to-sky-900 border-b-2 border-yellow-400 shadow-xl transition-all">
      {/* Upper Main Brand & Action Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-4">
          
          {/* Logo Brand in Bento Style */}
          <div className="flex items-center gap-3">
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 -ml-2 text-yellow-400 hover:text-white hover:bg-sky-900/80 rounded-xl transition-colors"
              aria-label="Menu Navigasi"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                onSelectCategory('all');
                onSearchChange('');
              }}
              className="group flex items-center gap-3 focus:outline-none p-1 sm:px-2 sm:py-1 rounded-2xl transition-all"
            >
              {/* Logo Image */}
              <img 
                src={siteSettings?.customLogoUrl || siteSettings?.loginThemeSettings?.customLogoUrl || "/whats_app_image_2026_08_01_at_14_48_objq0v5gsu.58.png"} 
                alt={`${siteSettings?.portalName || 'Arun News'} Logo`}
                referrerPolicy="no-referrer"
                className="w-11 h-11 sm:w-13 sm:h-13 rounded-full object-contain shadow-md border-2 border-yellow-400 bg-white group-hover:scale-105 transition-transform"
              />

              {/* Modern Graffiti Logo Wordmark */}
              <ModernGraffitiLogo 
                size="md" 
                customText={siteSettings?.portalName || 'ARUN NEWS'}
                tagline={siteSettings?.portalTagline || 'Jembatan Informasi Nusantara'}
              />
            </a>
          </div>

          {/* Center: Search Bar (Desktop) */}
          <div className="hidden md:flex flex-1 max-w-lg mx-4">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-sky-600">
                <Search className="w-4 h-4 text-sky-700" />
              </div>
              <input
                id="desktop-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Cari berita terkini, topik, atau nama tokoh..."
                className="w-full pl-10 pr-10 py-2 text-xs sm:text-sm bg-white hover:bg-white/90 focus:bg-white text-sky-950 placeholder:text-sky-600/60 rounded-xl border border-sky-300 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-300/60 transition-all shadow-xs font-medium"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sky-600 hover:text-sky-900"
                  aria-label="Bersihkan pencarian"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search button for mobile */}
            <button
              id="mobile-search-btn"
              onClick={() => setShowSearchModal(!showSearchModal)}
              className="md:hidden p-2 text-yellow-400 hover:text-white hover:bg-sky-900/80 rounded-xl transition-colors cursor-pointer"
              aria-label="Pencarian"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Lapor Warga Button */}
            {onOpenCitizenModal && siteSettings?.moduleToggles?.allowCitizenJournalism !== false && (
              <button
                id="header-lapor-warga-btn"
                onClick={onOpenCitizenModal}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black text-sky-950 bg-yellow-400 hover:bg-yellow-300 border border-yellow-500 transition-all shadow-2xs"
                title="Lapor Warga (Kirim Laporan Kejadian)"
              >
                <Megaphone className="w-3.5 h-3.5 text-sky-950" />
                <span>Lapor Warga</span>
              </button>
            )}

            {/* Mode Kompak Toggle Button (Desktop Header) */}
            {onToggleCompactMode && (
              <button
                id="header-compact-mode-btn"
                type="button"
                onClick={onToggleCompactMode}
                className={`hidden lg:flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-95 border ${
                  isCompactMode
                    ? 'bg-yellow-400 text-sky-950 border-yellow-500 font-black shadow-xs ring-2 ring-yellow-400/40'
                    : 'bg-white hover:bg-yellow-50 text-sky-950 border-yellow-400/80 hover:border-yellow-400'
                }`}
                title={isCompactMode ? 'Mode Kompak Aktif (Klik untuk Mode Lengkap)' : 'Aktifkan Mode Kompak (Sembunyikan Kuis, Polling & Widget)'}
                aria-pressed={isCompactMode}
              >
                <Minimize2 className={`w-3.5 h-3.5 ${isCompactMode ? 'text-sky-950 animate-pulse' : 'text-amber-600'}`} />
                <span className="font-bold">Mode Kompak</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-black ${
                  isCompactMode ? 'bg-sky-950 text-yellow-300' : 'bg-slate-100 text-slate-700'
                }`}>
                  {isCompactMode ? 'ON' : 'OFF'}
                </span>
              </button>
            )}

            {/* Bookmarks Counter Button - Responsive on Mobile */}
            <button
              id="header-saved-btn"
              type="button"
              onClick={onOpenSavedDrawer}
              className="relative flex items-center justify-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold text-sky-950 bg-white hover:bg-yellow-50 border border-yellow-400/80 hover:border-yellow-400 transition-all shadow-xs cursor-pointer active:scale-95 flex-shrink-0 min-h-[36px] sm:min-h-0"
              title={`Berita Disimpan (${savedCount} warta)`}
              aria-label={`Berita Disimpan (${savedCount})`}
            >
              <Bookmark className="w-4 h-4 sm:w-3.5 sm:h-3.5 text-amber-600 fill-amber-400/30" />
              <span className="hidden sm:inline font-bold">Disimpan</span>
              {savedCount > 0 ? (
                <span className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-black bg-yellow-400 text-sky-950 rounded-full font-mono shadow-xs border border-yellow-500">
                  {savedCount}
                </span>
              ) : (
                <span className="hidden sm:inline text-[10px] text-slate-400 font-mono">0</span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Overlay Bar */}
        {showSearchModal && (
          <div className="md:hidden mt-3 pt-3 border-t border-sky-200 animate-in fade-in slide-in-from-top-2 duration-150">
            <div className="relative w-full">
              <input
                id="mobile-search-input-field"
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Cari topik atau berita..."
                className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm bg-white text-sky-950 rounded-xl border border-sky-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                autoFocus
              />
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-sky-700" />
              {searchQuery && (
                <button 
                  onClick={() => onSearchChange('')} 
                  className="absolute right-3 top-2.5 text-sky-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            {/* Quick search chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto py-2 text-xs no-scrollbar">
              <span className="text-sky-700 text-[11px] font-bold whitespace-nowrap">Populer:</span>
              {quickSearchTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => onSearchChange(tag)}
                  className="px-2.5 py-0.5 rounded-lg bg-white text-sky-800 text-[11px] font-bold border border-sky-200 hover:border-yellow-400 whitespace-nowrap"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Navigation Category Bar */}
      <nav id="category-navigation" className="bg-gradient-to-r from-slate-950 via-sky-950 to-slate-950 border-t border-sky-800/80 backdrop-blur-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            {/* Category list items */}
            <div className="flex items-center gap-2 overflow-x-auto py-2.5 no-scrollbar scroll-smooth w-full">
              {categories.filter((cat) => cat.id !== 'akpersi' && cat.id !== 'box redaksi' && cat.id !== 'transportasi').map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    id={`nav-cat-${cat.id}`}
                    onClick={() => {
                      onSelectCategory(cat.id);
                      if (searchQuery) onSearchChange('');
                    }}
                    className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all whitespace-nowrap flex items-center gap-2 border ${
                      isActive
                        ? 'bg-yellow-400 text-sky-950 shadow-md border-yellow-500 scale-[1.02]'
                        : 'bg-sky-900/80 text-sky-100 hover:bg-sky-800 hover:text-yellow-300 border-sky-700/80 shadow-2xs'
                    }`}
                  >
                    {cat.id === 'all' ? (
                      <Flame className={`w-4 h-4 ${isActive ? 'text-sky-950' : 'text-yellow-400'}`} />
                    ) : (
                      getCategoryIcon(cat.iconName, `w-4 h-4 ${isActive ? 'text-sky-950' : 'text-yellow-400'}`)
                    )}
                    <span>{cat.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div 
          id="mobile-drawer-menu"
          className="lg:hidden bg-sky-950 text-white border-b-2 border-yellow-400 shadow-2xl px-4 py-4 animate-in slide-in-from-top-2 duration-200 max-h-[82vh] overflow-y-auto no-scrollbar"
        >
          {/* Quick Access Badges */}
          <div className="mb-4 pb-3 border-b border-sky-800">
            <h4 className="text-[11px] font-black uppercase tracking-wider text-yellow-400 mb-2.5 font-mono">
              Akses Cepat Fitur Portal
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {/* Dedicated Mobile Menu Saved Articles Button */}
              <button
                id="mobile-menu-saved-btn"
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenSavedDrawer();
                }}
                className="col-span-2 flex items-center justify-between p-2.5 rounded-xl bg-gradient-to-r from-sky-900 to-sky-950 hover:from-sky-800 hover:to-sky-900 border border-yellow-400/60 text-xs font-bold text-sky-100 transition-all shadow-xs cursor-pointer active:scale-[0.99]"
              >
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-yellow-400 text-sky-950 font-black shadow-xs">
                    <Bookmark className="w-4 h-4 fill-sky-950" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="font-black text-white text-xs">Berita Disimpan (Baca Nanti)</span>
                    <span className="text-[10px] text-yellow-300/80 font-mono">Daftar bacaan warta offline</span>
                  </div>
                </div>
                <span className="px-2.5 py-1 text-[11px] font-black bg-yellow-400 text-sky-950 rounded-full font-mono shadow-xs border border-yellow-500">
                  {savedCount} Warta
                </span>
              </button>

              {/* Dedicated Mobile Menu Mode Kompak Toggle Button */}
              {onToggleCompactMode && (
                <button
                  id="mobile-menu-compact-mode-btn"
                  type="button"
                  onClick={() => {
                    onToggleCompactMode();
                  }}
                  className={`col-span-2 flex items-center justify-between p-2.5 rounded-xl border transition-all shadow-xs cursor-pointer active:scale-[0.99] ${
                    isCompactMode
                      ? 'bg-gradient-to-r from-yellow-500/20 via-sky-900 to-sky-950 border-yellow-400 text-yellow-300'
                      : 'bg-sky-900 hover:bg-sky-800 border-sky-700 text-sky-100'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className={`p-1.5 rounded-lg ${isCompactMode ? 'bg-yellow-400 text-sky-950' : 'bg-sky-800 text-yellow-400'} font-black shadow-xs`}>
                      <Minimize2 className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="font-black text-white text-xs">Mode Kompak (Fokus Warta)</span>
                      <span className="text-[10px] text-sky-300/80 font-mono">Sembunyikan kuis, polling & widget</span>
                    </div>
                  </div>
                  <span className={`px-2.5 py-1 text-[11px] font-black rounded-full font-mono shadow-xs border ${
                    isCompactMode
                      ? 'bg-yellow-400 text-sky-950 border-yellow-500'
                      : 'bg-sky-950 text-sky-300 border-sky-800'
                  }`}>
                    {isCompactMode ? 'AKTIF' : 'NONAKTIF'}
                  </span>
                </button>
              )}

              {onOpenCitizenModal && siteSettings?.moduleToggles?.allowCitizenJournalism !== false && (
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenCitizenModal();
                  }}
                  className="col-span-2 flex items-center justify-center gap-2 p-2.5 rounded-xl bg-sky-900 hover:bg-sky-800 text-yellow-400 border border-sky-700 text-xs font-black shadow-xs"
                >
                  <Megaphone className="w-4 h-4 text-yellow-400" />
                  <span>Lapor Warga (Kirim Laporan)</span>
                </button>
              )}
              <a
                href="#trending-section"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 p-2.5 rounded-xl bg-sky-900 hover:bg-sky-800 border border-sky-700 text-xs font-bold text-sky-100"
              >
                <Flame className="w-4 h-4 text-yellow-400" />
                <span>Terpopuler</span>
              </a>
              <a
                href="#video-news-section"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 p-2.5 rounded-xl bg-sky-900 hover:bg-sky-800 border border-sky-700 text-xs font-bold text-sky-100"
              >
                <Radio className="w-4 h-4 text-yellow-400" />
                <span>Warta Video</span>
              </a>
              <a
                href="#photo-gallery-section"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 p-2.5 rounded-xl bg-sky-900 hover:bg-sky-800 border border-sky-700 text-xs font-bold text-sky-100"
              >
                <Sparkles className="w-4 h-4 text-yellow-400" />
                <span>Galeri Foto</span>
              </a>
              <a
                href="#interactive-poll-card"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 p-2.5 rounded-xl bg-sky-900 hover:bg-sky-800 border border-sky-700 text-xs font-bold text-sky-100"
              >
                <CheckCircle2 className="w-4 h-4 text-yellow-400" />
                <span>Jajak Pendapat</span>
              </a>
            </div>
          </div>

          <div className="mb-4">
            <h4 className="text-[11px] font-black uppercase tracking-wider text-yellow-400 mb-2 font-mono">
              Kanal Berita
            </h4>
            <div className="grid grid-cols-2 gap-1.5">
              {categories.filter((cat) => cat.id !== 'akpersi' && cat.id !== 'box redaksi' && cat.id !== 'transportasi').map((cat) => {
                const isActive = selectedCategory === cat.id;
                const iconColorClass = isActive ? 'text-sky-950' : 'text-yellow-400';
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      onSelectCategory(cat.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`text-left px-3 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all min-h-[42px] ${
                      isActive
                        ? 'bg-yellow-400 text-sky-950 font-black shadow-xs border border-yellow-500'
                        : 'bg-sky-900/90 text-sky-200 hover:text-white hover:bg-sky-800 border border-sky-800'
                    }`}
                  >
                    {cat.id === 'all' ? (
                      <Flame className={`w-3.5 h-3.5 flex-shrink-0 ${iconColorClass}`} />
                    ) : (
                      getCategoryIcon(cat.iconName, `w-3.5 h-3.5 flex-shrink-0 ${iconColorClass}`)
                    )}
                    <span className="truncate">{cat.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
