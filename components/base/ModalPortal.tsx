import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { createPortal } from 'react-dom';

interface IProps {
  children: React.ReactNode;
  modalOpened: boolean;
  closePortal: () => void;
}

const St = {
  ModalWrapper: styled.div`
    position: absolute;
    z-index: 9999;
    width: 100%;
  `,
};
const ModalPortal: React.FC<IProps> = ({
  children,
  modalOpened,
  closePortal,
}) => {
  const ref = useRef<Element | null>();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (document) {
      const dom = document.querySelector('#root-modal');
      ref.current = dom;
    }
  }, []);

  if (ref.current && mounted && modalOpened) {
    return createPortal(
      <St.ModalWrapper role="presentation" onClick={closePortal}>
        {children}
      </St.ModalWrapper>,
      ref.current,
    );
  }
  return null;
};

export default ModalPortal;
