import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useSelector, RootState } from "store";
import { Collapse } from "antd";
import { commonActions } from "store/common";
import { menuItems } from "./MenuItems";
import { MenuItems } from "types";
import Link from "next/link";
import { useRouter } from "next/router";

type StyledSidebarWrapperProps = {
  isSidebarOpen: boolean;
};

type StyledSubMenuItemListProps = {
  isSubMenuOpen?: boolean;
};

type StyledSubMenuItem = {
  isSelected?: boolean;
};

const St = {
  SidebarWrapper: styled.div<StyledSidebarWrapperProps>`
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: ${(props) => (props.isSidebarOpen ? "240px" : "76px")};
    background: white;
    z-index: 100;
    transition: all 0.5s ease;
    color: black;
    height: 93vh;
    margin: 34px;

    border-radius: 10px;
  `,
  LogoDetails: styled.div`
    height: 60px;
    width: 100%;
    display: flex;
    align-items: center;
    img {
      padding-left: 25px;
    }
    i {
      font-size: 30px;
      color: black;
      height: 50px;
      min-width: 78px;
      text-align: center;
      line-height: 50px;
    }
    .logo_name {
      font-size: 22px;
      color: black;
      font-weight: 600;
      transition: 0.3s ease;
      transition-delay: 0.1s;
    }
    .close .logo_name {
      transition-delay: 0s;
      opacity: 0;
      pointer-events: none;
    }
  `,
  Navigation: styled.ul`
    padding: 30px 0 150px 0;
    overflow: auto;
    .sidebar.close .nav-links {
      overflow: visible;
    }
    .sidebar .nav-links::-webkit-scrollbar {
      display: none;
    }
  `,
  MenuItem: styled.li<StyledSubMenuItem>`
    background: ${(props) => (props.isSelected ? "#fcf1ff" : "inherit")};
    position: relative;
    list-style: none;
    transition: all 0.4s ease;
    cursor: pointer;
    :hover {
      background: #ffe5e4;
    }
    div {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    a {
      display: flex;
      align-items: center;
      text-decoration: none;
      font-size: 16px;
      font-weight: 400;
      color: black;
      transition: all 0.4s ease;
    }
  `,
  MenuItemIcon: styled.i`
    height: 50px;
    min-width: 78px;
    text-align: center;
    line-height: 50px;
    color: black;
    font-size: 20px;
    cursor: pointer;
    transition: all 0.3s ease;
  `,
  MenuItemTitle: styled.span`
    font-size: 16px;
    opacity: 1;
    display: block;
  `,
  SubMenuItemList: styled.ul<StyledSubMenuItemListProps>`
    background: white;
    padding: 6px 6px 14px 80px;
    width: 100%;
  `,
  SubMenuItem: styled.li`
    position: relative;
    list-style: none;
    transition: all 0.4s ease;
    color: black;
    a {
      color: black;
      font-size: 15px;
      padding: 5px 0;
      white-space: nowrap;
      opacity: 0.6;
      transition: all 0.3s ease;
    }
    a:hover {
      opacity: 1;
    }
  `,

  Icon: styled.i<StyledSubMenuItemListProps>`
    transform: ${({ isSubMenuOpen }) =>
      isSubMenuOpen ? "rotate(-180deg) !important" : "rotate(0deg) !important"};
  `,

  InfoBox: styled.div`
    background: linear-gradient(to top, #bfaaff, #ca4bff);
    height: 225px;
    margin: 20px;
    border-radius: 20px;

    .info {
      height: 60%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      padding: 25px;
      color: white;
    }
  `,
};

type ProfileFooterProps = {
  isSidebarOpen: boolean;
  handleOpenSideBar: () => void;
};

type SidebarMenuItemProps = {
  menuItem: MenuItems;
};
const SidebarMenuItem = ({ menuItem }: SidebarMenuItemProps) => {
  const router = useRouter();
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  const handleSetSubMenuOpen = () => {
    setIsSubMenuOpen((prev) => !prev);
  };

  const parentRef = React.useRef<HTMLDivElement>(null);
  const childRef = React.useRef<HTMLUListElement>(null);
  const [isCollapse, setIsCollapse] = React.useState(false);

  const handleButtonClick = React.useCallback(
    (event) => {
      event.stopPropagation();
      if (parentRef.current === null || childRef.current === null) {
        return;
      }
      if (parentRef.current.clientHeight > 0) {
        parentRef.current.style.height = "0";
        // parentRef.current.style.background = "white";
      } else {
        parentRef.current.style.height = `${childRef.current.clientHeight}px`;
        // parentRef.current.style.background = "lightgray";
      }
      setIsSubMenuOpen(!isSubMenuOpen);
    },
    [isSubMenuOpen]
  );

  const isExistSubMenu = menuItem?.children;
  const href = menuItem.link?.href as string;

  return (
    <St.MenuItem isSelected={router.asPath === href}>
      <div>
        {href !== undefined ? (
          <Link href={href}>
            <a>
              <St.MenuItemIcon
                className={menuItem.icon?.name}
              ></St.MenuItemIcon>
              <St.MenuItemTitle>{menuItem.title}</St.MenuItemTitle>
            </a>
          </Link>
        ) : (
          <a>
            <St.MenuItemIcon className={menuItem.icon?.name}></St.MenuItemIcon>
            <St.MenuItemTitle>{menuItem.title}</St.MenuItemTitle>
          </a>
        )}

        {isExistSubMenu && (
          <St.Icon
            className="bx bxs-chevron-down arrow"
            onClick={handleButtonClick}
            isSubMenuOpen={isSubMenuOpen}
          ></St.Icon>
        )}
      </div>
      {isExistSubMenu && (
        <ContentsWrapper ref={parentRef}>
          <St.SubMenuItemList isSubMenuOpen={isSubMenuOpen} ref={childRef}>
            <>
              {menuItem.children?.map((subMenuItem, index) => {
                return (
                  <St.SubMenuItem key={`sidebar-submenu-${index}`}>
                    <a className="link_name" href="">
                      {subMenuItem.title}
                    </a>
                  </St.SubMenuItem>
                );
              })}
            </>
          </St.SubMenuItemList>
        </ContentsWrapper>
      )}
    </St.MenuItem>
  );
};
const ContentsWrapper = styled.div`
  height: 0;
  width: inherit;
  padding: 0 8px;
  overflow: hidden;
  transition: height 0.35s ease, background 0.35s ease;
`;
const Sidebar = () => {
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector(
    (state: RootState) => state.common.isSidebarOpen
  );
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const handleOpenSideBar = () => {
    dispatch(commonActions.setIsSidebarOpen(!isSidebarOpen));
  };

  return (
    <>
      <St.SidebarWrapper isSidebarOpen={isSidebarOpen}>
        <St.LogoDetails>
          {!isSidebarOpen && (
            <i
              className="bx bx-menu"
              onClick={handleOpenSideBar}
              style={{ cursor: "pointer" }}
            ></i>
          )}
          {isSidebarOpen && (
            <div
              className="flex-space-between"
              style={{ width: "100%", marginTop: "15px" }}
            >
              <img src="/images/gwang_logo.png" />
              <i
                className="bx bx-menu"
                onClick={handleOpenSideBar}
                style={{ cursor: "pointer" }}
              ></i>
            </div>
          )}
        </St.LogoDetails>

        <St.Navigation>
          {menuItems?.map((item, index) => (
            <SidebarMenuItem menuItem={item} key={`sidebar-menu-${index}`} />
          ))}
        </St.Navigation>

        <St.InfoBox>
          <div className="info">
            <span>신규 업데이트 </span>
            <span>항목이 있습니다.</span>
          </div>

          <div className="flex-center">
            <div
              style={{
                padding: "10px",
                borderRadius: "8px",
                background: "white",
                width: "150px",
                textAlign: "center",
              }}
            >
              <span style={{ fontWeight: 800, fontSize: "14px" }}>
                업데이트 보기
              </span>
            </div>
          </div>
        </St.InfoBox>
      </St.SidebarWrapper>
    </>
  );
};
export default Sidebar;
