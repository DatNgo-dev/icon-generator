import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "./Button";
import { useBuyCredits } from "~/hooks/useBuyCredits";

export function AuthenticationButtons() {
  const { buyCredits } = useBuyCredits();
  const session = useSession();
  const isLoggedIn = !!session.data;
  return (
    <>
      {isLoggedIn && (
        <>
          {/* <div className="flex items-center">
            Credits remaining {credits.data}
          </div> */}
          <li>
            <Button
              onClick={() => {
                buyCredits().catch(console.error);
              }}
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
    </>
  );
}
