interface BaseData {
  name?: string;
  source?: string;
  entries?: Entries;
}

interface FieldData {
  choose?: string | ChooseData;
  count?: number;
}

type ChooseData = {
  fromFilter?: string;
  from?: string | string[];
  count?: number;
};

type SpellData = {
  [K: string | number]:
    | string[]
    | { will: string[] }
    | { ritual: string[] }
    | { daily: { [k: string | number]: string[] | FieldData[] } }
    | { rest: { [k: string | number]: string[] | FieldData[] } }
    | { resource: { [k: string | number]: string[] | FieldData[] } };
};

type SpellItem = {
  _meta?: {
    level?: number;
    will?: true;
    ritual?: true;
    longRest?: 1;
    shortRest?: 1;
  };
  item: any;
};

interface Copy {
  name: string;
  source: string;
  _mod?: { entries: ModifierEntries };
}

interface Copyable extends BaseData {
  _copy?: Copy;
}

interface Versioned extends BaseData {
  _versions?: (Copy | TemplateVersion)[];
}

interface TemplateVersion {
  _template?: Copy;
  _implementations?: { _variables: string[] }[];
}

interface ModifierEntry {
  names?: string;
  replace?: string | { index?: number };
  mode?: string;
  index?: number;
  items?: TypedEntry;
}

interface ItemEntry {
  name: string;
  entriesTemplate: Entries;
}

type TypedEntry = {
  type: string;
  name?: string;
  items?: Entries;
  entries?: Entries;
};

type Entry = string | TypedEntry;

type Entries = Entry | Entry[];

type ModifierEntries = ModifierEntry | ModifierEntry[];

const modifyEntries = (base: BaseData, modifierEntries: ModifierEntry[]) => {
  modifierEntries.forEach((entry) => {
    if (typeof entry === "string") return;

    if (entry.mode === "removeArr")
      (base.entries as Entry[]) = (base.entries as Entry[]).filter(
        (e) => typeof e !== "string" && e.name !== entry.names
      );
    else if (entry.mode === "replaceArr")
      (base.entries as Entry[])[
        typeof entry.replace === "string"
          ? (base.entries as Entry[]).findIndex(
              (e) => typeof e !== "string" && e.name === entry.replace
            )
          : entry.replace.index
      ] = entry.items;
    else if (entry.mode === "insertArr")
      (base.entries as Entry[]).splice(entry.index, 0, entry.items);
  });
  return base;
};

export const utils = {
  asArray: <T>(object: T | T[]): T[] =>
    object ? (Array.isArray(object) ? object : [object]) : [],

  adapt: <T>(object: T): undefined | T => {
    if (
      !object ||
      !Object.values(object).every(Boolean) ||
      (Array.isArray(object) && object.filter(Boolean).length === 0)
    )
      return;
    return object;
  },

  formatEntries: (entries: Entry[]): TypedEntry[] => {
    return entries.map((entry) =>
      typeof entry === "string"
        ? { type: "text", entry }
        : entry.type === "list"
          ? {
              ...entry,
              items: utils.adapt(
                utils.formatEntries(utils.asArray(entry.items))
              ),
            }
          : {
              ...entry,
              entries: utils.adapt(
                utils.formatEntries(utils.asArray(entry.entries))
              ),
            }
    );
  },

  renderItemEntries: (item: BaseData, itemEntries: ItemEntry[]) => {
    if (
      !item.entries ||
      !Array.isArray(item.entries) ||
      typeof item.entries[0] !== "string" ||
      item.entries[0].search("#itemEntry") === -1
    )
      return undefined;

    const [name] = item.entries[0].match(/{#itemEntry (.*)}/)[1].split("|");

    function replaceVariables(entries: Entries): Entries {
      const replace = (entry: Entry): Entry => {
        if (typeof entry !== "string")
          return {
            ...entry,
            entries: replaceVariables(entry.entries),
          };

        const regexp = /{{item\.(\w*)}}/g;
        const matches = entry.match(regexp);

        if (!matches) return entry;

        const variables = matches.map((m) => m.match(regexp)[1]);
        return variables.reduce((accumulator, variable) => {
          const variableRegexp = new RegExp(`{{item\\.${variable}}}`, "g");
          return accumulator.replace(variableRegexp, item[variable]);
        }, entry);
      };

      if (!Array.isArray(entries)) return replace(entries);
      return entries.map(replace);
    }

    const itemEntry = itemEntries.find((e) => e.name === name);
    return replaceVariables(itemEntry.entriesTemplate);
  },

  splitEntries: (entries: Entry[]) => {
    const split = (id: number, entries?: Entries, parentId?: number) => {
      if (!entries) return;

      let result = [];
      utils.formatEntries(utils.asArray(entries)).forEach((entry) => {
        const descendantNodes = split(id + 1, entry.entries, id) || [];
        const children = utils.adapt(
          descendantNodes.filter((e) => e.parentId === id).map((e) => e.id)
        );
        delete entry.entries;
        result = [
          ...result,
          {
            ...entry,
            id,
            parentId,
            children,
          },
          ...descendantNodes,
        ];
        id += 1 + descendantNodes.length;
      });
      return result;
    };
    return split(0, entries);
  },

  getCopy: (data: Copyable[], copy?: Copy) => {
    if (!copy) return;

    let base = {
      ...data.find((e) => e.name === copy.name && e.source === copy.source),
    };

    if (base._copy) base = utils.getCopy(data, base._copy);

    delete base.name;
    delete base.source;

    if (copy._mod) {
      const entries = utils.asArray(copy._mod.entries);
      base = modifyEntries(base, entries);
    }

    return base;
  },

  formatSpells: (keys: string[], spells?: SpellData) => {
    if (!spells) return [];

    //const keys = [...Array(20).keys()].map(k => "" + (k + 1));
    const spellList = [];

    const dailyKeys = ["1", "1e"];
    const restKeys = ["1"];
    const resourceKeys = ["2", "3", "4", "5", "6"];

    keys.forEach((level) => {
      const spell = spells[level];

      if (!spell) return;

      let spellItems: SpellItem[];

      if (Array.isArray(spell))
        spellItems = spell.map((o) => ({
          ...(typeof o === "string" && { item: utils.clearName(o) }),
          ...(typeof o !== "string" && utils.formatObject(o)),
          ...(Number.isInteger(level) && {
            _meta: {
              level: +level,
            },
          }),
        }));
      else if ("will" in spell)
        spellItems = spell.will.map((o) => ({
          item: utils.clearName(o),
          _meta: {
            ...(Number.isInteger(level) && { level: +level }),
            will: true,
          },
        }));
      else if ("ritual" in spell)
        spellItems = spell.ritual.map((o) => ({
          item: utils.clearName(o),
          _meta: {
            ...(Number.isInteger(level) && { level: +level }),
            ritual: true,
          },
        }));
      else if ("daily" in spell)
        spellItems = dailyKeys.reduce((accumulator, key) => {
          const newSpells = utils
            .asArray(spell.daily[key] as any[])
            .map((o) => ({
              ...(typeof o === "string" && { item: utils.clearName(o) }),
              ...(typeof o !== "string" && utils.formatObject(o)),
              _meta: {
                ...(Number.isInteger(level) && { level: +level }),
                longRest: 1,
              },
            }));
          return [...accumulator, ...newSpells];
        }, []);
      else if ("rest" in spell)
        spellItems = restKeys.reduce((accumulator, key) => {
          const newSpells = utils
            .asArray(spell.rest[key] as any[])
            .map((o) => ({
              ...(typeof o === "string" && { item: utils.clearName(o) }),
              ...(typeof o !== "string" && utils.formatObject(o)),
              _meta: {
                ...(Number.isInteger(level) && { level: +level }),
                shortRest: 1,
              },
            }));
          return [...accumulator, ...newSpells];
        }, []);
      else if ("resource" in spell)
        spellItems = resourceKeys.reduce((accumulator, key) => {
          const newSpells = utils
            .asArray(spell.resource[key] as any[])
            .map((o) => ({
              ...(typeof o === "string" && { item: utils.clearName(o) }),
              ...(typeof o !== "string" && utils.formatObject(o)),
              ...(Number.isInteger(level) && {
                _meta: {
                  level: +level,
                },
              }),
            }));
          return [...accumulator, ...newSpells];
        }, []);

      spellList.push(...spellItems);
    });

    return spellList;
  },

  formatObject: (object?: FieldData | string | (FieldData | string)[]) => {
    if (!object) return;

    if (Array.isArray(object))
      return object.map((e) => utils.formatObject(e))[0];

    if (typeof object === "string") return { items: [utils.clearName(object)] };

    const items = Object.entries(object)
      .filter(([key]) => key !== "choose")
      .flatMap(([key, value]) => Array(value).fill(key));

    const hasItems = items.length > 0;

    if ("choose" in object) {
      if (typeof object.choose === "string")
        return {
          ...(hasItems && { items }),
          choose: {
            fromFilter: object.choose,
            count: object.count || 1,
          },
        };
      else if ("from" in object.choose)
        return {
          ...(hasItems && { items }),
          choose: {
            ...(Array.isArray(object.choose.from) && {
              from: object.choose.from.map((n) => utils.clearName(n)),
            }),
            ...(!Array.isArray(object.choose.from) && {
              fromFilter: object.choose.from,
            }),
            count: object.choose.count || 1,
          },
        };
      else
        return {
          ...(hasItems && { items }),
          choose: {
            ...(Array.isArray(object.choose) && {
              from: object.choose.map((n) => utils.clearName(n)),
            }),
            ...(!Array.isArray(object.choose) && {
              fromFilter: object.choose.fromFilter || object.choose,
            }),
            count: object.count || 1,
          },
        };
    }
    return hasItems ? { items } : undefined;
  },

  clearName: (name: string) => {
    return name.split("#")[0].split("|")[0];
  },

  getVersions: (original: Versioned): BaseData[] => {
    if (!("_versions" in original)) return [];

    let versions = original._versions;
    delete original._versions;

    if (versions.length === 1) {
      const version = versions[0] as TemplateVersion;
      const template = version._template;
      const implementations = version._implementations;

      const replaceVariables = (text: string, vars: string[]) => {
        const regexp = new RegExp(
          "{{(" + Object.keys(vars).join("|") + ")}}",
          "g"
        );
        return text.replace(regexp, (m, $1) => vars[$1] || m);
      };

      versions = implementations.map((implementation) => {
        const variables = implementation._variables;
        delete implementation._variables;

        return {
          ...template,
          ...implementation,
          name: replaceVariables(template.name, variables),
          ...(template._mod && {
            _mod: {
              entries: utils.asArray(template._mod.entries).map((entry) => ({
                ...entry,
                items: entry.items
                  ? {
                      ...entry.items,
                      entries: utils
                        .asArray(entry.items.entries)
                        .map((e) => replaceVariables(e as string, variables)),
                    }
                  : undefined,
              })),
            },
          }),
        };
      });
    }

    return versions.map((version: Copy) => {
      if (original.entries && version._mod) {
        let entriesMod: ModifierEntry[] = utils.asArray(version._mod.entries);
        delete version._mod;

        original = modifyEntries(original, entriesMod);
      }

      return {
        ...original,
        ...version,
        entries: original.entries,
      };
    });
  },
};
