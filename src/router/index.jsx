import { useRoutes } from "react-router-dom";
import SideMenu from "../layouts/side-menu/Main";
import Login from "../views/auth/login/Main";
import Register from "../views/auth/register/Main";
import Dashboard from "../views/beranda/Main";
import ErrorPage from "../views/errors/Main";
import PointOfSale from "../views/pos/Main";

// PRODUCT
import RingkasanPenjualan from "../views/laporan/RingkasanPenjualan";
import ListBahanBaku from "../views/produk/bahan-baku/List";
import ListBahanPendukung from "../views/produk/bahan-pendukung/List";
import ListKategori from "../views/produk/kategori/List";
import CreateProduk from "../views/produk/produk/Create/Index";
import ListProduk from "../views/produk/produk/List";

// USER
import UserList from "../views/user/List";

// LAPORAN
// import Diskon from "../views/laporan/Diskon";
// import Pajak from "../views/laporan/Pajak";
// import Pegawai from "../views/laporan/Pegawai";
// import Pelanggan from "../views/laporan/Pelanggan";
import PenjualanPerProduk from "../views/laporan/PenjualanPerProduk";
import PenjualanPerKategori from "../views/laporan/RingkasanPenjualan";

import RiwayatTransaksi from "../views/riwayat-transaksi/RiwayatTransaksi";

// INVENTARIS
import DaftarStok from "../views/inventaris/daftar-stok/List";
import CreateStokMasuk from "../views/inventaris/stok-masuk/Create";
import StokMasuk from "../views/inventaris/stok-masuk/List";
import CreateStokOpname from "../views/inventaris/stok-opname/Create";
import StokOpname from "../views/inventaris/stok-opname/List";

// MEJA
import ListMeja from "../views/meja/List";

// Pelanggan
import CustomerList from "../views/pelanggan/List";

// Printer
import ListPrinter from "../views/printer/List";


function Router() {
  const routes = [
    {
      path: "/",
      element: <SideMenu />,
      children: [
        // BERANDA
        {
          path: "/",
          element: <Dashboard />,
        },
        {
          path: "/beranda",
          element: <Dashboard />,
        },
        // USER
        {
          path: "/user",
          element: <UserList />,
        },
        // POINT OF SALES
        // {
        //   path: "pos",
        //   element: <PointOfSale />,
        // },
        // LAPORAN
        {
          path: "laporan/ringkasan-penjualan",
          element: <RingkasanPenjualan />,
        },
        {
          path: "/laporan/penjualan-perproduk",
          element: <PenjualanPerProduk />,
        },
        {
          path: "/laporan/penjualan-perkategori",
          element: <PenjualanPerKategori />,
        },
        // {
        //   path: "/laporan/pajak",
        //   element: <Pajak />,
        // },
        // {
        //   path: "/laporan/pelanggan",
        //   element: <Pelanggan />,
        // },
        // {
        //   path: "/laporan/pegawai",
        //   element: <Pegawai />,
        // },
        // {
        //   path: "/laporan/diskon",
        //   element: <Diskon />,
        // },
        // RIWAYAT TRANSAKSI
        {
          path: "/riwayat-transaksi",
          element: <RiwayatTransaksi />,
        },
        // PRODUK
        {
          path: "/produk/produk",
          element: <ListProduk />,
        },
        {
          path: "/produk/produk/create",
          element: <CreateProduk />,
        },
        {
          path: "/produk/kategori",
          element: <ListKategori />,
        },
        {
          path: "/produk/bahan-baku",
          element: <ListBahanBaku />,
        },
        {
          path: "/produk/bahan-pendukung",
          element: <ListBahanPendukung />,
        },
        // INVENTARIS
        {
          path: "/inventori/stok-opname",
          element: <StokOpname />,
        },
        {
          path: "/inventori/stok-opname/create",
          element: <CreateStokOpname />,
        },

        {
          path: "/inventori/daftar-stok",
          element: <DaftarStok />,
        },
        

        {
          path: "/inventori/stok-masuk",
          element: <StokMasuk />,
        },
        
        {
          path: "/inventori/stok-masuk/create",
          element: <CreateStokMasuk />,
        },
        // MEJA
        {
          path: "/meja",
          element: <ListMeja />,
        },
        {
          path: "/meja/:id/pos",
          element: <PointOfSale />,
        },
        // PELANGGAN
        {
          path: "/pelanggan",
          element: <CustomerList />,
        },
        // PRINTER
        {
          path: "/printer",
          element: <ListPrinter />,
        },
      ],
    },
 
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/error-page",
      element: <ErrorPage />,
    },
    {
      path: "*",
      element: <ErrorPage />,
    },
  ];

  return useRoutes(routes);
}

export default Router;
