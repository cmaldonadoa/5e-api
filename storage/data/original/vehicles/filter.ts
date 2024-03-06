import fs from "fs";

const files = fs.readdirSync(process.cwd());
const jsonFiles = files.filter((item) => /.json$/.test(item));

for (let filename of jsonFiles) {
  const data = fs.readFileSync(filename, "utf-8");
  let oldData = JSON.parse(data);

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

  fs.writeFileSync(
    "mod-" + filename,
    JSON.stringify({
      vehicle: oldData.vehicle.filter((e) => sources.includes(e.source)),
      vehicleUpgrade: oldData.vehicleUpgrade.filter((e) =>
        sources.includes(e.source)
      ),
    })
  );
}
