'use client';

import { useState } from 'react';
import axios from 'axios';
import { toast } from '../components/ui/use-toast';

const useDragAndDrop = (notes, setNotes) => {
  const [draggingIndex, setDraggingIndex] = useState(null);
  const [draggingOverIndex, setDraggingOverIndex] = useState(null);

  const handleDragStart = (index) => {
    setDraggingIndex(index);
  };

  const handleDragOver = (index) => {
    if (draggingIndex !== index) {
      setDraggingOverIndex(index);
    }
  };

  const handleDrop = async () => {
    if (draggingIndex !== null && draggingOverIndex !== null && draggingIndex !== draggingOverIndex) {
      const updatedNotesRender = [...notes];
      const draggedNote = updatedNotesRender[draggingIndex];
      const targetNote = updatedNotesRender[draggingOverIndex];

      updatedNotesRender[draggingIndex] = targetNote;
      updatedNotesRender[draggingOverIndex] = draggedNote;

      setNotes(updatedNotesRender);

      const updatedNoteOrder = updatedNotesRender.map((note) => note._id);
      const userId = updatedNotesRender[0]?.userId;

      if (userId) {
        try {
          const response = await axios.patch('/notes/update-noteorder', {
            userId,
            noteOrder: updatedNoteOrder,
          });

          if (response.status === 200) {
            console.log('Notes order updated successfully:', response.data);
          } else {
            console.error('Failed to update note order:', response.statusText);
            toast({
              variant: 'destructive',
              title: 'Error',
              description: 'Something went wrong. Please try again.',
            });
          }
        } catch (error) {
          console.error('Error updating note order:', error.message);
          toast({
            variant: 'destructive',
            title: 'Error',
            description: 'Something went wrong. Please try again.',
          });
        }
      } else {
        console.error('User ID is missing. Cannot update note order.');
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Something went wrong. Please try again.',
        });
      }
    }

    setDraggingIndex(null);
    setDraggingOverIndex(null);
  };

  return {
    draggingIndex,
    draggingOverIndex,
    handleDragStart,
    handleDragOver,
    handleDrop,
  };
};

export default useDragAndDrop;
