import React from 'react';
import { X } from 'lucide-react';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';
import { Button } from '@/components/ui/button';

interface GoogleContentDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    selectedRow: any;
    isEditing: boolean;
    editedRow: any;
    setEditedRow: (row: any) => void;
    handleSave: () => void;
    handleEditClick: () => void;
}

const GoogleContentDrawer: React.FC<GoogleContentDrawerProps> = ({
    isOpen,
    onClose,
    selectedRow,
    isEditing,
    editedRow,
    setEditedRow,
    handleSave,
    handleEditClick,
}) => {
    return (
        <Drawer
            open={isOpen}
            onClose={onClose}
            direction="right"
            size={400}
        >
            <div className="p-4 bg-background h-full">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={onClose}
                            className="hover:bg-accent"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                        <h2 className="text-lg font-semibold">Account Details</h2>
                    </div>
                    {isEditing ? (
                        <Button
                            onClick={handleSave}
                            variant="default"
                            size="sm"
                        >
                            Save Changes
                        </Button>
                    ) : (
                        <Button
                            onClick={handleEditClick}
                            variant="outline"
                            size="sm"
                        >
                            Edit
                        </Button>
                    )}
                </div>

                {selectedRow && (
                    <div className="space-y-4">
                        <div className="bg-card rounded-lg p-4 space-y-4">
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Email</label>
                                {isEditing ? (
                                    <input
                                        type="email"
                                        value={editedRow?.email || ''}
                                        onChange={(e) => setEditedRow((prev: typeof editedRow) => prev ? { ...prev, email: e.target.value } : null)}
                                        className="w-full mt-1 bg-input text-foreground p-2 rounded-md border border-input"
                                    />
                                ) : (
                                    <p className="mt-1 text-foreground">{selectedRow.email}</p>
                                )}
                            </div>

                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Password</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={editedRow?.password || ''}
                                        onChange={(e) => setEditedRow((prev: typeof editedRow) => prev ? { ...prev, password: e.target.value } : null)}
                                        className="w-full mt-1 bg-input text-foreground p-2 rounded-md border border-input font-mono"
                                    />
                                ) : (
                                    <p className="mt-1 text-foreground font-mono">{selectedRow.password}</p>
                                )}
                            </div>

                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Two Factor</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={editedRow?.twoFactor || ''}
                                        onChange={(e) => setEditedRow((prev: typeof editedRow) => prev ? { ...prev, twoFactor: e.target.value } : null)}
                                        className="w-full mt-1 bg-input text-foreground p-2 rounded-md border border-input font-mono"
                                    />
                                ) : (
                                    <p className="mt-1 text-foreground font-mono">{selectedRow.twoFactor}</p>
                                )}
                            </div>

                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Phone</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={editedRow?.phone || ''}
                                        onChange={(e) => setEditedRow((prev: typeof editedRow) => prev ? { ...prev, phone: e.target.value } : null)}
                                        className="w-full mt-1 bg-input text-foreground p-2 rounded-md border border-input"
                                    />
                                ) : (
                                    <p className="mt-1 text-foreground">{selectedRow.phone}</p>
                                )}
                            </div>

                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Country</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={editedRow?.country || ''}
                                        onChange={(e) => setEditedRow((prev: typeof editedRow) => prev ? { ...prev, country: e.target.value } : null)}
                                        className="w-full mt-1 bg-input text-foreground p-2 rounded-md border border-input"
                                    />
                                ) : (
                                    <p className="mt-1 text-foreground">{selectedRow.country}</p>
                                )}
                            </div>

                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Agent</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={editedRow?.agent || ''}
                                        onChange={(e) => setEditedRow((prev: typeof editedRow) => prev ? { ...prev, agent: e.target.value } : null)}
                                        className="w-full mt-1 bg-input text-foreground p-2 rounded-md border border-input"
                                    />
                                ) : (
                                    <p className="mt-1 text-foreground break-all">{selectedRow.agent}</p>
                                )}
                            </div>
                        </div>

                        <div className="bg-card rounded-lg p-4 space-y-4">
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Created At</label>
                                <p className="mt-1 text-foreground">
                                    {new Date(selectedRow.createdAt).toLocaleString()}
                                </p>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Updated At</label>
                                <p className="mt-1 text-foreground">
                                    {new Date(selectedRow.updatedAt).toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Drawer>
    );
};

export default GoogleContentDrawer;