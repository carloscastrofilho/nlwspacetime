import Image from 'next/image'
import nlwlogo from '../assets/nlw-spacetime-logo.svg'

export function Hero() {
  return (
    <div className="space-y-5">
      <Image src={nlwlogo} alt="Logo NWL Spacetime" />
      <div className="max-w-[420px] space-y-3">
        <h1 className="text-5xl font-bold leading-3 text-gray-50">
          Sua cápsula do tempo
        </h1>
        <p className="text-lg leading-relaxed">
          Colecione momentos marcantes da sua jornada e compartilhe (se quiser)
          com o mundo!
        </p>
        <a
          className="font-all inline-block rounded-full bg-green-500 px-5 py-3 text-sm font-bold uppercase leading-none text-black hover:bg-green-600"
          href=""
        >
          CADASTRAR LEMBRANÇA
        </a>
      </div>
    </div>
  )
}
