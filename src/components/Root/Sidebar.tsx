import { Icon, VStack, Link } from "@chakra-ui/react";
import { FiSend } from "react-icons/fi";
import { RiSave3Fill } from "react-icons/ri";
import { BiTime } from "react-icons/bi";
import { ImHome } from "react-icons/im";
import { RiEditBoxLine } from "react-icons/ri";
import { FiTrash2 } from "react-icons/fi";
import { MdAddBox } from "react-icons/md";
import { Link as RRLink, useLocation, useNavigate } from "react-router-dom";
import { useModal } from "../ModalProvider/ModalProvider";
import { useAuth } from "../AuthProvider/AuthProvider";
import { useHome } from "../HomeProvider/HomeProvider";

const Sidebar = () => {
  const {
    setPublishConfirmOpen,
    setTauntOpen,
    setSaveConfirmOpen,
    setDeleteOpen,
  } = useModal();
  const { loggedIn } = useAuth();
  const { selectedPost, setSelectedPost, setVerboseDates, verboseDates } =
    useHome();
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavToCreate = (reset: boolean = false) => {
    if (loggedIn) {
      if (reset) {
        setSelectedPost(null);
      }
      navigate("create");
    } else {
      setTauntOpen(true);
    }
  };

  let buttons;
  if (location.pathname === "/create") {
    buttons = (
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
    );
  } else if (location.pathname === "/") {
    buttons = (
      <>
        <Icon
          as={MdAddBox}
          _hover={{ cursor: "pointer" }}
          onClick={() => handleNavToCreate(true)}
        />

        {/* Edit draft  */}
        {selectedPost?.state === "draft" ? (
          <>
            <Icon
              as={RiEditBoxLine}
              _hover={{ cursor: "pointer" }}
              onClick={() => handleNavToCreate()}
            />

            <Icon
              as={FiTrash2}
              _hover={{ cursor: "pointer" }}
              onClick={() => setDeleteOpen(true)}
            />
          </>
        ) : (
          <></>
        )}

        <Icon
          as={BiTime}
          justifySelf="flex-end"
          onClick={() => setVerboseDates(!verboseDates)}
          _hover={{ cursor: "pointer" }}
        />
      </>
    );
  }

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
      spacing={5}
    >
      {buttons}
    </VStack>
  );
};

export default Sidebar;
