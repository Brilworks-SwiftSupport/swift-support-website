"use client"
import { useEffect, useState} from 'react';
import Script from "next/script";

const LoadScripts = ({}) => {
  const [script, setScript] = useState(<></>)
  useEffect(() => {
    const loadScripts = () => {
      setTimeout(() => {
        setScript(<ScritpAnaltics/>)
      }, 3000); // Adjust the delay as needed (5000ms = 5 seconds)
    };

    if (document.readyState === 'complete') {
      loadScripts();
    } else {
      window.addEventListener('load', loadScripts);
      return () => window.removeEventListener('load', loadScripts);
    }
  }, []);

  return script;
};

export default LoadScripts;



const ScritpAnaltics=()=>{
  return(         
    <>
      <Script defer id="tag-manager">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}')`}
      </Script>
     
      <Script defer id="fb-pixel">
        {`!function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${process.env.NEXT_PUBLIC_FB_PIXEL_ID}');
      fbq('track', 'PageView')`}
      </Script>

      <Script defer id="clarity">
        {`(function(c,l,a,r,i,t,y){
      c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
      t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
      y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", '${process.env.NEXT_PUBLIC_CLARITY_ID}');`}
      </Script>
    </>
)
}