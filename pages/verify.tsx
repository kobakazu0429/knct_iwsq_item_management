import { FC, ReactNode, useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import axios from "axios";
import { Heading, Stack, Loader, Text } from "smarthr-ui";
import { type NextPageWithLayout } from "./_app";
import { getCenterLayout } from "../layouts/Center";
import { itemSchema } from "../lib/item";

const schema = itemSchema.pick({
  id: true,
  chief_email_verified_token: true,
});

interface Result {
  ok: boolean;
  message: string;
}

const Base: FC<{ children: ReactNode }> = (props) => {
  return (
    <>
      <Head>
        <title>インキュベーションスクエア 物品保管証明書 認証</title>
      </Head>

      <Stack gap="XL" align="center">
        <Heading type="screenTitle" tag="h1">
          認証
        </Heading>
        {props.children}
      </Stack>
    </>
  );
};

const Verify: NextPageWithLayout = (props) => {
  const [result, setResult] = useState<Result | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;

    (async () => {
      try {
        const parsed = schema.parse(router.query);
        const res = await axios.post<Result>("/api/verify", parsed);
        setResult(res.data);
      } catch (error) {
        console.error(error);
        setResult({
          ok: false,
          message:
            "予期せぬエラーにより認証に失敗しました。TAにご確認ください。",
        });
      }
    })();
  }, [router]);

  if (!result) {
    return (
      <Base>
        <Loader
          alt="認証中"
          text="認証しています。今しばらくお待ちください。"
        />
      </Base>
    );
  }

  const status = result.ok ? "認証に成功しました。" : "認証に失敗しました。";

  return (
    <Base>
      <Text as="p">{status}</Text>
      <Text as="p">{result?.message}</Text>
      <Text as="p">画面を閉じても大丈夫です。</Text>
    </Base>
  );
};

export default Verify;

Verify.getLayout = getCenterLayout;
