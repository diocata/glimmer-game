"use client";

import { Box, Container, HStack, Text, VStack } from "@chakra-ui/react";
import { useEffect, useMemo } from "react";
import { evaluateBoard } from "../logic";
import { useGameStore } from "../store";
import GameBoard from "./GameBoard";
import GameControls from "./GameControls";
import ShareDialog from "./ShareDialog";

export default function GameScreen() {
  const grid = useGameStore((state) => state.grid);
  const puzzleNumber = useGameStore((state) => state.puzzleNumber);
  const puzzleIndex = useGameStore((state) => state.puzzleIndex);
  const hasShared = useGameStore((state) => state.hasShared);
  const hintCooldown = useGameStore((state) => state.hintCooldown);
  const hintCell = useGameStore((state) => state.hintCell);
  const showSolution = useGameStore((state) => state.showSolution);
  const solution = useGameStore((state) => state.solution);
  const elapsedSeconds = useGameStore((state) => state.elapsedSeconds);
  const isTimerRunning = useGameStore((state) => state.isTimerRunning);
  const selectedDate = useGameStore((state) => state.selectedDate);
  const handleCellClick = useGameStore((state) => state.handleCellClick);
  const reset = useGameStore((state) => state.reset);
  const markShared = useGameStore((state) => state.markShared);
  const requestHint = useGameStore((state) => state.requestHint);
  const tickHint = useGameStore((state) => state.tickHint);
  const toggleSolution = useGameStore((state) => state.toggleSolution);
  const tickTimer = useGameStore((state) => state.tickTimer);
  const stopTimer = useGameStore((state) => state.stopTimer);
  const setDate = useGameStore((state) => state.setDate);

  const evaluation = useMemo(() => evaluateBoard(grid), [grid]);

  useEffect(() => {
    if (hintCooldown <= 0) {
      return undefined;
    }

    const interval = setInterval(() => {
      tickHint();
    }, 1000);

    return () => clearInterval(interval);
  }, [hintCooldown, tickHint]);

  useEffect(() => {
    if (!isTimerRunning) {
      return undefined;
    }

    const interval = setInterval(() => {
      tickTimer();
    }, 1000);

    return () => clearInterval(interval);
  }, [isTimerRunning, tickTimer]);

  useEffect(() => {
    if (evaluation.win && isTimerRunning) {
      stopTimer();
    }
  }, [evaluation.win, isTimerRunning, stopTimer]);

  const minutes = Math.floor(elapsedSeconds / 60);
  const seconds = elapsedSeconds % 60;
  const formattedTime = `${minutes}:${seconds.toString().padStart(2, "0")}`;
  const handleSaveImage = async () => {
    const board = document.querySelector("[data-share-board]") as HTMLElement | null;
    if (!board) {
      return;
    }
    const html2canvas = (await import("html2canvas")).default;
    const canvas = await html2canvas(board, {
      backgroundColor: null,
      scale: 2,
    });
    const link = document.createElement("a");
    link.download = `glimmer-${puzzleNumber}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <Box
      minH="100vh"
      background="radial-gradient(circle at top, #fff7ef 0%, #f6f3ef 35%, #e8e1d8 100%)"
      padding={{ base: "24px", md: "40px" }}
    >
      <Container maxW="1100px" position="relative">
        <VStack align="stretch" gap={{ base: "6", md: "10" }}>
          <GameControls
            puzzleNumber={puzzleNumber}
            puzzleIndex={puzzleIndex}
            selectedDate={selectedDate}
            onDateChange={setDate}
            onReset={reset}
            onHint={requestHint}
            onToggleSolution={toggleSolution}
            showSolution={showSolution}
            hintCooldown={hintCooldown}
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
              <Box position="relative" data-share-board>
                <Box
                  position="absolute"
                  top={{ base: "-18px", md: "-22px" }}
                  right={{ base: "2px", md: "6px" }}
                  fontSize={{ base: "sm", md: "md" }}
                  fontWeight="600"
                  color="dune.800"
                  letterSpacing="0.04em"
                >
                  {formattedTime}
                </Box>
                <GameBoard
                  grid={evaluation.grid}
                  onCellClick={handleCellClick}
                  hintCell={hintCell}
                  showSolution={showSolution}
                  solution={solution}
                />
              </Box>
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
                  <Text>Place a star on empty tiles to cast light in straight lines.</Text>
                  <Text>Every empty tile must be lit by at least one star.</Text>
                  <Text>Stars may not see each other in the same row or column.</Text>
                  <Text>Numbered asteroids require exactly that many adjacent stars.</Text>
                  <Text>Plain asteroids block light but have no number requirement.</Text>
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
                    ? "Stars are in line of sight. Move one to break the clash."
                    : evaluation.constraintViolations.length > 0
                    ? "Some numbered asteroids have the wrong star count."
                    : evaluation.allLit
                    ? "All tiles are lit. Now satisfy every numbered asteroid."
                    : "Keep placing stars until all empty tiles are lit."}
                </Text>
                <HStack marginTop="12px" gap="3" flexWrap="wrap">
                  <Text fontSize="xs" color="dune.600" textTransform="uppercase" letterSpacing="0.3em">
                    Tips
                  </Text>
                  <Text fontSize="xs" color="dune.700">
                    The timer is your score. Lower is better.
                  </Text>
                </HStack>
              </Box>
            </VStack>
          </HStack>
        </VStack>
      </Container>
      <Box textAlign="center" marginTop={{ base: "18px", md: "28px" }}>
        <Text fontSize="xs" color="dune.500">
          Created with <span aria-hidden="true">&#9829;</span> by diocata
        </Text>
      </Box>
      <ShareDialog
        open={evaluation.win && !hasShared}
        onClose={markShared}
        elapsedTime={formattedTime}
        onSaveImage={handleSaveImage}
      />
    </Box>
  );
}
