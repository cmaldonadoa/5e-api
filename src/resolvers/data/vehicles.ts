import { getQueries, loadFilesSync } from "../utils";
import { Resolvers, Vehicle } from "../../__generated__/graphql";

type Vehicles = {
  vehicle: Vehicle;
};

const files = loadFilesSync<Vehicles>("/storage/data/modified/vehicles");
const data = {
  vehicles: files.flatMap((e) => e.vehicle),
};

const queries = {
  vehicle: (name: string) => data.vehicles.find((e) => e.name === name) || null,
};

export default {
  Query: {
    ...getQueries(data),
    vehicle: (_parent, { name }) => queries.vehicle(name),
  },
} satisfies Resolvers;
