import { HStack, Link } from "@chakra-ui/react";
import { Link as RRLink } from "react-router-dom";

const Footer = () => {
  return (
    <HStack
      flex={1}
      height="30px"
      bg="darkbg"
      color="#e8e8e8"
      p={5}
      spacing={10}
      direction="row"
    >
      <Link as={RRLink} to="/subscribe">
        Subscribe
      </Link>
    </HStack>
  );
};

export default Footer;
