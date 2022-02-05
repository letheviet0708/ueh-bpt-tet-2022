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
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

const titles = ["Giao Thừa","Mùng 1","Mùng 2","Mùng 3"]

class GiaiDoan4Check extends Component {
    
    constructor (props) {
        super(props)

        this.state = {
            open : false,
            state:  1,
            currentI: 0,
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

    handleNav = (i) =>{
        let value = this.state.currentI + i
        if (value < 0) {
            console.log("<0")
            value = titles.length-1
        }
        if (value > titles.length-1) {
            value = 0
        }
        this.setState({ currentI: value })
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

        let imgLink = this.props.result.images.slice()
        for (const i in imgLink){
            const arr = this.props.result.images[i].split('.')
            imgLink[i] =  arr[0]+'.'+arr[1]+'.'+arr[2]+'l.'+arr[3]
        }
        return(<React.Fragment>
            <Box>
            <Box sx={{ '& > *': { borderBottom: 'unset' }, display: "flex" }}>
                <IconButton aria-label="expand row" size="small" onClick={() => {this.setState({open: !this.state.open})}}>
                            {this.state.open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
                <Box sx={{display: "flex" ,
                  flexGrow: 1,
                  justifyContent: "space-between"}}>
                  <Typography sx={{ marginTop: "auto", fontWeight: "bold"}} gutterBottom >Giai Đoạn 4</Typography>
                  <Chip color={chipColor} label={chipText} />
                </Box>
            </Box>
                <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                  <Box sx={{ margin: 1}}>                   
                    <Box sx={{display: "flex"}}>
                        <Box sx={{flexGrow:1, display: "flex"}}>
                            <Box style={{position:"relative"}} onClick={() => this.handleNav(-1)}>
                                <Box style={{position: "relative", transform: "translateY(-50%)", top: "50%"}}>
                                    <IconButton >
                                        <ArrowLeftIcon/>
                                    </IconButton>
                                </Box>
                            </Box>
                            <div   
                                style={{flexGrow: 1}} 
                                dangerouslySetInnerHTML={{ 
                                    __html: `<img class="cardI" style=" width: 100%; " src="${imgLink[this.state.currentI]}" />` 
                            }} />
                            <Box style={{position:"relative"}} onClick={() => this.handleNav(1)}>
                                <Box style={{position: "relative", transform: "translateY(-50%)", top: "50%"}}>
                                    <IconButton >
                                        <ArrowRightIcon/>
                                    </IconButton>
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={{ml:"10px", boxShadow:4, flex: "0 0 40%", borderRadius:"15px"}}>
                            <Typography sx={{m:"5px", fontWeight: "bold"}}>{titles[this.state.currentI]}</Typography>
                            <Typography sx={{m:"5px"}}>{this.props.result.text[this.state.currentI]}</Typography>
                        </Box>
                        <ColorRadioButtons value={this.state.state} onChange={this.handleChange} />
                    </Box>

                  </Box>
                </Collapse>
            </Box>
          </React.Fragment>)
    }
}

export default GiaiDoan4Check