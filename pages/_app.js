import '../styles/globals.css'
import 'react-vertical-timeline-component/style.min.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import MessengerChat from '../utils/MessengerChat'
import * as gtag from '../lib/gtag'
import { useEffect } from 'react'
import Script from 'next/script'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }) {

  return <>

      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-6YRTPWBX6T"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'GA_MEASUREMENT_ID');
        `}
      </Script>
      <Component {...pageProps} />
      
      <div id="mess">
        <MessengerChat
            pageId="439837656560955"
        />
      </div> 
    
    </>
}

export default MyApp
