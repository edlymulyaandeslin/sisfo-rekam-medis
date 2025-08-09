import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, Kunjungan, Pasien, Petugas, Poli } from '@/types';
import { Head, useForm } from '@inertiajs/react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Kunjungan', href: '/kunjungan' },
    { title: 'Edit', href: '/kunjungan/edit' },
];

export default function Edit({ kunjung, pasiens, polis, petugas }: { kunjung: Kunjungan; pasiens: Pasien[]; polis: Poli[]; petugas: Petugas[] }) {
    const { data, setData, processing, put, errors } = useForm({
        pasien_id: String(kunjung.pasien_id) || '',
        poli_id: String(kunjung.poli_id) || '',
        petugas_id: String(kunjung.petugas_id) || '',
        tanggal_kunjungan: kunjung.tanggal_kunjungan || '',
        keluhan_utama: kunjung.keluhan_utama || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        put(route('kunjungan.update', kunjung.id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Kunjungan" />

            <section className="w-full px-6 py-10 md:px-12 lg:px-20">
                <div className="mb-10">
                    <h1 className="text-4xl font-bold">Edit Kunjungan</h1>
                    <p className="mt-2 text-base text-muted-foreground">Ubah informasi kunjungan pada form berikut.</p>
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

                    {/* petugas_id */}
                    <div>
                        <Label htmlFor="petugas_id">Petugas / Dokter</Label>
                        <Select value={data.petugas_id} onValueChange={(value) => setData('petugas_id', value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Pilih Dokter" />
                            </SelectTrigger>
                            <SelectContent className="max-h-60 overflow-y-auto">
                                {petugas.map((ptgs) => (
                                    <SelectItem key={ptgs.id} value={String(ptgs.id)}>
                                        {ptgs.user.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.petugas_id && <p className="mt-1 text-sm text-red-500">{errors.petugas_id}</p>}
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
