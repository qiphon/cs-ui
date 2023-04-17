# FormActions

表格、表单 提交按钮

- 会根据侧边栏尺寸变化而动态改变宽度

该组件需要和 redux 一起使用，目前当前 UI 库不方便演示，已注释相关代码，使用时需要解开

- 等待和 UI 校对
- 待补充和表单放置一起的样式

### 直接使用

```jsx
/**
 * transform: true
 */
import { FormActions } from 'cs-ui';

export default () => (
  <FormActions
    buttons={[
      {
        type: 'primary',
        title: '确定',
      },
      {
        title: '取消',
      },
    ]}
  />
);
```

### 居中

```jsx
/**
 * transform: true
 */
import { FormActions } from 'cs-ui';

export default () => (
  <FormActions
    place="center"
    buttons={[
      {
        type: 'primary',
        title: '确定',
        onClick: async () => {
          console.log('click 确定');
          return new Promise((r) => setTimeout(r, 2000));
        },
      },
      {
        title: '取消',
      },
    ]}
  />
);
```

<API id="FormActions"></API>
