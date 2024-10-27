import React, { useState } from 'react';
import { MoreVertical, X } from 'lucide-react';
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table';
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import { Button } from '@/components/ui/button';
interface GoogleContentProps {
    id: number | null;
}

const googleData = [
    {
        "id": 1,
        "userId": 101,
        "email": "john.doe@gmail.com",
        "phone": "+1234567890",
        "password": "SecurePass123!",
        "country": "United States",
        "agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        "twoFactor": "ABCD1234",
        "isFavorite": true,
        "createdAt": "2024-01-15T08:30:00",
        "updatedAt": "2024-03-20T15:45:00"
    },
    {
        "id": 2,
        "userId": 102,
        "email": "mary.smith@gmail.com",
        "phone": "+1987654321",
        "password": "MaryPass456!",
        "country": "Canada",
        "agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
        "twoFactor": "EFGH5678",
        "isFavorite": false,
        "createdAt": "2024-02-01T10:20:00",
        "updatedAt": "2024-03-19T14:30:00"
    },
    {
        "id": 3,
        "userId": 103,
        "email": "david.wilson@gmail.com",
        "phone": "+1122334455",
        "password": "DavidSecure789!",
        "country": "United Kingdom",
        "agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15",
        "twoFactor": "IJKL9012",
        "isFavorite": true,
        "createdAt": "2024-02-15T09:15:00",
        "updatedAt": "2024-03-18T16:20:00"
    },
    {
        "id": 4,
        "userId": 104,
        "email": "sarah.jones@gmail.com",
        "phone": "+1555666777",
        "password": "SarahPass321!",
        "country": "Australia",
        "agent": "Mozilla/5.0 (Linux; Android 11; SM-G991B) AppleWebKit/537.36",
        "twoFactor": "MNOP3456",
        "isFavorite": false,
        "createdAt": "2024-03-01T11:45:00",
        "updatedAt": "2024-03-17T13:10:00"
    },
    {
        "id": 5,
        "userId": 105,
        "email": "michael.brown@gmail.com",
        "phone": "+1999888777",
        "password": "MikeSecure567!",
        "country": "Germany",
        "agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/91.0.4472.124",
        "twoFactor": "QRST7890",
        "isFavorite": true,
        "createdAt": "2024-03-05T14:25:00",
        "updatedAt": "2024-03-16T17:40:00"
    },
    {
        "id": 6,
        "userId": 106,
        "email": "emma.davis@gmail.com",
        "phone": "+1777888999",
        "password": "EmmaPass789!",
        "country": "France",
        "agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Safari/605.1.15",
        "twoFactor": "UVWX1234",
        "isFavorite": false,
        "createdAt": "2024-03-10T12:50:00",
        "updatedAt": "2024-03-15T09:30:00"
    },
    {
        "id": 7,
        "userId": 107,
        "email": "james.miller@gmail.com",
        "phone": "+1444555666",
        "password": "JamesSecure234!",
        "country": "Japan",
        "agent": "Mozilla/5.0 (iPad; CPU OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15",
        "twoFactor": "YZAB5678",
        "isFavorite": true,
        "createdAt": "2024-03-12T16:15:00",
        "updatedAt": "2024-03-14T11:20:00"
    },
    {
        "id": 8,
        "userId": 108,
        "email": "lisa.taylor@gmail.com",
        "phone": "+1333222111",
        "password": "LisaPass890!",
        "country": "Brazil",
        "agent": "Mozilla/5.0 (Linux; Android 12; Pixel 6) AppleWebKit/537.36",
        "twoFactor": "CDEF9012",
        "isFavorite": false,
        "createdAt": "2024-03-13T13:40:00",
        "updatedAt": "2024-03-13T13:40:00"
    },
    {
        "id": 9,
        "userId": 109,
        "email": "robert.anderson@gmail.com",
        "phone": "+1666777888",
        "password": "RobertSecure345!",
        "country": "Spain",
        "agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Firefox/89.0",
        "twoFactor": "GHIJ3456",
        "isFavorite": true,
        "createdAt": "2024-03-14T15:30:00",
        "updatedAt": "2024-03-14T15:30:00"
    },
    {
        "id": 10,
        "userId": 110,
        "email": "emily.white@gmail.com",
        "phone": "+1888999000",
        "password": "EmilyPass678!",
        "country": "Italy",
        "agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Chrome/92.0.4515.131",
        "twoFactor": "KLMN7890",
        "isFavorite": false,
        "createdAt": "2024-03-15T10:20:00",
        "updatedAt": "2024-03-15T10:20:00"
    }
];

const GoogleContent: React.FC<GoogleContentProps> = ({ id }) => {
    const [selectedRow, setSelectedRow] = useState<typeof googleData[0] | null>(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const [isEditing, setIsEditing] = useState(false);
    const [editedRow, setEditedRow] = useState<typeof googleData[0] | null>(null);

    const handleEditClick = () => {
        setIsEditing(true);
        setEditedRow(selectedRow);
    };

    const handleSave = () => {
        if (editedRow) {
            setSelectedRow(editedRow);
            setIsEditing(false);
        }
    };

    const columnHelper = createColumnHelper<typeof googleData[0]>();

    const columns = [
        columnHelper.accessor('email', {
            header: 'Email',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('phone', {
            header: 'Phone',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('country', {
            header: 'Country',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('password', {
            header: 'Password',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('createdAt', {
            header: 'Created At',
            cell: info => new Date(info.getValue()).toLocaleDateString(),
        }),

        columnHelper.accessor('id', {
            header: 'Action',
            cell: (info) => (
                <button
                    onClick={() => {
                        setSelectedRow(info.row.original);
                        setIsDrawerOpen(true);
                    }}
                    className="p-2 hover:bg-blue-100 rounded-full"
                >
                    <MoreVertical className="h-4 w-4" />
                </button>
            ),
        }),
    ];

    const table = useReactTable({
        data: googleData,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <>
            <div className="relative overflow-x-auto rounded-sm shadow-md">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs uppercase bg-table-headerBackground hover:bg-table-headerHover bg-opacity-20 text-table-header-foreground">
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <th key={header.id} className="px-6 py-3">
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map(row => (
                            <tr
                                key={row.id}
                                className="bg-table-bodyBackground bg-opacity-30 border-b border-table-body-foreground hover:bg-table-bodyHover hover:bg-opacity-40 transition-colors"
                            >
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id} className="px-6 py-4 text-gray-400">
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Drawer
                open={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                direction="right"
                size={400}
            >
                <div className="p-6 bg-sidebar-primary h-full">
                    <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
                        <Button
                            onClick={() => {
                                setIsDrawerOpen(false);
                                setIsEditing(false);
                            }}
                            className="p-2 hover:bg-gray-100 rounded-sm transition-colors duration-200"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                        {isEditing ? (
                            <Button
                                onClick={handleSave}
                                className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded-sm transition-colors duration-200"
                            >
                                Save
                            </Button>
                        ) : (
                            <Button
                                onClick={handleEditClick}
                                className="bg-button-background hover:bg-button-backgroundHover text-button-foreground px-2 py-1 rounded-sm transition-colors duration-200"
                            >
                                Edit
                            </Button>
                        )}
                    </div>

                    {selectedRow && (
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors duration-200">
                                <div className="text-sm text-gray-200 mb-2">Email</div>
                                {isEditing ? (
                                    <input
                                        type="email"
                                        value={editedRow?.email || ''}
                                        onChange={(e) => setEditedRow(prev => prev ? { ...prev, email: e.target.value } : null)}
                                        className="w-full bg-gray-700 text-gray-200 p-1 rounded"
                                    />
                                ) : (
                                    <div className="font-medium text-gray-500">{selectedRow.email}</div>
                                )}
                            </div>

                            <div className="p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors duration-200">
                                <div className="text-sm text-gray-200 mb-2">Password</div>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={editedRow?.password || ''}
                                        onChange={(e) => setEditedRow(prev => prev ? { ...prev, password: e.target.value } : null)}
                                        className="w-full bg-gray-700 text-gray-200 p-1 rounded"
                                    />
                                ) : (
                                    <div className="font-medium text-gray-500 font-mono">{selectedRow.password}</div>
                                )}
                            </div>

                            <div className="p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors duration-200">
                                <div className="text-sm text-gray-200 mb-2">Two Factor</div>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={editedRow?.twoFactor || ''}
                                        onChange={(e) => setEditedRow(prev => prev ? { ...prev, twoFactor: e.target.value } : null)}
                                        className="w-full bg-gray-700 text-gray-200 p-1 rounded"
                                    />
                                ) : (
                                    <div className="font-medium text-gray-500 font-mono">{selectedRow.twoFactor}</div>
                                )}
                            </div>

                            <div className="p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors duration-200">
                                <div className="text-sm text-gray-200 mb-2">Phone</div>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={editedRow?.phone || ''}
                                        onChange={(e) => setEditedRow(prev => prev ? { ...prev, phone: e.target.value } : null)}
                                        className="w-full bg-gray-700 text-gray-200 p-1 rounded"
                                    />
                                ) : (
                                    <div className="font-medium text-gray-500">{selectedRow.phone}</div>
                                )}
                            </div>

                            <div className="p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors duration-200">
                                <div className="text-sm text-gray-200 mb-2">Country</div>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={editedRow?.country || ''}
                                        onChange={(e) => setEditedRow(prev => prev ? { ...prev, country: e.target.value } : null)}
                                        className="w-full bg-gray-700 text-gray-200 p-1 rounded"
                                    />
                                ) : (
                                    <div className="font-medium text-gray-500">{selectedRow.country}</div>
                                )}
                            </div>

                            <div className="p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors duration-200">
                                <div className="text-sm text-gray-200 mb-2">Created At</div>
                                <div className="font-medium text-gray-500">
                                    {new Date(selectedRow.createdAt).toLocaleString()}
                                </div>
                            </div>

                            <div className="p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors duration-200">
                                <div className="text-sm text-gray-200 mb-2">Updated At</div>
                                <div className="font-medium text-gray-500">
                                    {new Date(selectedRow.updatedAt).toLocaleString()}
                                </div>
                            </div>

                            <div className="col-span-2 p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors duration-200">
                                <div className="text-sm text-gray-200 mb-2">Agent</div>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={editedRow?.agent || ''}
                                        onChange={(e) => setEditedRow(prev => prev ? { ...prev, agent: e.target.value } : null)}
                                        className="w-full bg-gray-700 text-gray-200 p-1 rounded"
                                    />
                                ) : (
                                    <div className="font-medium text-gray-500 break-all">{selectedRow.agent}</div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </Drawer>
        </>
    );
};

export default GoogleContent;
