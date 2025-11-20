import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const blogPlain = t.Object(
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
    content: t.String(),
    likes: t.Integer(),
    views: t.Integer(),
    createdAt: t.Date(),
    updatedAt: t.Date(),
  },
  { additionalProperties: false },
);

export const blogRelations = t.Object(
  {
    blogUpdate: t.Array(
      t.Object(
        {
          id: t.String(),
          blogId: t.String(),
          title: t.String(),
          createdAt: t.Date(),
        },
        { additionalProperties: false },
      ),
      { additionalProperties: false },
    ),
  },
  { additionalProperties: false },
);

export const blogPlainInputCreate = t.Object(
  {
    category: t.String(),
    tag: t.Array(t.String(), { additionalProperties: false }),
    status: t.Union(
      [
        t.Literal("PUBLISHED"),
        t.Literal("ONLYKNOWSURL"),
        t.Literal("UNPUBLISHED"),
      ],
      { additionalProperties: false },
    ),
    title: t.String(),
    content: t.String(),
    likes: t.Integer(),
    views: t.Integer(),
  },
  { additionalProperties: false },
);

export const blogPlainInputUpdate = t.Object(
  {
    category: t.Optional(t.String()),
    tag: t.Optional(t.Array(t.String(), { additionalProperties: false })),
    status: t.Optional(
      t.Union(
        [
          t.Literal("PUBLISHED"),
          t.Literal("ONLYKNOWSURL"),
          t.Literal("UNPUBLISHED"),
        ],
        { additionalProperties: false },
      ),
    ),
    title: t.Optional(t.String()),
    content: t.Optional(t.String()),
    likes: t.Optional(t.Integer()),
    views: t.Optional(t.Integer()),
  },
  { additionalProperties: false },
);

export const blogRelationsInputCreate = t.Object(
  {
    blogUpdate: t.Optional(
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

export const blogRelationsInputUpdate = t.Partial(
  t.Object(
    {
      blogUpdate: t.Partial(
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

export const blogWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
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
          content: t.String(),
          likes: t.Integer(),
          views: t.Integer(),
          createdAt: t.Date(),
          updatedAt: t.Date(),
        },
        { additionalProperties: false },
      ),
    { $id: "blog" },
  ),
);

export const blogWhereUnique = t.Recursive(
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
              content: t.String(),
              likes: t.Integer(),
              views: t.Integer(),
              createdAt: t.Date(),
              updatedAt: t.Date(),
            },
            { additionalProperties: false },
          ),
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "blog" },
);

export const blogSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      category: t.Boolean(),
      tag: t.Boolean(),
      coverImgId: t.Boolean(),
      status: t.Boolean(),
      title: t.Boolean(),
      content: t.Boolean(),
      likes: t.Boolean(),
      views: t.Boolean(),
      createdAt: t.Boolean(),
      updatedAt: t.Boolean(),
      blogUpdate: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const blogInclude = t.Partial(
  t.Object(
    { status: t.Boolean(), blogUpdate: t.Boolean(), _count: t.Boolean() },
    { additionalProperties: false },
  ),
);

export const blogOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      category: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      tag: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      coverImgId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      title: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      content: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      likes: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      views: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      createdAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      updatedAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
    },
    { additionalProperties: false },
  ),
);

export const blog = t.Composite([blogPlain, blogRelations], {
  additionalProperties: false,
});

export const blogInputCreate = t.Composite(
  [blogPlainInputCreate, blogRelationsInputCreate],
  { additionalProperties: false },
);

export const blogInputUpdate = t.Composite(
  [blogPlainInputUpdate, blogRelationsInputUpdate],
  { additionalProperties: false },
);
