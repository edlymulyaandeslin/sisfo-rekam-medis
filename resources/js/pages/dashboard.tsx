import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Dashboard', href: '/dashboard' }];

export default function Dashboard({
    jumlah_pasien,
    jumlah_kunjungan,
    jumlah_rekammedis,
    grafik_kunjungan,
}: {
    jumlah_pasien: number;
    jumlah_kunjungan: number;
    jumlah_rekammedis: number;
    grafik_kunjungan: { tanggal: string; jumlah: number }[];
}) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard Rekam Medis" />

            <div className="flex flex-col gap-6 p-4">
                {/* Statistik Cepat */}
                <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                        <CardHeader>
                            <CardTitle>Total Pasien</CardTitle>
                        </CardHeader>
                        <CardContent className="text-3xl font-bold">{jumlah_pasien}</CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Kunjungan Hari Ini</CardTitle>
                        </CardHeader>
                        <CardContent className="text-3xl font-bold">{jumlah_kunjungan}</CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Diagnosa Hari Ini</CardTitle>
                        </CardHeader>
                        <CardContent className="text-3xl font-bold">{jumlah_rekammedis}</CardContent>
                    </Card>
                </div>

                {/* Grafik */}
                <Card>
                    <CardHeader>
                        <CardTitle>Grafik Kunjungan 7 Hari Terakhir</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={grafik_kunjungan}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="tanggal" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="jumlah" fill="#4f46e5" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
