const students = [
    {
        name: "Iftekar",
        marks: [80, 75, 90, 85, 70]
    },
    {
        name: "Rahim",
        marks: [60, 55, 70, 65, 50]
    },
    {
        name: "Karim",
        marks: [40, 35, 45, 50, 30]
    }
]


const calculateTotal = (marks) => {
    const total =marks.reduce((sum,marks) => sum + marks, 0)
    return total
}


const calculateAverage = (marks) => {
    const total = calculateTotal(marks)

    return total / marks.length
}


const calculateGrade = (average) => {
    

    return average >= 80 ? "A" : average >= 60 ? "B" : average >= 40 ? "C" : "F"
}


const checkPassFail = (average) => {

    if(average >= 40){
        return "Pass"
    }
    else{
        return "Fail"
    }
}

const findHighestMark = (marks) => {

    const highestMark = marks.reduce((highest, mark) => {
        if(mark > highest){
            return mark
        }
        else{
            return highest
        }
    }, marks[0])

    return highestMark
}


const countPassedSubjects = (marks) => {

    let count = 0

    for(let i = 0; i < marks.length; i++){

        if(marks[i] > 50){
            count++
        }
    }

    return count
}



const displayStudentResult = (student) => {

    const total = calculateTotal(student.marks)
    const average = calculateAverage(student.marks)
    const grade = calculateGrade(average)
    const result = checkPassFail(average)

    console.log(`Name: ${student.name}`)
    console.log(`Total: ${total}`)
    console.log(`Average: ${average.toFixed(2)}`)
    console.log(`Grade: ${grade}`)
    console.log(`Result: ${result}`)
    console.log(`Highest Mark: ${findHighestMark(student.marks)}`)
    console.log(`Passed Subjects: ${countPassedSubjects(student.marks)}`)
    console.log("--------------------")
}


students.forEach(student => {
    displayStudentResult(student)
})

