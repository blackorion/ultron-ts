import React from 'react';
import Head from 'next/head';
import {MainLayout} from "../components/MainLayout";

function Home() {
    return (
        <React.Fragment>
            <Head>
                <title>Ultron</title>
            </Head>

            <MainLayout/>
        </React.Fragment>
    );
}

export default Home;

