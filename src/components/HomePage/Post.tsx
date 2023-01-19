import { Flex, Text } from "@chakra-ui/react";
import { useAuth } from "../AuthProvider/AuthProvider";
import { useModal } from "../ModalProvider/ModalProvider";
import { PostType, useSelectedPost } from "./HomePage";

const Post = ({ post, isDraft }: { post: PostType; isDraft?: boolean }) => {
  const { setSelectedPost, selectedPost } = useSelectedPost();
  const { loggedIn } = useAuth();
  const { setTauntOpen } = useModal();

  const handleSelectPost = () => {
    if (!loggedIn && isDraft) {
      setTauntOpen(true);
    } else if (selectedPost && selectedPost.key === post.key) {
      setSelectedPost(null);
    } else {
      setSelectedPost(post);
    }
  };

  return (
    <Flex
      direction="column"
      border="1px solid"
      borderColor="bg"
      p={3}
      transition="0.2s ease-in-out"
      bg={selectedPost?.key === post.key ? "bg" : "white"}
      _hover={{ cursor: "pointer", bg: "bg" }}
      onClick={handleSelectPost}
    >
      <Flex direction="row" align="flex-end" justify="space-between">
        <Text lineHeight="20px" fontSize="25px" fontWeight="bold">
          {post.title}
        </Text>
        <Text lineHeight="20px" fontSize="20px">
          {post.createdDate}
        </Text>
      </Flex>
    </Flex>
  );
};

export default Post;
