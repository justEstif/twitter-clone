import { AuthButtonServer } from "@/components/molecules/auth-button-server";

export async function NavBar() {
  return (
    <div className="py-6 navbar bg-base-100">
      <div className="flex-1">
        <h1 className="text-xl normal-case">Twitter</h1>
      </div>
      <div className="flex-none gap-2">
        <AuthButtonServer />
      </div>
    </div>
  );
}
