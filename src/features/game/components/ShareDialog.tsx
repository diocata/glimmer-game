"use client";

import {
  Button,
  Dialog,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";

interface ShareDialogProps {
  open: boolean;
  onClose: () => void;
  elapsedTime: string;
  onSaveImage: () => void;
}

export default function ShareDialog({ open, onClose, elapsedTime, onSaveImage }: ShareDialogProps) {
  return (
    <Dialog.Root
      open={open}
      onOpenChange={(details) => {
        if (!details.open) {
          onClose();
        }
      }}
    >
      <Dialog.Backdrop bg="rgba(30, 22, 18, 0.65)" />
      <Dialog.Positioner>
        <Dialog.Content
          borderRadius="20px"
          background="white"
          padding="24px"
          maxWidth="360px"
          width="100%"
          boxShadow="0 18px 40px rgba(30, 22, 18, 0.35)"
        >
          <Dialog.Header>
            <Dialog.Title fontSize="lg" fontWeight="600">
              Puzzle complete
            </Dialog.Title>
          </Dialog.Header>
          <Dialog.Body>
            <VStack align="center" gap="1">
              <Text color="dune.500" fontSize="xs" textTransform="uppercase" letterSpacing="0.3em">
                Time
              </Text>
              <Text color="dune.900" fontSize={{ base: "2xl", md: "3xl" }} fontWeight="600">
                {elapsedTime}
              </Text>
            </VStack>
          </Dialog.Body>
          <Dialog.Footer>
            <HStack gap="2" width="100%" justify="flex-end">
              <Button variant="outline" borderRadius="999px" onClick={onSaveImage}>
                Save your solution
              </Button>
              <Dialog.ActionTrigger asChild>
                <Button borderRadius="999px" background="dune.900" color="dune.50" _hover={{ background: "dune.800" }}>
                  Done
                </Button>
              </Dialog.ActionTrigger>
            </HStack>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
}
