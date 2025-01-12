import Image from "next/image";

function Page() {
  return (
    <div>
      <Image
        src="/Dirty-Angels.jpg"
        alt="image"
        fill
        className="min-h-[46.875vw] object-cover"
      />
    </div>
  );
}

export default Page;
