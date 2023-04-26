/*
 * @@description:
 * @Author: qifeng qifeng@carbonstop.net
 * @Date: 2023-04-25 14:29:09
 * @LastEditors: qifeng qifeng@carbonstop.net
 * @LastEditTime: 2023-04-26 10:50:17
 */
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
