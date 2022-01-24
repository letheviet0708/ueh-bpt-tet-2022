import { Component } from "react";
import ResponsiveNavBar from "./ReponsiveNavBar";
import Head from "next/head"
import Link from "next/link"
import Banner from "./Banner";

class PageWrapper extends Component{

    constructor(props){
        super(props)
    }

    render(){
        return (
            <div 
                style = {{
                    position: "relative",
                    zIndex: 10,
                }}
            >
                <Head>
                    <title>TẾT MỚI</title>
                    <meta property="og:title" content="TẾT MỚI 2022" />
                    <meta property="og:image" content="https://i.imgur.com/qPjK08s.png" />
                    <meta property="og:url" content="web" />
                    <meta property="og:type" content="website" />
                    <link rel="icon" href="https://i.imgur.com/IV6j1V4.png" />
                    <link rel="stylesheet" href="/static/assets/fonts/font-awesome.min.css" />
                    <link rel="stylesheet" href="/static/assets/bootstrap/css/bootstrap.min.css" />
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w==" crossOrigin="anonymous" />
                </Head>

                <ResponsiveNavBar></ResponsiveNavBar>
                <div style = {{paddingBottom:'75px'}}></div>
                {this.props.children}

                <footer
                    style={{
                        padding: "50px 0 14px"
                    }}
                >
                    <div className="container">
                        <div className="row">
                            <div className="col-md-10 col-lg-8 mx-auto">
                                
                                <ul className="list-inline text-center">
                                    <li className="list-inline-item"> <Link href="https://youth.ueh.edu.vn/"><a>
                                        <span id="webicon" className="fa-stack  "><i className="fa fa-circle fa-stack-2x" style={{color: "#ff9933"}}></i><i className="fas fa-globe fa-stack-1x fa-inverse" style={{color: "#990000"}}></i></span> 
                                    </a></Link> </li>

                                    <li className="list-inline-item"> <Link href="https://tiktok.com/@bptueh"><a>
                                        <span id="titokicon" className="fa-stack  "><i className="fa fa-circle fa-stack-2x" style={{color: "#ff9933"}}></i><i className="fab fa-tiktok fa-stack-1x fa-inverse" style={{color: "#990000"}}></i></span>   
                                    </a></Link> </li>

                                    <li className="list-inline-item"> <Link href="https://www.facebook.com/bptueh"><a>
                                        <span id="fbicon" className="fa-stack  "><i className="fa fa-circle fa-stack-2x" style={{color: "#ff9933"}}></i><i className="fab fa-facebook-f fa-stack-1x fa-inverse" style={{color: "#990000"}}></i></span>       
                                    </a></Link> </li>

                                    <li className="list-inline-item"> <Link href="https://www.youtube.com/channel/UCukkP4Wu3VH5kqK1inZNOAg"><a>
                                        <span id="yticon" className="fa-stack  "><i className="fa fa-circle fa-stack-2x" style={{color: "#ff9933"}}></i><i className="fab fa-youtube fa-stack-1x fa-inverse" style={{color: "#990000"}}></i></span>
                                    </a></Link> </li>

                                    <li className="list-inline-item"> <Link href="https://instagram.com/banphongtrao.ueh"><a>
                                        <span id="insicon" className="fa-stack  "><i className="fa fa-circle fa-stack-2x" style={{color: "#ff9933"}}></i><i className="fab fa-instagram fa-stack-1x fa-inverse" style={{color: "#990000"}}></i></span>  
                                    </a></Link> </li>
                                    
                                </ul>
                                <p className="" style={{color:"white"}}>Ban Phong trào - Tình nguyện UEH</p>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        )
    }
}

export default PageWrapper