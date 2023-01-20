import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
} from "@chakra-ui/react";
import { ref, remove } from "firebase/database";
import { useState } from "react";
import { db } from "../../firestore/clientApp";
import { useHome } from "../HomeProvider/HomeProvider";
import { useModal } from "../ModalProvider/ModalProvider";

const DeleteModal = () => {
  const { deleteOpen, setDeleteOpen } = useModal();
  const { selectedPost, setSelectedPost } = useHome();
  const [loading, setLoading] = useState(false);

  const closeModal = () => setDeleteOpen(false);

  // this shit just doesnt work lmao
  const handleDelete = () => {
    setLoading(true);
    remove(ref(db, "drafts/" + selectedPost!.key))
      .catch((err) => console.log("issue deleting...", err))
      .finally(() => {
        setLoading(false);
        setSelectedPost(null);
        closeModal();
      });
  };

  return (
    <Modal isOpen={deleteOpen} onClose={closeModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody textStyle="t2">Confirm delete?</ModalBody>

        <ModalFooter>
          <Button colorScheme="red" onClick={handleDelete} isLoading={loading}>
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteModal;
