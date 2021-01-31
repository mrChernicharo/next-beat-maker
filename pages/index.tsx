import Head from "next/head";
import { Children } from "react";
import { AppHeader } from "../styles/Header";
import Controls from "./components/Controls";
import SEO from "./components/SEO";

export default function Home() {
  return (
    <>
      <SEO />
      <AppHeader>Next Beat Maker</AppHeader>
      <main>
        <Controls />
      </main>
    </>
  );
}
