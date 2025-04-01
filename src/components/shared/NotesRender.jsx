import React from 'react';

import NotesContainer from './NotesContainer';

const NotesRender = ({
  notes,
  setNotes,
  isArchive,
  isTrash,
  fetchNotes,
}) => (
  <NotesContainer
    notes={notes}
    setNotes={setNotes}
    isArchive={isArchive}
    isTrash={isTrash}
    fetchNotes={fetchNotes}
  />
);

export default NotesRender;