import { Box, Flex, Text } from "@chakra-ui/react";
import moment from "moment";
import { prettifyDate } from "../../constants/utils";
import { useAuth } from "../AuthProvider/AuthProvider";
import { PostType, useHome } from "../HomeProvider/HomeProvider";
import { useModal } from "../ModalProvider/ModalProvider";

const Post = ({ post }: { post: PostType }) => {
  const { setSelectedPost, selectedPost, verboseDates, setMenuOpen } =
    useHome();
  const { loggedIn } = useAuth();
  const { setTauntOpen } = useModal();

  moment.updateLocale("en", {
    relativeTime: {
      s: "secs",
      ss: "%d secs",
      m: "1 min",
      mm: "%d mins",
      h: "1h",
      hh: "%dh",
      d: "1d",
      dd: "%dd",
      M: "1m",
      MM: "%dm",
      y: "1y",
      yy: "%dy",
    },
  });

  const handleSelectPost = () => {
    if (!loggedIn && post.state === "draft") {
      setTauntOpen(true);
    } else if (selectedPost && selectedPost.key === post.key) {
      console.log("resetting");
      setSelectedPost(null);
      setMenuOpen(false);
    } else {
      setSelectedPost(post);
      setMenuOpen(false);
    }
  };

  return (
    <Flex
      direction="column"
      border="1px solid"
      borderColor="bg"
      p={3}
      py={2}
      transition="0.2s ease-in-out"
      bg={selectedPost?.key === post.key ? "bg" : "white"}
      _hover={{ cursor: "pointer", bg: "bg" }}
      onClick={handleSelectPost}
    >
      <Flex direction="row" align="center" justify="space-between">
        <Box
          fontSize={{ base: "12px", lg: "15px" }}
          fontWeight="bold"
          textOverflow="ellipsis"
          overflow="hidden"
          whiteSpace="nowrap"
        >
          {selectedPost?.key === post.key ? "*" + post.title + "*" : post.title}
        </Box>
        <Text
          fontSize={{ base: "0px", md: "10px", lg: "15px" }}
          whiteSpace="nowrap"
          ml={5}
        >
          {verboseDates
            ? prettifyDate(new Date(post.createdDate))
            : moment(new Date(post.createdDate)).fromNow()}
        </Text>
      </Flex>
    </Flex>
  );
};

export default Post;
