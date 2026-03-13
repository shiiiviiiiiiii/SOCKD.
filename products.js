const products = [
    {
        id: 1,
        name: "Classic Neon Mid-Calf",
        category: "SOCKS",
        price: 399,
        originalPrice: 599,
        colors: ["#39FF14", "#F5FF00"],
        sizes: ["S/M", "L/XL"],
        images: ["https://placehold.co/600x600/39FF14/000000?text=SOCKS+1", "https://placehold.co/600x600/F5FF00/000000?text=SOCKS+1+VAR"],
        rating: 4.8,
        description: "Our classic mid-calf sock in blinding neon. Soft, durable, and hard to miss."
    },
    {
        id: 2,
        name: "Hot Pink Ankle Breakers",
        category: "SOCKS",
        price: 349,
        originalPrice: 499,
        colors: ["#FF2D9B"],
        sizes: ["S", "M", "L"],
        images: ["https://placehold.co/600x600/FF2D9B/000000?text=ANKLE+SOCKS"],
        rating: 4.5,
        description: "Low cut, high impact. These ankle socks feature targeted cushioning."
    },
    {
        id: 3,
        name: "Cyan Speed Laces",
        category: "LACES",
        price: 199,
        originalPrice: 299,
        colors: ["#00FFFF"],
        sizes: ["120cm", "140cm"],
        images: ["https://placehold.co/600x600/00FFFF/000000?text=CYAN+LACES"],
        rating: 4.9,
        description: "Flat, wide laces with aglets that snap. Stay tied, look loud."
    },
    {
        id: 4,
        name: "Cloud Impact Insoles",
        category: "INSOLES",
        price: 899,
        originalPrice: 1299,
        colors: ["#F5FF00"],
        sizes: ["7-9", "10-12"],
        images: ["https://placehold.co/600x600/F5FF00/000000?text=INSOLES"],
        rating: 4.7,
        description: "Maximum shock absorption with a brutal neon foam core."
    },
    {
        id: 5,
        name: "Electric Yellow High-Tops",
        category: "SOCKS",
        price: 449,
        originalPrice: 649,
        colors: ["#F5FF00"],
        sizes: ["S/M", "L/XL"],
        images: ["https://placehold.co/600x600/F5FF00/000000?text=HIGH+TOPS"],
        rating: 4.6,
        description: "Over-the-calf style for when you need to make a serious statement."
    },
    {
        id: 6,
        name: "Reflective Night Runners",
        category: "SOCKS",
        price: 549,
        originalPrice: 0,
        colors: ["#000000"],
        sizes: ["M", "L"],
        images: ["https://placehold.co/600x600/000000/FFFFFF?text=REFLECTIVE"],
        rating: 4.2,
        description: "Black base with 3M reflective threads woven throughout."
    },
    {
        id: 7,
        name: "Magenta Thick Cords",
        category: "LACES",
        price: 249,
        originalPrice: 349,
        colors: ["#FF2D9B"],
        sizes: ["120cm", "160cm"],
        images: ["https://placehold.co/600x600/FF2D9B/000000?text=MAGENTA+LACES"],
        rating: 4.8,
        description: "Chunky cord-style laces that completely change your shoe's profile."
    },
    {
        id: 8,
        name: "Arch Support Masters",
        category: "INSOLES",
        price: 999,
        originalPrice: 1499,
        colors: ["#39FF14"],
        sizes: ["6-8", "9-11", "12-14"],
        images: ["https://placehold.co/600x600/39FF14/000000?text=ARCH+INSOLES"],
        rating: 4.9,
        description: "Rigid arch support wrapped in high-density neon green foam."
    },
    {
        id: 9,
        name: "Minimalist Black No-Show",
        category: "SOCKS",
        price: 299,
        originalPrice: 399,
        colors: ["#000000", "#FFFFFF"],
        sizes: ["S", "M", "L"],
        images: ["https://placehold.co/600x600/000000/39FF14?text=NO+SHOW", "https://placehold.co/600x600/FFFFFF/000000?text=NO+SHOW+VAR"],
        rating: 4.4,
        description: "For when the shoes need to do the talking. Anti-slip heel grip."
    },
    {
        id: 10,
        name: "Brutal Sneaker Bag",
        category: "ACCESSORIES",
        price: 1299,
        originalPrice: 1999,
        colors: ["#000000"],
        sizes: ["OS"],
        images: ["https://placehold.co/600x600/000000/F5FF00?text=SNEAKER+BAG"],
        rating: 4.6,
        description: "Heavy-duty ripstop nylon bag for your grails. Neon yellow interior."
    },
    {
        id: 11,
        name: "Glow in the Dark Laces",
        category: "LACES",
        price: 299,
        originalPrice: 0,
        colors: ["#39FF14"],
        sizes: ["120cm"],
        images: ["https://placehold.co/600x600/39FF14/000000?text=GLOW+LACES"],
        rating: 4.3,
        description: "Charges in sunlight, glows blinding green in the dark."
    },
    {
        id: 12,
        name: "Triple Stripe Athletes",
        category: "SOCKS",
        price: 499,
        originalPrice: 699,
        colors: ["#FFFFFF"],
        sizes: ["S/M", "L/XL"],
        images: ["https://placehold.co/600x600/FFFFFF/000000?text=TRIPLE+STRIPE"],
        rating: 4.7,
        description: "Retro athletic shape with brutalist black stripes on a stark white base."
    }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = products;
}
