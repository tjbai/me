import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Text,
} from "@chakra-ui/react";
import { useModal } from "../ModalProvider/ModalProvider";

const TauntModal = () => {
  const { tauntOpen, setTauntOpen } = useModal();

  return (
    <Modal isOpen={tauntOpen} onClose={() => setTauntOpen(false)}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody textStyle="t2">
          <Text>lol you're not me</Text>
          <Text>nice try nerd</Text>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="telegram" onClick={() => setTauntOpen(false)}>
            Sorry
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TauntModal;
