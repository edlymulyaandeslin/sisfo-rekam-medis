import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, Pasien, Poli } from '@/types';
import { Head, useForm } from '@inertiajs/react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Kunjungan', href: '/kunjungan' },
    { title: 'Create', href: '/kunjungan/create' },
];

export default function Create({ pasiens, polis }: { pasiens: Pasien[]; polis: Poli[] }) {
    const { data, setData, post, processing, errors } = useForm({
        pasien_id: '',
        poli_id: '',
        tanggal_kunjungan: '',
        keluhan_utama: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/kunjungan');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Kunjungan" />

            <section className="w-full px-6 py-10 md:px-12 lg:px-20">
                <div className="mb-10">
                    <h1 className="text-4xl font-bold">Tambah Kunjungan</h1>
                    <p className="mt-2 text-base text-muted-foreground">Masukkan informasi kunjungan baru pada form berikut.</p>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    {/* pasien_id */}
                    <div>
                        <Label htmlFor="pasien_id">Pasien</Label>
                        <Select value={data.pasien_id} onValueChange={(value) => setData('pasien_id', value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Pilih Pasien" />
                            </SelectTrigger>
                            <SelectContent className="max-h-60 overflow-y-auto">
                                {pasiens.map((pasien) => (
                                    <SelectItem key={pasien.id} value={String(pasien.id)}>
                                        {pasien.nama}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.pasien_id && <p className="mt-1 text-sm text-red-500">{errors.pasien_id}</p>}
                    </div>

                    {/* poli_id */}
                    <div>
                        <Label htmlFor="poli_id">Poli</Label>
                        <Select value={data.poli_id} onValueChange={(value) => setData('poli_id', value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Pilih Poli" />
                            </SelectTrigger>
                            <SelectContent className="max-h-60 overflow-y-auto">
                                {polis.map((poli) => (
                                    <SelectItem key={poli.id} value={String(poli.id)}>
                                        {poli.nama_poli}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.poli_id && <p className="mt-1 text-sm text-red-500">{errors.poli_id}</p>}
                    </div>

                    {/* tanggal_kunjungan */}
                    <div>
                        <Label htmlFor="tanggal_kunjungan">Tanggal Kunjungan</Label>
                        <Input
                            id="tanggal_kunjungan"
                            type="date"
                            value={data.tanggal_kunjungan}
                            className="border-gray-400 bg-gray-900"
                            onChange={(e) => setData('tanggal_kunjungan', e.target.value)}
                        />
                        {errors.tanggal_kunjungan && <p className="mt-1 text-sm text-red-500">{errors.tanggal_kunjungan}</p>}
                    </div>

                    {/* keluhan_utama */}
                    <div>
                        <Label htmlFor="keluhan_utama">Keluhan Utama</Label>
                        <Input id="keluhan_utama" value={data.keluhan_utama} onChange={(e) => setData('keluhan_utama', e.target.value)} />
                        {errors.keluhan_utama && <p className="mt-1 text-sm text-red-500">{errors.keluhan_utama}</p>}
                    </div>

                    {/* Tombol Submit */}
                    <div className="mt-4 flex justify-end md:col-span-2">
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Menyimpan...' : 'Simpan'}
                        </Button>
                    </div>
                </form>
            </section>
        </AppLayout>
    );
}
