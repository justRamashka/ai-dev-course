/**
 * Повертає найдовше слово з літер або цифр, зокрема українських.
 * @param {string} text текст для пошуку
 * @returns {string} перше найдовше слово або порожній рядок
 */
function longestWord(text) {
    if (text === "") {
        return "";
    }
    let words = text.match(/[\p{L}\p{N}]+/gu);
    if (!words) {
        return "";
    }
    let longest = words[0];
    for (let i = 1; i < words.length; i++) {
        if (words[i].length > longest.length) {
            longest = words[i];
        }
    }
    return longest;
}
module.exports = { longestWord };