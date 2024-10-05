export const description =
  "An application shell with a header and main content area. The header has a navbar, a search input and and a user nav dropdown. The user nav is toggled by a button with an avatar image.";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { OrganizationCard } from "./organization-card";
import UserCard from "./user-card";

export default async function DashboardPage() {
  const [session, activeSessions] = await Promise.all([
    auth.api.getSession({
      headers: headers(),
    }),
    auth.api.listSessions({
      headers: headers(),
    }),
  ]).catch(() => {
    throw redirect("/sign-in");
  });
  return (
    <div className="w-full">
      <div className="flex gap-4 flex-col">
        <UserCard
          session={JSON.parse(JSON.stringify(session))}
          activeSessions={JSON.parse(JSON.stringify(activeSessions))}
        />
        <OrganizationCard session={JSON.parse(JSON.stringify(session))} />
      </div>
    </div>
  );
}
