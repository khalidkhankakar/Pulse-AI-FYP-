'use client';
import ThemeSwitcher from "@/components/shared/theme-switcher";
import { Separator } from "@/components/ui/separator";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils";
import { BrainCircuit, Activity, ChevronRight, HeartPulse, History, LayoutDashboard } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation";
import { NavUser } from "./nav-user";

const navItems = [
    { icon: LayoutDashboard, label: 'Overview',  link:'dashboard' },
    { icon: BrainCircuit, label: 'Diabetes Predictor',  link:'diabetes' },
    { icon: HeartPulse, label: 'Cardiac Analytics', link:'heart' },
    { icon: Activity, label: 'Stroke Scoring',link:'stroke'},
    { icon: ChevronRight, label: 'Liver Analytics',link:'liver'},
    { icon: History, label: 'Patient History',  link:'history' },
]

export const DashboardSidebar = () => {
    const searchParams = usePathname()
    const n = searchParams.split('/').length
    const activeComp = searchParams.split('/')[n-1]

    return (
        <Sidebar collapsible="icon" className="border-r border-border bg-sidebar">
            <SidebarHeader  >
                <SidebarMenu >
                    <SidebarMenuItem >
                        <div className="group">
                            <SidebarMenuButton
                                size="lg"
                                tooltip="PULSE AI"
                                className="relative hover:bg-sidebar-accent transition-all duration-200"
                                asChild
                            >
                                <div>
                                    
                                    <div className=" flex gap-3 items-center group-data-[collapsible=icon]:justify-center ">
                                        <div className="h-10 w-10 bg-primary rounded-xl flex items-center justify-center  font-black group-data-[collapsible=icon]:pr-2  uppercase">
                                            <HeartPulse size={20} />
                                        </div>
                                        <div className="grid flex-1 text-left leading-tight group-data-[collapsible=icon]:hidden">
                                            <span className="font-bold tracking-tight text-sm text-foreground uppercase">PULSE AI</span>
                                            <span className="text-[10px] font-medium text-muted-foreground uppercase mt-0.5 tracking-wider">Version v1.2</span>
                                        </div>
                                    </div>
                                </div>
                            </SidebarMenuButton>
                        </div>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <Separator className="bg-border/50" />

            <SidebarContent className="p-2">
                <SidebarMenu className="gap-2">
                    <div className="px-4 py-2 text-[10px] font-semibold text-muted-foreground uppercase tracking-widest group-data-[collapsible=icon]:hidden">
                        Main Diagnostics
                    </div>
                    {navItems.map((item) => (
                        <SidebarMenuItem key={item.label}>
                            <SidebarMenuButton
                                size="lg"
                                isActive={activeComp === item.link}
                                tooltip={item.label}
                                className={cn(
                                    "rounded-xl transition-all duration-200 group-data-[collapsible=icon]:justify-center",
                                    activeComp === item.link 
                                        ? "bg-primary/10! text-muted-foreground! shadow-md shadow-primary/10" 
                                        : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground"
                                )}
                                asChild
                            >
                                <Link href={item.link === 'dashboard' ? '/dashboard' : `/dashboard/~/${item.link}`} className="flex items-center gap-3">
                                    <item.icon className={cn("w-5 h-5 shrink-0 transition-transform", activeComp === item.link ? "text-primary" : "group-hover:scale-110")} />
                                    <span className="group-data-[collapsible=icon]:hidden text-sm font-medium">
                                        {item.label}
                                    </span>
                                    {activeComp === item.link && (
                                        <ChevronRight className="ml-auto h-4 w-4 group-data-[collapsible=icon]:hidden opacity-70" />
                                    )}
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>

            <Separator className="bg-border/50" />

            <SidebarFooter className=" gap-2">
                <SidebarMenu className="gap-2">
                    <SidebarMenuItem>
                        <ThemeSwitcher isSidebar={true} />
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <NavUser />
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}