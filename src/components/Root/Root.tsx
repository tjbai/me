import { Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Root = () => {
  return (
    <Flex direction="row">
      <Outlet />
      <Sidebar />
    </Flex>
  );
};

export default Root;
