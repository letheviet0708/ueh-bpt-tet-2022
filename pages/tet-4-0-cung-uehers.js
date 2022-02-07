import PageWrapper from '../components/PageWrapper'
import styles from '../styles/Home.module.css'
import Banner from '../components/Banner';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SessionCard from "../components/sessionCard";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Link from 'next/link'
import { Component } from 'react'
import VideoCard from '../components/videoCard'
import firebase from 'firebase/app';
import personService from "../Services/person.service";
import Backdrop from '@mui/material/Backdrop';
import CancelIcon from '@mui/icons-material/Cancel';

const clone = 
{
  src: "BE_TNHk6eII",
  user:{
    avatar: "https://i.imgur.com/eFEF02p.png",
    name: "Lê Thế Việt",
    cls: "KHMT",
    gen: "K15"
  }
}

const cc = [clone, clone, clone]

class Tet40CungUehers extends Component {

  static async getInitialProps(ctx) {
    return {query : ctx.query}
  }


  constructor(props) {
    super(props)
    this.state = {
      ytPlayer: [],
      queryPlayer: null,
      user: null,
      likes: [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
      list: cc,
      queryIndex: null,
      openBD : false,
    }
  }

  handleClose = () => {
    this.state.queryPlayer.target.pauseVideo()
    this.setState({openBD: false})
  }

  handleView = () => {
    this.setState({openBD: true})
  }

  onReady = (e, index) =>{
    let arr = this.state.ytPlayer
    arr[index] = e
    this.setState({
      ytPlayer: arr
    })
  }

  getVoteData = () =>{
    personService.getVoteData()
      .then(response => {
        this.setState({likes: response.data})
      })
  }
  
  getUserInfor = () =>{
    console.log(firebase.auth().currentUser)
        personService.findOne(firebase.auth().currentUser.uid)
            .then(response => {
                let user = response.data.data
                console.log(user)
                
                this.setState({user: user})
            })
            .catch(e=> {
                console.log(e);
            });
  }

  init = () => {
      console.log("bruh bruh")
      this.getUserInfor()
  }

  check = () => {
      if (firebase.auth().currentUser) {
        this.init();
        return;
      }
      setTimeout(this.check, 200);
  }

  componentDidMount(){
      this.setState({
        ytPlayer: [null,null,null,null,null,null,null,null,null,null],
        list: cc
      })
      if (this.state.queryIndex){
        this.handleView()
      }
      if (this.props.query){
        this.setState({
          queryIndex: parseInt(this.props.query.queryIndex)
        },()=>{
          this.handleView()
        })
      }
      this.getVoteData()
      this.check()
  }

  onPlay = (e) =>{
    for (const player of this.state.ytPlayer){
      player.target.pauseVideo()
    }

    e.target.playVideo()
  }

  onStateChange= (e) =>{
    console.log(e.data)
    if (e.data == 1){
      for (const player of this.state.ytPlayer){
        if (player != null && player.target.id != e.target.id){
          player.target.pauseVideo()
          console.log('pause')
        }
      }
    }
  }

  onLike = (index) =>{
    console.log(index+1)
    personService.vote({uid: this.state.user.uid, vote: index+1})
    .then(response => {
      this.setState({likes: response.data.data, user: response.data.user})
    })
  }

  onReady2 = (e, index) =>{
    this.setState({
      queryPlayer: e
    })
  }
  onPlay2 = (e) =>{

  }

  render(){
    return (
      <div
          style={{
              position: "relative",
              zIndex: 0
          }}
      
      >
          <PageWrapper>
            <Banner/>
            <Box className="backGroundI">
                  <a className="anchor" id="view"/>
            <Box sx={{maxWidth: "1200px", mr: "auto", ml:"auto"}}>
              <Box sx={{ p: "20px"}}>
              <Box id="infomation">
                  <h1 style={{ textAlign: "center", color:"#ff9933", marginBottom: "23px"}}>TẾT 4.0 CÙNG UEHERS</h1>
                  <p  style={{ color: "white" }}>Hãy bình chọn cho thí sinh mà bạn yêu quý và cảm thấy xuất sắc nhất nhé!<br/>🎁 Cách thức tính điểm: 1 lượt like = 1 điểm<br/>⚡ Lưu ý: Mỗi tài khoản chỉ có 1 lượt like</p>
                  
                  <div className = "cardsWrapper">
                    {this.state.list.map((p, key) => (
                      <VideoCard 
                        onStateChange={this.onStateChange} 
                        onClick={this.onPlay} 
                        onReady={this.onReady} 
                        index = {key}
                        src={p.src} 
                        user = {p.user} 
                        likeCount = {this.state.likes[key+1]}
                        key={key}
                        currentUser={this.state.user}
                        onLike={this.onLike}
                      />
                    ))}
                  </div>

                </Box>
              </Box>
            </Box>
            </Box>
          </PageWrapper>

        
      <Box
      sx={{
          width: "100%",
          paddingTop: "15%",
          position: "absolute",
          bottom: 0
      }}
      >
        <div
          style={{
            position: "absolute",
            top: 0, 
            left: 0,
            display: "flex",
            height: "100%",
            justifyContent: "space-between",
            position: "absolute",
            width: "100%",  
            bottom: 0,
          }}
        >
          <div 
              style={{ flex: "0 0 20%", height: "100%"}}
              dangerouslySetInnerHTML={{ 
                  __html: `<img preload class="" style="height: 100%;" src="https://i.imgur.com/Y1gfUUX.png" />` 
          }} />

          <div 
              style={{ flex: "0 0 20%", height: "100%"}}
              dangerouslySetInnerHTML={{ 
                  __html: `<img preload class="" style="height: 100%;" src="https://i.imgur.com/EAyYCSI.png" />` 
          }} />
        </div>
      </Box>
      {this.state.queryIndex &&
        <Backdrop
              sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={this.state.openBD}
        >
          <Box>
            
            <Box sx={{ mt: "-7px"}}>   
                    <CancelIcon sx={{color:"#ff9933"}} onClick={this.handleClose}/>
            </Box>
            <VideoCard 
              onStateChange={this.onStateChange} 
              onClick={this.onPlay2} 
              onReady={this.onReady2} 
              index = {this.state.queryIndex-1}
              src={this.state.list[this.state.queryIndex-1].src} 
              user = {this.state.list[this.state.queryIndex-1].user} 
              likeCount = {this.state.likes[this.state.queryIndex]}
              currentUser={this.state.user}
              onLike={this.onLike}
            />
          </Box>
        </Backdrop>
      }

      </div>
    );
  }
}
export default Tet40CungUehers

