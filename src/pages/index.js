//import { getSession } from "next-auth/react";
import Head from "next/head";
import Banner from "../components/Banner";
import Header from "../components/Header";
import ProductFeed from "../components/ProductFeed";

export default function Home({products}) {
  return (
    <div className="bg-gray-100">
      <Head>
        <title>Amazon 2.0</title>
      </Head>
      {/* Header */}
      <Header />
      <main className="max-w-screen2xl mx-auto">
        {/* Bannerr */}
        <Banner />
        {/* Product feed */}
        <ProductFeed/>
      </main>
      {/*  */}
    </div>
  );
}

//Indica que no es una pagina estatica
//export async function getServerSideProps(context) {
//  const session = await getSession(context);
//  const products = await fetch("https://fakestoreapi.com/products").then(
//    (res) => res.json()
//  );

//  return {
//    props: {
//      products: products,
//      session
//    },
//  };
//}
//GEt tp https://fakestoreapi.com/products
