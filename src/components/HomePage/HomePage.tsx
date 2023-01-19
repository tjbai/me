import { Flex, Text } from "@chakra-ui/react";
import { ref } from "firebase/database";
import { db } from "../../firestore/clientApp";
import { useListVals } from "react-firebase-hooks/database";
import Drafts from "./Drafts";
import PublishedPosts from "./PublishedPosts";
import { useEffect } from "react";

export interface Post {
  title: string;
  body: string;
  createdDate: string;
}

// TODO: This !
const HomePage = () => {
  // const navigate = useNavigate();

  const [snapshots, loading, error] = useListVals(ref(db, "published_posts"));

  useEffect(() => {
    snapshots?.map((snapshot) => {
      const date = Date.parse(snapshot.createdDate);
      console.log(date.getDate());
    });
  }, [snapshots]);

  return (
    <Flex bg="bg" border="2px solid red">
      {loading ? (
        <Flex flex={1}>Loading...</Flex>
      ) : (
        <PublishedPosts posts={[]} />
      )}
      <Drafts />
    </Flex>
  );
};

export default HomePage;
