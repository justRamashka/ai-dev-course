// Функція повертає факторіал невід’ємного цілого числа n.
// Для від’ємного n кидає RangeError.
function factorial(n) {
    if (n < 0) {
        throw new RangeError("Input must be a non-negative integer");
    }
    if (n === 0) {
        return 1;
    }
    return n * factorial(n - 1);
}