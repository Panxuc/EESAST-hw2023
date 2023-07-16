# C++ 进阶知识介绍作业

2023/7/14 DragonAura

## 作业内容

### 1. 编译与链接

1. 将 ./Homework/Part1 下的代码用 g++ 编译成可执行程序，命名为 `main.exe`。请在下面的代码框中写出需要用到的命令：

   ```
   g++ Fibo.cpp main.cpp -o main.exe
   ```

2. 将 ./Homework/Part1 下的 Fibo.cpp 编译为静态库，命名为 `libfibo.a`，并将 `main.cpp` 通过库运行。请在下面的代码框中写出需要用到的命令：

   ```
   g++ -c Fibo.cpp -o Fibo.o
   ar crv libfibo.a Fibo.o
   ```

### 2. Makefile 与 CMake

编写一个 CMakeLists.txt，以确保 ./Homework/Part2 下的代码可以正常生成可执行文件，编译出的可执行文件命名为 `main.exe`。请在下面的代码框中将对应的 CMakeLists.txt 补充完整：

> 本题中，`ThirdLib` 相当于一个第三方的开源库，且这个库是 Header-Only 的，大家在后续的开发中，尤其是 C++ 的开发中，也会经常见到这类库。关于 Header-Only 有什么好处，可以参考如下链接：
>
> https://stackoverflow.com/questions/12671383/benefits-of-header-only-libraries

``` cmake
# ./CMakeLists.txt

cmake_minimum_required(VERSION 3.5)
project(Fibo)

add_executable(main.exe ./ThirdLib/include/ThirdLib.hpp ./include/Fibo.h ./src/Fibo.cpp ./src/main.cpp)

target_include_directories(main.exe PUBLIC ${PROJECT_SOURCE_DIR}/include)
```

### 3. C++ 多文件编程

将 ./Homework/Part3/SingleFile.cpp 的代码改写成多文件编程，要求有三个文件：

* `io.h`：`readNumber()`、`writeAnswer()` 函数的声明
* `io.cpp`：`readNumber()`、`writeAnswer()`函数的定义
* `main.cpp`：和 `SingleFile.cpp` 中的定义保持一致

### 4. 面向对象程序设计基础

./Homework/Part4/OOP.cpp 中的代码是某同学在某校某系《计算机程序设计基础（2）》期末大作业中设计的『学生管理系统』代码架构。请你观察一下，这个代码是否符合我们所学的 OOP 规范？如果符合，请逐个规范分析；如不符合，请按照我们本课程所学的知识，尽可能将其修改地更合理。

要求：可以适当添加其他类或接口，应当按照题目已经给出的四种方法，来合理安排继承、组合的关系，每个方法的具体实现不要求给出代码实现。

### 5. Modern C++

1.请判断以下各项是否为常量表达式（在各行注释里填写答案）

```c++
int a = 1;
const int b = 1; // 是（示例）
const int c = a + 1; // 否
const int d = b + 1; // 是
const int e = a + b; // 否
constexpr int f = 1 + 1; // 是
```

2.请使用基于范围的 for 循环，补充下面的代码，计算数组 `vec` 的和，并将各个值输出出来，再将各个值加一。

```c++
#include <vector>
#include <iostream>

int main()
{
    std::vector<int> vec{123, 456, 789};
    // your code
    int sum = 0;
    for (int x : vec)
    {
        sum += x;
        std::cout << x << " ";
    }
    std::cout << std::endl;
    std::cout << "sum = " << sum << "\n";
    for (int& x : vec)
    {
        x++;
        std::cout << x << " ";
    }
    std::cout << std::endl;
    // your code
    return 0;
}
```

3.请简要分析，./Homework/Part5/Lambda.cpp 中的代码可能会导致什么问题？为什么会出现这样的问题？在下面作答。（提示：变量的生命周期）

> 输出`Hello from lambda: `后输出内容是不确定的。
>
> 因为lambda表达式捕获引用后作为分离的线程运行。被lambda表达式捕获的变量`str`为局部变量，在lambda表达式输出`Hello from lambda: `时，`str`所在线程已结束，此时`str`已超出其生命周期，此时访问该变量是不恰当的。

4.判断以下各项是否为右值：

```c++
int a = 1;// 在各行注释中填写答案
1 // 是（示例）
"1" // 是
-1 // 是
a // 否
std::move(a) // 是
std::forward<int>(a) // 是
static_cast<int&>(a) // 否
```

5.请简要分析以下两段代码有什么问题？写在代码块下面即可。（提示：无名临时对象的析构问题）

> 特别鸣谢：刘雪枫学长
>
> \xfgg/

```c++
std::thread([]
            { do_something(); });

std::async(std::launch::async, []
           { do_something(); });
```

> 这两段代码都存在无名临时对象的析构问题。第一段代码的线程对象的生命周期不确定，可能导致未定义行为；第二段代码的`std::async`的析构函数可能会阻塞线程。（？）
>

## 作业说明

本次作业共 10 道小题，可能题目较多、难度较大。因此，正确完成 6 道题及以上可记完成了一次作业；若你正确完成了 9 道题及以上，可以**额外**记完成了一次作业。

## 提交方法

将该文档、Part3 文件夹、Part4 文件夹三部分打包，命名为 学号\_姓名.zip，上传到下面的清华云盘链接。

## 截止时间

该作业截止到暑假结束