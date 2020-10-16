export function increment(num) {
    return {
        type: "INCREMENT",
        num
    }
}

export function decrement(num) {
    return {
        type: "DECREMENT",
        num
    }
}