import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const ContactStatus = t.Union(
  [t.Literal("NEW"), t.Literal("READ"), t.Literal("REPLIED")],
  { additionalProperties: false },
);
