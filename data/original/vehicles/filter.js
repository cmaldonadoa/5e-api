const fs = require("fs");
const basename = require("path").basename;

const files = fs.readdirSync(__dirname);
const jsonFiles = files.filter(
  (item) =>
    /.json$/.test(item) && !/^foundry/.test(item) && !/^optional/.test(item),
);

jsonFiles.forEach((filename) => {
  fs.readFile(filename, (err, data) => {
    if (err) throw err;

    let oldData = JSON.parse(data);

    let keys = {
      _total: 0,
    };

    const add = (key) => {
      if (key in keys) {
        keys[key] += 1;
      } else {
        keys[key] = 1;
      }
    };

    const sources = [
      "PHB",
      "MM",
      "DMG",
      "SCAG",
      "VGM",
      "XGE",
      "MTF",
      "GGR",
      "AI",
      "RMR",
      "ERLW",
      "EGW",
      "MOT",
      "TCE",
      "VRGR",
      "FTD",
      "SCC",
      "MPMM",
      "AAG",
      "BAM",
    ];

    fs.writeFile(
      "mod-" + filename,
      JSON.stringify({
        vehicle: oldData.vehicle.filter((e) => sources.includes(e.source)),
        vehicleUpgrade: oldData.vehicleUpgrade.filter((e) =>
          sources.includes(e.source),
        ),
      }),
      (err) => {
        if (err) {
          console.log("ERROR WRITING FILE:", filename);
          throw err;
        }
      },
    );
  });
});
