import { VercelRequest, VercelResponse } from '@vercel/node'
import { getUser } from '../lib/osu'

export default async (req: VercelRequest, res: VercelResponse) => {
  const username = req.query.username as string
  const userData = await getUser(username)

  if (!userData) {
    res.statusCode = 404

    return res.send({ error: true, message: 'User not found' })
  }

  return res.send(userData)
}
