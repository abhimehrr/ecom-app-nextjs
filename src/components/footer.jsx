"use client";

import {
  Facebook,
  Twitter,
  Instagram,
  Github,
  X,
  Linkedin,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Footer() {
  return (
    <footer className="bg-secondary/20 border-t-2 py-10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Company Info */}
        <div className="space-y-4">
          <div>
            <h4 className="text-lg font-semibold mb-4">eCom</h4>
            <p className="text-sm text-gray-400">
              Your one-stop solution for all your shopping needs. Discover the
              latest products with us.
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <p className="font-medium">Developer:</p>
              <Button
                asChild
                variant="link"
                className="hover:text-rose p-0 font-medium text-base"
              >
                <a target="_blank" href="https://abhi.shre.in">
                  Abhishek
                </a>
              </Button>
            </div>
            <div className="flex gap-4">
              <a
                target="_blank"
                href="https://github.com/abhimehrr"
                className="hover:text-gray-500"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                target="_blank"
                href="https://linkedin.com/in/AbhiMehrr"
                className="hover:text-blue-500"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                target="_blank"
                href="https://x.com/abhiijs"
                className="hover:text-blue-400"
              >
                <X className="w-5 h-5" />
              </a>
              <a
                target="_blank"
                href="https://instagram.com/abhii.js"
                className="hover:text-pink-500"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-gray-300">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300">
                Shop
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300">
                Contact
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300">
                FAQ
              </a>
            </li>
          </ul>
        </div>

        {/* Customer Support */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Customer Support</h4>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-gray-300">
                Returns
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300">
                Shipping
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300">
                Terms of Service
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter Signup */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Stay Connected</h4>
          <p className="text-sm text-gray-400 mb-4">
            Subscribe to our newsletter for the latest updates.
          </p>
          <div className="flex items-center space-x-2">
            <Input type="email" placeholder="Your email" />
            <Button type="button">Subscribe</Button>
          </div>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="hover:text-blue-500">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-blue-400">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-pink-500">
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800 mt-8 pt-4 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} eCom. All rights reserved.
      </div>
    </footer>
  );
}
