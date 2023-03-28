import React from 'react';
import type {AppProps} from 'next/app';
import '../styles/globals.css';
import {CommandsProvider} from "../components/CommandsProvider";

function MyApp({Component, pageProps}: AppProps) {
    return (
        <CommandsProvider>
            <Component {...pageProps} />
        </CommandsProvider>
    );
}

export default MyApp
