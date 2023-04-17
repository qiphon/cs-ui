/**
 * @file Button
 */
import { Button as AntButton, ButtonProps as AntButtonProps } from 'antd';
import React from 'react';
import { useState } from 'react';

export type ButtonProps = {
  onClick?: (ev: React.MouseEvent<HTMLElement, MouseEvent>) => Promise<any>;
} & Omit<AntButtonProps, 'onClick'>;

export const Button = ({ onClick, ...props }: ButtonProps) => {
  const [loading, setLoading] = useState(false);
  const clickEvent = (ev: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (loading) return Promise.resolve('');
    setLoading(true);
    if (onClick) return onClick(ev);
    return Promise.resolve('');
  };
  return (
    <AntButton
      onClick={(e) => clickEvent?.(e)?.finally(() => setLoading(false))}
      loading={loading}
      {...props}
      // children={}
    >
      {loading ? '' : props.children}
    </AntButton>
  );
};
