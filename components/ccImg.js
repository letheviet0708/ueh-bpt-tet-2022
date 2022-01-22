import { Component } from "react";

class CImg extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div 
                className={this.props.className}
                style={{
                    width: "100%",
                    height: "100%"
                }}
                dangerouslySetInnerHTML={{ 
                    __html: `<img preload width="100%" height="100%" class="cImg ${this.props.className}" style=" " src="${this.props.img}" />` 
            }} />
        )
    }
}

export default CImg 