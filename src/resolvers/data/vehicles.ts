import { getQueries, loadFilesSync } from "./utils.js";
import { Resolvers, Vehicle } from "../../__generated__/graphql";

type Vehicles = {
  vehicle: Vehicle;
};

const files = loadFilesSync<Vehicles>("/data/modified/vehicles");
const data = {
  vehicles: files.flatMap((e) => e.vehicle),
};

export const resolvers: Resolvers = {
  Query: {
    ...getQueries(data),
    vehicle: (parent, { name }) => data.vehicles.find((e) => e.name === name),
  },
};
