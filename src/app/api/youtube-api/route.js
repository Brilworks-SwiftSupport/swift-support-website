import { NextResponse } from 'next/server';

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY
import {
    YoutubeTranscript,
  } from "youtube-transcript";

export async function GET(req) {
    console.log("API Called")
    const { searchParams } = new URL(req.url);
    const videoId = searchParams.get("videoId");
    const lang = searchParams.get("lang");
    const axios = require('axios');

    if (!videoId) {
        return new Response(
        JSON.stringify({ error: "Missing videoId parameter" }),
        {
            status: 400,
            headers: { "Content-Type": "application/json" },
        }
        );
    }

    const apiKey = YOUTUBE_API_KEY
    const apiUrl = `https://www.googleapis.com/youtube/v3/captions`;
    
    try {
        // Get the list of caption tracks for the video
        const response = await axios.get(apiUrl, {
        params: {
            part: 'id,snippet',
            videoId: videoId,
            key: apiKey,
        },
        });
    
        const captions = response.data.items;
        console.log(captions)
    
        if (captions.length === 0) {
        console.log('No captions available for this video');
        return;
        }
        // Filter captions to only include English language ('en')
        const englishCaptions = captions.filter(caption => caption.snippet.language === lang);

        if (englishCaptions.length === 0) {
            console.log('No English captions available for this video');
            return;
        }

        console.log(captions[0].snippet.videoId)
        const captionContent = await YoutubeTranscript.fetchTranscript(captions[0].snippet.videoId);
        console.log(captionContent)
        const allText = captionContent.map(item => item.text).join(' ');

        return NextResponse.json({ success: true, data: allText });
    } catch (error) {
        console.error('Error fetching captions:', error);
        return NextResponse.json(
            { error: error.message || 'An unknown error occurred.' },
            { status: error.status || 500 }
          );
    };

      

   
  
};
