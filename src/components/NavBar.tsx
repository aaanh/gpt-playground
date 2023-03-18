import Link from 'next/link'
import { Url } from 'url'
import Branding from './Logo';
import MyPersona, { MyPersonaNarrow } from './Persona';

type NavBtnProps = {
  text: string | undefined;
  href: string | Url;
  enabled?: boolean | false;
}

const NavBtn = (props: NavBtnProps) => {
  return (
    <Link
      className={"text-md text-white border-b-2 border-b-transparent transition-all ease-linear hover:border-b-white " + (props.enabled ? "" : "pointer-events-none text-neutral-500")}
      href={props.href}
    >
      {props.text}
    </Link>
  );
}

function NavBar() {
  return (
    <nav className="bg-neutral-900 flex items-center space-x-4 absolute top-0 left-0 p-4 justify-between w-full">
      <Branding></Branding>
      <div className='flex space-x-4'>
        <NavBtn enabled={true} text="Single-Turn" href="/single-turn"></NavBtn>
        <NavBtn enabled={false} text="Multi-Turn" href="/multi-turn"></NavBtn>
        <NavBtn enabled={false} text="Diffusion" href="/diffusion"></NavBtn>
      </div>
      <div className='hidden md:flex'>
        <MyPersona></MyPersona>
      </div>
      <div className='flex md:hidden'>
        <MyPersonaNarrow></MyPersonaNarrow>
      </div>
    </nav>
  )
}

export default NavBar