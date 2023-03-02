import Head from 'next/head'
import { Navbar } from '@/blocks/Mainframe/Navbar';
import Footer from '@/blocks/Mainframe/Footer';

const Page = () => {
    return (
        <div>
            <Head>
                <title>Supertype Collective</title>
                <meta name="description" content="Supertype Collective" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon-32x32.png" />
            </Head>
            <Navbar />
            <main className="max-w-7xl mx-auto gap-4 backdrop-blur-lg rounded drop-shadow-lg my-12 break-words bg-gradient-to-r from-amber-700 to-rose-900 mb-6 shadow-xl rounded-lg min-h-screen">
                <div className="grid grid-cols-12 items-center grid-flow gap-4 bg-black bg-opacity-30 rounded-lg px-2 sm:px-4 lg:px-8 rounded-b-none min-h-screen">
                    <div className="col-span-12 text-white">
                        <h1 className="text-4xl font-bold">Supertype Collective</h1>
                        <p className="">Supertype Collective is a community of analytics developers, data scientists & engineering leaders building products across the full stack.</p>
                        <p className="text-sm">Incubated by &nbsp;
                            <a href="https://supertype.ai/incubate" className="text-rose-200 hover:text-rose-100"
                                target="_blank" rel="noopener noreferrer">
                                Supertype
                            </a>,
                            a full cycle data science consultancy.
                        </p>
                    </div>
                </div>
            </main >
            <Footer />
        </div>
    );
}

export default Page