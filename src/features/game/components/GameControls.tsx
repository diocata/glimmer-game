"use client";

import { Box, Button, HStack, Text, VStack } from "@chakra-ui/react";

interface GameControlsProps {
  puzzleNumber: number;
  onReset: () => void;
  allLit: boolean;
  hasConflicts: boolean;
  constraintIssues: number;
}

export default function GameControls({
  puzzleNumber,
  onReset,
  allLit,
  hasConflicts,
  constraintIssues,
}: GameControlsProps) {
  const status = hasConflicts
    ? "Stars are clashing"
    : constraintIssues > 0
    ? "Asteroids need attention"
    : allLit
    ? "All space is illuminated"
    : "Light up every empty cell";

  return (
    <VStack align="stretch" gap="4">
      <HStack justify="space-between" flexWrap="wrap" gap="3">
        <Box>
          <Text textTransform="uppercase" fontSize="xs" letterSpacing="0.4em" color="dune.600">
            Glimmer
          </Text>
          <Text fontSize={{ base: "2xl", md: "3xl" }} fontWeight="600">
            Daily Puzzle #{puzzleNumber}
          </Text>
        </Box>
        <Button
          onClick={onReset}
          borderRadius="999px"
          px="6"
          height="44px"
          background="dune.900"
          color="dune.50"
          _hover={{ background: "dune.800" }}
        >
          Reset Board
        </Button>
      </HStack>
      <Text fontSize={{ base: "sm", md: "md" }} color="dune.700">
        {status}
      </Text>
    </VStack>
  );
}
