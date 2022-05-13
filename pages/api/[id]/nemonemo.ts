import { Nemonemo } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../../libs/client";

type ResponseType = {
  ok: boolean;
  nemoDatas: Nemonemo[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const userId = req.query.id;
  const nemoDatas = await client.nemonemo.findMany({
    where: {
      userId: +userId.toString(),
    },
  });
  console.log(typeof req.query.id);
  console.log(nemoDatas);
  res.json({ ok: true, nemoDatas });
}