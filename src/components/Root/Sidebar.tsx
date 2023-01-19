import { Icon, VStack, Link } from "@chakra-ui/react";
import { FiSend } from "react-icons/fi";
import { RiSave3Fill } from "react-icons/ri";
import { ImHome } from "react-icons/im";
import { RiEditBoxLine } from "react-icons/ri";
import { Link as RRLink, useLocation, useNavigate } from "react-router-dom";
import { useModal } from "../ModalProvider/ModalProvider";
import { useAuth } from "../AuthProvider/AuthProvider";

const Sidebar = () => {
  const { setPublishConfirmOpen, setTauntOpen, setSaveConfirmOpen } =
    useModal();
  const { loggedIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavToCreate = () => {
    if (loggedIn) {
      navigate("create");
    } else {
      setTauntOpen(true);
    }
  };

  return (
    <VStack
      minH="100vh"
      width="50px"
      bg="darkbg"
      color="bg"
      fontSize="30px"
      direction="column"
      align="center"
      py={3}
      spacing={7}
    >
      {location.pathname === "/create" ? (
        <>
          <Icon
            as={FiSend}
            _hover={{ cursor: "pointer" }}
            onClick={() => setPublishConfirmOpen(true)}
          />
          <Icon
            as={RiSave3Fill}
            _hover={{ cursor: "pointer" }}
            onClick={() => setSaveConfirmOpen(true)}
          />
          <Link as={RRLink} to="/">
            <Icon as={ImHome} />
          </Link>
        </>
      ) : (
        <>
          <Icon
            as={RiEditBoxLine}
            _hover={{ cursor: "pointer" }}
            onClick={handleNavToCreate}
          />
        </>
      )}
    </VStack>
  );
};

export default Sidebar;
