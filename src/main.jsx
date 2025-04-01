
'use client';

import { Pencil, Code, Type } from 'lucide-react';
// import Image from 'next/image';

import FAQAccordion from './components/accordian/faqAccordian';
import Navbar from './components/navbar';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Textarea } from './components/ui/textarea';
import { ThemeToggle } from './components/shared/themeToggle';

const leftNavItems = [
  { label: 'Home', link: '/' },
  { label: 'About', link: '/' },
  { label: 'Contact', link: '/' },
];

const rightNavItems = [
  { label: 'Login', link: '/auth/login', isButton: true },
  { label: 'Register', link: '/auth/sign-up/freelancer', isButton: true },
];

const HomePage = () => {
  return (
    <>
      <div className="fixed right-10 bottom-10">
        <ThemeToggle />
      </div>
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <Navbar items={leftNavItems} />
          <div className="ml-auto flex items-center space-x-4">
            <Navbar items={rightNavItems} />
          </div>
        </div>
      </div>
      <div className="bg-black text-white">
        <section className="px-4 py-20 md:px-6 lg:py-32 min-h-screen">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="sm:text-5xl md:text-6xl">
              Unlock Your Freelancing Potential
            </h1>
            <p className="mt-4 text-white md:text-xl">
              Discover a world of opportunities and connect with talented
              freelancers to bring your projects to life.
            </p>
            <Button className="mt-8 px-8 py-3 rounded-md text-lg font-medium bg-white text-black">
              Get Started
            </Button>
          </div>
        </section>
        <section className="px-4 pt-20 md:px-6">
          <FAQAccordion />
        </section>
        <section className="px-4 py-20 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className=" sm:text-3xl">Get in Touch</h2>
            <p className="mt-4 text-white md:text-xl">
              Have a project in mind? Let&apos;s discuss how we can help.
            </p>
            <form className="mt-8 space-y-4 text-left">
              <div>
                <label className="block text-base font-medium text-white" htmlFor="name">
                  Name
                </label>
                <Input className="mt-2 w-full rounded-md bg-[#1a1a1a] px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#00ffff]" id="name" placeholder="Enter your name" type="text" />
              </div>
              <div>
                <label className="block text-base font-medium text-white" htmlFor="email">
                  Email
                </label>
                <Input className="mt-2 w-full rounded-md bg-[#1a1a1a] px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#00ffff]" id="email" placeholder="Enter your email" type="email" />
              </div>
              <div>
                <label className="block text-base font-medium text-white" htmlFor="message">
                  Message
                </label>
                <Textarea className="mt-2 w-full rounded-md bg-[#1a1a1a] px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#00ffff]" id="message" placeholder="Enter your message" />
              </div>
              <Button type="submit" className="bg-white text-black px-8 py-3 rounded-md text-lg font-medium">
                Send Message
              </Button>
            </form>
          </div>
        </section>
      </div>
    </>
  );
};

export default HomePage;

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
