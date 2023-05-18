import classNames from 'classnames';
import { CommonType } from 'cs-ui/types';
import React from 'react';

/** 搜索  */
export const SearchIcon = ({ className, style }: CommonType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      className={classNames('design-iconfont searchIcon', className)}
      width="128"
      height="128"
      style={style}
    >
      <path
        d="M5.2,9.53333333 C7.59323392,9.53333333 9.53333333,7.59323392 9.53333333,5.2 C9.53333333,2.80676608 7.59323392,0.866666667 5.2,0.866666667 C2.80676608,0.866666667 0.866666667,2.80676608 0.866666667,5.2 C0.866666667,7.59323392 2.80676608,9.53333333 5.2,9.53333333 Z M5.2,0 C8.0718807,0 10.4,2.3281193 10.4,5.2 C10.4,6.70761464 9.75841658,8.06537944 8.73338886,9.01515528 L12.0122871,12.2944908 C12.1736821,12.4558858 12.1736821,12.7175588 12.0122871,12.8789538 C11.8508921,13.0403487 11.5892191,13.0403487 11.4278241,12.8789538 L8.07901346,9.53094356 C7.25469811,10.0800059 6.26471836,10.4 5.2,10.4 C2.3281193,10.4 0,8.0718807 0,5.2 C0,2.3281193 2.3281193,0 5.2,0 Z"
        transform="translate(2 1.5)"
        fillRule="nonzero"
      ></path>
    </svg>
  );
};
