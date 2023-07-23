# 作业

1. 阅读云盘链接的Program.cs中的代码，注册腾讯云账号并创建存储桶，修改 `Program.cs` 中的代码，为其添加上传文件夹，下载文件夹的功能。

2. 建议使用WSL完成下面的任务：

   - 将下面的add.cpp和mul.cpp复制在宿主机目录下

     ```cpp
     //add.cpp
     #include <iostream>
     int main(int argc, char* argv[])
     {
     	if(argc < 3){
     	std::cout << "Usage: " << argv[0] << " <num1> <num2>" << std::endl;
     	return 1;
     	}
     	else{
     		int num1 = atoi(argv[1]);
     		int num2 = atoi(argv[2]);
     		std::cout << num1 << " + " << num2 << " = " << num1 + num2 << std::endl;
     	}
     	return 0;
     }
     ```

     ```cpp
     //mul.cpp
     #include <iostream>
     int main(int argc, char* argv[])
     {
     	if(argc < 3){
     	std::cout << "Usage: " << argv[0] << " <num1> <num2>" << std::endl;
     	return 1;
     }
     else{
     	int num1 = atoi(argv[1]);
     	int num2 = atoi(argv[2]);
     	std::cout << num1 << " + " << num2 << " = " << num1 * num2 << std::endl;
     	}
     	return 0;
     }
     ```

   - 这是两个需要命令行参数才能正常运行的程序。请写一个 `Dockerfile` ，用挂载本地目录作为数据卷的方式，用容器编译这两份代码，并将编译好的文件返回给宿主机。不允许使用交互式方式启动容器，也不允许直接将运行结果进行输出，而是通过 `docker logs` 查看运行结果。要求每次启动容器只编译并运行一个文件，具体编译哪个文件通过 `docker run` 时传入参数指定，同时传入程序运行所需的参数。（提示：编译c++文件可以直接在ubuntu中安装g++）。