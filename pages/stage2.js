import PageWrapper from '../components/PageWrapper'
import styles from '../styles/Home.module.css'
import Banner from '../components/Banner';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SessionCard from "../components/sessionCard";
import GiaiDoan2Form from "../components/GiaiDoan2Form"
import CImg from "../components/ccImg"
import firebase from 'firebase/app';
import personService from "../Services/person.service";
import Link from 'next/link'

import { Component } from 'react'

class Stage2 extends Component {

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
                    
                    <p  style={{ textAlign: "left", color: "white" }}>Đến với giai đoạn này, các bạn sẽ quay video với nội dung những hoạt động đón Tết cùng gia đình trên nền nhạc MV TẾT 4.0 - 4 PHƯƠNG TRỜI 0 KHOẢNG CÁCH. </p>
                    <p  style={{ textAlign: "left", color: "white" }}>Qua đó, chúng ta cùng khẳng định việc ăn Tết online không những không làm mất đi giá trị truyền thống của Tết mà còn tạo nên sự thú vị và mới mẻ.</p>
                    
                    <p  style={{ textAlign: "left", color: "white" }}>Link bài phát động: <Link href="https://www.facebook.com/BPTUEH/posts/4822691434518160"><a target="_blank">https://www.facebook.com/BPTUEH/posts/4822691434518160</a></Link></p>
                    
                    <h2 style={{ textAlign: "left", color:"#990000", marginBottom: "23px"}}>Điền kết quả</h2>
                    {user &&
                        <GiaiDoan2Form
                            Data= {Data[2]}
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

export default Stage2
