import React from 'react';

interface CloneContentProps {
    id: number | null;
}

const CloneContent: React.FC<CloneContentProps> = ({ id }) => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Clone Management</h2>
      <p>Manage and organize your cloned items.</p>
      {/* Add more clone-related content here */}
    </div>
  );
};

export default CloneContent;