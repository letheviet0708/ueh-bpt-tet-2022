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
import GiaiDoan1Check from './GiaiDoan1Check'

class Row extends Component {
    
    constructor (props) {
        super(props)

        this.state = {
            open : false,
        }
    }

    componentDidUpdate(){
      
    }

    handleCheckChange = (data) => {
      this.props.onChange(data)
    }

    render(){
        const {user, result,test} = this.props
        let activityResult = [null, null, null, null, null];
        if (user ){
            for (const x of result) if(x) { 
                activityResult[x.activityIndex] = x
            }
        }
        return(<React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
              <TableCell>
              <IconButton aria-label="expand row" size="small" onClick={() => {this.setState({open: !this.state.open})}}>
                            {this.state.open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
              </TableCell>
              <TableCell >
                <Avatar alt="Remy Sharp" src={user.avatar} /> 
              </TableCell>
              <TableCell >{user.name}</TableCell>
              <TableCell >{user.mssv}</TableCell>
              <TableCell >{user.email}</TableCell>
              <TableCell >{user.phone}</TableCell>
              <TableCell >{user.cls}</TableCell>
              <TableCell >{user.gen}</TableCell>
              <TableCell >{user.clan}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                  <Box sx={{ margin: 1 }}>
                    {this.props.customContent ? 
                      this.props.customContent
                      :
                      <Box>
                        <Typography gutterBottom >
                          Kết quả hoạt động
                        </Typography>
                        
                        {activityResult[1] &&
                          <GiaiDoan1Check onChange={this.handleCheckChange} uid={user.uid} result={activityResult[1]}/>
                        }
                      </Box>
                    }
                    

                  </Box>
                </Collapse>
              </TableCell>
            </TableRow>
          </React.Fragment>)
    }
}

export default Row