import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { Activity, Boxes, LayoutGrid, SquareMousePointer, UserPlus2, UserRoundCog, Users } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: { label: string; items: NavItem[] }[] = [
    {
        label: 'General',
        items: [
            {
                title: 'Dashboard',
                href: '/dashboard',
                icon: LayoutGrid,
            },
        ],
    },
    {
        label: 'Master Data',
        items: [
            {
                title: 'Pasien',
                href: '/pasiens',
                icon: UserPlus2,
            },
            {
                title: 'Petugas',
                href: '/petugas',
                icon: Users,
            },
            {
                title: 'Poli',
                href: '/poli',
                icon: Boxes,
            },
        ],
    },
    {
        label: 'Main Features',
        items: [
            {
                title: 'Kunjungan',
                href: '/kunjungan',
                icon: SquareMousePointer,
            },
            {
                title: 'Rekam Medis',
                href: '/rekam-medis',
                icon: Activity,
            },
        ],
    },
    {
        label: 'User Management',
        items: [
            {
                title: 'User',
                href: '/users',
                icon: UserRoundCog,
            },
        ],
    },
];

const footerNavItems: NavItem[] = [
    // {
    //     title: 'Repository',
    //     href: 'https://github.com/laravel/react-starter-kit',
    //     icon: Folder,
    // },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
