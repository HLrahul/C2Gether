import React from "react";
import { ThemeSwitch } from "./theme-switch";
import { Image, Navbar, NavbarBrand, NavbarContent } from "@nextui-org/react";

export default function NavBar() {
  return (
    <Navbar shouldHideOnScroll>
      <NavbarBrand className="flex gap-2">
        <Image src="/C2G-text.png" alt="C2Gather" className="h-8 w-auto" />
        <p className="font-bold text-inherit text-primary">
          C<span className="text-foreground">2</span>Gather
        </p>
      </NavbarBrand>
      <NavbarContent justify="end">
        <ThemeSwitch />
      </NavbarContent>
    </Navbar>
  );
}
