import { AuthButton } from "@/components/molecules/auth-button";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function Home() {
  const supabase = createServerComponentClient({ cookies });
  const { data: tweets } = await supabase.from("tweets").select();

  return (
    <>
      <AuthButton />
      <pre>{JSON.stringify(tweets)}</pre>
    </>
  );
}
