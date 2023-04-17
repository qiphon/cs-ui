/**
 * @file form 底部的按钮区域
 */
import classNames from 'classnames';
import React, { FC } from 'react';
// import { useSelector } from 'react-redux';

import './index.less';
import { Button, ButtonProps } from '../Button';
import { CommonType } from '../types';

import { addClassNamePrefix } from 'cs-ui/utils';
// import { RootState } from '../types';

export type FormActionsProps = {
  /**
   * @description 按钮列表
   * @type (ButtonProps & { title: string; promisstion?: string })[]
   */
  buttons: (ButtonProps & { title: string; promisstion?: string })[];
  /** 按钮位置
   * @default right
   */
  place?: 'center' | 'right';
  // width?: string | number;
} & CommonType;

export const FormActions: FC<FormActionsProps> = ({
  className,
  buttons,
  place = 'right',
  // width = 0,
}) => {
  // const app = useSelector<RootState, RootState['app']>((s) => s.app);

  return (
    <div
      className={classNames(
        addClassNamePrefix('formActionsWrapper'),
        className,
        place,
      )}
      aria-label="FormActions"
      // style={{
      //   width:
      //     width || //app?.sidebar?.opened
      //     // fixme 使用的时候请结合项目，这里的尺寸和侧边栏对应
      //     (false ? 'calc(100% - 180px)' : 'calc(100% - 80px)'),
      // }}
    >
      {buttons.map(({ title, className: cla, ...btn }) => (
        <Button
          className={classNames('button', cla)}
          {...btn}
          key={title}
          aria-label={String(title)}
        >
          {title}
        </Button>
      ))}
    </div>
  );
};
