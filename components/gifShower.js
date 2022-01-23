import {Component} from 'react'
import Box from '@mui/material/Box';
import CharacterCreator from './characterCreator'
import Button from '@mui/material/Button';
import {styled } from '@mui/material/styles';
import DownloadLink from "react-download-link";
import Backdrop from '@mui/material/Backdrop';
import { Typography } from "@mui/material";
import { withRouter } from "next/router";

const ColorButton = styled(Button)({
    color: 'white',
    backgroundColor: '#1b4338',
    '&:hover': {
      backgroundColor: '#1b4338',
    },
});

class GifShow extends Component {
    constructor (props){
        super(props)
        this.state={
            openBD: false
        }
    }

    saveAs = (blob, fileName) =>{
        var elem = window.document.createElement('a');
        elem.href = blob
        elem.download = fileName;
        elem.style = 'display:none;';
        (document.body || document.documentElement).appendChild(elem);
        if (typeof elem.click === 'function') {
            elem.click();
        } else {
            elem.target = '_blank';
            elem.dispatchEvent(new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true
            }));
        }
        URL.revokeObjectURL(elem.href);
        elem.remove()
    }

    download = async () => {
        fetch(this.props.gif)
        .then(res => res.blob()) // Gets the response and returns it as a blob
        .then(async (blob) => {
            var reader = new FileReader();
            reader.readAsDataURL(blob); 
            reader.onloadend = () => {
                var base64data = reader.result;
                var elem = window.document.createElement('a');
                elem.href = base64data
                elem.download = "chibi.gif";
                elem.style = 'display:none;';
                (document.body || document.documentElement).appendChild(elem);
                if (typeof elem.click === 'function') {
                    elem.click();
                } else {
                    elem.target = '_blank';
                    elem.dispatchEvent(new MouseEvent('click', {
                    view: window,
                    bubbles: true,
                    cancelable: true
                    }));
                }
                URL.revokeObjectURL(elem.href);
                elem.remove()
            }            
        });
    }

    handleClose = () =>{
        this.setState({openBD: false}, ()=>{
            this.props.router.reload()
        })
    }

    handleClose2 =(event) =>{
        if(event.target === event.currentTarget) {
            this.setState({openView: false})
        }
    }
    
    handleOpen = () =>{
        this.setState({openBD: true})
    }

    render () {
        return (
            <>
                {this.props.gif ? 
                    <Box sx={{
                        display: "flex", 
                        mt: "20px"
                    }}>
                        <Box sx={{
                            display: "inline-block", 
                            backgroundColor: "white", 
                            borderRadius: 2,
                            padding: "0 10px 10px 10px",
                            m: "auto"
                            }}>
                            <Typography sx={{fontSize: "22px", fontWeight: "bold", mb: "7px", pt:"16px"}}>Trao GIF - Ship yêu thương</Typography>
                            <Box sx={{display: "flex", justifyContent: "center"}}>
                                <div 
                                    style={{width: "100%"}}
                                    dangerouslySetInnerHTML={{ 
                                        __html: `<img preload class="" style="width: 100%;" src="${this.props.gif}" />` 
                                }} />
                            </Box>
                            <Box sx={{display: "flex", justifyContent: "center", mt: "10px"}}>
                                <ColorButton onClick={this.download}>Tải về</ColorButton>
                                <ColorButton sx={{ml:"10px"}} onClick={this.handleOpen}>Tạo ảnh khác</ColorButton>
                            </Box>
                        </Box>
                    </Box>
                    :
                    <CharacterCreator togger = {true}/>
                }

                
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={this.state.openBD}
                    onClick={this.handleClose2}
                >
                    <CharacterCreator handleClose={this.handleClose} togger = {false}/>
                </Backdrop>
            </>
        )
    }
}
export default withRouter(GifShow)