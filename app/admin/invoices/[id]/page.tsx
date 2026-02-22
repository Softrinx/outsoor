import { getTransactionById } from "@/app/actions/admin"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "@/components/ui/table"
import { PrintInvoiceButton } from "@/components/print-invoice-button"

interface InvoicePageProps {
  params: { id: string }
}

export default async function InvoicePage({ params }: InvoicePageProps) {
  const transaction = await getTransactionById(params.id)

  if (!transaction) {
    notFound()
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="space-y-6 p-6 bg-[#1a1b1f] text-[#d1d5db] rounded-lg shadow-lg max-w-4xl mx-auto print:p-0 print:shadow-none print:bg-white print:text-black">
      <div className="flex justify-between items-center mb-6 print:hidden">
        <Link href="/admin/invoices">
          <Button variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Invoices
          </Button>
        </Link>
        <PrintInvoiceButton />
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start print:items-center border-b border-[#2d2d32] pb-4 mb-4 print:border-black print:pb-2 print:mb-2">
        <div>
          <h2 className="text-2xl font-bold text-white print:text-black">Invoice / Receipt</h2>
          <p className="text-sm text-[#9ca3af] print:text-gray-700">#{transaction.reference_id || transaction.id}</p>
        </div>
        <div className="text-right mt-4 md:mt-0">
          <p className="text-lg font-semibold text-white print:text-black">Modelsnest Inc.</p>
          <p className="text-sm text-[#9ca3af] print:text-gray-700">123 AI Street, Suite 400</p>
          <p className="text-sm text-[#9ca3af] print:text-gray-700">Innoville, CA 90210</p>
          <p className="text-sm text-[#9ca3af] print:text-gray-700">contact@Modelsnest.com</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white mb-2 print:text-black">Billed To:</h3>
          <p className="font-medium print:text-black">{transaction.user_name || "N/A"}</p>
          <p className="text-sm text-[#9ca3af] print:text-gray-700">{transaction.user_email}</p>
          {/* Add user address details if available */}
        </div>
        <div className="md:text-right">
          <h3 className="text-lg font-semibold text-white mb-2 print:text-black">Invoice Details:</h3>
          <p className="text-sm text-[#d1d5db] print:text-black">Date: {formatDate(transaction.created_at)}</p>
          <p className="text-sm text-[#d1d5db] print:text-black">Status: <span className="capitalize">{transaction.status}</span></p>
          <p className="text-sm text-[#d1d5db] print:text-black">Payment Method: {transaction.payment_method || "N/A"}</p>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white mb-2 print:text-black">Items:</h3>
        <div className="rounded-md border border-[#2d2d32] print:border-black">
          <Table className="w-full">
            <TableHeader>
              <TableRow className="border-b border-[#2d2d32] print:border-black">
                <TableHead className="text-[#9ca3af] print:text-black">Description</TableHead>
                <TableHead className="text-[#9ca3af] text-right print:text-black">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="border-b border-[#2d2d32]/50 print:border-black/50">
                <TableCell className="font-medium print:text-black capitalize">{transaction.type} Credits</TableCell>
                <TableCell className="text-right font-medium print:text-black">{formatCurrency(transaction.amount)}</TableCell>
              </TableRow>
              {transaction.description && (
                <TableRow className="border-b border-[#2d2d32]/50 print:border-black/50">
                  <TableCell className="text-sm text-[#9ca3af] italic print:text-gray-700">Notes: {transaction.description}</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="flex justify-end pt-4 border-t border-[#2d2d32] print:border-black">
        <div className="text-right">
          <p className="text-xl font-bold text-white print:text-black">Total: {formatCurrency(transaction.amount)}</p>
        </div>
      </div>

      <div className="text-center text-xs text-[#9ca3af] mt-8 print:text-gray-600 print:mt-4">
        <p>Thank you for your business!</p>
      </div>
    </div>
  )
}
