import { AuthButtonClient } from "@/components/molecules/auth-button-client";
import { AuthButtonServer } from "@/components/molecules/auth-button-server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function Home() {
  const supabase = createServerComponentClient({ cookies });
  const { data: tweets } = await supabase.from("tweets").select();

  return (
    <div>
      <AuthButtonServer />
      <pre>{JSON.stringify(tweets, null, 2)}</pre>
    </div>
  );
}
