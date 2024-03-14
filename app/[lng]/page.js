import Image from "next/image";
import { useTranslation } from "../i18n";
import Nature from "./projets/carousels/nature"

export default async function Home({ params: { lng } }) {

  const { t } = await useTranslation(lng, "homepage")
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
      <h1>{t('title')}</h1>
      </div>
      <Nature />
    </main>
  );
}
