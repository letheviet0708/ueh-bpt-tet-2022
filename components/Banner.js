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
                        <Link href="https://bptueh.vercel.app/"><a>
                            <Image src="https://i.imgur.com/X8gG1Ky.png" width="1920px" height="1080" />
                        </a></Link>
                    </div>
                    <div>
                        <Link href="https://www.facebook.com/BPTUEH/photos/a.275498909237458/4425791980874776"><a target="_blank">
                            <Image src="https://i.imgur.com/dl95ZaI.png" width="1920px" height="1080" />
                        </a></Link>
                    </div>
                </Carousel>
            </div>
        );
    }
}

export default Banner;