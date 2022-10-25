import { ReactElement } from "react";
import Link from "next/link";
import styled from "styled-components";
import {
  Header,
  HeaderLink,
  Text,
  FaEditIcon,
  FaPlusIcon,
  FaPrintIcon,
  FaDatabaseIcon,
  FaQuestionCircleIcon,
} from "smarthr-ui";

export type LayoutProps = Required<{
  readonly children: ReactElement;
}>;

const SelfHeaderLink = styled(HeaderLink).withConfig({
  shouldForwardProp: (prop, defaultValidatorFn) => {
    return !["target"].includes(prop) && defaultValidatorFn(prop);
  },
})``;

export const BaseLayout = ({ children }: LayoutProps) => {
  return (
    <>
      <StyledHeader
        logo={
          <Text color="TEXT_WHITE">
            インキュベーションスクエア物品管理システム
          </Text>
        }
      >
        <Link href="/new" passHref>
          <SelfHeaderLink prefix={<FaPlusIcon />}>新規作成</SelfHeaderLink>
        </Link>
        <Link href="/detail" passHref>
          <SelfHeaderLink prefix={<FaEditIcon />}>詳細/編集</SelfHeaderLink>
        </Link>
        <Link href="/print" passHref>
          <SelfHeaderLink prefix={<FaPrintIcon />}>印刷</SelfHeaderLink>
        </Link>
        <HeaderLink
          href="https://docs.google.com/spreadsheets/d/1uvVYEVeKee_ksJd67eiJmNkx6rFbcY35vPV9aPh6iFI/edit#gid=0"
          prefix={<FaDatabaseIcon />}
        >
          DB
        </HeaderLink>
        <HeaderLink
          href="https://scrapbox.io/iwsq/%E7%89%A9%E5%93%81%E4%BF%9D%E7%AE%A1%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6"
          prefix={<FaQuestionCircleIcon />}
        >
          ヘルプ
        </HeaderLink>
      </StyledHeader>

      {children}
    </>
  );
};

export const getBaseLayout = (page: ReactElement) => {
  return <BaseLayout>{page}</BaseLayout>;
};

const StyledHeader = styled(Header)`
  height: 48px;

  a[href="/"] {
    text-decoration: none;
  }
`;
