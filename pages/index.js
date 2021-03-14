import Head from 'next/head';

export default function Home() {
    return (
        <div className="container">
            <Head>
                <title>Next App with Prisma</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="flex flex-col">
                <h1 className="text-4xl text-center">This is Next.js with Prisma Project</h1>
            </main>
        </div>
    );
}
