import { Accordion } from "@/components/ui/accordion";
import Image from "next/image";
import Link from "next/link";
import ButtonAuth from '@/components/button'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ButtonAuth />
    </main>
  );
}
