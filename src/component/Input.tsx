// We are using React.ComponentPropsWithoutRef to remove the ref prop from the input element.
export function Input(props: React.ComponentPropsWithoutRef<"input">) {
  return (
    <input
      {...props}
      type="text"
      className="border border-gray-800 px-4 py-2 dark:text-gray-800"
    />
  );
}
