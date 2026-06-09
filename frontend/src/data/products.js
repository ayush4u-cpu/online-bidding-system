import iphoneImg from "../assets/iphone.jpeg";
import rolexImg from "../assets/rolex.png";
import ps6Img from "../assets/ps6.png";
import teslaImg from "../assets/tesla.png";
import macbookImg from "../assets/macbook.png";

import productsData from "./products.json";

// Map image filenames to imported references
const imageMap = {
  "iphone.jpeg": iphoneImg,
  "rolex.png": rolexImg,
  "ps6.png": ps6Img,
  "tesla.png": teslaImg,
  "macbook.png": macbookImg
};

export const initialProducts = productsData.products.map(item => ({
  ...item,
  imageSrc: imageMap[item.image]
}));

export const initialDeliveries = productsData.deliveries;

export const initialWallets = productsData.wallets;
