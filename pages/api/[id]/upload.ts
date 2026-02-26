import { Nemonemo } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/client";

type ResponseType = {
  ok: boolean;
  nemoData: Nemonemo | null;
  message?: string;
};

// upload color, memo API
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  console.log(req.body);
  const {
    body: { color, memo },
    query: { id },
  } = req;

  if (!id) {
    res
      .status(400)
      .json({ ok: false, nemoData: null, message: "ID is required." });
    return;
  }
  const nemoData = await client.nemonemo.create({
    data: {
      color,
      memo,
      userId: +id.toString(),
    },
  });
  res.json({ ok: true, nemoData });
}
