import React from "react";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
} from "@nextui-org/react";
import { ThemeSwitch } from "./theme-switch";

export default function NavBar() {
  return (
    <Navbar shouldHideOnScroll className="m-auto">
      <NavbarBrand>
        <p className="font-bold text-inherit text-primary">CollabStudy</p>
      </NavbarBrand>
      <NavbarContent justify="end">
        <ThemeSwitch />
      </NavbarContent>
    </Navbar>
  );
}
