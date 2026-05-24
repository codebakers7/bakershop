import { stripe } from "@/lib/stripe"
import { createClient } from "@/lib/supabase"
import Link from "next/link"

export default async function OrderSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>
}) {
  const { session_id } = await searchParams

  if (!session_id) {
    return <div>Invalid session</div>
  }

  const session = await stripe.checkout.sessions.retrieve(session_id)

  if (session.payment_status !== "paid") {
    return <div>Payment not completed</div>
  }

  const supabase = createClient()
  
  const { data: existingOrder } = await supabase
    .from("orders")
    .select("*")
    .eq("stripe_session_id", session_id)
    .single()

  if (!existingOrder) {
    await supabase.from("orders").insert({
      customer_email: session.customer_details?.email || "unknown",
      customer_name: session.customer_details?.name || "unknown",
      items: session.line_items,
      total: session.amount_total ? session.amount_total / 100 : 0,
      status: "paid",
      stripe_session_id: session_id,
    })
  }

  return (
    <main className="min-h-screen bg-stone-50 py-16 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <div className="text-6xl mb-4">✅</div>
        <h1 className="text-3xl font-bold text-stone-900 mb-4">Order Confirmed!</h1>
        <p className="text-stone-600 mb-2">Thank you for your order.</p>
        <p className="text-stone-500 mb-8">Order total: ₹{session.amount_total ? session.amount_total / 100 : 0}</p>
        <Link href="/" className="inline-block bg-stone-900 text-white px-8 py-3 rounded-xl font-medium hover:bg-stone-800">
          Continue Shopping
        </Link>
      </div>
    </main>
  )
}