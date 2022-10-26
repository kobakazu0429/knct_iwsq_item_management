import { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Stack, Cluster, AnchorButton, Heading } from "smarthr-ui";
import { toast } from "react-toastify";
import { type NextPageWithLayout } from "../_app";
import { getCenterLayout } from "../../layouts/Center";
import { type ItemSchema } from "../../lib/item";
import { DetailTable } from "../../components/DetailTable";
import { client } from "../../lib/next/apiClient";

type Result =
  | {
      ok: true;
      data: ItemSchema;
    }
  | { ok: false; message: string };

const Detail: NextPageWithLayout = () => {
  const router = useRouter();
  const [result, setResult] = useState<Result | null>(null);

  useEffect(() => {
    if (!router.isReady) return;

    (async () => {
      try {
        const res = await client.get(router.query);
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

  return (
    <>
      <Head>
        <title>インキュベーションスクエア 物品保管証明書 詳細</title>
      </Head>

      <Heading type="screenTitle" tag="h1">
        詳細
      </Heading>

      <Stack gap="XL">
        <DetailTable item={result.data} />

        <Cluster justify="flex-end">
          <Link href={`/edit/${result.data.id}`} passHref>
            <AnchorButton>編集する</AnchorButton>
          </Link>
          <Link href={`/print/${result.data.id}`} passHref>
            <AnchorButton>印刷する</AnchorButton>
          </Link>
        </Cluster>
      </Stack>
    </>
  );
};

export default Detail;

Detail.getLayout = getCenterLayout;
