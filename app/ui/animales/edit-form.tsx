import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

interface Animal {
  id: string;
  name: string;
  raza: string;
  edad: number;
  adopted: boolean;
  adoptante_name: string;
}

export default function EditForm() {
  const router = useRouter();
  const { id } = router.query;
  const [animal, setAnimal] = useState<Animal | null>(null);

  // Simulando una base de datos de animales
  const animalesSimulados = [
    { id: '1', name: 'Fido', raza: 'Labrador', edad: 3, adopted: false, adoptante_name: '' },
    { id: '2', name: 'Milo', raza: 'Beagle', edad: 2, adopted: true, adoptante_name: 'Juan' },
  ];

  // Obtener el animal correspondiente por ID
  useEffect(() => {
    if (id) {
      const animalEncontrado = animalesSimulados.find((animal) => animal.id === id);
      if (animalEncontrado) {
        setAnimal(animalEncontrado);
      }
    }
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Datos del animal guardados:', animal);
    router.push('/dashboard/animales');
  };

  if (!animal) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h1>Editar Animal</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            value={animal.name}
            onChange={(e) => setAnimal({ ...animal, name: e.target.value })}
          />
        </div>
        <div>
          <label>Raza:</label>
          <input
            type="text"
            value={animal.raza}
            onChange={(e) => setAnimal({ ...animal, raza: e.target.value })}
          />
        </div>
        <div>
          <label>Edad:</label>
          <input
            type="number"
            value={animal.edad}
            onChange={(e) => setAnimal({ ...animal, edad: parseInt(e.target.value) })}
          />
        </div>
        <div>
          <label>Adoptado:</label>
          <input
            type="checkbox"
            checked={animal.adopted}
            onChange={() => setAnimal({ ...animal, adopted: !animal.adopted })}
          />
        </div>
        <div>
          <label>Adoptante:</label>
          <input
            type="text"
            value={animal.adoptante_name}
            onChange={(e) => setAnimal({ ...animal, adoptante_name: e.target.value })}
          />
        </div>
        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
}
