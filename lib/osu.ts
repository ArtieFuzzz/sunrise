import { request, SendAs } from '@artiefuzzz/lynx'
import { OsuAuthResponse, OsuUserResponse } from './types'

const getUser = async (username: string) => {
	const token = await generateAccessToken()
	const res = await request<OsuUserResponse>(`https://osu.ppy.sh/api/v2/users/${username}/osu`).headers({
		authorization: `Bearer ${token}`,
		accept: 'application/json'
	}).send()

	const req = res.json
	const grades = req.statistics.grade_counts

	if (req.error) return null

	return {
		accuracy: req.statistics.hit_accuracy.toFixed(2),
		avatarUrl: req.avatar_url,
		country: req.country,
		countryRank: req.statistics.country_rank,
		grades,
		globalRank: req.statistics.global_rank,
		id: req.id,
		username: req.username,
		totalHits: req.statistics.total_hits,
		totalScore: req.statistics.total_score,
		joinDate: req.join_date,
	}
}

const generateAccessToken = async () => {
	const data = await request<OsuAuthResponse>('https://osu.ppy.sh/oauth/token', 'POST').body({
		"client_id": process.env.OSU_CLIENT_ID,
		"client_secret": process.env.OSU_CLIENT_SECRET,
		"grant_type": "client_credentials",
		"scope": "public"
	}, SendAs.JSON).send()

	return data.json.access_token
}

export { getUser }
