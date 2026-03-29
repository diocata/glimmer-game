"use client";

import { Box, Container, HStack, Text, VStack } from "@chakra-ui/react";
import { useMemo } from "react";
import { evaluateBoard } from "../logic";
import { useGameStore } from "../store";
import GameBoard from "./GameBoard";
import GameControls from "./GameControls";
import ShareDialog from "./ShareDialog";

export default function GameScreen() {
  const grid = useGameStore((state) => state.grid);
  const puzzleNumber = useGameStore((state) => state.puzzleNumber);
  const hasShared = useGameStore((state) => state.hasShared);
  const handleCellClick = useGameStore((state) => state.handleCellClick);
  const reset = useGameStore((state) => state.reset);
  const markShared = useGameStore((state) => state.markShared);

  const evaluation = useMemo(() => evaluateBoard(grid), [grid]);

  const shareText = `Glimmer #${puzzleNumber}\n${grid
    .map((row) =>
      row
        .map((cell) => {
          if (cell.state === "star") return "*";
          if (cell.state === "marker") return "x";
          if (cell.base === "asteroid") return "#";
          return ".";
        })
        .join("")
    )
    .join("\n")}`;

  return (
    <Box
      minH="100vh"
      background="radial-gradient(circle at top, #fff7ef 0%, #f6f3ef 35%, #e8e1d8 100%)"
      padding={{ base: "24px", md: "40px" }}
    >
      <Container maxW="1100px">
        <VStack align="stretch" gap={{ base: "6", md: "10" }}>
          <GameControls
            puzzleNumber={puzzleNumber}
            onReset={reset}
            allLit={evaluation.allLit}
            hasConflicts={evaluation.hasConflicts}
            constraintIssues={evaluation.constraintViolations.length}
          />
          <HStack align="start" gap={{ base: "8", lg: "12" }} flexWrap="wrap">
            <Box
              flex="1"
              minWidth={{ base: "100%", md: "360px" }}
              maxWidth={{ base: "100%", lg: "520px" }}
            >
              <GameBoard grid={evaluation.grid} onCellClick={handleCellClick} />
            </Box>
            <VStack
              align="stretch"
              flex="1"
              gap="4"
              minWidth={{ base: "100%", md: "320px" }}
            >
              <Box
                background="white"
                padding="20px"
                borderRadius="20px"
                boxShadow="0 18px 40px rgba(43, 32, 24, 0.12)"
              >
                <Text fontWeight="600" fontSize="lg" marginBottom="8px">
                  How to play
                </Text>
                <VStack align="start" gap="3" fontSize="sm" color="dune.700">
                  <Text>Tap empty tiles to cycle between star and marker.</Text>
                  <Text>All empty space must be lit by a star.</Text>
                  <Text>Stars cannot see each other across rows or columns.</Text>
                  <Text>Numbered asteroids need exactly that many adjacent stars.</Text>
                </VStack>
              </Box>
              <Box
                background="white"
                padding="20px"
                borderRadius="20px"
                boxShadow="0 18px 40px rgba(43, 32, 24, 0.12)"
              >
                <Text fontWeight="600" fontSize="lg" marginBottom="8px">
                  Status
                </Text>
                <Text fontSize="sm" color="dune.700">
                  {evaluation.hasConflicts
                    ? "Two stars are shining on each other."
                    : evaluation.constraintViolations.length > 0
                    ? "Some asteroids have the wrong number of nearby stars."
                    : evaluation.allLit
                    ? "Everything is lit. Finish by fixing constraints."
                    : "Place stars until every empty tile is illuminated."}
                </Text>
                <HStack marginTop="12px" gap="3" flexWrap="wrap">
                  <Text fontSize="xs" color="dune.600" textTransform="uppercase" letterSpacing="0.3em">
                    Tips
                  </Text>
                  <Text fontSize="xs" color="dune.700">
                    Use markers to track possibilities.
                  </Text>
                </HStack>
              </Box>
            </VStack>
          </HStack>
        </VStack>
      </Container>
      <ShareDialog open={evaluation.win && !hasShared} onClose={markShared} shareText={shareText} />
    </Box>
  );
}
