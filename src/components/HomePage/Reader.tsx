import { Flex, Icon } from "@chakra-ui/react";
import Preview from "../CreatePage/Preview";
import { FiBookOpen } from "react-icons/fi";
import { useHome } from "../HomeProvider/HomeProvider";
import { prettifyDate } from "../../constants/utils";

const Reader = () => {
  const { selectedPost } = useHome();

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
      givenDate={prettifyDate(new Date(selectedPost.createdDate))}
    />
  );
};

export default Reader;
