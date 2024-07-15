import { useEffect, useState } from "react";
import { Card, Group, Text } from "@mantine/core";
import { IconArrowUp } from "@tabler/icons-react";

import classes from "./RedditCard.module.scss";

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
    if (
      false
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
          style={{ maxWidth: "8%", height: "auto", marginRight: "12px" }}
        />
      );
    }
  };

  return (
    <div>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <Card className={classes.redditCard} display={"flex"}>
          <Card.Section>
            <Text className={classes.redditCard__header} fw={900} size={"xl"}>
              Top Reddit Posts{" "}
            </Text>
          </Card.Section>

          {topPosts.map((post: RedditPost) => (
            <Card.Section
              className={classes.redditCard__entry}
              key={post.id}
              mx={20}
              my={20}
              display={"flex"}
            >
              <Group>
                {renderImage(post)}
                <a
                  href={post.url}
                  style={{ textDecoration: "none" }}
                  target="blank"
                >
                  {post.title}
                </a>
              </Group>

              <Group>
                <Text>{post.score}</Text>
                <IconArrowUp />
              </Group>
            </Card.Section>
          ))}
        </Card>
      )}
    </div>
  );
};

export default RedditCard;
