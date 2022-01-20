import PageWrapper from '../components/PageWrapper'
import styles from '../styles/Home.module.css'
import Banner from '../components/Banner';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SessionCard from "../components/sessionCard";

import { Component } from 'react'

class DanhSachHoatDong extends Component {

  render(){
    return (
      <div id="anotherBg">
        <PageWrapper>
          <Banner/>
          <Box className="backGroundI">
                <a className="anchor" id="view"/>
          <Box sx={{maxWidth: "1200px", mr: "auto", ml:"auto"}}>
            <Box sx={{ p: "20px"}}>
            <Box id="infomation">
                <h1 style={{ textAlign: "center", color:"#990000", marginBottom: "23px"}}>DANH SÁCH HOẠT ĐỘNG</h1>
                <p  style={{ color: "white" }}>Hãy tham gia đầy đủ các hoạt động để đạt được số điểm cao nhất và cập nhật mã vạch nha!</p>
                <Box id="activity" style={{display:"flex", justifyContent:"center"}}>
                  <Box sx={{maxWidth:"400px"}}>
                  <SessionCard
                    link="/stage1#view"
                    sessionName="Chúc lời yêu thương"
                    img="https://i.imgur.com/7UWFqTu.png"
                    sessionDescription = "Chúc lời yêu thương"
                  />
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          </Box>
        </PageWrapper>
      </div>
    );
  }
}

export default DanhSachHoatDong
