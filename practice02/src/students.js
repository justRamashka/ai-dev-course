/** @typedef {import("./models").Student} Student */
/**
 * Повертає унікальні адреси пошти в нижньому регістрі без пробілів.
 * @param {Student[]} students здобувачі освіти
 * @returns {string[]} адреси в порядку першої появи
 */
function uniqueEmails(students) {
    const uniqueEmails = new Set();
    for (const student of students) {
        const email = student.email?.trim().toLowerCase();
        if (email) {
            uniqueEmails.add(email);
        }
    }
    return Array.from(uniqueEmails);
}

/**
 * @param {number[]} scores бали за 100-бальною шкалою
 * @returns {number} середнє, округлене до 0,1; для [] – 0
 */
function calculateAverageGrade(scores) {
    if (scores.length === 0) {
        return 0;
    }
    const sum = scores.reduce((acc, score) => acc + score, 0);
    const average = sum / scores.length;
    return Math.round(average * 10) / 10;
}

/**
 * Форматує повне ім'я як прізвище та ініціали.
 * @param {string} fullName повне ім'я здобувача
 * @returns {string} скорочене ім'я
 */
function formatStudentName(fullName) {
    const parts = fullName.trim().split(/\s+/);
    if (parts.length === 0) {
        return "";
    }
    const lastName = parts[0];
    const initials = parts.slice(1).map(name => name[0].toUpperCase() + ".").join(" ");
    return `${lastName} ${initials}`.trim();
}

module.exports = { uniqueEmails, calculateAverageGrade, formatStudentName, groupAverage };

/**
 * Обчислює середнє всіх балів здобувачів указаної групи.
 * @param {Student[]} students здобувачі освіти
 * @param {string} groupCode шифр групи
 * @returns {number | null} округлене середнє або null, якщо балів немає
 */
function groupAverage(students, groupCode) {
    const groupStudents = students.filter(student => student.groupCode === groupCode);
    const allScores = groupStudents.flatMap(student => student.scores);
    if (allScores.length === 0) {
        return null;
    }
    return calculateAverageGrade(allScores);
}