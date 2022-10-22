import fs from 'fs';
import path from 'path';

export default function getDefaultDir() {
    const outputDirExists = fs.existsSync(path.resolve("./output"))
    if (!outputDirExists) {
        fs.mkdirSync(path.resolve("./output"));
    }

    return path.resolve("./output");
}
