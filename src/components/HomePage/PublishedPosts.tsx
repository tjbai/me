import { Flex } from "@chakra-ui/react";
import { Val } from "react-firebase-hooks/database/dist/database/types";
import { PostType } from "../HomeProvider/HomeProvider";
import Post from "./Post";

const PublishedPosts = ({
  posts,
  error,
  loading,
}: {
  posts: Val<PostType, "", "">[] | undefined;
  error: Error | undefined;
  loading: boolean;
}) => {
  if (error) {
    return <Flex flex={1}>Error fetching posts...{error.toString()}</Flex>;
  }

  if (loading) {
    return <Flex flex={1}>Loading posts...</Flex>;
  }

  return (
    <Flex direction="column" justify="flex-start">
      <Flex
        width="100%"
        textStyle={{ base: "b1", lg: "t2" }}
        px={3}
        bg="darkbg"
        color="bg"
        py={1}
      >
        Published Posts
      </Flex>
      <Flex direction="column-reverse">
        {posts?.map((post) => (
          <Post key={post.key} post={post} />
        ))}
      </Flex>
    </Flex>
  );
};

export default PublishedPosts;
