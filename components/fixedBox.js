import { Component } from "react";

import Box from '@mui/material/Box';

class FixedBox extends Component{
    constructor (props){
        super(props)
    }

    render () {
        return (<>
            <Box
                sx={{
                    backgroundColor: this.props.backgroundColor ? this.props.backgroundColor : '',
                    width: this.props.width,
                    paddingTop: this.props.height,
                    position: "relative"
                }}
            >
                <Box
                    sx={{
                        position: "absolute",
                        top: 0, 
                        left: 0,
                        width: "100%",
                        height: "100%",
                    }}
                >
                    {this.props.children}
                </Box>
            </Box>
        </>)
    }
}

export default FixedBox 