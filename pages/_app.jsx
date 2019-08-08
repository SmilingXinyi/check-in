/**
 * @file (_app)
 * Created by baidu on 2019-08-07
 */

import React from 'react';
import App, {Container} from 'next/app';
import 'normalize.css';
import {Grommet} from 'grommet';
import Head from 'next/head';

import theme from '../libs/theme';

export default class extends App {
    // Only uncomment this method if you have blocking data requirements for
    // every single page in your application. This disables the ability to
    // perform automatic static optimization, causing every page in your app to
    // be server-side rendered.
    //
    // static async getInitialProps({ Component, ctx }) {
    //   let pageProps = {}
    //
    //   if (Component.getInitialProps) {
    //     pageProps = await Component.getInitialProps(ctx)
    //   }
    //
    //   return { pageProps }
    // }

    render() {
        const {Component, pageProps} = this.props;

        return (
            <Container>
                <Head>
                    <title>My page title</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                </Head>
                <Grommet theme={theme}>
                    <Component {...pageProps} />
                </Grommet>
            </Container>
        );
    }
}
