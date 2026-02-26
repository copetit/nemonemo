import { Nemonemo } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/client";

type ResponseType = {
  ok: boolean;
  nemoDatas: Nemonemo[];
  message?: string;
};

// Get Data by user id API
// response nemoDatas
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const userId = req.query.id;
  if (!userId) {
    res
      .status(400)
      .json({ ok: false, nemoDatas: [], message: "ID is required." });
    return;
  }
  const nemoDatas = await client.nemonemo.findMany({
    where: {
      userId: +userId.toString(),
    },
  });

  res.json({ ok: true, nemoDatas });
}
