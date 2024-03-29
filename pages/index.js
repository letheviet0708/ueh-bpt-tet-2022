import PageWrapper from '../components/PageWrapper'
import styles from '../styles/Home.module.css'
import Banner from '../components/Banner';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import SessionCard from "../components/sessionCard";
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import { Component } from 'react'
import Brightness1Icon from '@mui/icons-material/Brightness1';

class Home extends Component {

  render(){
    return (
      <div id="indexBg"
        style={{
            position: "relative",
            zIndex: 0
        }}>
        <PageWrapper>
          <Banner/>
          <Box className="backGroundI">
          <Box sx={{maxWidth: "1200px", mr: "auto", ml:"auto"}}>
            <Box sx={{ p: "20px"}}>
              <div
                
              >

              </div>
              <Box id="introduce" sx={{paddingTop: "7px"}}>
                <h1 style={{ textAlign: "center", color: "#990000"}}>CHUỖI TRUYỀN THÔNG TẾT 2022: TẾT MỚI</h1>
                 <p style={{color: "white", marginTop: "9px"}} >Chuỗi truyền thông “Tết mới” được xây dựng với mục đích truyền tải thông điệp đến các bạn sinh viên UEH cũng như sinh viên ngoài trường về một cái Tết mới: mới trong tư duy, mới trong cách tiếp nhận, mới trong cách ăn Tết. Năm nay, Tết diễn ra trong một thời điểm đặc biệt khi mà các hoạt động trực tuyến đang dần trở thành “khẩu vị” của sinh viên và thúc đẩy những thay đổi, hành vi của chúng ta trong cuộc sống thường ngày. Với việc ứng dụng các nền tảng Digital, chúng ta có thể đảm bảo có một cái Tết đầy đủ dư vị truyền thống nhưng cũng không kém phần mới mẻ qua các hình thức như: học hỏi các cách dọn dẹp nhà cửa và nấu mâm cỗ Tết qua các trang mạng xã hội, lì xì và chúc Tết online, tìm hiểu và chia sẻ kiến thức về phong tục ngày Tết,…</p>
              </Box>
              <Box id="timeline"
                style={{
                  paddingTop: "8px",
                  backgroundRepeat: "space",
                  backgroundSize: "contain",
                  backgroundImage: "url(https://i.imgur.com/efrb0l8.png)"
                }}
              >
                <h1 style={{ textAlign: "center", color: '#ff9933', marginBottom: "20px"}}>TIMELINE</h1>
                <Box sx={{
                      marginTop: "-20px"
                    }}>
                  <VerticalTimeline
                    layout={ "1-column-left" }
                    animate={false}
                    lineColor={"#ff9933"}
                    sx={{
                      marginTop: "-2px"
                    }}
                  >
                    <VerticalTimelineElement
                      className="vertical-timeline-element--work"
                      contentStyle={{ background: 'rgb(255, 51, 51)', color: '#fff' }}
                      contentArrowStyle={{ borderRight: '7px solid  rgb(255, 51, 51)' }}
                      date= "22/1/2022"
                      iconStyle={{ background: '#ff9933', color: '#fff' }}
                      icon={<Brightness1Icon />}
                    >
                      <h3 className="vertical-timeline-element-title">Stage 1: Chúc lời yêu thương</h3>
                    </VerticalTimelineElement>

                    <VerticalTimelineElement
                      className="vertical-timeline-element--work"
                      contentStyle={{ background: 'rgb(255, 51, 51)', color: '#fff' }}
                      contentArrowStyle={{ borderRight: '7px solid  rgb(255, 51, 51)' }}
                      date="25/1/2022"
                      iconStyle={{ background: '#ff9933', color: '#fff' }}
                      icon={<Brightness1Icon />}
                    >
                      <h3 className="vertical-timeline-element-title">Công chiếu MV TẾT 4.0 - 4 PHƯƠNG TRỜI 0 KHOẢNG CÁCH</h3>
                    </VerticalTimelineElement>

                    <VerticalTimelineElement
                      className="vertical-timeline-element--work"
                      contentStyle={{ background: 'rgb(255, 51, 51)', color: '#fff' }}
                      contentArrowStyle={{ borderRight: '7px solid  rgb(255, 51, 51)' }}
                      date="27/1/2022"
                      iconStyle={{ background: '#ff9933', color: '#fff' }}
                      icon={<Brightness1Icon />}
                    >
                      <h3 className="vertical-timeline-element-title">Stage 2: Gắn kết đón Tết</h3>
                    </VerticalTimelineElement>

                    <VerticalTimelineElement
                      className="vertical-timeline-element--work"
                      contentStyle={{ background: 'rgb(255, 51, 51)', color: '#fff' }}
                      contentArrowStyle={{ borderRight: '7px solid  rgb(255, 51, 51)' }}
                      date="29/1/2022"
                      iconStyle={{ background: '#ff9933', color: '#fff' }}
                      icon={<Brightness1Icon />}
                    >
                      <h3 className="vertical-timeline-element-title">Stage 3: Tết 4.0 cùng UEHers</h3>
                    </VerticalTimelineElement>
                  
                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        contentStyle={{ background: 'rgb(255, 51, 51)', color: '#fff' }}
                        contentArrowStyle={{ borderRight: '7px solid  rgb(255, 51, 51)' }}
                        date="5/2/2022"
                        iconStyle={{ background: '#ff9933', color: '#fff' }}
                        icon={<Brightness1Icon />}
                      >
                        <h3 className="vertical-timeline-element-title">Stage 4: Tết mới trong tim</h3>
                      </VerticalTimelineElement>
                  </VerticalTimeline>
                </Box>
              </Box>
              <Box id="infomation">
                {/*<h1 style={{ textAlign: "center", color:"#ff9933", marginBottom: "23px"}}>INFORMATION SECTION</h1>*/}
                <Box id="session" sx={{pt:"21px"}}>
                  
                  <SessionCard
                    link="/chuc-loi-yeu-thuong#view"
                    sessionName="Chúc lời yêu thương"
                    img="https://i.imgur.com/7UWFqTu.png"
                    sessionDescription = "Đây là nơi tổng hợp những hình ảnh và lời chúc của mọi người đến những người thân xung quanh mình. Hãy trao đi những tâm tình có giá trị để Tết năm nay sẽ trọn vẹn và mang nhiều kỷ niệm đẹp đẽ, sâu sắc hơn nhé!"
                  />
                  <SessionCard
                    link="/tet-moi-trong-tim#view"
                    sessionName="Album Tết mới trong tim"
                    img="https://i.imgur.com/z0R9wvx.png"
                    sessionDescription = "Album này sẽ ghi dấu lại những khoảnh khắc đẹp của các bạn trong dịp Tết 2022. Hãy chọn những bức ảnh mà bạn thích thú và ưng ý nhất thể hiện được những hoạt động của mình trong Tết năm nay nhé!"
                  />
                  <SessionCard
                    link="/danh-sach-hoat-dong#view"
                    sessionName="Danh sách hoạt động"
                    img="https://i.imgur.com/23gCmXn.png"
                    sessionDescription = "Các giai đoạn của chuỗi truyền thông “Tết mới” sẽ được cập nhật ở đây. Các bạn nhớ theo dõi để không bỏ lỡ các hoạt động nhé!"
                  />
                </Box>
              </Box>
            </Box>
          </Box>
          </Box>
        </PageWrapper>
        <Box
            sx={{
                width: "100%",
                paddingTop: "26%",
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
                    __html: `<img preload class="" style="height: 100%;" src="https://i.imgur.com/ae8FwXM.png" />` 
            }} />

            <div 
                style={{ flex: "0 0 20%", height: "100%", display: "flex", justifyContent: "flex-end"}}
                dangerouslySetInnerHTML={{ 
                    __html: `<img preload class="" style="height: 100%;" src="https://i.imgur.com/Q4TfJxg.png" />` 
            }} />
          </div>
        </Box>
      </div>
    );
  }
}

export default Home
