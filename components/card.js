
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
                    <Box sx={{width:"100%"}} onClick={this.handleOpen}>
                        <CardMedia
                            component="img"
                            image={this.props.image}
                            alt="green iguana"
                        />
                        <Box sx={{mt:"5px"}}>
                            <Box sx={{display: "flex"}}>
                                <Avatar alt="Remy Sharp" src={this.props.user.avatar} />                        
                                <Box sx = {{ml: "10px"}}>
                                    <Typography sx={{ fontWeight: 'bold', fontSize: "15px" }} variant="subtitle2" component="div">
                                        {this.props.user.name}
                                    </Typography>
                                    <Typography sx={{ fontSize: "10px" }} paragraph={true} variant="caption" display="block">
                                        {this.props.user.cls}
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
                                sx={{ 
                                    backgroundColor: '#fff', 
                                    borderRadius: 3
                                }}
                            >   
                                <Box sx={{}}
                                >   
                                    <IconButton>
                                        <CancelIcon onClick={this.handleClose}/>
                                    </IconButton>
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
                                <Box id="ccc" sx={{width: "80vw"}}>
                                <Box
                                    sx={{
                                        width: "100%",
                                        paddingTop: "38%",
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
                                                <Avatar alt="Remy Sharp" src={this.props.user.avatar} />                        
                                                <Box sx = {{ml: "10px"}}>
                                                    <Typography sx={{ fontWeight: 'bold', fontSize: "15px" }} variant="subtitle2" component="div">
                                                        {this.props.user.name}
                                                    </Typography>
                                                    <Typography sx={{ fontSize: "10px" }} paragraph={true} variant="caption" display="block">
                                                        {this.props.user.cls}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                            <Box sx={{overflow: 'auto', border: 1, borderColor: 'grey.500',borderRadius: 2}}>
                                                <Typography sx = {{m:"20px"}}>{this.props.text}</Typography>
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
                                        ml:"14px",
                                        mb:"14px",
                                        mt:"14px",
                                        mr:"14px"
                                    }}
                                >
                                    <Box sx={{}}>
                                            <div 
                                                dangerouslySetInnerHTML={{ 
                                                    __html: `<img class="cardI" style=" width: 100%;border-radius: 8px;" src="${this.props.image}" />` 
                                            }} />
                                        </Box>
                                        <Box >
                                            
                                            <Box sx={{mt: "10px", display: "flex"}}>
                                                <Avatar alt="Remy Sharp" src={this.props.user.avatar} />                        
                                                <Box sx = {{ml: "10px"}}>
                                                    <Typography sx={{ fontWeight: 'bold', fontSize: "15px" }} variant="subtitle2" component="div">
                                                        {this.props.user.name}
                                                    </Typography>
                                                    <Typography sx={{ fontSize: "10px" }} paragraph={true} variant="caption" display="block">
                                                        {this.props.user.cls}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                            <Typography>{this.props.text}</Typography>
                                        </Box>

                                </Box>
                                <Typography sx={{textAlign: "center", fontSize: "9px", mb:"1px" }} paragraph={true} variant="caption" display="block">
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