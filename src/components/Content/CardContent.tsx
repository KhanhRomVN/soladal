import React from 'react';

interface CardContentProps {    
    id: number | null;
}

const CardContent: React.FC<CardContentProps> = ({ id }) => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Card Information</h2>
      <p>Manage your credit and debit cards securely.</p>
      {/* Add more card-related content here */}
    </div>
  );
};

export default CardContent;