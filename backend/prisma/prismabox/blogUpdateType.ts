import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const blogUpdateType = t.Union(
  [
    t.Literal("CATEGORY"),
    t.Literal("TAG"),
    t.Literal("COVERIMGID"),
    t.Literal("STATUS"),
    t.Literal("TITLE"),
    t.Literal("CONTENTS"),
  ],
  { additionalProperties: false },
);
