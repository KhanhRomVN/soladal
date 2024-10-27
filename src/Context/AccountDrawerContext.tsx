import React, { createContext, useState, useCallback, ReactNode } from 'react';

interface AccountDrawerContextType {
    isAccountDrawerOpen: boolean;
    openAccountDrawer: () => void;
    closeAccountDrawer: () => void;
}

export const AccountDrawerContext = createContext<AccountDrawerContextType>({
    isAccountDrawerOpen: false,
    openAccountDrawer: () => {},
    closeAccountDrawer: () => {},
});

interface AccountDrawerProviderProps {
    children: ReactNode;
}


export const AccountDrawerProvider: React.FC<AccountDrawerProviderProps> = ({ children }) => {
    const [isAccountDrawerOpen, setIsAccountDrawerOpen] = useState(false);

    const openAccountDrawer = useCallback(() => setIsAccountDrawerOpen(true), []);
    const closeAccountDrawer = useCallback(() => setIsAccountDrawerOpen(false), []);

    const value = React.useMemo(() => ({ isAccountDrawerOpen, openAccountDrawer, closeAccountDrawer }), [isAccountDrawerOpen, openAccountDrawer, closeAccountDrawer]);
    return (
        <AccountDrawerContext.Provider value={value}>
            {children}
        </AccountDrawerContext.Provider>
    );
};