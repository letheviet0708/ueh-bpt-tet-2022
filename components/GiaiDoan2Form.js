import {Component} from 'react'
import PageWrapper from "./PageWrapper";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Image from 'next/image'
import Slider from '@mui/material/Slider';
import AvatarEditor from 'react-avatar-editor';
import React from 'react'
import uploadImage from './uploadImg'
import clientID from './ClientID.json'
import personService from "../Services/person.service";
import CTSnackbar from "./SnackBar"
import PendingIcon from '@mui/icons-material/Pending';
import ErrorIcon from '@mui/icons-material/Error';
import Link from 'next/link'
import { alpha, styled } from '@mui/material/styles';
import Skeleton from '@mui/material/Skeleton';
import { withRouter } from 'next/router'

const ColorButton = styled(Button)({
    color: 'white',
    backgroundColor: '#1b4338',
    '&:hover': {
      backgroundColor: '#1b4338',
    },
});

class GiaiDoan2Form extends Component {
    constructor(props){
        super(props)
        this.state = {
            image: '',
            text: '',
            openSB: false,
            messageSB: 'nothing',
            severitySB: 'info',
            img: null,
            img2: null,
            hasChange: false,
            saving: false
        }
        this.myInput = React.createRef()
        this.myInput2 = React.createRef()
    }

    componentDidMount () {
        if (this.props.Data){
            this.setState({
                img: this.props.Data.images[0],
                img2: this.props.Data.images[1]
            })
        }
    }

    handleTextChange = (event) => {
        this.setState({ 
            text : event.target.value,
            hasChange: true
        });
        
    }

    handleDivclick = (e) => {
        this.inputElement.click();
    }

    handleDivclick2 = (e) => {
        this.inputElement2.click();
    }
    
    getBase64 = (file) => {
        return new Promise(resolve => {
          let fileInfo;
          let baseURL = "";
          // Make new FileReader
          let reader = new FileReader();
    
          // Convert the file to base64 text
          reader.readAsDataURL(file);
    
          // on reader load somthing...
          reader.onload = () => {
            // Make a fileInfo Object
            console.log("Called", reader);
            baseURL = reader.result;
            //console.log(baseURL);
            return resolve(baseURL);
          };
          console.log(fileInfo);
        });
    }

    profilePicChange = (fileChangeEvent) => {
        const file = fileChangeEvent.target.files[0];
        console.log(file)
        this.getBase64(file).then((img64) => {
            this.setState({img: img64, hasChange: true})
        })
    }
 
    profilePicChange2 = (fileChangeEvent) => {
        const file = fileChangeEvent.target.files[0];
        console.log(file)
        this.getBase64(file).then((img64) => {
            this.setState({img2: img64, hasChange: true})
        })
    }

    uploadImage = async(base64, clientid) => {
        const dataURI = base64
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
    
        const file = new Blob([ia], {type:mimeString})
    
        return new Promise((resolve, reject) => {
            const formData = new FormData();
            //console.log(file)
            formData.append("image", file);
            fetch("https://api.imgur.com/3/image", {
                method: "POST",
                headers: {
                    Authorization: "Client-ID " + clientid
                    //Accept: "application/json",
                },
                body: formData,
            })
                .then((response) => response.json())
                .then((response) => {
                    console.log(response);
                    if (!response.success){
                        return resolve(null);
                    }
                    //console.log(response.data.link);
                    const imageLink = response.data.link;
                    //console.log(imageLink);
                    return resolve(imageLink)
            })
            .catch((e) => {
                this.setState({unsubmited: true})
                console.log(e)
                return resolve(e)
            });
        })
    }    

    submit = () =>{
        this.handleSBClick("Đang lưu ...", "info")
        if (!this.state.img || !this.state.img2 ){
            this.handleSBClick("Bạn chưa lên đủ hình!", "info")
            return
        }
        this.setState({saving: true}, ()=>{
            this.uploadImage(this.state.img, clientID.clientID[2]).then((imageLink1) => {
                this.uploadImage(this.state.img2, clientID.clientID[1]).then((imageLink2) => {
                    const neednew = (this.props.Data == null)
                    const id = (this.props.Data) ? this.props.Data._id : ""
                    const data = {
                        images: [imageLink1, imageLink2],
                        activityIndex: 2,
                        state: 0,
                        new: neednew,
                        id: id
                    }
                    console.log(data)
                    personService.saveResult(this.props.uid, data)
                        .then(response => {
                            console.log(response.data);
                            this.setState({saving: false})
                            this.handleSBClick("Đã lưu thành công!", "success")
                            this.props.router.reload()
                        })
                        .catch(e=> {
                            this.setState({saving: false})
                            console.log(e);
                            this.handleSBClick("Có lỗi xảy ra vui lòng thử lại!", "error")
                        });
                })
            })   
        })
    }   
    
    submit2 = async() => {
        this.handleSBClick("Đang lưu ...", "info")
        if (!this.state.img || !this.state.img2 ){
            this.handleSBClick("Bạn chưa lên đủ hình!", "info")
            return
        }
        await this.setState({saving: true})
        let arr = [null, null]
        if (this.props.Data)
            arr = this.props.Data.images
        if (this.props.Data == null || this.state.img != this.props.Data.images[0]){
            arr[0] = await this.uploadImage(this.state.img, clientID.clientID[1])
        }

        if (this.props.Data == null || this.state.img2 != this.props.Data.images[1]){
            arr[1] = await this.uploadImage(this.state.img2, clientID.clientID[2])
        }

        const neednew = (this.props.Data == null)
        const id = (this.props.Data) ? this.props.Data._id : ""
        const data = {
            images: arr,
            activityIndex: 2,
            state: 0,
            new: neednew,
            id: id
        }
        console.log(data)
        personService.saveResult(this.props.uid, data)
            .then(response => {
                console.log(response.data);
                this.setState({saving: false})
                this.handleSBClick("Đã lưu thành công!", "success")
                this.props.router.reload()
            })
            .catch(e=> {
                this.setState({saving: false})
                console.log(e);
                this.handleSBClick("Có lỗi xảy ra vui lòng thử lại!", "error")
            });
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

    render(){
        const {hasChange, saving} = this.state
        let saveButton= (
            <ColorButton  sx={{backgroundColor:"#1b4338"}} onClick={this.submit2} variant="contained" startIcon={<CheckCircleIcon />}>
                Lưu
            </ColorButton>)
        if (this.props.Data == null){
            if (hasChange)
            saveButton = (
                <ColorButton sx={{backgroundColor:"#1b4338"}} onClick={this.submit2} variant="contained" startIcon={<CheckCircleIcon />}>
                    Lưu
                </ColorButton>)
            else
            saveButton = (
                <ColorButton disabled variant="contained" startIcon={<CheckCircleIcon />}>
                    Lưu
                </ColorButton>)
        }else{
            if (this.props.Data.images[0] == this.state.img
                && this.props.Data.images[1] == this.state.img2){
                switch(this.props.Data.state){
                    case 0:
                        saveButton = (
                            <Button variant="contained" color="warning" startIcon={<PendingIcon />}>
                                Đang duyệt
                            </Button>)
                    break;
                    case 1:
                        saveButton = (
                            <Button variant="contained" color="error" startIcon={<ErrorIcon />}>
                                Không hợp lệ
                            </Button>)
                    break;
                    case 2:
                        saveButton = (
                            <Button variant="contained" color="success" startIcon={<CheckCircleIcon />}>
                                Đã xác nhận
                            </Button>)
                    break;
                }
            }
        }
        
        if (saving){
            saveButton = (
                <ColorButton disabled onClick={this.submit} variant="contained" startIcon={<CheckCircleIcon />}>
                    Lưu
                </ColorButton>)
        }

        return (<div>
            <Box sx={{ 
                    borderRadius: 2,
                    boxShadow: 3,
                    backgroundColor: "white",
                    mt: "20px",
                    mr:"10px",
                    ml:"10px"}}>
                <Box sx={{
                    pt:"10px",
                    pb:"10px",
                    pl:"10px",
                    pr:"10px",
                }}>
                    <Typography sx={{fontSize: "22px", fontWeight: "bold", mb: "12px", mt:"6px"}}>Stage 2: Album Tết mới trong tim</Typography>
                    <Box >
                        <Box >
                        
                            <Box>
                                <ColorButton onClick={this.handleDivclick} variant="contained" startIcon={<PhotoSizeSelectActualIcon />}>
                                    Ảnh story của bạn
                                </ColorButton>
                                {this.state.img &&
                                    <div 
                                        style={{marginTop: "5px"}}
                                        dangerouslySetInnerHTML={{ 
                                            __html: `<img preload class="" style="max-height: 200px;" src="${this.state.img}" />` 
                                    }} />
                                }
                            </Box>
                            <Box sx={{mt: "5px"}} >
                                <ColorButton onClick={this.handleDivclick2} variant="contained" startIcon={<PhotoSizeSelectActualIcon />}>
                                    Ảnh xem MV của bạn
                                </ColorButton>
                                {this.state.img2 &&
                                    <div 
                                        style={{marginTop: "5px"}}
                                        dangerouslySetInnerHTML={{ 
                                            __html: `<img preload class="" style="max-height: 200px;" src="${this.state.img2}" />` 
                                    }} />
                                }
                            </Box>
                            <span style={{fontSize: "12px"}}>Hãy upload ảnh chứng minh bạn đã đăng video lên story (ít nhất 12 giờ) của trang Facebook cá nhân và ảnh bạn đã xem MV “TẾT 4.0 - 4 PHƯƠNG TRỜI, 0 KHOẢNG CÁCH”</span>
                        </Box>
                    </Box>
                    <Box sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        mt: "10px"
                    }}
                    >
                        {saveButton}
                    </Box>
                </Box>
            </Box>

            <input 
                ref={input => this.inputElement = input}
                id="uploadImg"
                type="file" 
                name="profilePicBtn" 
                accept="image/png, image/jpeg" 
                onChange={this.profilePicChange} 
                style = {{
                    width: "0.1px",
                    height: "0.1px",
                    opacity: "0",
                    overflow: "hidden",
                    position: "absolute",
                }}
                
            />

            <input 
                ref={input => this.inputElement2 = input}
                id="uploadImg"
                type="file" 
                name="profilePicBtn" 
                accept="image/png, image/jpeg" 
                onChange={this.profilePicChange2} 
                style = {{
                    width: "0.1px",
                    height: "0.1px",
                    opacity: "0",
                    overflow: "hidden",
                    position: "absolute",
                }}
                
            />

            <CTSnackbar 
                handleClick ={this.handleSBClick}
                open = {this.state.openSB}
                handleClose = {this.handleSBClose}
                message = {this.state.messageSB}
                severity = {this.state.severitySB}
            />
            
        </div>)
    }
}

export default withRouter(GiaiDoan2Form)