import { Flex, Icon } from "@chakra-ui/react";
import Preview from "../CreatePage/Preview";
import { useSelectedPost } from "./HomePage";
import { FiBookOpen } from "react-icons/fi";

const Reader = () => {
  const { selectedPost } = useSelectedPost();

  if (!selectedPost) {
    return (
      <Flex flex={1} bg="bg" align="center" justify="center" p={5}>
        <Icon as={FiBookOpen} fontSize="50px" color="darkbg" />
      </Flex>
    );
  }

  return (
    <Preview
      givenBody={selectedPost.body}
      givenTitle={selectedPost.title}
      givenDate={selectedPost.createdDate}
    />
  );
};

export default Reader;
