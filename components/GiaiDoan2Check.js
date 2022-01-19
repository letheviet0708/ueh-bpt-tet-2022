import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {Component} from 'react'
import Avatar from '@mui/material/Avatar';

class CollapseRow extends Component {
    
    constructor (props) {
        super(props)

        this.state = {
            open : false,
        }
    }

    render(){
        return(<React.Fragment>
            <Box sx={{ '& > *': { borderBottom: 'unset' }, display: "flex" }}>
                <IconButton aria-label="expand row" size="small" onClick={() => {this.setState({open: !this.state.open})}}>
                            {this.state.open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
                {this.props.content}
            </Box>
            <TableRow>
              <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                  <Box sx={{ margin: 1}}>
                    {this.props.children}
                  </Box>
                </Collapse>
              </TableCell>
            </TableRow>
          </React.Fragment>)
    }
}

export default CollapseRow