import { Spin, SpinProps } from 'antd';
import classnames from 'classnames';
import React, { type FC } from 'react';

import './index.less';
import { CommonType } from '../types';

import { addClassNamePrefix } from '@utils/index';

export type Props = {
  /**
   * @description SpinProps['size']
   * @default "large"
   */
  size?: SpinProps['size'];
  /**
   * @description Omit<SpinProps, 'size'>
   */
  spinProps?: Omit<SpinProps, 'size'>;
} & CommonType;

export const EmptyLoading: FC<Props> = ({
  size,
  style,
  className,
  spinProps,
}) => {
  return (
    <div
      className={classnames(
        addClassNamePrefix('emptyLoadingWrapper'),
        className,
      )}
      aria-label="EmptyLoading"
      style={{ ...(style ?? {}) }}
    >
      <Spin {...spinProps} size={size ?? 'large'} />
    </div>
  );
};
