import DataTable from '@/components/data-table';
import Modal from '@/components/modal';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { PaginatedData, type BreadcrumbItem, type Pasien } from '@/types';
import { formatDateToHumanReadable, formatDateToHumanReadableWithoutTime } from '@/utils';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Pasiens',
        href: '/pasiens',
    },
];

export default function Index({ pasiens }: { pasiens: PaginatedData<Pasien> }) {
    const { props } = usePage<{ pasiens: PaginatedData<Pasien>; search?: string }>();
    const initialSearch = props.search || '';
    const [search, setSearch] = useState(initialSearch);
    const [selectedPasien, setSelectedPasien] = useState<Pasien | null>(null);
    const [openDetailModal, setOpenDetailModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    // Debounce search
    useEffect(() => {
        if (search !== initialSearch) {
            const delayDebounce = setTimeout(() => {
                router.get('/pasiens', { search }, { preserveState: true, replace: true });
            }, 400);

            return () => clearTimeout(delayDebounce);
        }
    }, [search, initialSearch]);

    const handleDelete = () => {
        if (!selectedPasien) return;

        router.delete(`/pasiens/${selectedPasien.id}`, {
            onSuccess: () => {
                setOpenDeleteModal(false);
                setSelectedPasien(null);
            },
            onError: (err) => {
                console.error('Gagal hapus pasien:', err);
                alert('Gagal menghapus pasien. Coba lagi.');
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Data Pasien" />

            <div className="flex flex-col gap-6 p-4">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <h2 className="text-2xl font-bold tracking-tight">Data Pasien</h2>
                    <Link
                        href="/pasiens/create"
                        className="inline-flex h-9 items-center rounded-md bg-blue-600 px-4 text-sm font-medium text-white shadow transition-colors hover:bg-blue-700"
                    >
                        + Tambah Pasien
                    </Link>
                </div>

                <input
                    type="text"
                    placeholder="Cari pasien..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                />

                <DataTable
                    data={pasiens.data}
                    from={pasiens.from}
                    to={pasiens.to}
                    total={pasiens.total}
                    links={pasiens.links}
                    columns={[
                        {
                            title: '#',
                            render: (_, index) => <span className="text-sm">{index}</span>,
                        },
                        {
                            title: 'NIK',
                            render: (pasien) => <span className="text-sm font-medium">{pasien.nik}</span>,
                        },
                        {
                            title: 'Nama',
                            render: (pasien) => <span className="text-sm font-medium capitalize">{pasien.nama}</span>,
                        },
                        {
                            title: 'Jenis Kelamin',
                            render: (pasien) => <span className="text-sm font-medium">{pasien.jenis_kelamin}</span>,
                        },
                        {
                            title: 'Tempat Lahir',
                            render: (pasien) => <span className="text-sm font-medium">{pasien.tempat_lahir}</span>,
                        },
                        {
                            title: 'Aksi',
                            className: 'text-right',
                            render: (pasien) => (
                                <div className="flex justify-end gap-2">
                                    <button
                                        onClick={() => {
                                            setSelectedPasien(pasien);
                                            setOpenDetailModal(true);
                                        }}
                                        className="inline-flex cursor-pointer items-center rounded-md bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-800"
                                    >
                                        Lihat
                                    </button>
                                    <Link
                                        href={`/pasiens/${pasien.id}/edit`}
                                        className="inline-flex items-center rounded-md bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-300 dark:hover:bg-yellow-800"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => {
                                            setSelectedPasien(pasien);
                                            setOpenDeleteModal(true);
                                        }}
                                        className="inline-flex cursor-pointer items-center rounded-md bg-red-100 px-3 py-1 text-xs font-medium text-red-700 hover:bg-red-200 dark:bg-red-900 dark:text-red-300 dark:hover:bg-red-800"
                                    >
                                        Hapus
                                    </button>
                                </div>
                            ),
                        },
                    ]}
                />
            </div>

            {/* Modal Detail Pasien (baru diimplementasikan dari UserIndex) */}
            <Modal isOpen={openDetailModal} onClose={() => setOpenDetailModal(false)} title="Detail Pasien" size="lg">
                {selectedPasien && (
                    <div className="space-y-6 rounded-lg bg-white py-6 text-sm text-gray-700 dark:bg-zinc-900 dark:text-gray-200">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="flex flex-col">
                                <span className="text-xs text-gray-500 dark:text-gray-400">NIK</span>
                                <span className="text-base font-semibold">{selectedPasien.nik}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs text-gray-500 dark:text-gray-400">Nama</span>
                                <span className="text-base font-semibold">{selectedPasien.nama}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs text-gray-500 dark:text-gray-400">Tempat Lahir</span>
                                <span className="text-base font-semibold">{selectedPasien.tempat_lahir}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs text-gray-500 dark:text-gray-400">Tanggal Lahir</span>
                                <span className="text-base font-semibold">{formatDateToHumanReadableWithoutTime(selectedPasien.tanggal_lahir)}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs text-gray-500 dark:text-gray-400">Jenis Kelamin</span>
                                <span className="text-base font-semibold">{selectedPasien.jenis_kelamin}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs text-gray-500 dark:text-gray-400">Alamat</span>
                                <span className="text-base font-semibold">{selectedPasien.alamat}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs text-gray-500 dark:text-gray-400">No Handphone</span>
                                <span className="text-base font-semibold">{selectedPasien.no_hp}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs text-gray-500 dark:text-gray-400">Gol Darah</span>
                                <span className="text-base font-semibold">{selectedPasien.gol_darah}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs text-gray-500 dark:text-gray-400">Dibuat Pada</span>
                                <span className="text-base">
                                    {selectedPasien.created_at ? formatDateToHumanReadable(selectedPasien.created_at) : 'N/A'}
                                </span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs text-gray-500 dark:text-gray-400">Diperbarui Pada</span>
                                <span className="text-base">
                                    {selectedPasien.updated_at ? formatDateToHumanReadable(selectedPasien.updated_at) : 'N/A'}
                                </span>
                            </div>
                        </div>

                        <div className="flex justify-end gap-2">
                            <Button type="button" variant={'secondary'} onClick={() => setOpenDetailModal(false)} className="cursor-pointer">
                                Tutup
                            </Button>
                        </div>
                    </div>
                )}
            </Modal>

            {/* Modal Konfirmasi Hapus */}
            <Modal
                isOpen={openDeleteModal}
                onClose={() => setOpenDeleteModal(false)}
                title="Konfirmasi Hapus"
                size="sm"
                footer={
                    <div className="flex justify-end gap-2">
                        <Button onClick={() => setOpenDeleteModal(false)} variant="secondary">
                            Batal
                        </Button>
                        <Button onClick={handleDelete} className="bg-red-700 hover:bg-red-800">
                            Hapus
                        </Button>
                    </div>
                }
            >
                Apakah Anda yakin ingin menghapus pasien <strong className="text-red-600 dark:text-red-400">{selectedPasien?.nama}</strong>? Tindakan
                ini tidak dapat dibatalkan.
            </Modal>
        </AppLayout>
    );
}
