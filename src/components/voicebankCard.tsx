import { Avatar } from "@/components/ui/avatar";
import { SCORE_LABELS, ScoreDataItem, ScoreId } from "@/consts/scores";
import { Card, For, HStack, IconButton, Spacer, Table } from "@chakra-ui/react";
import { Dispatch, SetStateAction, useCallback } from "react";
import { LuSlidersVertical } from "react-icons/lu";

type Props = {
  voicebank: ScoreDataItem & { dist: number };
  scores: Partial<Record<ScoreId, number>>;
  setScores: Dispatch<SetStateAction<Record<ScoreId, number | undefined>>>;
};

export default function VoicebankCard(props: Props) {
  const { voicebank, scores, setScores } = props;
  const id = `${voicebank.charactor_name}_${voicebank.version}`;
  const audioFilePath = `samples/${id}/kaerunouta.wav`;
  const iconFilePath = `samples/${id}/icon.bmp`;

  const onClickParamCopy = useCallback(() => {
    setScores({ ...voicebank });
  }, [setScores, voicebank]);

  return (
    <Card.Root w={"2xl"} p={4}>
      <Card.Header>
        <Card.Title>
          <HStack>
            <p>
              {voicebank.charactor_name} - {voicebank.version}
            </p>
            <Spacer />
            <IconButton size={"xs"} variant={"outline"} onClick={onClickParamCopy}>
              <LuSlidersVertical />
            </IconButton>
          </HStack>
        </Card.Title>
        <Card.Description>{voicebank.furigana}</Card.Description>
      </Card.Header>
      <Card.Body>
        <HStack>
          <Avatar src={iconFilePath} name={id} size="lg" shape="rounded" />
          <Spacer />
          <audio src={audioFilePath} controls />
        </HStack>
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <For each={SCORE_LABELS}>
                {({ id, name }) => <Table.ColumnHeader key={id}>{name}</Table.ColumnHeader>}
              </For>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <For each={SCORE_LABELS}>
                {({ id }) => <Table.Cell key={id}>{voicebank[id]}</Table.Cell>}
              </For>
            </Table.Row>
            <Table.Row>
              <For each={SCORE_LABELS}>
                {({ id }) => (
                  <Table.Cell key={id}>{formatScoreDiff(scores[id], voicebank[id])}</Table.Cell>
                )}
              </For>
            </Table.Row>
          </Table.Body>
        </Table.Root>
      </Card.Body>
    </Card.Root>
  );
}

const formatScoreDiff = (from: number | undefined, to: number | undefined) => {
  if (from == null || to == null) return "-";
  const diff = to - from;
  const diffStr = diff.toFixed(1);
  if (diffStr === "0.0") return "±0";
  return diff > 0 ? `+${diffStr}` : diffStr;
};
