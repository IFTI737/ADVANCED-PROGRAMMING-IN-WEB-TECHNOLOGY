const students = [
  { name: "Iftekar", marks: [80, 75, 90, 85, 70] },
  { name: "Rahim",   marks: [60, 55, 70, 65, 50] },
  { name: "Karim",   marks: [40, 35, 45, 50, 30] }
];

const calculateTotal = (marks) => marks.reduce((sum, mark) => sum + mark, 0);
const calculateAverage = (marks) => calculateTotal(marks) / marks.length;
const calculateGrade = (average) =>
  average >= 80 ? "A" : average >= 60 ? "B" : average >= 40 ? "C" : "F";

// STEP 1: Promise that gives the data after 2 seconds
function getStudents() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (students.length > 0) {
        resolve(students);
      } else {
        reject("No student data found");
      }
    }, 2000);
  });
}

// STEP 2: async/await + try/catch
async function displayResults() {
  try {
    const data = await getStudents();
    data.forEach((student) => {
      const average = calculateAverage(student.marks);
      console.log(`Name: ${student.name}`);
      console.log(`Total: ${calculateTotal(student.marks)}`);
      console.log(`Average: ${average.toFixed(2)}`);
      console.log(`Grade: ${calculateGrade(average)}`);
      console.log("--------------------");
    });
  } catch (error) {
    console.log(error);
  }
}

// STEP 3: call it
displayResults();