import { REPOSITORY_URL, SITE_NAME } from "@/consts/page";
import { Center, Container, HStack, Heading, Link, Spacer } from "@chakra-ui/react";
import NextLink from "next/link";

export default function Header() {
  return (
    <Center as={"header"} bg={"blue.300"}>
      <Container fluid maxW={"6xl"}>
        <HStack h={14}>
          <Heading as="h1" fontSize="2xl" cursor="pointer">
            <Link as={NextLink} href="/" _hover={{ textDecoration: "none" }}>
              {SITE_NAME}
            </Link>
          </Heading>
          <Spacer />
          <Link as={NextLink} href={REPOSITORY_URL} _hover={{ color: "header.hover" }}>
            GitHub
          </Link>
        </HStack>
      </Container>
    </Center>
  );
}
