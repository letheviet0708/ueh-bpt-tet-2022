import { Component } from "react";
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';


class LRselect extends Component{
    constructor(props){
        super(props)
        this.state={
            title: null,
            value: null,
        }
    }

    componentDidMount(){
        this.setState({
            title: this.props.title,
            value: this.props.value,
        })
    }

    handleChange(i){
        
        let value = this.state.value + i
        if (value < 0) {
            console.log("<0")
            value = this.state.title.length-1
        }
        if (value > this.state.title.length-1) {
            value = 0
        }
        const arr = new Array(this.props.title.length).fill(false)
        arr[value] = true
        this.setState({ value: value }, ()=>{
            this.props.onChange(this.props.name, value)
        })
        
    }

    render(){
        return(<>
            <Box sx={{display: "flex", justifyContent:"space-between"}}>
                <IconButton onClick={() => this.handleChange(-1)}>
                    <ArrowLeftIcon/>
                </IconButton>
                <p style={{margin: "auto 0"}}>{this.state.value!=null ? this.state.title[this.state.value] : ""}</p>
                <IconButton onClick={() => this.handleChange(1)}>
                    <ArrowRightIcon/>
                </IconButton>
            </Box>
        </>)
    }
}

export default LRselect 