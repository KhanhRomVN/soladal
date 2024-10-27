import React from 'react';

interface AccountContentProps {
  id: number | null;
}

const AccountContent: React.FC<AccountContentProps> = ({ id }) => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Account Management</h2>
      <p>Here you can manage your accounts and passwords.</p>
      {id ? (
        <p>Viewing account with ID: {id}</p>
      ) : (
        <p>Viewing all accounts</p>
      )}
      {/* Add more account-related content here */}
    </div>
  );
};

export default AccountContent;