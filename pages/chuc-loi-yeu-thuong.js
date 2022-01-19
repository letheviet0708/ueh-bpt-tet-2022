import { Component } from "react";
import Banner from "../components/Banner";
import PageWrapper from "../components/PageWrapper";
import CardImg from "../components/card"
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';

import personService from "../Services/person.service";

const userClone = {
        activityIndex: 1,
        images: ['https://i.imgur.com/42mzY5i.png'],
        state: 3,
        text: ['Chúc lời yêu thương      '],
        user: {
            avatar: "https://i.imgur.com/eFEF02p.png",
            clan: "SOL",
            cls: "KHTN2020-K15",
            email: "winviet10@gmail.com",
            mssv: "20520093",
            name: "Lê Thế Việt"
        }
    }

class ChucLoiYeuThuong extends Component{
    constructor(props){
        super(props)
        this.state = {
            totalData: null,
            itemsPerPage: 12,
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
        //this.retrieve()
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
        return(<div>
            <PageWrapper>
                <Banner></Banner>
                <a className="anchor" id="view"/>
                <Box >
                <div id = "cardsWrapper">
                { this.state.numberOfPage != 0 && 
                    this.state.pageData[this.state.page].map((result, key) =>(
                        <CardImg
                            key = {result.key}
                            image = {result.images[0]}
                            text = {result.text[0]}
                            user = {result.user}
                        />
                ))}
                </div>
                
                
                <Box sx={{display: "flex", justifyContent: "center",mt: "10px"}}>
                        <Pagination  count={this.state.numberOfPage} page={this.state.page} onChange={this.handelPageChange} />
                    </Box>
                </Box>
            </PageWrapper>
        </div>)
    }
}

export default ChucLoiYeuThuong