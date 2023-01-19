import { Flex, Text } from "@chakra-ui/react";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import ReactMarkdown from "react-markdown";
import { prettifyDate } from "../../constants/utils";
import { usePostContext } from "./CreatePage";

// Add display macros here
const previewTheme = {
  p: (props: any) => {
    const { children } = props;
    if (children && children[0].substring(0, 1) === "$") {
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
    <Flex flex={1} whiteSpace="pre-line" p={5} bg="bg">
      <Flex direction="column" maxW="750px">
        <Flex
          direction="column"
          mb={5}
          pb={2}
          borderBottom="2px solid"
          borderColor="grey"
        >
          <Text textStyle="t1">{givenTitle ? givenTitle : title}</Text>

          <Flex>
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
