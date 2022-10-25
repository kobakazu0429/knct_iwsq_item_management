import { useCallback, useRef } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  Button,
  Base,
  Heading,
  Text,
  Input,
  useTheme,
  FaQrcodeIcon,
} from "smarthr-ui";
import styled from "styled-components";
import { type NextPageWithLayout } from "../_app";
import { getHomeLayout } from "../../layouts/Home";

type Theme = ReturnType<typeof useTheme>;

const PrintHome: NextPageWithLayout = () => {
  const router = useRouter();
  const themes = useTheme();
  const ref = useRef<HTMLInputElement>(null);

  const handleClick = useCallback(() => {
    if (!ref?.current) return;
    const id = ref.current.value;
    router.push(`/print/${id}`);
  }, [ref, router]);

  return (
    <>
      <Head>
        <title>インキュベーションスクエア物品管理システム 印刷</title>
      </Head>

      <Heading type="screenTitle" tag="h1">
        インキュベーションスクエア物品管理システム
      </Heading>
      <div>
        <Text as="p">掲示用のA4用紙を印刷するためのページです。</Text>
        <Text as="p">
          物品ID(アルファベット9文字)を入力するかQRコードを読み取ってください
        </Text>
      </div>
      <Box>
        <List>
          <li>
            <Input prefix={<FaQrcodeIcon />} width="100%" ref={ref} autoFocus />
          </li>
          <li>
            <Button wide onClick={handleClick}>
              印刷プレビューへ移動する
            </Button>
          </li>
        </List>
      </Box>
    </>
  );
};

export default PrintHome;

PrintHome.getLayout = getHomeLayout;

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
