import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Pasiens', href: '/pasiens' },
    { title: 'Create', href: '/pasiens/create' },
];

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        nik: '',
        nama: '',
        tempat_lahir: '',
        tanggal_lahir: '',
        jenis_kelamin: '',
        alamat: '',
        no_hp: '',
        gol_darah: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post('/pasiens');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Pasien" />

            <section className="w-full px-6 py-10 md:px-12 lg:px-20">
                <div className="mb-10">
                    <h1 className="text-4xl font-bold">Tambah Pasien</h1>
                    <p className="mt-2 text-base text-muted-foreground">Masukkan informasi pasien baru pada form berikut.</p>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    {/* Nik */}
                    <div>
                        <Label htmlFor="nik">NIK</Label>
                        <Input id="nik" value={data.nik} onChange={(e) => setData('nik', e.target.value)} placeholder="NIK" />
                        {errors.nik && <p className="mt-1 text-sm text-red-500">{errors.nik}</p>}
                    </div>

                    {/* nama */}
                    <div>
                        <Label htmlFor="nama">Nama</Label>
                        <Input id="nama" value={data.nama} onChange={(e) => setData('nama', e.target.value)} placeholder="Nama" />
                        {errors.nama && <p className="mt-1 text-sm text-red-500">{errors.nama}</p>}
                    </div>

                    {/* tempat_lahir */}
                    <div>
                        <Label htmlFor="tempat_lahir">Tempat Lahir</Label>
                        <Input
                            id="tempat_lahir"
                            value={data.tempat_lahir}
                            onChange={(e) => setData('tempat_lahir', e.target.value)}
                            placeholder="Tempat Lahir"
                        />
                        {errors.tempat_lahir && <p className="mt-1 text-sm text-red-500">{errors.tempat_lahir}</p>}
                    </div>

                    {/* tanggal_lahir */}
                    <div>
                        <Label htmlFor="tanggal_lahir">Tanggal Lahir</Label>
                        <Input
                            id="tanggal_lahir"
                            type="date"
                            value={data.tanggal_lahir}
                            onChange={(e) => setData('tanggal_lahir', e.target.value)}
                            className="border-gray-700 bg-gray-800"
                        />
                        {errors.tanggal_lahir && <p className="mt-1 text-sm text-red-500">{errors.tanggal_lahir}</p>}
                    </div>

                    {/* Jenis Kelamin */}
                    <div>
                        <Label htmlFor="jenis_kelamin">Jenis Kelamin</Label>
                        <Select value={data.jenis_kelamin} onValueChange={(value) => setData('jenis_kelamin', value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Pilih Jenis Kelamin" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value={'L'}>Laki Laki</SelectItem>
                                <SelectItem value={'P'}>Perempuan</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.jenis_kelamin && <p className="mt-1 text-sm text-red-500">{errors.jenis_kelamin}</p>}
                    </div>

                    {/* alamat */}
                    <div>
                        <Label htmlFor="alamat">Alamat</Label>
                        <Input id="alamat" value={data.alamat} onChange={(e) => setData('alamat', e.target.value)} placeholder="Alamat" />
                        {errors.alamat && <p className="mt-1 text-sm text-red-500">{errors.alamat}</p>}
                    </div>

                    {/* no_hp */}
                    <div>
                        <Label htmlFor="no_hp">No HP</Label>
                        <Input id="no_hp" value={data.no_hp} onChange={(e) => setData('no_hp', e.target.value)} placeholder="No HP" />
                        {errors.no_hp && <p className="mt-1 text-sm text-red-500">{errors.no_hp}</p>}
                    </div>

                    {/* gol_darah */}
                    <div>
                        <Label htmlFor="gol_darah">Gol Darah</Label>
                        <Input id="gol_darah" value={data.gol_darah} onChange={(e) => setData('gol_darah', e.target.value)} placeholder="Gol Darah" />
                        {errors.gol_darah && <p className="mt-1 text-sm text-red-500">{errors.gol_darah}</p>}
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
