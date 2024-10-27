import React from 'react';

interface GoogleContentProps {
    id: number | null;
}

const GoogleContent: React.FC<GoogleContentProps> = ({ id }) => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Google Services</h2>
      <p>Access and manage your Google-related information.</p>
      {/* Add more Google-related content here */}
    </div>
  );
};

export default GoogleContent;