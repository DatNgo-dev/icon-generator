import clsx from "clsx";
import Link, { type LinkProps } from "next/link";
import { type ReactNode } from "react";

export function PrimaryLinkButtonStyle(
  props: LinkProps & { children: ReactNode; className?: string }
) {
  const { className, ...propsWithoutClassName } = props;
  return (
    <Link
      className={clsx(
        "rounded bg-blue-400 px-4 py-2 hover:text-cyan-500",
        className ?? ""
      )}
      {...propsWithoutClassName}
    >
      {props.children}
    </Link>
  );
}
