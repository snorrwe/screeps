export function normalise(data: any, max: number) {
    for (let key in data) {
        data[key] /= max;
    }
}

