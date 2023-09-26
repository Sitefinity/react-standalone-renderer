import React from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import '@progress/kendo-theme-default/dist/all.css';
import '@/app/cms/index.css';
import '@/app/css/global.css';

import StructureHeader from './components/StructureHeader/StructureHeader';
import StructureSubHeader from './components/StructureSubHeader/StructureSubHeader';
import StructureSubFooter from './components/StructureSubFooter/StructureSubFooter';
import StructureFooter from './components/StructureFooter/StructureFooter';

import {GetAllArgs} from '@/app/cms/sdk/services/get-all-args';
import {RestService} from '@/app/cms/sdk/rest-service';
import {ServiceMetadata} from '@/app/cms/sdk/service-metadata';

export const metadata = {
    title: 'React Standalone Renderer',
    description: 'RSR',
};

export async function generateStaticParams() {
    const getAllArgs: GetAllArgs = {
        Skip: 0,
        Take: 50,
        Count: true,
        Fields: ['ViewUrl', 'Renderer'],
        Type: 'Telerik.Sitefinity.Pages.Model.PageNode',
    };

    await ServiceMetadata.fetch();

    const filteredItems = [];

    while (true) {
        let items = await RestService.getItems(getAllArgs);
        let response = items.Items;
        if (response.length === 0) {
            break;
        }

        let filtered = response.filter((x) => x['Renderer'] == 'React').map((x) => x['ViewUrl']);
        if (filtered.length > 0) {
            filteredItems.push(...filtered);
        }

        getAllArgs.Skip = (getAllArgs.Skip as number) + (getAllArgs.Take as number);
    }

    return filteredItems.map((slug) => {
        return {
            params: {
                slug: slug.split('/').splice(1),
            },
        };
    });
}

const RootLayout = ({children, Component, pageProps}: {children: React.ReactNode; Component: any; pageProps: any}) => {
    return (
        <html lang="en">
            <body id="root">
                {/* Client Side Rendered */}
                <StructureHeader></StructureHeader>
                <StructureSubHeader></StructureSubHeader>

                {/* Mixed Rendering */}
                <main>
                    <h1>Main</h1>
                    <p className="developer">
                        The `main` is where the CMS-editable content resides, and is <em>mostly</em> Client Side
                        Rendered components (a requirement of Chakra).
                    </p>
                    <pre className="developer">children</pre>
                    {children}
                    <pre className="developer">component</pre>
                    {Component}
                    <pre className="developer">pageProps</pre>
                    {pageProps}
                </main>

                {/* Client Side Rendered */}
                <StructureSubFooter></StructureSubFooter>
                <StructureFooter></StructureFooter>
            </body>
        </html>
    );
};

export default RootLayout;
