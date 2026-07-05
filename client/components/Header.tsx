import { Navbar, NavbarBrand, NavbarContent } from '@nextui-org/react';

import { ThemeSwitch } from './theme-switch';

export default function Header() {
  return (
    <Navbar shouldHideOnScroll>
      <NavbarBrand>
        <p className="font-bold text-primary">C2Gather</p>
      </NavbarBrand>
      <NavbarContent justify="end">
        <ThemeSwitch />
      </NavbarContent>
    </Navbar>
  );
}
