"use client";
import React, { useEffect,useState} from "react";
import YouTube from "react-youtube";


const YouTubeVideoDetails= ({pageData}) => {
      const [videoId, setVideoId] = useState("");
    
    const opts = {
        height: "315",
        width: "100%",
        playerVars: {
          autoplay: 0,
        },
      };

    const extractVideoId = (url) => {
        const regex =
          /(?:https?:\/\/(?:www\.)?youtube\.com\/.*?[?&]v=|https?:\/\/(?:www\.)?youtu\.be\/)([\w-]{11})/;
        const match = url.match(regex);
        return match && match[1] ? match[1] : null;
    };

    useEffect(() => {
        if (pageData?.youtube_url) {
            const id = extractVideoId(pageData.youtube_url);
            setVideoId(id);
        }
    }, [pageData.youtube_url]);
    
                

    return (

        <main className="mt-5 md:mt-5 mx-auto px-4">
         <div className="container mx-auto max-w-[100%] md:max-w-[80%] bg-transparent mb-32">

            
                <div className="text-center">
                    <h1 className="text-3xl font-bold mb-4 mt-2">{pageData.video_title || "Video Title"}</h1>
                </div>

                <div className="flex flex-col items-center justify-center space-y-4 px-4 sm:px-8">
                {videoId ? (
                <div className="w-full max-w-md sm:max-w-xl">
                <YouTube
                    videoId={videoId}
                    opts={opts}
                    className="rounded-md shadow-lg w-full"
                />
                </div>
                ) : (
                <p className="text-center text-gray-500 text-sm sm:text-base">
                Unable to load video.
                </p>
                )}
              

                <a
                    href={pageData?.youtube_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-black text-white rounded-full py-3 px-8 text-center font-semibold hover:bg-gray-800 transition duration-300"
                >
                    Watch Video
                </a>
                </div>

            
                    <h2 className="text-2xl font-semibold mb-4 text-center mt-4">Summary</h2>
                    <div className="bg-gray-50 p-4 rounded-lg shadow-lg max-h-[400px] overflow-y-auto">
                        <p className="text-gray-900 whitespace-pre-wrap text-xl">
                            {pageData.summary || "Transcript is not available for this video."}
                        </p>
                    </div>
               

                
                {/* Full Transcript Section */}
   
                    <h2 className="text-2xl font-semibold mb-4 text-center mt-4">Full Transcript</h2>
                    <div className="bg-gray-100 p-4 rounded-lg shadow-lg max-h-[600px] overflow-y-auto">
                        <p className="text-gray-900 whitespace-pre-wrap text-xl">
                            {pageData.transcript || "Transcript is not available for this video."}
                        </p>
                    </div>
            
        </div>
        </main>
    )

}

export default YouTubeVideoDetails;