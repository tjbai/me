import { Flex } from "@chakra-ui/react";
import { ref } from "firebase/database";
import { useEffect } from "react";
import { useListVals } from "react-firebase-hooks/database";
import { db } from "../../firestore/clientApp";
import { PostType } from "../HomeProvider/HomeProvider";
import DeleteModal from "../Modals/DeleteModal";
import TauntModal from "../Modals/TauntModal";
import Drafts from "./Drafts";
import Login from "./Login";
import PublishedPosts from "./PublishedPosts";
import Reader from "./Reader";

const HomePage = () => {
  const [publishedSnapshots, publishedLoading, publishedError] =
    useListVals<PostType>(ref(db, "published_posts"), {
      keyField: "key",
    });

  const [draftSnapshots, draftLoading, draftError] = useListVals<PostType>(
    ref(db, "drafts"),
    {
      keyField: "key",
    }
  );

  useEffect(() => {
    console.log(draftSnapshots);
  }, [draftSnapshots]);

  return (
    <>
      <TauntModal />
      <DeleteModal />

      <Flex direction="row" minH="100vh" flex={1}>
        <Flex
          bg="white"
          direction="column"
          flex={1}
          w="40%"
          maxW="500px"
          position="sticky"
          top="0px"
        >
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
    </>
  );
};

export default HomePage;
