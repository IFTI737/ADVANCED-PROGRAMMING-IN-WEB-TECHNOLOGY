interface IStudent {
  name: string;
  age: number;
  grade: number;
}

let studentName: string = "HAMMIM";
let studentAge: number = 30;
let studenGrade: number = 3.0;

console.log("Student Name: " + studentName);
console.log("Student Age: " + studentAge);
console.log("Student Grade: " + studenGrade);

function getStudentName(): string {
  return "John Doe";
}

function getStudentAge(): number {
  return 80;
}

function getStudentGrade(): number {
  return 3.8;
}

function getStudentInfo(): IStudent {
  const student: IStudent = {
    name: getStudentName(),
    age: getStudentAge(),
    grade: getStudentGrade(),
  };
  console.log("INTERFACE");
  console.log("Student name: " + student.name);
  console.log("Student age: " + student.age);
  console.log("Student grade: " + student.grade);

  return student;
}

async function getStudentInfoAsync(): Promise<IStudent> {
  const student: IStudent = {
    name: getStudentName(),
    age: getStudentAge(),
    grade: getStudentGrade(),
  };
  console.log("INTERFACE");
  console.log("Student name: " + student.name);
  console.log("Student age: " + student.age);
  console.log("Student grade: " + student.grade);

  return student;
}

function fetchStudentInfo(): Promise<IStudent> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        name: "Hamim",
        age: 20,
        grade: 3.98,
      });
    }, 2000);
  });
}

async function main(): Promise<void> {
  getStudentInfo();
  await getStudentInfoAsync();
  console.log("Fetching student info...");
  const student = await fetchStudentInfo();

  console.log("student info recieved");
  console.log(student);
}

main();
