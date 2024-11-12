import { NextRequest } from "next/server";
import data from "./data.json";
import { ScoreDataItem, Scores } from "@/consts/scores";
import { formSchema } from "@/consts/schema";

const IDS = ["gen", "lsn", "unq", "age", "clr", "pow", "brt"] as const;

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const query = Object.fromEntries(searchParams.entries()) as unknown;
  const parsed = formSchema.parse(query);

  const dataWithDist = (data as ScoreDataItem[])
    .map((voicebank) => ({
      ...voicebank,
      dist: calcDist(parsed, voicebank),
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
