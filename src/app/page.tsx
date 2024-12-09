"use client";

import SearchForm from "@/components/searchForm";
import VoicebankCard from "@/components/voicebankCard";
import { useVoicebanks } from "@/hooks/useVoicebanks";
import { Stack } from "@chakra-ui/react";

export default function Home() {
  const { voicebanks, loading, setScores, scores } = useVoicebanks();

  return (
    <>
      <SearchForm scores={scores} setScores={setScores} />
      <Stack gap={4} dir="row" w={"full"} alignItems={"center"}>
        {loading ? (
          <div>Loading...</div>
        ) : (
          voicebanks
            .slice(0, 10)
            .map((voicebank) => (
              <VoicebankCard
                key={voicebank.charactor_name + voicebank.version}
                voicebank={voicebank}
                scores={scores}
                setScores={setScores}
              />
            ))
        )}
      </Stack>
    </>
  );
}
