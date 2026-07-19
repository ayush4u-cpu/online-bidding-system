import iphoneImg from "../assets/iphone.jpeg";
import rolexImg from "../assets/rolex.png";
import ps6Img from "../assets/ps6.png";
import teslaImg from "../assets/tesla.png";
import macbookImg from "../assets/macbook.png";

const imageMap = {
  "iphone.jpeg": iphoneImg,
  "rolex.png": rolexImg,
  "ps6.png": ps6Img,
  "tesla.png": teslaImg,
  "macbook.png": macbookImg
};

const defaultAuctions = [
  {
    id: "iphone_17",
    name: "iPhone 17 Pro",
    category: "Electronics",
    basePrice: 70000,
    currentBid: 85250,
    description: "The iPhone 17 Pro pushes the boundaries of what is possible on a smartphone. Featuring a next-generation A19 Bionic chip, an exceptional new Center Stage front camera, and a titanium alloy frame. The advanced triple-lens camera system delivers unmatched low-light performance and cinematic recording.",
    features: [
      "A19 Bionic Chip (3nm architecture)",
      "6.7-inch Super Retina XDR OLED Display (120Hz)",
      "Triple-lens 48MP Pro Camera System",
      "Center Stage 24MP Front Camera",
      "Titanium Alloy Design with Ceramic Shield"
    ],
    image: "iphone.jpeg",
    endTime: "2026-08-30T22:00",
    status: "ACTIVE",
    seller: "Apple Authorized Store"
  },
  {
    id: "rolex_watch",
    name: "Vintage Rolex Submariner",
    category: "Fashion",
    basePrice: 450000,
    currentBid: 510000,
    description: "An exquisite vintage Rolex Submariner reference 16610. Known for its rugged reliability and classic style, this legendary dive watch features a black dial, Oyster steel bracelet, and unidirectional rotating bezel. Kept in pristine collector condition.",
    features: [
      "Oystersteel bracelet and case",
      "Calibre 3135 Automatic Movement",
      "Waterproof up to 300 meters (1000 feet)",
      "Pristine condition with original box & papers",
      "Unidirectional rotatable bezel"
    ],
    image: "rolex.png",
    endTime: "2026-07-28T18:00",
    status: "ACTIVE",
    seller: "Heritage Horology"
  },
  {
    id: "ps6_console",
    name: "PlayStation 6 Console",
    category: "Electronics",
    basePrice: 45000,
    currentBid: 58000,
    description: "Experience next-level gaming with the brand new PlayStation 6. Introducing ultra-high-speed SSD, deeper immersion with support for haptic feedback, adaptive triggers, and 3D Audio, and an all-new generation of incredible PlayStation games.",
    features: [
      "Ultra-High-Speed 2TB SSD",
      "8K Ultra HD Resolution support",
      "Next-gen Ray Tracing 2.0 technology",
      "DualSense Edge Pro controller included",
      "Backward compatibility with PS4 and PS5 games"
    ],
    image: "ps6.png",
    endTime: "2026-07-20T12:00",
    status: "ACTIVE",
    seller: "GameZone Retail"
  },
  {
    id: "tesla_model_s",
    name: "Tesla Model S Toy Edition",
    category: "Collectibles",
    basePrice: 5000,
    currentBid: 6200,
    description: "A rare collector's edition 1:18 scale diecast model of the Tesla Model S Plaid. Crafted with meticulously detailed interior, working steering wheel, opening doors, trunk, and hood. Finished in signature Tesla Solid Black paint.",
    features: [
      "1:18 Scale Precision Diecast Metal",
      "Functional steering wheel and suspension",
      "Detailed interior replication and battery pack layout",
      "Signature Tesla Solid Black glossy finish",
      "Collector's certificate of authenticity included"
    ],
    image: "tesla.png",
    endTime: "2026-05-15T20:00",
    status: "ACTIVE",
    seller: "Diecast Emporium"
  },
  {
    id: "macbook_pro",
    name: "MacBook Pro M5 Max",
    category: "Electronics",
    basePrice: 180000,
    currentBid: 215000,
    description: "The peak of portable performance. Powered by the M5 Max chip with a 16-core CPU and 40-core GPU, 64GB unified memory, and 2TB high speed SSD. Features the stunning Liquid Retina XDR display with ProMotion and extreme battery life.",
    features: [
      "Apple M5 Max Chip with 16-core CPU, 40-core GPU",
      "64GB Unified Memory (RAM)",
      "2TB super-fast SSD Storage",
      "16-inch Liquid Retina XDR Display",
      "Studio-quality three-mic array and six-speaker sound"
    ],
    image: "macbook.png",
    endTime: "2026-07-25T10:00",
    status: "ACTIVE",
    seller: "Apex Devices"
  }
];

const defaultDeliveries = [
  {
    id: "DLV-9018",
    productName: "iPhone 16 Pro",
    winner: "Amit K.",
    price: 82000,
    status: "Assigned",
    estimatedDelivery: "June 05, 2026"
  },
  {
    id: "DLV-3482",
    productName: "Sony WH-1000XM5 Headphones",
    winner: "Priya M.",
    price: 24500,
    status: "Out for Delivery",
    estimatedDelivery: "June 12, 2026"
  },
  {
    id: "DLV-7712",
    productName: "Keychron Q1 Mechanical Keyboard",
    winner: "Siddharth R.",
    price: 14000,
    status: "Assigned",
    estimatedDelivery: "June 14, 2026"
  },
  {
    id: "DLV-1029",
    productName: "iPad Air M2",
    winner: "Ayush S.",
    price: 54000,
    status: "Delivered",
    estimatedDelivery: "June 16, 2026"
  },
  {
    id: "DLV-5520",
    productName: "Razer BlackWidow Keyboard",
    winner: "Devansh S.",
    price: 12500,
    status: "Assigned",
    estimatedDelivery: "June 18, 2026"
  },
  {
    id: "DLV-4019",
    productName: "Logitech G Pro X Superlight",
    winner: "Pavitra N.",
    price: 9500,
    status: "Out for Delivery",
    estimatedDelivery: "June 15, 2026"
  },
  {
    id: "DLV-8812",
    productName: "Apple Watch Ultra 2",
    winner: "Tejas B.",
    price: 68000,
    status: "Assigned",
    estimatedDelivery: "June 20, 2026"
  },
  {
    id: "DLV-3029",
    productName: "Bellroy Leather Wallet",
    winner: "Amit K.",
    price: 6200,
    status: "Delivered",
    estimatedDelivery: "June 13, 2026"
  }
];

const defaultWallets = {
  buyer: {
    balance: 150000,
    transactions: [
      { type: "Deposit", amount: 50000, date: "June 08, 2026" },
      { type: "Auction Bid Hold", amount: -85250, date: "June 07, 2026" },
      { type: "Refund", amount: 45000, date: "June 05, 2026" }
    ]
  },
  seller: {
    balance: 725000,
    transactions: [
      { type: "Auction Payout", amount: 82000, date: "June 06, 2026" },
      { type: "Auction Payout", amount: 24500, date: "June 05, 2026" }
    ]
  }
};

export function initDb() {
  if (!localStorage.getItem("auctions")) {
    localStorage.setItem("auctions", JSON.stringify(defaultAuctions));
  }
  if (!localStorage.getItem("deliveries")) {
    localStorage.setItem("deliveries", JSON.stringify(defaultDeliveries));
  }
  if (!localStorage.getItem("wallets")) {
    localStorage.setItem("wallets", JSON.stringify(defaultWallets));
  }
  if (!localStorage.getItem("categories")) {
    localStorage.setItem("categories", JSON.stringify(defaultCategories));
  }
  if (!localStorage.getItem("orders")) {
    localStorage.setItem("orders", JSON.stringify(defaultOrders));
  }
}

export function getAuctions() {
  initDb();
  const list = JSON.parse(localStorage.getItem("auctions")) || [];
  return list.map(item => ({
    ...item,
    imageSrc: imageMap[item.image] || item.imageSrc || ""
  }));
}

export function addAuction(product) {
  initDb();
  const auctions = JSON.parse(localStorage.getItem("auctions")) || [];
  const newProduct = {
    id: auctions.length > 0 ? "prod_" + (Math.max(...auctions.map(a => {
      const match = String(a.id).match(/\d+/);
      return match ? parseInt(match[0]) : 0;
    })) + 1) : "prod_1",
    name: product.name,
    category: product.category,
    basePrice: Number(product.basePrice),
    currentBid: Number(product.basePrice),
    description: product.description,
    image: product.image || "",
    endTime: product.endTime,
    status: "ACTIVE",
    seller: sessionStorage.getItem("loggedInUserName") || "Seller"
  };
  auctions.push(newProduct);
  localStorage.setItem("auctions", JSON.stringify(auctions));
  return newProduct;
}

export function placeBid(productId, amount, buyerName) {
  initDb();
  const auctions = JSON.parse(localStorage.getItem("auctions")) || [];
  const index = auctions.findIndex(a => String(a.id) === String(productId));
  if (index === -1) {
    return { success: false, message: "Product not found" };
  }
  
  const auction = auctions[index];
  if (auction.status !== "ACTIVE") {
    return { success: false, message: "This auction is no longer active." };
  }

  const bidAmount = Number(amount);
  if (isNaN(bidAmount) || bidAmount <= auction.currentBid) {
    return { success: false, message: `Bid must be greater than current bid (₹${auction.currentBid}).` };
  }

  if (bidAmount < auction.basePrice) {
    return { success: false, message: `Bid must be at least the base price (₹${auction.basePrice}).` };
  }

  auctions[index] = {
    ...auction,
    currentBid: bidAmount,
    lastBidder: buyerName
  };

  localStorage.setItem("auctions", JSON.stringify(auctions));

  // Deduct/hold money from buyer's wallet (optional, but very neat!)
  const wallets = JSON.parse(localStorage.getItem("wallets")) || defaultWallets;
  if (wallets.buyer && wallets.buyer.balance >= bidAmount) {
    wallets.buyer.balance -= bidAmount;
    wallets.buyer.transactions.unshift({
      type: `Hold for ${auction.name || auction.title}`,
      amount: -bidAmount,
      date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
    });
    localStorage.setItem("wallets", JSON.stringify(wallets));
  }

  return { success: true, auction: auctions[index] };
}

export function getDeliveries() {
  initDb();
  return JSON.parse(localStorage.getItem("deliveries")) || [];
}

export function getWallet(role) {
  initDb();
  const wallets = JSON.parse(localStorage.getItem("wallets")) || defaultWallets;
  return wallets[role];
}

export function addMoney(role, amount) {
  initDb();
  const wallets = JSON.parse(localStorage.getItem("wallets")) || defaultWallets;
  if (!wallets[role]) {
    wallets[role] = { balance: 0, transactions: [] };
  }
  wallets[role].balance += amount;
  wallets[role].transactions.unshift({
    type: "Deposit",
    amount,
    date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
  });
  localStorage.setItem("wallets", JSON.stringify(wallets));
  return wallets[role];
}

const defaultCategories = [
  { id: 1, name: "Electronics", description: "Devices and gadgets including phones, laptops, cameras and more." },
  { id: 2, name: "Furniture", description: "Home and office furniture including chairs, tables, beds and more." },
  { id: 3, name: "Fashion", description: "Clothing, shoes, watches, and accessories for men and women." },
  { id: 4, name: "Books", description: "Fiction, non-fiction, academic and children's books." }
];

const defaultOrders = [
  {
    id: "ORD-1001",
    productName: "iPhone 14 Pro Max",
    specifications: "256GB, Space Black",
    price: 85250,
    status: "ASSIGNED",
    deliveryPerson: "Ramesh Kumar",
    image: "iphone.jpeg"
  },
  {
    id: "ORD-1002",
    productName: "MacBook Air M2",
    specifications: "8GB RAM, 256GB SSD",
    price: 92500,
    status: "OUT_FOR_DELIVERY",
    deliveryPerson: "Suresh Yadav",
    image: "macbook.png"
  },
  {
    id: "ORD-1003",
    productName: "Canon EOS 90D",
    specifications: "18-135mm Lens, DSLR Camera",
    price: 52750,
    status: "DELIVERED",
    deliveryPerson: "Ramesh Kumar",
    image: ""
  },
  {
    id: "ORD-1004",
    productName: "PlayStation 5",
    specifications: "Digital Edition, 8K Gaming Console",
    price: 47000,
    status: "ASSIGNED",
    deliveryPerson: "Not Assigned",
    image: "ps6.png"
  },
  {
    id: "ORD-1005",
    productName: "iPad Air (5th Gen)",
    specifications: "64GB, Wi-Fi",
    price: 43000,
    status: "DELIVERED",
    deliveryPerson: "Anil Verma",
    image: ""
  }
];

export function getCategories() {
  initDb();
  return JSON.parse(localStorage.getItem("categories")) || [];
}

export function addCategory(category) {
  initDb();
  const categories = getCategories();
  const newCat = {
    id: categories.length > 0 ? Math.max(...categories.map(c => c.id)) + 1 : 1,
    name: category.name,
    description: category.description
  };
  categories.push(newCat);
  localStorage.setItem("categories", JSON.stringify(categories));
  return newCat;
}

export function deleteCategory(id) {
  initDb();
  let categories = getCategories();
  categories = categories.filter(c => c.id !== Number(id));
  localStorage.setItem("categories", JSON.stringify(categories));
  return categories;
}

export function updateCategory(id, updatedCat) {
  initDb();
  const categories = getCategories();
  const idx = categories.findIndex(c => c.id === Number(id));
  if (idx !== -1) {
    categories[idx] = { ...categories[idx], ...updatedCat };
    localStorage.setItem("categories", JSON.stringify(categories));
  }
}

export function getOrders() {
  initDb();
  return JSON.parse(localStorage.getItem("orders")) || [];
}
