import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, Poli } from '@/types';
import { Head, useForm } from '@inertiajs/react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Poli', href: '/poli' },
    { title: 'Edit', href: '/poli/edit' },
];

export default function Edit({ poli }: { poli: Poli }) {
    const { data, setData, processing, put, errors } = useForm({
        nama_poli: poli.nama_poli || '',
        deskripsi: poli.deskripsi || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        put(route('poli.update', poli.id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Poli" />

            <section className="w-full px-6 py-10 md:px-12 lg:px-20">
                <div className="mb-10">
                    <h1 className="text-4xl font-bold">Edit Poli</h1>
                    <p className="mt-2 text-base text-muted-foreground">Ubah informasi poli pada form berikut.</p>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    {/* nama_poli */}
                    <div>
                        <Label htmlFor="nama_poli">Nama Poli</Label>
                        <Input id="nama_poli" value={data.nama_poli} onChange={(e) => setData('nama_poli', e.target.value)} placeholder="Nama Poli" />
                        {errors.nama_poli && <p className="mt-1 text-sm text-red-500">{errors.nama_poli}</p>}
                    </div>

                    {/* deskripsi */}
                    <div>
                        <Label htmlFor="deskripsi">Deskripsi</Label>
                        <Input id="deskripsi" value={data.deskripsi} onChange={(e) => setData('deskripsi', e.target.value)} placeholder="Deskripsi" />
                        {errors.deskripsi && <p className="mt-1 text-sm text-red-500">{errors.deskripsi}</p>}
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
