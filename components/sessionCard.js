import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Component} from 'react'
import Box from '@mui/material/Box';
import Link from 'next/link'

class SessionCard extends Component {
    constructor (props){
        super(props);
    }

    render () {
        return (
                <Card className="sessionCard" sx={{borderRadius: "20px", backgroundColor: "#ff3333"}} >
                    <Link href= {this.props.link} >
                        <Box>
                        <CardMedia
                            component="img"
                            image= {this.props.img}
                            className="sessionImg"
                        />
                        <CardContent style={{textAlign: "center"}}>
                            <p style = {{
                                color: "white",
                                margin: 0,
                                fontSize: "smaller",
                            }}>
                                {this.props.sessionDescription}
                            </p>
                        </CardContent>
                        </Box>
                    </Link>
                </Card>
        )
    }
}

export default SessionCard;