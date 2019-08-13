/**
 * @file (index)
 * Created by Xinyi on 2019-08-07
 */

import {useState} from 'react';
import {Box, ResponsiveContext, Text, Button, Clock, Collapsible, Layer} from 'grommet'
import {FingerPrint, Alert, Login, StatusCritical as Error, Menu, FormClose} from 'grommet-icons'
import fetch from 'isomorphic-unfetch'

import 'animate.css'

import AppBar from '../components/AppBar';

const Status = {
    LOADED: 'loaded',
    LOADING: 'loading',
    ERROR: 'error',
    REDIRECT: 'redirect'
}

/*
 state:
    - status
    - message
    - history - list
    - user - user info
 */

const Index = props => {
    const {data} = props

    const [showSidebar, setShowSidebar] = useState(false)

    return (
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
                    {
                        showSidebar && (
                            <Layer onEsc={e => setShowSidebar(false)}
                                   onClickOutside={e => setShowSidebar(false)}
                                   position="left"
                                   margin={{
                                       right: '50px',
                                       left: '50px'
                                   }}
                                   full
                            >
                                <Box flex
                                     width='medium'
                                     background='light-2'
                                     elevation='small'
                                     align='end'
                                     justify='center'
                                >
                                    <Button icon={<FormClose />}
                                            onClick={e => setShowSidebar(false)}
                                    />
                                    sidebar
                                </Box>
                            </Layer>
                        )
                    }
                    {
                        data.status !== Status.LOADED && (
                            <Box height="50px"
                                 direction="row"
                                 background="secondary"
                                 className="animated fadeInDown"
                                 pad="medium"
                                 align="center"
                                 onClick={e => {

                                 }}
                            >
                                {
                                    data.status === Status.ERROR && (
                                        <Error size="20px"
                                               color="status-warning"/>
                                    )
                                }
                                {
                                    data.status === Status.REDIRECT && (
                                        <Alert size="20px"
                                               color="status-warning"/>
                                    )
                                }
                                <Text color="dark-2"
                                      margin="xsmall"
                                      size="small"
                                >
                                    {data.message}
                                </Text>
                            </Box>
                        )
                    }
                    <Box flex>
                        <AppBar>
                            <Button icon={<Menu color="normal" size="18px"/>}
                                    focusIndicator={false}
                                    primary
                                    color="transparent"
                                    plain
                                    onClick={e => setShowSidebar(true)}
                            />
                            <Clock type="digital" />
                        </AppBar>
                    </Box>
                    {
                        data.status === Status.REDIRECT && (
                            <Box pad="medium"
                                 justify="center"
                                 align="center"
                                 height="100px"
                            >
                                <Button
                                    focusIndicator={false}
                                    color="normal"
                                    primary
                                    icon={<Login/>}
                                    label="Login"
                                    href={data.messageTar}
                                    style={{
                                        width: '50%'
                                    }}
                                />
                            </Box>
                        )
                    }
                    <Box background="primary"
                         justify="center"
                         align="center"
                         fill
                         style={{
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
                                    disabled={data.status !== Status.LOADED}
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
}


Index.getInitialProps = async function (ctx) {
    const target = process.env.AUTH
    if (!target) {
        return {
            data: {
                status: Status.ERROR,
                message: 'Server configuration error'
            }
        }
    }

    const res = await fetch(process.env.AUTH, {
        headers: {
            'Cookie': ctx.req.headers.cookie
        }
    })

    if (res.status !== 200) {
        if (res.status === 204) {
            const location = res.headers.get('location')
            return {
                data: {
                    status: Status.REDIRECT,
                    message: 'Click the \'Login\' button to log in',
                    messageTar: location
                }
            }
        }

        const result = await res.text()
        return {
            data: {
                status: Status.ERROR,
                message: result
            }
        }
    }

    return {
        data: {
            status: Status.LOADED,
            user: await res.json()
        }
    }
}

export default Index
