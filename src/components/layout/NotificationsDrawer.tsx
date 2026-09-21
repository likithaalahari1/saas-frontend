import React from 'react';
import { useApp, AppView } from '../../context/AppContext';
import { X, CheckCircle2, AlertTriangle, Info, AlertOctagon, ArrowRight } from 'lucide-react';

export const NotificationsDrawer: React.FC = () => {
  const { 
    isNotificationsDrawerOpen, 
    setIsNotificationsDrawerOpen, 
    notifications, 
    setActiveView 
  } = useApp();

  if (!isNotificationsDrawerOpen) return null;

  const iconForType = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="w-4 h-4 text-emerald-600" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-amber-600" />;
      case 'error':
        return <AlertOctagon className="w-4 h-4 text-red-600" />;
      default:
        return <Info className="w-4 h-4 text-blue-600" />;
    }
  };

  const bgForType = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-emerald-50 border-emerald-200';
      case 'warning':
        return 'bg-amber-50 border-amber-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  return (
    <div className="fixed inset-0 bg-zinc-900/30 backdrop-blur-sm z-50 flex justify-end animate-fade-in">
      <div 
        className="w-full max-w-md bg-white h-full shadow-pink-lg border-l border-[#F1E7EE] flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-4 border-b border-[#F1E7EE] flex items-center justify-between bg-[#FFF7FB]/80">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-zinc-900 text-sm">Notifications Center</h3>
            <span className="px-2 py-0.5 rounded-full bg-[#E85AAD] text-white text-[10px] font-bold">
              {notifications.length}
            </span>
          </div>

          <button 
            onClick={() => setIsNotificationsDrawerOpen(false)}
            className="p-1 rounded-lg text-zinc-400 hover:bg-white hover:text-zinc-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {notifications.map((item) => (
            <div 
              key={item.id}
              className={`p-3.5 rounded-2xl border ${bgForType(item.type)} transition-all hover:shadow-sm space-y-1.5`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  {iconForType(item.type)}
                  <span className="font-bold text-xs text-zinc-900">{item.title}</span>
                </div>
                <span className="text-[10px] font-medium text-zinc-400 shrink-0">{item.timestamp}</span>
              </div>

              <p className="text-xs text-zinc-600 leading-relaxed font-normal">
                {item.message}
              </p>

              {item.actionUrl && (
                <button
                  onClick={() => {
                    setActiveView(item.actionUrl as AppView);
                    setIsNotificationsDrawerOpen(false);
                  }}
                  className="mt-2 text-xs font-bold text-[#C93D91] hover:underline flex items-center gap-1 group"
                >
                  <span>Resolve / Take Action</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-[#F1E7EE] bg-[#FFF7FB] text-center text-xs text-zinc-500 font-medium">
          All channel updates real-time synchronized
        </div>
      </div>
    </div>
  );
};
