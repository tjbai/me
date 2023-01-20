import { Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Root = () => {
  return (
    <Flex direction="row">
      <Sidebar />
      <Outlet />
    </Flex>
  );
};

export default Root;
