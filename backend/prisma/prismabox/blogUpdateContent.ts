import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const blogUpdateContentPlain = t.Object(
  {
    id: t.String(),
    blogUpdateId: t.String(),
    type: t.Union(
      [
        t.Literal("CATEGORY"),
        t.Literal("TAG"),
        t.Literal("COVERIMGID"),
        t.Literal("STATUS"),
        t.Literal("TITLE"),
        t.Literal("CONTENTS"),
      ],
      { additionalProperties: false },
    ),
    line: t.Integer(),
    before: t.String(),
    after: t.String(),
  },
  { additionalProperties: false },
);

export const blogUpdateContentRelations = t.Object(
  {
    blogUpdate: t.Object(
      {
        id: t.String(),
        blogId: t.String(),
        title: t.String(),
        createdAt: t.Date(),
      },
      { additionalProperties: false },
    ),
  },
  { additionalProperties: false },
);

export const blogUpdateContentPlainInputCreate = t.Object(
  {
    type: t.Union(
      [
        t.Literal("CATEGORY"),
        t.Literal("TAG"),
        t.Literal("COVERIMGID"),
        t.Literal("STATUS"),
        t.Literal("TITLE"),
        t.Literal("CONTENTS"),
      ],
      { additionalProperties: false },
    ),
    line: t.Integer(),
    before: t.String(),
    after: t.String(),
  },
  { additionalProperties: false },
);

export const blogUpdateContentPlainInputUpdate = t.Object(
  {
    type: t.Optional(
      t.Union(
        [
          t.Literal("CATEGORY"),
          t.Literal("TAG"),
          t.Literal("COVERIMGID"),
          t.Literal("STATUS"),
          t.Literal("TITLE"),
          t.Literal("CONTENTS"),
        ],
        { additionalProperties: false },
      ),
    ),
    line: t.Optional(t.Integer()),
    before: t.Optional(t.String()),
    after: t.Optional(t.String()),
  },
  { additionalProperties: false },
);

export const blogUpdateContentRelationsInputCreate = t.Object(
  {
    blogUpdate: t.Object(
      {
        connect: t.Object(
          {
            id: t.String({ additionalProperties: false }),
          },
          { additionalProperties: false },
        ),
      },
      { additionalProperties: false },
    ),
  },
  { additionalProperties: false },
);

export const blogUpdateContentRelationsInputUpdate = t.Partial(
  t.Object(
    {
      blogUpdate: t.Object(
        {
          connect: t.Object(
            {
              id: t.String({ additionalProperties: false }),
            },
            { additionalProperties: false },
          ),
        },
        { additionalProperties: false },
      ),
    },
    { additionalProperties: false },
  ),
);

export const blogUpdateContentWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
          id: t.String(),
          blogUpdateId: t.String(),
          type: t.Union(
            [
              t.Literal("CATEGORY"),
              t.Literal("TAG"),
              t.Literal("COVERIMGID"),
              t.Literal("STATUS"),
              t.Literal("TITLE"),
              t.Literal("CONTENTS"),
            ],
            { additionalProperties: false },
          ),
          line: t.Integer(),
          before: t.String(),
          after: t.String(),
        },
        { additionalProperties: false },
      ),
    { $id: "blogUpdateContent" },
  ),
);

export const blogUpdateContentWhereUnique = t.Recursive(
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
              blogUpdateId: t.String(),
              type: t.Union(
                [
                  t.Literal("CATEGORY"),
                  t.Literal("TAG"),
                  t.Literal("COVERIMGID"),
                  t.Literal("STATUS"),
                  t.Literal("TITLE"),
                  t.Literal("CONTENTS"),
                ],
                { additionalProperties: false },
              ),
              line: t.Integer(),
              before: t.String(),
              after: t.String(),
            },
            { additionalProperties: false },
          ),
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "blogUpdateContent" },
);

export const blogUpdateContentSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      blogUpdate: t.Boolean(),
      blogUpdateId: t.Boolean(),
      type: t.Boolean(),
      line: t.Boolean(),
      before: t.Boolean(),
      after: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const blogUpdateContentInclude = t.Partial(
  t.Object(
    { blogUpdate: t.Boolean(), type: t.Boolean(), _count: t.Boolean() },
    { additionalProperties: false },
  ),
);

export const blogUpdateContentOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      blogUpdateId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      line: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      before: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      after: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
    },
    { additionalProperties: false },
  ),
);

export const blogUpdateContent = t.Composite(
  [blogUpdateContentPlain, blogUpdateContentRelations],
  { additionalProperties: false },
);

export const blogUpdateContentInputCreate = t.Composite(
  [blogUpdateContentPlainInputCreate, blogUpdateContentRelationsInputCreate],
  { additionalProperties: false },
);

export const blogUpdateContentInputUpdate = t.Composite(
  [blogUpdateContentPlainInputUpdate, blogUpdateContentRelationsInputUpdate],
  { additionalProperties: false },
);
