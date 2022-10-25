import { useCallback, useEffect, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { Heading } from "smarthr-ui";
import styled from "styled-components";
import { toast } from "react-toastify";
import axios from "axios";
import {
  fullItemSchema,
  type ItemSchema,
  type FullItemSchema,
} from "../../lib/item";
import { Form } from "../../components/Form";

const schema = fullItemSchema.pick({
  id: true,
});

type Result =
  | {
      ok: true;
      data: FullItemSchema;
    }
  | { ok: false; message: string };

const Detail: NextPage = () => {
  const router = useRouter();
  const [result, setResult] = useState<Result | null>(null);

  useEffect(() => {
    if (!router.isReady) return;

    (async () => {
      try {
        const parsed = schema.parse(router.query);
        const res = await axios.get<Result>("/api/get", {
          params: { ...parsed, token: process.env.NEXT_PUBLIC_GAS_TOKEN ?? "" },
        });
        setResult(res.data);
      } catch (error) {
        console.error(error);
        setResult({
          ok: false,
          message: "認証に失敗しました。TAにご確認ください。",
        });
      }
    })();
  }, [router]);

  const handleSubmit = useCallback(async (data: ItemSchema) => {
    console.log(data);
    // axios.post("/api/new", data);
    toast.warn(
      "更新機能は作成中です。本変更は保存されませんのでご注意ください。"
    );
  }, []);

  if (!result || !result.ok) return <div>loading...</div>;

  result.data.chief_email = result.data.chief_email.split("@")[0];

  return (
    <>
      <Head>
        <title>インキュベーションスクエア 物品保管証明書 詳細/編集</title>
      </Head>

      <Container>
        <Main>
          <Heading type="screenTitle" tag="h1">
            詳細/編集
          </Heading>
          <Form defaultValues={result.data} onSubmit={handleSubmit} />
        </Main>
      </Container>
    </>
  );
};

export default Detail;

const Container = styled.div`
  padding: 2rem;
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
