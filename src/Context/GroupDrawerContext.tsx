import React, { createContext, useState, useCallback, ReactNode } from 'react';

interface GroupDrawerContextType {
    isGroupDrawerOpen: boolean;
    openGroupDrawer: () => void;
    closeGroupDrawer: () => void;
}

export const GroupDrawerContext = createContext<GroupDrawerContextType>({
    isGroupDrawerOpen: false,
    openGroupDrawer: () => { },
    closeGroupDrawer: () => { },
});

interface GroupDrawerProviderProps {
    children: ReactNode;
}

export const GroupDrawerProvider: React.FC<GroupDrawerProviderProps> = ({ children }) => {
    const [isGroupDrawerOpen, setIsGroupDrawerOpen] = useState(false);

    const openGroupDrawer = useCallback(() => {
        console.log("openGroupDrawer called");
        setIsGroupDrawerOpen(true);
    }, []);

    const closeGroupDrawer = useCallback(() => {
        console.log("closeGroupDrawer called");
        setIsGroupDrawerOpen(false);
    }, []);

    const value = React.useMemo(() => ({ isGroupDrawerOpen, openGroupDrawer, closeGroupDrawer }), [isGroupDrawerOpen, openGroupDrawer, closeGroupDrawer]);
    return (
        <GroupDrawerContext.Provider value={value}>
            {children}
        </GroupDrawerContext.Provider>
    );
};