import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, Kunjungan, Petugas, RekamMedis } from '@/types';
import { Head, useForm } from '@inertiajs/react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@headlessui/react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Rekam Medis', href: '/rekam-medis' },
    { title: 'Edit', href: '/rekam-medis/edit' },
];

export default function Edit({ rekmed, kunjungan, petugas }: { rekmed: RekamMedis; kunjungan: Kunjungan[]; petugas: Petugas[] }) {
    const { data, setData, processing, put, errors } = useForm({
        kunjungan_id: String(rekmed.kunjungan_id) || '',
        petugas_id: String(rekmed.petugas_id) || '',
        tekanan_darah: rekmed.tekanan_darah || '',
        suhu: String(rekmed.suhu) || '',
        diagnosa: rekmed.diagnosa || '',
        obat: rekmed.obat || '',
        catatan: rekmed.catatan || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        put(route('rekam-medis.update', rekmed.id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Rekam Medis" />

            <section className="w-full px-6 py-10 md:px-12 lg:px-20">
                <div className="mb-10">
                    <h1 className="text-4xl font-bold">Edit Rekam Medis</h1>
                    <p className="mt-2 text-base text-muted-foreground">Ubah informasi kunjungan pada form berikut.</p>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    {/* kunjungan_id */}
                    <div>
                        <Label htmlFor="kunjungan_id">Kunjungan Pasien</Label>
                        <Select value={data.kunjungan_id} onValueChange={(value) => setData('kunjungan_id', value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Pilih Kunjungan Pasien" />
                            </SelectTrigger>
                            <SelectContent className="max-h-60 overflow-y-auto">
                                {kunjungan.map((kunjung) => (
                                    <SelectItem key={kunjung.id} value={String(kunjung.id)}>
                                        {kunjung.pasien.nama} - ({kunjung.poli.nama_poli})
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.kunjungan_id && <p className="mt-1 text-sm text-red-500">{errors.kunjungan_id}</p>}
                    </div>

                    {/* petugas_id */}
                    <div>
                        <Label htmlFor="petugas_id">Petugas / Dokter</Label>
                        <Select value={data.petugas_id} onValueChange={(value) => setData('petugas_id', value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Pilih Petugas/Dokter" />
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

                    {/* tekanan_darah */}
                    <div>
                        <Label htmlFor="tekanan_darah">Tekanan Darah</Label>
                        <Input
                            id="tekanan_darah"
                            value={data.tekanan_darah}
                            onChange={(e) => setData('tekanan_darah', e.target.value)}
                            placeholder="ex: 140/90"
                        />
                        {errors.tekanan_darah && <p className="mt-1 text-sm text-red-500">{errors.tekanan_darah}</p>}
                    </div>

                    {/* suhu */}
                    <div>
                        <Label htmlFor="suhu">Suhu</Label>
                        <Input id="suhu" type="number" value={data.suhu} onChange={(e) => setData('suhu', e.target.value)} placeholder="ex: 36.4" />
                        {errors.suhu && <p className="mt-1 text-sm text-red-500">{errors.suhu}</p>}
                    </div>

                    {/* diagnosa */}
                    <div>
                        <Label htmlFor="diagnosa">Diagnosa</Label>
                        <Textarea
                            className="w-full rounded-lg border p-2"
                            id="diagnosa"
                            value={data.diagnosa}
                            onChange={(e) => setData('diagnosa', e.target.value)}
                            placeholder="Diagnosa"
                        />
                        {errors.diagnosa && <p className="mt-1 text-sm text-red-500">{errors.diagnosa}</p>}
                    </div>

                    {/* obat */}
                    <div>
                        <Label htmlFor="obat">Obat</Label>
                        <Textarea
                            className="w-full rounded-lg border p-2"
                            id="obat"
                            value={data.obat}
                            onChange={(e) => setData('obat', e.target.value)}
                            placeholder="Obat"
                        />
                        {errors.obat && <p className="mt-1 text-sm text-red-500">{errors.obat}</p>}
                    </div>

                    {/* catatan */}
                    <div>
                        <Label htmlFor="catatan">Catatan</Label>
                        <Textarea
                            className="w-full rounded-lg border p-2"
                            id="catatan"
                            value={data.catatan}
                            onChange={(e) => setData('catatan', e.target.value)}
                            placeholder="catatan"
                        />
                        {errors.catatan && <p className="mt-1 text-sm text-red-500">{errors.catatan}</p>}
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
