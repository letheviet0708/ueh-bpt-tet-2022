import PageWrapper from '../components/PageWrapper'
import styles from '../styles/Home.module.css'
import Banner from '../components/Banner';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { Component } from 'react'

class DanhSachHoatDong extends Component {

  render(){
    return (
      <div>
        <PageWrapper>
          <Banner/>
          <Box className="backGroundI">
          <Box sx={{maxWidth: "800px", mr: "auto", ml:"auto"}}>
            <Box sx={{ m: "20px"}}>
              <Typography sx={{ textAlign: "center"}} variant="h4" component="div" gutterBottom>CHUỖI TRUYỀN THÔNG TẾT 2022: TẾT MỚI</Typography>
                
              <Typography>Chuỗi truyền thông “Tết mới” được xây dựng với mục đích truyền tải thông điệp đến các bạn sinh viên UEH cũng như sinh viên ngoài trường về một cái Tết mới: mới trong tư duy, mới trong cách tiếp nhận, mới trong cách ăn Tết. Năm nay, Tết diễn ra trong một thời điểm đặc biệt khi mà các hoạt động trực tuyến đang dần trở thành “khẩu vị” của sinh viên và thúc đẩy những thay đổi, hành vi của chúng ta trong cuộc sống thường ngày. Với việc ứng dụng các nền tảng Digital, chúng ta có thể đảm bảo có một cái Tết đầy đủ dư vị truyền thống nhưng cũng không kém phần mới mẻ qua các hình thức như: học hỏi các cách dọn dẹp nhà cửa và nấu mâm cỗ Tết qua các trang mạng xã hội, lì xì và chúc Tết online, tìm hiểu và chia sẻ kiến thức về phong tục ngày Tết,…</Typography>
            </Box>
          </Box>
          </Box>
        </PageWrapper>
      </div>
    );
  }
}

export default DanhSachHoatDong
