import { CommonType } from 'cs-ui/types';

export type LoadingIconProps = {
  /**
   * @description 激活状态颜色变为主题色
   * @default  false  color white
   */
  active?: boolean;
  /**
   * @description 是否自动旋转
   * @default  false
   */
  rotate?: boolean;
} & CommonType;
