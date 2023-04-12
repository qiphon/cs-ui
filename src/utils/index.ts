/** 需要 styles/var.less 中的 prefix 保持一致 */
const classNamePrefix = 'cs-ui';
/** 给类名添加前缀，保证结果和less文件一致 */
export const addClassNamePrefix = (className?: string) =>
  className ? `${classNamePrefix}-${className}` : className;
