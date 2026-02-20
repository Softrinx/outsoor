import { getUsers } from "@/app/actions/admin"
import { AdminUsersTable } from "@/components/admin-users-table"

export default async function AdminUsersPage() {
  const users = await getUsers()

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-white">Users</h1>
      <AdminUsersTable users={users} />
    </div>
  )
}
