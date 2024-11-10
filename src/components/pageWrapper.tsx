import { Container, VStack } from "@chakra-ui/react";

type Props = {
  children: React.ReactNode;
};

export default function PageWrapper(props: Props) {
  const { children } = props;

  return (
    <Container maxW={"6xl"} marginTop="4" marginBottom="16">
      <VStack as={"main"}>{children}</VStack>
    </Container>
  );
}
