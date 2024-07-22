import dynamic from "next/dynamic";
import "./globals.css";
import "./styles/Animation.scss";
import Script from "next/script";
import { storyblokInit, apiPlugin } from "@storyblok/react/rsc";
import StoryblokProvider from "./components/StoryblokProvider";

storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
  use: [apiPlugin],
});

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL),
};

const Header = dynamic(() => import("./components/Header"));
const Footer = dynamic(() => import("./components/Footer"));

export default function RootLayout({ children }) {
  return (
    <StoryblokProvider>
      <html lang="en">
        <head>
          {process.env.VERCEL_ENV === "production" && (
            <>
              <Script defer id="tag-manager">
                {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${process.env.GTM_ID}')`}
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
              fbq('init', '${process.env.FB_PIXEL_ID}');
              fbq('track', 'PageView')`}
              </Script>

              <Script defer id="clarity">
                {`(function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", '${process.env.CLARITY_ID}');`}
              </Script>
            </>
          )}
          {process.env.VERCEL_ENV === "production" && (
            <meta
              name="google-site-verification"
              content="c0Wa7YSps4FhBSg1lMMWnE7_livU8FgBZAbCRtwW6JE"
            />
          )}
        </head>
        <body suppressHydrationWarning={true}>
          {process.env.VERCEL_ENV === "production" && (
            <>
              <noscript>
                <iframe
                  src={`https://www.googletagmanager.com/ns.html?id=${process.env.GTM_ID}`}
                  height="0"
                  width="0"
                  style={{
                    display: "none",
                    visibility: "hidden",
                  }}
                ></iframe>
              </noscript>
              <noscript>
                <img
                  height="1"
                  width="1"
                  style={{ display: "none" }}
                  src={`https://www.facebook.com/tr?id=${process.env.FB_PIXEL_ID}&ev=PageView&noscript=1`}
                  alt="Facebook"
                />
              </noscript>
            </>
          )}
          <Header />
          {children}
          <Footer />
        </body>
      </html>
    </StoryblokProvider>
  );
}
