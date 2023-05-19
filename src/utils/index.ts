/*
 * @@description:
 * @Author: qifeng qifeng@carbonstop.net
 * @Date: 2023-04-25 14:29:09
 * @LastEditors: qifeng qifeng@carbonstop.net
 * @LastEditTime: 2023-05-19 15:58:49
 */
import { Buffer } from 'safe-buffer';

import { TableSearchKey } from './constant';

/** 需要 styles/var.less 中的 prefix 保持一致 */
const classNamePrefix = 'cs-ui';
/** 给类名添加前缀，保证结果和less文件一致 */
export const addClassNamePrefix = (className?: string) =>
  className ? `${classNamePrefix}-${className}` : className;

/** 判断是不是 number | string */
export const isStringOrNumber = (val?: any): val is string =>
  ![null, undefined].some((v) => Object.is(val, v)) &&
  (typeof val === 'string' || typeof val === 'number' || !isNaN(val));

/** 更新URLsearch */
export const updateSearch = ({
  historyMethod,
  searchParams,
}: {
  searchParams: Record<string, any>;
  historyMethod?: 'pushState' | 'replaceState';
}) => {
  const { origin, search, hash, pathname } = window.location;
  const { state } = history;
  const searchObj = new URLSearchParams(search);

  Object.entries(searchParams).forEach(([k, val]) => {
    searchObj.set(k, isStringOrNumber(val) ? val : JSON.stringify(val));
  });
  let searchStr = searchObj.toString();
  if (!searchStr.startsWith('?')) {
    searchStr = `?${searchStr}`;
  }

  history[(historyMethod || 'replaceState') as keyof typeof history](
    state,
    null,
    `${origin}${pathname}${searchStr}${hash}`,
  );
};

/** 获取search参数 */
export const getSearch = () =>
  Object.fromEntries(new URLSearchParams(location.search).entries());

const keyStream = (key: string) => {
  let S: number[] = [];
  let j = 0;
  let K = [];
  for (let i = 0; i < 256; i++) {
    S[i] = i;
    K[i] = key.charCodeAt(i % key.length);
  }
  for (let i = 0; i < 256; i++) {
    j = (j + S[i] + K[i]) % 256;
    let temp = S[i];
    S[i] = S[j];
    S[j] = temp;
  }
  return S;
};

export const encrypt = (plaintext: string, secureKey?: string) => {
  let key = secureKey || TableSearchKey;
  let keystream = keyStream(key);
  let ciphertext = '';
  for (let i = 0; i < plaintext.length; i++) {
    let charCode = plaintext.charCodeAt(i) ^ keystream[i % 256];
    ciphertext += String.fromCharCode(charCode);
  }
  let base64EncodedCiphertext = Buffer.from(ciphertext, 'utf-8').toString(
    'base64',
  );
  // return base64EncodedCiphertext
  // 对加密结果进行 URL 安全 Base64 编码
  return base64EncodedCiphertext
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
};

export const decrypt = (
  base64EncodedCiphertext: string,
  secureKey?: string,
) => {
  let ciphertext = Buffer.from(base64EncodedCiphertext, 'base64').toString(
    'utf-8',
  );
  let key = secureKey || TableSearchKey;
  let keystream = keyStream(key);
  let decryptedtext = '';
  for (let i = 0; i < ciphertext.length; i++) {
    let charCode = ciphertext.charCodeAt(i) ^ keystream[i % 256];
    decryptedtext += String.fromCharCode(charCode);
  }
  return decryptedtext;
};
