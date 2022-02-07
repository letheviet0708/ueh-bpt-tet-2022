import { Component } from "react";
import Head from "next/head"

class MetaHeader extends Component{
    render () {
        return (
            <Head>
                
                <title>TẾT MỚI</title>
                <meta property="og:title" content="TẾT MỚI 2022" />
                <meta property="og:image" content="https://i.imgur.com/qPjK08s.png" />
                <meta property="og:url" content="web" />
                <meta property="og:type" content="website" />
            </Head>
        )
    }
}

export default MetaHeader