import { signIn, signOut, useSession } from "next-auth/react";
import { useBuyCredits } from "~/hooks/useBuyCredits";
import { api } from "~/utils/api";
import { Button } from "./Button";
import { PrimaryLink } from "./PrimaryLink";
import { Dropdown } from "./Dropdown";

export function Header() {
  const session = useSession();
  const { buyCredits } = useBuyCredits();
  const isLoggedIn = !!session.data;

  const credits = api.user.getCredits.useQuery(undefined, {
    enabled: isLoggedIn,
  });

  return (
    <header className="dark:bg-gray-900">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <PrimaryLink href="/">Icon Generator</PrimaryLink>
        <div className="relative md:hidden">
          <Dropdown />
        </div>
        <ul className="hidden gap-4 md:flex">
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
        </ul>
        <ul className="hidden gap-4 md:flex">
          {isLoggedIn && (
            <>
              <div className="flex items-center">Credits: {credits.data}</div>
              <li>
                <Button
                  onClick={() => {
                    buyCredits().catch(console.error);
                  }}
                  styles="md:"
                >
                  Buy Credits
                </Button>
              </li>
              <li>
                <Button
                  variant="secondary"
                  onClick={() => {
                    signOut().catch(console.error);
                  }}
                >
                  Logout
                </Button>
              </li>
            </>
          )}
          {!isLoggedIn && (
            <li>
              <Button
                onClick={() => {
                  signIn().catch(console.error);
                }}
              >
                Login
              </Button>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
}
