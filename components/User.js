import { Component } from "react";
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import withFirebaseAuth from 'react-with-firebase-auth'
import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './firebaseConfig';
import personService from '../Services/person.service'

import {getAuth} from 'firebase/auth'

class User extends Component{
    constructor(props){
        super(props)
        this.state = {
            settingsLogged : ['Profile', 'Logout'],
            settingsNotLogged: ['Sign in with Google'],
            anchorElUser : false,
            logged: false
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
                console.log(response);
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
        this.checkNewUser()
    }
    
    signOut = () =>{
        this.props.signOut()
        console.log("check user", this.props.user)
    }
    
    render(){
        let settings = (this.state.logged) ? this.state.settingsLogged : this.state.settingsNotLogged
        return(
        <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={this.handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
                    <MenuItem onClick={this.handleCloseNavMenu}>
                        <Typography onClick = {this.signIn} textAlign="center">Thông tin cá nhân</Typography>
                    </MenuItem>
                    <MenuItem onClick={this.handleCloseNavMenu}>
                        <Typography onClick = {this.signIn} textAlign="center">Điền kết quả</Typography>
                    </MenuItem>
                    <MenuItem onClick={this.handleCloseNavMenu}>
                        <Typography onClick = {this.signOut} textAlign="center">Đăng xuất</Typography>
                    </MenuItem>
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