import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
    overwrite: true,
    schema: "schemas/*.graphql",
    generates: {
        "src/__generated__/graphql.ts": {
            plugins: ["typescript", "typescript-resolvers"]
        }
    },
    verbose: true
};

export default config;
