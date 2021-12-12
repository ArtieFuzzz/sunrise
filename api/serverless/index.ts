import Fastify, { FastifyReply, FastifyRequest } from 'fastify'
import { Logger } from 'tslog'

const logger = new Logger({
	displayFunctionName: true,
	exposeErrorCodeFrame: true,
	displayInstanceName: true,
	displayFilePath: 'hideNodeModulesOnly',
	dateTimePattern: '[ day-month-year / hour:minute:second ]',
	displayTypes: false,
	name: 'Sunset',
})
const app = Fastify()

app.get('/', async (_, res) => {
	logger.info('Root triggered')
	return res.send({ message: 'Hello world!' })
})

export default async (req: FastifyRequest, reply: FastifyReply) => {
	await app.ready()
	app.server.emit('request', req, reply)
}