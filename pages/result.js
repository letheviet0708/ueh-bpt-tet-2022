import {Component} from 'react'
import PageWrapper from "../components/PageWrapper";
import GiaiDoan1From from "../components/GiaiDoan1From"
import GiaiDoan2Form from "../components/GiaiDoan2Form"
import GiaiDoan3Form from "../components/GiaiDoan3Form"
import GiaiDoan4Form from "../components/GiaiDoan4Form"
import firebase from 'firebase/app';
import personService from "../Services/person.service";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


const GDPR = process.env.GDPR
const env = process.env.NODE_ENV

class Result extends Component {
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
        console.log(env, GDPR)
        return (<div id="anotherBg">
            <PageWrapper>
                <div id = "contentWrapper"
                    style = {{
                        maxWidth: "800px",
                        marginLeft: "auto",
                        marginRight: "auto",
                        paddingTop: "20px"
                    }}
                >
                    {user &&
                        <Box>
                            {(env == "development" || (GDPR >= 1))&&
                                <GiaiDoan1From
                                    Data= {Data[1]}
                                    uid= {user.uid}
                                />
                            }

                            {(env == "development" || (GDPR >= 2))&&
                                <GiaiDoan2Form
                                    Data= {Data[2]}
                                    uid= {user.uid}
                                />
                            }
                            {(env == "development" || (GDPR >= 3))&&
                                <GiaiDoan3Form
                                    Data= {Data[3]}
                                    uid= {user.uid}
                                />
                            }     
                            {(env == "development" || (GDPR >= 4))&&
                                <GiaiDoan4Form
                                    Data= {Data[4]}
                                    uid= {user.uid}
                                />
                            }                  
                        </Box>
                    }
                </div>
            </PageWrapper>
        </div>)
    }
}

export default Result