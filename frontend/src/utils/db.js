const defaultAuctions = [
  {
    id: 1,
    name: "iPhone 17 Pro",
    category: "Electronics",
    basePrice: 70000,
    currentBid: 85250,
    description: "iPhone 17 Pro. Exceptional, new Center Stage front camera.",
    image: "",
    endTime: "2026-08-30T22:00",
    status: "ACTIVE",
    seller: "Alice"
  },
  {
    id: 2,
    name: "MacBook Pro M4",
    category: "Electronics",
    basePrice: 120000,
    currentBid: 135000,
    description: "Supercharged by M4 chip. 16-inch Liquid Retina XDR display.",
    image: "",
    endTime: "2026-07-28T18:00",
    status: "ACTIVE",
    seller: "Alice"
  },
  {
    id: 3,
    name: "Mechanical Keyboard",
    category: "Accessories",
    basePrice: 5000,
    currentBid: 6200,
    description: "Hot-swappable RGB mechanical keyboard with brown switches.",
    image: "",
    endTime: "2026-07-20T12:00",
    status: "ACTIVE",
    seller: "Bob"
  },
  {
    id: 4,
    name: "Sony WH-1000XM5",
    category: "Audio",
    basePrice: 25000,
    currentBid: 25000,
    description: "Industry leading noise-canceling wireless headphones.",
    image: "",
    endTime: "2026-05-15T20:00",
    status: "SOLD",
    seller: "Bob"
  }
];

export function initDb() {
  if (!localStorage.getItem("auctions")) {
    localStorage.setItem("auctions", JSON.stringify(defaultAuctions));
  }
}

export function getAuctions() {
  initDb();
  return JSON.parse(localStorage.getItem("auctions")) || [];
}

export function addAuction(product) {
  initDb();
  const auctions = getAuctions();
  const newProduct = {
    id: auctions.length > 0 ? Math.max(...auctions.map(a => a.id)) + 1 : 1,
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
  const auctions = getAuctions();
  const index = auctions.findIndex(a => a.id === productId);
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
  return { success: true, auction: auctions[index] };
}
