const fs = require("fs");
const basename = require("path").basename;

const files = fs.readdirSync(__dirname);
const jsonFiles = files.filter(
  (item) =>
    /.json$/.test(item) && !/^foundry/.test(item) && !/^optional/.test(item),
);

function formatEntries(entries) {
  return entries.map((entry) =>
    typeof entry === "string"
      ? { type: "text", entry }
      : entry.type === "entries"
        ? { ...entry, entries: formatEntries(entry.entries) }
        : entry,
  );
}
function separateEntries(entries, nextId = 0, parentId = null) {
  if (!entries) return [];

  let result = [];
  formatEntries(entries).forEach((entry) => {
    const id = nextId;
    const descendantNodes = separateEntries(entry.entries, id + 1, id);
    delete entry.entries;
    result = [
      ...result,
      {
        ...entry,
        id,
        children:
          descendantNodes.length > 0
            ? descendantNodes.filter((e) => e.parentId === id).map((e) => e.id)
            : [],
        parentId,
      },
      ...descendantNodes,
    ];
    nextId = id + 1 + descendantNodes.length;
  });
  return result;
}

let keys = {};

const add = (key) => {
  if (key in keys) {
    keys[key] += 1;
  } else {
    keys[key] = 1;
  }
  return true;
};

jsonFiles.forEach((filename) => {
  fs.readFile(filename, (err, data) => {
    if (err) {
      console.log("ERROR READING FILE", filename);
      throw err;
    }

    let oldData = JSON.parse(data);

    let newData = {
      spell: oldData.spell.map((e) => ({
        name: e.name,
        source: e.source,
        level: e.level,
        school: e.school,
        time:
          e.time.length === 1
            ? `${e.time[0].number} ${e.time[0].unit}${e.time[0].number > 1 ? "s" : ""}`
            : null,
        range: {
          type: e.range.type,
          distance: {
            type: e.range.distance ? e.range.distance.type : null,
            distance: e.range.distance ? e.range.distance.amount || null : null,
          },
        },
        components: {
          v: e.components.v || null,
          s: e.components.s || null,
          m: e.components.m
            ? typeof e.components.m === "string"
              ? e.components.m
              : e.components.m.text
            : null,
        },
        duration:
          e.duration.length === 1
            ? {
                type: add(e.duration[0].type) && e.duration[0].type,
                concentration: e.duration[0].concentration || null,
                duration: e.duration[0].duration
                  ? `${e.duration[0].duration.amount} ${e.duration[0].duration.type}${e.duration[0].duration.amount > 1 ? "s" : ""}`
                  : null,
              }
            : null,
        classes: e.class,
        ritual: (e.meta && e.meta.ritual) || null,
        entries: separateEntries(e.entries),
        higherLevel: e.entriesHigherLevel
          ? separateEntries(e.entriesHigherLevel)
          : null,
      })),
    };

    console.log(keys);

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
