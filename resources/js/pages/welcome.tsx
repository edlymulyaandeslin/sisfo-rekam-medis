import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Activity, ClipboardList, Stethoscope } from 'lucide-react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Rekam Medis Digital">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>

            {/* Navbar */}
            <header className="w-full border-b border-gray-200 bg-white px-6 py-4 dark:border-gray-700 dark:bg-gray-900">
                <div className="mx-auto flex max-w-6xl items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Stethoscope className="h-6 w-6 text-blue-600" />
                        <span className="text-lg font-bold text-gray-900 dark:text-white">Rekam Medis</span>
                    </div>
                    <nav>
                        {auth.user ? (
                            <Link href={route('dashboard')} className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                                Dashboard
                            </Link>
                        ) : (
                            <Link
                                href={route('login')}
                                className="rounded-md border border-gray-300 px-4 py-2 text-gray-800 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800"
                            >
                                Log in
                            </Link>
                        )}
                    </nav>
                </div>
            </header>

            {/* Hero Section */}
            <main className="flex min-h-[80vh] items-center justify-center bg-gray-50 px-6 dark:bg-gray-950">
                <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 md:grid-cols-2">
                    {/* Text Content */}
                    <div>
                        <h1 className="mb-4 text-4xl leading-tight font-extrabold text-gray-900 md:text-5xl dark:text-white">
                            Sistem Rekam Medis Digital Modern
                        </h1>
                        <p className="mb-6 text-lg text-gray-600 dark:text-gray-300">
                            Kelola data pasien, kunjungan, dan riwayat medis secara cepat, aman, dan terintegrasi.
                        </p>
                        {auth.user ? (
                            <Link href={route('dashboard')} className="rounded-md bg-blue-600 px-6 py-3 text-white hover:bg-blue-700">
                                Masuk ke Dashboard
                            </Link>
                        ) : (
                            <Link href={route('login')} className="rounded-md bg-blue-600 px-6 py-3 text-white hover:bg-blue-700">
                                Masuk Sekarang
                            </Link>
                        )}
                    </div>

                    {/* Illustration */}
                    <div className="flex justify-center">
                        <div className="grid grid-cols-3 gap-4">
                            <div className="flex flex-col items-center rounded-lg bg-white p-6 shadow dark:bg-gray-900">
                                <Activity className="mb-2 h-8 w-8 text-blue-600" />
                                <span className="text-gray-700 dark:text-gray-300">Monitoring</span>
                            </div>
                            <div className="flex flex-col items-center rounded-lg bg-white p-6 shadow dark:bg-gray-900">
                                <ClipboardList className="mb-2 h-8 w-8 text-green-600" />
                                <span className="text-gray-700 dark:text-gray-300">Riwayat</span>
                            </div>
                            <div className="flex flex-col items-center rounded-lg bg-white p-6 shadow dark:bg-gray-900">
                                <Stethoscope className="mb-2 h-8 w-8 text-red-600" />
                                <span className="text-gray-700 dark:text-gray-300">Pemeriksaan</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
