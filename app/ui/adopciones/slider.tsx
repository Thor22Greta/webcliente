import { FormattedAnimalesTable } from '@/app/lib/definitions';

export default function AdoptedAnimalsSlider({ animales }: { animales: FormattedAnimalesTable[] }) {
  return (
    <div className="mt-8">
      <h2 className="text-xl mb-4">Animales Adoptados</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {animales.map((animal) => (
          <div key={animal.id} className="bg-green-100 p-4 rounded-lg">
            <img
              src={animal.image_url}
              alt={animal.name}
              className="w-24 h-24 object-cover rounded-full mx-auto mb-4"
            />
            <p className="text-center font-semibold">{animal.name}</p>
            <p className="text-center text-sm text-green-500">Adoptado por {animal.adoptante_name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
