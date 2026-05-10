'use client';

import { DropdownMenu, DropdownMenuTrigger, DropdownMenuItem, DropdownMenuContent } from '@/components/ui/dropdown-menu';
import { Button } from '../ui/button';
import { useTheme } from 'next-themes';
import { MoonIcon, SunIcon, MonitorIcon, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ThemeSwitcherProps {
  isSidebar?: boolean;
}

const ThemeSwitcher = ({ isSidebar = false }: ThemeSwitcherProps) => {
  const { setTheme, theme } = useTheme();

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
  };

  const themeOptions = [
    { label: 'System', value: 'system', icon: <MonitorIcon className="w-5 h-5" /> },
    { label: 'Light', value: 'light', icon: <SunIcon className="w-5 h-5" /> },
    { label: 'Dark', value: 'dark', icon: <MoonIcon className="w-5 h-5" /> },
  ];

  const currentIcon = theme === 'light' ? <SunIcon className="w-5 h-5" /> : theme === 'dark' ? <MoonIcon className="w-5 h-5" /> : <MonitorIcon className="w-5 h-5" />;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size={isSidebar ? "default" : "icon"} className={isSidebar ? " w-full justify-start border-0 shadow-none bg-sidebar dark:hover:bg-sidebar-accent dark:bg-sidebar-dark group-data-[collapsible=icon]:justify-center" : ""} asChild>
          <div className={cn("flex items-center justify-between ", isSidebar ? "w-full" : "")}>
            <div className='flex items-center'>

          {currentIcon}
          {isSidebar && <span className="ml-2 group-data-[collapsible=icon]:hidden">Theme</span>}
            </div>
          {isSidebar && <ChevronsUpDown className=" group-data-[collapsible=icon]:hidden ml-auto size-4" />}
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side={isSidebar ? 'right' : 'bottom'} className={isSidebar ? 'w-full' : ''}>
        {themeOptions.map((option) => (
          <DropdownMenuItem className={isSidebar ? 'w-full' : ''} key={option.value} onClick={() => handleThemeChange(option.value)}>
            {option.icon}
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeSwitcher;
