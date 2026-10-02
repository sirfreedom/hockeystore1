import AdminLayout from "@/components/admin/AdminLayout";

export const metadata = {
    title: "HockeyStore. - Admin",
    description: "HockeyStore. - Admin",
};

export default function RootAdminLayout({ children }) {

    return (
        <>
            <AdminLayout>
                {children}
            </AdminLayout>
        </>
    );
}
