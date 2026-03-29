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
  shareText: string;
}

export default function ShareDialog({ open, onClose, shareText }: ShareDialogProps) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      onClose();
    } catch {
      onClose();
    }
  };

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
          borderRadius="24px"
          background="white"
          padding="28px"
          maxWidth="420px"
          width="100%"
          boxShadow="0 24px 60px rgba(30, 22, 18, 0.45)"
        >
          <Dialog.Header>
            <Dialog.Title fontSize="xl" fontWeight="600">
              You solved today&apos;s Glimmer
            </Dialog.Title>
          </Dialog.Header>
          <Dialog.Body>
            <VStack align="start" gap="3">
              <Text color="dune.700" fontSize="sm">
                Share your solution with friends.
              </Text>
              <Text
                fontFamily="mono"
                fontSize="sm"
                background="dune.50"
                padding="12px"
                borderRadius="12px"
                width="100%"
              >
                {shareText}
              </Text>
            </VStack>
          </Dialog.Body>
          <Dialog.Footer>
            <HStack gap="3" width="100%" justify="flex-end">
              <Dialog.ActionTrigger asChild>
                <Button variant="outline" borderRadius="999px">
                  Close
                </Button>
              </Dialog.ActionTrigger>
              <Button
                borderRadius="999px"
                background="ember.500"
                color="white"
                _hover={{ background: "ember.600" }}
                onClick={handleCopy}
              >
                Copy share text
              </Button>
            </HStack>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
}
