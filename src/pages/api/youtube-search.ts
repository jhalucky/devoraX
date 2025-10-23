import type { NextApiRequest, NextApiResponse } from "next";

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query } = req.query;

  if (!query) return res.status(400).json({ error: "Missing query" });

  try {
    const searchQuery = `${query} NeetCode LeetCode`;
    const r = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
        searchQuery
      )}&key=${YOUTUBE_API_KEY}&maxResults=1&type=video`
    );
    const data = await r.json();

    const video = data.items?.[0];
    if (!video) return res.status(404).json({ error: "No video found" });

    return res.status(200).json({
      title: video.snippet.title,
      videoId: video.id.videoId,
      thumbnail: video.snippet.thumbnails.medium.url,
      channel: video.snippet.channelTitle,
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch YouTube data", details: error.message });
  }
}
