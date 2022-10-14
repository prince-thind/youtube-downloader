const fs = require('fs');

const path = './';

fs.watch(path, function () {
    if (location) location.reload();
});