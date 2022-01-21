import {Component} from 'react'
import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image';
import Link from 'next/link';

class Banner extends Component {

    render(){
        return (
            <div>
                <Carousel infiniteLoop={true} autoPlay={true} showThumbs={false}>
                    <div>
                        {/*<Link href="https://bptueh.vercel.app/"><a>*/}
                            <Image blurDataURL src="https://i.imgur.com/Q4JZAJC.png" placeholder="blur" width="1920px" height="1080" />
                        {/*</a></Link>*/}
                    </div>
                </Carousel>
            </div>
        );
    }
}

export default Banner;