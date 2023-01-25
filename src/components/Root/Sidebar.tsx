import { Flex, VStack } from "@chakra-ui/react";
import { AiOutlineMenu } from "react-icons/ai";
import { BiTime } from "react-icons/bi";
import { FaBookmark, FaEye } from "react-icons/fa";
import { FiSend, FiTrash2 } from "react-icons/fi";
import { ImHome } from "react-icons/im";
import { MdAddBox } from "react-icons/md";
import { RiEditBoxLine, RiSave3Fill } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthProvider/AuthProvider";
import { useHome } from "../HomeProvider/HomeProvider";
import { useModal } from "../ModalProvider/ModalProvider";
import Hicon from "./Hicon";

const Sidebar = () => {
  const {
    setPublishConfirmOpen,
    setTauntOpen,
    setSaveConfirmOpen,
    setDeleteOpen,
  } = useModal();
  const { loggedIn } = useAuth();
  const {
    selectedPost,
    setSelectedPost,
    setVerboseDates,
    verboseDates,
    menuOpen,
    setMenuOpen,
  } = useHome();
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

  let startButtons;
  const spookyMenuButton = (
    <Flex display={{ base: "flex", md: "none" }}>
      <Hicon as={AiOutlineMenu} onClick={() => setMenuOpen(!menuOpen)} />
    </Flex>
  );

  if (location.pathname === "/create") {
    startButtons = (
      <>
        <Hicon as={ImHome} onClick={() => navigate("/")} />
        <Hicon as={RiSave3Fill} onClick={() => setSaveConfirmOpen(true)} />
        <Hicon as={FiSend} onClick={() => setPublishConfirmOpen(true)} />
      </>
    );
  } else if (location.pathname === "/") {
    startButtons = (
      <>
        {loggedIn ? (
          <Hicon as={MdAddBox} onClick={() => handleNavToCreate(true)} />
        ) : (
          <></>
        )}

        {selectedPost?.state === "draft" ? (
          <>
            <Hicon as={RiEditBoxLine} onClick={() => handleNavToCreate()} />
            <Hicon as={FiTrash2} onClick={() => setDeleteOpen(true)} />
          </>
        ) : (
          <>
            <Hicon
              as={FaEye}
              onClick={() => {
                setMenuOpen(false);
                navigate(`${selectedPost?.key}`);
              }}
              isDisabled={selectedPost?.state !== "published"}
            />
          </>
        )}

        <Hicon as={BiTime} onClick={() => setVerboseDates(!verboseDates)} />
        <Hicon as={FaBookmark} onClick={() => navigate("/subscribe")} />
      </>
    );
  } else {
    startButtons = (
      <Flex mt={{ base: "0px", md: "6px" }}>
        <Hicon as={ImHome} onClick={() => navigate("/")} />
      </Flex>
    );
  }

  return (
    <Flex
      minH={{ base: "50px", md: "100vh" }}
      minW={{ base: "100vw", md: "50px" }}
      width="50px"
      bg="darkbg"
      color="white"
      fontSize="30px"
      align="center"
      py={3}
      direction={{ base: "row", md: "column" }}
    >
      <Flex flex={1} direction={{ base: "row", md: "column" }}>
        {startButtons}
      </Flex>

      {location.pathname === "/" || location.pathname === "/create" ? (
        <Flex
          flex={1}
          direction={{ base: "row", md: "column" }}
          justify="flex-end"
        >
          {spookyMenuButton}
        </Flex>
      ) : (
        <></>
      )}
    </Flex>
  );
};

export default Sidebar;
