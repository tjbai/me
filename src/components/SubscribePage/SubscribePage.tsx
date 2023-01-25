import { Button, Flex, Input, Text, VStack } from "@chakra-ui/react";
import { ref, push, set } from "firebase/database";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firestore/clientApp";

const SubscribePage = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [who, setWho] = useState("");
  const navigate = useNavigate();

  const handleAddEmail = () => {
    setLoading(true);
    const emailListRef = ref(db, "emails");
    const newEmailRef = push(emailListRef);
    set(newEmailRef, { email, who })
      .catch((err) => console.log("error subscribing...", err))
      .finally(() => {
        setLoading(false);
        navigate("/");
      });
  };

  return (
    <Flex flex={1} bg="bg" p={5} direction="column" minH="100vh">
      <VStack maxW="300px" direction="column" align="flex-start">
        <Text textStyle="t1">Whoa, you're gonna subscribe?</Text>
        <Input
          placeholder="who you"
          bg="white"
          value={who}
          onChange={(e) => setWho(e.target.value)}
          px={3}
          focusBorderColor="none"
          variant="flushed"
        />
        <Input
          placeholder="put yo email here"
          bg="white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          px={3}
          focusBorderColor="none"
          variant="flushed"
        />
        <Button
          colorScheme="telegram"
          borderRadius="0px"
          w="100%"
          isLoading={loading}
          onClick={handleAddEmail}
        >
          Submit
        </Button>
      </VStack>
    </Flex>
  );
};

export default SubscribePage;
