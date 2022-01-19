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

class GiaiDoan1From extends Component {
    constructor(props){
        super(props)
        this.state = {
            image: '',
            text: '',
            imgW: 400,
            imgH: 300,
            openSB: false,
            messageSB: 'nothing',
            severitySB: 'info',
            openCropper: false,
            selectedImage: null,
            fileUploadErrors: null,
            editor: null,
            scaleValue: 1,
            editor: null,
            hasChange: false
        }
        this.myInput = React.createRef()
    }

    componentDidMount () {
        console.log(this.myInput)
        if (this.props.Data){
            this.setState({
                selectedImage: this.props.Data.images[0],
                text: this.props.Data.text[0],
                openCropper: true
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
    
    setEditorRef = editor => {
        this.setState({ editor:editor,
            hasChange: true });
    };

    profilePicChange = (fileChangeEvent) => {
        const file = fileChangeEvent.target.files[0];
        this.imgscr = file;
        const { type } = file;
        if (!(type.endsWith('jpeg') || type.endsWith('png') || type.endsWith('jpg') || type.endsWith('gif'))) {

        } else {
            this.setState({ openCropper: true, selectedImage: fileChangeEvent.target.files[0], fileUploadErrors: [] });
        }
    };

    onScaleChange = (e, data) => {
        const scaleValue =  parseFloat(data);
        this.setState({ scaleValue: scaleValue });
    };

    tets = () =>{
        const avatarURL = this.state.editor.getImage().toDataURL();
        console.log(avatarURL)
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
        if (!this.state.editor || !this.state.text){
            this.handleSBClick("Bạn chưa nhập đủ thông tin!", "info")
            return
        }
        const img64 = this.state.editor.getImage().toDataURL();
        this.uploadImage(img64, clientID.clientID[1]).then((imageLink) => {
            const neednew = (this.props.Data == null)
            const id = (this.props.Data) ? this.props.Data._id : ""
            const data = {
                images: [imageLink],
                text: [this.state.text],
                activityIndex: 1,
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
            if (this.props.Data.images[0] == this.state.selectedImage
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
                    <Typography sx={{fontWeight: "bold"}}>Giai Đoạn 1: Chúc lời yêu thương</Typography>
                    <Box id="gd1Container" >
                        <Box id="gd1Button">
                            {openCropper ?
                                <Box>
                                    <Box
                                        sx={{
                                            backgroundColor: "#e1e1e1",
                                            width: "100%",
                                            paddingTop: "75%",
                                            position: "relative",
                                            border: 2
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                position: "absolute",
                                                top: 0, 
                                                left: 0,
                                                width: "100%",
                                                height: "100%",
                                                display: "flex",
                                                justifyContent: "center"
                                            }}
                                        >
                                            <AvatarEditor 
                                                width={imgW}
                                                height={imgH}
                                                image={selectedImage} 
                                                crossOrigin = "anonymous"
                                                border={0}
                                                scale={scaleValue} 
                                                rotate={0} 
                                                ref={this.setEditorRef} 
                                                className="cropCanvas" 
                                                style={{width:"100%", height:"100%"}}
                                            />
                                        </Box>
                                    </Box>
                                    <Box id="imgToolSm">
                                        <Button 
                                            type="button" 
                                            variant="contained" 
                                            color="primary" 
                                            onClick={this.handleDivclick}
                                            sx={{mt:"5px"}}
                                            >Ảnh khác</Button>
                                        <Typography
                                            sx={{mt:"5px"}}>Phóng to</Typography>
                                        <Slider
                                            value={scaleValue} 
                                            min={1} 
                                            max={10}
                                            step={0.2}
                                            size="small"
                                            onChange={this.onScaleChange} 
                                        />
                                    </Box>
                                </Box>
                            :
                                <Button onClick={this.handleDivclick} variant="contained" startIcon={<PhotoSizeSelectActualIcon />}>
                                    Chọn ảnh
                                </Button>
                            }       
                        </Box>
                        <Box id="gd1Text">
                            <TextField
                                label="Lời chúc của bạn"
                                multiline
                                rows={4}
                                value={text}
                                onChange={this.handleTextChange}
                                sx={{
                                    width:"100%"
                                }}
                            />
                            {openCropper &&
                            <Box id="imgToolLg">
                                <Button 
                                    type="button" 
                                    variant="contained" 
                                    color="primary" 
                                    onClick={this.handleDivclick}
                                    sx={{mt:"5px"}}
                                    >Ảnh khác</Button>
                                <Typography>Phóng to</Typography>
                                <Slider
                                    value={scaleValue} 
                                    min={1} 
                                    max={10}
                                    step={0.2}
                                    size="small"
                                    sx={{mt:"5px"}}
                                    onChange={this.onScaleChange} 
                                />
                            </Box>
                            }
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

export default GiaiDoan1From