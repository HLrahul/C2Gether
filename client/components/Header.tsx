import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { PanelRightOpen } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { ThemeSwitch } from "./theme-switch";
import RightPanel from "./RightPanel";

export default function Header() {
  return (
    <Navbar shouldHideOnScroll>
      <NavbarBrand>
        <p className="font-bold text-primary">C2Gather</p>
      </NavbarBrand>
      <NavbarContent justify="end">
        <ThemeSwitch />
        <NavbarItem>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" isIconOnly aria-label="Open right panel">
                <PanelRightOpen size={20} />
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[17rem]">
              <RightPanel />
            </SheetContent>
          </Sheet>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
