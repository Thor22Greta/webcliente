import Image from 'next/image';

export default function AvaLogo() {
  return (
    <div className="relative w-full h-full">
      <Image
        src="/images/logoverde.jpg"
        alt="Logo AVA"
        fill
        className="object-contain" 
      />
    </div>
  );
}