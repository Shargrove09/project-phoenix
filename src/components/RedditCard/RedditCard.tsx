import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, CircularProgress } from "@mui/material";
import { flexbox } from "@mui/system";

const RedditCard = () => {
  const [topPosts, setTopPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopPosts = async () => {
      try {
        const response = await fetch(
          "https://www.reddit.com/r/anime/top.json?t=day&limit=5"
        );
        const postsResults = await response.json();
        console.log("Post results", postsResults);
        setTopPosts(postsResults.data.children);
      } catch (error) {
        console.error("Error fetching data from Reddit:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopPosts();
  }, []);

  const renderImage = (post) => {
    if (post.data.preview && post.data.preview.images[0].resolutions[0]) {
      return (
        <img
          src={post.data.preview.images[0].resolutions[2].url}
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
          style={{ maxWidth: "10%", height: "auto" }}
        />
      );
    }
  };

  return (
    <div>
      {loading ? (
        <CircularProgress />
      ) : (
        topPosts.map((post) => (
          <Card
            className="redditCard"
            key={post.data.id}
            style={{ marginBottom: "16px" }}
          >
            <CardContent
              className="redditCard__content"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Typography
                className="redditCard__title"
                variant="body1"
                gutterBottom
                sx={{ display: "flex", alignItems: "center" }}
              >
                {renderImage(post)}
                <a href={post.data.url}>{post.data.title}</a>
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Author: {post.data.author} | Score: {post.data.score}
              </Typography>
              {/* <Typography variant="body1" style={{ marginTop: "8px" }}>
                {post.data.selftext || "No additional text"}
              </Typography> */}
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default RedditCard;
