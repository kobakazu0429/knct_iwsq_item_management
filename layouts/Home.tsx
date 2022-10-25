import { ReactElement } from "react";
import { useTheme } from "smarthr-ui";
import styled, { css } from "styled-components";
import { BaseLayout, type LayoutProps } from "./Base";

type Theme = ReturnType<typeof useTheme>;

export const HomeLayout = ({ children }: LayoutProps) => {
  const themes = useTheme();

  return (
    <BaseLayout>
      <Container themes={themes}>{children}</Container>
    </BaseLayout>
  );
};

export const getHomeLayout = (page: ReactElement) => {
  return <HomeLayout>{page}</HomeLayout>;
};

const Container = styled.main<{ themes: Theme }>`
  ${({ themes }) => {
    const { color } = themes;
    return css`
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      text-align: left;
      height: calc(100vh - 48px);
      background-color: ${color.BACKGROUND};
      gap: 32px;
    `;
  }}
`;
