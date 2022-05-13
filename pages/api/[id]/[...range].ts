import { Nemonemo } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../../libs/client";

type ResponseType = {
  ok: boolean;
  nemoDatas: Nemonemo[];
};

// get Data range
// response nemoDatas
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  // console.log(req.query);
  const {
    query: { id, range },
  } = req;
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
  });

  res.json({ ok: true, nemoDatas });
}
