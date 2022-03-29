import queryString from 'query-string';
import { NextRouter } from 'next/router';
//omitByKey는 객체에서 지정된 키를 제거하는 함수다.
//파라미터 전개 연산자를 사용해서 삭제할 키를 자유롭게 추가할 수 있도록 했다.
//이 함수에 타입을 추가하려고 한다면 rest 배열에 들어갈 수 있는 문자열의 집합을
//obj 파라미터로 전달된 객체의 키로 한정하고 싶을 것이다.
//그런데, 함수 작성 시점에서는 obj 에 어떤 키가 들어있을 지 결코 알 수가 없다.

// T는 객체의 타입에 지정될 것이고
// K는 위의 예제에서 본 대로 객체 T의 키로 구성된 union 타입을 상속했다.
// R은 함수의 리턴 타입으로 Omit 유틸리티 타입을 활용했다.
// 이렇게 작성하면 rest 배열에는 obj 객체의 키에 해당하는 문자열만 들어갈 수 있다.
// 만약 다른 키를 넣으려 한다면 아래와 같이 컴파일러가 즉시 오류를 확인시켜 줄 것이다.
//omit 두번째 인자값을 뺴고,  타입정의
export function omitByKey<T, K extends keyof T, R extends Omit<T, K>>(
  obj: T,
  ...rest: K[]
): R {
  const isKeyMatches = (target: K) => rest.includes(target);

  return Object.entries(obj).reduce((result, [name, value]) => {
    return isKeyMatches(name as K) ? result : { ...result, [name]: value };
  }, {} as R);
}

export const isValidData = (value: any) => {
  if (
    value === '' ||
    value === 'undefined' ||
    value === 'null' ||
    value === undefined ||
    value === null ||
    (value !== null &&
      typeof value === 'object' &&
      !Object.keys(value).length) ||
    value === '{"err":"ResponseError: parsing_exception"}' ||
    value === '{"err":"ResponseError: index_not_found_exception"}' ||
    value === '{"err":"Error: connect ECONNREFUSED 1.255.44.13:8080"}' ||
    value === '{"err":"Error: connect ECONNREFUSED 1.255.44.18:8080"}'
  ) {
    return true;
  } else {
    return false;
  }
};

export const makeQueryString = (
  baseUrl: string,
  queriesObject: Object & { [key: string]: any },
) => {
  const url = queryString.stringify(queriesObject, {
    skipEmptyString: true,
  });
  if (!url) return baseUrl;
  return `${baseUrl}?${url}`;
};

interface Size {
  width: number | undefined;
  height: number | undefined;
}
export const getIsMobileSize = (size: Size) => {
  const { width } = size;

  if (width && width <= 720) {
    return true;
  }
  return false;
};

/**
 * 세션스토리지를 세팅한다.
 *  * @params key: key, value : value
 *
 * @returns void
 */

export const setSessionStorage = (key: string, value: string) => {
  if (typeof window !== 'undefined' && sessionStorage) {
    sessionStorage.setItem(key, JSON.stringify(value));
  }
};

/**
 * 세션스토리지를 조회한다.
 *  * @params key: key
 * @returns value
 */

export const getSessionStorage = (key: string) => {
  if (typeof window !== 'undefined' && sessionStorage) {
    return JSON.parse(sessionStorage.getItem(key) as string);
  }
  return null;
};
/**
 * 콤마를 추가한다.
 * @returns add comma number
 */
export const addComma = (num: string) => {
  if (num) {
    const regexp = /\B(?=(\d{3})+(?!\d))/g;
    return num.toString().replace(regexp, ',');
  }
  return '0';
};
