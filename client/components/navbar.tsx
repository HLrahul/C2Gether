import React from "react";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { ThemeSwitch } from "./theme-switch";
import JoinRoom from "@/components/JoinRoom";

export default function NavBar() {
  return (
    <Navbar shouldHideOnScroll className="m-auto">
      <NavbarBrand>
        <p className="font-bold text-inherit">CollabStudy</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
      </NavbarContent>
      <NavbarContent justify="end">
        <ThemeSwitch />

        <NavbarItem>
          <JoinRoom />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
