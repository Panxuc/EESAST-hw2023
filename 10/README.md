# NodeJs&Webpack&TypeScript Homework

### 1. NodeJs 基础练习

安装nodejs，新建一个项目文件夹，并尝试运行如下 js 代码：

```javascript
const axios = require('axios');
axios.get('https://www.eesast.com')
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });
```

它引用了一个 `axios` 包（该包提供了网络访问的接口），需要你使用 `npm` 或 `yarn` 安装。

提交控制台输出的截图即可，它应当是一个html文本。

### 2. Webpack 起步

参照官网教程：[起步 | webpack 中文文档 ](https://www.webpackjs.com/guides/getting-started/)完成练习。你也可以自己设计你的html,css,js文件来做出一

个好看的小项目。

提交html打开后的网页截图即可，（如果有自行设计的也可以提交一下代码让我欣赏一下 \^v\^）。

### 3. TypeScript 基础练习

新建一个 ts 文件，并复制以下代码：

```typescript
export interface Student {
  firstName: string;
  lastName: string;
}

export function getFullName(student: Student) {
  return `${student.firstName} ${student.lastName}`;
}
```

创建一个你自己的 ts 文件，并 import 上面提供的接口和函数，使用该接口创建一个变量，并在控制台输出该函数的调用结果。

提交代码截图即可。

### 提交

把所有提交的内容放在一个 **pdf** **文件** 中，命名为 **班级+姓名+学号**，上传到 。开学前提交即可。