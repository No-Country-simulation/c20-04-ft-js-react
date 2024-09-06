import ThemeSwitcher from "@/components/shared/ThemeSwitcher";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Settings",
};

export default function Settings() {
  return (
    <main>
      <ThemeSwitcher />
    </main>
  )
}