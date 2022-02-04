import { Component } from "react";
import Banner from "../components/Banner";
import PageWrapper from "../components/PageWrapper";
import CardImg from "../components/card"
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import CardGD4 from '../components/CardGD4'
import personService from "../Services/person.service";
import { Typography } from "@mui/material";

const userClone = {
        activityIndex: 4,
        images: [
            "https://i.imgur.com/7kT7B0H.jpg",
            "https://i.imgur.com/K34ikQB.jpg",
            "https://i.imgur.com/4fEMA0J.jpg",
            "https://i.imgur.com/cgfgZQZ.jpg",],
        state: 3,
        text: [
                "Năm dần",
                "Hii",
                "Lộc",
                "Moneyy",],
        user: {
            avatar: "https://i.imgur.com/eFEF02p.png",
            clan: "SOL",
            cls: "KHTN2020-K15",
            email: "winviet10@gmail.com",
            mssv: "20520093",
            name: "Lê Thế Việt"
        }
    }

class TetMoiTrongTim extends Component{
    constructor(props){
        super(props)
        this.state = {
            totalData: null,
            itemsPerPage: 2,
            page: 1,
            numberOfPage: 0,
            pageData: null,
            openSB: false,
            messageSB: 'nothing',
            severitySB: 'info',
        }
    }

    determineNumberOfPages = () => {
        const { totalData, itemsPerPage } = this.state;
        let paginatedDataObject = {};
    
        let index = 0;
        let dataLength = totalData.length;
        let chunkArray = [];
    
        for (index = 0; index < dataLength; index += itemsPerPage) {
          let newChunk = totalData.slice(index, index + itemsPerPage);
          chunkArray.push(newChunk);
        }
    
        chunkArray.forEach((chunk, i) => {
          paginatedDataObject[i + 1] = chunk;
        });

        this.setState({
            numberOfPage: chunkArray.length,
            pageData: paginatedDataObject
        })
    }

    retrieveResult = (data) =>{
        personService.retrieveResult(data)
            .then(response => {
                console.log(response)
                this.setState({
                    totalData: response.data
                },()=>{
                    this.determineNumberOfPages()
                })
            })
            .catch(e=> {
                console.log(e);
            });
    }
    
    retrieve = () => {
        const testData = [userClone,userClone,userClone,userClone,userClone,userClone,userClone,userClone,userClone,userClone,userClone,userClone,userClone,userClone,userClone,userClone,userClone,userClone,userClone,userClone,userClone]//,clone,clone,clone,clone,clone,clone,clone,clone,clone,clone,clone,clone,clone,clone,clone,clone,clone,clone,clone,clone,clone,clone,clone,clone,clone,clone,clone,clone,clone,clone,clone,clone,clone,clone]
        this.setState({
            totalData: testData
        },()=>{
            this.determineNumberOfPages()
        })
    }

    handelPageChange = (event, value) =>{
        this.setState({page: value})
    }

    componentDidMount(){
        this.retrieve()
        return
        const data = {
            type: "Activity",
            section: 1,
            state: 2,
            updateAt: -1
        }
        this.retrieveResult(data)
    }

    render (){
        //const testArr = [userClone,userClone,userClone,userClone,userClone,userClone,userClone]
        return(<div
                style={{
                    position: "relative",
                    zIndex: 0
                }}
            
            >
            <PageWrapper>
                <Banner></Banner>
                <a className="anchor" id="view"/>
                <Box >
                <Box sx={{mr: "20px", ml: "20px"}}>
                    <h1 style={{ textAlign: "center", color:"#ff9933", marginTop: "20px", marginBottom:" -16px"}}>CHÚC LỜI YÊU THƯƠNG</h1>
                    <p style={{color: "white"}}>Lời chúc năm mới sẽ là món quà chân thành các bạn có thể dành tặng cho gia đình mình. Những lời chúc qua mạng xã hội biến việc thể hiện tình cảm qua trở nên mới mẻ, cực kỳ thuận tiện nếu các bạn gửi cho một người thân đang ở xa.</p>
                </Box>
                <div className = "cardsWrapper">
                { this.state.numberOfPage != 0 ? 
                    this.state.pageData[this.state.page].map((result, key) =>(
                        <CardGD4
                            key = {result.key}
                            images = {result.images}
                            text = {result.text}
                            user = {result.user}
                        />
                    ))
                    :
                    [1,2,3,4].map((key) => (
                        <Box key= {key} className="cardimg">
                            <Box
                                sx={{
                                    width: "100%",//"100%",
                                    paddingTop: "75%",
                                    position: "relative"
                                }}
                            >
                                <Box
                                    sx={{
                                        position: "absolute",
                                        top: 0, 
                                        left: 0,
                                        width: "100%",
                                        height: "100%",
                                        display: "flex",
                                        justifyContent: "center"
                                    }}
                                >
                                    
                                    <Skeleton variant="rectangular" width="100%" height="100%" />
                                </Box>
                            </Box>
                            <Box sx={{mt:"5px"}}>
                                <Box sx={{display: "flex"}}>
                                    <Skeleton variant="circular" width={40} height={40} />
                                    <Skeleton sx={{ml:"5px"}} variant="text" width={100}/>
                                </Box>
                            </Box>
                        </Box>
                    ))
                }
                </div>
                <Box sx={{display: "flex", justifyContent: "center",mt: "10px"}}>
                        <Pagination color="warning"  count={this.state.numberOfPage} page={this.state.page} onChange={this.handelPageChange} />
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
        
        </div>)
    }
}

export default TetMoiTrongTim