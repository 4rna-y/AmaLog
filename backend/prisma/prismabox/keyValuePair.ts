import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const keyValuePairPlain = t.Object(
  { key: t.String(), value: t.String(), updatedAt: t.Date() },
  { additionalProperties: false },
);

export const keyValuePairRelations = t.Object(
  {},
  { additionalProperties: false },
);

export const keyValuePairPlainInputCreate = t.Object(
  { value: t.String() },
  { additionalProperties: false },
);

export const keyValuePairPlainInputUpdate = t.Object(
  { value: t.Optional(t.String()) },
  { additionalProperties: false },
);

export const keyValuePairRelationsInputCreate = t.Object(
  {},
  { additionalProperties: false },
);

export const keyValuePairRelationsInputUpdate = t.Partial(
  t.Object({}, { additionalProperties: false }),
);

export const keyValuePairWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
          key: t.String(),
          value: t.String(),
          updatedAt: t.Date(),
        },
        { additionalProperties: false },
      ),
    { $id: "keyValuePair" },
  ),
);

export const keyValuePairWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect(
      [
        t.Partial(
          t.Object({ key: t.String() }, { additionalProperties: false }),
          { additionalProperties: false },
        ),
        t.Union([t.Object({ key: t.String() })], {
          additionalProperties: false,
        }),
        t.Partial(
          t.Object({
            AND: t.Union([
              Self,
              t.Array(Self, { additionalProperties: false }),
            ]),
            NOT: t.Union([
              Self,
              t.Array(Self, { additionalProperties: false }),
            ]),
            OR: t.Array(Self, { additionalProperties: false }),
          }),
          { additionalProperties: false },
        ),
        t.Partial(
          t.Object(
            { key: t.String(), value: t.String(), updatedAt: t.Date() },
            { additionalProperties: false },
          ),
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "keyValuePair" },
);

export const keyValuePairSelect = t.Partial(
  t.Object(
    {
      key: t.Boolean(),
      value: t.Boolean(),
      updatedAt: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const keyValuePairInclude = t.Partial(
  t.Object({ _count: t.Boolean() }, { additionalProperties: false }),
);

export const keyValuePairOrderBy = t.Partial(
  t.Object(
    {
      key: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      value: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      updatedAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
    },
    { additionalProperties: false },
  ),
);

export const keyValuePair = t.Composite(
  [keyValuePairPlain, keyValuePairRelations],
  { additionalProperties: false },
);

export const keyValuePairInputCreate = t.Composite(
  [keyValuePairPlainInputCreate, keyValuePairRelationsInputCreate],
  { additionalProperties: false },
);

export const keyValuePairInputUpdate = t.Composite(
  [keyValuePairPlainInputUpdate, keyValuePairRelationsInputUpdate],
  { additionalProperties: false },
);
