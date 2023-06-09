import clsx from "clsx";
import { Spinner } from "./Spinner";

export function Button(
  props: React.ComponentPropsWithoutRef<"button"> & {
    variant?: "primary" | "secondary";
    isLoading?: boolean;
    styles?: string;
  }
) {
  const colour =
    (props.variant ?? "primary") === "primary"
      ? "bg-blue-400 hover:bg-blue-500"
      : "bg-gray-400 hover:bg-gray-500";

  const styles = props.styles;

  return (
    <button
      {...props}
      className={clsx(
        "flex items-center justify-center rounded px-4 py-2 text-center disabled:bg-gray-600",
        colour
      )}
    >
      {props.isLoading && <Spinner />}
      {!props.isLoading && props.children}
    </button>
  );
}
