import { getQueries, loadFilesSync } from "../utils";
import {
  Class,
  ClassFeature,
  OptionalFeature,
  Resolvers,
  Subclass,
  SubclassFeature,
} from "../../__generated__/graphql";

type Classes = {
  class: Class;
  subclass: Subclass;
  classFeature: ClassFeature;
  subclassFeature: SubclassFeature;
  optionalFeature: OptionalFeature;
};

const files = loadFilesSync<Classes>("/storage/data/modified/classes");
const data = {
  classes: files.flatMap((e) => e.class),
  subclasses: files.flatMap((e) => e.subclass),
  classFeatures: files.flatMap((e) => e.classFeature),
  subclassFeatures: files.flatMap((e) => e.subclassFeature),
  optionalFeatures: files.flatMap((e) => e.optionalFeature),
};

export const queries = {
  class: (name: string) => data.classes.find((e) => e.name === name),
  subclass: (name: string) => data.subclasses.find((e) => e.name === name),
  classFeature: (name: string) =>
    data.classFeatures.find((e) => e.name === name),
  subclassFeature: (name: string) =>
    data.subclassFeatures.find((e) => e.name === name),
  optionalFeature: (name: string) =>
    data.optionalFeatures.find((e) => e.name === name),
};

export default {
  Query: {
    ...getQueries(data),
    class: (_parent, { name }) => queries.class(name),
    subclass: (_parent, { name }) => queries.subclass(name),
    classFeature: (_parent, { name }) => queries.classFeature(name),
    subclassFeature: (_parent, { name }) => queries.subclassFeature(name),
    optionalFeature: (_parent, { name }) => queries.optionalFeature(name),
  },
} satisfies Resolvers;
