"use client";
import { React, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Menu,
  MenuButton,
  TransitionChild,
} from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import { navigation } from "../constants/index.js";
import { classNames } from "../constants/index.js";
import { usePathname } from "next/navigation";
const MobileNav = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  return (
    <div>
      <Dialog
        open={sidebarOpen}
        onClose={setSidebarOpen}
        className="relative z-50 lg:hidden"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 flex">
          <DialogPanel
            transition
            className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
          >
            <TransitionChild>
              <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                <button
                  type="button"
                  onClick={() => setSidebarOpen(false)}
                  className="-m-2.5 p-2.5"
                >
                  <span className="sr-only">Close sidebar</span>
                  <XMarkIcon aria-hidden="true" className="size-6 text-white" />
                </button>
              </div>
            </TransitionChild>
            {/* Sidebar component, swap this element with another sidebar if you like */}
            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
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
          </DialogPanel>
        </div>
      </Dialog>

      <div className="lg:pl-72">
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>

          {/* Separator */}
          <div className="  w-full flex flex-1 gap-x-4 self-stretch ">
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              {/* Separator */}
              <div
                aria-hidden="true"
                className=" block lg:h-6 lg:w-px lg:bg-gray-200"
              />

              {/* Profile dropdown */}
              <Menu as="div" className="relative">
                <MenuButton className="-m-1.5 flex items-center p-1.5">
                  <span className="sr-only">Open user menu</span>
                  <img
                    alt="Your Company"
                    src="/images/sayf.jpg"
                    className="h-8 w-auto rounded-[50%]"
                  />
                  <span className="flex lg:items-center">
                    <span
                      aria-hidden="true"
                      className="ml-4 text-sm/6  text-gray-900"
                    >
                      Sayf Network Admin Dashbaord
                    </span>
                  </span>
                </MenuButton>
              </Menu>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
