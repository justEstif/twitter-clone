import { AuthButtonServer } from "@/components/molecules/auth-button-server";
import { Likes } from "@/components/molecules/likes";
import { NewTweet } from "@/components/molecules/new-tweet";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  const { data } = await supabase
    .from("tweets")
    .select("*, profiles(*), likes(*)");
  const tweets =
    data?.map((tweet) => ({
      ...tweet,
      user_has_liked_tweet: !!tweet.likes.find(
        (like) => like.user_id === session.user.id,
      ),
      likes: tweet.likes.length,
    })) ?? [];
  return (
    <div>
      <AuthButtonServer />
      <NewTweet />
      {tweets?.map((tweet) => (
        <div key={tweet.id}>
          <p>
            {tweet?.profiles?.name} {tweet?.profiles?.username}
          </p>
          <p>{tweet?.title}</p>
          <Likes tweet={tweet} />
        </div>
      ))}
      <pre>{JSON.stringify(tweets, null, 2)}</pre>
    </div>
  );
}
