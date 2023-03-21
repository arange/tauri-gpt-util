// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import gpt from '@/dal/gpt';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  result: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'POST':
      return gpt(req, res);
  }
}
