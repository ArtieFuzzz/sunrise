import { VercelRequest, VercelResponse } from '@vercel/node'

export default async (_: VercelRequest, res: VercelResponse) => {
	return res.send({ message: 'Hello World!' })
}