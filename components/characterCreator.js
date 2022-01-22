import {Component} from "react"
import Box from '@mui/material/Box';
import { createCanvas, loadImage, registerFont } from 'canvas'
import asset from "./characterAsset.json"
import CImg from "./ccImg"
import LRselect from "./lrSelect";
import Button from '@mui/material/Button';
import {styled } from '@mui/material/styles';
import GIF from './gif/gif'

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
            aTop:[],
            aHair:[],
            aEyes:[],
            aHears:[],
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

    wrapText = (context, text, x, y, maxWidth, lineHeight) => {
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
        var y = y - height + lineHeight;
        line = '';
    
        for(var n = 0; n < words.length; n++) {
          var testLine = line + words[n] + ' ';
          var metrics = context.measureText(testLine);
          var testWidth = metrics.width;
          if (testWidth > maxWidth && n > 0) {
            context.fillText(line, x, y);
            line = words[n] + ' ';
            y += lineHeight;
          }
          else {
            line = testLine;
          }
        }
        context.fillText(line, x, y);
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
        const {top,hair,eyes,hearts,topType} = this.state
        const itop = await this.url2Base64(asset.top[topType][top])
        const ihair = await this.url2Base64(asset.hair[hair])
        const ieyes = await this.url2Base64(asset.eyes[eyes])
        const ihearts = await this.url2Base64(asset.hearts[hearts])
        const ibase = await this.url2Base64(asset.base)
        const itexBox = await this.url2Base64(asset.textBox)
        
        const text = "I Am One With the Force and the Force Is With Me, I Am One With the Force and the Force Is With Me, I Am One With the Force and the Force Is With Me"
        
        var gif = new GIF({
            workers: 2,
            quality: 10
        });

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

            this.wrapText(ctx, text.slice(0,step), 45, 51, 230, 18);
            gif.addFrame(canvas, {delay: 100});
        }

        gif.on('finished', function(blob) {
            var reader = new FileReader();
            reader.readAsDataURL(blob); 
            reader.onloadend = function() {
                var base64data = reader.result;                
                //console.log(base64data);
                var elem = window.document.createElement('a');
                elem.href = base64data
                elem.download = "hihi.gif";
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
        
        gif.render();
    }

    test = () =>{
        const text = "I Am One With the Force and the Force Is With Me, I Am One With the Force and the Force Is With Me, I Am One With the Force and the Force Is With Me"
        for (let step = 0; step < text.length; step+=2) {
            console.log(text.slice(0, step))
        }
    }

    render(){
        
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
                            {asset.eyes.map((el, i) => (
                                <CImg className={this.state.aEyes[i] ? "" : "disable"} img={el} /> 
                            ))}
                        </Box>
                        <Box className="characterE characterBase">
                            <CImg img={asset.base} />
                        </Box>
                        <Box className="characterE characterTop">
                            {asset.top[this.state.topType].map((el, i) => (
                                <CImg className={this.state.aTop[i] ? "" : "disable"} img={el} /> 
                            ))}
                        </Box>
                        <Box className="characterE characterHair">
                            {asset.hair.map((el, i) => (
                                <CImg className={this.state.aHair[i] ? "" : "disable"} img={el} /> 
                            ))}
                        </Box>
                        <Box className="characterE characterHearts">
                            {asset.hearts.map((el, i) => (
                                <CImg className={this.state.aHears[i] ? "" : "disable"} img={el} /> 
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
                    <Box sx={{width:"100%", display: "flex", justifyContent:"center", mt:"5px", mb:"5px"}}>
                    <ColorButton onClick={this.handleCreate}>Tạo</ColorButton>
                    <CImg className="" img="https://i.imgur.com/5l7svdm.gif"/>
                    </Box>
                </Box>
            </Box>
        </>)
    }
}

export default CharacterCreator