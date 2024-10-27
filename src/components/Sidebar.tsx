import React, { useState, useEffect } from 'react';
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

interface Group {
  id: number;
  userId: number;
  title: string;
  lucideIcon: string;
  canDelete: boolean;
  isFavorite: boolean;
  createdAt: string;
  updatedAt: string;
}

const Sidebar: React.FC = () => {
  const [groups, setGroups] = useState<Group[]>([]);

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      const data = await _GET('/group');
      setGroups(data);
    } catch (error) {
      console.error("Error fetching groups:", error);
    }
  };

  const getIconComponent = (iconName: string) => {
    const IconComponent = LucideIcons[iconName as keyof typeof LucideIcons] as React.ElementType;
    return IconComponent ? <IconComponent className="h-4 w-4 mr-2" /> : <LucideIcons.File className="h-4 w-4 mr-2" />;
  };

  return (
    <aside className="w-80 bg-sidebar-primary p-2 flex flex-col justify-between">
      {/* Top */}
      <div>
        <Button variant="ghost" className="w-full justify-between hover:bg-button-hover1">
          <span className="text-primary text-base">Create Group</span>
          <Plus className="h-5 w-5 text-primary" />
        </Button>
        {/* Group list */}
        <div className="mt-2">
          {groups.map((group) => (
            <Button
              key={group.id}
              variant="ghost"
              className="w-full justify-between hover:bg-button-hover1 focus:bg-primary focus:text-white mb-2 pr-2.5"
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