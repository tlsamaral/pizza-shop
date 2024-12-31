import { api } from '@/lib/axios'

export type GetDailyRevenueResponse = {
	date: string
	receipt: number
}[]

interface GetDailyRevenueInPeriodParams {
	from?: Date
	to?: Date
}

export async function getDailyRevenue({
	from,
	to,
}: GetDailyRevenueInPeriodParams) {
	const response = await api.get<GetDailyRevenueResponse>(
		'/metrics/daily-receipt-in-period',
		{
			params: {
				from,
				to,
			},
		},
	)

	return response.data
}
