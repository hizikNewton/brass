import { PagePanel } from "./styled";

const Page = ({ children, style }: { children: any; style?: object }) => (
  <PagePanel style={style}>{children}</PagePanel>
);

export default Page;
