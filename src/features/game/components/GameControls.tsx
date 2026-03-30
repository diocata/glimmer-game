"use client";

import { Box, Button, HStack, NativeSelectField, NativeSelectRoot, Text, VStack } from "@chakra-ui/react";
import { getDateForPuzzleIndex, puzzles, toUtcDateString } from "../puzzles";

const NOW_TIMESTAMP = Date.now();

interface GameControlsProps {
  puzzleNumber: number;
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  onReset: () => void;
  onHint: () => void;
  onToggleSolution: () => void;
  showSolution: boolean;
  hintCooldown: number;
  solutionCooldown: number;
  rowIssues: number;
  colIssues: number;
  hasTouchConflicts: boolean;
  constraintIssues: number;
}

export default function GameControls({
  puzzleNumber,
  selectedDate,
  onDateChange,
  onReset,
  onHint,
  onToggleSolution,
  showSolution,
  hintCooldown,
  solutionCooldown,
  rowIssues,
  colIssues,
  hasTouchConflicts,
  constraintIssues,
}: GameControlsProps) {
  const status = hasTouchConflicts
    ? "Some stars are touching"
    : rowIssues > 0 || colIssues > 0
    ? "Place exactly one star in each row and each column"
    : constraintIssues > 0
    ? "Asteroids need attention"
    : "All row, column, and asteroid rules are satisfied";

  const hintProgress = ((20 - hintCooldown) / 20) * 100;
  const hintLoadingText = `${hintCooldown}s`;
  const solutionProgress = ((60 - solutionCooldown) / 60) * 100;
  const solutionLoadingText = `${solutionCooldown}s`;
  const displayDate = selectedDate.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
  const dateValue = toUtcDateString(selectedDate);
  const lastPuzzleDate = getDateForPuzzleIndex(puzzles.length - 1);
  const maxDate = new Date(Math.min(NOW_TIMESTAMP, lastPuzzleDate.getTime()));
  const puzzleCount = puzzles.length;
  const availableDates = Array.from({ length: puzzleCount }, (_, index) => ({
    index,
    date: getDateForPuzzleIndex(index),
  })).filter(({ date }) => date.getTime() <= maxDate.getTime());
  const formatLabel = (date: Date) =>
    date.toLocaleDateString(undefined, { month: "short", day: "numeric" });

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
          <HStack gap="2" marginTop="6px" flexWrap="wrap">
            <Text fontSize="xs" color="dune.600">
              {displayDate}
            </Text>
            <NativeSelectRoot width="140px" size="xs" variant="outline">
              <NativeSelectField
                value={dateValue}
                onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                  const nextDate = availableDates.find(
                    ({ date }) => toUtcDateString(date) === event.target.value
                  )?.date;
                  if (nextDate) {
                    onDateChange(nextDate);
                  }
                }}
                height="30px"
                borderRadius="999px"
                borderColor="dune.300"
                color="dune.700"
                background="white"
                _hover={{ borderColor: "dune.500" }}
                _focus={{ borderColor: "dune.600" }}
              >
                {availableDates.map(({ date }) => {
                  const optionValue = toUtcDateString(date);
                  return (
                    <option key={optionValue} value={optionValue}>
                      {formatLabel(date)} puzzle
                    </option>
                  );
                })}
              </NativeSelectField>
            </NativeSelectRoot>
          </HStack>
        </Box>
        <Box textAlign="right" />
        <HStack gap="3" flexWrap="wrap">
          <Box position="relative" height="44px" minWidth="140px">
            <Button
              onClick={onToggleSolution}
              borderRadius="999px"
              px="5"
              height="44px"
              variant="outline"
              borderColor="dune.400"
              color="dune.800"
              _hover={{ borderColor: "dune.600", background: "dune.50" }}
              _disabled={{ opacity: 0.55, cursor: "not-allowed" }}
              disabled={solutionCooldown > 0}
              width="100%"
              position="relative"
              overflow="hidden"
            >
              <Box position="relative" zIndex={1} display="flex" alignItems="center" gap="8px">
                <Text fontWeight="600" fontSize="sm">
                  {showSolution ? "Hide Solution" : "Show Solution"}
                </Text>
              </Box>
              {solutionCooldown > 0 ? (
                <Box
                  position="absolute"
                  left="10px"
                  right="10px"
                  bottom="7px"
                  height="2px"
                  borderRadius="999px"
                  background="rgba(43,32,24,0.1)"
                  overflow="hidden"
                >
                  <Box
                    height="100%"
                    width={`${solutionProgress}%`}
                    background="linear-gradient(90deg, rgba(143, 160, 190, 0.2), rgba(106, 130, 172, 0.8))"
                    transition="width 0.3s ease"
                  />
                </Box>
              ) : null}
            </Button>
            {solutionCooldown > 0 ? (
              <Text
                position="absolute"
                right="10px"
                top="-18px"
                fontSize="xs"
                color="dune.500"
              >
                {solutionLoadingText}
              </Text>
            ) : null}
          </Box>
          <Box position="relative" height="44px" minWidth="110px">
            <Button
              onClick={onHint}
              borderRadius="999px"
              px="5"
              height="44px"
              variant="outline"
              borderColor="dune.300"
              color="dune.900"
              _hover={{ borderColor: "dune.500", background: "dune.50" }}
              _disabled={{ opacity: 0.55, cursor: "not-allowed" }}
              disabled={hintCooldown > 0}
              width="100%"
              position="relative"
              overflow="hidden"
            >
              <Box position="relative" zIndex={1} display="flex" alignItems="center" gap="8px">
                <Text fontWeight="600" fontSize="sm">
                  Hint
                </Text>
              </Box>
              {hintCooldown > 0 ? (
                <Box
                  position="absolute"
                  left="10px"
                  right="10px"
                  bottom="7px"
                  height="2px"
                  borderRadius="999px"
                  background="rgba(43,32,24,0.1)"
                  overflow="hidden"
                >
                  <Box
                    height="100%"
                    width={`${hintProgress}%`}
                    background="linear-gradient(90deg, rgba(255, 179, 71, 0.2), rgba(255, 179, 71, 0.8))"
                    transition="width 0.3s ease"
                  />
                </Box>
              ) : null}
            </Button>
            {hintCooldown > 0 ? (
              <Text
                position="absolute"
                right="10px"
                top="-18px"
                fontSize="xs"
                color="dune.500"
              >
                {hintLoadingText}
              </Text>
            ) : null}
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
      </HStack>
      <Text fontSize={{ base: "sm", md: "md" }} color="dune.700">
        {status}
      </Text>
    </VStack>
  );
}
