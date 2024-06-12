import React, { useEffect, useState } from "react";
import { CardContent, CircularProgress } from "@mui/material";
import { Card, Text } from "@mantine/core";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

import "./RedditCard.scss";
import { Reddit } from "@mui/icons-material";

const RedditCard = () => {
  const [topPosts, setTopPosts] = useState<RedditPost[]>([]);
  const [loading, setLoading] = useState(true);

  interface RedditPost {
  id: string;
  title: string;
  url: string;
  score: number;
  // add other fields you need from the post
}

  useEffect(() => {
    const fetchTopPosts = async () => {
      try {
        const response = await fetch(
          "https://www.reddit.com/r/anime/top.json?t=day&limit=5"
        );
        const postsResults = await response.json();

        const redditPosts = postsResults.data.children.map((post: any) => ({
          id: post.data.id,
          title: post.data.title,
          url: post.data.url,
          score: post.data.score,
        }));

        setTopPosts(redditPosts);
      } catch (error) {
        console.error("Error fetching data from Reddit:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopPosts();
  }, []);

  const renderImage = (post: any): JSX.Element => {
    // Need to implement OAuth usage for reddit api to grab thumbnail images
    // Defaulting to reddit placeholder until auth is implemented
    if ( false
      // post.data.preview &&
      // post.data.preview.images[0].resolutions[0] && false
    ) {
      return (
        <img
          src={post.data.preview.images[0].resolutions[2]}
          alt={post.data.title.slice(0, 15) + "..."}
          style={{ maxWidth: "100%", height: "auto", margin: "8px" }}
        />
      );
    } else {
      // Render Reddit placeholder or any default image
      return (
        <img
          src="https://www.redditinc.com/assets/images/site/reddit-logo.png"
          alt="Reddit Placeholder"
          style={{ maxWidth: "10%", height: "auto", marginRight: "12px" }}
        />
      );
    }
  };

  return (
    <div>
      {loading ? (
        <CircularProgress />
      ) : (
        <Card className="redditCard">
          <Text className="redditCard__header">
            Top Reddit Posts{" "}
          </Text>
          {topPosts.map((post:RedditPost) => (
            <Card
              className="redditCard__entry"
              key={post.id}
            >
              <CardContent className="redditCard__content">
                <Text
                  className="redditCard__title"
                  variant="body1"
                >
                  {renderImage(post)}
                  <a
                    href={post.url}
                    style={{ textDecoration: "none", color: "#C2C2C0" }}
                    target="blank"
                  >
                    {post.title}
                  </a>
                </Text>
                <Text
                  variant="body2"
                  color="#C2C2C0"
                  className="redditCard__entry_stats"
                >
                  <ArrowUpwardIcon sx={{ color: "#FE4515" }} />
                  {post.score}
                </Text>
              </CardContent>
            </Card>
          ))}
        </Card>
      )}
    </div>
  );
};

export default RedditCard;