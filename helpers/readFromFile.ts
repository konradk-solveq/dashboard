export function readFromFile(file) {
    const done = new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = async (e) => {
            try {
                const data = JSON.parse(e.target.result as string);
                resolve(data);
            } catch (err) {
                reject();
            }
        };
        reader.readAsText(file, 'utf-8');
    });
    return done;
}