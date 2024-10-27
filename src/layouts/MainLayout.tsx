import React, { useState, useRef, useEffect, useContext } from "react";
import DragWindowRegion from "@/components/DragWindowRegion";
import NavigationMenu from "@/components/NavigationMenu";
import Sidebar from "@/components/Sidebar";
import { Search, X, Plus, ChevronDown, User, CreditCard, Fingerprint, Globe, Copy, FileText } from "lucide-react";
// context
import { AccountDrawerContext } from "@/Context/AccountDrawerContext";
import AddGroupDrawer from "@/components/AddGroupDrawer";
import AddAccountDrawer from "@/components/AddAccountDrawer";


function SearchBar() {
    const [searchTerm, setSearchTerm] = useState("");

    const handleClear = () => {
        setSearchTerm("");
    };

    return (
        <div className="relative w-full">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-searchBar-placeholder size-4" />
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Tìm kiếm trong tất cả kho lưu trữ..."
                className="w-full p-1.5 pl-8 pr-8 rounded-sm text-sm
                    bg-searchBar-background
                    text-searchBar-foreground
                    placeholder-searchBar-placeholder
                    border border-searchBar-outline
                    hover:border-searchBar-outlineHover
                    focus:border-searchBar-outlineFocus focus:outline-none
                    transition-colors duration-200"
            />
            {searchTerm && (
                <X
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-searchBar-placeholder cursor-pointer size-4"
                    onClick={handleClear}
                />
            )}
        </div>
    );
}

function DropdownMenu() {
    const { openAccountDrawer } = useContext(AccountDrawerContext);
    const options = [
        { name: "Account", icon: User, color: "hover:bg-blue-100 hover:text-blue-600", onClick: openAccountDrawer },
        { name: "Card", icon: CreditCard, color: "hover:bg-green-100 hover:text-green-600" },
        { name: "Identify", icon: Fingerprint, color: "hover:bg-purple-100 hover:text-purple-600" },
        { name: "Google", icon: Globe, color: "hover:bg-red-100 hover:text-red-600" },
        { name: "Clone", icon: Copy, color: "hover:bg-yellow-100 hover:text-yellow-600" },
        { name: "Note", icon: FileText, color: "hover:bg-pink-100 hover:text-pink-600" },
    ];
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="ml-2 p-1 rounded-sm bg-button-background text-button-foreground hover:bg-button-backgroundHover transition-colors duration-200 flex items-center"
            >
                <Plus className="w-5 h-5 mr-1" />
            </button>
            {isOpen && (
                <ul className="absolute right-0 mt-1 w-48 bg-card border border-outline rounded-sm shadow-lg z-10">
                    {options.map((option, index) => (
                        <li 
                            key={index} 
                            className={`px-4 py-2 flex items-center cursor-pointer text-gray-400 ${option.color} transition-colors duration-150`}
                            onClick={() => {
                                if (option.onClick) {
                                    option.onClick();
                                }
                                setIsOpen(false);
                            }}
                        >
                            <option.icon className="w-4 h-4 mr-2" />
                            {option.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col h-screen">
            <DragWindowRegion title="Soladal" />
            <NavigationMenu />
            <div className="flex flex-1 overflow-hidden">
                <div className="flex-1 flex flex-col">
                    <div className="flex flex-1 overflow-hidden">
                        <Sidebar />
                        <div className="flex-1 flex flex-col">
                            <div className="p-2 flex items-center border-b border-outline ">
                                <div className="flex-grow">
                                    <SearchBar />
                                </div>
                                <DropdownMenu />
                            </div>
                            <main className="flex-1 overflow-auto p-4">{children}</main>
                        </div>
                    </div>
                </div>
            </div>
            <AddAccountDrawer />
            <AddGroupDrawer />
        </div>
    );
}