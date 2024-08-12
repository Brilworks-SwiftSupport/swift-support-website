import dynamic from "next/dynamic";
import "./globals.css";
import "./styles/Animation.scss";
import { storyblokInit, apiPlugin } from "@storyblok/react/rsc";
import StoryblokProvider from "./components/StoryblokProvider";
import { Outfit } from "next/font/google";
import Header from "./components/Header";
import LoadScripts from "./ScriptLoader";
import Script from "next/script";

storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
  use: [apiPlugin],
});
const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--global-font",
});

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL),
};

const Footer = dynamic(() => import("./components/Footer"));

export default function RootLayout({ children }) {
  return (
    <StoryblokProvider>
      <html lang="en" className={`${outfit.variable}`}>
        <head>
          {process.env.VERCEL_ENV === "production" && (
            <>
              <meta
                name="google-site-verification"
                content="c0Wa7YSps4FhBSg1lMMWnE7_livU8FgBZAbCRtwW6JE"
              />
            </>
          )}
           <meta name="robots" content="noindex,nofollow" />
          <Script
            defer
            id="chatbot"
          >{`window.chatBotConfig = {agentId: 171}`}</Script>
          <Script
            defer
            id="chatbot-widget-script"
            src="https://app.swiftsupport.ai/ChatbotScripts/chatbotBubble.js"
          />
        </head>
        <body suppressHydrationWarning={true}>
          <Header />
          {children}
          <Footer />
          <LoadScripts />
        </body>
      </html>
    </StoryblokProvider>
  );
}
