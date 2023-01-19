import { Flex } from "@chakra-ui/react";
import { createContext, useContext, useState } from "react";
import PublishModal from "../Modals/PublishModal";
import SaveModal from "../Modals/SaveModal";
import Editor from "./Editor";
import Preview from "./Preview";

interface PostContextInterface {
  title: string;
  setTitle: (val: string) => void;
  body: string;
  setBody: (val: string) => void;
}

const PostContext = createContext({} as PostContextInterface);

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  return (
    <PostContext.Provider value={{ title, setTitle, body, setBody }}>
      <Flex direction="row" minH="100vh" flex={1}>
        <PublishModal />
        <SaveModal />
        <Editor />
        <Preview />
        {/* <Sidebar /> */}
      </Flex>
    </PostContext.Provider>
  );
};

const usePostContext = () => useContext(PostContext);

export default CreatePage;
export { usePostContext };
