import { Component } from "react";
import Button from '@mui/material/Button';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import PageWrapper from "../components/PageWrapper";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import clan from "../components/clan.json"
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import AvatarUpload from "../components/avatarEdit/avatarUpload";
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import Fab from '@mui/material/Fab';
import Popover from "@mui/material/Popover";


const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }));

class UserModify extends Component{

    constructor(props){
        super(props)

        this.state = {
            email: '',
            phone: '',
            Name: '',
            cls: '',
            clan: '',
            mssv: '',
            khoaList: null,
            avatar: 'https://lh3.googleusercontent.com/a-/AOh14Gh-fmWjNqdBZKiwv2CdaiV5Kx8n6XePHSO5QwdQ=s96-c',
            anchorEl: null,
            openAvatarEditor: false
        }
    }

    componentDidMount(){
        console.log(clan.Khoa)
        this.setState({khoaList: clan.Khoa})
    }

    handleChange = (event) => {
        this.setState({ 
            [event.target.name] : event.target.value
        });
        
    }
    
    cropImgHandle = (editor) => {
        this.setState({avatarEditor: editor});
    } 

    handleChange2 = (event) =>{
        console.log(event.target.value)
        this.setState({ clan: event.target.value})
    }

    handleAvatarClick = (event) => {
        this.setState({openAvatarEditor : true});
    };
  
    handleAvatarClose = () => {
        this.setState({openAvatarEditor : false});
    };

    setAvatar = () =>{
        let avatarURL = this.state.avatarEditor.getImageScaledToCanvas().toDataURL();
        this.setState({avatar : avatarURL});
        this.handleAvatarClose();
    }

    handleSubmit = () => {
        // your submit logic
    }

    render() {
        const { email, Name, phone, clan, mssv, cls, khoaList, anchorEl, openAvatarEditor, avatar } = this.state;

        return (
            <div>
            <PageWrapper>
                <div id = "contentWrapper"
                    style = {{
                        maxWidth: "800px",
                        marginLeft: "auto",
                        marginRight: "auto",
                        paddingTop: "20px"
                    }}
                >
                    <FormControl >
                        <Box sx = {{
                                mt: "20px",
                                ml: "auto",
                                mr: "auto",
                            }}>
                            <Badge
                                overlap="circular"
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                badgeContent={
                                    <Fab size="small"  aria-label="edit avatar" onClick={this.handleAvatarClick}>
                                        <CameraAltIcon />
                                    </Fab>
                                }
                            >                            
                                <Avatar 
                                    alt="Travis Howard" 
                                    src= {avatar}
                                    sx={{
                                        width: "100px",
                                        height: "100px",
                                        border: 1,
                                        borderColor: 'grey.500'
                                    }}
                                    />
                            </Badge>
                        </Box>

                        

                        <div className = "containerForm">

                            <TextField
                                className = "tiems"
                                label="Tên"
                                onChange={this.handleChange}
                                name="Name"
                                value={Name}
                                variant="outlined" 
                                sx = {{mt: "20px"}}
                            />

                            <TextField
                                className = "tiems"
                                label="MSSV"
                                onChange={this.handleChange}
                                name="mssv"
                                value={mssv}
                                variant="outlined" 
                                sx = {{mt: "20px"}}
                            />
                            
                            <TextField
                                className = "tiems"
                                label="Lớp - Khóa"
                                onChange={this.handleChange}
                                name="cls"
                                value={cls}
                                variant="outlined" 
                                sx = {{mt: "20px"}}
                            />
                            
                            <TextField
                                className = "tiems"
                                select
                                label="Khoa"
                                onChange={this.handleChange2}
                                name="clan"
                                value={clan}
                                variant="outlined" 
                                sx = {{mt: "20px"}}
                            >
                                {khoaList && khoaList.map((khoa, index) => (
                                    <MenuItem value={khoa.value} key={index}>{khoa.label}</MenuItem>
                                ))}  
                            </TextField>

                            <TextField
                                className = "tiems"
                                label="Số điện thoại"
                                onChange={this.handleChange}
                                name="phone"
                                value={phone}
                                variant="outlined" 
                                sx = {{mt: "20px"}}
                            />

                            <TextField
                                className = "tiems"
                                label="Email"
                                onChange={this.handleChange}
                                name="email"
                                value={email}
                                variant="outlined" 
                                sx = {{mt: "20px"}}
                            />
                        </div>
                        
                        <Button 
                            type="submit" 
                            variant="contained" 
                            sx = {{
                                mt: "20px",
                                width:"100px",
                                ml: "auto",
                                mr: "auto"
                            }}>Lưu</Button>

                    </FormControl>
                </div>
                
            </PageWrapper>
            {openAvatarEditor &&
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
            >
                <Box 
                    sx={{ 
                        backgroundColor: '#fff', 
                        borderRadius: 5
                    }}
                >
                    <Box 
                        sx={{
                            pt: "20px",
                            pb: "20px",
                            pl: "20px",
                            pr: "20px",
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                        }}
                    >
                        <AvatarUpload
                            cropImg={this.cropImgHandle} 
                        />
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-around',
                                mt: "10px"
                            }}
                        >
                            <Button sx={{mr:"10px"}} onClick={this.setAvatar} variant="contained" >Lưu</Button>
                            <Button sx={{ml:"10px"}} onClick={this.handleAvatarClose} variant="contained" >Hủy</Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
            }
        </div>
        );
    }
}

export default UserModify