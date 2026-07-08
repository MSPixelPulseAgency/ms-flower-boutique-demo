import React, { createContext, useContext, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Link, NavLink, Route, Routes, useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  BadgeDollarSign,
  CalendarDays,
  ChevronDown,
  Clock,
  Edit3,
  Flower2,
  Gift,
  Heart,
  Instagram,
  LayoutDashboard,
  Leaf,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  PackageCheck,
  Phone,
  Plus,
  Search,
  ShoppingBag,
  Sparkles,
  Star,
  Trash2,
  Truck,
  Upload,
  User,
  X
} from 'lucide-react';
import './styles/global.css';

const brand = {
  name: 'Bloomé by Ava',
  email: 'hello@mspixelpulse.com',
  phone: '+1 (000) 000-0000',
  adminEmail: 'admin@bloomebyava.ca',
  adminPassword: 'demo123',
  areas: ['Toronto', 'Brampton', 'Mississauga', 'Vaughan', 'Markham', 'Richmond Hill', 'North York', 'Etobicoke', 'Scarborough']
};

const products = [
  ['blush-rose-signature-bouquet', 'Blush Rose Signature Bouquet', 89, 'Rose', 'Blush', 'romance', 'Roses', true, 4.9, 'Soft blush roses, lisianthus, and airy greenery wrapped in cream paper.', 'Gratitude, romance, and tender celebration.'],
  ['avas-garden-luxe-arrangement', 'Ava’s Garden Luxe Arrangement', 145, 'Luxury', 'Pastel', 'birthday', 'Mixed', true, 5, 'A statement vase arrangement with roses, ranunculus, hydrangea, and seasonal accents.', 'Abundance, elegance, and unforgettable gifting.'],
  ['pastel-peony-dream', 'Pastel Peony Dream', 119, 'Seasonal', 'Pink', 'anniversary', 'Peonies', false, 4.8, 'Cloud-like peonies with delicate filler flowers in a romantic palette.', 'Prosperity, affection, and happy beginnings.'],
  ['white-orchid-elegance', 'White Orchid Elegance', 132, 'Plants', 'White', 'thank-you', 'Orchid', true, 4.9, 'A graceful white orchid styled in a ceramic pot with moss finishing.', 'Refined beauty, peace, and admiration.'],
  ['sunshine-tulip-wrap', 'Sunshine Tulip Wrap', 68, 'Everyday', 'Yellow', 'get-well', 'Tulips', true, 4.7, 'Cheerful tulips wrapped simply for bright, joyful delivery.', 'Warmth, optimism, and fresh starts.'],
  ['romantic-red-rose-box', 'Romantic Red Rose Box', 155, 'Rose Box', 'Red', 'romance', 'Roses', true, 5, 'Premium red roses arranged in a keepsake hat box.', 'Passionate love and devotion.'],
  ['lavender-garden-basket', 'Lavender Garden Basket', 98, 'Gift Basket', 'Lavender', 'housewarming', 'Mixed', true, 4.8, 'Lavender-toned blooms in a woven basket with gentle garden texture.', 'Calm, comfort, and graceful welcome.'],
  ['sympathy-white-lily-bouquet', 'Sympathy White Lily Bouquet', 104, 'Sympathy', 'White', 'sympathy', 'Lilies', true, 4.9, 'White lilies and roses arranged with soft greenery for condolences.', 'Remembrance, purity, and peaceful support.'],
  ['birthday-bright-bloom-box', 'Birthday Bright Bloom Box', 86, 'Gift Box', 'Bright', 'birthday', 'Mixed', true, 4.7, 'Colourful blooms in a modern box made for celebration.', 'Joy, confidence, and cheerful surprise.'],
  ['mothers-day-soft-pink-arrangement', 'Mother’s Day Soft Pink Arrangement', 112, 'Holiday', 'Pink', 'mothers-day', 'Roses', false, 4.9, 'Soft pink roses, carnations, and seasonal blooms in a keepsake vessel.', 'Appreciation, warmth, and nurturing love.'],
  ['wedding-bridal-bouquet', 'Wedding Bridal Bouquet', 210, 'Wedding', 'Cream', 'wedding', 'Roses', false, 5, 'A refined bridal bouquet with roses, ranunculus, and silk ribbon.', 'Commitment, beauty, and new chapters.'],
  ['corporate-reception-arrangement', 'Corporate Reception Arrangement', 175, 'Corporate', 'White', 'corporate', 'Orchid', true, 4.8, 'Tall, polished florals for reception desks, lobbies, and client-facing spaces.', 'Professional welcome and quiet luxury.'],
  ['preserved-rose-dome', 'Preserved Rose Dome', 125, 'Preserved', 'Red', 'gift', 'Roses', true, 4.9, 'A preserved rose under a glass dome for a lasting keepsake.', 'Enduring love and treasured memories.'],
  ['mini-flower-gift-box', 'Mini Flower Gift Box', 54, 'Gift Box', 'Pastel', 'thank-you', 'Mixed', true, 4.6, 'A petite floral box perfect for small gestures and desk delivery.', 'Thoughtfulness and sweet appreciation.'],
  ['wildflower-weekend-bouquet', 'Wildflower Weekend Bouquet', 76, 'Everyday', 'Mixed', 'housewarming', 'Wildflower', true, 4.7, 'Loose garden-inspired stems with movement, colour, and charm.', 'Freedom, joy, and natural beauty.'],
  ['luxury-vase-arrangement', 'Luxury Vase Arrangement', 195, 'Luxury', 'Blush', 'anniversary', 'Mixed', true, 5, 'An elevated vase arrangement for premium gifting and special milestones.', 'Celebration, affection, and thoughtful grandeur.']
].map((p, index) => ({
  id: p[0],
  name: p[1],
  price: p[2],
  category: p[3],
  colour: p[4],
  occasion: p[5],
  flowerType: p[6],
  sameDay: p[7],
  rating: p[8],
  description: p[9],
  meaning: p[10],
  imageTone: ['rose', 'lavender', 'cream', 'sage', 'gold', 'plum'][index % 6],
  popular: index < 8,
  newest: index > 9,
  stock: index % 5 === 0 ? 'Limited' : 'Available'
}));

const occasions = ['Birthday', 'Anniversary', 'Love & Romance', 'Sympathy', 'Funeral', 'Wedding', 'Get Well Soon', 'Thank You', 'Graduation', 'New Baby', 'Mother’s Day', 'Valentine’s Day', 'Christmas', 'Housewarming', 'Corporate Gifts'];
const services = ['Online flower delivery', 'Same-day flower delivery', 'Custom bouquets', 'Wedding flowers', 'Funeral and sympathy flowers', 'Corporate flowers', 'Event flowers', 'Flower subscriptions', 'Gift boxes', 'Preserved flowers', 'Plants', 'Seasonal flowers', 'Holiday arrangements', 'Floral consultations', 'Delivery tracking', 'Personalized gift messages'];
const testimonials = [
  ['Nadia P.', 'Mississauga', 'The bouquet felt custom and elevated. The demo checkout flow is exactly what a premium flower shop needs.'],
  ['Alyssa M.', 'Toronto', 'Soft, romantic, and easy to shop on my phone. I loved the gift add-ons and delivery time choices.'],
  ['Priya S.', 'Brampton', 'The wedding inquiry page feels thoughtful and high-end without being overwhelming.']
];
const blogPosts = ['How to Care for Fresh Flowers', 'Best Flowers for Birthdays', 'Wedding Flower Trends in Canada', 'Same-Day Flower Delivery Guide', 'Flower Colours and Their Meanings', 'Best Floral Gifts for Mother’s Day'];
const addOns = ['Greeting card', 'Chocolate box', 'Teddy bear', 'Candle', 'Balloon', 'Vase'];

const CartContext = createContext(null);
const useCart = () => useContext(CartContext);

function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [toast, setToast] = useState('');
  const add = (product, options = {}) => {
    setItems((current) => {
      const key = product.id + JSON.stringify(options);
      const found = current.find((item) => item.key === key);
      if (found) return current.map((item) => item.key === key ? { ...item, qty: item.qty + 1 } : item);
      return [...current, { ...product, key, qty: 1, options }];
    });
    setToast(`${product.name} added to cart`);
    window.setTimeout(() => setToast(''), 1800);
  };
  const updateQty = (key, qty) => setItems((current) => current.map((item) => item.key === key ? { ...item, qty: Math.max(1, qty) } : item));
  const remove = (key) => setItems((current) => current.filter((item) => item.key !== key));
  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const value = useMemo(() => ({ items, add, updateQty, remove, total, toast }), [items, total, toast]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

function Seo({ title, description }) {
  React.useEffect(() => {
    document.title = `${title} | Bloomé by Ava`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', description);
  }, [title, description]);
  return null;
}

function Header() {
  const [open, setOpen] = useState(false);
  const { items } = useCart();
  const links = [
    ['/', 'Home'], ['/shop', 'Shop'], ['/occasions', 'Occasions'], ['/wedding-flowers', 'Weddings'], ['/events-corporate', 'Events'], ['/subscription', 'Subscriptions'], ['/delivery-areas', 'Delivery'], ['/about', 'About'], ['/gallery', 'Gallery'], ['/blog', 'Blog'], ['/contact', 'Contact']
  ];
  return (
    <header className="site-header">
      <Link className="brand" to="/" aria-label="Bloomé by Ava home"><span><Flower2 size={24} /></span><strong>{brand.name}</strong></Link>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {links.map(([href, label]) => <NavLink key={href} to={href}>{label}</NavLink>)}
      </nav>
      <div className="header-actions">
        <Link className="icon-link" to="/login" aria-label="Login"><User size={19} /></Link>
        <Link className="cart-pill" to="/cart" aria-label={`Cart with ${items.length} items`}><ShoppingBag size={18} /><span>{items.length}</span></Link>
        <button className="menu-button" type="button" onClick={() => setOpen(!open)} aria-label="Toggle mobile menu">{open ? <X /> : <Menu />}</button>
      </div>
      <AnimatePresence>
        {open && <motion.nav className="mobile-nav" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>{links.map(([href, label]) => <NavLink key={href} to={href} onClick={() => setOpen(false)}>{label}</NavLink>)}</motion.nav>}
      </AnimatePresence>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div>
        <Link className="brand footer-brand" to="/"><span><Flower2 size={24} /></span><strong>{brand.name}</strong></Link>
        <p>Demo premium Canadian flower boutique by MSPixelPulse. Elegant bouquets, wedding florals, gifts, subscriptions, and same-day delivery experiences.</p>
      </div>
      <div><h3>Visit</h3><Link to="/shop">Shop flowers</Link><Link to="/wedding-flowers">Wedding studio</Link><Link to="/delivery-areas">Delivery areas</Link><Link to="/admin">Admin demo</Link></div>
      <div><h3>Contact</h3><p><Mail size={16} /> {brand.email}</p><p><Phone size={16} /> {brand.phone}</p><p><Instagram size={16} /> Instagram demo</p></div>
    </footer>
  );
}

function Layout({ children }) {
  const { items, toast } = useCart();
  return (
    <>
      <Header />
      <main>{children}</main>
      <Link className="floating-cart" to="/cart" aria-label="Open cart"><ShoppingBag /><span>{items.length}</span></Link>
      <a className="floating-whatsapp" href="https://wa.me/10000000000" aria-label="Chat on WhatsApp"><MessageCircle /></a>
      <AnimatePresence>{toast && <motion.div className="toast" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }}>{toast}</motion.div>}</AnimatePresence>
      <Footer />
    </>
  );
}

function Reveal({ children, className = '' }) {
  return <motion.div className={className} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.55 }}>{children}</motion.div>;
}

function SectionHeading({ eyebrow, title, text }) {
  return <Reveal className="section-heading"><span>{eyebrow}</span><h2>{title}</h2>{text && <p>{text}</p>}</Reveal>;
}

function PetalAnimation() {
  return <div className="petals" aria-hidden="true">{Array.from({ length: 12 }).map((_, i) => <i key={i} style={{ '--i': i }} />)}</div>;
}

function FlowerArt({ tone = 'rose', label }) {
  return <div className={`flower-art ${tone}`} role="img" aria-label={label}><span /><span /><span /><span /><b /></div>;
}

function ProductCard({ product }) {
  const { add } = useCart();
  return (
    <Reveal className="product-card">
      <Link to={`/shop/${product.id}`} className="product-image"><FlowerArt tone={product.imageTone} label={`${product.name} floral arrangement`} />{product.sameDay && <em>Same-day</em>}</Link>
      <div className="product-meta">
        <div><p>{product.category}</p><h3>{product.name}</h3></div>
        <button aria-label={`Save ${product.name} to wishlist`}><Heart size={18} /></button>
      </div>
      <p className="product-copy">{product.description}</p>
      <div className="rating"><Star size={16} fill="currentColor" /> {product.rating} · {product.colour} · {product.flowerType}</div>
      <div className="product-actions"><strong>${product.price}</strong><Link to={`/shop/${product.id}`}>Quick View</Link><button type="button" onClick={() => add(product)}>Add to Cart</button></div>
    </Reveal>
  );
}

function Home() {
  return (
    <>
      <Seo title="Fresh Blooms, Beautifully Delivered" description="Premium girl-owned Canadian flower boutique demo for bouquets, wedding flowers, gifts, subscriptions, and GTA flower delivery." />
      <section className="hero">
        <PetalAnimation />
        <div className="hero-copy">
          <span className="eyebrow">Girl-owned Canadian flower boutique</span>
          <h1>Fresh Blooms, Beautifully Delivered</h1>
          <p>A girl-owned Canadian floral boutique creating elegant bouquets, wedding flowers, and thoughtful gifts for life’s most beautiful moments.</p>
          <div className="button-row"><Link className="primary" to="/shop">Shop Flowers</Link><Link className="secondary" to="/wedding-flowers">Book Wedding Consultation</Link></div>
          <div className="same-day"><Truck size={18} /> Same-day GTA delivery available before 12 PM.</div>
        </div>
        <div className="hero-visual"><FlowerArt tone="rose" label="Luxury blush floral bouquet hero artwork" /><div className="floating-stat"><Sparkles /> 16 demo bouquets ready to shop</div><div className="floating-stat second"><MapPin /> Toronto and GTA delivery</div></div>
      </section>
      <section><SectionHeading eyebrow="Best sellers" title="Bouquets customers love first" text="Demo products are structured like a real flower delivery store with ratings, tags, add-ons, and same-day badges." /><div className="product-grid">{products.slice(0, 4).map((product) => <ProductCard key={product.id} product={product} />)}</div></section>
      <section className="soft-band"><SectionHeading eyebrow="Occasions" title="Shop by the moment" /><div className="occasion-grid">{occasions.slice(0, 8).map((item) => <Link className="occasion-card" to="/occasions" key={item}><Gift /><h3>{item}</h3><p>Elegant demo arrangements styled for {item.toLowerCase()} gifting.</p></Link>)}</div></section>
      <section className="split"><Reveal><span className="eyebrow">Wedding floral studio</span><h2>Romantic florals for ceremonies, receptions, and intimate celebrations.</h2><p>Bloomé by Ava’s demo wedding studio includes bridal bouquets, arches, aisle flowers, centrepieces, installations, and a detailed consultation form for serious leads.</p><Link className="primary" to="/wedding-flowers">Explore Weddings</Link></Reveal><Reveal className="feature-panel"><FlowerArt tone="lavender" label="Wedding flowers with lavender and cream petals" /></Reveal></section>
      <section><SectionHeading eyebrow="Subscriptions" title="Fresh flowers on a rhythm" text="Weekly, bi-weekly, and monthly plans make recurring revenue easy to present to flower business owners." /><PlanGrid /></section>
      <WhyChoose />
      <section className="soft-band"><SectionHeading eyebrow="Delivery" title="Designed for local GTA conversion" /><AreaChips /></section>
      <Testimonials />
      <InstagramGrid />
      <Newsletter />
    </>
  );
}

function Shop() {
  const [query, setQuery] = useState('');
  const [occasion, setOccasion] = useState('All');
  const [colour, setColour] = useState('All');
  const [type, setType] = useState('All');
  const [available, setAvailable] = useState(false);
  const [sort, setSort] = useState('popular');
  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase()) &&
    (occasion === 'All' || p.occasion === occasion) &&
    (colour === 'All' || p.colour === colour) &&
    (type === 'All' || p.flowerType === type) &&
    (!available || p.stock === 'Available')
  ).sort((a, b) => sort === 'price-low' ? a.price - b.price : sort === 'price-high' ? b.price - a.price : sort === 'newest' ? Number(b.newest) - Number(a.newest) : Number(b.popular) - Number(a.popular));
  return (
    <PageShell title="Shop Flowers" eyebrow="Online flower delivery" text="Search, filter, and shop demo bouquets with realistic eCommerce controls built for mobile buyers.">
      <Seo title="Shop Flowers" description="Shop demo bouquets, roses, orchids, tulips, wedding flowers, preserved roses, and gift boxes with GTA same-day delivery." />
      <div className="filters">
        <label><Search size={16} /> <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search bouquets" /></label>
        <Select label="Occasion" value={occasion} onChange={setOccasion} options={['All', ...new Set(products.map((p) => p.occasion))]} />
        <Select label="Colour" value={colour} onChange={setColour} options={['All', ...new Set(products.map((p) => p.colour))]} />
        <Select label="Flower type" value={type} onChange={setType} options={['All', ...new Set(products.map((p) => p.flowerType))]} />
        <Select label="Sort" value={sort} onChange={setSort} options={['popular', 'newest', 'price-low', 'price-high']} />
        <label className="checkbox"><input type="checkbox" checked={available} onChange={(e) => setAvailable(e.target.checked)} /> Available only</label>
      </div>
      <div className="product-grid">{filtered.map((product) => <ProductCard key={product.id} product={product} />)}</div>
    </PageShell>
  );
}

function ProductDetails() {
  const { id } = useParams();
  const product = products.find((item) => item.id === id) || products[0];
  const [size, setSize] = useState('Classic');
  const [qty, setQty] = useState(1);
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const { add } = useCart();
  const price = product.price + (size === 'Petite' ? -15 : size === 'Deluxe' ? 35 : size === 'Luxe' ? 70 : 0) + selectedAddOns.length * 12;
  return (
    <PageShell title={product.name} eyebrow="Product details" text={product.description}>
      <Seo title={product.name} description={`${product.name} demo product page with size options, gift add-ons, delivery date, message, care instructions, and reviews.`} />
      <div className="product-detail">
        <div className="gallery-detail"><FlowerArt tone={product.imageTone} label={`${product.name} large floral image`} />{[1, 2, 3].map((i) => <FlowerArt key={i} tone={['rose', 'cream', 'sage'][i - 1]} label={`${product.name} thumbnail ${i}`} />)}</div>
        <div className="detail-panel">
          <div className="rating"><Star size={17} fill="currentColor" /> {product.rating} rating · {product.category}</div>
          <h2>${price}</h2>
          <p><strong>Flower meaning:</strong> {product.meaning}</p>
          <div className="option-row">{['Petite', 'Classic', 'Deluxe', 'Luxe'].map((item) => <button className={size === item ? 'active' : ''} onClick={() => setSize(item)} type="button" key={item}>{item}</button>)}</div>
          <div className="form-grid"><label>Delivery date<input type="date" /></label><label>Delivery time<select><option>10 AM - 1 PM</option><option>1 PM - 4 PM</option><option>4 PM - 7 PM</option></select></label></div>
          <label>Gift message<textarea rows="3" placeholder="Write a personal message for the recipient." /></label>
          <h3>Add-ons</h3>
          <div className="addon-grid">{addOns.map((item) => <label key={item}><input type="checkbox" checked={selectedAddOns.includes(item)} onChange={(e) => setSelectedAddOns(e.target.checked ? [...selectedAddOns, item] : selectedAddOns.filter((a) => a !== item))} /> {item}</label>)}</div>
          <div className="quantity"><button onClick={() => setQty(Math.max(1, qty - 1))} type="button">-</button><span>{qty}</span><button onClick={() => setQty(qty + 1)} type="button">+</button></div>
          <button className="primary full" type="button" onClick={() => Array.from({ length: qty }).forEach(() => add({ ...product, price }, { size, selectedAddOns }))}>Add to cart</button>
          <div className="info-list"><p><Leaf /> Care instructions included with every bouquet.</p><p><PackageCheck /> Freshness guarantee on all demo arrangements.</p><p><Truck /> Same-day delivery before 12 PM where available.</p></div>
        </div>
      </div>
      <Reviews />
    </PageShell>
  );
}

function Occasions() {
  return <PageShell title="Flowers by Occasion" eyebrow="Thoughtful gifting" text="Beautiful demo category cards for every high-intent shopping moment."><Seo title="Flowers by Occasion" description="Shop flower occasion categories including birthday, anniversary, sympathy, funeral, wedding, get well, thank you, holidays, and corporate gifts." /><div className="occasion-grid large">{occasions.map((item, index) => <Link className="occasion-card" to="/shop" key={item}><Flower2 /><h3>{item}</h3><p>{['Soft', 'Elegant', 'Fresh', 'Romantic'][index % 4]} blooms curated for {item.toLowerCase()} moments.</p></Link>)}</div></PageShell>;
}

function Wedding() {
  return (
    <PageShell title="Wedding Flowers" eyebrow="Romantic floral studio" text="A full demo wedding inquiry experience for bridal bouquets, ceremony flowers, reception centrepieces, and installations.">
      <Seo title="Wedding Flowers" description="Wedding flower demo page with bridal bouquets, ceremony arches, reception centrepieces, installations, packages, gallery, and consultation form." />
      <div className="service-grid">{['Bridal bouquets', 'Bridesmaid bouquets', 'Boutonnieres', 'Ceremony arches', 'Aisle flowers', 'Reception centrepieces', 'Sweetheart table flowers', 'Floral installations'].map((item) => <ServiceCard key={item} title={item} />)}</div>
      <div className="pricing-grid">{['Petite Ceremony', 'Signature Wedding', 'Luxe Floral Weekend'].map((plan, i) => <div className="pricing-card" key={plan}><h3>{plan}</h3><strong>${[1200, 2800, 5200][i]}+</strong><p>Demo package for consultations, design planning, delivery, setup, and refined floral styling.</p><Link className="secondary" to="/contact">Start Inquiry</Link></div>)}</div>
      <ConsultationForm />
    </PageShell>
  );
}

function Events() {
  return <PageShell title="Events & Corporate Flowers" eyebrow="Polished recurring florals" text="Corporate, hospitality, celebration, and sympathy floral services presented for lead generation."><Seo title="Events and Corporate Flowers" description="Corporate weekly flowers, office reception flowers, restaurant arrangements, hotel lobby flowers, baby showers, birthdays, engagements, funeral services, and installations." /><div className="service-grid">{['Corporate weekly flowers', 'Office reception flowers', 'Restaurant table arrangements', 'Hotel lobby flowers', 'Baby showers', 'Birthday events', 'Engagement parties', 'Funeral services', 'Custom installations'].map((item) => <ServiceCard key={item} title={item} />)}</div></PageShell>;
}

function Subscription() {
  return <PageShell title="Flower Subscription" eyebrow="Fresh flowers on repeat" text="Recurring bouquet plans for homes, offices, gifting, and hospitality spaces."><Seo title="Flower Subscription" description="Weekly, bi-weekly, and monthly flower subscription demo plans with pause anytime, gift options, and local delivery." /><PlanGrid /></PageShell>;
}

function Delivery() {
  const [postal, setPostal] = useState('');
  return (
    <PageShell title="Delivery Areas" eyebrow="GTA same-day delivery" text="Demo local delivery page with postal checker, delivery fees, cutoff timing, and service FAQs.">
      <Seo title="Delivery Areas" description="Same-day flower delivery demo for Toronto, Brampton, Mississauga, Vaughan, Markham, Richmond Hill, North York, Etobicoke, and Scarborough." />
      <div className="checker"><h2>Postal code checker</h2><label>Enter postal code<input value={postal} onChange={(e) => setPostal(e.target.value)} placeholder="M5V 2T6" /></label><p>{postal ? 'Great news: this demo postal code is inside the sample GTA delivery zone.' : 'Same-day delivery cutoff is 12 PM.'}</p></div>
      <div className="pricing-grid">{['Toronto core $14', 'GTA nearby $18', 'Extended GTA $24'].map((fee) => <div className="pricing-card" key={fee}><Truck /><h3>{fee}</h3><p>Demo fee card for checkout transparency and local SEO.</p></div>)}</div><AreaChips /><FAQ />
    </PageShell>
  );
}

function About() {
  return <PageShell title="About Ava" eyebrow="Founder story" text="Ava is a Canadian floral designer who started Bloomé by Ava with a love for soft colours, meaningful gifts, and beautifully styled arrangements. Her goal is to make every bouquet feel personal, elegant, fresh, and unforgettable."><Seo title="About" description="Founder story for Ava, a girl-owned Canadian floral boutique demo focused on freshness, sustainability, local sourcing, and personal service." /><div className="split"><Reveal><h2>Girl-owned, Canadian, and detail obsessed.</h2><p>Bloomé by Ava is written as a demo boutique that blends premium floral design with warm service, sustainable choices, local sourcing, and a behind-the-studio feel customers can trust.</p></Reveal><Reveal className="feature-panel"><FlowerArt tone="sage" label="Behind the studio floral styling" /></Reveal></div><div className="service-grid">{['Elegance', 'Care', 'Freshness', 'Personal touch', 'Reliability'].map((item) => <ServiceCard key={item} title={item} />)}</div></PageShell>;
}

function Gallery() {
  return <PageShell title="Gallery" eyebrow="Floral inspiration" text="A polished image-style grid for bouquets, weddings, events, gift boxes, store styling, and seasonal blooms."><Seo title="Gallery" description="Gallery for bouquets, weddings, events, gift boxes, store styling, and seasonal blooms." /><InstagramGrid expanded /></PageShell>;
}

function Blog() {
  return <PageShell title="Floral Journal" eyebrow="Helpful flower content" text="SEO-ready demo articles built for flower care, gifting, wedding planning, and local delivery searches."><Seo title="Blog" description="Flower care, birthday flowers, wedding trends, same-day delivery, flower meanings, and Mother's Day gift ideas." /><div className="blog-grid">{blogPosts.map((post, index) => <article className="blog-card" key={post}><FlowerArt tone={['rose', 'lavender', 'sage'][index % 3]} label={`${post} floral article`} /><span>Floral guide</span><h3>{post}</h3><p>Warm, practical demo advice for Canadian flower shoppers and local boutique SEO.</p><Link to="/contact">Read demo article</Link></article>)}</div></PageShell>;
}

function Contact() {
  return (
    <PageShell title="Contact Bloomé by Ava" eyebrow="We would love to help" text="Demo contact paths for orders, weddings, events, subscriptions, and delivery questions.">
      <Seo title="Contact" description="Contact Bloomé by Ava demo flower boutique by form, phone, email, WhatsApp, business hours, Instagram, and map placeholder." />
      <div className="contact-layout"><DemoForm title="Send a message" fields={['Full name', 'Email', 'Phone', 'Message']} /><div className="contact-card"><p><Phone /> {brand.phone}</p><p><Mail /> {brand.email}</p><p><Clock /> Mon-Sat 9 AM - 6 PM</p><p><MapPin /> Toronto GTA studio demo location</p><div className="map-placeholder">Google map placeholder for demo location</div><a className="primary" href="https://wa.me/10000000000">WhatsApp Us</a></div></div>
    </PageShell>
  );
}

function Cart() {
  const { items, total, updateQty, remove } = useCart();
  return <PageShell title="Cart" eyebrow="Review your blooms" text="Demo cart with quantity controls, totals, gift styling, and checkout CTA."><Seo title="Cart" description="Demo flower cart with quantity updates and checkout." />{items.length === 0 ? <EmptyState text="Your cart is ready for fresh blooms." cta="/shop" label="Shop flowers" /> : <div className="cart-layout"><div>{items.map((item) => <div className="cart-row" key={item.key}><FlowerArt tone={item.imageTone} label={item.name} /><div><h3>{item.name}</h3><p>{item.options?.size || 'Classic'} · ${item.price}</p></div><div className="quantity"><button onClick={() => updateQty(item.key, item.qty - 1)}>-</button><span>{item.qty}</span><button onClick={() => updateQty(item.key, item.qty + 1)}>+</button></div><button onClick={() => remove(item.key)} aria-label={`Remove ${item.name}`}><Trash2 /></button></div>)}</div><aside className="summary"><h2>Order summary</h2><p>Subtotal <strong>${total}</strong></p><p>Demo delivery <strong>$14</strong></p><p>HST demo <strong>${Math.round(total * 0.13)}</strong></p><h3>Total ${total + 14 + Math.round(total * 0.13)}</h3><Link className="primary full" to="/checkout">Checkout Demo</Link></aside></div>}</PageShell>;
}

function Checkout() {
  return <PageShell title="Checkout Demo" eyebrow="Static checkout flow" text="A realistic checkout demo for delivery details, gift messages, and order confirmation."><Seo title="Checkout Demo" description="Static checkout demo for flower delivery, recipient details, delivery date, gift message, and order confirmation." /><DemoForm title="Delivery and payment demo" fields={['Recipient name', 'Delivery address', 'City', 'Postal code', 'Delivery date', 'Gift message', 'Card number demo']} /></PageShell>;
}

function Login() {
  return <AuthPage title="Login" text={`Demo admin: ${brand.adminEmail} / ${brand.adminPassword}`} />;
}

function Register() {
  return <AuthPage title="Register" text="Create a demo customer account for saved addresses, wishlist, orders, and subscriptions." register />;
}

function CustomerDashboard() {
  return <Dashboard title="Customer Dashboard" items={['My orders', 'Saved addresses', 'Wishlist', 'Subscriptions', 'Wedding consultation status', 'Profile settings', 'Order tracking timeline']} />;
}

function AdminDashboard() {
  const [modal, setModal] = useState(false);
  const [notice, setNotice] = useState('');
  const show = (text) => { setNotice(text); window.setTimeout(() => setNotice(''), 1700); };
  return (
    <PageShell title="Admin Dashboard" eyebrow="Polished static CMS demo" text="Demo admin area for products, orders, wedding leads, subscriptions, coupons, delivery zones, testimonials, and messages.">
      <Seo title="Admin Dashboard" description="Polished static admin dashboard demo for flower shop management." />
      {notice && <div className="inline-toast">{notice}</div>}
      <div className="dashboard-grid">{[
        ['Revenue', '$8,420', BadgeDollarSign], ['Today’s orders', '24', ShoppingBag], ['Pending deliveries', '11', Truck], ['Low stock flowers', '6', Leaf], ['New wedding leads', '5', CalendarDays], ['Recent customers', '38', User]
      ].map(([label, value, Icon]) => <div className="dash-card" key={label}><Icon /><p>{label}</p><strong>{value}</strong></div>)}</div>
      <div className="admin-layout"><aside className="admin-sidebar">{['Products', 'Orders', 'Wedding leads', 'Subscriptions', 'Testimonials', 'Coupons', 'Delivery zones', 'Messages'].map((item) => <button key={item}><LayoutDashboard size={16} />{item}</button>)}</aside><div className="admin-main"><div className="admin-toolbar"><label><Search size={16} /><input placeholder="Search table" /></label><button onClick={() => setModal(true)}><Plus size={16} /> Add product</button><button onClick={() => show('Demo filter applied')}><ChevronDown size={16} /> Filter</button></div><AdminTable onEdit={() => setModal(true)} onToast={show} /></div></div>
      {modal && <Modal title="Edit product demo" onClose={() => setModal(false)}><DemoForm title="Product details" fields={['Product name', 'Price', 'Category', 'Colour', 'Availability']} button="Save demo product" onSuccess={() => { setModal(false); show('Demo product saved'); }} /></Modal>}
    </PageShell>
  );
}

function PageShell({ eyebrow, title, text, children }) {
  return <><section className="page-hero"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{text}</p></section><section>{children}</section></>;
}

function Select({ label, value, onChange, options }) {
  return <label>{label}<select value={value} onChange={(e) => onChange(e.target.value)}>{options.map((item) => <option key={item} value={item}>{item}</option>)}</select></label>;
}

function PlanGrid() {
  return <div className="pricing-grid">{[['Weekly Blooms', 58, 'Weekly'], ['Bi-Weekly Blooms', 72, 'Every two weeks'], ['Monthly Blooms', 95, 'Monthly']].map(([name, price, frequency]) => <div className="pricing-card" key={name}><Flower2 /><h3>{name}</h3><strong>${price}</strong><p>{frequency} delivery, curated bouquet size, pause anytime, gift option, and local delivery support.</p><Link className="primary" to="/checkout">Choose Plan</Link></div>)}</div>;
}

function WhyChoose() {
  return <section><SectionHeading eyebrow="Why choose us" title="Built around trust, beauty, and conversion" /><div className="service-grid">{services.map((item) => <ServiceCard key={item} title={item} />)}</div></section>;
}

function ServiceCard({ title }) {
  return <Reveal className="service-card"><Leaf /><h3>{title}</h3><p>Warm demo copy that explains the service clearly for flower shoppers and business owners.</p></Reveal>;
}

function AreaChips() {
  return <div className="area-chips">{brand.areas.map((area) => <span key={area}><MapPin size={15} /> {area}</span>)}</div>;
}

function Testimonials() {
  return <section><SectionHeading eyebrow="Testimonials" title="Soft social proof without fake claims" /><div className="testimonial-row">{testimonials.map(([name, city, quote]) => <Reveal className="testimonial" key={name}><div className="rating"><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /></div><p>“{quote}”</p><strong>{name}</strong><span>{city}</span></Reveal>)}</div></section>;
}

function InstagramGrid({ expanded = false }) {
  const cats = ['Bouquets', 'Weddings', 'Events', 'Gift boxes', 'Store styling', 'Seasonal blooms', 'Preserved roses', 'Corporate flowers', 'Flower subscriptions'];
  return <section><SectionHeading eyebrow="Gallery" title="Instagram-style floral moments" /><div className="gallery-grid">{cats.slice(0, expanded ? cats.length : 6).map((item, index) => <Reveal className="gallery-card" key={item}><FlowerArt tone={['rose', 'lavender', 'cream', 'sage', 'gold', 'plum'][index % 6]} label={`${item} gallery image`} /><span>{item}</span></Reveal>)}</div></section>;
}

function Newsletter() {
  return <section className="newsletter"><h2>Join the Bloomé list</h2><p>Seasonal flower notes, gift reminders, wedding inspiration, and demo-only boutique updates.</p><form onSubmit={(e) => e.preventDefault()}><label>Email address<input type="email" placeholder="you@example.com" /></label><button className="primary" type="submit">Sign Up</button></form></section>;
}

function ConsultationForm() {
  return <div className="form-panel"><h2>Wedding consultation form</h2><DemoForm fields={['Full name', 'Email', 'Phone', 'Wedding date', 'Venue', 'City', 'Guest count', 'Budget range', 'Colour palette', 'Flower preferences', 'Inspiration upload demo field', 'Notes']} button="Submit consultation request" /></div>;
}

function DemoForm({ title, fields, button = 'Submit', onSuccess }) {
  const [sent, setSent] = useState(false);
  const submit = (event) => { event.preventDefault(); setSent(true); onSuccess?.(); };
  return <form className="demo-form" onSubmit={submit}>{title && <h2>{title}</h2>}{fields.map((field) => <label key={field}>{field}{field.toLowerCase().includes('message') || field === 'Notes' ? <textarea rows="4" /> : field.toLowerCase().includes('upload') ? <span className="upload"><Upload size={16} /> Upload placeholder</span> : <input type={field.toLowerCase().includes('email') ? 'email' : field.toLowerCase().includes('date') ? 'date' : 'text'} />}</label>)}<button className="primary" type="submit">{button}</button>{sent && <p className="success">Demo form submitted successfully.</p>}</form>;
}

function FAQ() {
  return <div className="faq">{['What is the same-day cutoff?', 'Can I send a gift message?', 'Do you deliver outside Toronto?', 'Are wedding consultations available?'].map((q, i) => <details key={q}><summary>{q}</summary><p>{i === 0 ? 'Same-day demo cutoff is 12 PM.' : 'Yes. This demo includes the workflow customers expect from a premium florist.'}</p></details>)}</div>;
}

function Reviews() {
  return <div className="reviews"><h2>Reviews</h2>{testimonials.map(([name, city, quote]) => <article key={name}><strong>{name}</strong><span>{city}</span><p>{quote}</p></article>)}</div>;
}

function EmptyState({ text, cta, label }) {
  return <div className="empty"><Flower2 /><p>{text}</p><Link className="primary" to={cta}>{label}</Link></div>;
}

function AuthPage({ title, text, register = false }) {
  return <PageShell title={title} eyebrow="Account demo" text={text}><Seo title={title} description={`${title} page for Bloomé by Ava demo accounts.`} /><div className="auth-card"><DemoForm fields={register ? ['Full name', 'Email', 'Password'] : ['Email', 'Password']} button={title} /><div className="button-row"><Link to="/customer-dashboard">Customer Dashboard</Link><Link to="/admin">Admin Dashboard</Link><Link to={register ? '/login' : '/register'}>{register ? 'Login' : 'Register'}</Link></div></div></PageShell>;
}

function Dashboard({ title, items }) {
  return <PageShell title={title} eyebrow="Account workspace" text="A polished demo dashboard for repeat flower customers."><Seo title={title} description={`${title} for Bloomé by Ava demo users.`} /><div className="dashboard-grid">{items.map((item, index) => <div className="dash-card" key={item}><PackageCheck /><p>{item}</p><strong>{index + 1}{item.includes('timeline') ? ' active' : ''}</strong></div>)}</div></PageShell>;
}

function AdminTable({ onEdit, onToast }) {
  return <div className="table-wrap"><table><thead><tr><th>Product</th><th>Category</th><th>Stock</th><th>Status</th><th>Actions</th></tr></thead><tbody>{products.slice(0, 8).map((p) => <tr key={p.id}><td>{p.name}</td><td>{p.category}</td><td>{p.stock}</td><td><select onChange={() => onToast('Demo order status updated')}><option>Active</option><option>Draft</option><option>Low stock</option></select></td><td><button onClick={onEdit}><Edit3 size={16} /></button><button onClick={() => onToast('Demo delete action shown')}><Trash2 size={16} /></button></td></tr>)}</tbody></table></div>;
}

function Modal({ title, children, onClose }) {
  return <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label={title}><div className="modal"><button className="modal-close" onClick={onClose} aria-label="Close modal"><X /></button><h2>{title}</h2>{children}</div></div>;
}

function FlowerLoader() {
  return <div className="loader" aria-label="Loading flowers"><Flower2 /></div>;
}

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Layout>
          <React.Suspense fallback={<FlowerLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/shop/:id" element={<ProductDetails />} />
              <Route path="/occasions" element={<Occasions />} />
              <Route path="/wedding-flowers" element={<Wedding />} />
              <Route path="/events-corporate" element={<Events />} />
              <Route path="/subscription" element={<Subscription />} />
              <Route path="/delivery-areas" element={<Delivery />} />
              <Route path="/about" element={<About />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/customer-dashboard" element={<CustomerDashboard />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
          </React.Suspense>
        </Layout>
      </CartProvider>
    </BrowserRouter>
  );
}

createRoot(document.getElementById('root')).render(<App />);
