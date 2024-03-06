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

export const resolvers: Resolvers = {
  Query: {
    ...getQueries(data),
    class: (parent, { name }) => data.classes.find((e) => e.name === name),
    subclass: (parent, { name }) =>
      data.subclasses.find((e) => e.name === name),
    classFeature: (parent, { name }) =>
      data.classFeatures.find((e) => e.name === name),
    subclassFeature: (parent, { name }) =>
      data.subclassFeatures.find((e) => e.name === name),
    optionalFeature: (parent, { name }) =>
      data.optionalFeatures.find((e) => e.name === name),
  },
};
