import React from "react";
import styled from "styled-components";

const St = {
  AlwaysScrollSection: styled.div`
    overflow: scroll;
    &::-webkit-scrollbar {
      /* 세로 스크롤 높이 */
      height: 8px;
    }
    // /* 가로 스크롤 높이 */
    // height: 8px;

    border-radius: 6px;
    background: rgba(255, 255, 255, 0.4);

    &::-webkit-scrollbar-thumb {
      background-color: rgba(0, 0, 0, 0.3);
      border-radius: 6px;
    }
  `,
};
type ScrollBarWrapperProps = {
  children: React.ReactNode;
};
const ScrollBarWrapper = ({ children }: ScrollBarWrapperProps) => {
  return <St.AlwaysScrollSection>{children}</St.AlwaysScrollSection>;
};
export default React.memo(ScrollBarWrapper);
