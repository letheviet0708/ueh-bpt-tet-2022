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

        
        <div
          style={{    
            width: "100%",
            height: "100%",
            position: "absolute",
            bottom: "0px",
            padding: "8px",
          }}
        >  
          <div
            style={{
              width: "100%",
              height: "100%",
              border: "3px solid #f4c625",
            }}
          /> 
        </div>

        <div>
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
                      img="https://i.imgur.com/h1HC4ESl.jpg"
                      sessionDescription = "Stage 1: Chúc lời yêu thương"
                    />
                    
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
            </Box>
          </PageWrapper>
        </div>

        

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
                    __html: `<img preload class="" style="height: 100%;" src="https://i.imgur.com/FQBoM7n.png" />` 
            }} />

            <div 
                style={{ flex: "0 0 20%", height: "100%"}}
                dangerouslySetInnerHTML={{ 
                    __html: `<img preload class="" style="height: 100%;" src="https://i.imgur.com/yTHOuOG.png" />` 
            }} />
          </div>
        </Box>
        
      </div>
    );
  }
}

export default DanhSachHoatDong
