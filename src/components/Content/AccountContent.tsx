import React, { useState, useEffect } from 'react';
import { _GET } from '../../utils/auth_api';

interface Account {
  id: number;
  userId: number;
  title: string;
  type: string;
  groupId: number;
  website_URL: string;
  username: string;
  email: string;
  phone: string;
  password: string;
  twoFactor: string;
  notes: string;
  isFavorite: boolean;
  createdAt: string;
  updatedAt: string;
}

interface AccountContentProps {
  id: number | null;
}

const AccountContent: React.FC<AccountContentProps> = ({ id }) => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAccounts = async () => {
      setLoading(true);
      setError(null);
      try {
        const endpoint = id ? `/accounts/group/${id}` : '/accounts';
        const data = await _GET(endpoint);
        setAccounts(data);
        if (data.length > 0) {
          setSelectedAccount(data[0]);
        }
      } catch (error) {
        console.error('Error fetching accounts:', error);
        setError('Failed to fetch accounts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, [id]);

  const renderAccountInfo = (account: Account) => {
    if (account.phone) return account.phone;
    if (account.email) return account.email;
    if (account.username) return account.username;
    return '';
  };

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="p-4 flex">
      {/* List Account */}
      <div className="w-1/3 pr-4">
        <h2 className="text-xl font-bold mb-4">Accounts</h2>
        {accounts.length === 0 ? (
          <p>No accounts found.</p>
        ) : (
          <ul className="space-y-2">
            {accounts.map((account) => (
              <li
                key={account.id}
                className={`p-2 rounded cursor-pointer ${
                  selectedAccount?.id === account.id ? 'bg-blue-100' : 'hover:bg-gray-100'
                }`}
                onClick={() => setSelectedAccount(account)}
              >
                <div className="font-semibold">{account.title}</div>
                <div className="text-sm text-gray-600">{renderAccountInfo(account)}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* Account Selected Content */}
      <div className="w-2/3 pl-4 border-l">
        {selectedAccount ? (
          <div>
            <h2 className="text-xl font-bold mb-4">Selected Account</h2>
            <div className="space-y-2">
              <p><strong>Title:</strong> {selectedAccount.title}</p>
              <p><strong>ID:</strong> {selectedAccount.id}</p>
              <p><strong>User ID:</strong> {selectedAccount.userId}</p>
              <p><strong>Type:</strong> {selectedAccount.type}</p>
              <p><strong>Group ID:</strong> {selectedAccount.groupId}</p>
              <p><strong>Website URL:</strong> {selectedAccount.website_URL || 'N/A'}</p>
              <p><strong>Username:</strong> {selectedAccount.username || 'N/A'}</p>
              <p><strong>Email:</strong> {selectedAccount.email || 'N/A'}</p>
              <p><strong>Phone:</strong> {selectedAccount.phone || 'N/A'}</p>
              <p><strong>Password:</strong> {selectedAccount.password ? '********' : 'N/A'}</p>
              <p><strong>Two Factor:</strong> {selectedAccount.twoFactor || 'N/A'}</p>
              <p><strong>Notes:</strong> {selectedAccount.notes || 'N/A'}</p>
              <p><strong>Favorite:</strong> {selectedAccount.isFavorite ? 'Yes' : 'No'}</p>
              <p><strong>Created At:</strong> {new Date(selectedAccount.createdAt).toLocaleString()}</p>
              <p><strong>Updated At:</strong> {new Date(selectedAccount.updatedAt).toLocaleString()}</p>
            </div>
          </div>
        ) : (
          <p>No account selected.</p>
        )}
      </div>
    </div>
  );
};

export default AccountContent;