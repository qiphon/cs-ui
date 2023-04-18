/**
 * @file Button
 */
import { Button as AntButton, ButtonProps as AntButtonProps } from 'antd';
import classNames from 'classnames';
import { addClassNamePrefix } from 'cs-ui/utils';
import React, { FC } from 'react';
import { useState } from 'react';

import loadingActiveIcon from '../assets/svgs/loading-16-16@2x.png';
import loadingIcon from '../assets/svgs/loaing-16-16@2x.png';
import { CommonType } from '../types';
import './index.less';

export type ButtonProps = {
  /**
   * @type (ev: React.MouseEvent<HTMLElement, MouseEvent>) => Promise<any>;
   */
  onClick?: (ev: React.MouseEvent<HTMLElement, MouseEvent>) => Promise<any>;
} & Omit<AntButtonProps, 'onClick'> &
  CommonType;

export const Button: FC<ButtonProps> = ({ onClick, className, ...props }) => {
  const [loading, setLoading] = useState(false);
  const clickEvent = (ev: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (loading) return Promise.resolve('');
    setLoading(true);
    if (onClick) return onClick(ev);
    return Promise.resolve('');
  };
  return (
    <AntButton
      onClick={(e) => {
        if (loading) return;
        clickEvent?.(e)?.finally(() => setLoading(false));
      }}
      // loading={loading}
      // icon={loadingIcon}
      {...props}
      className={classNames(
        className,
        addClassNamePrefix('ButtonWrapper'),
        {
          loading: loading,
        },
        props.type || 'default',
        props.size || 'middle',
      )}
    >
      {loading ? (
        <img
          src={props.type === 'primary' ? loadingIcon : loadingActiveIcon}
          className="loadingIcon"
        />
      ) : (
        props.children
      )}
    </AntButton>
  );
};
