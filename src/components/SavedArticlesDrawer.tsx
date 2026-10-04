import React from 'react';
import { X, Bookmark, Trash2, ArrowRight, BookOpen, Clock, Database } from 'lucide-react';
import { NewsArticle } from '../types';

interface SavedArticlesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedArticles: NewsArticle[];
  onSelectArticle: (article: NewsArticle) => void;
  onRemoveSaved: (articleId: string, e: React.MouseEvent) => void;
  onClearAll: () => void;
}

export const SavedArticlesDrawer: React.FC<SavedArticlesDrawerProps> = ({
  isOpen,
  onClose,
  savedArticles,
  onSelectArticle,
  onRemoveSaved,
  onClearAll,
}) => {
  if (!isOpen) return null;

  return (
    <div
      id="saved-articles-drawer-backdrop"
      className="fixed inset-0 z-50 bg-sky-950/70 backdrop-blur-xs flex justify-end"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col border-l-2 border-yellow-400 animate-in slide-in-from-right duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 bg-sky-950 text-white flex items-center justify-between border-b border-sky-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-yellow-400 text-sky-950 flex items-center justify-center font-black shadow-xs">
              <Bookmark className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-black uppercase tracking-tight">
                Warta Tersimpan ({savedArticles.length})
              </h2>
              <p className="text-[11px] text-sky-200 font-mono">Daftar bacaan warta pilihan Anda</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-sky-300 hover:text-white hover:bg-sky-800 transition-colors cursor-pointer min-w-[36px] min-h-[36px] flex items-center justify-center"
            aria-label="Tutup Daftar Simpanan"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action bar if items exist */}
        {savedArticles.length > 0 && (
          <div className="px-4 py-2 bg-emerald-50 border-b border-emerald-100 flex items-center justify-between text-xs font-medium">
            <span className="text-emerald-900 text-[11px] font-mono font-bold flex items-center gap-1">
              <Database className="w-3.5 h-3.5 text-emerald-600" />
              Cached IndexedDB (Offline Ready)
            </span>
            <button
              onClick={onClearAll}
              className="text-rose-600 hover:text-rose-700 font-bold flex items-center gap-1 text-[11px] uppercase tracking-wider"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Kosongkan Semua
            </button>
          </div>
        )}

        {/* Saved Articles List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {savedArticles.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-sky-700">
              <div className="w-16 h-16 rounded-2xl bg-sky-50 border border-sky-200 text-yellow-500 flex items-center justify-center mb-3 shadow-xs">
                <BookOpen className="w-8 h-8" />
              </div>
              <h3 className="text-sm font-black text-sky-950 mb-1 uppercase tracking-tight">
                Belum Ada Warta Disimpan
              </h3>
              <p className="text-xs text-sky-700 max-w-xs leading-relaxed font-medium">
                Klik tombol bookmark pada artikel mana pun untuk menyimpannya ke dalam daftar bacaan cepat Anda.
              </p>
            </div>
          ) : (
            savedArticles.map((article) => (
              <div
                key={article.id}
                onClick={() => {
                  onSelectArticle(article);
                  onClose();
                }}
                className="group bg-white rounded-xl p-3 border border-sky-200 hover:border-yellow-400 hover:shadow-sm transition-all cursor-pointer flex gap-3 items-start relative"
              >
                <div className="w-20 h-20 rounded-lg overflow-hidden bg-sky-950 flex-shrink-0">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="flex-1 min-w-0 flex flex-col justify-between h-20">
                  <div>
                    <span className="text-[10px] font-black text-sky-900 bg-sky-100 px-1.5 py-0.5 rounded uppercase font-mono">
                      {article.categoryLabel}
                    </span>
                    <h4 className="text-xs font-bold text-sky-950 group-hover:text-yellow-600 line-clamp-2 leading-snug mt-1">
                      {article.title}
                    </h4>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-sky-600 font-mono">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-yellow-500" />
                      {article.readTime}
                    </span>
                    <button
                      onClick={(e) => onRemoveSaved(article.id, e)}
                      className="text-slate-400 hover:text-rose-600 p-2 min-w-[32px] min-h-[32px] flex items-center justify-center transition-colors cursor-pointer rounded-lg hover:bg-rose-50"
                      title="Hapus dari simpanan"
                      aria-label="Hapus dari simpanan"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 border-t border-sky-100 bg-sky-50 text-center text-[11px] text-sky-700 font-mono font-medium">
          Arun News Offline Reading Engine
        </div>
      </div>
    </div>
  );
};
