import HomePage from "./(pages)/home/page";

export const metadata = {
  title: "SwiftSupport: Live Chat Software | AI Chatbot for Website and App",
  description:
    "Transform your customer interactions with SwiftSupport.ai! Discover the Best Live Chat / AI Chatbots for your website and app. Boost engagement and watch your business thrive!",
  openGraph: {
    title: "SwiftSupport: Live Chat Software | AI Chatbot for Website and App",
    description:
      "Transform your customer interactions with SwiftSupport.ai! Discover the Best Live Chat / AI Chatbots for your website and app. Boost engagement and watch your business thrive!",
    url: process.env.NEXT_PUBLIC_BASE_URL,
    siteName: "SwiftSupport",
    locale: "en-US",
    type: "website",
  },
  twitter: {
    title: "SwiftSupport: Live Chat Software | AI Chatbot for Website and App",
    description:
      "Transform your customer interactions with SwiftSupport.ai! Discover the Best Live Chat / AI Chatbots for your website and app. Boost engagement and watch your business thrive!",
    card: "summary_large_image",
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_BASE_URL,
  },
};
export default function Home() {
  return <HomePage />;
}
