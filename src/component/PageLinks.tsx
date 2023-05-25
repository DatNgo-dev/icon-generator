import { useSession } from "next-auth/react";
import { PrimaryLink } from "./PrimaryLink";

export function PageLinks() {
  const session = useSession();
  const isLoggedIn = !!session.data;
  return (
    <>
      <li>
        <PrimaryLink href="/generate">Generate</PrimaryLink>
      </li>
      <li>
        <PrimaryLink href="/community">Community</PrimaryLink>
      </li>
      {isLoggedIn && (
        <li>
          <PrimaryLink href="/collection">Collection</PrimaryLink>
        </li>
      )}
    </>
  );
}
