import { Icon } from "@chakra-ui/react";

const Hicon = ({
  as,
  onClick,
  isDisabled = false,
}: {
  as: any;
  onClick: () => any;
  isDisabled?: boolean;
}) => {
  return (
    <Icon
      as={as}
      onClick={isDisabled ? () => {} : onClick}
      mx={{ base: 4, md: 0 }}
      my={{ base: 0, md: 2 }}
      color={isDisabled ? "#8c8989" : "white"}
      fontSize="25px"
      _hover={{ cursor: isDisabled ? "not-allowed" : "pointer" }}
    />
  );
};

export default Hicon;
