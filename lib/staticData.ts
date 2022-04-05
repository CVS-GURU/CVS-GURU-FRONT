export const DEFAULT_PAGE_NO = 1;
export const DEFAULT_PAGE_COUNT = 20;
export const DEFAULT_THUMBNAIL = 'https://source.unsplash.com/random';
export const DEFAULT_BOARD_OPTION = {
  value: 0,
  label: '게시판을 선택해주세요',
};

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

export const CONTENTS_LIST = [
  {
    contentesId: '1',
    image_path: 'http://bgf-cu.xcache.kinxcdn.com/product/8801019610110.jpg',
    title: '주) 토핑 2배 참치마요',
    description: '',
    rating: '4.5',
    review_count: 130,
  },
  {
    contentesId: '2',
    image_path: 'http://bgf-cu.xcache.kinxcdn.com/product/8801019610110.jpg',
    title: '주) 토핑 2배 참치마요',
    description: '',
    rating: '4.5',
    review_count: 130,
  },
  {
    contentesId: '3',
    image_path: 'http://bgf-cu.xcache.kinxcdn.com/product/8801019610110.jpg',
    title: '주) 토핑 2배 참치마요',
    description: '',
    rating: '4.5',
    review_count: 130,
  },
  {
    contentesId: '4',
    image_path: 'http://bgf-cu.xcache.kinxcdn.com/product/8801019610110.jpg',
    title: '주) 토핑 2배 참치마요',
    description: '',
    rating: '4.5',
    review_count: 130,
  },
  {
    contentesId: '2',
    image_path: 'http://bgf-cu.xcache.kinxcdn.com/product/8801019610110.jpg',
    title: '주) 토핑 2배 참치마요',
    description: '',
    rating: '4.5',
    review_count: 130,
  },
  {
    contentesId: '3',
    image_path: 'http://bgf-cu.xcache.kinxcdn.com/product/8801019610110.jpg',
    title: '주) 토핑 2배 참치마요',
    description: '',
    rating: '4.5',
    review_count: 130,
  },
  {
    contentesId: '4',
    image_path: 'http://bgf-cu.xcache.kinxcdn.com/product/8801019610110.jpg',
    title: '주) 토핑 2배 참치마요',
    description: '',
    rating: '4.5',
    review_count: 130,
  },
];

export const filterButtonDataList = [
  {
    title: '카테고리',
    paramKey: 'category',
    type: 'button',
    buttonDatas: [
      { buttonTitle: '즉석식품', value: 'instant' },
      { buttonTitle: '간편식사', value: 'single' },
      { buttonTitle: '과자류', value: 'snack' },
      { buttonTitle: '아이스크림', value: 'icecream' },
      { buttonTitle: '식품', value: 'food' },
      { buttonTitle: '음료', value: 'drink' },
    ],
  },
  {
    title: '가격순',
    paramKey: 'price',
    type: 'button',
    buttonDatas: [
      { buttonTitle: '전체', value: 'all' },
      { buttonTitle: '1,000이하', value: '0~1000' },
      { buttonTitle: '1,000 ~ 5,000', value: '1000~5000' },
      { buttonTitle: '5,000 ~ 10,000', value: '5000~10000' },
      { buttonTitle: '10,000이상', value: '10000~' },
    ],
  },
  {
    title: '평점순',
    paramKey: 'rating',
    type: 'silder',
    buttonDatas: [],
  },
  {
    title: '편의점',
    paramKey: 'cvs',
    type: 'button',
    buttonDatas: [
      { buttonTitle: '전체', value: 'all' },
      { buttonTitle: 'CU', value: 'cu' },
      { buttonTitle: 'GS', value: 'gs25' },
      { buttonTitle: '세븐일레븐', value: '7eleven' },
      { buttonTitle: '이마트 24', value: 'emart24' },
    ],
  },
];

export const ROUTING_PAGES = [
  {
    title: '찾아보기',
    link: '/contents',
  },
  { title: '마이페이지', link: '/my-page' },
  { title: 'Login', link: '/login' },
];
