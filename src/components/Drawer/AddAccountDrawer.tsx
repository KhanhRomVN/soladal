import React, { useContext, useRef, useEffect, useState } from 'react';
import { X, Mail, User, Lock, Key, Globe, FileText, Eye, EyeOff, Phone, ChevronDown } from 'lucide-react';
import FormInputV2 from '@/components/FormInput/FormInputV2';
import { Button } from '@/components/ui/button';
import { _GET, _POST } from '@/utils/auth_api';
// context
import { AccountDrawerContext } from '@/Context/AccountDrawerContext';

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

const AddAccountDrawer: React.FC = () => {
    const { isAccountDrawerOpen, closeAccountDrawer } = useContext(AccountDrawerContext);
    const drawerRef = useRef<HTMLDivElement>(null);
    const [formValues, setFormValues] = useState({
        title: '',
        email: '',
        username: '',
        password: '',
        totp: '',
        website: '',
        notes: '',
        phone: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [groups, setGroups] = useState<Group[]>([]);
    const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);

    useEffect(() => {
        fetchGroups();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
                if (window.confirm('Bạn có chắc chắn muốn đóng drawer không?')) {
                    closeAccountDrawer();
                }
            }
        };

        if (isAccountDrawerOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isAccountDrawerOpen, closeAccountDrawer]);

    const fetchGroups = async () => {
        try {
            const groupsData = await _GET('/group');
            if (Array.isArray(groupsData) && groupsData.length > 0) {
                setGroups(groupsData);
                const allGroupsId = groupsData.find((group: Group) => group.title === "All Groups")?.id;
                setSelectedGroupId(allGroupsId || null);
            } else {
                setGroups([]);
                setSelectedGroupId(null);
                console.log("No groups found or empty response from API");
            }
        } catch (error) {
            console.error("Error fetching groups:", error);
            setGroups([]);
            setSelectedGroupId(null);
        }
    };

    const handleInputChange = (key: string, value: string) => {
        setFormValues(prev => ({ ...prev, [key]: value }));
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleCreateAccount = async () => {
        try {
            const accountData = {
                title: formValues.title,
                groupId: selectedGroupId ? selectedGroupId : -1,
                website_URL: formValues.website,
                username: formValues.username,
                email: formValues.email,
                password: formValues.password,
                isFavorite: false,
                phone: formValues.phone,
                note: formValues.notes,
                totp: formValues.totp,
                type: 'account',
            };

            const response = await _POST('/accounts', accountData);
            console.log("Account created:", response);
            closeAccountDrawer();
        } catch (error) {
            console.error("Error creating account:", error);
        }
    };

    const fields = [
        { key: 'title', title: 'Title', placeholder: 'Place your title here', type: 'text', icon: <FileText size={20} /> },
        { key: 'email', title: 'Email', placeholder: 'Enter your email', type: 'email', icon: <Mail size={20} />, halfWidth: true },
        { key: 'username', title: 'Username', placeholder: 'Enter your username', type: 'text', icon: <User size={20} />, halfWidth: true },
        { key: 'phone', title: 'Phone', placeholder: 'Enter your phone number', type: 'tel', icon: <Phone size={20} />, halfWidth: true },
        {
            key: 'password',
            title: 'Password',
            placeholder: 'Enter your password',
            type: showPassword ? 'text' : 'password',
            icon: <Lock size={20} />,
            endIcon: showPassword ? <EyeOff size={20} onClick={togglePasswordVisibility} /> : <Eye size={20} onClick={togglePasswordVisibility} />,
            halfWidth: true
        },
        { key: 'totp', title: '2FA (TOTP)', placeholder: 'Add 2FA code', type: 'text', icon: <Key size={20} />, halfWidth: true },
        { key: 'website', title: 'Website', placeholder: 'https://', type: 'url', icon: <Globe size={20} />, halfWidth: true },
    ];

    if (!isAccountDrawerOpen) return null;

    return (
        <div className="fixed inset-y-0 right-0 w-[45rem] bg-background shadow-xl z-50 text-white p-4 border-l border-gray-700" ref={drawerRef}>
            <div className="h-full flex flex-col">
                {/* Header */}
                <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-700">
                    <button onClick={closeAccountDrawer} className="text-gray-400 hover:text-gray-200 rounded-sm bg-gray-800 p-1">
                        <X size={24} />
                    </button>
                    <div className="flex gap-2 items-center">
                        <div className="relative">
                            {groups.length > 0 ? (
                                <select
                                    id="dropdown"
                                    value={selectedGroupId ?? -1}
                                    onChange={(e) => setSelectedGroupId(Number(e.target.value))}
                                    className="w-full bg-gray-700 text-white rounded-md border border-gray-600 focus:border-primary focus:ring-primary appearance-none pr-10 py-2 pl-3 text-sm"
                                >
                                    <option value={-1}>Account</option>
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
                        <Button className="bg-primary hover:bg-primary-dark text-white" onClick={handleCreateAccount}>
                            Create Account
                        </Button>
                    </div>
                </div>
                {/* Form */}
                <form className="flex-grow overflow-y-auto">
                    <div className="grid grid-cols-2 gap-4">
                        <FormInputV2 fields={fields} values={formValues} onChange={handleInputChange} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="notes" className="block text-sm font-medium text-gray-300 mb-1">
                            Notes
                        </label>
                        <textarea
                            id="notes"
                            rows={3}
                            className="w-full bg-gray-800 text-white rounded-md border-gray-700 focus:border-primary focus:ring-primary p-2"
                            placeholder="Add notes"
                            value={formValues.notes}
                            onChange={(e) => handleInputChange('notes', e.target.value)}
                        ></textarea>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddAccountDrawer;