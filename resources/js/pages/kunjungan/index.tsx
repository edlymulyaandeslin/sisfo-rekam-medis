import DataTable from '@/components/data-table';
import Modal from '@/components/modal';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { PaginatedData, type BreadcrumbItem, type Kunjungan } from '@/types';
import { formatDateToHumanReadable, formatDateToHumanReadableWithoutTime } from '@/utils';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Kunjungan',
        href: '/kunjungan',
    },
];

export default function Index({ kunjungan }: { kunjungan: PaginatedData<Kunjungan> }) {
    const { props } = usePage<{ kunjungan: PaginatedData<Kunjungan>; search?: string }>();
    const initialSearch = props.search || '';
    const [search, setSearch] = useState(initialSearch);
    const [selectedKunjungan, setSelectedKunjungan] = useState<Kunjungan | null>(null);
    const [openDetailModal, setOpenDetailModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    // Debounce search
    useEffect(() => {
        if (search !== initialSearch) {
            const delayDebounce = setTimeout(() => {
                router.get('/kunjungan', { search }, { preserveState: true, replace: true });
            }, 400);

            return () => clearTimeout(delayDebounce);
        }
    }, [search, initialSearch]);

    const handleDelete = () => {
        if (!selectedKunjungan) return;

        router.delete(`/kunjungan/${selectedKunjungan.id}`, {
            onSuccess: () => {
                setOpenDeleteModal(false);
                setSelectedKunjungan(null);
            },
            onError: (err) => {
                console.error('Gagal hapus kunjungan:', err);
                alert('Gagal menghapus kunjungan. Coba lagi.');
            },
        });
    };

    const handlePrint = (kunjung: Kunjungan) => {
        const printContent = `
            <html>
            <head>
                <title>Cetak Kunjungan</title>
                <style>
                    @page {
                        size: A4;
                        margin: 2.54cm;
                    }
                    body {
                        font-family: 'Times New Roman', serif;
                        line-height: 1.6;
                        color: #000;
                    }
                    .header {
                        text-align: center;
                        border-bottom: 2px solid #000;
                        padding-bottom: 10px;
                        margin-bottom: 20px;
                    }
                    .header h2 {
                        margin: 0;
                        font-size: 20px;
                        font-weight: bold;
                    }
                    .header p {
                        margin: 0;
                        font-size: 14px;
                    }
                    .title {
                        text-align: center;
                        margin-bottom: 20px;
                        text-transform: uppercase;
                        font-weight: bold;
                        font-size: 16px;
                        text-decoration: underline;
                    }
                    table {
                        width: 100%;
                        border-collapse: collapse;
                        margin-bottom: 30px;
                    }
                    td {
                        padding: 6px 8px;
                        vertical-align: top;
                    }
                    .footer {
                        margin-top: 40px;
                        text-align: right;
                        font-size: 14px;
                    }
                    .signature {
                        margin-top: 60px;
                        text-align: right;
                    }
                </style>
            </head>
            <body>
                <div class="header">
                    <h2>PUSKESMAS RAMBAH</h2>
                    <p>Jl. Contoh No. 123, Pasir Pengaraian, Rokan Hulu, Riau</p>
                    <p>Telp: (022) 123-4567</p>
                </div>

                <div class="title">Surat Keterangan Kunjungan</div>

                <table>
                    <tr>
                        <td style="width: 35%;">Nomor Kunjungan</td>
                        <td>: ${kunjung.id}</td>
                    </tr>
                    <tr>
                        <td>Nama Pasien</td>
                        <td>: ${kunjung.pasien.nama}</td>
                    </tr>
                    <tr>
                        <td>Poli</td>
                        <td>: ${kunjung.poli.nama_poli}</td>
                    </tr>
                    <tr>
                        <td>Tanggal Kunjungan</td>
                        <td>: ${formatDateToHumanReadableWithoutTime(kunjung.tanggal_kunjungan)}</td>
                    </tr>
                    <tr>
                        <td>Keluhan Utama</td>
                        <td>: ${kunjung.keluhan_utama}</td>
                    </tr>
                </table>

                <p>Demikian surat keterangan ini dibuat untuk digunakan sebagaimana mestinya.</p>

                <div class="footer">
                    Pasir Pengaraian, ${new Date().toLocaleDateString('id-ID')}
                </div>

                <div class="signature">
                    ___________________________<br>
                    ${kunjung.petugas.user.name}
                </div>

                <script>
                    window.onload = function() {
                        window.print();
                        window.onafterprint = function() { window.close(); }
                    }
                </script>
            </body>
            </html>
            `;

        const printWindow = window.open('', '_blank');
        if (printWindow) {
            printWindow.document.write(printContent);
            printWindow.document.close();
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Data Kunjungan" />

            <div className="flex flex-col gap-6 p-4">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <h2 className="text-2xl font-bold tracking-tight">Data Kunjungan</h2>
                    <Link
                        href="/kunjungan/create"
                        className="inline-flex h-9 items-center rounded-md bg-blue-600 px-4 text-sm font-medium text-white shadow transition-colors hover:bg-blue-700"
                    >
                        + Tambah Kunjungan
                    </Link>
                </div>

                <input
                    type="text"
                    placeholder="Cari kunjungan..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                />

                <DataTable
                    data={kunjungan.data}
                    from={kunjungan.from}
                    to={kunjungan.to}
                    total={kunjungan.total}
                    links={kunjungan.links}
                    columns={[
                        {
                            title: '#',
                            render: (_, index) => <span className="text-sm">{index}</span>,
                        },
                        {
                            title: 'Nama Pasien',
                            render: (kunjung) => <span className="text-sm font-medium">{kunjung.pasien.nama}</span>,
                        },
                        {
                            title: 'Poli',
                            render: (kunjung) => <span className="text-sm font-medium capitalize">{kunjung.poli.nama_poli}</span>,
                        },
                        {
                            title: 'Tanggal Kunjungan',
                            render: (kunjung) => (
                                <span className="text-sm font-medium capitalize">
                                    {formatDateToHumanReadableWithoutTime(kunjung.tanggal_kunjungan)}
                                </span>
                            ),
                        },
                        {
                            title: 'Keluhan Utama',
                            render: (kunjung) => <span className="line-clamp-1 text-sm font-medium capitalize">{kunjung.keluhan_utama}</span>,
                        },
                        {
                            title: 'Aksi',
                            className: 'text-right',
                            render: (kunjung) => (
                                <div className="flex justify-end gap-2">
                                    <button
                                        onClick={() => handlePrint(kunjung)}
                                        className="inline-flex cursor-pointer items-center rounded-md bg-green-100 px-3 py-1 text-xs font-medium text-green-700 hover:bg-green-200 dark:bg-green-900 dark:text-green-300 dark:hover:bg-green-800"
                                    >
                                        Cetak
                                    </button>

                                    <button
                                        onClick={() => {
                                            setSelectedKunjungan(kunjung);
                                            setOpenDetailModal(true);
                                        }}
                                        className="inline-flex cursor-pointer items-center rounded-md bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-800"
                                    >
                                        Lihat
                                    </button>
                                    <Link
                                        href={`/kunjungan/${kunjung.id}/edit`}
                                        className="inline-flex items-center rounded-md bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-300 dark:hover:bg-yellow-800"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => {
                                            setSelectedKunjungan(kunjung);
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

            {/* Modal Detail Kunjungan (baru diimplementasikan dari UserIndex) */}
            <Modal isOpen={openDetailModal} onClose={() => setOpenDetailModal(false)} title="Detail Kunjungan" size="lg">
                {selectedKunjungan && (
                    <div className="space-y-6 rounded-lg bg-white py-6 text-sm text-gray-700 dark:bg-zinc-900 dark:text-gray-200">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="flex flex-col">
                                <span className="text-xs text-gray-500 dark:text-gray-400">Nama Pasien</span>
                                <span className="text-base font-semibold">{selectedKunjungan.pasien.nama}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs text-gray-500 dark:text-gray-400">Poli</span>
                                <span className="text-base font-semibold">{selectedKunjungan.poli.nama_poli}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs text-gray-500 dark:text-gray-400">Tanggal Kunjungan</span>
                                <span className="text-base font-semibold">
                                    {formatDateToHumanReadableWithoutTime(selectedKunjungan.tanggal_kunjungan)}
                                </span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs text-gray-500 dark:text-gray-400">Keluhan Utama</span>
                                <span className="text-base font-semibold">{selectedKunjungan.keluhan_utama}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs text-gray-500 dark:text-gray-400">Petugas / Dokter</span>
                                <span className="text-base font-semibold">{selectedKunjungan.petugas.user.name}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs text-gray-500 dark:text-gray-400">Dibuat Pada</span>
                                <span className="text-base">
                                    {selectedKunjungan.created_at ? formatDateToHumanReadable(selectedKunjungan.created_at) : 'N/A'}
                                </span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs text-gray-500 dark:text-gray-400">Diperbarui Pada</span>
                                <span className="text-base">
                                    {selectedKunjungan.updated_at ? formatDateToHumanReadable(selectedKunjungan.updated_at) : 'N/A'}
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
                Apakah Anda yakin ingin menghapus kunjungan{' '}
                <strong className="text-red-600 dark:text-red-400">{selectedKunjungan?.pasien.nama}</strong>? Tindakan ini tidak dapat dibatalkan.
            </Modal>
        </AppLayout>
    );
}
