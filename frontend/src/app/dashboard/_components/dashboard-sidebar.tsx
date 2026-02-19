'use client';
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
import { BrainCircuit, Activity, ChevronRight, HeartPulse, History, LayoutDashboard, LogOut, Terminal } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation";

const navItems = [
    { icon: LayoutDashboard, label: 'Overview',  link:'dashboard' },
    { icon: BrainCircuit, label: 'Diabetes Predictor',  link:'diabetes' },
    { icon: HeartPulse, label: 'Cardiac Analytics', link:'heart' },
    { icon: Activity, label: 'Stroke Scoring',link:'stroke'},
    { icon: History, label: 'Patient History',  link:'history' },
    // { icon: Terminal, label: 'API Monitoring', link:'api' },
]

export const DashboardSidebar = () => {

    const searchParams = usePathname()
    const n = searchParams.split('/').length
    const activeComp = searchParams.split('/')[n-1]
    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            size="lg"
                            tooltip="PULSE AI"
                            className="group-data-[collapsible=icon]:justify-center"
                        >
                            <div className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center text-primary-foreground font-black  shrink-0">
                                P
                            </div>
                            <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                                <span className="font-black tracking-tighter leading-none">PULSE AI</span>
                                <span className="text-[10px] font-bold text-muted-foreground uppercase mt-0.5">Enterprise v4.2</span>
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
                    <Separator />


            <SidebarContent className="p-2">
                <SidebarMenu>
                    {navItems.map((item) => (
                        <SidebarMenuItem key={item.label}>
                            <SidebarMenuButton
                                size="lg"
                                isActive={activeComp === item.link}
                                tooltip={item.label}
                                className="rounded-full group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0"
                                asChild>
                                <Link href={item.link == 'dashboard'? '/dashboard' : `/dashboard/~/${item.link}`} >
                                    <item.icon className="w-5 h-5 shrink-0" />
                                    <span className="group-data-[collapsible=icon]:hidden text-[14px] font-semibold">
                                        {item.label}
                                    </span>
                                    {activeComp === item.link && (
                                        <ChevronRight className="ml-auto h-4 w-4 group-data-[collapsible=icon]:hidden" />
                                    )}
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>
                    <Separator />
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            size="lg"
                            tooltip="Logout"
                            className="rounded-full text-destructive hover:bg-destructive/5 hover:text-destructive group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0"
                        >
                            <LogOut className="w-5 h-5 text-destructive shrink-0" />
                            <span className="group-data-[collapsible=icon]:hidden text-[14px] font-semibold">
                                Logout
                            </span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}