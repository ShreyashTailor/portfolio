import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminPanel from "@/components/admin-panel";

export default async function AdminPage() {
    const cookieStore = await cookies();
    const session = cookieStore.get("admin_session");

    if (session?.value !== "true") {
        redirect("/login");
    }

    return <AdminPanel />;
}
