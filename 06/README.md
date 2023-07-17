# 通信作业

DragonAura 2023/7/15

## 作业内容

本次作业主要考察大家对于 Protobuf 和 gRPC 的理解程度。我们通过一个具体项目，来实际感受 Protobuf 和 gRPC 的好处。课程中我们用 C# 做服务端、Python 做客户端实现了通信，此处我们使用 Python 做服务端、C# 做客户端。两者应该没有本质差异，如果有困惑，可以参考如下文档学习相关内容：

> https://learn.microsoft.com/zh-cn/aspnet/core/grpc/?view=aspnetcore-7.0
>
> https://grpc.io/docs/languages/python/basics/

### proto 文件编写

编写一个 proto 文件，命名为 `Calculator.proto` ，内部包含两条 `message` 和一个 `Service` ，`Service` 内部有两个 `rpc` 。

- `message` ： `Request` ，包含两个整数和一个枚举类型，枚举类型分为 `ADD` , `SUB` , `PRODUCT` 和 `DIVIDE` ； `Reply` ，包含一个整数。
- `Service` ： `Calculate` ，请求为一个 `Request` ，响应为一个 `Reply` ； `StreamCalculate` ，请求为一个流式的 `Request` ，响应为一个流式的 `Reply` 。

### Server

用 `Python` 编写 `Server.py` ，要求实现 `proto` 中的两个 `rpc` 。对于 `Calculate` ，要求按照 `Request` 中的枚举类型判断运算符，并对两个整数进行对应的运算，延迟 `50ms` 后在 `Reply` 中将结果返回。对于 `StreamCalculate` ，要求每收到一个 `Request` 就计算一次， `50ms` 后返回 `Reply` 。运算符对应关系见下表：

| 运算符    | 返回值  |
| --------- | ------- |
| `ADD`     | `a + b` |
| `SUB`     | `a - b` |
| `PRODUCT` | `a * b` |
| `DIVIDE`  | `a / b` |

### Client

用 `C#` 编写 `Client.cs` ，要求连接 `Server`，实现自己的 `stub` ；之后调用 `Calculate` ，获取 `Reply` ，打印结果。最后调用 `StreamCalculate` ，要求每次循环中先等待 `100ms` ，随后发送一个 `Request` ，收到响应后打印结果。测试样例自拟不限，循环次数不小于 3 次即可。

### 提高要求

- 此处我们的 `Server.py` 每次计算需要 `50ms` 的计算时间，为此我们两次 `Request` 之间至少有 `100ms` 的间隔。这就带来了一个问题：如果 `StreamCalculate` 中快速收到 `n` 个测试样例，按照这样的流式处理，就需要 `50ms * n` 的时间才能将全部结果返回。有没有什么办法，可以将时间压缩呢？
- 此处我们的 `Client` 的 `StreamCalculate` 调用过程中难以严格地控制发送的间隔为 `100ms` （事实上按照这个测试，大概会 `150ms` 发送一条），那么有没有什么好的办法来严格控制时间，使发送间隔为稳定的 `100ms` 呢？

> 提示：利用多线程一讲的相关知识

## 说明

完成基本要求即可算作完成了本次作业，若至少完成了一项提高要求，可以**额外**算作完成一次作业。

## 作业提交方式

将 `Calculator.proto` 、 `Client.cs` 、 `Server.py` 打包为姓名_学号.zip，上传至下面的清华云盘：

## 截止时间

本次作业截止到暑假结束。