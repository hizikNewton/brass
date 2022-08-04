import { MobileMenusPanel } from "./styled";
import MenuItems from "../MenusComp";
import { SearchComp } from "../SearchComp";

const MobileMenu = () => (
  <MobileMenusPanel>
    <MenuItems />
    <SearchComp />
  </MobileMenusPanel>
);

export default MobileMenu;
