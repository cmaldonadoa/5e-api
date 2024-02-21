const fs = require("fs");
const basename = require("path").basename;

const files = fs.readdirSync(__dirname);
const jsonFiles = files.filter(
  (item) =>
    /.json$/.test(item) && !/^foundry/.test(item) && !/^optional/.test(item),
);

jsonFiles.forEach((filename) => {
  fs.readFile(filename, (err, data) => {
    if (err) {
      console.log("ERROR READING FILE", filename);
      throw err;
    }

    let oldData = JSON.parse(data);

    let newData = {
      language: oldData.language.map((e) => ({
        name: e.name,
        source: e.source,
        type: e.type,
        script: e.script,
      })),
    };

    const path = `../../modified/${basename(__dirname)}/`;

    fs.mkdir(path, { recursive: true }, (err) => {
      if (err) {
        console.log("ERROR CREATING DIRECTORY");
        throw err;
      }

      fs.writeFile(path + filename, JSON.stringify(newData), (err) => {
        if (err) {
          console.log("ERROR WRITING FILE:", filename);
          throw err;
        }
      });
    });
  });
});
