import { Nemonemo } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/client";
import { isInvalidDate } from "@libs/isInvalidDate";

type ResponseType = {
  ok: boolean;
  nemoDatas?: Nemonemo[];
  message?: string;
};

// get Data range
// response nemoDatas
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    query: { id, range },
  } = req;
  if (range.length !== 2) {
    res.status(405).json({ ok: false, message: "Parameter must be 2." });
  }

  if (isInvalidDate(new Date(range[0]) || isInvalidDate(new Date(range[0])))) {
    res.status(405).json({ ok: false, message: "parameter is not Date." });
  }

  const startDate = new Date(range[0]);
  const endDate = new Date(range[1]);

  const nemoDatas = await client.nemonemo.findMany({
    where: {
      userId: +id.toString(),
      createAt: {
        gte: startDate,
        lt: endDate,
      },
    },
    orderBy: { createAt: "desc" },
  });

  res.json({ ok: true, nemoDatas });
}
