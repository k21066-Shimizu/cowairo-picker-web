import { NextRequest } from "next/server";
import data from "./data.json";
import { ScoreDataItem, Scores } from "@/consts/scores";

const IDS = ["gen", "lsn", "unq", "age", "clr", "pow", "brt"] as const;

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const query = {
    gen: searchParams.has("gen") ? Number(searchParams.get("gen")) : undefined,
    lsn: searchParams.has("lsn") ? Number(searchParams.get("lsn")) : undefined,
    unq: searchParams.has("unq") ? Number(searchParams.get("unq")) : undefined,
    age: searchParams.has("age") ? Number(searchParams.get("age")) : undefined,
    clr: searchParams.has("clr") ? Number(searchParams.get("clr")) : undefined,
    pow: searchParams.has("pow") ? Number(searchParams.get("pow")) : undefined,
    brt: searchParams.has("brt") ? Number(searchParams.get("brt")) : undefined,
  };

  const dataWithDist = (data as ScoreDataItem[])
    .map((voicebank) => ({
      ...voicebank,
      dist: calcDist(query, voicebank),
    }))
    .toSorted((a, b) => a.dist - b.dist);

  return Response.json(dataWithDist);
}

const calcDist = (from: Partial<Scores>, to: Partial<Scores>) =>
  Math.sqrt(
    IDS.reduce(
      (acc, id) => (from[id] == null || to[id] == null ? acc : acc + (from[id] - to[id]) ** 2),
      0
    )
  );
