import {Component} from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { alpha, styled } from '@mui/material/styles';
import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual';

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


class Gd4El extends Component {
    constructor(props) {
        super(props)
        this.state = {

            file: null,
        }
    }

    componentDidMount () {
    }

    handleTextChange = (event) => {
        this.props.onChange(this.props.index, 'text', event.target.value)
    }

    handleDivclick = (e) => {
        this.inputElement.click();
    }

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
            ///console.log(baseURL);
            return resolve(baseURL);
          };
          console.log(fileInfo);
        });
    };
    
    profilePicChange = (fileChangeEvent) => {
        const file = fileChangeEvent.target.files[0];
        console.log(file)
        this.getBase64(file).then((img64) => {            
            this.props.onChange(this.props.index, 'images', img64)
        })
    };

    render () {
        return (<>
            <Accordion
                sx={{
                    width: "100%"
                }}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography fontWeight={"bold"}>{this.props.title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Box>
                        <ColorButton onClick={this.handleDivclick} variant="contained" startIcon={<PhotoSizeSelectActualIcon />}>
                            Chọn ảnh
                        </ColorButton>
                        {this.props.image &&
                            <div 
                                style={{marginTop: "5px"}}
                                dangerouslySetInnerHTML={{ 
                                    __html: `<img preload class="" style="max-height: 200px;" src="${this.props.image}" />` 
                            }} />
                        }
                        <CssTextField
                            label="Cảm nghĩ của bạn"
                            value={this.props.text}
                            onChange={this.handleTextChange}
                            sx={{
                                mt: "10px",
                                width:"100%"
                            }}
                        />
                    </Box>
                </AccordionDetails>
            </Accordion>
            
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
        </>)
    }
}

export default Gd4El