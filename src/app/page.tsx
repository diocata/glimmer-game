import dynamic from "next/dynamic";

const GameScreen = dynamic(() => import("@/features/game/components/GameScreen"), {
  ssr: false,
});

export default function Home() {
  return <GameScreen />;
}
