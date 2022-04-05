import React, { useEffect, useState } from 'react';
import iconMap from 'lib/iconMap';
import styled from 'styled-components';

const isServer = typeof window === 'undefined';

const St = {
  ScrollTopButton: styled.div`
    cursor: pointer;
    position: sticky;
    top: 85%;
    text-align: center;
    transition: all 1s;
    position: fixed;
    z-index: 1;
    width: 4rem;
    height: 2rem;
    bottom: 2rem;
    right: 1rem;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    box-shadow: 0 1px 3px rgb(106 115 125 / 80%);
  `,
};

const ScrollToTopButton = () => {
  const [isView, setIsView] = useState(false);
  const scrollTopButtonRender = () => {
    if (isServer) return;
    if (window.scrollY >= 400) {
      setIsView(true);
    } else {
      setIsView(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', scrollTopButtonRender);
    return () => {
      window.removeEventListener('scroll', scrollTopButtonRender);
    };
  }, []);
  return (
    <St.ScrollTopButton
      className="flex-center"
      style={{ opacity: isView ? 1 : 0 }}
      onClick={() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      }}
    >
      {iconMap.CaretUpOutlined}
    </St.ScrollTopButton>
  );
};

export default ScrollToTopButton;
