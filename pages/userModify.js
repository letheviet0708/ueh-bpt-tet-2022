import { Component } from "react";
import Button from '@mui/material/Button';
import PageWrapper from "../components/PageWrapper";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import clan from "../components/clan.json"
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import AvatarUpload from "../components/avatarEdit/avatarUpload";
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import Fab from '@mui/material/Fab';
import CTSnackbar from "../components/SnackBar";

import firebase from 'firebase/app';
import personService from "../Services/person.service";
import { withRouter } from "next/router";

import clientID from '../components/ClientID.json'
import uploadImage from '../components/uploadImg'

import { alpha, styled } from '@mui/material/styles';

const CssTextField = styled(TextField)({
    backgroundColor: "white",
    borderRadius: "5px 5px 0px 0px",
    '& label.Mui-focused': {
        color: '#1b4338',
        fontWeight: 'bold'
    },
    fontFamily: 'Montserrat'
});

const ColorButton = styled(Button)({
    color: 'white',
    backgroundColor: '#1b4338',
    '&:hover': {
      backgroundColor: '#1b4338',
    },
});

class UserModify extends Component{

    constructor(props){
        super(props)

        this.state = {
            email: '',
            phone: '',
            Name: '',
            cls: '',
            clan: '',
            mssv: '',
            avatar: '',
            gen:'',
            khoaList: null,
            anchorEl: null,
            openAvatarEditor: false,
            user: null,
            openSB: false,
            messageSB: 'nothing',
            severitySB: 'info',
            luser: null,
            saved: false,
            avatarChanged: false
        }
    }

    getUserInfor = () =>{
        console.log(firebase.auth().currentUser)
            personService.findOne(firebase.auth().currentUser.uid)
                .then(response => {
                    let user = response.data.data
                    console.log(user)
                    if (response.data.data == null){
                        this.handleSBClick("Hãy nhập thông tin của mình!", "info")
                        console.log(firebase.auth().currentUser.photoURL)
                        this.setState({
                            avatar: firebase.auth().currentUser.photoURL,
                            email: firebase.auth().currentUser.email
                        })
                    }else{
                        this.setState({
                            email: user.email,
                            phone: user.phone,
                            Name: user.name,
                            cls: user.cls,
                            clan: user.clan,
                            gen: user.gen,
                            mssv: user.mssv,
                            avatar: user.avatar
                        })
                    }
                    this.setState({luser: user})
                })
                .catch(e=> {
                    console.log(e);
                });
        
    }

    init = () => {
        console.log("bruh bruh")
        this.getUserInfor()
    }

    check = () => {
        if (firebase.auth().currentUser) {
          this.init();
          return;
        }
        setTimeout(this.check, 200);
    }

    componentDidMount(){
        console.log(clan.Khoa)
        this.setState({khoaList: clan.Khoa})
        this.check()
    }

    handleChange = (event) => {
        this.setState({ 
            [event.target.name] : event.target.value
        });
        
    }
    
    cropImgHandle = (editor) => {
        this.setState({avatarEditor: editor});
    } 

    handleChange2 = (event) =>{
        console.log(event.target.value)
        this.setState({ [event.target.name]: event.target.value})
    }

    handleAvatarClick = (event) => {
        this.setState({openAvatarEditor : true});
    };
  
    handleAvatarClose = () => {
        this.setState({openAvatarEditor : false});
    };

    setAvatar = () =>{
        let avatarURL = this.state.avatarEditor.getImageScaledToCanvas().toDataURL();
        this.setState({avatar : avatarURL, avatarChanged: true});
        this.handleAvatarClose();
    }

    checkForm = () =>{
        return (
            Boolean(this.state.email) &&
            Boolean(this.state.phone) &&
            Boolean(this.state.Name) &&
            Boolean(this.state.cls) &&
            Boolean(this.state.clan) &&
            Boolean(this.state.mssv) &&
            Boolean(this.state.gen) &&
            Boolean(this.state.avatar) 
        )
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
    
    dataURItoBlob = (dataURI) => {
        // convert base64/URLEncoded data component to raw binary data held in a string
        var byteString;
        if (dataURI.split(',')[0].indexOf('base64') >= 0)
            byteString = atob(dataURI.split(',')[1]);
        else
            byteString = unescape(dataURI.split(',')[1]);
    
        // separate out the mime component
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    
        // write the bytes of the string to a typed array
        var ia = new Uint8Array(byteString.length);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
    
        return new Blob([ia], {type:mimeString});
    }    

    uploadProfile = (uid, data) =>{
        personService.saveProfiles(uid, data)
            .then(response => {
                console.log(response.data);
                this.setState({saved: true})
                this.handleSBClick("Đã lưu thành công!", "success")
                this.props.router.reload()
            })
            .catch(e=> {
                console.log(e);
                this.handleSBClick("Có lỗi xảy ra vui lòng thử lại!", "error")
            });
    }

    handleSubmit = () => {
        const imgurID = clientID.clientID[0]
        const uid = firebase.auth().currentUser.uid
        if (this.checkForm()){
            if (this.state.avatarChanged){
                uploadImage(this.state.avatar, imgurID)
                    .then((imageLink) => {
                        console.log(imageLink)
                        if (imageLink){
                            const data = {
                                uid: uid,
                                email: this.state.email,
                                phone: this.state.phone,
                                name: this.state.Name,
                                gen: this.state.gen,
                                cls: this.state.cls,
                                clan: this.state.clan,
                                mssv: this.state.mssv,
                                avatar: imageLink
                            }

                            console.log(data)

                            this.uploadProfile(uid, data)
                        }
                    })
            }else{
                const data = {
                    uid: uid,
                    email: this.state.email,
                    phone: this.state.phone,
                    name: this.state.Name,
                    cls: this.state.cls,
                    clan: this.state.clan,
                    gen: this.state.gen,
                    mssv: this.state.mssv,
                    avatar: this.state.avatar
                }

                this.uploadProfile(uid, data)
            }

        }else{
            this.handleSBClick("Bạn cần nhập đầy đủ thông tin!", "warning")
        }
    }

    render() {
        const { email, Name, phone, clan, mssv, cls, khoaList, gen, openAvatarEditor, avatar } = this.state;

        return (
            <div id="anotherBg">
            <PageWrapper>
                <div id = "contentWrapper"
                    style = {{
                        maxWidth: "800px",
                        marginLeft: "auto",
                        marginRight: "auto",
                        paddingTop: "20px"
                    }}
                >
                    <Box sx = {{
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        <Box sx = {{
                                mt: "20px",
                                ml: "auto",
                                mr: "auto",
                            }}>
                            <Badge
                                overlap="circular"
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                badgeContent={
                                    <Fab size="small"  aria-label="edit avatar" onClick={this.handleAvatarClick}>
                                        <CameraAltIcon />
                                    </Fab>
                                }
                            >                            
                                <Avatar 
                                    alt="Ueher" 
                                    src= {avatar}
                                    sx={{
                                        width: "100px",
                                        height: "100px",
                                        border: 1,
                                        borderColor: 'grey.500'
                                    }}
                                    />
                            </Badge>
                        </Box>
                        <div className = "containerForm">

                            <CssTextField
                                required
                                className = "tiems"
                                label="Tên"
                                onChange={this.handleChange}
                                name="Name"
                                value={Name}
                                variant="filled" 
                                sx = {{mt: "20px"}}
                            />

                            <CssTextField
                                required
                                className = "tiems"
                                label="MSSV"
                                onChange={this.handleChange}
                                name="mssv"
                                value={mssv}
                                variant="filled" 
                                sx = {{mt: "20px"}}
                            />
                            <Box sx = {{mt: "20px", display:"flex"}}
                                className = "tiems">
                                <CssTextField
                                    required
                                    label="Lớp"
                                    onChange={this.handleChange}
                                    name="cls"
                                    value={cls}
                                    variant="filled" 
                                    
                                />
                                <CssTextField
                                    required
                                    select
                                    label="Khóa"
                                    onChange={this.handleChange2}
                                    name="gen"
                                    value={gen}
                                    variant="filled" 
                                    sx = {{ml: "10px", flexGrow: 1}}
                                >
                                    <MenuItem value="K45" >K45</MenuItem>
                                    <MenuItem value="K46" >K46</MenuItem>
                                    <MenuItem value="K47" >K47</MenuItem>
                                </CssTextField>
                            </Box>
                            
                            <CssTextField
                                required
                                className = "tiems"
                                select
                                label="Khoa"
                                onChange={this.handleChange2}
                                name="clan"
                                value={clan}
                                variant="filled" 
                                sx = {{mt: "20px"}}
                            >
                                {khoaList && khoaList.map((khoa, index) => (
                                    <MenuItem value={khoa.value} key={index}>{khoa.label}</MenuItem>
                                ))}  
                            </CssTextField>

                            <CssTextField
                                required
                                className = "tiems"
                                label="Số điện thoại"
                                onChange={this.handleChange}
                                name="phone"
                                value={phone}
                                variant="filled" 
                                sx = {{mt: "20px"}}
                            />

                            <CssTextField
                                disabled
                                className = "tiems"
                                label="Email"
                                onChange={this.handleChange}
                                name="email"
                                value={email}
                                variant="filled" 
                                sx = {{mt: "20px"}}
                            />
                        </div>
                        
                        <ColorButton 
                            type="submit" 
                            variant="contained" 
                            onClick={this.handleSubmit}
                            sx = {{
                                mt: "20px",
                                width:"100px",
                                ml: "auto",
                                mr: "auto"
                            }}>Lưu</ColorButton>

                    </Box>
                </div>
                
            </PageWrapper>
            {openAvatarEditor &&
            <Box
                sx={{
                    position: "fixed",
                    backgroundColor: "#242424a6",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    zIndex: '2000',
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <Box 
                    sx={{ 
                        backgroundColor: '#fff', 
                        borderRadius: 5
                    }}
                >
                    <Box 
                        sx={{
                            pt: "20px",
                            pb: "20px",
                            pl: "20px",
                            pr: "20px",
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                        }}
                    >
                        <AvatarUpload
                            cropImg={this.cropImgHandle} 
                        />
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-around',
                                mt: "10px"
                            }}
                        >
                            <Button sx={{mr:"10px"}} onClick={this.setAvatar} variant="contained" >Lưu</Button>
                            <Button sx={{ml:"10px"}} onClick={this.handleAvatarClose} variant="contained" >Hủy</Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
            }
            <CTSnackbar 
                handleClick ={this.handleSBClick}
                open = {this.state.openSB}
                handleClose = {this.handleSBClose}
                message = {this.state.messageSB}
                severity = {this.state.severitySB}
            />
        </div>
        );
    }
}

export default withRouter(UserModify)