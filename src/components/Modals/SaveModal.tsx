import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
} from "@chakra-ui/react";
import { push, ref, set } from "firebase/database";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { prettifyDate } from "../../constants/utils";
import { db } from "../../firestore/clientApp";
import { usePostContext } from "../CreatePage/CreatePage";
import { useHome } from "../HomeProvider/HomeProvider";
import { useModal } from "../ModalProvider/ModalProvider";

const SaveModal = () => {
  const { saveConfirmOpen, setSaveConfirmOpen } = useModal();
  const { selectedPost, setSelectedPost } = useHome();
  const { title, body } = usePostContext();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const closeModal = () => setSaveConfirmOpen(false);

  const handleSave = (stay: boolean = false) => {
    setLoading(true);

    if (!selectedPost) {
      const postListRef = ref(db, "drafts");
      const newPostRef = push(postListRef);
      set(newPostRef, {
        title,
        body,
        createdDate: new Date().toISOString(),
        state: "draft",
      })
        .then(() => {
          console.log("success!");
        })
        .catch((err) => {
          console.log("error saving draft: ", err);
        })
        .finally(() => {
          setLoading(false);
          closeModal();
          navigate("/");
        });
    } else {
      const postListRef = ref(db, "drafts/" + selectedPost.key);
      set(postListRef, {
        title,
        body,
        createdDate: new Date().toISOString(),
        state: "draft",
      })
        .catch((err) => {
          console.log("error resaving draft: ', err");
        })
        .finally(() => {
          setLoading(false);
          closeModal();

          if (!stay) {
            navigate("/");
          }
          setSelectedPost({
            ...selectedPost,
            title,
            body,
            createdDate: prettifyDate(new Date()),
          });
        });
    }
  };

  return (
    <Modal isOpen={saveConfirmOpen} onClose={closeModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody textStyle="t2">Confirm save?</ModalBody>

        <ModalFooter>
          <Button
            colorScheme="telegram"
            mr={2}
            onClick={() => handleSave(true)}
            isLoading={loading}
          >
            Save and Stay
          </Button>
          <Button
            colorScheme="telegram"
            onClick={() => handleSave()}
            isLoading={loading}
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SaveModal;
