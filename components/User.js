import { Component } from "react";
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PersonIcon from '@mui/icons-material/Person';
import RateReviewIcon from '@mui/icons-material/RateReview';
import LogoutIcon from '@mui/icons-material/Logout';

import withFirebaseAuth from 'react-with-firebase-auth'
import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './firebaseConfig';
import personService from '../Services/person.service'
import Link from 'next/link'


class User extends Component{
    constructor(props){
        super(props)
        this.state = {
            settingsLogged : ['Profile', 'Logout'],
            settingsNotLogged: ['Sign in with Google'],
            anchorElUser : false,
            logged: false,
            avatar: ''
        }
    }
    

    handleCloseUserMenu = () => {
        this.setState({anchorElUser : false});
    }

    handleOpenUserMenu = (event) => {
        this.setState({anchorElUser: true})
    }

    init = () => {
        console.log("bruh bruh")
        this.checkNewUser()
    }

    checkNewUser = () =>{
        personService.findOne(firebase.auth().currentUser.uid)
            .then(response => {
                if (response.data.data == null){
                    console.log("need create profile");
                    this.props.changePage('/userModify');
                }else{
                    this.setState({avatar: response.data.data.avatar})
                }
            })
            .catch(e=> {
                console.log(e);
            });
    }

    check = () => {
        if (this.props.user) {
          this.init();
          return;
        }
        setTimeout(this.check, 200);
    }

    componentDidMount(){
        this.check();
    }

    componentWillUnmount(){

    }

    signIn = () =>{
        console.log("bruh")
        this.props.signInWithGoogle()
        console.log("check user", this.props.user)
        this.check();
    }
    
    signOut = () =>{
        this.props.signOut().then(()=>{
            this.props.changePage("/");
        })
        console.log("check user", this.props.user)
    }

    
    
    render(){
        let settings = (this.state.logged) ? this.state.settingsLogged : this.state.settingsNotLogged
        return(
        <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={this.handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Ueher" src={this.state.avatar} />
              </IconButton>
            </Tooltip>

            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={this.state.anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={this.state.anchorElUser}
              onClose={this.handleCloseUserMenu}
            >

            {
                this.props.user ?
                <div>
                    <Link href="/userModify">
                    <MenuItem onClick={this.handleCloseNavMenu}>
                        <PersonIcon/><Typography sx={{ml:"5px"}} textAlign="center">Thông tin cá nhân</Typography>
                    </MenuItem>
                    </Link>
                    <Link href="/result">
                    <MenuItem onClick={this.handleCloseNavMenu}>
                        <RateReviewIcon/><Typography sx={{ml:"5px"}} textAlign="center">Điền kết quả</Typography>
                    </MenuItem>
                    </Link>
                    <Link href="/">
                    <MenuItem onClick={this.handleCloseNavMenu}>
                        <LogoutIcon/><Typography sx={{ml:"5px"}} onClick = {this.signOut} textAlign="center">Đăng xuất</Typography>
                    </MenuItem>
                    </Link>
                </div>
                :
                <div>
                    <MenuItem onClick={this.handleCloseNavMenu}>
                        <Typography onClick = {this.signIn} textAlign="center">Đăng nhập bằng Google</Typography>
                    </MenuItem>
                </div>
            }
            </Menu>
        </Box>
        )

    }

}

const firebaseApp = (firebase.apps.length) ? firebase.app() : firebase.initializeApp(firebaseConfig);
const firebaseAppAuth = firebaseApp.auth();
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};
export default withFirebaseAuth({
    providers,
    firebaseAppAuth,
})(User)