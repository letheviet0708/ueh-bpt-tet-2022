import PageWrapper from '../components/PageWrapper'
import styles from '../styles/Home.module.css'
import Banner from '../components/Banner';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SessionCard from "../components/sessionCard";
import GiaiDoan4Form from "../components/GiaiDoan4Form"
import CImg from "../components/ccImg"
import firebase from 'firebase/app';
import personService from "../Services/person.service";
import Link from 'next/link'

import { Component } from 'react'

class Stage4 extends Component {

    constructor(props){
        super(props)
        this.state = {
            user: null
        }
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
        this.check()
    }
    render(){
        const {user} = this.state
        let Data = [null, null, null, null, null];
        if (user ){
            for (const x of user.result) if(x) { 
                console.log(x)
                Data[x.activityIndex] = x
            }
        }
        return (
        <div id="anotherBg">
            <PageWrapper>
            <Banner/>
            <Box className="backGroundI">
                <a className="anchor" id="view"/>
            <Box sx={{maxWidth: "1200px", mr: "auto", ml:"auto"}}>
                <Box sx={{ p: "20px"}}>
                    <h1 style={{ textAlign: "center", color:"#990000", marginBottom: "23px"}}>TẾT MỚI TRONG TIM</h1>
                    
                    <p  style={{ textAlign: "left", color: "white" }}>Mỗi bạn sinh viên sẽ có một cảm nhận riêng về Tết mới, có bạn hào hứng vì được trải nghiệm các hoạt động trực tuyến, có bạn cảm thấy vui mừng và trân trọng giá trị ngày Tết khi đã duy trì được những giá trị truyền thống ngay trong thời đại 4.0.</p>
                    <p  style={{ textAlign: "left", color: "white" }}>Qua những tấm ảnh ghi lại hoạt động theo từng ngày Tết, các bạn sẽ chia sẻ được những điều thú vị và độc đáo về Tết của mình.</p>
                    
                    <p  style={{ textAlign: "left", color: "white", overflowWrap: "break-word" }}>Link bài phát động: <Link href="https://www.facebook.com/BPTUEH/posts/4853700184750618"><a target="_blank">https://www.facebook.com/BPTUEH/posts/4831337473653556</a></Link></p>
                    
                    <h2 style={{ textAlign: "left", color:"#990000", marginBottom: "23px"}}>Điền kết quả</h2>
                    {/*user &&
                        <GiaiDoan4Form
                            Data= {Data[4]}
                            uid= {user.uid}
                        />*/
                        <p  style={{ textAlign: "left", color: "white"}}>Có 1 số vấn đề nhỏ xảy ra mong bạn đợi mình xíu nha</p>
                    }

                </Box>
            </Box>
            </Box>
            </PageWrapper>
        </div>
        );
    }
}

export default Stage4
