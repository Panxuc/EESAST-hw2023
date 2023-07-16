#include <iostream>
#include <vector>

class IEater
{
	virtual void Eat() = 0; // 吃饭
};

class IResearcher
{
	virtual void Research() = 0; // 科研
};

class Human
{
	// Human类不再包含任何抽象方法
};

class Teacher : public Human, public IEater, public IResearcher // 教师
{
	std::vector<Student *> students;			 // 班内的学生
	std::vector<UnderGraduate *> underGraduates; // 做辅导员带的本科生
	std::vector<PostGraduate *> postGraduates;	 // 带的研究生

	virtual void Eat() override
	{
		// 教师如何吃饭
	}

	virtual void Research() override
	{
		// 教师如何科研
	}

	virtual void Teach()
	{
		// 教师如何教学
	}
};

class Student : public Human, public IEater, public IResearcher // 学生
{
	Teacher *classTeacher; // 班主任

	virtual void Eat() override
	{
		// 学生如何吃饭
	}

	virtual void Research() override
	{
		// 学生如何科研
	}

	virtual void TakeClass()
	{
		// 学生如何上课学习
	}
};

class UnderGraduate : public Student // 本科生
{
	Teacher *leader; // 辅导员

	virtual void Research() override
	{
		// 本科生如何科研
	}

	virtual void TakeClass() override
	{
		// 本科生如何上课学习
	}
};

class PostGraduate : public Student // 研究生
{
	Teacher *tutor; // 导师

	virtual void Research() override
	{
		// 研究生如何科研
	}

	virtual void TakeClass() override
	{
		// 研究生如何上课学习
	}
};

int main()
{
	return 0;
}