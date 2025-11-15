import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const blogUpdatePlain = t.Object(
  {
    id: t.String(),
    blogId: t.String(),
    title: t.String(),
    createdAt: t.Date(),
  },
  { additionalProperties: false },
);

export const blogUpdateRelations = t.Object(
  {
    blog: t.Object(
      {
        id: t.String(),
        category: t.String(),
        tag: t.Array(t.String(), { additionalProperties: false }),
        coverImgId: t.String(),
        status: t.Union(
          [
            t.Literal("PUBLISHED"),
            t.Literal("ONLYKNOWSURL"),
            t.Literal("UNPUBLISHED"),
          ],
          { additionalProperties: false },
        ),
        title: t.String(),
        content: t.Array(t.String(), { additionalProperties: false }),
        likes: t.Integer(),
        views: t.Integer(),
        createdAt: t.Date(),
        updatedAt: t.Date(),
      },
      { additionalProperties: false },
    ),
    contents: t.Array(
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
      { additionalProperties: false },
    ),
  },
  { additionalProperties: false },
);

export const blogUpdatePlainInputCreate = t.Object(
  { title: t.String() },
  { additionalProperties: false },
);

export const blogUpdatePlainInputUpdate = t.Object(
  { title: t.Optional(t.String()) },
  { additionalProperties: false },
);

export const blogUpdateRelationsInputCreate = t.Object(
  {
    blog: t.Object(
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
    contents: t.Optional(
      t.Object(
        {
          connect: t.Array(
            t.Object(
              {
                id: t.String({ additionalProperties: false }),
              },
              { additionalProperties: false },
            ),
            { additionalProperties: false },
          ),
        },
        { additionalProperties: false },
      ),
    ),
  },
  { additionalProperties: false },
);

export const blogUpdateRelationsInputUpdate = t.Partial(
  t.Object(
    {
      blog: t.Object(
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
      contents: t.Partial(
        t.Object(
          {
            connect: t.Array(
              t.Object(
                {
                  id: t.String({ additionalProperties: false }),
                },
                { additionalProperties: false },
              ),
              { additionalProperties: false },
            ),
            disconnect: t.Array(
              t.Object(
                {
                  id: t.String({ additionalProperties: false }),
                },
                { additionalProperties: false },
              ),
              { additionalProperties: false },
            ),
          },
          { additionalProperties: false },
        ),
      ),
    },
    { additionalProperties: false },
  ),
);

export const blogUpdateWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
          id: t.String(),
          blogId: t.String(),
          title: t.String(),
          createdAt: t.Date(),
        },
        { additionalProperties: false },
      ),
    { $id: "blogUpdate" },
  ),
);

export const blogUpdateWhereUnique = t.Recursive(
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
              blogId: t.String(),
              title: t.String(),
              createdAt: t.Date(),
            },
            { additionalProperties: false },
          ),
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "blogUpdate" },
);

export const blogUpdateSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      blog: t.Boolean(),
      blogId: t.Boolean(),
      title: t.Boolean(),
      createdAt: t.Boolean(),
      contents: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const blogUpdateInclude = t.Partial(
  t.Object(
    { blog: t.Boolean(), contents: t.Boolean(), _count: t.Boolean() },
    { additionalProperties: false },
  ),
);

export const blogUpdateOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      blogId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      title: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      createdAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
    },
    { additionalProperties: false },
  ),
);

export const blogUpdate = t.Composite([blogUpdatePlain, blogUpdateRelations], {
  additionalProperties: false,
});

export const blogUpdateInputCreate = t.Composite(
  [blogUpdatePlainInputCreate, blogUpdateRelationsInputCreate],
  { additionalProperties: false },
);

export const blogUpdateInputUpdate = t.Composite(
  [blogUpdatePlainInputUpdate, blogUpdateRelationsInputUpdate],
  { additionalProperties: false },
);
