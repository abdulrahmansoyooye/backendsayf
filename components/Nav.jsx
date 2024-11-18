"use client";

import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
} from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  CalendarIcon,
  ChartPieIcon,
  Cog6ToothIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import { navigation } from "../constants/index.js";
import { classNames } from "../constants/index.js";

import { usePathname } from "next/navigation";
export default function Nav() {
  const pathname = usePathname();
  return (
    <>
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
          <div className="flex h-16 shrink-0 items-center">
            <img
              alt="Your Company"
              src="/images/sayf.jpg"
              className="h-8 w-auto rounded-[50%]"
            />
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className={classNames(
                          item.href == pathname
                            ? "bg-gray-50 text-primary-color"
                            : "text-gray-700 hover:bg-gray-50 hover:text-primary-color",
                          "group flex gap-x-3 rounded-md p-2 text-sm/6 "
                        )}
                      >
                        <item.icon
                          aria-hidden="true"
                          className={classNames(
                            item.href == pathname
                              ? "text-primary-color"
                              : "text-gray-400 group-hover:text-primary-color",
                            "size-6 shrink-0"
                          )}
                        />
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>
     
    </>
  );
}
