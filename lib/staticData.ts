export const DEFAULT_PAGE_COUNT = 5;
export const DEFAULT_THUMBNAIL = 'https://source.unsplash.com/random';
export const DEFAULT_BOARD_OPTION = {
  value: 0,
  label: '게시판을 선택해주세요',
};
export const DEFAULT_PAGE_NO = 1;
export const DIRECTION_TABLE: { [unit: string]: string } = {
  '8': 'BACK',
  '37': 'LEFT',
  '39': 'RIGHT',
  '38': 'UP',
  '40': 'DOWN',
  '13': 'ENTER',
  '27': 'ESC',
};

//* 1월부터 12월까지

export const monthList = [
  '1월',
  '2월',
  '3월',
  '4월',
  '5월',
  '6월',
  '7월',
  '8월',
  '9월',
  '10월',
  '11월',
  '12월',
];

//* 1부터 31까지
export const dayList = Array.from(Array(31), (_, i) => String(i + 1));

//* 2020년부터 1900년까지
export const yearList = Array.from(Array(121), (_, i) => String(2020 - i));

export const filterButtonDataList = [
  {
    title: '카테고리',
    type: 'button',
    buttonData: [
      { buttonTitle: '즉석식품' },
      { buttonTitle: '간편식사' },
      { buttonTitle: '과자류' },
      { buttonTitle: '아이스크림' },
      { buttonTitle: '식품' },
      { buttonTitle: '음료' },
    ],
  },
  {
    title: '가격순',
    type: 'button',
    buttonData: [
      { buttonTitle: '전체' },
      { buttonTitle: '1,000이하' },
      { buttonTitle: '1,000 ~ 5,000' },
      { buttonTitle: '5,000 ~ 10,000' },
      { buttonTitle: '10,000이상' },
    ],
  },
  {
    title: '평점순',
    type: 'silder',
    buttonData: [],
  },
  {
    title: '편의점',
    type: 'button',
    buttonData: [
      { buttonTitle: '전체' },
      { buttonTitle: 'CU' },
      { buttonTitle: 'GS' },
      { buttonTitle: '세븐일레븐' },
      { buttonTitle: '이마트 24' },
    ],
  },
];
