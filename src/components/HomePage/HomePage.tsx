import { Flex } from "@chakra-ui/react";
import { ref } from "firebase/database";
import { useListVals } from "react-firebase-hooks/database";
import { db } from "../../firestore/clientApp";
import { PostType, useHome } from "../HomeProvider/HomeProvider";
import DeleteModal from "../Modals/DeleteModal";
import TauntModal from "../Modals/TauntModal";
import Drafts from "./Drafts";
import Login from "./Login";
import PublishedPosts from "./PublishedPosts";
import Reader from "./Reader";

const HomePage = () => {
  const { menuOpen } = useHome();

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

  return (
    <>
      <TauntModal />
      <DeleteModal />

      <Flex direction="row" minH="100vh" flex={1}>
        <Flex
          bg="white"
          direction="column"
          flex={1}
          // w={{ base: "100%", mobile: "30%" }}
          maxW={{ base: "100%", md: "30%" }}
          position="sticky"
          top="0px"
          display={{ base: menuOpen ? "flex" : "none", md: "flex" }}
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
