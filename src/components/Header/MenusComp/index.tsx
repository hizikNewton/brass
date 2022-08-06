import { Link } from "react-router-dom";
import { isMobile } from "../../../utils/screen";
import i18n from "../../../utils/i18n";
import { MobileMenuItem, MobileMenuLink, HeaderMenuPanel } from "./styled";

export enum LinkType {
  Inner,
  Outer,
}

const menuDataList = () => [
  {
    type: LinkType.Inner,
    name: i18n.t("navbar.home"),
    url: "/",
  },
];

const MenuItemLink = ({ menu }: { menu: any }) => {
  const { url, type, name } = menu;
  return (
    <MobileMenuLink
      href={url}
      target={type === LinkType.Inner ? "_self" : "_blank"}
      rel="noopener noreferrer"
    >
      {name}
    </MobileMenuLink>
  );
};

const MenusComp = () =>
  isMobile() ? (
    <MobileMenuItem>
      {menuDataList()
        .filter((menu) => menu.name !== undefined)
        .map((menu) => (
          <MenuItemLink menu={menu} key={menu.name} />
        ))}
    </MobileMenuItem>
  ) : (
    <HeaderMenuPanel>
      {menuDataList()
        .filter((menu) => menu.name !== undefined)
        .map((menu) =>
          menu.type === LinkType.Inner ? (
            <Link className="header__menus__item" to={menu.url} key={menu.name}>
              {menu.name}
            </Link>
          ) : (
            <a
              className="header__menus__item"
              href={menu.url}
              target="_blank"
              rel="noopener noreferrer"
              key={menu.name}
            >
              {menu.name}
            </a>
          )
        )}
    </HeaderMenuPanel>
  );

export default MenusComp;
