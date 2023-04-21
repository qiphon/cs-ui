/*
 * @@description:
 * @Author: qifeng qifeng@carbonstop.net
 * @Date: 2023-03-29 09:46:51
 * @LastEditors: qifeng qifeng@carbonstop.net
 * @LastEditTime: 2023-04-21 10:50:24
 */
import { ReactNode } from 'react';

import { CommonType } from '../types';

export type Props = {
  /** 展示的文本内容 */
  text?: ReactNode;
  /** 最大宽度，默认自动撑满 */
  maxWidth?: number;
} & CommonType;
