import React, { useRef, useEffect, useState } from 'react';
import Drawer from 'react-modern-drawer';
import { X, Mail, Lock, Key, Phone, User, Globe, Calendar, Languages, Monitor, Network, FileText, ChevronDown } from 'lucide-react';
import FormInputV2 from '@/components/FormInput/FormInputV2';
import { Button } from '@/components/ui/button';
import { _GET, _POST } from '@/utils/auth_api';

interface Group {
    id: number;
    title: string;
    userId: number;
    lucideIcon: string;
    canDelete: boolean;
    isFavorite: boolean;
    createdAt: string;
    updatedAt: string;
}

interface CloneDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CloneDrawer({ isOpen, onClose }: CloneDrawerProps) {
    const drawerRef = useRef<HTMLDivElement>(null);
    const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
    const [groups, setGroups] = useState<Group[]>([]);
    const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);

    const [formValues, setFormValues] = useState({
        email: '',
        password: '',
        twoFactor: '',
        phone: '',
        displayName: '',
        dateOfBirth: '',
        country: '',
        language: '',
        agent: '',
        proxy: '',
        status: '',
        notes: '',
    });

    useEffect(() => {
        fetchGroups();
    }, []);

    const fetchGroups = async () => {
        try {
            const groupsData = await _GET('/group/clone');
            if (Array.isArray(groupsData) && groupsData.length > 0) {
                setGroups(groupsData);
                const allGroupsId = groupsData.find((group: Group) => group.title === "All Groups")?.id;
                setSelectedGroupId(allGroupsId || null);
            } else {
                setGroups([]);
                setSelectedGroupId(null);
            }
        } catch (error) {
            console.error("Error fetching groups:", error);
            setGroups([]);
            setSelectedGroupId(null);
        }
    };

    const handleInputChange = (key: string, value: string) => {
        setFormValues(prev => ({ ...prev, [key]: value }));
        if (formErrors[key]) {
            setFormErrors(prev => ({ ...prev, [key]: '' }));
        }
    };

    const handleCreateClone = async () => {
        try {
            const cloneData = {
                ...formValues,
                groupId: selectedGroupId ? selectedGroupId : -1,
                type: 'clone',
                isFavorite: false,
            };

            console.log(cloneData);

            await _POST('/clones', cloneData);
            onClose();
        } catch (error) {
            console.error("Error updating clone:", error);
        }
    };

    const fields = [
        // Account Credentials
        { key: 'email', title: 'Email', placeholder: 'Enter email', type: 'email', icon: <Mail size={20} />, halfWidth: true },
        { key: 'password', title: 'Password', placeholder: 'Enter password', type: 'password', icon: <Lock size={20} />, halfWidth: true },
        { key: 'twoFactor', title: '2FA', placeholder: 'Enter 2FA code', type: 'text', icon: <Key size={20} />, halfWidth: true },

        // Personal Information
        { key: 'displayName', title: 'Display Name', placeholder: 'Enter display name', type: 'text', icon: <User size={20} />, halfWidth: true },
        { key: 'phone', title: 'Phone', placeholder: 'Enter phone number', type: 'tel', icon: <Phone size={20} />, halfWidth: true },
        { key: 'dateOfBirth', title: 'Date of Birth', placeholder: 'YYYY-MM-DD', type: 'date', icon: <Calendar size={20} />, halfWidth: true },

        // Regional Settings
        { key: 'country', title: 'Country', placeholder: 'Select country', type: 'text', icon: <Globe size={20} />, halfWidth: true },
        { key: 'language', title: 'Language', placeholder: 'Select language', type: 'text', icon: <Languages size={20} />, halfWidth: true },

        // Technical Settings
        { key: 'agent', title: 'User Agent', placeholder: 'Enter user agent', type: 'text', icon: <Monitor size={20} />, halfWidth: true },
        { key: 'proxy', title: 'Proxy', placeholder: 'Enter proxy', type: 'text', icon: <Network size={20} />, halfWidth: true },

        // Status
        { key: 'status', title: 'Status', placeholder: 'Enter status', type: 'text', icon: <FileText size={20} />, halfWidth: true },
    ];

    return (
        <Drawer
            open={isOpen}
            onClose={onClose}
            direction="right"
            size={500}
            className="h-full"
        >
            <div className="p-4 bg-sidebar-primary h-full">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <Button variant="ghost" onClick={onClose} className="text-gray-400">
                        <X className="h-4 w-4" />
                    </Button>

                    <div className="flex justify-end gap-2">
                        <div className="relative">
                            {groups.length > 0 ? (
                                <select
                                    id="dropdown"
                                    value={selectedGroupId ?? -1}
                                    onChange={(e) => setSelectedGroupId(Number(e.target.value))}
                                    className="w-full bg-gray-700 text-white rounded-md border border-gray-600 focus:border-primary focus:ring-primary appearance-none pr-10 py-2 pl-3 text-sm"
                                >
                                    <option value={-1}>Identity</option>
                                    {groups.map((group) => (
                                        <option key={group.id} value={group.id}>
                                            {group.title}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <div className="w-full bg-gray-700 text-gray-400 rounded-md border border-gray-600 py-2 pl-3 pr-10 text-sm">
                                    No groups available
                                </div>
                            )}
                            <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                        <Button
                            className="bg-purple-500 hover:bg-purple-600"
                            onClick={handleCreateClone}
                        >
                            Save Changes
                        </Button>
                    </div>
                </div>

                <div className="space-y-4">
                    {/* Account Credentials */}
                    <div className="border border-gray-800/100 p-4 rounded-lg space-y-3">
                        <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-gray-400" />
                            <input
                                type="email"
                                value={formValues.email}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                                placeholder="Email"
                                className="bg-gray-800 rounded px-2 py-1 w-full"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <Lock className="h-4 w-4 text-gray-400" />
                            <input
                                type="password"
                                value={formValues.password}
                                onChange={(e) => handleInputChange('password', e.target.value)}
                                placeholder="Password"
                                className="bg-gray-800 rounded px-2 py-1 w-full"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <Key className="h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                value={formValues.twoFactor}
                                onChange={(e) => handleInputChange('twoFactor', e.target.value)}
                                placeholder="2FA Code"
                                className="bg-gray-800 rounded px-2 py-1 w-full"
                            />
                        </div>
                    </div>

                    {/* Personal Information */}
                    <div className="border border-gray-800/100 p-4 rounded-lg space-y-3">
                        <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                value={formValues.displayName}
                                onChange={(e) => handleInputChange('displayName', e.target.value)}
                                placeholder="Display Name"
                                className="bg-gray-800 rounded px-2 py-1 w-full"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-gray-400" />
                            <input
                                type="tel"
                                value={formValues.phone}
                                onChange={(e) => handleInputChange('phone', e.target.value)}
                                placeholder="Phone Number"
                                className="bg-gray-800 rounded px-2 py-1 w-full"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <input
                                type="date"
                                value={formValues.dateOfBirth}
                                onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                                className="bg-gray-800 rounded px-2 py-1 w-full"
                            />
                        </div>
                    </div>

                    {/* Additional Settings */}
                    <div className="border border-gray-800/100 p-4 rounded-lg space-y-3">
                        <div className="flex items-center gap-2">
                            <Globe className="h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                value={formValues.country}
                                onChange={(e) => handleInputChange('country', e.target.value)}
                                placeholder="Country"
                                className="bg-gray-800 rounded px-2 py-1 w-full"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <Languages className="h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                value={formValues.language}
                                onChange={(e) => handleInputChange('language', e.target.value)}
                                placeholder="Language"
                                className="bg-gray-800 rounded px-2 py-1 w-full"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <Monitor className="h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                value={formValues.agent}
                                onChange={(e) => handleInputChange('agent', e.target.value)}
                                placeholder="User Agent"
                                className="bg-gray-800 rounded px-2 py-1 w-full"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <Network className="h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                value={formValues.proxy}
                                onChange={(e) => handleInputChange('proxy', e.target.value)}
                                placeholder="Proxy"
                                className="bg-gray-800 rounded px-2 py-1 w-full"
                            />
                        </div>
                    </div>

                    {/* Notes */}
                    <div className="border border-gray-800/100 p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                            <FileText className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-400">Notes</span>
                        </div>
                        <textarea
                            value={formValues.notes}
                            onChange={(e) => handleInputChange('notes', e.target.value)}
                            placeholder="Add notes..."
                            className="bg-gray-800 rounded px-2 py-1 w-full min-h-[100px]"
                        />
                    </div>
                </div>
            </div>
        </Drawer>
    );
}