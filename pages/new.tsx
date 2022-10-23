import { useCallback, type ReactElement } from "react";
import Head from "next/head";
import { Heading } from "smarthr-ui";
import styled from "styled-components";
import axios from "axios";
import { type NextPageWithLayout } from "./_app";
import { BaseLayout } from "../layouts/Base";
import { Form } from "../components/Form";
import { type ItemSchema } from "../lib/item";

const New: NextPageWithLayout = () => {
  const handleSubmit = useCallback(async (data: ItemSchema) => {
    console.log(data);
    axios.post("/api/new", data);
  }, []);

  return (
    <Container>
      <Head>
        <title>インキュベーションスクエア物品管理システム - 登録</title>
      </Head>

      <Main>
        <Heading type="screenTitle" tag="h1">
          新規登録
        </Heading>
        <Form onSubmit={handleSubmit} />
      </Main>
    </Container>
  );
};

export default New;

New.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};

const Container = styled.div`
  padding: 2rem;
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
