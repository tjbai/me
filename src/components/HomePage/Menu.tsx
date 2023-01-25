import { Flex } from "@chakra-ui/react";
import { ref } from "firebase/database";
import { useListVals } from "react-firebase-hooks/database";
import { db } from "../../firestore/clientApp";
import { PostType, useHome } from "../HomeProvider/HomeProvider";
import Login from "./Login";
import Section from "./Section";

const Menu = () => {
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
    <Flex
      bg="white"
      direction="column"
      flex={1}
      maxW={{ base: "100%", md: "30%" }}
      display={{ base: menuOpen ? "flex" : "none", md: "flex" }}
    >
      <Login />
      <Section
        title="Published Posts"
        error={publishedError}
        loading={publishedLoading}
        posts={publishedSnapshots}
      />
      <Section
        title="Drafts"
        error={draftError}
        loading={draftLoading}
        posts={draftSnapshots}
      />
    </Flex>
  );
};

export default Menu;
