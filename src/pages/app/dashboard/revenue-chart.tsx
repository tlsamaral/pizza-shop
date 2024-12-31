import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import colors from 'tailwindcss/colors'

import { getDailyRevenue } from '@/api/get-daily-revenue-in-period'
import { DateRangePicker } from '@/components/ui/date-range-picker'
import { Label } from '@/components/ui/label'
import { useQuery } from '@tanstack/react-query'
import { subDays } from 'date-fns'
import { useMemo, useState } from 'react'
import type { DateRange } from 'react-day-picker'
import {
	CartesianGrid,
	Line,
	LineChart,
	ResponsiveContainer,
	XAxis,
	YAxis,
} from 'recharts'
import { Loader2 } from 'lucide-react'

export function RevenueChart() {
	const [dateRange, setDateRange] = useState<DateRange | undefined>({
		from: subDays(new Date(), 7),
		to: new Date(),
	})
	const { data: dailyRevenueInPeriod } = useQuery({
		queryKey: ['metrics', 'daily-revenue-in-period', dateRange],
		queryFn: () =>
			getDailyRevenue({
				from: dateRange?.from,
				to: dateRange?.to,
			}),
	})
	console.log(dailyRevenueInPeriod)

	const chartData = useMemo(() => {
		return dailyRevenueInPeriod?.map((item) => ({
			...item,
			receipt: item.receipt / 100,
		}))
	}, [dailyRevenueInPeriod])

	return (
		<Card className="col-span-6">
			<CardHeader className="flex-row items-center justify-between pb-8">
				<div className="space-y-1">
					<CardTitle className="text-base font-medium">
						Receita no período
					</CardTitle>
					<CardDescription>Receita diária no período</CardDescription>
				</div>

				<div className="flex items-center gap-3">
					<Label>Período</Label>
					<DateRangePicker date={dateRange} onDateChange={setDateRange} />
				</div>
			</CardHeader>
			<CardContent>
				{chartData ? (
					<ResponsiveContainer width="100%" height={240}>
						<LineChart data={chartData} style={{ fontSize: 12 }}>
							<YAxis
								dataKey="receipt"
								stroke="#888"
								axisLine={false}
								tickLine={false}
								tickFormatter={(value: number) =>
									`${value.toLocaleString('pt-BR', {
										style: 'currency',
										currency: 'BRL',
									})}`
								}
							/>
							<XAxis dataKey="date" tickLine={false} axisLine={false} dy={16} />

							<CartesianGrid vertical={false} className="stroke-muted" />

							<Line
								type="linear"
								dataKey="receipt"
								strokeWidth={3}
								stroke={colors.violet['500']}
							/>
						</LineChart>
					</ResponsiveContainer>
				) : (
					<div className='flex h-[240px] w-full items-center justify-center'>
						<Loader2 className="h-8 w-8 text-muted-foreground animate-spin" />
					</div>
				)}
			</CardContent>
		</Card>
	)
}
