/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState, useRef, forwardRef } from 'react';
import Slider, { Settings } from 'react-slick';
import styled from 'styled-components';
import Image from 'components/common/ImageSSR';
import { CONTENTS_LIST } from 'lib/staticData';
import { useRouter } from 'next/router';

const St = {
  SliderItemWrapper: styled.li`
    list-style: none;
    cursor: pointer;
    .text-box {
    }
    .num-text {
    }
    .tit-text {
      text-align: center;
      font-size: 1.4rem;
      font-weight: bold;
    }
  `,

  SliderTitleWrapper: styled.div`
    h1 {
      font-size: 2rem;
      font-weight: 900;
      span {
        background: #fff;
      }
    }

    .line {
      width: 100%;
      position: absolute;
      border: 0.7px solid #d9d9d9;
      top: 9px;
      z-index: -1;
    }
  `,
};
const SliderItem = ({ item, idx }) => {
  const router = useRouter();
  const cntId = '';
  const title = item.title;
  return (
    <St.SliderItemWrapper key={idx}>
      <div>
        <Image src={item.image_path} alt={title} />
      </div>
      <div
        className="text-box"
        role="presentation"
        style={{ cursor: 'pointer' }}
      >
        <span className="num-text">{cntId}</span>
        <p className="tit-text">{title && title}</p>
      </div>
    </St.SliderItemWrapper>
  );
};

type SliderRenderProps = {
  settings: Settings;
  contentsList: any[];
};

const SliderRender = forwardRef<Slider, SliderRenderProps>((props, ref) => {
  const { settings, contentsList } = props;
  return (
    <Slider {...settings} ref={ref}>
      {contentsList?.map((item, idx) => {
        return <SliderItem item={item} idx={idx} key={`slider-item-${idx}`} />;
      })}
    </Slider>
  );
});
type NormalSliderProps = {};

const NormalSlider: React.FC<NormalSliderProps> = ({}) => {
  const router = useRouter();
  const isFirstRender = useRef(true);
  const contentstList = CONTENTS_LIST;
  useEffect(() => {
    /* 첫 렌더링 시 데이터 feching x */
    if (isFirstRender.current) {
      isFirstRender.current = false;
    }
  }, []);

  const settings = {
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 4,
  };

  const slider = useRef(null);

  const next = () => {
    slider.current.slickNext();
  };
  const previous = () => {
    slider.current.slickPrev();
  };

  return (
    <>
      <St.SliderTitleWrapper>
        <h1 style={{ fontSize: '2rem', fontWeight: 900, position: 'relative' }}>
          <span> 최근 등록되었어요!</span>
          <div className="line"></div>
        </h1>
      </St.SliderTitleWrapper>
      <SliderRender
        settings={settings}
        contentsList={contentstList}
        ref={slider}
      />
    </>
  );
};

export default React.memo(NormalSlider);
