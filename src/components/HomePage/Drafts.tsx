import { Flex } from "@chakra-ui/react";
import { Val } from "react-firebase-hooks/database/dist/database/types";
import { PostType } from "./HomePage";
import Post from "./Post";

const Drafts = ({
  posts,
  error,
  loading,
}: {
  posts: Val<PostType, "", "">[] | undefined;
  error: Error | undefined;
  loading: boolean;
}) => {
  if (error) {
    return <Flex flex={1}>Error fetching drafts...{error.toString()}</Flex>;
  }

  if (loading) {
    return <Flex flex={1}>Loading Drafts..</Flex>;
  }

  return (
    <Flex direction="column" justify="flex-start">
      <Flex width="100%" textStyle="t1" px={3} bg="darkbg" color="bg">
        Drafts
      </Flex>
      <Flex direction="column-reverse">
        {posts?.map((post) => (
          <Post key={post.key} post={post} isDraft />
        ))}
      </Flex>
    </Flex>
  );
};

export default Drafts;
