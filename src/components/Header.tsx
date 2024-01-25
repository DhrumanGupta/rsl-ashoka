"use client";

import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { usePathname } from "next/navigation";
import LogoImage from "@/../public/logo.png";
import Image from "next/image";

const LINKS = [
  { name: "Home", href: "/" },
  { name: "Timeline", href: "/timeline" },
  { name: "Game Schedule", href: "/schedule" },
  { name: "Teams", href: "/teams" },
  { name: "Players", href: "/players" },
  { name: "Live Auction", href: "/auction" },
];

const Logo = () => (
  <span className="relative w-20 h-20">
    <Image
      fill={true}
      // placeholder="blur"
      src={LogoImage}
      alt={"RSL Logo"}
      className="object-contain"
    />
  </span>
);

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Navbar
      position="sticky"
      className="h-20"
      maxWidth="xl"
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <Link href="/" color="foreground" className="sm:block hidden">
          <NavbarBrand>
            <Logo />
          </NavbarBrand>
        </Link>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-8" justify="center">
        {LINKS.map((link) => (
          <NavbarItem key={link.href}>
            <Link
              color={pathname === link.href ? "secondary" : "foreground"}
              className="font-medium"
              href={link.href}
            >
              {link.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent className="flex sm:hidden gap-4" justify="center">
        {/* {LINKS.map((link) => (
          <NavbarItem key={link.href}>
            <Link
              color={pathname === link.href ? "primary" : "foreground"}
              className="font-medium"
              // color="foreground"
              href={link.href}
            >
              {link.name}
            </Link>
          </NavbarItem>
        ))} */}
        <Link href="/" color="foreground" className="block sm:hidden">
          <NavbarBrand>
            {/* <AcmeLogo /> */}
            <Logo />

            {/* <p className="font-bold text-inherit">LOGO</p> */}
          </NavbarBrand>
        </Link>
      </NavbarContent>

      <NavbarContent justify="end">
        {/* <NavbarItem className="hidden lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem> */}
      </NavbarContent>
      <NavbarMenu className="mt-2 from-black   to-black/40 bg-gradient-to-b">
        {LINKS.map((link, index) => (
          <NavbarMenuItem key={link.href}>
            <Link
              // color={
              //   index === 2
              //     ? "primary"
              //     : index === menuItems.length - 1
              //     ? "danger"
              //     : "foreground"
              // }
              color={pathname === link.href ? "secondary" : "foreground"}
              className="w-full my-2"
              href={link.href}
              size="lg"
            >
              {link.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
