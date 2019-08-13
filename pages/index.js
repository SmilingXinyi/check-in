/**
 * @file (index)
 * Created by Xinyi on 2019-08-07
 */

import {Box, ResponsiveContext, Calendar, Button} from 'grommet';
import {FingerPrint} from 'grommet-icons';
import fetch from 'isomorphic-unfetch';

const Status = {
    LOADED: 'loaded',
    LOADING: 'loading',
    ERROR: 'error',
    REDIRECT: 'redirect'
};

/*
 state:
    - status
    - message
    - history - list
    - user - user info
 */

const Index = props => (
    <ResponsiveContext.Consumer>
        {(size) => (
            <Box
                fill
                direction="column"
                background="brand"
                style={{
                    position: 'relative'
                }}
            >
                <Box background="primary"
                     fill
                     justify="center"
                     align="center"
                     style={{
                         position: 'absolute',
                         height: '150px',
                         bottom: 0
                     }}
                >
                    <Box width="60px"
                         height="60px"
                         round="full"
                         overflow="hidden"
                         justify="center"
                         align="center"
                         background="normal">
                        <Button icon={
                            <FingerPrint
                                size="30px"
                                color="brand"/>
                        }
                                hoverIndicator
                                onClick={() => {

                                }}
                        />
                    </Box>
                </Box>
            </Box>
        )}
    </ResponsiveContext.Consumer>
)

Index.getInitialProps = async function (ctx) {
    const target = process.env.AUTH;
    if (!target) {
        return {
            status: Status.ERROR,
            message: 'Server configuration error!'
        };
    }

    const res = await fetch(process.env.AUTH, {
        headers: {
            'Cookie': ctx.req.headers.cookie
        }
    });


    if (res.status !== 200) {
        if (res.status === 204) {
            const location = res.headers.get('location')
            return {
                status: Status.REDIRECT,
                message: location
            }
        }

        const result = await res.text();
        return {
            status: Status.REDIRECT,
            message: result
        };
    }

    return {
        status: Status.LOADED,
        user: await res.json()
    };
};

export default Index;
