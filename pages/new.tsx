import { useCallback } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Heading } from "smarthr-ui";
import axios from "axios";
import { toast } from "react-toastify";
import { type NextPageWithLayout } from "./_app";
import { getCenterLayout } from "../layouts/Center";
import { Form } from "../components/Form";
import { type ItemSchema } from "../lib/item";

const sleep = async (ms: number) => {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
};

const New: NextPageWithLayout = () => {
  const router = useRouter();

  const handleSubmit = useCallback(
    async (data: ItemSchema) => {
      console.log(data);
      const res = await axios.post<{ ok: boolean; message: string }>(
        "/api/new",
        data
      );
      if (!res.data.ok) {
        toast.error("保存に失敗しました。");
      }

      toast.success("保存しました！");

      await sleep(1000);

      const isGoToPrintPage = confirm("印刷ページに遷移しますか？");
      if (!isGoToPrintPage) return;

      router.push(`/print/${data.id}`);
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
