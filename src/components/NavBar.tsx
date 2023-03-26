import Link from 'next/link'
import { Url } from 'url'
import Branding from './Logo';
import MyPersona, { MyPersonaNarrow } from './Persona';
import { Menu, MenuTrigger, MenuPopover, MenuList, MenuItem } from '@fluentui/react-components';

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
      <div className='w-18 flex justify-start'>
        <Branding></Branding>
      </div>
      <div className='flex space-x-3'>
        <NavBtn enabled={true} text="Single-Turn" href="/single-turn"></NavBtn>
        <NavBtn enabled={true} text="Multi-Turn" href="/multi-turn"></NavBtn>
        <NavBtn enabled={true} text="Diffusion" href="/diffusion"></NavBtn>
      </div>
      {/* <div className='hidden md:flex w-48 justify-end'>
        <MyPersona></MyPersona>
      </div> */}
      <div className='md:w-18 flex justify-end'>
        <MyPersonaNarrow></MyPersonaNarrow>
      </div>
    </nav>
  )
}

function NavBarNarrow() {
  return (
    <Menu>
      <MenuTrigger disableButtonEnhancement>
        <button>
          <svg viewBox="0 0 100 50" width="40" height="40">
            <rect width="64" height="2"></rect>
            <rect y="15" width="64" height="2"></rect>
            <rect y="30" width="64" height="2"></rect>
          </svg>
        </button>
      </MenuTrigger>

      <MenuPopover>
        <MenuList>
          <MenuItem>
            <NavBtn text="Single-Turn" href="/single-turn"></NavBtn>
          </MenuItem>
          <MenuItem>
            <NavBtn text="Multi-Turn" href="/multi-turn"></NavBtn>
          </MenuItem>
          <MenuItem>
            <NavBtn text="Diffusion" href="/diffusion"></NavBtn>
          </MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>
  );
}

export default NavBar
export { NavBarNarrow }