import { Flex } from "@chakra-ui/react";
import { Val } from "react-firebase-hooks/database/dist/database/types";
import { PostType } from "../HomeProvider/HomeProvider";
import Post from "./Post";

const Section = ({
  posts,
  error,
  loading,
  title,
}: {
  posts: Val<PostType, "", "">[] | undefined;
  error: Error | undefined;
  loading: boolean;
  title: string;
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
        fontSize={{ base: "15px", lg: "20px" }}
        fontWeight="bold"
        px={3}
        bg="darkbg"
        color="bg"
        py={1}
      >
        {title}
      </Flex>
      <Flex direction="column-reverse">
        {posts?.map((post) => (
          <Post key={post.key} post={post} />
        ))}
      </Flex>
    </Flex>
  );
};

export default Section;
