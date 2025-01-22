export function Gallery({
  images,
}: {
  images: { url: string; caption: string }[];
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 items-stretch justify-center">
      {images.map((image) => (
        <div
          key={image.url}
          className="flex flex-col items-center justify-around"
        >
          <img src={image.url} alt={image.caption} className="w-full m-0" />
          <p className="text-center">{image.caption}</p>
        </div>
      ))}
    </div>
  );
}
