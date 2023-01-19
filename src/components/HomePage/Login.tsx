import { Button, Flex, Input } from "@chakra-ui/react";
import { useState } from "react";
import { useAuth } from "../AuthProvider/AuthProvider";
import { useModal } from "../ModalProvider/ModalProvider";

const Login = () => {
  const [pass, setPass] = useState("");
  const { loggedIn, setLoggedIn } = useAuth();
  const { setTauntOpen } = useModal();

  if (loggedIn) {
    return <></>;
  }

  const handleYeah = () => {
    if (pass === process.env.REACT_APP_PASSWORD) {
      setLoggedIn(true);
      localStorage.setItem("loggedIn", "true");
    } else {
      setTauntOpen(true);
      setPass("");
    }
  };

  return (
    <Flex
      textStyle="b1"
      direction="row"
      width="100%"
      align="center"
      justify="space-between"
      px={2}
    >
      <Input
        px={1}
        py={0}
        value={pass}
        onChange={(e) => setPass(e.target.value)}
        placeholder="Are you me?"
        variant="flushed"
        focusBorderColor="none"
        border="0px"
        width="100%"
        css={{ WebkitTextSecurity: "disc" }}
      />
      <Button
        borderRadius="0px"
        variant="outline"
        borderColor="bg"
        height="30px"
        width="60px"
        color="midbg"
        _hover={{
          bg: "bg",
        }}
        onClick={handleYeah}
      >
        Yeah
      </Button>
    </Flex>
  );
};

export default Login;
