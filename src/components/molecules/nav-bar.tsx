import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Image from "next/image";

export async function NavBar() {
  const supabase = createServerComponentClient<Database>({ cookies: cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const current_user = {
    avatar_url: "/next.svg",
  };

  if (user) {
    const { data } = await supabase
      .from("profiles")
      .select()
      .limit(1)
      .eq("id", user?.id)
      .single();
    if (data) {
      current_user.avatar_url = data.avatar_url;
    }
  }

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="text-xl normal-case btn btn-ghost">Twitter</a>
      </div>
      <div className="flex-none gap-2">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="overflow-hidden relative w-10 rounded-full">
              <Image
                alt="profile pic"
                src={current_user.avatar_url}
                fill={true}
                objectFit="contain"
              />
            </div>

            {/* <div className="w-10 rounded-full"> */}
            {/*   <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" /> */}
            {/* </div> */}
          </label>
          <ul
            tabIndex={0}
            className="p-2 mt-3 w-52 shadow z-[1] menu menu-sm dropdown-content bg-base-100 rounded-box"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
