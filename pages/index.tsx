import Head from "next/head";
import React, { Children } from "react";
import { AppHeader } from "../styles/AppHeader";
import { BeatMaker } from "./components/BeatMaker";
import Header from "./components/Header";
import SEO from "./components/SEO";

export default function Home() {
  return (
    <>
      <SEO />
      <Header />
      <main>
        <BeatMaker />
      </main>
    </>
  );
}
