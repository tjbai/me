import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
} from "@chakra-ui/react";
import { push, ref, remove, set } from "firebase/database";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firestore/clientApp";
import { usePostContext } from "../CreatePage/CreatePage";
import { useHome } from "../HomeProvider/HomeProvider";
import { useModal } from "../ModalProvider/ModalProvider";

const PublishModal = () => {
  const { publishConfirmOpen, setPublishConfirmOpen } = useModal();
  const { title, body } = usePostContext();
  const { selectedPost, setSelectedPost } = useHome();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const closeModal = () => setPublishConfirmOpen(false);

  const handlePublish = () => {
    setLoading(true);
    const postListRef = ref(db, "published_posts");
    const newPostRef = push(postListRef);
    set(newPostRef, {
      title,
      body,
      createdDate: new Date().toISOString(),
      state: "published",
    })
      .then(() => {
        if (selectedPost) {
          remove(ref(db, "drafts/" + selectedPost.key));
          setSelectedPost(null);
        }
      })
      .catch((err) => {
        console.log("error publishing: ", err);
      })
      .finally(() => {
        setLoading(false);
        closeModal();
        navigate("/");
      });
  };

  return (
    <Modal isOpen={publishConfirmOpen} onClose={closeModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody textStyle="t2">Confirm publish?</ModalBody>

        <ModalFooter>
          <Button
            colorScheme="telegram"
            onClick={handlePublish}
            isLoading={loading}
          >
            Publish
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PublishModal;
