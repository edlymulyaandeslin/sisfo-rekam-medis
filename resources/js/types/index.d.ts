import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

export type PaginatedData<T> = {
    current_page: number;
    data: T[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: PaginationLink[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
};

export interface Pasien {
    id: number;
    nik: string;
    nama: string;
    tempat_lahir: string;
    tanggal_lahir: string;
    jenis_kelamin: string;
    alamat: string;
    no_hp: string;
    gol_darah: string;
    status_perkawinan: string;
    created_at: string;
    updated_at: string;
}

export interface Petugas {
    id: number;
    user_id: number;
    nip: string;
    jabatan: string;
    no_hp: string;
    alamat: string;
    user: User;
    created_at: string;
    updated_at: string;
}

export interface Poli {
    id: number;
    nama_poli: string;
    deskripsi: string;
    created_at: string;
    updated_at: string;
}

export interface Kunjungan {
    id: number;
    pasien_id: number;
    poli_id: number;
    tanggal_kunjungan: string;
    keluhan_utama: string;
    pasien: Pasien;
    poli: Poli;
    created_at: string;
    updated_at: string;
}

export interface RekamMedis {
    id: number;
    kunjungan_id: number;
    petugas_id: number;
    tekanan_darah: string;
    suhu: float;
    diagnosa: string;
    obat: string;
    catatan: string;
    kunjungan: Kunjungan;
    petugas: Petugas;
    created_at: string;
    updated_at: string;
}
