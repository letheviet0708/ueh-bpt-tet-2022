import {Component} from "react"
import Box from '@mui/material/Box';
import { createCanvas, loadImage, registerFont } from 'canvas'
import asset from "./characterAsset.json"
import CImg from "./ccImg"
import LRselect from "./lrSelect";
import Button from '@mui/material/Button';
import {styled } from '@mui/material/styles';
import GIF from './gif/gif'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import CancelIcon from '@mui/icons-material/Cancel';
import { withRouter } from "next/router";

import CTSnackbar from "../components/SnackBar";

import firebase from 'firebase/app';
import personService from "../Services/person.service";

import clientID from '../components/ClientID.json'
import TextField from '@mui/material/TextField';
import { Typography } from "@mui/material";

const CssTextField = styled(TextField)({
    backgroundColor: "white",
    fontFamily:"Montserrat",
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


class CharacterCreator extends Component{

    constructor(props){
        super(props)
        this.state={
            top: 0,
            hair: 0,
            eyes: 0,
            hearts: 0,
            topType: 0,
            text: "",
            aTop:[],
            aHair:[],
            aEyes:[],
            aHears:[],
            openBD: false,
            imgResult: null,
            openSB: false,
            messageSB: 'nothing',
            severitySB: 'info',
            saving: false
        }
    }

    componentDidMount(){
        let aTop = new Array(asset.top[this.state.topType].length).fill(false)
        let aHair = new Array(asset.hair.length).fill(false)
        let aEyes = new Array(asset.eyes.length).fill(false)
        let aHears = new Array(asset.hearts.length).fill(false)

        aTop[this.state.top] = true
        aHair[this.state.hair] = true
        aEyes[this.state.eyes] = true
        aHears[this.state.hearts] = true

        this.setState({
            aTop: aTop,
            aHair: aHair,
            aEyes: aEyes,
            aHears: aHears,
        })
    }

    handleChange = (name, value)=>{
        console.log(name, value)
        switch(name){
            case "top":
                let aTop = new Array(asset.top[this.state.topType].length).fill(false)
                aTop[value] = true
                this.setState({
                    aTop: aTop,
                    top: value
                })
                break;
            case "hair":
                let aHair = new Array(asset.hair.length).fill(false)
                aHair[value] = true
                this.setState({
                    aHair: aHair,
                    hair: value
                })
                break;
            case "eyes":
                let aEyes = new Array(asset.eyes.length).fill(false)
                aEyes[value] = true
                this.setState({
                    aEyes: aEyes,
                    eyes: value
                })
                break;
            case "hearts":
                let aHears = new Array(asset.hearts.length).fill(false)
                aHears[value] = true
                this.setState({
                    aHears: aHears,
                    hearts: value
                })
                break;
            case "topType":
                this.setState({
                    topType: value
                })
                break;
        }
    }

    url2Base64 = (src) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = 'Anonymous';
            img.onload = () => {
                const canvas = createCanvas(320, 320);
                const ctx = canvas.getContext('2d');
                let dataURL;
                ctx.drawImage(img, 0, 0);
                dataURL = canvas.toDataURL();
                return resolve(dataURL);
            };
    
            img.onerror = reject
            img.src = src
        })
    }

    wrapText = (context, text, x, yy, maxWidth, lineHeight, maxLines) => {
        var words = text.split(' ');
        var line = '';
        var height = lineHeight;
        for(var n = 0; n < words.length; n++) {
            var testLine = line + words[n] + ' ';
            var metrics = context.measureText(testLine);
            var testWidth = metrics.width;
            if (testWidth > maxWidth && n > 0) {
              line = words[n] + ' ';
              height += lineHeight;
            }
            else {
              line = testLine;
            }
        }
    
        height = height/2;
        var y = yy - height + lineHeight;
        line = '';
        
        let lines = []

        for(var n = 0; n < words.length; n++) {
          var testLine = line + words[n] + ' ';
          var metrics = context.measureText(testLine);
          var testWidth = metrics.width;
          if (testWidth > maxWidth && n > 0) {
            lines.push(line)
            //context.fillText(line, x, y);
            line = words[n] + ' ';
            //y += lineHeight;
          }
          else {
            line = testLine;
          }
        }
        lines.push(line)
        //context.fillText(line, x, y);
        if (lines.length > maxLines){
            lines = lines.splice(lines.length-maxLines, lines.length)
            y = yy - lineHeight
        }
        console.log(y)
        console.log(lines)
        for (const li of lines){
            context.fillText(li, x, y);
            y += lineHeight;
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

    handleCreate = async () =>{
        this.setState({
            openBD:true,
            imgResult: null
        })
        const {top,hair,eyes,hearts,topType} = this.state
        const itop = await this.url2Base64(asset.top[topType][top])
        const ihair = await this.url2Base64(asset.hair[hair])
        const ieyes = await this.url2Base64(asset.eyes[eyes])
        const ihearts = await this.url2Base64(asset.hearts[hearts])
        const ibase = await this.url2Base64(asset.base)
        const itexBox = await this.url2Base64(asset.textBox)
        
        const text = this.state.text
        
        var gif = new GIF({
            workers: 2,
            quality: 10,
            background: null,
            transparent: "#fff",
        });

        const test = createCanvas(320, 320);
        const ctxs = test.getContext('2d');
        ctxs.fillText("haha", 0, 0);

        for (let step = 0; step < text.length; step+=2){
            const canvas = createCanvas(320, 320);
            const ctx = canvas.getContext('2d');

            const topImg = await loadImage(itop)
            const hairImg = await loadImage(ihair)
            const eyesImg = await loadImage(ieyes)
            const heartsImg = await loadImage(ihearts)
            const baseImg = await loadImage(ibase)
            const texBoxImg = await loadImage(itexBox)

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(texBoxImg,0,0)
            ctx.drawImage(eyesImg,0,0)
            ctx.drawImage(baseImg,0,0)
            ctx.drawImage(topImg,0,0)
            ctx.drawImage(hairImg,0,0)
            ctx.drawImage(heartsImg,0,0)
            // 45 39 270 94
            ctx.textAlign = "start";
            ctx.fillStyle = "black";
            ctx.font = '12px Montserrat';

            this.wrapText(ctx, text.slice(0,step), 45, 51, 230, 18, 4);
            gif.addFrame(canvas, {delay: 100});
        }

        gif.on('finished', (blob) => {
            var reader = new FileReader();
            reader.readAsDataURL(blob); 
            reader.onloadend = () => {
                var base64data = reader.result;
                this.setState({
                    imgResult: base64data
                })
            }
        });
        
        gif.render();
    }

    handleDownload = () =>{
        var elem = window.document.createElement('a');
        elem.href = this.state.imgResult
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

    test = () =>{
        const text = "I Am One With the Force and the Force Is With Me, I Am One With the Force and the Force Is With Me, I Am One With the Force and the Force Is With Me"
        for (let step = 0; step < text.length; step+=2) {
            console.log(text.slice(0, step))
        }
    }

    handleTChange = (event) => {
        this.setState({ 
            text : event.target.value
        });   
    }

    handleClose = () =>{
        this.setState({openBD: false})
    }

    handleClose2 =(event) =>{
        if(event.target === event.currentTarget) {
            this.setState({openView: false})
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

    uploadProfile = (uid, data) =>{
        personService.saveProfiles(uid, data)
            .then(response => {
                console.log(response.data);
                this.setState({saving: false})
                this.handleSBClick("Đã lưu thành công!", "success")
                this.props.router.reload()
            })
            .catch(e=> {
                console.log(e);
                this.handleSBClick("Có lỗi xảy ra vui lòng thử lại!", "error")
            });
    }

    handleSave = () => {
        const imgurID = clientID.clientID[0]
        const uid = firebase.auth().currentUser.uid
        this.setState({saving: true}, () =>{
            this.uploadImage(this.state.imgResult, imgurID)
            .then((imageLink) => {
                console.log(imageLink)
                if (imageLink){
                    const data = {
                        uid: uid,
                        gifCharacter: imageLink
                    }
                    this.uploadProfile(uid, data)
                }
            })
        })        
    }

    

    handleSBClick = (message, severity) => {
        this.handleSBClose()
        this.setState({openSB: true, messageSB: message, severitySB: severity})
    }

    handleSBClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({openSB: false})
    } 
    
    render(){
        
        let saveButton = (<ColorButton onClick={this.handleSave}>Lưu</ColorButton>)
        if (this.state.saving){
            saveButton = (
                <ColorButton disabled >
                    Lưu
                </ColorButton>)
        }
        return(<>
            <Box sx={{
                mt: "30px",
                boxShadow: 2,
                backgroundColor: "white",
                borderRadius: 2
            }}>
                <Box id="characterContainer">
                <Box
                    sx={{
                        width: "100%",
                        paddingTop: "80%",
                        position: "relative",
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
                        <Box className="characterE characterEyes">
                            <CImg className={""} img="https://i.imgur.com/fOSC5kh.png" /> 
                        </Box>

                        <Box className="characterE characterEyes">
                            {asset.eyes.map((el, i) => (
                                <CImg key={i} className={this.state.aEyes[i] ? "" : "disable"} img={el} /> 
                            ))}
                        </Box>
                        <Box className="characterE characterBase">
                            <CImg img={asset.base} />
                        </Box>
                        <Box className="characterE characterTop">
                            {asset.top[this.state.topType].map((el, i) => (
                                <CImg key={i} className={this.state.aTop[i] ? "" : "disable"} img={el} /> 
                            ))}
                        </Box>
                        <Box className="characterE characterHair">
                            {asset.hair.map((el, i) => (
                                <CImg key={i} className={this.state.aHair[i] ? "" : "disable"} img={el} /> 
                            ))}
                        </Box>
                        <Box className="characterE characterHearts">
                            {asset.hearts.map((el, i) => (
                                <CImg key={i} className={this.state.aHears[i] ? "" : "disable"} img={el} /> 
                            ))}
                        </Box>
                    </Box>
                </Box>
                </Box>
                <Box id="characterSelect">
                    <LRselect
                        name="topType"
                        value={this.state.topType}
                        title={["Áo dài", "Áo sơ mi"]}
                        onChange={this.handleChange}
                    />
                    <LRselect
                        name="top"
                        value={this.state.top}
                        title={["Áo 1", "Áo 2", "Áo 3", "Áo 4"]}
                        onChange={this.handleChange}
                    />
                    <LRselect
                        name="hair"
                        value={this.state.hair}
                        title={["Tóc 1", "Tóc 2"]}
                        onChange={this.handleChange}
                    />
                    <LRselect
                        name="eyes"
                        value={this.state.eyes}
                        title={["Màu mắt 1", "Màu mắt 2"]}
                        onChange={this.handleChange}
                    />
                    <LRselect
                        name="hearts"
                        value={this.state.hearts}
                        title={["Màu tym 1", "Màu tym 2", "Màu tym 3", "Màu tym 4"]}
                        onChange={this.handleChange}
                    />
                    <Box
                        sx = {{ mt: "10px", display: "flex", width:"100%", justifyContent:"center"}}>
                        <CssTextField
                            value={this.state.text}
                            onChange={this.handleTChange}
                            multiline
                            maxRows={4}
                            required
                            label="Lời chúc của bạn"
                            variant="outlined" 
                            sx = {{width:"85%"}}
                        />
                    </Box>
                    <Box sx={{width:"100%", display: "flex", justifyContent:"center", mt:"5px", mb:"5px"}}>
                    <ColorButton onClick={this.handleCreate}>Tạo</ColorButton>
                    
                            

                    </Box>
                </Box>
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={this.state.openBD}
                    onClick={this.handleClose2}
                >
                    {this.state.imgResult ?
                        <>
                            <Box sx={{width:"320px", backgroundColor: "white", borderRadius: 2, position:"relative"}}>
                                
                                <Box sx={{  position: "absolute",
                                            top: 0,
                                            cursor: "pointer",
                                            left: 0,
                                            display: "flex"
                                        }}
                                >   
                                        <CancelIcon sx={{color: "#1b4338"}} onClick={this.handleClose}/>
                                </Box>

                                <CImg img = {this.state.imgResult} className="" />
                                <Box sx={{m: "5px", display: "flex", justifyContent:"space-between"}}>
                                    {saveButton}
                                    <ColorButton onClick={this.handleDownload}>Tải</ColorButton>
                                </Box>
                            </Box>
                        </>
                        :
                        <Box sx={{display: "flex", flexDirection: "column", justifyContent:"center"}}>
                            <Box sx={{m:"auto"}}>
                            <CircularProgress color="inherit" />
                            </Box>
                            <Typography>Bạn ơi đợi tí, mình đang load xí</Typography>
                        </Box>
                    }
                </Backdrop>
                <CTSnackbar 
                    handleClick ={this.handleSBClick}
                    open = {this.state.openSB}
                    handleClose = {this.handleSBClose}
                    message = {this.state.messageSB}
                    severity = {this.state.severitySB}
                />
            </Box>
        </>)
    }
}

export default withRouter(CharacterCreator)