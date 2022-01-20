import React, { Component } from 'react';
import AvatarCrop from './avatarCrop';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
//import ImageCrop from './ImageCrop';

import { alpha, styled } from '@mui/material/styles';

const ColorButton = styled(Button)({
    color: 'white',
    backgroundColor: '#1b4338',
    '&:hover': {
      backgroundColor: '#1b4338',
    },
});

class AvatarUpload extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            userProfilePic: '',
            editor: null,
            scaleValue: 1,
            openCropper: false,
        };

        this.imgscr = null;

        this.setEditorRef = this.setEditorRef.bind(this);
        this.onScaleChange = this.onScaleChange.bind(this);
        this.DataURLtoFile = this.DataURLtoFile.bind(this);
        this.profilePicChange = this.profilePicChange.bind(this);
        this.handleDivclick = this.handleDivclick.bind(this);
    }
    
    setEditorRef = editor => {
        this.setState({ editor:editor });
        this.props.cropImg(editor);
        console.log("ff")
    };
    
    onScaleChange = (e, data) => {
        const scaleValue =  parseFloat(data);
        this.setState({ scaleValue });
        console.log("ff")
    };
    
    DataURLtoFile = (dataurl, filename) => {
        let arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
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

    handleDivclick = (e) => {
        this.inputElement.click();
    }

    render(){
        return (
            <div>
                <div className="form-group imguploadfield">
                    <div style={{display:'flex', justifyContent:"center"}}>
                    {this.imgscr === null ?
                        <div className="" onClick={this.handleDivclick} 
                            style={{ 
                                cursor: "pointer", width: "145px", height: "145px", 
                                border: "1px solid #b2b2b2", borderRadius: "100%",
                                display: "flex", alignItems: "center", justifyContent: "center"
                            }}>
                            <div >Chọn ảnh</div>
                        </div> :
                        <div style={{textAlign:"center"}}>
                            <AvatarCrop
                                className="imgedit"
                                imageSrc={this.state.selectedImage}
                                setEditorRef={this.setEditorRef}
                                scaleValue={this.state.scaleValue}
                                onScaleChange={this.onScaleChange}
                            />
                            <ColorButton type="button" variant="contained" color="primary" onClick={this.handleDivclick}>Ảnh khác</ColorButton>
                            <div className="inputRange">
                                <div>Điều chỉnh thanh kéo để phóng to</div>
                                <Slider
                                    value={this.state.scaleValue} 
                                    min={1} 
                                    max={10}
                                    step={0.2}
                                    sx={{color:"#1b4338"}}
                                    onChange={this.onScaleChange} 
                                />
                            </div>
                            
                        </div>
                    }
                    
                    </div>
                    
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
                    
                </div>
                
                
            </div>
        );
    }
}

export default AvatarUpload;