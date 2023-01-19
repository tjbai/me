import { Flex } from "@chakra-ui/react";
import { ref } from "firebase/database";
import { createContext, useContext, useState } from "react";
import { useListVals } from "react-firebase-hooks/database";
import { prettifyDate } from "../../constants/utils";
import { db } from "../../firestore/clientApp";
import TauntModal from "../Modals/TauntModal";
import Drafts from "./Drafts";
import Login from "./Login";
import PublishedPosts from "./PublishedPosts";
import Reader from "./Reader";

export interface PostType {
  title: string;
  body: string;
  createdDate: string;
  key: string;
}

interface SelectedPostInterface {
  selectedPost: PostType | null;
  setSelectedPost: (val: PostType | null) => void;
}

const SelectedPostContext = createContext({} as SelectedPostInterface);

const HomePage = () => {
  const [selectedPost, setSelectedPost] = useState<PostType | null>(null);

  const [publishedSnapshots, publishedLoading, publishedError] =
    useListVals<PostType>(ref(db, "published_posts"), {
      keyField: "key",
      transform: (val: PostType) => {
        return {
          ...val,
          createdDate: prettifyDate(new Date(val.createdDate)),
        };
      },
    });

  const [draftSnapshots, draftLoading, draftError] = useListVals<PostType>(
    ref(db, "drafts"),
    {
      keyField: "key",
      transform: (val: PostType) => {
        return {
          ...val,
          createdDate: prettifyDate(new Date(val.createdDate)),
        };
      },
    }
  );

  return (
    <SelectedPostContext.Provider value={{ selectedPost, setSelectedPost }}>
      <TauntModal />

      <Flex direction="row" minH="100vh" flex={1}>
        <Flex bg="white" direction="column" flex={1}>
          <Login />
          <PublishedPosts
            error={publishedError}
            loading={publishedLoading}
            posts={publishedSnapshots}
          />
          <Drafts
            error={draftError}
            loading={draftLoading}
            posts={draftSnapshots}
          />
        </Flex>

        <Reader />
      </Flex>
    </SelectedPostContext.Provider>
  );
};

const useSelectedPost = () => useContext(SelectedPostContext);

export default HomePage;
export { useSelectedPost };
