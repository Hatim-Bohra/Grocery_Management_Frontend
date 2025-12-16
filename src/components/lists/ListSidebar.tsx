import React, { useState } from 'react';
import type { GroceryList } from '../../types';

interface ListSidebarProps {
  lists: GroceryList[];
  currentListId: string | undefined;
  onSelect: (listId: string) => void;
}

const Icons = {
  Info: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
};

const QuickGuide = () => (
  <div className="bg-linear-to from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-6 shadow-sm">
    <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
      <span className="text-xl">🎯</span> Quick Guide
    </h3>
    <ol className="flex flex-col gap-4 text-sm text-blue-800">
      <li className="flex gap-3 items-start">
        <span className="font-bold bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs shadow-sm">
          1
        </span>
        <span>Create a new list for your shopping trip.</span>
      </li>
      <li className="flex gap-3 items-start">
        <span className="font-bold bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs shadow-sm">
          2
        </span>
        <span>Add items (e.g., "Milk", "Bread") to your list.</span>
      </li>
      <li className="flex gap-3 items-start">
        <span className="font-bold bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs shadow-sm">
          3
        </span>
        <span>
          Click the <strong>Share</strong> button at the top.
        </span>
      </li>
      <li className="flex gap-3 items-start">
        <span className="font-bold bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs shadow-sm">
          4
        </span>
        <span>Send the link to shopkeepers or family.</span>
      </li>
      <li className="flex gap-3 items-start">
        <span className="font-bold bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs shadow-sm">
          5
        </span>
        <span>They update statuses live as they shop!</span>
      </li>
    </ol>
  </div>
);

export const ListSidebar: React.FC<ListSidebarProps> = ({ lists, currentListId, onSelect }) => {
  const [showMobileGuide, setShowMobileGuide] = useState(false);

  return (
    <aside className="lg:col-span-4 space-y-6 h-[700px] overflow-auto">
      {/* Desktop: Quick Guide */}
      <div className="my-4">
        <button
          onClick={() => setShowMobileGuide(!showMobileGuide)}
          className="w-full flex items-center justify-between p-4 bg-white border border-blue-100 rounded-xl shadow-sm text-blue-800 font-medium cursor-pointer"
        >
          <span className="flex items-center gap-2">
            <Icons.Info /> How to use this app
          </span>
          <span className={`transform transition-transform ${showMobileGuide ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </button>
        {showMobileGuide && (
          <div className="mt-3">
            <QuickGuide />
          </div>
        )}
      </div>

      {/* List Switcher */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden sticky top-24">
        <div className="p-4 border-b border-gray-50 bg-gray-50/50 flex items-center justify-between">
          <h3 className="font-bold text-gray-800 flex items-center gap-2">Your Lists</h3>
          <span className="text-xs font-medium bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
            {lists.length}
          </span>
        </div>

        <div className="max-h-[500px] overflow-y-auto flex flex-col gap-3 p-4 space-y-1">
          {lists.length === 0 ? (
            <p className="p-4 text-center text-sm text-gray-500">No lists found.</p>
          ) : (
            lists.map((l) => (
              <button
                key={l._id || l.id}
                onClick={() => onSelect(l._id || l.id || '')}
                className={`w-full p-3 text-left rounded-lg transition-all border cursor-pointer ${
                  currentListId === (l._id || l.id)
                    ? 'bg-blue-50 border-blue-200 text-blue-900 shadow-sm ring-1 ring-blue-200'
                    : 'bg-transparent border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold truncate pr-2">{l.name}</span>
                  {l.status === 'draft' && (
                    <span className="text-[10px] uppercase tracking-wider font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">
                      Draft
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between mt-1 text-xs opacity-70">
                  <span>{l.items?.length || 0} items</span>
                  <span>
                    {l.createdAt ? new Date(l.createdAt).toLocaleDateString() : 'No Date'}
                  </span>
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </aside>
  );
};
