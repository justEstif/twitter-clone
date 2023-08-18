import { User, createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Image from "next/image";

export async function NewTweet({ user }: { user: User }) {
  const addTweet = async (formData: FormData) => {
    "use server";
    const title = String(formData.get("title"));
    const supabaseActions = createServerActionClient<Database>({ cookies });
    await supabaseActions.from("tweets").insert({ title, user_id: user.id });
  };

  return (
    <div className="grid grid-cols-4 grid-rows-3 gap-4">
      <div className="overflow-hidden relative w-24 rounded-full">
        <Image
          alt="profile pic"
          src={user.user_metadata.avatar_url || "/next.svg"}
          fill={true}
          objectFit="contain"
        />
      </div>

      <div className="col-span-3 row-span-4">
        <form action={addTweet}>
          <textarea
            name="title"
            placeholder="What's happening?"
            className="w-full max-w-lg textarea bg-base-200"
          />

          <div className="flex justify-end">
            <button className="btn btn-ghost">Tweet</button>
          </div>
        </form>
      </div>
    </div>
  );
}
