import React, { useState } from 'react';
import Modal from '../common/Modal';

interface CreateListModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (name: string) => void;
}

export const CreateListModal: React.FC<CreateListModalProps> = ({ isOpen, onClose, onCreate }) => {
  const [newListName, setNewListName] = useState('');

  const handleSubmit = () => {
    if (newListName.trim()) {
      onCreate(newListName);
      setNewListName('');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New List" maxWidth="md">
      <div className="flex flex-col gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">List Name</label>
          <input
            type="text"
            placeholder="e.g., Weekend BBQ, Monthly Ration"
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            autoFocus
          />
        </div>

        <div className="flex gap-4 pt-4">
          <button
            onClick={handleSubmit}
            disabled={!newListName.trim()}
            className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-md transition-colors cursor-pointer"
          >
            Create List
          </button>
          <button
            onClick={() => {
              onClose();
              setNewListName('');
            }}
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 font-medium transition-colors cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};
