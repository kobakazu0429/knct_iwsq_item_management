import { ReactElement } from "react";
import styled from "styled-components";
import { BaseLayout, type LayoutProps } from "./Base";

export const CenterLayout = ({ children }: LayoutProps) => {
  return (
    <BaseLayout>
      <Container>{children}</Container>
    </BaseLayout>
  );
};

export const getCenterLayout = (page: ReactElement) => {
  return <CenterLayout>{page}</CenterLayout>;
};

const Container = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 70ch;
  padding: 3em 1em;
  margin: auto;
`;
