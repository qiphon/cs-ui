/**
 * @file Button
 */
import { Button as AntButton, ButtonProps as AntButtonProps } from 'antd';
import classNames from 'classnames';
import { LoadingIcon } from 'cs-ui/Icons/LoadingIcon';
import { addClassNamePrefix } from 'cs-ui/utils';
import React, { FC } from 'react';
import { useState } from 'react';

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
        <LoadingIcon
          className={classNames('loadingIcon')}
          active={props.type !== 'primary'}
          rotate
        />
      ) : (
        props.children
      )}
    </AntButton>
  );
};
