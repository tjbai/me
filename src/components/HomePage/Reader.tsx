import { Flex, Icon } from "@chakra-ui/react";
import { FiBookOpen } from "react-icons/fi";
import Preview from "../CreatePage/Preview";
import { useHome } from "../HomeProvider/HomeProvider";

const Reader = () => {
  const { selectedPost, menuOpen } = useHome();

  if (!selectedPost) {
    return (
      <Flex
        flex={1}
        bg="bg"
        align="center"
        justify="center"
        p={5}
        display={{ base: menuOpen ? "none" : "flex", md: "flex" }}
      >
        <Icon as={FiBookOpen} fontSize="50px" color="darkbg" />
      </Flex>
    );
  }

  return <Preview post={selectedPost} />;
};

export default Reader;
