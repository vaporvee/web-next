import { Link } from "@/sanity/sanity.types";

export interface NavbarEntryWithSublinks {
    text?: string;
    link?: Link;
    sublinks: NavbarEntry[];
}

export interface NavbarEntry {
    text?: string;
    link?: Link;
}