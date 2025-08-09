import DataTable from '@/components/data-table';
import Modal from '@/components/modal';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { PaginatedData, type BreadcrumbItem, type RekamMedis } from '@/types';
import { formatDateToHumanReadable } from '@/utils';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Rekam Medis',
        href: '/rekam-medis',
    },
];

export default function Index({ rekammedis }: { rekammedis: PaginatedData<RekamMedis> }) {
    const { props } = usePage<{ rekammedis: PaginatedData<RekamMedis>; search?: string }>();
    const initialSearch = props.search || '';
    const [search, setSearch] = useState(initialSearch);
    const [selectedRekamMedis, setSelectedRekamMedis] = useState<RekamMedis | null>(null);
    const [openDetailModal, setOpenDetailModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    // Debounce search
    useEffect(() => {
        if (search !== initialSearch) {
            const delayDebounce = setTimeout(() => {
                router.get('/rekam-medis', { search }, { preserveState: true, replace: true });
            }, 400);

            return () => clearTimeout(delayDebounce);
        }
    }, [search, initialSearch]);

    const handleDelete = () => {
        if (!selectedRekamMedis) return;

        router.delete(`/rekam-medis/${selectedRekamMedis.id}`, {
            onSuccess: () => {
                setOpenDeleteModal(false);
                setSelectedRekamMedis(null);
            },
            onError: (err) => {
                console.error('Gagal hapus rekam medis:', err);
                alert('Gagal menghapus rekam medis. Coba lagi.');
            },
        });
    };

    const handlePrint = (rkm: RekamMedis) => {
        const printWindow = window.open('', '_blank');
        if (printWindow) {
            printWindow.document.write(`
        <html>
            <head>
                <title>Surat Rekam Medis</title>
                <style>
                    body {
                        font-family: 'Times New Roman', serif;
                        padding: 40px 60px;
                        background-color: #fff;
                        color: #000;
                        line-height: 1.6;
                        font-size: 12pt;
                    }
                    .kop-surat {
                        display: flex;
                        align-items: center;
                        border-bottom: 3px solid #000;
                        padding-bottom: 10px;
                        margin-bottom: 20px;
                    }
                    .kop-logo {
                        width: 80px;
                        height: 80px;
                        margin-right: 15px;
                    }
                    .kop-teks {
                        flex: 1;
                        text-align: center;
                    }
                    .kop-teks h2 {
                        margin: 0;
                        font-size: 18pt;
                        text-transform: uppercase;
                    }
                    .kop-teks p {
                        margin: 2px 0;
                        font-size: 10pt;
                    }
                    .nomor-surat {
                        margin-bottom: 20px;
                        font-size: 11pt;
                    }
                    .tanggal {
                        text-align: right;
                        margin-bottom: 20px;
                    }
                    .isi {
                        text-align: justify;
                        margin-top: 10px;
                    }
                    .data-pasien {
                        margin: 15px 0;
                        padding: 10px;
                        border: 1px solid #000;
                        background: #f9f9f9;
                        font-size: 11pt;
                    }
                    .data-pasien div {
                        margin: 4px 0;
                    }
                    .ttd {
                        margin-top: 50px;
                        text-align: right;
                    }
                    .ttd .nama {
                        margin-top: 80px;
                        font-weight: bold;
                        text-decoration: underline;
                    }
                </style>
            </head>
            <body>
                <div class="kop-surat">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Medical_icon.svg/120px-Medical_icon.svg.png"
                         alt="Logo Klinik" class="kop-logo">
                    <div class="kop-teks">
                        <h2>PUSKESMAS RAMBAH</h2>
                        <p>Jl. Contoh No.123, Pasir Pengaraian, Rokan Hulu, Riau</p>
                        <p>Telp: (022) 12345678 | Email: info@puskesmasrambah.com</p>
                        <p><strong>SURAT REKAM MEDIS</strong></p>
                    </div>
                </div>

                <div class="nomor-surat">
                    Nomor: RM-${new Date().getFullYear()}/${String(rkm.kunjungan.id).padStart(4, '0')}
                </div>

                <div class="tanggal">
                    Pasir Pengaraian, ${new Date().toLocaleDateString('id-ID')}
                </div>

                <div class="isi">
                    Kepada Yth,<br>
                    <strong>Bapak/Ibu Terkait</strong><br><br>

                    Dengan hormat,<br>
                    Bersama ini kami sampaikan informasi rekam medis pasien sebagai berikut:
                </div>

                <div class="data-pasien">
                    <div>Nama Pasien: <strong>${rkm.kunjungan.pasien.nama}</strong></div>
                    <div>Poli: <strong>${rkm.kunjungan.poli.nama_poli}</strong></div>
                    <div>Petugas/Dokter: <strong>${rkm.kunjungan.petugas.user.name}</strong></div>
                </div>

                <div class="isi">
                    Keluhan utama yang disampaikan pasien adalah: <em>${rkm.kunjungan.keluhan_utama}</em>.<br>
                    Berdasarkan pemeriksaan yang dilakukan, pasien didiagnosa dengan: <em>${rkm.diagnosa}</em>.<br>
                    Adapun obat yang diberikan: <em>${rkm.obat}</em>.<br>
                    Catatan tambahan: ${rkm.catatan}.<br><br>

                    Demikian surat rekam medis ini kami buat untuk dapat digunakan sebagaimana mestinya.
                </div>

                <div class="ttd">
                    Hormat kami,<br>
                    <strong>Dokter/Petugas</strong>
                    <div class="nama">${rkm.kunjungan.petugas.user.name}</div>
                </div>

                <script>
                    window.print();
                    window.onafterprint = function() { window.close(); }
                </script>
            </body>
        </html>
    `);
            printWindow.document.close();
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Data Rekam Medis" />

            <div className="flex flex-col gap-6 p-4">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <h2 className="text-2xl font-bold tracking-tight">Data Rekam Medis</h2>
                    <Link
                        href="/rekam-medis/create"
                        className="inline-flex h-9 items-center rounded-md bg-blue-600 px-4 text-sm font-medium text-white shadow transition-colors hover:bg-blue-700"
                    >
                        + Tambah Rekam Medis
                    </Link>
                </div>

                <input
                    type="text"
                    placeholder="Cari by nama pasien / dokter..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                />

                <DataTable
                    data={rekammedis.data}
                    from={rekammedis.from}
                    to={rekammedis.to}
                    total={rekammedis.total}
                    links={rekammedis.links}
                    columns={[
                        {
                            title: '#',
                            render: (_, index) => <span className="text-sm">{index}</span>,
                        },
                        {
                            title: 'Nama Pasien',
                            render: (rkm) => <span className="text-sm font-medium">{rkm.kunjungan.pasien.nama}</span>,
                        },
                        {
                            title: 'Petugas / Dokter',
                            render: (rkm) => <span className="text-sm font-medium capitalize">{rkm.kunjungan.petugas.user.name}</span>,
                        },
                        {
                            title: 'Keluhan Utama',
                            render: (rkm) => <span className="line-clamp-1 text-sm font-medium capitalize">{rkm.kunjungan.keluhan_utama}</span>,
                        },
                        {
                            title: 'Diagnosa',
                            render: (rkm) => <span className="line-clamp-1 text-sm font-medium capitalize">{rkm.diagnosa}</span>,
                        },
                        {
                            title: 'Aksi',
                            className: 'text-right',
                            render: (rkm) => (
                                <div className="flex justify-end gap-2">
                                    <button
                                        onClick={() => handlePrint(rkm)}
                                        className="inline-flex cursor-pointer items-center rounded-md bg-green-100 px-3 py-1 text-xs font-medium text-green-700 hover:bg-green-200 dark:bg-green-900 dark:text-green-300 dark:hover:bg-green-800"
                                    >
                                        Cetak
                                    </button>
                                    <button
                                        onClick={() => {
                                            setSelectedRekamMedis(rkm);
                                            setOpenDetailModal(true);
                                        }}
                                        className="inline-flex cursor-pointer items-center rounded-md bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-800"
                                    >
                                        Lihat
                                    </button>
                                    <Link
                                        href={`/rekam-medis/${rkm.id}/edit`}
                                        className="inline-flex items-center rounded-md bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-300 dark:hover:bg-yellow-800"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => {
                                            setSelectedRekamMedis(rkm);
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

            {/* Modal Detail RekamMedis (baru diimplementasikan dari UserIndex) */}
            <Modal isOpen={openDetailModal} onClose={() => setOpenDetailModal(false)} title="Detail Rekam Medis" size="lg">
                {selectedRekamMedis && (
                    <div className="space-y-6 rounded-lg bg-white py-6 text-sm text-gray-700 dark:bg-zinc-900 dark:text-gray-200">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="flex flex-col">
                                <span className="text-xs text-gray-500 dark:text-gray-400">Nama Pasien</span>
                                <span className="text-base font-semibold">{selectedRekamMedis.kunjungan.pasien.nama}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs text-gray-500 dark:text-gray-400">Poli</span>
                                <span className="text-base font-semibold">{selectedRekamMedis.kunjungan.poli.nama_poli}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs text-gray-500 dark:text-gray-400">Petugas / Dokter</span>
                                <span className="text-base font-semibold">{selectedRekamMedis.kunjungan.petugas.user.name}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs text-gray-500 dark:text-gray-400">Keluhan Utama</span>
                                <span className="text-base font-semibold">{selectedRekamMedis.kunjungan.keluhan_utama}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs text-gray-500 dark:text-gray-400">Diagnosa</span>
                                <span className="text-base font-semibold">{selectedRekamMedis.diagnosa}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs text-gray-500 dark:text-gray-400">Obat</span>
                                <span className="text-base font-semibold">{selectedRekamMedis.obat}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs text-gray-500 dark:text-gray-400">Catatan</span>
                                <span className="text-base font-semibold">{selectedRekamMedis.catatan}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs text-gray-500 dark:text-gray-400">Dibuat Pada</span>
                                <span className="text-base">
                                    {selectedRekamMedis.created_at ? formatDateToHumanReadable(selectedRekamMedis.created_at) : 'N/A'}
                                </span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs text-gray-500 dark:text-gray-400">Diperbarui Pada</span>
                                <span className="text-base">
                                    {selectedRekamMedis.updated_at ? formatDateToHumanReadable(selectedRekamMedis.updated_at) : 'N/A'}
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
                Apakah Anda yakin ingin menghapus rekam medis pasien{' '}
                <strong className="text-red-600 dark:text-red-400">{selectedRekamMedis?.kunjungan.pasien.nama}</strong>? Tindakan ini tidak dapat
                dibatalkan.
            </Modal>
        </AppLayout>
    );
}
