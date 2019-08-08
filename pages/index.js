/**
 * @file (index)
 * Created by Xinyi on 2019-08-07
 */

import {Box, ResponsiveContext, Calendar, Button} from 'grommet';
import {Add} from 'grommet-icons';

const AppBar = props => (
    <Box
        tag="header"
        direction="row"
        align="end"
        background="brand"
        pad={{left: 'medium', right: 'small', vertical: 'small'}}
        elevation="medium"
        style={{zIndex: '1'}}
        {...props}
    />
);

export default () => (
    <ResponsiveContext.Consumer>
        {(size)=> (
            <React.Fragment>
                <AppBar>
                    <p>Hi</p>
                </AppBar>
                <Box
                    // fill
                    direction="column"
                >
                    <Box
                        align="center"
                        background="light-2"
                        pad={{
                            top: 'large',
                            bottom: 'large'
                        }}
                    >
                        <Calendar
                            size="medium"
                            date={(new Date()).toISOString()}
                            onSelect={(date) => {
                            }}
                            locale="zh-CN"
                        />
                    </Box>
                    <Box background="light-4">
                        <Box overflow="hidden">
                            <Button primary
                                    size="medium"
                                    label="签到"
                            />
                        </Box>
                    </Box>
                </Box>
            </React.Fragment>
        )}
    </ResponsiveContext.Consumer>
);
