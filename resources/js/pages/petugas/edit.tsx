import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, Petugas } from '@/types';
import { Head, useForm } from '@inertiajs/react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Petugas', href: '/petugas' },
    { title: 'Edit', href: '/petugas/edit' },
];

export default function Edit({ ptgs }: { ptgs: Petugas }) {
    const { data, setData, processing, put, errors } = useForm({
        nip: ptgs.nip || '',
        jabatan: ptgs.jabatan || '',
        no_hp: ptgs.no_hp || '',
        alamat: ptgs.alamat || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        put(route('petugas.update', ptgs.id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Petugas" />

            <section className="w-full px-6 py-10 md:px-12 lg:px-20">
                <div className="mb-10">
                    <h1 className="text-4xl font-bold">Edit Petugas</h1>
                    <p className="mt-2 text-base text-muted-foreground">Ubah informasi petugas pada form berikut.</p>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    {/* User */}
                    <div>
                        <Label htmlFor="user">User</Label>
                        <Input id="user" value={ptgs.user.name} disabled />
                    </div>

                    {/* nip */}
                    <div>
                        <Label htmlFor="nip">NIP</Label>
                        <Input id="nip" value={data.nip} onChange={(e) => setData('nip', e.target.value)} placeholder="nip" />
                        {errors.nip && <p className="mt-1 text-sm text-red-500">{errors.nip}</p>}
                    </div>

                    {/* jabatan */}
                    <div>
                        <Label htmlFor="jabatan">Jabatan</Label>
                        <Input id="jabatan" value={data.jabatan} onChange={(e) => setData('jabatan', e.target.value)} placeholder="Jabatan" />
                        {errors.jabatan && <p className="mt-1 text-sm text-red-500">{errors.jabatan}</p>}
                    </div>

                    {/* no_hp */}
                    <div>
                        <Label htmlFor="no_hp">No HP</Label>
                        <Input id="no_hp" value={data.no_hp} onChange={(e) => setData('no_hp', e.target.value)} placeholder="No HP" />
                        {errors.no_hp && <p className="mt-1 text-sm text-red-500">{errors.no_hp}</p>}
                    </div>

                    {/* alamat */}
                    <div>
                        <Label htmlFor="alamat">Alamat</Label>
                        <Input id="alamat" value={data.alamat} onChange={(e) => setData('alamat', e.target.value)} placeholder="Alamat" />
                        {errors.alamat && <p className="mt-1 text-sm text-red-500">{errors.alamat}</p>}
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
