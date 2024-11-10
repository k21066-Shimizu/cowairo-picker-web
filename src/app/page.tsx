"use client";

import SearchForm from "@/components/searchForm";
import { useVoicebanks } from "@/hooks/useVoicebanks";
import { Stack } from "@chakra-ui/react";

export default function Home() {
  const { voicebanks, loading, setScores } = useVoicebanks();

  return (
    <>
      <SearchForm setScores={setScores} />
      <Stack gap={4} dir={"row"} wrap={"wrap"}>
        {loading ? (
          <div>Loading...</div>
        ) : (
          voicebanks.slice(0, 10).map((voicebank) => (
            <div key={voicebank.charactor_name + voicebank.version}>
              <h2>{voicebank.charactor_name}</h2>
              <p>{voicebank.furigana}</p>
              <p>{voicebank.version}</p>
            </div>
          ))
        )}
      </Stack>
    </>
  );
}
