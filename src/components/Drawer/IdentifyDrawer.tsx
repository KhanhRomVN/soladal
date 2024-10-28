import React from 'react';
import Drawer from 'react-modern-drawer';

interface IdentifyDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function IdentifyDrawer({ isOpen, onClose }: IdentifyDrawerProps) {
    return (
        <Drawer
            open={isOpen}
            onClose={onClose}
            direction="right"
            size="66.666667vw"
            className="h-full"
        >
            <div className="p-4">
                <h2 className="text-xl font-bold">Account Settings</h2>
                {/* Add Account content here */}
            </div>
        </Drawer>
    );
}