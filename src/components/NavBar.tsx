import Link from 'next/link'
import { useState } from 'react'
import { Url } from 'url'

type NavBtnProps = {
  text: string | undefined;
  href: string | Url;
  enabled?: boolean | false;
}

const NavBtn = (props: NavBtnProps) => {
  return (
    <Link
      className={"text-md border-b-2 border-b-transparent transition-all ease-linear hover:border-b-accent " + (props.enabled ? "" : "pointer-events-none text-neutral-400")}
      href={props.href}
    >
      {props.text}
    </Link>
  );
}

function NavBar() {
  return (
    <nav data-theme="dark" className="flex w-screen items-center space-x-4 absolute top-0 left-0 p-4 justify-center">
      <NavBtn enabled={true} text="Single-Turn" href="/single-turn"></NavBtn>
      <NavBtn enabled={false} text="Multi-Turn" href="/multi-turn"></NavBtn>
      <NavBtn enabled={false} text="Diffusion" href="/diffusion"></NavBtn>
    </nav>
  )
}

export default NavBar