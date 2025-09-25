import React from 'react';
import { Notification } from '../types';

interface NotificationPanelProps {
  notifications: Notification[];
  onClose: () => void;
  onMarkAllRead: () => void;
  onClearAll: () => void;
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({ notifications, onClose, onMarkAllRead, onClearAll }) => {
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-40 modal-overlay" 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed top-0 right-0 h-full w-4/5 max-w-sm bg-white shadow-xl z-50 flex flex-col notification-sidebar-enter"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sidebar Header */}
        <div className="flex-shrink-0 flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="font-bold text-lg text-gray-800">Notifications</h3>
          <div className="flex items-center space-x-4">
              {notifications.length > 0 && (
                  <button 
                      onClick={onClearAll} 
                      className="text-xs font-semibold text-gray-500 hover:text-rose-500 transition-colors focus:outline-none"
                      aria-label="Clear all notifications"
                  >
                      Clear all
                  </button>
              )}
              <button 
                onClick={onClose} 
                className="p-2 text-gray-500 hover:text-gray-800 rounded-full transition-colors focus:outline-none hover:bg-gray-100"
                aria-label="Close notifications panel"
              >
                <i className="fas fa-times text-xl"></i>
              </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-grow overflow-y-auto">
          {notifications.length === 0 ? (
             <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 p-6">
                <i className="fas fa-bell-slash text-4xl text-gray-300 mb-4"></i>
                <p>You're all caught up!</p>
             </div>
          ) : (
            <ul>
              {notifications.map(notification => (
                <li key={notification.id} className={`flex items-start p-4 space-x-3 border-b border-gray-100 last:border-b-0 transition-colors duration-200 ${!notification.read ? 'bg-amber-50' : ''}`}>
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white ${notification.iconBgColor}`}>
                    <i className={notification.icon}></i>
                  </div>
                  <div>
                    <p className="text-sm text-gray-700">{notification.text}</p>
                    <p className="text-xs text-gray-400 mt-1">{notification.timestamp}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Sidebar Footer */}
        {unreadCount > 0 && (
          <div className="flex-shrink-0 p-4 border-t border-gray-200 bg-gray-50">
            <button 
              onClick={onMarkAllRead} 
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-500 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
            >
              Mark all as read
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationPanel;