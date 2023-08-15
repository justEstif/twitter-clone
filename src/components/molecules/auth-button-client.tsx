"use client";

import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export function AuthButtonClient({ session }: { session: Session | null }) {
  const supabase = createClientComponentClient({});
  const router = useRouter();

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      // TODO need to be changed later
      options: {
        redirectTo: "http://localhost:3000/auth/callback",
      },
    });
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return session ? (
    <button onClick={handleSignOut} className="btn btn-ghost">
      Sign out
    </button>
  ) : (
    <button onClick={handleSignIn} className="btn btn-primary">
      Sign in
    </button>
  );
}
