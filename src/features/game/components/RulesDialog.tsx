"use client";

import { Box, Button, Dialog, HStack, Text, VStack } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { evaluateBoard } from "../logic";
import type { Cell } from "../types";
import GameBoard from "./GameBoard";

interface RulesDialogProps {
  open: boolean;
  onClose: () => void;
}

interface DemoStep {
  title: string;
  description: string;
  stars: Array<{ row: number; col: number }>;
}

const DEMO_LAYOUT = [
  [".", ".", ".", ".", "."],
  [".", "1", ".", "0", "."],
  [".", ".", ".", ".", "."],
  [".", "0", ".", "1", "."],
  [".", ".", ".", ".", "."],
] as const;

const DEMO_STEPS: DemoStep[] = [
  {
    title: "One per row and column",
    description: "Start by placing a star in a row and column that are still empty.",
    stars: [{ row: 0, col: 2 }],
  },
  {
    title: "Stars cannot touch",
    description: "Stars cannot be adjacent, including diagonally.",
    stars: [
      { row: 0, col: 2 },
      { row: 1, col: 2 },
    ],
  },
  {
    title: "Spread stars safely",
    description: "Keep each star isolated while filling new rows and columns.",
    stars: [
      { row: 0, col: 2 },
      { row: 2, col: 3 },
      { row: 3, col: 0 },
    ],
  },
  {
    title: "Respect numbered asteroids",
    description: "Numbers count adjacent stars in up/right/down/left only.",
    stars: [
      { row: 0, col: 2 },
      { row: 2, col: 4 },
      { row: 3, col: 0 },
      { row: 4, col: 3 },
    ],
  },
  {
    title: "Solved example",
    description: "Every row/column has one star, no touching, clues satisfied.",
    stars: [
      { row: 0, col: 2 },
      { row: 1, col: 0 },
      { row: 2, col: 4 },
      { row: 3, col: 1 },
      { row: 4, col: 3 },
    ],
  },
];

function createDemoGrid(stars: Array<{ row: number; col: number }>): Cell[][] {
  const starKeys = new Set(stars.map((star) => `${star.row}:${star.col}`));

  return DEMO_LAYOUT.map((row, rowIndex) =>
    row.map((cell, colIndex) => {
      const hasStar = starKeys.has(`${rowIndex}:${colIndex}`);

      if (cell === ".") {
        return {
          base: "empty",
          state: hasStar ? "star" : "empty",
        } as Cell;
      }

      return {
        base: "asteroid",
        state: "empty",
        value: Number(cell),
      } as Cell;
    })
  );
}

export default function RulesDialog({ open, onClose }: RulesDialogProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    if (!open || !isAutoPlay) {
      return;
    }

    const interval = setInterval(() => {
      setStepIndex((current) => (current + 1) % DEMO_STEPS.length);
    }, 2600);

    return () => clearInterval(interval);
  }, [open, isAutoPlay]);

  const currentStep = DEMO_STEPS[stepIndex];
  const demoGrid = useMemo(() => createDemoGrid(currentStep.stars), [currentStep.stars]);
  const demoEvaluation = useMemo(() => evaluateBoard(demoGrid), [demoGrid]);

  const goPrev = () => {
    setIsAutoPlay(false);
    setStepIndex((current) => (current - 1 + DEMO_STEPS.length) % DEMO_STEPS.length);
  };

  const goNext = () => {
    setIsAutoPlay(false);
    setStepIndex((current) => (current + 1) % DEMO_STEPS.length);
  };

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(details) => {
        if (!details.open) {
          setStepIndex(0);
          setIsAutoPlay(true);
          onClose();
        }
      }}
      closeOnInteractOutside
      closeOnEscape
    >
      <Dialog.Backdrop bg="rgba(30, 22, 18, 0.72)" backdropFilter="blur(2px)" />
      <Dialog.Positioner padding={{ base: "16px", md: "24px" }}>
        <Dialog.Content
          borderRadius="20px"
          background="white"
          maxWidth="640px"
          width="100%"
          padding={{ base: "16px", md: "22px" }}
          boxShadow="0 24px 64px rgba(30, 22, 18, 0.4)"
        >
          <Dialog.Header padding="0" marginBottom="10px">
            <VStack align="start" gap="1">
              <Text fontSize="xs" textTransform="uppercase" letterSpacing="0.24em" color="dune.500">
                Welcome to Glimmer
              </Text>
              <Dialog.Title fontSize={{ base: "lg", md: "xl" }} fontWeight="600" color="dune.900">
                Learn Astro Queens in 5 steps
              </Dialog.Title>
            </VStack>
          </Dialog.Header>

          <Dialog.Body padding="0">
            <VStack align="stretch" gap="4">
              <VStack align="start" gap="1.5" fontSize="13px" color="dune.700">
                <Text>Same board, new core: one star per row and column, with no touching.</Text>
              </VStack>

              <Box
                borderRadius="18px"
                border="1px solid"
                borderColor="dune.200"
                background="linear-gradient(180deg, #fffaf4 0%, #fff 100%)"
                padding={{ base: "12px", md: "14px" }}
              >
                <HStack justify="space-between" marginBottom="10px" align="start" gap="3">
                  <VStack align="start" gap="0">
                    <Text fontWeight="600" color="dune.900" fontSize="13px">
                      {currentStep.title}
                    </Text>
                    <Text fontSize="xs" color="dune.600">
                      {currentStep.description}
                    </Text>
                  </VStack>
                  <VStack align="end" gap="0">
                    <Text fontSize="xs" color="dune.500" textTransform="uppercase" letterSpacing="0.16em">
                      Step {stepIndex + 1}/{DEMO_STEPS.length}
                    </Text>
                    <Text fontSize="xs" color={isAutoPlay ? "#3f7a46" : "dune.500"}>
                      {isAutoPlay ? "Auto play" : "Manual"}
                    </Text>
                  </VStack>
                </HStack>

                <Box width="100%" maxWidth="430px" marginX="auto" marginBottom="4px">
                  <GameBoard
                    grid={demoEvaluation.grid}
                    onCellClick={() => {
                      return;
                    }}
                  />
                </Box>

                <HStack marginTop="10px" justify="space-between" gap="2">
                  <HStack gap="2">
                    <Button
                      size="xs"
                      variant="outline"
                      borderRadius="999px"
                      borderColor="dune.300"
                      onClick={goPrev}
                    >
                      Back
                    </Button>
                    <Button
                      size="xs"
                      variant="outline"
                      borderRadius="999px"
                      borderColor="dune.300"
                      onClick={goNext}
                    >
                      Next
                    </Button>
                  </HStack>
                  <Button
                    size="xs"
                    variant="ghost"
                    borderRadius="999px"
                    color="dune.700"
                    onClick={() => setIsAutoPlay((current) => !current)}
                  >
                    {isAutoPlay ? "Pause" : "Play"}
                  </Button>
                </HStack>

                <HStack marginTop="8px" justify="center" gap="2">
                  {DEMO_STEPS.map((_, index) => (
                    <Box
                      key={index}
                      width={index === stepIndex ? "16px" : "7px"}
                      height="7px"
                      borderRadius="999px"
                      background={index === stepIndex ? "dune.700" : "dune.300"}
                      transition="all 160ms ease"
                    />
                  ))}
                </HStack>
              </Box>

              <VStack align="start" gap="1" fontSize="12px" color="dune.600">
                <Text>- Exactly one star per row and per column.</Text>
                <Text>- Touching includes diagonal neighbors.</Text>
                <Text>- Numbered asteroids count only up/right/down/left neighbors.</Text>
              </VStack>
            </VStack>
          </Dialog.Body>

          <Dialog.Footer padding="0" marginTop="14px">
            <HStack width="100%" justify="flex-end">
              <Dialog.ActionTrigger asChild>
                <Button
                  borderRadius="999px"
                  px="5"
                  height="38px"
                  background="dune.900"
                  color="dune.50"
                  _hover={{ background: "dune.800" }}
                >
                  Start puzzle
                </Button>
              </Dialog.ActionTrigger>
            </HStack>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
}
