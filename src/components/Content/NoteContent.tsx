import React from 'react';

interface NoteContentProps {
    id: number | null;
}

const NoteContent: React.FC<NoteContentProps> = ({ id }) => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Notes</h2>
      <p>Create, edit, and manage your notes here.</p>
      {/* Add more note-related content here */}
    </div>
  );
};

export default NoteContent;