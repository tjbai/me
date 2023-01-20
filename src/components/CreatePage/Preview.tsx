import { Flex, keyframes, Text } from "@chakra-ui/react";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { prettifyDate } from "../../constants/utils";
import { usePostContext } from "./CreatePage";

const animationKeyframes = keyframes`
  0% { transform: rotate(0); }
  25% { transform: rotate(90deg); }
  50% { transform: rotate(180deg); }
  75% { transform: rotate(270deg); }
  100% { transform: rotate(360deg); }
`;

const animation = `${animationKeyframes} 5s ease-in-out infinite`;

// Add display macros here
const previewTheme = {
  p: (props: any) => {
    const { children } = props;
    if (!children) {
      return <></>;
    }

    const cand = children[0];
    if (cand.substring(0, 5) === "$spin") {
      const split = cand.split("/");
      const size = split[1],
        word = split[2];
      return (
        <Flex
          as={motion.div}
          animation={animation}
          padding="2"
          w="fit-content"
          fontSize={size}
          m={10}
        >
          {word}
        </Flex>
      );
    } else if (cand.substring(0, 1) === "$") {
      return (
        <Text textStyle="t2" mb={2}>
          {children[0].substring(1)}
        </Text>
      );
    }
    return <Text>{children}</Text>;
  },
};

const Preview = ({
  givenTitle,
  givenBody,
  givenDate,
}: {
  givenTitle?: string;
  givenBody?: string;
  givenDate?: string;
}) => {
  const { body, title } = usePostContext();

  return (
    <Flex
      flex={1}
      whiteSpace="pre-line"
      p={5}
      bg="bg"
      maxH="100vh"
      overflow="scroll"
    >
      <Flex direction="column" maxW="700px" height="100%">
        <Flex
          direction="column"
          mb={5}
          pb={2}
          borderBottom="2px solid"
          borderColor="grey"
        >
          <Text textStyle="t1">{givenTitle ? givenTitle : title}</Text>

          <Flex fontSize={{ base: "15px", md: "17px" }}>
            <Text mr={2}>By TJ Bai, </Text>
            <Text>{givenDate ? givenDate : prettifyDate(new Date())}</Text>
          </Flex>
        </Flex>

        <ReactMarkdown
          components={ChakraUIRenderer(previewTheme)}
          children={givenBody ? givenBody : body}
          skipHtml
        />
      </Flex>
    </Flex>
  );
};

export default Preview;
