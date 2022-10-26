import { useCallback } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Heading } from "smarthr-ui";
import { toast } from "react-toastify";
import { type NextPageWithLayout } from "./_app";
import { getCenterLayout } from "../layouts/Center";
import { Form } from "../components/Form";
import { type ItemSchemaForCreate } from "../lib/item";
import { client } from "../lib/next/apiClient";

const sleep = async (ms: number) => {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
};

const New: NextPageWithLayout = () => {
  const router = useRouter();

  const handleSubmit = useCallback(
    async (data: ItemSchemaForCreate) => {
      const res = await client.new(data);
      console.log(data);
      console.log(res);

      if (!res.data.ok) {
        toast.error("保存に失敗しました。");
        return;
      }

      toast.success("保存しました！");

      await sleep(1000);

      router.push(`/detail/${data.id}`);
    },
    [router]
  );

  return (
    <>
      <Head>
        <title>インキュベーションスクエア物品管理システム - 登録</title>
      </Head>

      <Heading type="screenTitle" tag="h1">
        新規登録
      </Heading>
      <Form onSubmit={handleSubmit} />
    </>
  );
};

export default New;

New.getLayout = getCenterLayout;
