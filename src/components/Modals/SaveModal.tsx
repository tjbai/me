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
import { db } from "../../firestore/clientApp";
import { usePostContext } from "../CreatePage/CreatePage";
import { useModal } from "../ModalProvider/ModalProvider";

const SaveModal = () => {
  const { saveConfirmOpen, setSaveConfirmOpen } = useModal();
  const { title, body } = usePostContext();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const closeModal = () => setSaveConfirmOpen(false);

  const handlePublish = () => {
    setLoading(true);
    const postListRef = ref(db, "drafts");
    const newPostRef = push(postListRef);
    set(newPostRef, {
      title,
      body,
      createdDate: new Date().toISOString(),
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
            onClick={handlePublish}
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
