import { createSupabaseServer } from "@/lib/supabase-server"
import { redirect } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import LogoutButton from "@/components/LogoutButton"

export default async function AdminPage() {
  const supabase = await createSupabaseServer()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/auth/login")

  const { data: enquiries } = await supabase
    .from("enquiries")
    .select("*")
    .order("created_at", { ascending: false })

  return (
    <main className="min-h-screen bg-stone-50 px-4 py-12">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-stone-800">Enquiries</h1>
            <p className="text-stone-500 text-sm mt-1">
              {enquiries?.length ?? 0} total enquiries
            </p>
          </div>
          <LogoutButton />
        </div>

        {/* Mobile — cards */}
        <div className="md:hidden flex flex-col gap-4">
          {enquiries?.map((enquiry) => (
            <Card key={enquiry.id} className="border-stone-100">
              <CardContent className="p-4 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-stone-800">{enquiry.name}</p>
                  <p className="text-xs text-stone-400">
                    {new Date(enquiry.created_at).toLocaleDateString("en-IN")}
                  </p>
                </div>
                <p className="text-sm text-stone-600">{enquiry.email}</p>
                {enquiry.phone && (
                  <p className="text-sm text-stone-600">{enquiry.phone}</p>
                )}
                <p className="text-sm text-stone-500 bg-stone-50 rounded-lg p-3 mt-1">
                  {enquiry.message}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Desktop — table */}
        <div className="hidden md:block bg-white rounded-xl border border-stone-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-stone-50 border-b border-stone-100">
              <tr>
                <th className="text-left px-6 py-3 text-stone-500 font-medium">Name</th>
                <th className="text-left px-6 py-3 text-stone-500 font-medium">Email</th>
                <th className="text-left px-6 py-3 text-stone-500 font-medium">Phone</th>
                <th className="text-left px-6 py-3 text-stone-500 font-medium">Message</th>
                <th className="text-left px-6 py-3 text-stone-500 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {enquiries?.map((enquiry) => (
                <tr key={enquiry.id} className="border-b border-stone-50 hover:bg-stone-50">
                  <td className="px-6 py-4 font-medium text-stone-800">{enquiry.name}</td>
                  <td className="px-6 py-4 text-stone-600">{enquiry.email}</td>
                  <td className="px-6 py-4 text-stone-600">{enquiry.phone || "—"}</td>
                  <td className="px-6 py-4 text-stone-500 max-w-xs truncate">{enquiry.message}</td>
                  <td className="px-6 py-4 text-stone-400">
                    {new Date(enquiry.created_at).toLocaleDateString("en-IN")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {enquiries?.length === 0 && (
            <div className="text-center py-12 text-stone-400">
              No enquiries yet.
            </div>
          )}
        </div>

      </div>
    </main>
  )
}