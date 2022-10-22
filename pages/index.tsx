import type { NextPage } from "next";
import Head from "next/head";
import { Heading } from "smarthr-ui";
import styled from "styled-components";
import { Form } from "../components/Form";

const Home: NextPage = () => {
  return (
    <Container>
      <Head>
        <title>インキュベーションスクエア物品管理システム - 登録</title>
      </Head>

      <Main>
        <Heading type="screenTitle" tag="h1">
          新規登録
        </Heading>
        <Form />
      </Main>
    </Container>
  );
};

export default Home;

const Container = styled.div`
  padding: 2rem;
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
