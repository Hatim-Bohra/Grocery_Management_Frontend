import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { CurrentListBuilder } from '../../components/lists/CurrentListBuilder';
import { ListSidebar } from '../../components/lists/ListSidebar';
import { CreateListModal } from '../../components/lists/CreateListModal';
import { api } from '../../api/client';
import { getErrorMessage } from '../../api/utils';
import { useLists } from '../../hooks/useLists';
import type { GroceryList, ListItem } from '../../types';
import { useToast } from '../../components/common/ToastProvider';

// --- Icons ---
const Icons = {
  Plus: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>,
  Refresh: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>,
  List: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>,
};

export const ListPage: React.FC = () => {
  const { lists, loading: listsLoading, error: listsError, createList, refreshLists } = useLists();
  const [currentList, setCurrentList] = useState<GroceryList | null>(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showNewListForm, setShowNewListForm] = useState(false);
  const { showToast } = useToast();
  const location = useLocation();

  useEffect(() => {
    if (listsError) setError(listsError);
  }, [listsError]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('new') === '1') {
      setShowNewListForm(true);
    }
  }, [location.search]);

  // Load details for a single list (items, etc.)
  const loadListDetails = useCallback(async (listId: string) => {
    setDetailsLoading(true);
    try {
      const list = await api.lists.getById(listId);
      const items = await api.items.getAll(listId);
      setCurrentList({ ...list, items });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('Failed to load list details:', err);
      setError('Failed to load list details');
    } finally {
      setDetailsLoading(false);
    }
  }, []);

  // Sync current list updates with the main lists, or auto-select first list
  useEffect(() => {
    if (!currentList && lists.length > 0 && !listsLoading) {
      const draftList = lists.find((l) => l.status === 'draft') || lists[0];
      if (draftList) {
        loadListDetails(draftList._id || draftList.id || '');
      }
    }
  }, [lists, currentList, listsLoading, loadListDetails]);

  const handleCreateNewList = async (name: string) => {
    try {
      const newList = await createList(name);
      setCurrentList({ ...newList, items: [] });
      setShowNewListForm(false);
      showToast('success', `List "${name}" created successfully!`);
      setError('Failed to create list');
    }
  };

  const handleUpdateItemStatus = async (
    itemId: string,
    status: 'to_buy' | 'in_progress' | 'done' | 'unavailable' | 'substituted'
  ) => {
    if (!currentList) return;
    try {
      const updatedItem = await api.items.update(currentList._id || currentList.id || '', itemId, { status } as Partial<ListItem>);
      const updatedItems = currentList.items?.map((item) => ((item._id || item.id) === itemId ? updatedItem : item)) || [];
      setCurrentList({ ...currentList, items: updatedItems });
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  const handleRemoveItem = async (itemId: string) => {
    if (!currentList) return;
    try {
      await api.items.delete(currentList._id || currentList.id || '', itemId);
      const updatedItems = (currentList.items || []).filter((item) => (item._id || item.id) !== itemId);
      setCurrentList({ ...currentList, items: updatedItems });
      showToast('success', 'Item removed from list');
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  const handleSaveList = async (name: string) => {
    if (!currentList) return;
    try {
      const updated = await api.lists.update(currentList._id || currentList.id || '', { name });
      setCurrentList({ ...currentList, name: updated.name });
      refreshLists(); // Update side menu
      showToast('success', 'List name saved');
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  const handleShareList = async () => {
    if (!currentList) return;
    try {
      const result = await api.share.generateLink(currentList._id || currentList.id || '');
      const shareUrl = `${window.location.origin}/share/${result.shareToken}`;
      navigator.clipboard.writeText(shareUrl);
      showToast('success', `Link copied! Share this: ${shareUrl}`);
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  const handleRefreshList = async () => {
    if (!currentList) return;
    loadListDetails(currentList._id || currentList.id || '');
  };

  if (listsLoading && lists.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-500 font-medium">Loading your lists...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 pb-20 overflow-scroll h-full relative">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Shopping Lists</h1>
              <p className="text-sm text-gray-500">Manage and share your grocery needs</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowNewListForm(true)}
                className="flex-1 sm:flex-none justify-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 active:bg-blue-800 transition-colors font-semibold flex items-center gap-2 shadow-sm text-sm cursor-pointer"
              >
                <Icons.Plus />
                <span>New List</span>
              </button>
              <button
                onClick={refreshLists}
                className="p-2.5 bg-white border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 hover:text-blue-600 transition shadow-sm cursor-pointer"
                title="Refresh all lists"
              >
                <Icons.Refresh />
              </button>
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="max-w-7xl mx-auto px-4 mt-6">
          <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-700 flex items-center gap-3 shadow-sm">
            <span className="text-xl">⚠️</span>
            <span className="font-medium">{error}</span>
            <button onClick={() => setError('')} className="ml-auto text-sm opacity-70 hover:opacity-100">Dismiss</button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-6 h-[700px] overflow-auto">
            {currentList ? (
              <div className="animate-fade-in">
                {detailsLoading && (
                  <div className="flex justify-center p-4"><div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div></div>
                )}
                <CurrentListBuilder
                  list={currentList}
                  onUpdateItemStatus={handleUpdateItemStatus}
                  onRemoveItem={handleRemoveItem}
                  onSaveList={handleSaveList}
                  onShareList={handleShareList}
                  onItemAdded={() => loadListDetails(currentList._id || currentList.id || '')}
                  onRefreshList={handleRefreshList}
                />
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
                <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icons.List />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No lists selected</h3>
                <p className="text-gray-500 mb-6">Select a list from the sidebar or create a new one.</p>
                <button
                  onClick={() => setShowNewListForm(true)}
                  className="inline-flex items-center px-6 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition shadow-md cursor-pointer"
                >
                  Create New List
                </button>
              </div>
            )}
          </div>

          <ListSidebar
            lists={lists}
            currentListId={currentList?._id || currentList?.id}
            onSelect={(id) => loadListDetails(id)}
          />
        </div>
      </div>

      <CreateListModal
        isOpen={showNewListForm}
        onClose={() => setShowNewListForm(false)}
        onCreate={handleCreateNewList}
      />
    </div>
  );
};