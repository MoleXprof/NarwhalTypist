import Head from 'next/head'
import Link from "next/link";

const Error = () => {
    return (
        <div>
            <Head>
                <title>
                    404 | NarwhalTypist
                </title>
                <meta name="title" content="404 | NarwhalTypist" />
                <meta
                name="description"
                content="Page not found"
                />
                <link rel="shortcut icon" href="/images/narwhal.jpg" />
            </Head>
             <div className="flex min-h-screen flex-col bg-sky-150 pt-16 pb-12">
                <main className="mx-auto flex w-full max-w-7xl flex-grow flex-col justify-center px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <p className="text-sm font-semibold uppercase tracking-wide text-sky-200">
                            {"404 error"}
                        </p>
                        <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl text-sky-300">
                            {"Page not found."}
                        </h1>
                        <p className="mt-4 mb-2 text-sm font-semibold uppercase tracking-wide text-sky-200">
                            {"You typed something wrong!"}
                        </p>
                        <Link href="/" passHref>
                            <span className="hyperlink text-base font-medium">
                                {"Back to typing"} <span aria-hidden="true"> &rarr;</span>
                            </span>
                        </Link>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Error;