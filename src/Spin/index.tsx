import { Spin as SpinAnt, type SpinProps as SpinPropsAnt } from 'antd';
import classNames from 'classnames';
import { addClassNamePrefix } from 'cs-ui/utils';
import React, { ReactNode } from 'react';
import './index.less';
import { LoadingIcon } from 'cs-ui/Icons/LoadingIcon';

export type SpinProps = {
  /** 提示文字信息 */
  tip?: ReactNode;
  /** 提示信息展示的位置 */
  tipPlace?: 'right' | 'bottom';
} & SpinPropsAnt;

export const Spin: React.FC<SpinProps> = ({
  wrapperClassName,
  children,
  tip,
  size,
  tipPlace,
  ...props
}) => {
  const loadingSize = size || 'default';
  const tipPosition = `tip-place-${tipPlace || 'right'}`;
  return (
    <SpinAnt
      indicator={
        <div className={classNames('spinShower ', loadingSize, tipPosition)}>
          {/* <img
            src={loadingIcon}
            className="loadingIcon ant-spin-dot"
            alt="loading"
          /> */}
          <LoadingIcon className="ant-spin-dot loadingIcon " active rotate />
          {tip && <span className="loadingMsg">{tip}</span>}
        </div>
      }
      size={loadingSize}
      {...props}
      className={classNames(addClassNamePrefix('spin'), wrapperClassName)}
    >
      {children}
    </SpinAnt>
  );
};
