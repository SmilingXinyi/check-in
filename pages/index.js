/**
 * @file (index)
 * Created by Xinyi on 2019-08-07
 */

import {Box, ResponsiveContext, Calendar, Button} from 'grommet';
import {Add} from 'grommet-icons';

export default () => (
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
                        <Button icon={<Add size="30px" color="brand"/>} hoverIndicator onClick={() => {}} />
                    </Box>
                </Box>
            </Box>
        )}
    </ResponsiveContext.Consumer>
);
