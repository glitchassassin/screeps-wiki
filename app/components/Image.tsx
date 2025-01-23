import clsx from "clsx";

export function Image({
  src,
  caption,
  alt,
  float,
}: {
  src: string;
  caption?: string;
  alt?: string;
  float?: "right" | "left";
}) {
  return (
    <figure
      className={clsx(
        "w-full sm:w-1/5 sm:mx-4 my-4",
        float === "left" && "sm:float-left sm:clear-left",
        float === "right" && "sm:float-right sm:clear-right"
      )}
    >
      <a href={src} target="_blank">
        <img src={src} alt={alt} className="m-0 w-full" />
      </a>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
