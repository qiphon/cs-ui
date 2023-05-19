# Button

按钮分类

- 主要按钮：一般在同一个操作区域只出现 1-2 个。
- 次要按钮：用于没有主次之分的一组行动点。
- 文字+图标按钮：用于次级的行动点。
- 图标按钮
- 按钮组
- 固钉按钮

按钮宽度自适应规则

- 按钮最小宽度为 70px，当文案过长时，增加按钮宽度，左右最小间距为 12px，可在不同场景及不同业务需求选择适合的尺寸。

除弹窗卡片以外的所有圆角 4px

弹窗卡片圆角 8px

### antd

[antdv4-button](https://4x.ant.design/components/button-cn/#API)

根据 Ant Design 设计规范要求，我们会在按钮内(文本按钮和链接按钮除外)只有两个汉字时自动添加空格，如果你不需要这个特性，可以设置 ConfigProvider 的 autoInsertSpaceInButton 为 false。

### 直接使用

```tsx
import React from 'react';
import { Button } from 'cs-ui';

export default () => {
  return (
    <div>
      <div style={{ marginTop: 20 }}>
        <Button>1</Button>
      </div>
      <div style={{ marginTop: 20 }}>
        <Button type="default">default</Button>
      </div>
      <div style={{ marginTop: 20 }}>
        <Button disabled type="default">
          default
        </Button>
      </div>
      <div style={{ marginTop: 20 }}>
        <Button type="primary">primary</Button>
      </div>
      <div style={{ marginTop: 20 }}>
        <Button type="link">link</Button>
      </div>
      <div style={{ marginTop: 20 }}>
        <Button type="text">text</Button>
      </div>
      <div style={{ marginTop: 20 }}>
        <Button type="ghost">ghost</Button>
      </div>
      <div style={{ marginTop: 20 }}>
        <Button
          type="ghost"
          onClick={() => new Promise((r) => setTimeout(r, 2000))}
        >
          ghost 点击看loading
        </Button>
      </div>
      <div style={{ marginTop: 20 }}>
        <Button
          type="primary"
          onClick={() => new Promise((r) => setTimeout(r, 2000))}
        >
          点击看loading
        </Button>
      </div>
      <div style={{ marginTop: 20 }}>
        <Button
          type="primary"
          disabled
          onClick={() => new Promise((r) => setTimeout(r, 2000))}
        >
          disabled primary
        </Button>
      </div>
    </div>
  );
};
```

### Button 大小

```jsx
import { Button } from 'cs-ui';
import { ConfigProvider } from 'antd';

export default () => {
  return (
    <div>
      <div style={{ marginTop: 20 }}>
        <Button size="large">large</Button>
      </div>
      <div style={{ marginTop: 20 }}>
        <Button size="middle" type="primary">
          middle
        </Button>
      </div>
      <div style={{ marginTop: 20 }}>
        <Button type="link" size="small">
          small
        </Button>
      </div>
      <div style={{ marginTop: 20 }}>
        <Button
          type="primary"
          size="small"
          onClick={() => new Promise((r) => setTimeout(r, 2000))}
        >
          small 点击看loading
        </Button>
      </div>
      <div style={{ marginTop: 20 }}>
        <Button type="primary" size="small">
          新增
        </Button>
      </div>
      <div style={{ marginTop: 20 }}>
        去除文字间空格方法，每个项目里应该都有封装类似的东西，不要自己写
        ConfigProvider
        <ConfigProvider autoInsertSpaceInButton={false}>
          <Button type="primary" size="small">
            新增
          </Button>
        </ConfigProvider>
      </div>
    </div>
  );
};
```

### ghost button

```tsx
import { Button } from 'cs-ui';
import { ConfigProvider } from 'antd';

export default () => {
  return (
    <div>
      <div style={{ marginTop: 20 }}>
        <Button type="primary" ghost size="large">
          large
        </Button>
      </div>
      <div style={{ marginTop: 20 }}>
        <Button type="primary" ghost>
          large
        </Button>
      </div>
      <div style={{ marginTop: 20 }}>
        <Button type="default" ghost size="large">
          large
        </Button>
      </div>
      <div style={{ marginTop: 20 }}>
        <Button type="default" ghost>
          large
        </Button>
      </div>
    </div>
  );
};
```

<API id="Button"></API>
