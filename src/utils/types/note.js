// Define an object for note entity types
export const EntityType = {
    BUSINESS: 'BUSINESS',
    FREELANCER: 'FREELANCER',
    TRANSACTION: 'TRANSACTION',
    PROJECT: 'PROJECT',
    BID: 'BID',
    INTERVIEW: 'INTERVIEW',
    DEHIX_TALENT: 'DEHIX_TALENT',
  };
  
  // Define an object for label types (labels)
  export const LabelType = {
    PERSONAL: 'PERSONAL',
    WORK: 'WORK',
    REMINDER: 'REMINDER',
    TASK: 'TASK',
  };
  
  // Define an object for note types
  export const NoteType = {
    NOTE: 'NOTE',
    TRASH: 'TRASH',
    ARCHIVE: 'ARCHIVE',
  };
  
  // Note structure
  export const Note = {
    _id: '',
    userId: '',
    title: '',
    content: '',
    bgColor: '', // Optional color for note display
    banner: '', // Optional banner image for the note
    isHTML: false, // Indicates if the content is HTML
    entityID: '', // Used for fetching related notes
    entityType: '', // Type of the entity associated with the note
    type: '', // Label or type of the note
    noteType: '',
    createdAt: null,
  };
  
  // Badge colors
  export const badgeColors = {
    PERSONAL: 'bg-blue-500 text-white hover:text-black',
    WORK: 'bg-green-500 text-white hover:text-black',
    REMINDER: 'bg-yellow-500 text-black hover:text-black',
    TASK: 'bg-red-500 text-white hover:text-black',
  };

  