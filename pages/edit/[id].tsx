import Head from "next/head";
import { Heading } from "smarthr-ui";
import { type NextPageWithLayout } from "../_app";
import { getCenterLayout } from "../../layouts/Center";
import { type ItemSchema } from "../../lib/item";

type Result =
  | {
      ok: true;
      data: ItemSchema;
    }
  | { ok: false; message: string };

const Edit: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>インキュベーションスクエア 物品保管証明書 編集</title>
      </Head>

      <Heading type="screenTitle" tag="h1">
        編集
      </Heading>

      <p>編集機能は作成中です。</p>
    </>
  );
};

export default Edit;

Edit.getLayout = getCenterLayout;
