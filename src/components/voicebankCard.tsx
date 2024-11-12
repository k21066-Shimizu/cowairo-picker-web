import { SCORE_LABELS, ScoreDataItem, ScoreId } from "@/consts/scores";
import { Card, For, Table } from "@chakra-ui/react";

type Props = {
  voicebank: ScoreDataItem & { dist: number };
  scores: Partial<Record<ScoreId, number>>;
};

export default function VoicebankCard(props: Props) {
  const { voicebank, scores } = props;

  return (
    <Card.Root w={"2xl"} p={4}>
      <Card.Header>
        <Card.Title>{voicebank.charactor_name}</Card.Title>
        <Card.Description>{voicebank.version}</Card.Description>
      </Card.Header>
      <Card.Body>
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
