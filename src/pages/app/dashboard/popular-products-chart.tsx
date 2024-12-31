import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import colors from 'tailwindcss/colors'

import { getPopularProducts } from '@/api/get-popular-products'
import { useQuery } from '@tanstack/react-query'
import { ChartNoAxesColumnIncreasing, Loader2 } from 'lucide-react'
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'

const COLORS = [
	colors.sky[500],
	colors.emerald[500],
	colors.indigo[500],
	colors.rose[500],
	colors.violet[500],
]

export function PopularProductsChart() {
	const { data: popularProducts } = useQuery({
		queryKey: ['metrics', 'popular-products'],
		queryFn: getPopularProducts,
	})
	return (
		<Card className="col-span-3">
			<CardHeader className="pb-8">
				<div className="flex items-center justify-between">
					<CardTitle className="text-base font-medium">
						Produtos populares
					</CardTitle>
					<CardDescription>
						<ChartNoAxesColumnIncreasing />
					</CardDescription>
				</div>
			</CardHeader>
			<CardContent>
				{popularProducts ? (
					<ResponsiveContainer width="100%" height={240}>
						<PieChart data={popularProducts} style={{ fontSize: 12 }}>
							<Pie
								data={popularProducts}
								dataKey="amount"
								nameKey="product"
								cx="50%"
								cy="50%"
								innerRadius={64}
								outerRadius={86}
								strokeWidth={8}
								labelLine={false}
								label={({
									cx,
									cy,
									midAngle,
									innerRadius,
									outerRadius,
									value,
									index,
								}) => {
									const RADIAN = Math.PI / 180
									const radius = 12 + innerRadius + (outerRadius - innerRadius)
									const x = cx + radius * Math.cos(-midAngle * RADIAN)
									const y = cy + radius * Math.sin(-midAngle * RADIAN)

									return (
										<text
											x={x}
											y={y}
											className="fill-muted-foreground text-xs"
											textAnchor={x > cx ? 'start' : 'end'}
											dominantBaseline="central"
										>
											{popularProducts[index].product.length > 12
												? popularProducts[index].product
														.substring(0, 12)
														.concat('...')
												: popularProducts[index].product}{' '}
											({value})
										</text>
									)
								}}
							>
								{popularProducts.map((_, index) => (
									<Cell
										key={`cell-${index}`}
										fill={COLORS[index]}
										className="stroke-background hover:opacity-80"
									/>
								))}
							</Pie>
						</PieChart>
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
