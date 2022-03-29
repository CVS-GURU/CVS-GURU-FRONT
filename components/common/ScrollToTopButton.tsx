import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

const isServer = typeof window === 'undefined';

const St = {
  ScrollTopButton: styled.div`
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
      style={{ opacity: isView ? 1 : 0 }}
      onClick={() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      }}
    >
      ^
    </St.ScrollTopButton>
  );
};

export default ScrollToTopButton;
