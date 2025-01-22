export function SpoilerBlock({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  // rgb(89, 115, 255) #5973FF
  return (
    <details className="bg-indigo-500/10 p-4 rounded-md border-indigo-500/20 border-2 my-4">
      <summary className="text-lg font-bold cursor-pointer">{title}</summary>
      {children}
    </details>
  );
}
