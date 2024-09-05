import BirthdayIcon from "@/icons/Birthday";
import ClockIcon from "@/icons/Clock";
import HomeIcon from "@/icons/HomeIcon";

// Datos para probar
const features = [
  {
    name: 'Mis Mascotas',
    features: ['3 Perros', '2 Gatos']
  },
  {
    name: 'Experiencia',
    features: ['Adiestramiento', 'Primeros auxilios', 'Nutricion']
  },
  {
    name: 'Intereses',
    features: ['Adopcion', 'Cuidado de mascotas', 'Fotografia de mascotas']
  },
  {
    name: 'Servicios',
    features: ['Paseo de perros', 'Cuidado temporal']
  }
]

export default function About() {
  return (
    <section className="space-y-6">
      <p>Amante de los animales 🐾 | Dueña orgullosa de 3 perros y 2 gatos 🐶🐱 | Voluntaria en refugio local 🏠</p>
      <div className="flex gap-x-4 border-b border-neutral-500 pb-3">
        <p className="flex items-end gap-x-2"><BirthdayIcon className="size-6" /> <span>21 de Mayo</span></p>
        <p className="flex items-end gap-x-2"><HomeIcon className="size-6" /> <span>Madrid, España</span></p>
        <p className="flex items-end gap-x-2"><ClockIcon className="size-6" /> <span>Miembro desde 2023</span></p>
      </div>
      <div className="grid grid-cols-2 gap-y-5 gap-x-10">
        {features.map(f => <FeaturesAbout key={f.name} {...f} />)}
      </div>
    </section>
  )
}

// De momento este componente esta aqui y no en un archivo por que puede que no se implemente
function FeaturesAbout({ name, features }: {
  name: string
  features: string[]
}) {
  return (
    <div>
      <h4 className="text-xl mb-3">{name}</h4>
      <ul className="flex gap-3">
        {features.map((f, i) => <li key={f} className="rounded-full py-1 px-2 text-xs bg-neutral-400/30">{f}</li>)}
      </ul>
    </div>
  )
}
