import { useState, useEffect, useCallback } from 'react';
import { api } from '../api/client';
import { getErrorMessage } from '../api/utils';
import type { GroceryList } from '../types';

export const useLists = () => {
    const [lists, setLists] = useState<GroceryList[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchLists = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await api.lists.getAll();
            setLists(data);
        } catch (err) {
            setError(getErrorMessage(err));
        } finally {
            setLoading(false);
        }
    }, []);

    const createList = async (name: string) => {
        try {
            const newList = await api.lists.create(name);
            setLists((prev) => [...prev, newList]);
            return newList;
        } catch (err) {
            setError(getErrorMessage(err));
            throw err;
        }
    };

    const deleteList = async (listId: string) => {
        try {
            await api.lists.delete(listId);
            setLists((prev) => prev.filter((list) => list._id !== listId));
        } catch (err) {
            setError(getErrorMessage(err));
        }
    };

    useEffect(() => {
        fetchLists();
    }, [fetchLists]);

    return { lists, loading, error, createList, deleteList, refreshLists: fetchLists };
};
