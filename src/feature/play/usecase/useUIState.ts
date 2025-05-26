import { useEffect, useState } from "react";

import type { GameState } from "../types";

interface UseUIStateReturn {
  showChatBubble: boolean;
  showDialog: boolean;
  setShowDialog: (show: boolean) => void;
  chatType: "correct" | "wrong" | "neutral";
}

export const useUIState = (gameState: GameState): UseUIStateReturn => {
  const [showChatBubble, setShowChatBubble] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [chatType, setChatType] = useState<"correct" | "wrong" | "neutral">(
    "neutral"
  );

  useEffect(() => {
    if (!gameState.isInit) return;

    const isCorrectAnswer =
      gameState.msg.toLowerCase().includes("benar") ||
      gameState.msg.toLowerCase().includes("selamat");
    const isWrongAnswer =
      gameState.msg.toLowerCase().includes("salah") ||
      gameState.msg.toLowerCase().includes("game over");

    if (isCorrectAnswer || isWrongAnswer) {
      setChatType(isCorrectAnswer ? "correct" : "wrong");
      setShowChatBubble(true);
      const timer = setTimeout(() => {
        setShowChatBubble(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [gameState.msg, gameState.isInit, gameState.clickedSeq.length]);

  useEffect(() => {
    if (gameState.wrongClick !== null) {
      setShowChatBubble(true);
      setChatType("wrong");
    }
  }, [gameState.wrongClick, gameState.msg]);

  useEffect(() => {
    if (gameState.isComplete || gameState.isOver) {
      const timer = setTimeout(() => {
        setShowDialog(true);
      }, 1500);
      return () => clearTimeout(timer);
    } else {
      setShowDialog(false);
    }
  }, [gameState.isComplete, gameState.isOver]);

  useEffect(() => {
    if (
      gameState.clickedSeq.length === 0 &&
      gameState.health === 3 &&
      gameState.isInit
    ) {
      setShowDialog(false);
    }
  }, [gameState.clickedSeq.length, gameState.health, gameState.isInit]);

  return {
    showChatBubble,
    showDialog,
    setShowDialog,
    chatType,
  };
};
