import { getQueries, loadFilesSync } from "../utils";
import { Resolvers, Vehicle } from "../../__generated__/graphql";

type Vehicles = {
  vehicle: Vehicle;
};

const files = loadFilesSync<Vehicles>("/storage/data/modified/vehicles");
const data = {
  vehicles: files.flatMap((e) => e.vehicle),
};

export const resolvers: Resolvers = {
  Query: {
    ...getQueries(data),
    vehicle: (parent, { name }) => data.vehicles.find((e) => e.name === name),
  },
};
