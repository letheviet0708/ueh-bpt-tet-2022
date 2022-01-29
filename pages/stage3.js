import PageWrapper from '../components/PageWrapper'
import styles from '../styles/Home.module.css'
import Banner from '../components/Banner';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SessionCard from "../components/sessionCard";
import GiaiDoan3Form from "../components/GiaiDoan3Form"
import CImg from "../components/ccImg"
import firebase from 'firebase/app';
import personService from "../Services/person.service";
import Link from 'next/link'

import { Component } from 'react'

class Stage3 extends Component {

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
                    <h1 style={{ textAlign: "center", color:"#990000", marginBottom: "23px"}}>GẮN KẾT ĐÓN TẾT</h1>
                    
                    <p  style={{ textAlign: "left", color: "white" }}>Cuộc thi mong muốn đem đến cho các bạn sinh viên nguồn cảm hứng từ những giai điệu sôi động của MV “Tết 4.0 - 4 phương trời, 0 khoảng cách”, qua đó các bạn có cơ hội thể hiện năng lượng tích cực của bản thân, hào hứng đón nhận những điều mới mẻ của ngày Tết hiện đại. Tất cả chúng ta sẽ cùng xích lại gần nhau, gắn kết với nhau dù là ở 4 phương trời. </p>
                    
                    <p  style={{ textAlign: "left", color: "white", overflowWrap: "break-word" }}>Link bài phát động: <Link href="https://www.facebook.com/BPTUEH/posts/4822691434518160"><a target="_blank">https://www.facebook.com/BPTUEH/posts/4822691434518160</a></Link></p>
                    
                    <h2 style={{ textAlign: "left", color:"#990000", marginBottom: "23px"}}>Điền kết quả</h2>
                    {user &&
                        <GiaiDoan3Form
                            Data= {Data[3]}
                            uid= {user.uid}
                        />
                    }
                </Box>
            </Box>
            </Box>
            </PageWrapper>
        </div>
        );
    }
}

export default Stage3
