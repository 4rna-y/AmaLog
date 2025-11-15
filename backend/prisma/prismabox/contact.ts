import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const contactPlain = t.Object(
  {
    id: t.String(),
    name: t.String(),
    email: t.String(),
    subject: t.String(),
    message: t.String(),
    ip: __nullable__(t.String()),
    userAgent: __nullable__(t.String()),
    status: t.Union(
      [t.Literal("NEW"), t.Literal("READ"), t.Literal("REPLIED")],
      { additionalProperties: false },
    ),
    createdAt: t.Date(),
  },
  { additionalProperties: false },
);

export const contactRelations = t.Object({}, { additionalProperties: false });

export const contactPlainInputCreate = t.Object(
  {
    name: t.String(),
    email: t.String(),
    subject: t.String(),
    message: t.String(),
    ip: t.Optional(__nullable__(t.String())),
    userAgent: t.Optional(__nullable__(t.String())),
    status: t.Optional(
      t.Union([t.Literal("NEW"), t.Literal("READ"), t.Literal("REPLIED")], {
        additionalProperties: false,
      }),
    ),
  },
  { additionalProperties: false },
);

export const contactPlainInputUpdate = t.Object(
  {
    name: t.Optional(t.String()),
    email: t.Optional(t.String()),
    subject: t.Optional(t.String()),
    message: t.Optional(t.String()),
    ip: t.Optional(__nullable__(t.String())),
    userAgent: t.Optional(__nullable__(t.String())),
    status: t.Optional(
      t.Union([t.Literal("NEW"), t.Literal("READ"), t.Literal("REPLIED")], {
        additionalProperties: false,
      }),
    ),
  },
  { additionalProperties: false },
);

export const contactRelationsInputCreate = t.Object(
  {},
  { additionalProperties: false },
);

export const contactRelationsInputUpdate = t.Partial(
  t.Object({}, { additionalProperties: false }),
);

export const contactWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
          id: t.String(),
          name: t.String(),
          email: t.String(),
          subject: t.String(),
          message: t.String(),
          ip: t.String(),
          userAgent: t.String(),
          status: t.Union(
            [t.Literal("NEW"), t.Literal("READ"), t.Literal("REPLIED")],
            { additionalProperties: false },
          ),
          createdAt: t.Date(),
        },
        { additionalProperties: false },
      ),
    { $id: "contact" },
  ),
);

export const contactWhereUnique = t.Recursive(
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
              email: t.String(),
              subject: t.String(),
              message: t.String(),
              ip: t.String(),
              userAgent: t.String(),
              status: t.Union(
                [t.Literal("NEW"), t.Literal("READ"), t.Literal("REPLIED")],
                { additionalProperties: false },
              ),
              createdAt: t.Date(),
            },
            { additionalProperties: false },
          ),
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "contact" },
);

export const contactSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      name: t.Boolean(),
      email: t.Boolean(),
      subject: t.Boolean(),
      message: t.Boolean(),
      ip: t.Boolean(),
      userAgent: t.Boolean(),
      status: t.Boolean(),
      createdAt: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const contactInclude = t.Partial(
  t.Object(
    { status: t.Boolean(), _count: t.Boolean() },
    { additionalProperties: false },
  ),
);

export const contactOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      name: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      email: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      subject: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      message: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      ip: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      userAgent: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      createdAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
    },
    { additionalProperties: false },
  ),
);

export const contact = t.Composite([contactPlain, contactRelations], {
  additionalProperties: false,
});

export const contactInputCreate = t.Composite(
  [contactPlainInputCreate, contactRelationsInputCreate],
  { additionalProperties: false },
);

export const contactInputUpdate = t.Composite(
  [contactPlainInputUpdate, contactRelationsInputUpdate],
  { additionalProperties: false },
);
