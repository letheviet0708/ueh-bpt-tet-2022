import PageWrapper from '../components/PageWrapper'
import styles from '../styles/Home.module.css'
import Banner from '../components/Banner';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SessionCard from "../components/sessionCard";
import GiaiDoan1From from "../components/GiaiDoan1From"
import firebase from 'firebase/app';
import personService from "../Services/person.service";

import { Component } from 'react'

class Stage1 extends Component {

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
                    <h1 style={{ textAlign: "center", color:"#990000", marginBottom: "23px"}}>CHÚC LỜI YÊU THƯƠNG</h1>
                    <p  style={{ textAlign: "left", color: "white" }}>Đây là nơi bạn sẽ gửi gắm hình ảnh và những lời chúc tốt đẹp, ý nghĩa nhất đến với những người mà bạn thật sự yêu quý và trân trọng. Từ đó, bạn có thể thể hiện sự quan tâm, tình cảm một cách rõ ràng nhất cũng như giúp mối quan hệ ngày càng bền chặt hơn.</p>
                    <p  style={{ textAlign: "left", color: "white" }}>Những lời chúc năm mới đều có ý nghĩa và giá trị tinh thần vô cùng sâu sắc đối với mỗi người. Hãy chọn những từ ngữ hay và “đắt” nhất nhé!</p>
                    <p  style={{ textAlign: "left", color: "white" }}>Link bài phát động (kèm thể lệ)</p>
                    
                    <h2 style={{ textAlign: "left", color:"#990000", marginBottom: "23px"}}>Điền kết quả</h2>
                    {user &&
                        <GiaiDoan1From
                            Data= {Data[1]}
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

export default Stage1
