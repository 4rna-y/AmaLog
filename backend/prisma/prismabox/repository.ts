import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const repositoryPlain = t.Object(
  {
    id: t.String(),
    name: t.String(),
    isProduct: t.Boolean(),
    langs: t.Array(t.String(), { additionalProperties: false }),
    content: t.Array(t.String(), { additionalProperties: false }),
  },
  { additionalProperties: false },
);

export const repositoryRelations = t.Object(
  {},
  { additionalProperties: false },
);

export const repositoryPlainInputCreate = t.Object(
  {
    name: t.String(),
    isProduct: t.Boolean(),
    langs: t.Array(t.String(), { additionalProperties: false }),
    content: t.Array(t.String(), { additionalProperties: false }),
  },
  { additionalProperties: false },
);

export const repositoryPlainInputUpdate = t.Object(
  {
    name: t.Optional(t.String()),
    isProduct: t.Optional(t.Boolean()),
    langs: t.Optional(t.Array(t.String(), { additionalProperties: false })),
    content: t.Optional(t.Array(t.String(), { additionalProperties: false })),
  },
  { additionalProperties: false },
);

export const repositoryRelationsInputCreate = t.Object(
  {},
  { additionalProperties: false },
);

export const repositoryRelationsInputUpdate = t.Partial(
  t.Object({}, { additionalProperties: false }),
);

export const repositoryWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
          id: t.String(),
          name: t.String(),
          isProduct: t.Boolean(),
          langs: t.Array(t.String(), { additionalProperties: false }),
          content: t.Array(t.String(), { additionalProperties: false }),
        },
        { additionalProperties: false },
      ),
    { $id: "repository" },
  ),
);

export const repositoryWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect(
      [
        t.Partial(
          t.Object({ id: t.String() }, { additionalProperties: false }),
          { additionalProperties: false },
        ),
        t.Union([t.Object({ id: t.String() })], {
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
            {
              id: t.String(),
              name: t.String(),
              isProduct: t.Boolean(),
              langs: t.Array(t.String(), { additionalProperties: false }),
              content: t.Array(t.String(), { additionalProperties: false }),
            },
            { additionalProperties: false },
          ),
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "repository" },
);

export const repositorySelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      name: t.Boolean(),
      isProduct: t.Boolean(),
      langs: t.Boolean(),
      content: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const repositoryInclude = t.Partial(
  t.Object({ _count: t.Boolean() }, { additionalProperties: false }),
);

export const repositoryOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      name: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      isProduct: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      langs: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      content: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
    },
    { additionalProperties: false },
  ),
);

export const repository = t.Composite([repositoryPlain, repositoryRelations], {
  additionalProperties: false,
});

export const repositoryInputCreate = t.Composite(
  [repositoryPlainInputCreate, repositoryRelationsInputCreate],
  { additionalProperties: false },
);

export const repositoryInputUpdate = t.Composite(
  [repositoryPlainInputUpdate, repositoryRelationsInputUpdate],
  { additionalProperties: false },
);
