import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {Component} from 'react'
import firebase from 'firebase/app';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';

import personService from "../Services/person.service";
import Row from "../components/row"
import CTSnackbar from "../components/SnackBar";
import { appendOwnerState } from '@mui/material';
import xlsx from 'json-as-xlsx';

const clone = {
    "result": [
        {
            "images": [
                "https://i.imgur.com/42mzY5i.png"
            ],
            "text": [
                "Năm đến tết hết mong ít deadline lại"
            ],
            "_id": "61e5d20bd8e12e3fc89e7eff",
            "activityIndex": 1,
            "user": "61e5b35eb5bd6b562c366bae",
            "createdAt": "2022-01-17T20:31:07.903Z",
            "updatedAt": "2022-01-17T21:26:08.836Z",
            "__v": 0,
            "state": 1
        },
        {
            "images": [
                "https://i.imgur.com/6rCvJil.jpg"
            ],
            "text": [
                "Haha"
            ],
            "_id": "61e5e884d8e12e3fc89e7fb3",
            "activityIndex": 2,
            "user": "61e5b35eb5bd6b562c366bae",
            "state": 0,
            "createdAt": "2022-01-17T22:07:00.945Z",
            "updatedAt": "2022-01-17T22:07:39.174Z",
            "__v": 0
        },
        {
            "images": [
                "https://i.imgur.com/I1DWhW6.jpg"
            ],
            "text": [
                "Hihi"
            ],
            "_id": "61e5ea12d8e12e3fc89e7fd5",
            "activityIndex": 3,
            "user": "61e5b35eb5bd6b562c366bae",
            "state": 0,
            "createdAt": "2022-01-17T22:13:38.021Z",
            "updatedAt": "2022-01-17T22:13:38.021Z",
            "__v": 0
        }
    ],
    "name": "Lê Thế Việt",
    "mssv": "20520093",
    "clan": "SOL",
    "avatar": "https://i.imgur.com/eFEF02p.png",
    "cls": "KHTN2020-K15",
    "phone": "12345678",
    "email": "winviet10@gmail.com",
    "uid": "l90GPuNlwaT7oEirpbFWqY6wz853",
    "count": 0,
    "createdAt": "2022-01-17T18:20:14.228Z",
    "updatedAt": "2022-01-17T22:13:38.079Z",
    "id": "61e5b35eb5bd6b562c366bae"
}

const clone2= {
        activityIndex: 1,
        id: "61e5d20bd8e12e3fc89e7eff",
        images: ['https://i.imgur.com/UIH18lF.png'],
        state: 0,
        text: ['Năm đến tết hết mong ít deadline lại'],
        user:{
            avatar: "https://i.imgur.com/eFEF02p.png",
            clan: "SOL",
            cls: "KHTN2020-K15",
            count: 0,
            email: "winviet10@gmail.com",
            mssv: "20520093",
            name: "Lê Thế Việt",
            phone: "12345678",
            result: (5) [null, '61e5d20bd8e12e3fc89e7eff', '61e5d2dcd8e12e3fc89e7f0b', '61e5e884d8e12e3fc89e7fb3', '61e5ea12d8e12e3fc89e7fd5'],
        }
}

class Manager extends Component {
    constructor(props){
        super(props)
        this.state = {
            user: null,
            updateAt: -1,
            section: 1,
            gen: "All",
            filter: 'All',
            state: 4,
            number: 1,
            mssv: '',
            totalData: null,
            itemsPerPage: 15,
            page: 1,
            numberOfPage: 0,
            pageData: null,
            flip: false,
            openSB: false,
            messageSB: 'nothing',
            severitySB: 'info',
            custom: false,
        }
    }
    
    retrieveResult = (data, flip, custom) =>{
        personService.retrieveResult(data)
            .then(response => {
                this.setState({
                    totalData: response.data
                },()=>{
                    this.determineNumberOfPages(flip, custom)
                })
            })
            .catch(e=> {
                console.log(e);
            });
    }

    determineNumberOfPages = (flip, custom) => {
        const { totalData, itemsPerPage } = this.state;
        console.log(totalData)
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
            pageData: paginatedDataObject,
            flip: flip,
            custom: custom
        })
    };

    retrieve = () => {
        const testData = [clone2,clone2,clone2]//,clone,clone,clone,clone,clone,clone,clone,clone,clone,clone,clone,clone,clone,clone,clone,clone,clone,clone,clone,clone,clone,clone,clone,clone,clone,clone,clone,clone,clone,clone,clone,clone,clone,clone]
        this.setState({
            totalData: testData
        },()=>{
            this.determineNumberOfPages()
        })
    }

    componentDidMount(){
        //this.retrieve()
        this.handleRetrieve()
    }

    filterChange = (event) =>{
        this.setState({ [event.target.name]: event.target.value})
    }

    handleRetrieve = () =>{
        const {filter, updateAt, section, state, number,mssv, gen} = this.state
        let data ;
        let flip, custom;
        switch(filter){
            case "All":
                data = {
                    type: "all",
                    gen: gen,
                    updateAt: updateAt
                }
                flip = false;
                custom = false
                break;
            case "Activity":
                data = {
                    type: "Activity",
                    section: section,
                    gen: gen,
                    state: state,
                    updateAt: updateAt
                }
                flip = true;
                custom = false
                break;
            case "Count":
                data = {
                    type: "Count",
                    number: number,
                    gen: gen,
                    updateAt: updateAt
                }
                flip = false;
                custom = false
                break;
            
            case "MSSV":
                data = {
                    type: "MSSV",
                    mssv: mssv
                }
                flip = false;
                custom = false
                break;

            case "GIF":
                data = {
                    type: "GIF",
                    updateAt: updateAt,
                    gen: gen,
                }
                flip = false;
                custom = true
                break;
        }
        this.retrieveResult(data, flip, custom)
    }

    handleExport = () =>{
        console.log("Xuất")
    }

    handelPageChange = (event, value) =>{
        this.setState({page: value})
    }
    
    handleSBClick = (message, severity) => {
        this.setState({openSB: true, messageSB: message, severitySB: severity})
    }

    handleSBClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({openSB: false})
    } 

    handleChange = (data) =>{
        let pageData = this.state.pageData
        let page = this.state.page
        console.log("data",data)
        let user = pageData[page].find((o, i) => {
            if (this.state.flip){
                if (o.user._id === data.user.id) {
                    let result = data.result
                    console.log("pageData",pageData[page][i])
                    console.log("user",result)
                    console.log("i", i)
                    console.log("pageData[page][i]",pageData[page][i])
                    pageData[page][i] = result
                    return true
                }
            }else{
                if (o.id === data.user.id) {
                    let user = data.user
                    pageData[page][i] = user
                    return true
                }
            }            
        });
        console.log("pageData2", pageData)
        this.setState({pageData: pageData}, ()=>{
            this.handleSBClick("Đã cập nhật thành công", "info")
        })
    }

    LoadXLSX = async () => {
        console.log("XLSX")
        let contents = []
        let data
        if(this.state.flip == false){
            for (var person of this.state.totalData){
                let activityResult = [null, null, null, null, null];
                for (const x of person.result) if(x) { 
                    activityResult[x.activityIndex] = x
                }
                var d = {
                    name: person.name, 
                    mssv: person.mssv, 
                    cls: person.cls,
                    clan: person.clan, 
                    gen: person.gen, 
                    count: person.count,
                    email: person.email,
                    phone: person.phone,
                    activity1Img: activityResult[1] ? activityResult[1].images[0] : "", 
                    activity1Text: activityResult[1] ? activityResult[1].text[0] : "", 
                }
                contents.push(d)
            }

            data = [
                {
                    sheet: 'sheet1',
                    columns: [
                        { label: 'Tên', value: 'name' }, 
                        { label: "Tên", value: "name" },
                        { label: "MSSV", value: "mssv" },
                        { label: "Lớp", value: "cls" },
                        { label: "Khoa", value: "clan" },
                        { label: "Khóa", value: "gen" },
                        { label: "Số hoạt động hoàn thành", value: "count" },
                        { label: "Email", value: "email" },
                        { label: "SDT", value: "phone" },
                        { label: "GD1 - ảnh", value: "activity1Img" },
                        { label: "GD1 - Lời chúc", value: "activity1Text" },
                    ],
                    content: contents
                }
            ]
        }else{
            switch(this.state.section){
                case 1:
                    for (var result of this.state.totalData){
                        var d = {
                            name: result.user.name, 
                            mssv: result.user.mssv, 
                            cls: result.user.cls,
                            clan: result.user.clan, 
                            gen: result.user.gen, 
                            count: result.user.count,
                            email: result.user.email,
                            phone: result.user.phone,
                            activity1Img: result.images[0], 
                            activity1Text: result.text[0], 
                        }
                        contents.push(d)
                    }
    
                    data = [
                        {
                            sheet: 'sheet1',
                            columns: [
                                { label: 'Tên', value: 'name' }, 
                                { label: "Tên", value: "name" },
                                { label: "MSSV", value: "mssv" },
                                { label: "Lớp", value: "cls" },
                                { label: "Khoa", value: "clan" },
                                { label: "Khóa", value: "gen" },
                                { label: "Số hoạt động hoàn thành", value: "count" },
                                { label: "Email", value: "email" },
                                { label: "SDT", value: "phone" },
                                { label: "GD1 - ảnh", value: "activity1Img" },
                                { label: "GD1 - Lời chúc", value: "activity1Text" },
                            ],
                            content: contents
                        }
                    ]
                    break;
            }
        }
        let settings = {
            fileName: 'Danh_Sach', // Name of the spreadsheet
            extraLength: 5, // A bigger number means that columns will be wider
            writeOptions: {} // Style options from https://github.com/SheetJS/sheetjs#writing-options
        }
          
        xlsx(data, settings)
    }

    render(){
        const {filter, updateAt, section, state, number,mssv,gen} = this.state
        return(<div style={{backgroundColor:"white"}}>
        <Box sx = {{pt: "50px"}}>
                <Box sx = {{display: "flex"}}>
                    <Box>
                        <TextField
                            select
                            label="filter"
                            onChange={this.filterChange}
                            name="filter"
                            value={filter}
                            variant="outlined" 
                            sx = {{ml: "20px"}}
                            defaultValue={"All"}
                        >
                            <MenuItem value={"All"}>Tất cả</MenuItem>
                            <MenuItem value={"MSSV"}>Tìm theo MSSV</MenuItem>
                            <MenuItem value={"Activity"}>Theo giai đoạn</MenuItem>
                            <MenuItem value={"Count"}>Theo số hoạt động đã hoàn thành</MenuItem>
                            <MenuItem value={"GIF"}>Những người đã tạo GIF</MenuItem>
                        </TextField>
                    </Box>

                    {filter == "All" &&
                        <TextField
                            select
                            label="Khóa"
                            onChange={this.filterChange}
                            name="gen"
                            value={gen}
                            variant="outlined" 
                            sx = {{ml: "20px"}}
                            defaultValue={"All"}
                        >
                            <MenuItem value={"All"}>All</MenuItem>
                            <MenuItem value={"K47"}>K47</MenuItem>
                            <MenuItem value={"K46"}>K46</MenuItem>
                            <MenuItem value={"K45"}>K45</MenuItem>
                        </TextField>
                    }

                    {filter == "MSSV" &&
                        
                        <TextField
                            label="mssv"
                            onChange={this.filterChange}
                            name="mssv"
                            value={mssv}
                            variant="outlined" 
                            sx = {{ml: "20px"}}
                        />
                    }

                    {filter == "Activity" &&
                        <Box>
                            <TextField
                                select
                                label="Giai đoạn"
                                onChange={this.filterChange}
                                name="section"
                                value={section}
                                variant="outlined" 
                                sx = {{ml: "20px"}}
                                defaultValue={1}
                            >
                                <MenuItem value={1}>Giai đoạn 1</MenuItem>
                                <MenuItem value={2}>Giai đoạn 2</MenuItem>
                                <MenuItem value={3}>Giai đoạn 3</MenuItem>
                                <MenuItem value={4}>Giai đoạn 4</MenuItem>
                            </TextField>
                            <TextField
                                select
                                label="Trạng thái"
                                onChange={this.filterChange}
                                name="state"
                                value={state}
                                variant="outlined" 
                                sx = {{ml: "20px"}}
                                defaultValue={4}
                            >
                                <MenuItem value={4}>Tất cả</MenuItem>
                                <MenuItem value={0}>Chưa duyệt</MenuItem>
                                <MenuItem value={1}>Không hợp lệ</MenuItem>
                                <MenuItem value={2}>Chấp nhận</MenuItem>
                            </TextField>
                        </Box>
                    }

                    {filter == "Count" &&
                    <Box>
                        <TextField
                            select
                            label="Số"
                            onChange={this.filterChange}
                            name="number"
                            value={number}
                            variant="outlined" 
                            sx = {{ml: "20px"}}
                            defaultValue={1}
                        >
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={4}>4</MenuItem>
                        </TextField>
                        <TextField
                            select
                            label="Khóa"
                            onChange={this.filterChange}
                            name="gen"
                            value={gen}
                            variant="outlined" 
                            sx = {{ml: "20px"}}
                            defaultValue={"All"}
                        >
                            <MenuItem value={"All"}>All</MenuItem>
                            <MenuItem value={"K47"}>K47</MenuItem>
                            <MenuItem value={"K46"}>K46</MenuItem>
                            <MenuItem value={"K45"}>K45</MenuItem>
                        </TextField>
                        </Box>
                    }
                    {filter != "MSSV" &&
                        <TextField
                            select
                            label="Xắp xếp theo"
                            onChange={this.filterChange}
                            name="updateAt"
                            value={updateAt}
                            variant="outlined" 
                            sx = {{ml: "20px"}}
                            defaultValue={-1}
                        >
                            <MenuItem value={-1}>Mới nhất</MenuItem>
                            <MenuItem value={1}>Cũ nhất</MenuItem>
                        </TextField>
                    }
                </Box>
                    <Box>
                        <Button 
                            variant="contained" 
                            onClick={this.handleRetrieve}
                            sx = {{
                                ml: "20px",
                                mt: "10px"
                        }}>Lọc</Button>

                        <Button 
                            variant="contained" 
                            onClick={this.LoadXLSX}
                            sx = {{
                                ml: "20px",
                                mt: "10px"
                        }}>Xuất file</Button>
                    </Box>
            { this.state.numberOfPage != 0 && 
            <Box>
                
            <Box sx={{display: "flex", justifyContent: "space-between",mt: "10px"}}>
                <Typography>Số lượng: {this.state.totalData.length}</Typography>
                <Pagination  count={this.state.numberOfPage} page={this.state.page} onChange={this.handelPageChange} />
            </Box>
            <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                <TableRow>
                    <TableCell />
                    <TableCell />
                    <TableCell>Tên</TableCell>
                    <TableCell>MSSV</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>SDT</TableCell>
                    <TableCell>Lớp</TableCell>
                    <TableCell>Khóa</TableCell>
                    <TableCell>Khoa</TableCell>
                </TableRow>
                </TableHead>
                    {this.state.flip == false && this.state.pageData[this.state.page].map((user, key) =>(
                        this.state.custom ?
                            <Row
                                onChange={this.handleChange}
                                key={key}
                                test = {user}
                                user = {user}
                                result = {user.result}
                                customContent = {
                                    <div 
                                        //style={{width: "100%"}}
                                        dangerouslySetInnerHTML={{ 
                                            __html: `<img preload class="" src="${user.gifCharacter}" />` 
                                    }} />
                                }
                            />
                            :
                            <Row
                                onChange={this.handleChange}
                                key={key}
                                test = {user}
                                user = {user}
                                result = {user.result}
                            />
                    ))}

                    
                    {this.state.flip == true && this.state.pageData[this.state.page].map((result, key) =>(
                        <Row
                            onChange={this.handleChange}
                            key={key}
                            test = {result}
                            user = {result.user}
                            result = {[result]}
                        />
                    ))}
                <TableBody>
                </TableBody>
            </Table>
            </TableContainer>
            <Box sx={{display: "flex", justifyContent: "center",mt: "10px"}}>
                <Pagination  count={this.state.numberOfPage} page={this.state.page} onChange={this.handelPageChange} />
            </Box>
            </Box>}

            
            <CTSnackbar 
                handleClick ={this.handleSBClick}
                open = {this.state.openSB}
                handleClose = {this.handleSBClose}
                message = {this.state.messageSB}
                severity = {this.state.severitySB}
            />
        </Box></div>)
    }
}

export default Manager