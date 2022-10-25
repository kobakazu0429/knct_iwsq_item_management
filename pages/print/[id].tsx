import { useEffect, useMemo, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import styled from "styled-components";
import axios from "axios";
import split from "just-split";
import { itemSchema, type ItemSchema } from "../../lib/item";
import { formatDate } from "../../lib/item/utils";

const schema = itemSchema.pick({
  id: true,
});

type Data = Pick<
  ItemSchema,
  | "id"
  | "name"
  | "notes"
  | "location"
  | "chief_department"
  | "chief_id"
  | "chief_name"
  | "confirmed_ta_name"
  | "created_at"
  | "updated_at"
  | "expires_at"
>;

type Result =
  | {
      ok: true;
      data: Data;
    }
  | { ok: false; message: string };

const Print: NextPage = () => {
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

  const qrImageSrc = useMemo(() => {
    if (!result?.ok) return "";

    const detailPage = location.origin + `/detail/${result.data.id}`;
    const imgSrc = `https://qr.kobakazu0429.workers.dev/api/v1/?text=${encodeURIComponent(
      detailPage
    )}&type=png&ec_level=Q`;
    return imgSrc;
  }, [result]);

  if (!result || !result.ok) return <div>loading...</div>;

  return (
    <>
      <Head>
        <title>インキュベーションスクエア 物品保管証明書 印刷</title>
      </Head>
      <Sheet>
        <Title>インキュベーションスクエア 物品保管証明書</Title>
        <div>
          <Description>
            指示に従い本紙（承認済）を見える箇所に掲示し、所定の場所で管理すること。
          </Description>
          <Description>
            本紙は新規申請、危険物等の物品追加時は、TAに相談すること。
          </Description>
          <Description>
            保管期間は半期(7月末、1月末)とし、それを超える場合は再度申請すること。
          </Description>
        </div>
        <Table>
          <tbody>
            <tr>
              <td>ID ([a-z])</td>
              <td>
                {split(result.data.id.split(""), 3).map((v) => {
                  const chunk = v.join("");
                  return <ID key={chunk}>{chunk}</ID>;
                })}
              </td>
            </tr>
            <tr>
              <td>物品名</td>
              <td>{result.data.name}</td>
            </tr>
            <tr>
              <td>危険物など特記事項</td>
              <td>{result.data.notes}</td>
            </tr>
            <tr>
              <td>保管場所</td>
              <td>{result.data.location}</td>
            </tr>
            <tr>
              <td>責任者</td>
              <td>
                {result.data.chief_department} {result.data.chief_id}{" "}
                {result.data.chief_name}
              </td>
            </tr>
            <tr>
              <td>担当TA</td>
              <td>{result.data.confirmed_ta_name}</td>
            </tr>
            <tr>
              <td>詳細</td>
              <td>
                <QR src={qrImageSrc} />
                <Text>メールアドレスなど詳細情報が確認できます。</Text>
              </td>
            </tr>
          </tbody>
        </Table>

        <Table>
          <tbody>
            <tr>
              <td>申請日</td>
              <td>{formatDate(result.data.created_at)}</td>
            </tr>
            <tr>
              <td>更新日</td>
              <td>{formatDate(result.data.updated_at)}</td>
            </tr>
            <tr>
              <td>期限</td>
              <td>{formatDate(result.data.expires_at)}</td>
            </tr>
          </tbody>
        </Table>
        <Description>
          ※期限を超えたものまたは申請書の掲示がない物品は処分します。
        </Description>
      </Sheet>
    </>
  );
};

export default Print;

const Sheet = styled.div`
  margin: 0;
  overflow: hidden;
  position: relative;
  box-sizing: border-box;
  page-break-after: always;

  width: 210mm;
  height: 296mm;

  padding: 25mm;

  display: flex;
  flex-direction: column;
  gap: 20px;

  font-size: 1.2rem;

  @media screen {
    background: white;
    box-shadow: 0 0.5mm 2mm rgba(0, 0, 0, 0.3);
    margin: 5mm auto;
  }
`;

const Title = styled.h1`
  font-size: 24px;
  text-align: center;
`;
const Description = styled.p`
  font-size: 16px;
  line-height: ${16 * 1.5}px;
  margin: 0;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  td {
    border: solid 1px black;
    padding: 10px;
  }

  td:first-child {
    width: 200px;
  }
`;

const ID = styled.span`
  letter-spacing: 3px;
  & + & {
    margin-left: 10px;
  }
`;

const QR = styled.img`
  width: 100%;
  max-width: 150px;
`;

const Text = styled.p`
  font-size: 16px;
`;
