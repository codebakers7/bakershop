import { createSupabaseServer } from "@/lib/supabase-server"
import { redirect } from "next/navigation"
import LogoutButton from "@/components/LogoutButton"

export default async function AdminPage() {
  const supabase = await createSupabaseServer()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/auth/login")

  // FIX: Query orders
  const { data: orders } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false })

  return (
    <main className="min-h-screen bg-stone-50 px-4 py-12">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-stone-800">Orders</h1>
            <p className="text-stone-500 text-sm mt-1">
              {orders?.length ?? 0} total orders
            </p>
          </div>
          <LogoutButton />
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-xl border border-stone-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-stone-50 border-b border-stone-100">
              <tr>
                <th className="text-left px-6 py-3 text-stone-500 font-medium">Customer</th>
                <th className="text-left px-6 py-3 text-stone-500 font-medium">Email</th>
                <th className="text-left px-6 py-3 text-stone-500 font-medium">Items</th>
                <th className="text-left px-6 py-3 text-stone-500 font-medium">Total</th>
                <th className="text-left px-6 py-3 text-stone-500 font-medium">Status</th>
                <th className="text-left px-6 py-3 text-stone-500 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((order) => (
                <tr key={order.id} className="border-b border-stone-50 hover:bg-stone-50">
                  <td className="px-6 py-4 font-medium text-stone-800">{order.customer_name}</td>
                  <td className="px-6 py-4 text-stone-600">{order.customer_email}</td>
                 {/* Items column */}
<td className="px-6 py-4 text-stone-600">
  {order.items && order.items.length > 0 ? (
    <div className="space-y-1">
      {order.items.map((item: any, idx: number) => {
        // Handle BOTH old Stripe format AND new clean format
        const name = item.name || item.description || "Unknown"
        const price = item.price?.unit_amount 
          ? item.price.unit_amount / 100  // Stripe format (paise)
          : item.price || 0                // Clean format (rupees)
        const qty = item.quantity || 1
        
        return (
          <div key={idx} className="text-xs">
            <span className="font-medium">{name}</span>
            <span className="text-stone-400"> × {qty}</span>
            <span className="text-stone-500"> @ ₹{price} each</span>
          </div>
        )
      })}
    </div>
  ) : (
    <span className="text-stone-400">—</span>
  )}
</td>
                  <td className="px-6 py-4 font-bold text-amber-600">₹{order.total}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-stone-400">
                    {new Date(order.created_at).toLocaleDateString("en-IN")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {orders?.length === 0 && (
            <div className="text-center py-12 text-stone-400">
              No orders yet.
            </div>
          )}
        </div>

      </div>
    </main>
  )
}