import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableRow, TableCell, TableHeader, TableHead, TableFooter } from "@/components/ui/table";

export function OrderDetailsSkeleton() {
  return ( 
    <div className="space-y-6">
      <Table>
        <TableBody>
          <TableRow>
            <TableCell className="text-muted-foreground">Status</TableCell>
            <TableCell className="flex justify-end">
              <Skeleton className="h-5 w-20" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-muted-foreground">Cliente</TableCell>
            <TableCell className="flex justify-end">
            <Skeleton className="h-5 w-[164px]" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-muted-foreground">
              Telefone
            </TableCell>
            <TableCell className="flex justify-end">
              <Skeleton className="h-5 w-[144px]" />
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="text-muted-foreground">E-mail</TableCell>
            <TableCell className="flex justify-end">
              <Skeleton className="h-5 w-[200px]" />
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="text-muted-foreground">
              Realizado há
            </TableCell>
            <TableCell className="flex justify-end">
              <Skeleton className="h-5 w-[148px]" />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <Table>
        <TableHeader>
          <TableHead>Produto</TableHead>
          <TableHead className="text-right">Qtd.</TableHead>
          <TableHead className="text-right">Preço</TableHead>
          <TableHead className="text-right">Subtotal</TableHead>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 3 }).map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <Skeleton className="h-5 w-[140px]" />
              </TableCell>
              <TableCell className="text-right">
                <Skeleton className="h-5 w-3 ml-auto" />
              </TableCell>
              <TableCell className="text-right">
                <Skeleton className="h-5 w-12 ml-auto" />
              </TableCell>
              <TableCell className="text-right">
                <Skeleton className="h-5 w-12 ml-auto" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right font-medium">
              <Skeleton className="h-5 w-20" />
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  )
}