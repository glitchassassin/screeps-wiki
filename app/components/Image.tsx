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
    <figure style={{ float, clear: float }} className="w-1/5 mx-4 my-4">
      <a href={src} target="_blank">
        <img src={src} alt={alt} className="m-0" />
      </a>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
