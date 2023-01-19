import { Icon, VStack, Link } from "@chakra-ui/react";
import { FiSend } from "react-icons/fi";
import { RiSave3Fill } from "react-icons/ri";
import { ImHome } from "react-icons/im";
import { Link as RRLink } from "react-router-dom";
import { useModal } from "../ModalProvider/ModalProvider";

const Sidebar = () => {
  const { setPublishConfirmOpen } = useModal();

  return (
    <VStack
      minH="100vh"
      width="50px"
      bg="darkbg"
      color="bg"
      fontSize="25px"
      direction="column"
      align="center"
      py={7}
      spacing={7}
    >
      <Icon
        as={FiSend}
        _hover={{ cursor: "pointer" }}
        onClick={() => setPublishConfirmOpen(true)}
      />
      <Icon as={RiSave3Fill} _hover={{ cursor: "pointer" }} />
      <Link as={RRLink} to="/">
        <Icon as={ImHome} />
      </Link>
    </VStack>
  );
};

export default Sidebar;
