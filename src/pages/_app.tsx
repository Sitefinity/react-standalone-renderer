import 'bootstrap/dist/css/bootstrap.css';
import '@progress/kendo-theme-default/dist/all.css';
import '../index.css';

import Head from "next/head";

import type { AppProps } from 'next/app'

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <Component {...pageProps} />
        </>
    )
}
