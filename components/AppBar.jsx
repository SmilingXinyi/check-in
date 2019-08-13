/**
 * @file (AppBar)
 * Created by Xinyi on 2019-08-14.
 */


import React from 'react'
import {Box} from 'grommet'

export default props => {
    return (
        <Box tag="header"
             direction="row"
             align='center'
             justify='between'
             pad={{ left: 'medium', right: 'small', vertical: 'small' }}
             {...props}
        />
    )
}
