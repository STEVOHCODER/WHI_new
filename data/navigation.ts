import type { NavigationItem } from "@/types";

export const navigation: NavigationItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About Us",
    href: "/who-we-are",
    children: [
      { label: "Who We Are", href: "/who-we-are" },
      { label: "Our Impact", href: "/impact" },
      { label: "Meet the Team", href: "/team" },
      { label: "Work With Us", href: "/work-with-us" },
    ],
  },
  {
    label: "Programs",
    href: "/programs",
    children: [
      {
        label: "Health & Social Empowerment",
        href: "/programs/health-social-empowerment",
      },
      {
        label: "Gender Empowerment",
        href: "/programs/gender-empowerment",
      },
      {
        label: "Human Rights",
        href: "/programs/human-rights",
      },
      {
        label: "Health Research",
        href: "/programs/health-research",
      },
    ],
  },
  { label: "Gallery", href: "/blog" },
  { label: "Projects", href: "/projects" },
  { label: "Contact Us", href: "/contact" },
];
