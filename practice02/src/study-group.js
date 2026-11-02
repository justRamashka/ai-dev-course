const { calculateAverageGrade } = require("./students");

/**
 * Навчальна група та її здобувачі.
 */
class StudyGroup {
    /**
     * Створює навчальну групу.
     * @param {string} code шифр групи
     * @param {number} year рік вступу
     */
    constructor(code, year) {
        this.code = code;
        this.year = year;
        this.students = [];
    }

    /**
     * Додає здобувача до групи.
     * @param {import("./models").Student} student здобувач освіти
     * @throws {Error} якщо здобувач належить до іншої групи або вже доданий
     */
    addStudent(student) {
        if (student.groupCode !== this.code) {
            throw new Error("Здобувач належить до іншої групи");
        }
        if (this.students.some((existing) => existing.id === student.id)) {
            throw new Error("Здобувач із таким ID уже доданий");
        }
        this.students.push(student);
    }

    /**
     * Обчислює середнє всіх балів здобувачів групи.
     * @returns {number} середнє, округлене до одного знака
     */
    averageScore() {
        const scores = this.students.flatMap((student) => student.scores);
        return calculateAverageGrade(scores);
    }

    /**
     * Повертає здобувачів із найвищим середнім балом.
     * @param {number} n кількість здобувачів
     * @returns {import("./models").Student[]} впорядкований список здобувачів
     */
    topStudents(n) {
        return this.students
            .map((student) => ({
                student,
                average: calculateAverageGrade(student.scores),
            }))
            .sort((first, second) =>
                second.average - first.average || first.student.fullName.localeCompare(second.student.fullName),
            )
            .slice(0, n)
            .map(({ student }) => student);
    }
}

module.exports = { StudyGroup };
