/*
 * @@description: 自动省了插件
 * @Author: qifeng qifeng@carbonstop.net
 * @Date: 2023-03-29 09:43:31
 * @LastEditors: qifeng qifeng@carbonstop.net
 * @LastEditTime: 2023-05-22 10:44:15
 */
import { Tooltip } from 'antd';
import classNames from 'classnames';
import { addClassNamePrefix } from 'cs-ui/utils';
import React from 'react';
import { useEffect, useRef, useState } from 'react';

import './index.less';
import { Props } from './types';

export const Ellipsis = ({ text, className, maxWidth, style }: Props) => {
  const ele = useRef<HTMLDivElement>(null);
  const [isElliplsis, setIsElliplsis] = useState(false);
  useEffect(() => {
    if (ele.current && ele.current.scrollWidth > ele.current.offsetWidth) {
      setIsElliplsis(true);
    }
  }, []);
  return (
    <Tooltip
      title={isElliplsis ? text : undefined}
      overlayClassName="ellipsisTooltipOverlay"
    >
      <div
        className={classNames(
          addClassNamePrefix('ellipsisWrapper'),
          className,
          {
            ['ellipsis']: isElliplsis,
          },
        )}
        style={{ ...style, maxWidth }}
        ref={ele}
      >
        {text || ''}
      </div>
    </Tooltip>
  );
};
