'use client';

import { useState, useCallback } from 'react';
import axios from 'axios';
import { toast } from '../../components/ui/use-toast';

const useFetchNotes = (userId) => {
  const [notes, setNotes] = useState([]);
  const [archive, setArchive] = useState([]);
  const [trash, setTrash] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchNotes = useCallback(async () => {
    if (!userId) return;

    setIsLoading(true);
    try {
      const response = await axios.get('/notes', {
        params: { userId },
      });
      if (response?.data?.notes) {
        setNotes(response.data.notes.notes);
        setArchive(response.data.notes.archive || []);
        setTrash(response.data.notes.trash || []);
      }
    } catch (error) {
      console.error('Failed to fetch notes:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Something went wrong. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  return {
    notes,
    archive,
    isLoading,
    fetchNotes,
    setNotes,
    setArchive,
    trash,
    setTrash,
  };
};

export default useFetchNotes;
