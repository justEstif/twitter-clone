"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export function AuthButton() {
  const supabase = createClientComponentClient({});
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
  };

  return (
    <>
      <button onClick={handleSignIn} className="btn btn-primary">
        Sign in
      </button>
      <button onClick={handleSignOut} className="btn btn-secondary">
        Sign out
      </button>
    </>
  );
}
