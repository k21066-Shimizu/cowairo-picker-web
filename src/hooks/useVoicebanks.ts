import { ScoreDataItem, ScoreId } from "@/consts/scores";
import { useEffect, useState } from "react";

export function useVoicebanks() {
  const [scores, setScores] = useState<Record<ScoreId, number | undefined>>({
    gen: 3,
    lsn: 3,
    unq: 3,
    age: 3,
    clr: 3,
    pow: 3,
    brt: 3,
  });
  const [voicebanks, setVoicebanks] = useState<(ScoreDataItem & { dist: number })[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async (scores: Record<ScoreId, number | undefined>) => {
      setLoading(true);
      const searchParams = new URLSearchParams(
        Object.entries(scores).flatMap(([key, value]) =>
          value === undefined ? [] : [[key, value.toString()]]
        )
      );

      const res = await fetch(`/api/voicebank/search?${searchParams}`);
      const result = await res.json();
      setVoicebanks(result);
      setLoading(false);
    };
    fetchData(scores);
  }, [scores]);

  return { scores, setScores, voicebanks, loading };
}
