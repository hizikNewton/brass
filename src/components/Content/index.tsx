import { ReactNode } from "react";
import styled from "styled-components";
import { useAppState } from "utils/hook";
import MobileMenu from "../Header/MobileMenu";

const ContentPanel = styled.div`
  width: 100%;
  overflow-x: hidden;
  flex: 1;
  margin-top: 64px;
  background: #ededed;
`;
const Content = ({ children, style }: { children: ReactNode; style?: any }) => {
  const {
    components: { mobileMenuVisible },
  } = useAppState();
  return (
    <ContentPanel style={style}>
      {mobileMenuVisible ? <MobileMenu /> : children}
    </ContentPanel>
  );
};

export default Content;
