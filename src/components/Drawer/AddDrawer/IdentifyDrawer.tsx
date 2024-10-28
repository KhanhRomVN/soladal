import React, { useRef, useEffect, useState } from 'react';
import Drawer from 'react-modern-drawer';
import { 
    X, User, Calendar, MapPin, CreditCard, Car, Phone, Mail, Lock, 
    Key, Briefcase, Building2, FileText, UserCircle2, Globe, ChevronDown
} from 'lucide-react';
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

interface IdentifyDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function IdentifyDrawer({ isOpen, onClose }: IdentifyDrawerProps) {
    const drawerRef = useRef<HTMLDivElement>(null);
    const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
    const [groups, setGroups] = useState<Group[]>([]);
    
    const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);

    const [formValues, setFormValues] = useState({
        // Personal
        firstname: '',
        lastname: '',
        dateOfBirth: '',
        gender: '',
        country: '',
        city: '',
        street: '',
        zipcode: '',

        // Passport
        passportID: '',
        passportIssuedBy: '',
        passportIssuedDate: '',
        passportExpiredDate: '',

        // ID Card
        idCardID: '',
        idCardIssuedBy: '',
        idCardIssuedDate: '',
        idCardExpiredDate: '',

        // Driving License
        drivingLicenseID: '',
        drivingLicenseIssuedBy: '',
        drivingLicenseIssuedDate: '',
        drivingLicenseExpiredDate: '',

        // Contact
        phone: '',
        gmail: '',
        passwordGmail: '',
        twoFactorGmail: '',

        // Job
        jobTitle: '',
        jobCompany: '',
        jobDescription: '',
        jobStartDate: '',
        jobEndDate: '',
        notes: '',
    });

    useEffect(() => {
        fetchGroups();
    }, []);



    const fetchGroups = async () => {
        try {
            const groupsData = await _GET('/group/identify');
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

    const handleCreateIdentity = async () => {
        try {
            const identityData = {
                ...formValues,
                groupId: selectedGroupId ? selectedGroupId : -1,
                type: 'identify',
                isFavorite: false,
            };

            console.log(identityData);

            await _POST('/identities', identityData);
            onClose();
        } catch (error) {
            console.error("Error updating identity:", error);
        }
    };

    const fields = [
        // Personal Information
        { key: 'firstname', title: 'First Name', placeholder: 'Enter first name', type: 'text', icon: <User size={20} />, halfWidth: true },
        { key: 'lastname', title: 'Last Name', placeholder: 'Enter last name', type: 'text', icon: <User size={20} />, halfWidth: true },
        { key: 'dateOfBirth', title: 'Date of Birth', placeholder: 'YYYY-MM-DD', type: 'date', icon: <Calendar size={20} />, halfWidth: true },
        { key: 'gender', title: 'Gender', placeholder: 'Enter gender', type: 'text', icon: <UserCircle2 size={20} />, halfWidth: true },
        { key: 'country', title: 'Country', placeholder: 'Enter country', type: 'text', icon: <MapPin size={20} />, halfWidth: true },
        { key: 'city', title: 'City', placeholder: 'Enter city', type: 'text', icon: <MapPin size={20} />, halfWidth: true },
        { key: 'street', title: 'Street', placeholder: 'Enter street', type: 'text', icon: <MapPin size={20} />, halfWidth: true },
        { key: 'zipcode', title: 'Zipcode', placeholder: 'Enter zipcode', type: 'text', icon: <MapPin size={20} />, halfWidth: true },

        // Passport Information
        { key: 'passportID', title: 'Passport ID', placeholder: 'Enter passport ID', type: 'text', icon: <Key size={20} />, halfWidth: true },
        { key: 'passportIssuedBy', title: 'Passport Issued By', placeholder: 'Enter issuing authority', type: 'text', icon: <Key size={20} />, halfWidth: true },
        { key: 'passportIssuedDate', title: 'Passport Issue Date', placeholder: 'YYYY-MM-DD', type: 'date', icon: <Calendar size={20} />, halfWidth: true },
        { key: 'passportExpiredDate', title: 'Passport Expiry Date', placeholder: 'YYYY-MM-DD', type: 'date', icon: <Calendar size={20} />, halfWidth: true },

        // ID Card Information
        { key: 'idCardID', title: 'ID Card Number', placeholder: 'Enter ID card number', type: 'text', icon: <CreditCard size={20} />, halfWidth: true },
        { key: 'idCardIssuedBy', title: 'ID Card Issued By', placeholder: 'Enter issuing authority', type: 'text', icon: <CreditCard size={20} />, halfWidth: true },
        { key: 'idCardIssuedDate', title: 'ID Card Issue Date', placeholder: 'YYYY-MM-DD', type: 'date', icon: <Calendar size={20} />, halfWidth: true },
        { key: 'idCardExpiredDate', title: 'ID Card Expiry Date', placeholder: 'YYYY-MM-DD', type: 'date', icon: <Calendar size={20} />, halfWidth: true },

        // Driving License Information
        { key: 'drivingLicenseID', title: 'Driving License Number', placeholder: 'Enter license number', type: 'text', icon: <Car size={20} />, halfWidth: true },
        { key: 'drivingLicenseIssuedBy', title: 'License Issued By', placeholder: 'Enter issuing authority', type: 'text', icon: <Car size={20} />, halfWidth: true },
        { key: 'drivingLicenseIssuedDate', title: 'License Issue Date', placeholder: 'YYYY-MM-DD', type: 'date', icon: <Calendar size={20} />, halfWidth: true },
        { key: 'drivingLicenseExpiredDate', title: 'License Expiry Date', placeholder: 'YYYY-MM-DD', type: 'date', icon: <Calendar size={20} />, halfWidth: true },

        // Contact Information
        { key: 'phone', title: 'Phone', placeholder: 'Enter phone number', type: 'tel', icon: <Phone size={20} />, halfWidth: true },
        { key: 'gmail', title: 'Gmail', placeholder: 'Enter Gmail address', type: 'email', icon: <Mail size={20} />, halfWidth: true },
        { key: 'passwordGmail', title: 'Gmail Password', placeholder: 'Enter Gmail password', type: 'password', icon: <Lock size={20} />, halfWidth: true },
        { key: 'twoFactorGmail', title: 'Gmail 2FA', placeholder: 'Enter 2FA code', type: 'text', icon: <Key size={20} />, halfWidth: true },

        // Job Information
        { key: 'jobTitle', title: 'Job Title', placeholder: 'Enter job title', type: 'text', icon: <Briefcase size={20} />, halfWidth: true },
        { key: 'jobCompany', title: 'Company', placeholder: 'Enter company name', type: 'text', icon: <Building2 size={20} />, halfWidth: true },
        { key: 'jobStartDate', title: 'Job Start Date', placeholder: 'YYYY-MM-DD', type: 'date', icon: <Calendar size={20} />, halfWidth: true },
        { key: 'jobEndDate', title: 'Job End Date', placeholder: 'YYYY-MM-DD', type: 'date', icon: <Calendar size={20} />, halfWidth: true },
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
                            onClick={handleCreateIdentity}
                        >
                            Save Changes
                        </Button>
                    </div>
                </div>

                <div className="space-y-4">
                    {/* Personal Information */}
                    <div className="border border-gray-800/100 p-4 rounded-lg">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-purple-500/20 rounded-lg">
                                <User className="h-5 w-5 text-purple-400" />
                            </div>
                            <input
                                type="text"
                                value={formValues.firstname}
                                onChange={(e) => handleInputChange('firstname', e.target.value)}
                                placeholder="First Name"
                                className="bg-gray-800 rounded px-2 py-1 w-full"
                            />
                        </div>
                        <div className="space-y-3">
                            <input
                                type="text"
                                value={formValues.lastname}
                                onChange={(e) => handleInputChange('lastname', e.target.value)}
                                placeholder="Last Name"
                                className="bg-gray-800 rounded px-2 py-1 w-full"
                            />
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
                    </div>

                    {/* Contact Information */}
                    <div className="border border-gray-800/100 p-4 rounded-lg space-y-3">
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
                            <Mail className="h-4 w-4 text-gray-400" />
                            <input
                                type="email"
                                value={formValues.gmail}
                                onChange={(e) => handleInputChange('gmail', e.target.value)}
                                placeholder="Gmail"
                                className="bg-gray-800 rounded px-2 py-1 w-full"
                            />
                        </div>
                    </div>

                    {/* Address Information */}
                    <div className="border border-gray-800/100 p-4 rounded-lg space-y-3">
                        <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                value={formValues.street}
                                onChange={(e) => handleInputChange('street', e.target.value)}
                                placeholder="Street Address"
                                className="bg-gray-800 rounded px-2 py-1 w-full"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                value={formValues.city}
                                onChange={(e) => handleInputChange('city', e.target.value)}
                                placeholder="City"
                                className="bg-gray-800 rounded px-2 py-1 w-full"
                            />
                        </div>
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
                    </div>

                    {/* Notes */}
                    <div className="pt-2 border-t border-gray-700">
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