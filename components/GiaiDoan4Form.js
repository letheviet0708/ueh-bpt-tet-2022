import {Component} from 'react'
import PageWrapper from "./PageWrapper";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import React from 'react'
import clientID from './ClientID.json'
import personService from "../Services/person.service";
import CTSnackbar from "./SnackBar"
import PendingIcon from '@mui/icons-material/Pending';
import ErrorIcon from '@mui/icons-material/Error';

import { alpha, styled } from '@mui/material/styles';
import { withRouter } from 'next/router'
import Gd4El from './gd4El'

const CssTextField = styled(TextField)({
    backgroundColor: "white",
    borderRadius: "5px 5px 0px 0px",
    '& label.Mui-focused': {
        color: '#1b4338',
        fontWeight: 'bold'
    },
    '& label': {
        color: '#1b4338'
    },
    '& .MuiOutlinedInput-root': {
      
      '&.Mui-focused fieldset': {
        borderColor: '#1b4338',
        border: "3 solid"
      },
    },
});

const ColorButton = styled(Button)({
    color: 'white',
    backgroundColor: '#1b4338',
    '&:hover': {
      backgroundColor: '#1b4338',
    },
});

const titles = ["Giao Thừa","Mùng 1","Mùng 2","Mùng 3"]

class GiaiDoan4Form extends Component {
    constructor(props){
        super(props)
        this.state = {
            images: [null, null, null, null],
            text: [null, null, null, null],
            openSB: false,
            messageSB: 'nothing',
            severitySB: 'info',
            selectedImage: null,
            fileUploadErrors: null,
            hasChange: false,
            saving: false,
            enableB: false,
            savingMessage: 'Đang lưu'
        }
        this.myInput = React.createRef()
    }

    componentDidMount () {
        console.log(this.myInput)
        if (this.props.Data){
            this.setState({
                images: this.props.Data.images.slice(),
                text: this.props.Data.text.slice()
            })
        }
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

    submit = async() =>{
        this.handleSBClick("Đang lưu ..., quá trình tải lên có thể lâu mong bạn thông cảm", "info")
        await this.setState({saving: true, savingMessage: "Đang lưu ..."})
        let arrlink = [null, null, null, null]
        for (let i = 0; i < this.state.images.length; i++){
            console.log(this.state.images[i].includes('https://i.imgur.com/'))
            if (this.state.images[i].includes('https://i.imgur.com/') == false){
                console.log(clientID.clientID.length)
                for (let j = 0; j < clientID.clientID.length; j++){
                    console.log(clientID.clientID[j])
                    arrlink[i] = await this.uploadImage(this.state.images[i], clientID.clientID[j])
                    if (arrlink[i] != null) break
                }
                if(arrlink[i] == null){
                    this.setState({saving: false})
                    this.handleSBClick("Có lỗi xảy ra khi tải lên :<, bạn vui lòng thử lại nha", "warning")
                    return
                }
            }else{
                arrlink[i] = this.props.Data.images[i]
            }
            console.log(`uploaded ${i+1}/4 image ...`)
            await this.setState({savingMessage: `Đang lưu ${i+1}/4`})
        }
        console.log('upload images completed!')

        console.log(arrlink)

        const neednew = (this.props.Data == null)
        const id = (this.props.Data) ? this.props.Data._id : ""
        const data = {
            images: arrlink,
            text: this.state.text,
            activityIndex: 4,
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

    checkE = () => {
        let check = true
        for (let i = 0; i < 4; i++){
            if (this.state.images[i] == null || this.state.text[i] == null || this.state.text[i] == '' ){
                check = false
                break
            }
        }

        this.setState({
            enableB: check,
            hasChange: true
        })
    }

    onElChange = (key, type, value) => {
        console.log({key, type, value})
        let arr = this.state[type]
        arr[key] = value
        this.setState({
            [type] : arr
        })

        this.checkE()
    }

    render(){
        const {imgH, imgW, openCropper, selectedImage, scaleValue, text,hasChange, saving} = this.state
        let saveButton= (
            <ColorButton  sx={{backgroundColor:"#1b4338"}} onClick={this.submit} variant="contained" startIcon={<CheckCircleIcon />}>
                Lưu
            </ColorButton>)
        if (this.props.Data == null || (this.props.Data != null && this.state.hasChange)){
            if (this.state.enableB)
            saveButton = (
                <ColorButton sx={{backgroundColor:"#1b4338"}} onClick={this.submit} variant="contained" startIcon={<CheckCircleIcon />}>
                    Lưu
                </ColorButton>)
            else
            saveButton = (
                <ColorButton disabled onClick={this.submit} variant="contained" startIcon={<CheckCircleIcon />}>
                    Lưu
                </ColorButton>)
        }else{
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
        
        if (saving){
            saveButton = (
                <ColorButton disabled onClick={this.submit} variant="contained" startIcon={<CheckCircleIcon />}>
                    {this.state.savingMessage}
                </ColorButton>)
        }

        return (<div>
            <Box sx={{ borderRadius: 2,boxShadow: 3, backgroundColor: "white",
                    mt: "20px",
                    mr:"10px",
                    ml:"10px"}}>
                <Box sx={{
                    pt:"10px",
                    pb:"10px",
                    pl:"10px",
                    pr:"10px",
                }}>
                    <Typography sx={{fontSize: "22px", fontWeight: "bold", mb: "12px", mt:"6px"}}>Stage 4: Tết mới trong tim</Typography>
                    <Box >
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column"
                            }}
                        >
                            {titles.map((title, key) => (
                                <Gd4El index={key} key={key} image = {this.state.images[key]} onChange={this.onElChange} text = {this.state.text[key]} title={title}/>
                            ))}
                        </Box>
                        <span style={{fontSize: "12px"}}>Lưu ý: Các bạn đăng tải đủ 04 tấm ảnh về những ngày Tết của bản thân.</span>
                    </Box>
                    <Box sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        mt: "10px"
                    }}
                    >
                        {saveButton}
                    </Box>
                    {
                    this.props.Data.state == 1 &&
                        <span style={{fontSize: "12px"}}>Có thể trong quá trình tải hình lên có trục trặc nhỏ nên có thể làm chúng mình không nhận đủ hình của bạn, mong bạn kiểm tra và thử lại nha. </span>
                    }
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

export default withRouter(GiaiDoan4Form)