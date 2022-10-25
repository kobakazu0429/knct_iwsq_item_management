import Head from "next/head";
import Link from "next/link";
import { AnchorButton, TextLink, Base, Heading, Text } from "smarthr-ui";
import styled from "styled-components";
import { type NextPageWithLayout } from "./_app";
import { getHomeLayout } from "../layouts/Home";

const Home: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>インキュベーションスクエア物品管理システム - 登録</title>
      </Head>

      <Heading type="screenTitle" tag="h1">
        インキュベーションスクエア物品管理システム
      </Heading>
      <div>
        <Text as="p">
          インキュベーションスクエアの物品を管理するためのサイトです。
        </Text>
        <Text as="p">
          現在、利用はTAのみに限定しており、IDとパスワードが必要です。
        </Text>
        <Text as="p">
          IDとパスワードを知らない/忘れたTAは
          <TextLink href="https://docs.google.com/spreadsheets/d/1cq6wPM4NZS_VC56tDwauOjZNOKphQd7b2ys8EmphxSU/edit#gid=0">
            パスワード | スプレッドシート
          </TextLink>
          で確認してください。
        </Text>
      </div>
      <Box>
        <List>
          <li>
            <Link href="/new" passHref>
              <AnchorButton wide>新規作成</AnchorButton>
            </Link>
          </li>
          <li>
            <Link href="/detail" passHref>
              <AnchorButton wide>詳細/編集</AnchorButton>
            </Link>
          </li>
          <li>
            <Link href="/print" passHref>
              <AnchorButton wide>印刷</AnchorButton>
            </Link>
          </li>
          <li>
            <AnchorButton
              wide
              href="https://docs.google.com/spreadsheets/d/1uvVYEVeKee_ksJd67eiJmNkx6rFbcY35vPV9aPh6iFI/edit#gid=0"
            >
              DB
            </AnchorButton>
          </li>
        </List>
      </Box>
    </>
  );
};

export default Home;

Home.getLayout = getHomeLayout;

const Box = styled(Base)`
  width: 400px;
  padding: 24px;
  box-sizing: border-box;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  gap: 16px;
  display: flex;
  flex-direction: column;
`;
