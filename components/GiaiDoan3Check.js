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
import Chip from '@mui/material/Chip';
import ColorRadioButtons from './Radio'
import LinearProgress from '@mui/material/LinearProgress';
import personService from '../Services/person.service';
import Link from 'next/link'

class GiaiDoan3Check extends Component {
    
    constructor (props) {
        super(props)

        this.state = {
            open : false,
            state:  1
        }
    }

    handleChange = (e, value) =>{
      this.setState({state: value})
      const data = {id: (this.props.result._id) ? this.props.result._id: this.props.result.id
        , state: value}
      console.log(data)
      personService.updateResult(this.props.uid, data)
      .then(response => {
        //console.log(response)
        this.props.onChange({user: response.data.person, result:response.data.result})
      })
      .catch(e=> {
          console.log(e);
      });
    }

    componentDidMount(){
      this.setState({state: this.props.result.state})
    }

    render(){
        let chipText;
        let chipColor;
        switch(this.props.result.state){
          case 0:
            chipText = "Đợi duyệt"
            chipColor = "warning"
            break
          case 1:
            chipText = "Không hợp lệ"
            chipColor = "error"
            break
          case 2:
            chipText = "Đã duyệt"
            chipColor = "success"
            break
        }
        return(<React.Fragment>
            <Box sx={{ '& > *': { borderBottom: 'unset' }, display: "flex" }}>
                <IconButton aria-label="expand row" size="small" onClick={() => {this.setState({open: !this.state.open})}}>
                            {this.state.open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
                <Box sx={{display: "flex" ,
                  flexGrow: 1,
                  justifyContent: "space-between"}}>
                  <Typography sx={{ marginTop: "auto", fontWeight: "bold"}} gutterBottom >Giai Đoạn 3</Typography>
                  <Chip color={chipColor} label={chipText} />
                </Box>
            </Box>
            <TableRow>
              <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                  <Box sx={{ margin: 1}}>                   
                    <Box >
                      <Box sx={{ml:"10px"}}>
                        <Typography sx={{m:"5px"}}><Link href={this.props.result.text[0]}><a target="_blank">{this.props.result.text[0]}</a></Link></Typography>
                      </Box>
                      <ColorRadioButtons value={this.state.state} onChange={this.handleChange} />
                    </Box>

                  </Box>
                </Collapse>
              </TableCell>
            </TableRow>
          </React.Fragment>)
    }
}

export default GiaiDoan3Check