import '../styles/globals.css'
import 'react-vertical-timeline-component/style.min.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import MessengerChat from '../utils/MessengerChat'
import * as gtag from '../lib/gtag'
import { useEffect } from 'react'
import Script from 'next/script'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }) {

  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return <>

    <Script
        strategy="afterInteractive"
        id="my-script"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Script
        strategy="afterInteractive"
        id="my-script"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <Component {...pageProps} />
      
      <div id="mess">
        <MessengerChat
            pageId="439837656560955"
        />
      </div> 
    
    </>
}

export default MyApp
