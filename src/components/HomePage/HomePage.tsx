import { Flex } from "@chakra-ui/react";
import DeleteModal from "../Modals/DeleteModal";
import TauntModal from "../Modals/TauntModal";
import Menu from "./Menu";
import Reader from "./Reader";

const HomePage = () => {
  return (
    <Flex direction="row" minH="100vh" flex={1}>
      <TauntModal />
      <DeleteModal />

      <Menu />
      <Reader />
    </Flex>
  );
};

export default HomePage;
