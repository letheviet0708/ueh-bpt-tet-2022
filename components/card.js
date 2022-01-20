
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

class CardImg extends Component{
    constructor(props){
        super(props)
        this.state={
            openView: false
        }
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

    render(){
        return(<>
                <Box className="cardimg">
                    <Box sx={{width:"100%", cursor: "pointer"}} onClick={this.handleOpen}>
                        <Tooltip title="Xem" arrow>
                            <CardMedia
                                component="img"
                                image={this.props.image}
                                alt="green iguana"
                            />
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
                                {/* 
                                <div 
                                    className="smallScreen"
                                    style={{
                                        position: "absolute", 
                                        width: "25%",
                                        bottom:"35px",
                                        zIndex: "0", 
                                        right: "40px"}}
                                    dangerouslySetInnerHTML={{ 
                                        __html: `<img class="cardI" style="width: 100%; " src="https://i.imgur.com/reIC3t3.png" />` 
                                    }} />*/}
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
                                            <Box className="imgCard">
                                                <div 
                                                    dangerouslySetInnerHTML={{ 
                                                        __html: `<img class="cardI" style=" width: 100%;border-radius: 8px;" src="${this.props.image}" />` 
                                                }} />
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
                                                <Box sx={{ marginTop: "15px", overflow: 'auto', border: 1, borderColor: 'grey.500',borderRadius: 2}}>
                                                    <p style = {{margin:"20px", textAlign:"left", color:"white", fontSize: "smaller"}}>{this.props.text}</p>
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

                                        <Box sx={{}}>
                                            <div 
                                                dangerouslySetInnerHTML={{ 
                                                    __html: `<img class="cardI" style=" width: 100%;border-radius: 8px;" src="${this.props.image}" />` 
                                            }} />
                                        </Box>
                                        <Box >
                                            <Box sx={{/*mt: "10px",*/ display: "flex"}}>
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
                                            <p style = {{margin:"0px", textAlign:"left", color:"white", fontSize: "smaller"}}>{this.props.text}</p>
                                        </Box>
                                    </Box>
                                </Box>
                                <Typography sx={{color: "#ff9933", textAlign: "center", fontSize: "9px", mb:"1px" }} paragraph={true} variant="caption" display="block">
                                    Chúc lời yêu thương - Tết mới 2022
                                </Typography>
                            </Box>
                        </Box>
                    }
                </Box>
        </>)
    }
}

export default CardImg