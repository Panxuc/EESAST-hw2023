export interface Student {
	firstName: string;
	lastName: string;
}

export function getFullName(student: Student) {
	return `${student.firstName}${student.lastName}`;
}