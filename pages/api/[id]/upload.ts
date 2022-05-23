import { Nemonemo } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/client";

type ResponseType = {
  ok: boolean;
  nemoData: Nemonemo;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  console.log(req.body);
  const {
    body: { color, memo },
    query: { id },
  } = req;
  const nemoData = await client.nemonemo.create({
    data: {
      color,
      memo,
      userId: +id.toString(),
    },
  });
  res.json({ ok: true, nemoData });
}
