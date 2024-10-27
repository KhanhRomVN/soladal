import React, { useState, useEffect, useContext } from 'react';
import { Button } from "@/components/ui/button";
import { Plus, MoreVertical, Settings } from "lucide-react";
import { _GET } from "@/utils/auth_api";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import * as LucideIcons from 'lucide-react';
import { useContent } from '@/Context/ContentContext';
import { ContentType } from '@/Context/ContentContext';

interface AppGroup {
  id: number;
  title: string;
  lucideIcon: string;
  type: ContentType;
}

interface Group {
  id: number;
  userId: number;
  title: string;
  lucideIcon: string;
  canDelete: boolean;
  type: ContentType;
  isFavorite: boolean;
  createdAt: string;
  updatedAt: string;
}

const Sidebar: React.FC = () => {
  const { setCurrentContent } = useContent();
  const [groups, setGroups] = useState<Group[]>([]);

  const appGroups: AppGroup[] = [
    { id: 1, title: 'Account', lucideIcon: 'User', type: 'account' },
    { id: 2, title: 'Card', lucideIcon: 'CreditCard', type: 'card' },
    { id: 3, title: 'Identify', lucideIcon: 'Fingerprint', type: 'identify' },
    { id: 4, title: 'Google', lucideIcon: 'Search', type: 'google' },
    { id: 5, title: 'Clone', lucideIcon: 'Copy', type: 'clone' },
    { id: 6, title: 'Note', lucideIcon: 'FileText', type: 'note' },
  ];

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      const data = await _GET('/group');
      console.log(data);
      setGroups(data);
    } catch (error) {
      console.error("Error fetching groups:", error);
    }
  };

  const getIconComponent = (iconName: string) => {
    const IconComponent = LucideIcons[iconName as keyof typeof LucideIcons] as React.ElementType;
    return IconComponent ? <IconComponent className="h-4 w-4 mr-2" /> : <LucideIcons.File className="h-4 w-4 mr-2" />;
  };

  const handleTabClick = (type: ContentType, id: number | null) => {
    setCurrentContent(type, id);
  };

  return (
    <aside className="w-80 bg-sidebar-primary p-2 flex flex-col justify-between">
      {/* Top */}
      <div>
        <Button
          variant="ghost"
          className="w-full justify-between hover:bg-button-hover1"
          onClick={() => {
            console.log("Create Group button clicked");
            // openGroupDrawer();
          }}
        >
          <span className="text-primary text-base">Create Group</span>
          <Plus className="h-5 w-5 text-primary" />
        </Button>
        {/* Group[App] list */}
        <div className="mt-2 pb-2 border-b border-gray-700">
        {appGroups.map((group) => (
          <Button
            key={group.id}
            variant="ghost"
            className="w-full justify-between hover:bg-button-hover1 focus:bg-primary focus:text-white mb-2 pr-2.5"
            onClick={() => handleTabClick(group.type as ContentType, null)}
          >
              <span className="text-white text-base flex items-center">
                {getIconComponent(group.lucideIcon)}
                {group.title}
              </span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                    <MoreVertical className="h-4 w-4 text-icon-primary" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Edit Group</DropdownMenuItem>
                  <DropdownMenuItem>Share Group</DropdownMenuItem>
                  <DropdownMenuItem>Export</DropdownMenuItem>
                  <DropdownMenuItem>Import</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </Button>
          ))}
        </div>
        {/* Group[User] list */}
        {groups.length > 0 && (
        <div className="mt-2">
          {groups.map((group) => (
            <Button
              key={group.id}
              variant="ghost"
              className="w-full justify-between hover:bg-button-hover1 focus:bg-primary focus:text-white mb-2 pr-2.5"
              onClick={() => handleTabClick(group.type as ContentType, group.id)}
            >
                <span className="text-white text-base flex items-center">
                  {getIconComponent(group.lucideIcon)}
                  {group.title}
                </span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                      <MoreVertical className="h-4 w-4 text-white" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Edit Group</DropdownMenuItem>
                    <DropdownMenuItem>Share Group</DropdownMenuItem>
                    {group.canDelete && <DropdownMenuItem>Delete Group</DropdownMenuItem>}
                    <DropdownMenuItem>Export</DropdownMenuItem>
                    <DropdownMenuItem>Import</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </Button>
            ))}
          </div>
        )}
      </div>
      {/* Bottom */}
      <div className="mt-auto">
        <Button variant="ghost" className="w-full justify-between hover:bg-button-hover1 text-white">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-sm bg-purple-600 flex items-center justify-center mr-2">
              K
            </div>
            <span>khanpromvn@gmail.com</span>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                <Settings className="h-4 w-4 text-white" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;