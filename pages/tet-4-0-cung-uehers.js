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
import Head from "next/head"

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

const cc = [
  {
    src: "O5ZKrl3cPXQ",
    user:{
      avatar: "https://i.imgur.com/5uRSM7A.png",
      name: "Văn Dương Thiên Lam",
      cls: "HM003",
      gen: "K47"
    }
  },
  {
    src: "OcIxpJPd_B0",
    user:{
      avatar: "https://lh3.googleusercontent.com/a/AATXAJz3s5yQQphMHiLwlqNzKJOQZpfwQbKm_jupUu3K=s96-c",
      name: "Phan Ngọc Phương Anh",
      cls: "BA001",
      gen: "K47"
    }
  },
  {
    src: "pzN1WAApuiU",
    user:{
      avatar: "https://lh3.googleusercontent.com/a-/AOh14Gg78jU60WC6g3sRflI1uK5RtZ8S_uAA_lowf4cQ=s96-c",
      name: "Nguyễn Hoàng Thanh Nhã",
      cls: "ADC03",
      gen: "K47"
    }
  },
  {
    src: "DhJ7w9cqF8I",
    user:{
      avatar: "https://lh3.googleusercontent.com/a/AATXAJyeRaKG3UcDhJYdlA33NgW_AcMNE-64hwW-6N7u=s96-c",
      name: "Ngô Thị Thảo Dung",
      cls: "NH001",
      gen: "K47"
    }
  },
  {
    src: "p7QLPWtyGFQ",
    user:{
      avatar: "https://lh3.googleusercontent.com/a-/AOh14GgneSmfwAXErhB9_T9FOQqAEcpT2Jr_Fj56h5zU=s96-c",
      name: "Hoàng Khánh Nhi",
      cls: "FB003",
      gen: "K47"
    }
  },
  {
    src: "4oWU-DXBsVw",
    user:{
      avatar: "https://lh3.googleusercontent.com/a-/AOh14Gh52bUuioDk_f7SSBeQkMoLvnCqSXhIJ8bVHz0v=s96-c",
      name: "Ngô Lê Thanh Thảo",
      cls: "IBC04",
      gen: "K47"
    }
  },
  {
    src: "EdpMdru9qhc",
    user:{
      avatar: "https://lh3.googleusercontent.com/a/AATXAJzsxQaDQwnMwT8tVAFjvsyc52_vMxB-ZU9OMntr=s96-c",
      name: "Phạm Trần Thanh Xuân",
      cls: "DT002",
      gen: "K47"
    }
  },
  {
    src: "NnRX9aolJgI",
    user:{
      avatar: "https://lh3.googleusercontent.com/a-/AOh14GiuAKMz5fN7O6TjBNv56WtMBeRxDho1n7n730mN0A=s96-c",
      name: "Huỳnh Kim Khánh",
      cls: "KNC04",
      gen: "K47"
    }
  },
  {
    src: "YiwcVWPBG0Q",
    user:{
      avatar: "https://lh3.googleusercontent.com/a/AATXAJzvrkJv6GtmmRtr2Isvd5fWvIcyKi1bS7pt9cMp=s96-c",
      name: "Lê Vũ Anh Thư",
      cls: "FNC05",
      gen: "K47"
    }
  },
  {
    src: "Mhpt9uNYVIk",
    user:{
      avatar: "https://lh3.googleusercontent.com/a/AATXAJxsuZ-_TbiiL9vgamw1D-z2LU4maoiZyiJuvHNu=s96-c",
      name: "Phạm Thị Mỹ Linh",
      cls: "KM002",
      gen: "K47"
    }
  },
]

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
    if (this.state.queryPlayer) {this.state.queryPlayer.target.pauseVideo()}
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
          <PageWrapper
            customMeta = {true}
          >
            <Head>
                <title>TẾT 4.0 CÙNG UEHERS</title>
                <meta property="og:title" content="TẾT 4.0 CÙNG UEHERS" />
                <meta property="og:image" content="https://i.imgur.com/fQE2Ejmm.png" />
                <meta property="og:url" content="web" />
                <meta property="og:type" content="website" />
            </Head>
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

