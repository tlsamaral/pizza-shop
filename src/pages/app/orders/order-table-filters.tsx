import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { zodResolver } from '@hookform/resolvers/zod'
import { Search, X } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

export const orderFiltersSchema = z.object({
	orderId: z.string().optional(),
	customerName: z.string().optional(),
	status: z.string().optional(),
})

type OrdersFilterSchema = z.infer<typeof orderFiltersSchema>

export function OrderTableFilters() {
	const [searchParams, setSearchParams] = useSearchParams()

	const orderId = searchParams.get('orderId')
	const customerName = searchParams.get('customerName')
	const status = searchParams.get('status')

	const { register, handleSubmit, control, reset } =
		useForm<OrdersFilterSchema>({
			resolver: zodResolver(orderFiltersSchema),
			defaultValues: {
				orderId: orderId ?? '',
				customerName: customerName ?? '',
				status: status ?? 'all',
			},
		})

	function handleFilter({ orderId, customerName, status }: OrdersFilterSchema) {
		setSearchParams((state) => {
			if (orderId) {
				state.set('orderId', orderId)
			} else {
				state.delete('orderId')
			}

			if (customerName) {
				state.set('customerName', customerName)
			} else {
				state.delete('customerName')
			}

			if (status) {
				state.set('status', status)
			} else {
				state.delete('status')
			}

			state.set('page', '1')

			return state
		})
	}

	function clearFilters() {
		setSearchParams((state) => {
			state.delete('orderId')
			state.delete('customerName')
			state.delete('status')
			state.set('page', '1')

			return state
		})

		reset({
			orderId: '',
			customerName: '',
			status: 'all',
		})
	}

	return (
		<form
			className="flex items-center gap-2"
			onSubmit={handleSubmit(handleFilter)}
		>
			<span className="text-sm font-semibold">Filtros:</span>
			<Input
				placeholder="ID do pedido"
				className="w-auto h-8"
				{...register('orderId')}
			/>
			<Input
				placeholder="Nome do cliente"
				className="w-80 h-8"
				{...register('customerName')}
			/>

			<Controller
				control={control}
				name="status"
				render={({ field }) => {
					return (
						<Select
							defaultValue="all"
							onValueChange={field.onChange}
							name={field.name}
							value={field.value}
							disabled={field.disabled}
						>
							<SelectTrigger className="w-[180px] h-8" defaultValue="all">
								<SelectValue placeholder="Status do pedido" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">Todos Status</SelectItem>
								<SelectItem value="pending">Pendente</SelectItem>
								<SelectItem value="canceled">Canecelado</SelectItem>
								<SelectItem value="progressing">Em preparo</SelectItem>
								<SelectItem value="delivering">Em entrega</SelectItem>
								<SelectItem value="delivered">Entregue</SelectItem>
							</SelectContent>
						</Select>
					)
				}}
			/>

			<Button type="submit" size="xs" variant="secondary">
				<Search className="h-4 w-4 mr-2" />
				Filtrar resultados
			</Button>
			<Button type="button" size="xs" variant="outline" onClick={clearFilters}>
				<X className="h-4 w-4 mr-2" />
				Remover filtros
			</Button>
		</form>
	)
}
