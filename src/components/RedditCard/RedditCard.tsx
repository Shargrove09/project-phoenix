import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, CircularProgress } from "@mui/material";

import "./RedditCard.scss";

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
    // Need to implement OAuth usage for reddit api to grab thumbnail images
    // Defaulting to reddit placeholder until auth is implemented
    if (
      post.data.preview &&
      post.data.preview.images[0].resolutions[0] &&
      false
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
        <Card className="redditCard" sx={{ backgroundColor: "#424242" }}>
          <Typography variant="h5" className="redditCard__header">
            {" "}
            Top Reddit Posts{" "}
          </Typography>
          {topPosts.map((post) => (
            <Card
              className="redditCard__entry"
              key={post.data.id}
              sx={{ backgroundColor: "#424242" }}
            >
              <CardContent className="redditCard__content">
                <Typography
                  className="redditCard__title"
                  variant="body1"
                  gutterBottom
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {renderImage(post)}
                  <a
                    href={post.data.url}
                    style={{ textDecoration: "none", color: "#C2C2C0" }}
                    target="blank"
                  >
                    {post.data.title}
                  </a>
                </Typography>
                <Typography
                  variant="body2"
                  color="#C2C2C0"
                  className="redditCard__entry_stats"
                >
                  Author: {post.data.author} | Score: {post.data.score}
                </Typography>
                {/* <Typography variant="body1" style={{ marginTop: "8px" }}>
                {post.data.selftext || "No additional text"}
              </Typography> */}
              </CardContent>
            </Card>
          ))}
        </Card>
      )}
    </div>
  );
};

export default RedditCard;
