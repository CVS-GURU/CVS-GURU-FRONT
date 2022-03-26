import React, { useEffect, useRef } from 'react';

function isImageValid(src) {
  const promise = new Promise((resolve) => {
    const img = document.createElement('img');
    img.src = src;
    img.onerror = () => resolve(false);
    img.onload = () => resolve(true);
  });

  return promise;
}

function Img({ src, alt, ...rest }) {
  const imgEl = useRef(null);
  useEffect(() => {
    isImageValid(src).then((isValid) => {
      if (!isValid && imgEl.current) {
        imgEl.current?.parentNode?.classList.add('no-photo');
        return;
      }
      /* 맞는경우 추가했던 클래스 삭제  */
      imgEl.current?.parentNode?.classList.remove('no-photo');
    });
  }, [src]);

  const success = (e) => {
    e.target.parentNode?.classList?.remove('no-photo');
  };

  const err = (e) => {
    if (!e.target?.parentNode.classList?.contains('no-photo')) {
      e.target.parentNode.classList.add('no-photo');
    }
  };

  return (
    <>
      <img
        {...rest}
        ref={imgEl}
        src={src}
        alt={alt}
        style={{
          width: '100%',
          display: src === null || src === '' || src === 'null' ? 'none' : '',
        }}
        onLoad={success}
        onError={err}
      />
    </>
  );
}

export default Img;
