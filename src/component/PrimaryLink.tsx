import Link, { type LinkProps } from "next/link";
import { type ReactNode } from "react";

export function PrimaryLink(props: LinkProps & { children: ReactNode }) {
  return (
    <Link {...props} className="hover:text-cyan-500">
      {props.children}
    </Link>
  );
}
