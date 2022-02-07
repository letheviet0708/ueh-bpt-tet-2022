

import { Component } from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import YouTube from 'react-youtube'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ButtonBase from '@mui/material/ButtonBase';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import FacebookIcon from '@mui/icons-material/Facebook';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import CTSnackbar from "./SnackBar"
import { FacebookShareButton } from "react-share";

class VideoCard extends Component{
    constructor(props){
        super(props)
        this.state={
            openView: false,
            liked: false,
            anchorElUser : false,
            shareURL:"",
            openSB: false,
            messageSB: 'nothing',
            severitySB: 'info',
        }
    }

    onLike = () =>{
        if (this.props.currentUser == null){
            this.handleSBClick("Bạn cần đăng nhập để có thể bảy tỏ yêu thích video này", "info")
            return
        }
        const l = this.state.liked
        this.setState({
            liked: !l
        })
        this.props.onLike(l ? -1 : this.props.index)
    }

    componentDidMount(){
        if (this.props.currentUser != null){
            this.setState({
                liked: (this.props.currentUser.vote == this.props.index+1)
            })
        }
        this.setState({
            shareURL: `https://tetmoi2022.vercel.app/tet-4-0-cung-uehers?queryIndex=${this.props.index}#view`
        })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.likeCount !== this.props.likeCount) {
            
        }
        if (prevProps.currentUser != this.props.currentUser) {
            if (this.props.currentUser !=null){
                this.setState({
                    liked: (this.props.currentUser.vote == this.props.index+1)
                })
            }
        }
    }

    onReady = (e) =>{
        this.props.onReady(e, this.props.index)
    }

    handleCloseUserMenu = (e) => {
        this.setState({anchorElUser : null});
    }

    handleOpenUserMenu = (event) => {
        this.setState({anchorElUser: event.currentTarget})
    } 

    handleSBClick = (message, severity) => {
        this.setState({openSB: true, messageSB: message, severitySB: severity})
    }

    handleSBClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({openSB: false})
    } 

    

    sharefb = async() =>{
        this.inputElement.click();
    }

    render(){
        return(<>
                <Box className="cardimg">
                    <Box sx={{
                        width:"100%",
                        backgroundColor: "#d30000",
                        borderRadius: "15px"    
                    }} onClick={this.handleOpen}>
                        <Box>
                            <YouTube 
                                videoId={this.props.src}
                                onStateChange = {this.props.onStateChange}
                                onReady={this.onReady}   
                                opts={{
                                    playerVars: {
                                        loop : 1,
                                        showinfo : 0,
                                        rel : 0,
                                        cc_load_policy : 1,
                                        iv_load_policy : 3,
                                        fs : 0,
                                        controls : 0,
                                    },
                                }} 
                            />
                            {this.props.likeCount != -1 &&
                                <span style={{
                                    fontSize: "12px",
                                    fontFamily: 'Montserrat',
                                    color: "white",
                                    marginLeft: "5px"
                                }}>{`${this.props.likeCount} Lượt thích`} </span>
                            }
                        </Box>
                        <Box sx={{mt:"5px",ml:"5px"}}>
                            <Box sx={{display: "flex", justifyContent: "space-between"}}>
                                <Box sx={{display: "flex"}}>
                                    <Avatar  alt="Remy Sharp" src={this.props.user.avatar} />                        
                                    <Box sx = {{ml: "10px"}}>
                                        <Typography sx={{ fontWeight: 'bold', fontSize: "16px", color:"white", fontFamily: 'Montserrat'}} variant="subtitle2" component="div">
                                                {this.props.user.name}
                                        </Typography>
                                        <Typography sx={{ textAlign: 'left', fontWeight: 'light', fontSize: "13px", marginTop: "-7px", color:"#ff9933", fontFamily: 'Montserrat' }} paragraph={true} variant="caption" display="block">
                                            {`${this.props.user.cls} - ${this.props.user.gen ? this.props.user.gen : ''}`}
                                        </Typography>
                                    </Box>
                                </Box>
                                
                                <Box>
                                    <ButtonBase onClick={this.onLike}>
                                        {!this.state.liked ? 
                                            <FavoriteBorderIcon fontSize="large" sx={{
                                                color: "white"
                                            }} />
                                            :
                                            <FavoriteIcon fontSize="large" sx={{
                                                color: "#ff9933"
                                            }} />
                                        }
                                    </ButtonBase>
                                    <ButtonBase 
                                        onClick={this.handleOpenUserMenu} 
                                    >
                                        <MoreVertIcon fontSize="large" sx={{
                                            color: "white"
                                        }} />
                
                                    </ButtonBase>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Menu
                    id="basic-menu"
                    anchorEl={this.state.anchorElUser}
                    open={Boolean(this.state.anchorElUser)}
                    onClose={this.handleCloseUserMenu}
                    MenuListProps={{
                    'aria-labelledby': 'basic-button',
                    }}
                >
                    <CopyToClipboard text={this.state.link} 
                        onCopy={() => this.handleSBClick("Đã sao chép vào clipboard!", "info")}>
                        <MenuItem onClick={this.handleCloseUserMenu}>
                            <ListItemIcon>
                                <InsertLinkIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Lấy Link</ListItemText>
                        </MenuItem>
                    </CopyToClipboard>
                    <Box onClick={this.sharefb} >
                        <MenuItem onClick={this.handleCloseUserMenu}>
                            <ListItemIcon>
                                <FacebookIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Chia Sẻ qua Facebook</ListItemText>
                        </MenuItem>
                    </Box>
                </Menu>

                
                <CTSnackbar 
                    handleClick ={this.handleSBClick}
                    open = {this.state.openSB}
                    handleClose = {this.handleSBClose}
                    message = {this.state.messageSB}
                    severity = {this.state.severitySB}
                />  

                <FacebookShareButton 
                    hashtag={"#TETMOI"}
                    beforeOnClick={()=>{console.log(this.state.id)}}
                    ref={button => this.inputElement = button}
                    url={this.state.shareURL} 
                />              
        </>)
    }
}

export default VideoCard