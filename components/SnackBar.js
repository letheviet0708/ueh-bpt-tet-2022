import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import MuiAlert from '@mui/material/Alert';
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} {...props} />;
});

class CTSnackbar extends React.Component{

    constructor(props){
        super(props)
    } 

    render(){
        const action = (
            <React.Fragment>
              <Button color="secondary" size="small" onClick={this.props.handleClose}>
                UNDO
              </Button>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={this.props.handleClose}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </React.Fragment>
        );
        return (
            <div>
              <Snackbar
                open={this.props.open}
                autoHideDuration={3000}
                onClose={this.props.handleClose}
                
              >
                <Alert onClose={this.props.handleClose} severity={this.props.severity} sx={{ width: '100%' }}>
                    {this.props.message}
                </Alert>
              </Snackbar>
            </div>
        );
    }
}

export default CTSnackbar