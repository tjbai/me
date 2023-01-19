import { Flex } from "@chakra-ui/react";
import { Post } from "./HomePage";

const PublishedPosts = ({ posts }: { posts: Post[] }) => (
  <Flex flex={1}>published</Flex>
);

export default PublishedPosts;
