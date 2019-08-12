/**
 * @file (index)
 * Created by Xinyi on 2019-08-07
 */

require('dotenv').config();
import {Box, ResponsiveContext, Calendar, Button} from 'grommet';
import {FingerPrint} from 'grommet-icons';
import fetch from 'isomorphic-unfetch';

const Index = props => (
    <ResponsiveContext.Consumer>
        {(size)=> (
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
                        <Button icon={<FingerPrint size="30px" color="brand"/>} hoverIndicator onClick={() => {}} />
                    </Box>
                </Box>
            </Box>
        )}
    </ResponsiveContext.Consumer>
);

Index.getInitialProps = async function(ctx) {
    const target = process.env.AUTH;
    if (!target) {
        // Todo: redirect
    }

    const res = await fetch(process.env.AUTH, {
        headers: {
            'Cookie': ctx.req.headers.cookie
        }
    });

    if (res.status !== 200) {
        const result = res.text();
        return {
            status: result,
            user: null
        }
    }

    return {
        status: '',
        user: await res.json()
    };
};

export default Index;
