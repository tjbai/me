import { Button, Flex, Text, VStack } from "@chakra-ui/react";
import { get, child, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { db } from "../../firestore/clientApp";
import Preview from "../CreatePage/Preview";
import { PostType } from "../HomeProvider/HomeProvider";

const IndividualPostPage = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [post, setPost] = useState<PostType | undefined>(undefined);

  useEffect(() => {
    setLoading(true);
    const dbRef = ref(db);
    get(child(dbRef, `published_posts/${location.pathname.substring(1)}`))
      .catch((err) => console.log(err))
      .then((res) => {
        if (!res?.exists()) {
          setNotFound(true);
        } else {
          setPost(res.val() as PostType);
        }
        setLoading(false);
      });
  }, [location.pathname]);

  if (loading) {
    return (
      <Flex flex={1} minH="100vh" bg="bg">
        Loading...
      </Flex>
    );
  }

  document
    .querySelector('meta[name="description"]')
    ?.setAttribute("content", post?.title!);

  if (notFound) {
    return (
      <>
        <VStack
          flex={1}
          minH="100vh"
          bg="bg"
          align="center"
          justify="center"
          direction="column"
        >
          <Text>This post doesn't exist...</Text>
          <Text>what are you doing here?</Text>
          <Link to="/">
            <Button
              colorScheme="telegram"
              borderRadius="0px"
              height="30px"
              mt={5}
            >
              Take me home
            </Button>
          </Link>
        </VStack>
      </>
    );
  }

  return <Preview post={post} />;
};

export default IndividualPostPage;
