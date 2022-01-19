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

class GiaiDoan3Form extends Component {
    constructor(props){
        super(props)
        this.state = {
            image: '',
            text: '',
            openSB: false,
            messageSB: 'nothing',
            severitySB: 'info',
            file: null,
            hasChange: false
        }
        this.myInput = React.createRef()
    }

    componentDidMount () {
        console.log(this.myInput)
        if (this.props.Data){
            this.setState({
                image: this.props.Data.images[0],
                text: this.props.Data.text[0]
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
    

    profilePicChange = (fileChangeEvent) => {
        const file = fileChangeEvent.target.files[0];
        console.log(file)
        this.setState({file: file})
    };

    getBase64 = file => {
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
            console.log(baseURL);
            return resolve(baseURL);
          };
          console.log(fileInfo);
        });
    };


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
        if (!this.state.file || !this.state.text ){
            this.handleSBClick("Bạn chưa nhập đủ thông tin!", "info")
            return
        }
        if (this.state.file){
            this.getBase64(this.state.file).then((img64) => {
                this.uploadImage(img64, clientID.clientID[1]).then((imageLink) => {
                    const neednew = (this.props.Data == null)
                    const id = (this.props.Data) ? this.props.Data._id : ""
                    const data = {
                        images: [imageLink],
                        text: [this.state.text],
                        activityIndex: 3,
                        state: 0,
                        new: neednew,
                        id: id
                    }
                    console.log(data)
                    personService.saveResult(this.props.uid, data)
                        .then(response => {
                            console.log(response.data);
                            this.setState({saved: true})
                            this.handleSBClick("Đã lưu thành công!", "success")
                        })
                        .catch(e=> {
                            console.log(e);
                            this.handleSBClick("Có lỗi xảy ra vui lòng thử lại!", "error")
                        });
                })
            })       
        }
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
        const {imgH, imgW, openCropper, selectedImage, scaleValue, text,hasChange} = this.state
        let saveButton= (
            <Button onClick={this.submit} variant="contained" startIcon={<CheckCircleIcon />}>
                Lưu
            </Button>)
        if (this.props.Data == null){
            if (hasChange)
            saveButton = (
                <Button onClick={this.submit} variant="contained" startIcon={<CheckCircleIcon />}>
                    Lưu
                </Button>)
            else
            saveButton = (
                <Button disabled onClick={this.submit} variant="contained" startIcon={<CheckCircleIcon />}>
                    Lưu
                </Button>)
        }else{
            if (this.props.Data.images[0] == this.state.image
                && this.props.Data.text[0] == this.state.text){
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
        
        let imgInfo = (<div></div>);
        if (this.state.image){
            imgInfo = (
                <Link href= {this.state.image} >
                    <a target="_blank">
                        <Typography>{this.state.image}</Typography>
                    </a>
                </Link>)
        }
        if (this.state.file){
            imgInfo = (<Typography>{this.state.file.name}</Typography>)
        }

        return (<div>
            <Box sx={{ borderRadius: 2,boxShadow: 3,
                    mt: "20px",
                    mr:"10px",
                    ml:"10px"}}>
                <Box sx={{
                    pt:"10px",
                    pb:"10px",
                    pl:"10px",
                    pr:"10px",
                }}>
                    <Typography sx={{fontWeight: "bold"}}>Giai Đoạn 3: Danh sách hoạt động</Typography>
                    <Box >
                        <Box >
                            <Button onClick={this.handleDivclick} variant="contained" startIcon={<PhotoSizeSelectActualIcon />}>
                                Chọn ảnh
                            </Button>
                            {imgInfo}
                        </Box>
                        <Box >
                            <TextField
                                label="Link bài post trên Facebook cá nhân"
                                value={text}
                                onChange={this.handleTextChange}
                                sx={{
                                    mt: "10px",
                                    width:"100%"
                                }}
                            />
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

export default GiaiDoan3Form