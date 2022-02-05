
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { Component } from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CancelIcon from '@mui/icons-material/Cancel';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import Divider from '@mui/material/Divider';
import { alpha, styled } from '@mui/material/styles';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import FixedBox from './fixedBox'
const titles = ["Giao Thừa","Mùng 1","Mùng 2","Mùng 3"]

const CustomDivider = styled(Divider)({
    "&.MuiDivider-root": {
        "&::before": {
          borderTop: "solid #ff9933"
        },
        "&::after": {
          borderTop: "solid #ff9933"
        }
      }
});

const boder = "2px solid white"

class CardGD4 extends Component{
    constructor(props){
        super(props)
        this.state={
            openView: false,
            currentI: 0,
        }
    }

    handleNav = (i) =>{
        let value = this.state.currentI + i
        if (value < 0) {
            console.log("<0")
            value = titles.length-1
        }
        if (value > titles.length-1) {
            value = 0
        }
        this.setState({ currentI: value })
    }

    handleClose2 =(event) =>{
        if(event.target === event.currentTarget) {
            this.setState({openView: false})
        }
    }
    
    handleClose =(event) =>{
            this.setState({openView: false})
    }

    handleOpen =() =>{
        this.setState({openView: true})
    }

    resizeImgURL = (link, post) => {
        const arr = link.split('.')
        let res =  arr[0]+'.'+arr[1]+'.'+arr[2]+ post + '.'+arr[3]
        return res
    }

    render(){
        let imgLink = this.props.images.slice()
        for (const i in imgLink){
            imgLink[i] = this.resizeImgURL(this.props.images[i], 'l')
        }
        //console.log(this.props.image,img)
        return(<>
                <Box className="cardimg">
                    <Box sx={{width:"100%", cursor: "pointer"}} onClick={this.handleOpen}>
                        <Tooltip title="Xem" arrow>
                            <Box>
                                <FixedBox
                                    width = {"100%"}
                                    height = {"75%"}
                                >
                                    <Box
                                        sx={{
                                            width: "100%",
                                            height: "100%",
                                            display: "flex",
                                            border: "2px solid white",
                                            overflow: "hidden"
                                        }}
                                    >
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    flex: "0 0 75%"
                                                }}
                                            >
                                                <div
                                                    style = {{
                                                        width: "100%",
                                                        height: "100%",
                                                        borderRight: boder
                                                    }}
                                                    dangerouslySetInnerHTML={{ 
                                                        __html: `<img class="cardI" style=" height: 100%;width: 100%; object-fit: cover" src="${this.resizeImgURL(this.props.images[0], 'l')}" />` 
                                                }} />
                                            </Box>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    width: "100%",
                                                    height: "100%"
                                                }}
                                            >
                                                <FixedBox
                                                    width = {"100%"}
                                                    height = {"100%"}
                                                >
                                                    <div
                                                        style = {{
                                                            flex: "0 0 33.333333%",
                                                            width: "100%",
                                                            height: "100%",
                                                            borderBottom: boder
                                                        }}
                                                        dangerouslySetInnerHTML={{ 
                                                            __html: `<img class="cardI" style=" height: 100%;width: 100%; object-fit: cover" src="${this.resizeImgURL(this.props.images[1], 'l')}" />` 
                                                    }} />
                                                </FixedBox>
                                                
                                                <FixedBox
                                                    width = {"100%"}
                                                    height = {"100%"}
                                                >
                                                    <div
                                                        style = {{
                                                            flex: "0 0 33.333333%",
                                                            width: "100%",
                                                            height: "100%",
                                                            borderBottom: boder
                                                        }}
                                                        dangerouslySetInnerHTML={{ 
                                                            __html: `<img class="cardI" style=" height: 100%;width: 100%; object-fit: cover" src="${this.resizeImgURL(this.props.images[2], 'l')}" />` 
                                                    }} />
                                                </FixedBox>

                                                <FixedBox
                                                    width = {"100%"}
                                                    height = {"100%"}
                                                >
                                                    <div
                                                        style = {{
                                                            flex: "0 0 33.333333%",
                                                            width: "100%",
                                                            height: "100%",
                                                        }}
                                                        dangerouslySetInnerHTML={{ 
                                                            __html: `<img class="cardI" style=" height: 100%;width: 100%; object-fit: cover" src="${this.resizeImgURL(this.props.images[3], 'l')}" />` 
                                                    }} />
                                                </FixedBox>
                                            </Box>
                                    </Box>

                                </FixedBox>
                            </Box>
                        </Tooltip>
                        <Box sx={{mt:"5px"}}>
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
                        </Box>
                        <CardActions>
                        </CardActions>
                    </Box>

                    {this.state.openView &&
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
                            onClick={this.handleClose2}
                        >
                            <Box 
                                className="viewCard"
                                sx={{ 
                                    borderRadius: 3,                                    
                                    position: "relative",
                                }}
                            >   
                                <Box sx={{ mt: "-7px"}}
                                >   
                                        <CancelIcon sx={{color:"#ff9933"}} onClick={this.handleClose}/>
                                </Box>
                                <Box 
                                    className="wideScreen">
                                <Box 
                                    sx={{
                                        //pb: "20px",
                                        pl: "20px",
                                        pr: "20px",
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                    }}
                                >
                                <Box id="ccc" sx={{
                                    width: "80vw", 
                                    border:2, 
                                    borderRadius: 3, 
                                    borderColor: "#ff9933" }}>
                                <Box sx={{
                                        width: "100%",
                                        padding: "12px"}}>
                                    <Box
                                        sx={{
                                            width: "100%",
                                            paddingTop: "38%",
                                            position: "relative",
                                            margin: "10px"
                                        }}
                                        id="aaa"
                                    >
                                    <div 
                                        style={{
                                            position: "absolute", 
                                            height: "50%",
                                            top:"-46px", 
                                            right: "-22px"}}
                                        dangerouslySetInnerHTML={{ 
                                            __html: `<img class="cardI" style="height: 129%; " src="https://i.imgur.com/d2NQqqD.png" />` 
                                    }} />
                                        <Box
                                            sx={{
                                                position: "absolute",
                                                top: 0, 
                                                left: 0,
                                                width: "100%",
                                                height: "100%",
                                                display: 'flex',
                                                justifyContent: 'space-around'
                                            }}
                                        >
                                            <Box className="imgCard" sx={{
                                                width: "100%",
                                                height: "100%",
                                                border:2, 
                                                borderRadius: 3, 
                                                borderColor: "#ff9933" ,
                                                backgroundColor: "black",
                                                position: "relative",
                                                overflow: "hidden"
                                            }}>
                                                <div 
                                                    style ={{
                                                        width: "100%",
                                                        height: "100%",
                                                    }}
                                                    dangerouslySetInnerHTML={{ 
                                                        __html: `<img class="cardI" style=" height: 100%;width: 100%; object-fit: scale-down" src="${this.resizeImgURL(this.props.images[this.state.currentI], 'l')}" />` 
                                                }} />

                                                <Box class="inviciblee" style={{
                                                        display: "flex",
                                                        zIndex: 1,
                                                        position: "absolute",
                                                        top: 0,
                                                        width: "100%",
                                                        height: "100%",
                                                        display: "flex",
                                                        justifyContent: "space-between",
                                                    }}>
                                                    <Box id="navLeft" style={{position:"relative"}} onClick={() => this.handleNav(-1)}>
                                                        <Box style={{position: "relative", transform: "translateY(-50%)", top: "50%"}}>
                                                            <IconButton >
                                                                <KeyboardArrowLeftIcon fontSize="large" style={{color: "#ff9933"}}/>
                                                            </IconButton>
                                                        </Box>
                                                    </Box>
                                                    
                                                    <Box id="navRight" style={{position:"relative"}} onClick={() => this.handleNav(1)}>
                                                        <Box style={{position: "relative", transform: "translateY(-50%)", top: "50%"}}>
                                                            <IconButton >
                                                                <KeyboardArrowRightIcon fontSize="large" style={{color: "#ff9933"}}/>
                                                            </IconButton>
                                                        </Box>
                                                    </Box>
                                                </Box>

                                            </Box>
                                            <Box className="imgText" style={{}}>
                                                
                                                <Box sx={{display: "flex"}}>
                                                    <Avatar sx={{ width: 56, height: 56 }} alt="Remy Sharp" src={this.props.user.avatar} />                        
                                                    <Box sx = {{ml: "10px"}}>
                                                        <Typography className="avaName" sx={{ fontWeight: 'bold', fontSize: "22px", color:"white", fontFamily: 'Montserrat'}} variant="subtitle2" component="div">
                                                            {this.props.user.name}
                                                        </Typography>
                                                        <Typography className="avaLop" sx={{ textAlign: 'left', fontWeight: 'light', fontSize: "14px", marginTop: "-7px", color:"#ff9933", fontFamily: 'Montserrat' }} paragraph={true} variant="caption" display="block">
                                                            {`${this.props.user.cls} - ${this.props.user.gen ? this.props.user.gen : ''}`}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                                <Typography sx={{ 
                                                    fontWeight: 'bold', 
                                                    fontSize: "20px", 
                                                    color: "#ff9933", 
                                                    fontFamily: 'Montserrat',
                                                    }} variant="subtitle2" component="div">
                                                        {titles[this.state.currentI]}
                                                </Typography>
                                                <Box sx={{ overflow: 'auto', border: 1, borderColor: 'grey.500',borderRadius: 2}}>
                                                    <p style = {{margin:"20px", textAlign:"left", color:"white", fontSize: "smaller"}}>{this.props.text[this.state.currentI]}</p>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                                </Box>
                                </Box>
                                </Box>
                                <Box
                                    className="smallScreen"
                                    sx={{
                                        width: "80vw",
                                        height: "80vh",
                                        maxHeight: "100%",
                                        overflow: "auto",
                                        border:2, 
                                        borderRadius: 3, 
                                        borderColor: "#ff9933",
                                        ml:"14px",
                                        mb:"14px",
                                        mt:"14px",
                                        mr:"14px",
                                        zIndex: 10
                                    }}
                                >                                    
                                    <Box
                                        sx={{
                                            maxHeight: "100%",
                                            m: "11px"
                                        }}
                                    >
                                        <Box sx={{/*mt: "10px",*/ display: "flex"}}>
                                            <Avatar  alt="Remy Sharp" src={this.props.user.avatar} />                        
                                            <Box sx = {{ml: "10px"}}>
                                                <Typography sx={{ fontWeight: 'bold', fontSize: "16px", color:"white", fontFamily: 'Montserrat'}} variant="subtitle2" component="div">
                                                        {this.props.user.name}
                                                </Typography>
                                                <Typography sx={{ 
                                                    textAlign: 'left', 
                                                    fontWeight: 'light', 
                                                    fontSize: "13px", 
                                                    mt: "-7px",  
                                                    mb: "0px", 
                                                    color:"#ff9933", 
                                                    fontFamily: 'Montserrat' 
                                                }} paragraph={true} variant="caption" display="block">
                                                    {`${this.props.user.cls} - ${this.props.user.gen ? this.props.user.gen : ''}`}
                                                </Typography>
                                            </Box>
                                        </Box>
                                        {titles.map((title, key) => (
                                            <Box key={key}>
                                                <CustomDivider >
                                                    <Typography sx={{ 
                                                        fontWeight: 'bold', 
                                                        fontSize: "20px", 
                                                        color: "#ff9933", 
                                                        fontFamily: 'Montserrat',
                                                        textAlign: "center"
                                                        }} variant="subtitle2" component="div">
                                                            {title}
                                                    </Typography>
                                                </CustomDivider>
                                                <Box sx={{}}>
                                                    <div 
                                                        dangerouslySetInnerHTML={{ 
                                                            __html: `<img class="cardI" style=" width: 100%;border-radius: 8px;" src="${this.props.images[key]}" />` 
                                                    }} />
                                                </Box>
                                                <Box >
                                                    <p style = {{margin:"0px", textAlign:"left", color:"white", fontSize: "smaller"}}>{this.props.text[key]}</p>
                                                </Box>
                                            </Box>
                                        ))}
                                        
                                    </Box>
                                </Box>
                                <Typography sx={{color: "#ff9933", textAlign: "center", fontSize: "9px", mb:"1px" }} paragraph={true} variant="caption" display="block">
                                    Album Tết mới trong tim - Tết mới 2022
                                </Typography>
                            </Box>
                        </Box>
                    }
                </Box>
        </>)
    }
}

export default CardGD4