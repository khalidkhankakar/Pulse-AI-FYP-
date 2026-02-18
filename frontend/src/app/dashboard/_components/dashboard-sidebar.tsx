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

const navItems = [
    { icon: LayoutDashboard, label: 'Overview', active: true },
    { icon: BrainCircuit, label: 'Diabetes Predictor', active: false },
    { icon: HeartPulse, label: 'Cardiac Analytics', active: false },
    { icon: Activity, label: 'Stroke Scoring', active: false },
    { icon: History, label: 'Patient History', active: false },
    { icon: Terminal, label: 'API Monitoring', active: false },
]

export const DashboardSidebar = () => {
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
                            <div className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center text-primary-foreground font-black shadow-lg shadow-primary/20 shrink-0">
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

            <SidebarContent className="p-2">
                <SidebarMenu>
                    {navItems.map((item) => (
                        <SidebarMenuItem key={item.label}>
                            <SidebarMenuButton
                                size="lg"
                                isActive={item.active}
                                tooltip={item.label}
                                className="rounded-full group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0"
                            >
                                <item.icon className="w-5 h-5 shrink-0" />
                                <span className="group-data-[collapsible=icon]:hidden text-[14px] font-semibold">
                                    {item.label}
                                </span>
                                {item.active && (
                                    <ChevronRight className="ml-auto h-4 w-4 group-data-[collapsible=icon]:hidden" />
                                )}
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>

            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            size="lg"
                            tooltip="Logout"
                            className="rounded-full group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0"
                        >
                            <LogOut className="w-5 h-5 shrink-0" />
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