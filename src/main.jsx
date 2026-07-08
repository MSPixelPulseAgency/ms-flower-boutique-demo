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
import { business } from './config/business';
import './styles/global.css';

const brand = {
  name: business.businessName,
  email: business.email,
  phone: business.phone,
  adminEmail: 'admin@bloombymaryam.ca',
  adminPassword: 'demo123',
  areas: business.deliveryAreas
};

const img = (id, fit = 'crop') => `https://images.unsplash.com/${id}?auto=format&fit=${fit}&w=1200&q=82`;

const productImages = [
  img('photo-1561181286-d3fee7d55364'),
  img('photo-1519378058457-4c29a0a2efac'),
  img('photo-1520763185298-1b434c919102'),
  img('photo-1517191434949-5e90cd67d2b6'),
  img('photo-1490750967868-88aa4486c946'),
  img('photo-1518895949257-7621c3c786d7'),
  img('photo-1525310072745-f49212b5ac6d'),
  img('photo-1508610048659-a06b669e3321'),
  img('photo-1468327768560-75b778cbb551'),
  img('photo-1525310072745-f49212b5ac6d'),
  img('photo-1526047932273-341f2a7631f9'),
  img('photo-1487070183336-b863922373d4'),
  img('photo-1518709779341-56cf4535e94b'),
  img('photo-1501004318641-b39e6451bec6'),
  img('photo-1494972308805-463bc619d34e'),
  img('photo-1495231916356-a86217efff12')
];

const products = [
  ['blush-rose-signature-bouquet', 'Blush Rose Signature Bouquet', 89, 'Rose', 'Blush', 'romance', 'Roses', true, 4.9, 'Soft blush roses, lisianthus, and airy greenery wrapped in cream paper.', 'Gratitude, romance, and tender celebration.'],
  ['maryams-garden-luxe-arrangement', 'Maryam’s Garden Luxe Arrangement', 145, 'Luxury', 'Pastel', 'birthday', 'Mixed', true, 5, 'A statement vase arrangement with roses, ranunculus, hydrangea, and seasonal accents.', 'Abundance, elegance, and unforgettable gifting.'],
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
  image: productImages[index],
  imageTone: ['rose', 'lavender', 'cream', 'sage', 'gold', 'plum'][index % 6],
  popular: index < 8,
  newest: index > 9,
  stock: index % 5 === 0 ? 'Limited' : 'Available'
}));

const occasionDetails = [
  ['Birthday', 'A joyful mix of colour, texture, and sparkle for milestone moments.', img('photo-1468327768560-75b778cbb551')],
  ['Anniversary', 'Romantic roses and premium stems for a soft, memorable surprise.', img('photo-1518895949257-7621c3c786d7')],
  ['Love & Romance', 'Deep rose, blush, and candlelit florals designed to feel personal.', img('photo-1520763185298-1b434c919102')],
  ['Sympathy', 'Calm white and green arrangements for gentle support and remembrance.', img('photo-1508610048659-a06b669e3321')],
  ['Funeral', 'Respectful florals arranged with quiet beauty and care.', img('photo-1490750967868-88aa4486c946')],
  ['Wedding', 'Bridal bouquets and ceremony blooms with a romantic studio finish.', img('photo-1526047932273-341f2a7631f9')],
  ['Get Well Soon', 'Fresh, cheerful stems that brighten hospital rooms and homes.', img('photo-1494972308805-463bc619d34e')],
  ['Thank You', 'Elegant little luxuries for hosts, teachers, teams, and friends.', img('photo-1501004318641-b39e6451bec6')],
  ['Graduation', 'Bright seasonal flowers for proud family celebrations.', img('photo-1561181286-d3fee7d55364')],
  ['New Baby', 'Soft pastels and sweet gift boxes for new parents.', img('photo-1519378058457-4c29a0a2efac')],
  ['Mother’s Day', 'Tender pinks, creams, and garden-style blooms for mom.', img('photo-1525310072745-f49212b5ac6d')],
  ['Valentine’s Day', 'Roses, preserved gifts, and romantic delivery moments.', img('photo-1518709779341-56cf4535e94b')],
  ['Christmas', 'Holiday textures, winter greens, and festive centrepieces.', img('photo-1512909006721-3d6018887383')],
  ['Housewarming', 'Fresh florals and plants that make a new space feel loved.', img('photo-1487070183336-b863922373d4')],
  ['Corporate Gifts', 'Polished arrangements for clients, teams, and front desks.', img('photo-1495231916356-a86217efff12')]
].map(([title, description, image]) => ({ title, description, image }));
const occasions = occasionDetails.map((item) => item.title);

const shopMenu = [
  ['Shop All', '/shop'],
  ['Best Sellers', '/shop?collection=best-sellers'],
  ['New Arrivals', '/shop?collection=new-arrivals'],
  ['Gift Boxes', '/shop?collection=gift-boxes'],
  ['Subscriptions', '/subscription']
];

const occasionPages = [
  ['birthday', 'Birthday', 'Joyful flowers for birthday surprises', 'Colour-rich bouquets, bloom boxes, and gift add-ons made for warm birthday deliveries.', 'Send Birthday Flowers', 'photo-1468327768560-75b778cbb551', 'Bright petals, soft wrap, and a celebratory note turn a simple delivery into a memorable birthday moment.'],
  ['anniversary', 'Anniversary', 'Romantic flowers for another beautiful year', 'Rose-forward arrangements, peonies, and luxury vases for intimate milestones.', 'Plan Anniversary Flowers', 'photo-1518895949257-7621c3c786d7', 'Soft blush, cream, and red palettes help every anniversary feel personal, polished, and lovingly chosen.'],
  ['wedding', 'Wedding', 'Wedding florals with a romantic studio finish', 'Bridal bouquets, ceremony moments, reception centrepieces, and floral installations for modern Canadian weddings.', 'Book Wedding Consultation', 'photo-1526047932273-341f2a7631f9', 'From first palette ideas to final delivery, the wedding pathway is designed for couples who want elegance without overwhelm.'],
  ['valentines-day', "Valentine's Day", 'Roses and keepsake gifts for Valentine’s Day', 'Red roses, preserved domes, blush bouquets, and romantic add-ons for February gifting.', 'Order Valentine Flowers', 'photo-1518709779341-56cf4535e94b', 'Classic romance meets a modern boutique checkout flow with gift messages and WhatsApp ordering.'],
  ['mothers-day', "Mother's Day", 'Soft flowers for Mother’s Day love', 'Tender pinks, creams, garden roses, and thoughtful arrangements for moms and mother figures.', 'Shop Mother’s Day', 'photo-1525310072745-f49212b5ac6d', 'Gentle floral textures, warm notes, and curated add-ons make this page ready for one of a florist’s busiest seasons.'],
  ['new-baby', 'New Baby', 'Pastel flowers for new beginnings', 'Sweet blush, cream, and lavender arrangements for new parents, hospital deliveries, and home welcomes.', 'Send New Baby Flowers', 'photo-1519378058457-4c29a0a2efac', 'Soft colours and calm delivery language make new baby gifting feel thoughtful and easy.'],
  ['graduation', 'Graduation', 'Celebration flowers for proud milestones', 'Bright seasonal stems, wrapped bouquets, and cheerful bloom boxes for graduation day.', 'Celebrate a Graduate', 'photo-1561181286-d3fee7d55364', 'A lively flower collection for family celebrations, school milestones, and proud photo moments.'],
  ['get-well-soon', 'Get Well Soon', 'Fresh blooms to brighten the room', 'Cheerful tulips, soft mixed bouquets, and easy-care arrangements for recovery wishes.', 'Send Get Well Flowers', 'photo-1494972308805-463bc619d34e', 'Uplifting colours, gentle copy, and clear delivery details help customers send comfort quickly.'],
  ['thank-you', 'Thank You', 'Elegant flowers for sincere appreciation', 'Petite boxes, orchids, and polished bouquets for hosts, teachers, teams, and friends.', 'Send Thanks', 'photo-1501004318641-b39e6451bec6', 'A refined gift collection that makes gratitude feel graceful, personal, and never generic.'],
  ['sympathy', 'Sympathy', 'Quiet florals for comfort and support', 'White lilies, roses, orchids, and soft greenery arranged with care and discretion.', 'Send Sympathy Flowers', 'photo-1508610048659-a06b669e3321', 'Calm design, respectful wording, and clear inquiry paths support sensitive ordering moments.'],
  ['funeral-flowers', 'Funeral Flowers', 'Respectful flowers for services and remembrance', 'Service arrangements, memorial table florals, and family delivery options in peaceful palettes.', 'Request Funeral Flowers', 'photo-1490750967868-88aa4486c946', 'The page keeps the tone gentle and practical, with WhatsApp support for urgent details.'],
  ['housewarming', 'Housewarming', 'Fresh flowers for a beautiful new home', 'Garden baskets, orchids, wildflower bouquets, and warm gift notes for new spaces.', 'Send Housewarming Flowers', 'photo-1487070183336-b863922373d4', 'Natural textures and easy-care options make a new home feel loved from the first delivery.'],
  ['congratulations', 'Congratulations', 'Flowers for wins worth celebrating', 'Bright bloom boxes, luxe arrangements, and premium wraps for promotions, launches, and good news.', 'Celebrate With Flowers', 'photo-1495231916356-a86217efff12', 'Confident colour and polished styling make celebration gifting feel modern and generous.'],
  ['corporate-gifts', 'Corporate Gifts', 'Polished floral gifts for clients and teams', 'Reception-ready arrangements, orchids, and branded-feeling floral gifts for professional moments.', 'Send Corporate Gifts', 'photo-1487070183336-b863922373d4', 'A trust-first page for client thank-yous, team appreciation, and refined business gifting.'],
  ['christmas', 'Christmas', 'Holiday flowers with winter warmth', 'Evergreen textures, festive centrepieces, white florals, and seasonal gift arrangements.', 'Shop Christmas Flowers', 'photo-1512909006721-3d6018887383', 'Holiday-ready imagery and practical ordering CTAs make seasonal flower campaigns easy to sell.'],
  ['easter', 'Easter', 'Spring flowers for Easter gatherings', 'Tulips, pastel roses, garden baskets, and table-friendly spring arrangements.', 'Shop Easter Flowers', 'photo-1520763185298-1b434c919102', 'Fresh spring tones and bright table styling support family gatherings and seasonal gifting.']
].map(([slug, title, headline, description, cta, imageId, banner]) => ({
  slug,
  title,
  headline,
  description,
  cta,
  image: img(imageId),
  banner
}));

const eventPages = [
  ['wedding-events', 'Wedding Events', 'Full-service wedding floral styling', 'Ceremony, reception, bridal party, and installation florals with a romantic boutique process.', 'photo-1511285560929-80b456fea0bc'],
  ['corporate-events', 'Corporate Events', 'Florals for polished business moments', 'Client events, launches, networking evenings, and branded spaces with refined seasonal flowers.', 'photo-1487070183336-b863922373d4'],
  ['birthday-parties', 'Birthday Parties', 'Celebration florals for milestone rooms', 'Cake table flowers, dinner table arrangements, entry moments, and bright party styling.', 'photo-1468327768560-75b778cbb551'],
  ['baby-shower', 'Baby Shower', 'Soft pastel flowers for sweet celebrations', 'Gentle floral moments for welcome signs, dessert tables, chair details, and gift corners.', 'photo-1519378058457-4c29a0a2efac'],
  ['bridal-shower', 'Bridal Shower', 'Romantic shower flowers for the bride-to-be', 'Garden-style centrepieces, soft photo moments, and gift table florals.', 'photo-1519741497674-611481863552'],
  ['engagement-party', 'Engagement Party', 'Romantic florals for yes-season celebrations', 'Roses, candles, table styling, and intimate floral focal points.', 'photo-1518895949257-7621c3c786d7'],
  ['anniversary-celebrations', 'Anniversary Celebrations', 'Elegant event flowers for meaningful years', 'Dinner party florals, luxury arrangements, and celebration styling for intimate gatherings.', 'photo-1507504031003-b417219a0fde'],
  ['hotel-floral-styling', 'Hotel Floral Styling', 'Lobby and hospitality flowers with presence', 'Large-format arrangements for lobbies, suites, concierge desks, and event spaces.', 'photo-1519167758481-83f550bb49b3'],
  ['restaurant-floral-styling', 'Restaurant Floral Styling', 'Table florals for elevated dining rooms', 'Low-profile arrangements designed for candles, menus, and guest conversation.', 'photo-1469371670807-013ccf25f16a'],
  ['office-weekly-flowers', 'Office Weekly Flowers', 'Recurring office florals made effortless', 'Weekly or bi-weekly arrangements for reception desks, boardrooms, and studio spaces.', 'photo-1495231916356-a86217efff12'],
  ['funeral-services', 'Funeral Services', 'Respectful florals for memorial services', 'Calm service arrangements, family flowers, and memorial table styling.', 'photo-1508610048659-a06b669e3321'],
  ['private-events', 'Private Events', 'Custom flowers for intimate gatherings', 'Dinner parties, showers, cultural celebrations, and bespoke home-hosted floral moments.', 'photo-1494972308805-463bc619d34e'],
  ['seasonal-events', 'Seasonal Events', 'Seasonal installations and holiday florals', 'Christmas, Easter, spring launches, autumn tables, and holiday-ready floral styling.', 'photo-1512909006721-3d6018887383']
].map(([slug, title, headline, description, imageId]) => ({
  slug,
  title,
  headline,
  description,
  image: img(imageId)
}));

const contactMenu = [
  ['Contact Us', '/contact'],
  ['About Us', '/about'],
  ['FAQ', '/delivery-areas#faq'],
  ['Gallery', '/gallery'],
  ['Blog', '/blog']
];

const headerDropdowns = [
  { key: 'shop', label: 'Shop', baseLabel: 'Shop All', base: '/shop', links: shopMenu.slice(1) },
  {
    key: 'occasions',
    label: 'Occasions',
    baseLabel: 'All Occasions',
    base: '/occasions',
    links: [
      ['Birthday', '/occasions/birthday'],
      ['Anniversary', '/occasions/anniversary'],
      ['Wedding', '/occasions/wedding'],
      ["Valentine's Day", '/occasions/valentines-day']
    ]
  },
  {
    key: 'events',
    label: 'Events',
    baseLabel: 'All Events',
    base: '/events-corporate',
    links: [
      ['Wedding Events', '/events/wedding-events'],
      ['Corporate Events', '/events/corporate-events'],
      ['Birthday Parties', '/events/birthday-parties'],
      ['Baby Showers', '/events/baby-shower']
    ]
  },
  { key: 'contact', label: 'Contact', baseLabel: 'Contact Us', base: '/contact', links: contactMenu.slice(1) }
];

const services = [
  ['Online flower delivery', 'A refined storefront flow for browsing, gifting, and checkout.', img('photo-1561181286-d3fee7d55364')],
  ['Same-day flower delivery', 'Clear cutoff messaging and local GTA delivery confidence.', img('photo-1490750967868-88aa4486c946')],
  ['Custom bouquets', 'Personalized colour palettes, stem choices, and gift notes.', img('photo-1519378058457-4c29a0a2efac')],
  ['Wedding flowers', 'Romantic florals for ceremonies, receptions, and portraits.', img('photo-1526047932273-341f2a7631f9')],
  ['Funeral and sympathy flowers', 'Soft white florals prepared with care and discretion.', img('photo-1508610048659-a06b669e3321')],
  ['Corporate flowers', 'Lobby, reception, and boardroom arrangements with premium polish.', img('photo-1487070183336-b863922373d4')],
  ['Event flowers', 'Floral moments for showers, engagements, birthdays, and launches.', img('photo-1468327768560-75b778cbb551')],
  ['Flower subscriptions', 'Recurring seasonal bouquets for homes and office spaces.', img('photo-1495231916356-a86217efff12')],
  ['Gift boxes', 'Flowers paired with small luxuries for thoughtful delivery.', img('photo-1501004318641-b39e6451bec6')],
  ['Preserved flowers', 'Keepsake roses and lasting gifts for milestone moments.', img('photo-1518709779341-56cf4535e94b')],
  ['Plants', 'Orchids and green gifts styled for easy care.', img('photo-1517191434949-5e90cd67d2b6')],
  ['Seasonal flowers', 'Fresh stems that change with Canadian seasons.', img('photo-1494972308805-463bc619d34e')],
  ['Holiday arrangements', 'Festive centrepieces and gifting for busy celebration weeks.', img('photo-1512909006721-3d6018887383')],
  ['Floral consultations', 'Guided planning for weddings, events, and custom palettes.', img('photo-1525310072745-f49212b5ac6d')],
  ['Delivery tracking', 'A reassuring customer flow for delivery timing, recipient details, and order follow-up.', img('photo-1520763185298-1b434c919102')],
  ['Personalized gift messages', 'Warm messages and add-ons built into the gifting journey.', img('photo-1518895949257-7621c3c786d7')]
].map(([title, description, image]) => ({ title, description, image }));

const weddingServices = [
  ['Bridal bouquets', 'Hand-tied garden bouquets with silk ribbon, soft movement, and photo-ready balance.', '$280+', img('photo-1526047932273-341f2a7631f9')],
  ['Bridesmaid bouquets', 'Coordinated smaller bouquets that echo the bridal palette without overpowering it.', '$125+ each', img('photo-1519741497674-611481863552')],
  ['Boutonnieres', 'Delicate floral accents finished with ribbon for the wedding party and family.', '$24+ each', img('photo-1519225421980-715cb0215aed')],
  ['Ceremony arches', 'Statement florals for arches, chuppahs, mantels, and intimate ceremony backdrops.', 'Custom package', img('photo-1511285560929-80b456fea0bc')],
  ['Aisle flowers', 'Petal moments, chair clusters, and aisle markers that guide the ceremony walk.', '$45+ each', img('photo-1464366400600-7168b8af9bc3')],
  ['Reception centrepieces', 'Low and airy table florals designed for conversation, candles, and place settings.', '$110+ each', img('photo-1469371670807-013ccf25f16a')],
  ['Sweetheart table flowers', 'Romantic focal florals for portraits, speeches, and the couple’s table.', '$350+', img('photo-1507504031003-b417219a0fde')],
  ['Floral installations', 'Hanging blooms, staircase styling, bar florals, and custom event focal points.', 'Included in custom package', img('photo-1519167758481-83f550bb49b3')]
].map(([title, description, price, image]) => ({ title, description, price, image }));

const eventServices = [
  ['Corporate weekly flowers', 'Rotating seasonal arrangements for reception desks, waiting rooms, and studios.', img('photo-1487070183336-b863922373d4')],
  ['Office reception flowers', 'Sculptural florals that make client-facing spaces feel calm and premium.', img('photo-1495231916356-a86217efff12')],
  ['Restaurant table arrangements', 'Low-profile table florals with candle-friendly height and durable stems.', img('photo-1469371670807-013ccf25f16a')],
  ['Hotel lobby flowers', 'Large-format arrangements styled for entry tables, consoles, and concierge desks.', img('photo-1519167758481-83f550bb49b3')],
  ['Baby showers', 'Soft pastel flower moments for dessert tables, welcome signs, and gifting corners.', img('photo-1519378058457-4c29a0a2efac')],
  ['Birthday events', 'Colour-forward florals that frame cake tables, dinner parties, and milestone rooms.', img('photo-1468327768560-75b778cbb551')],
  ['Engagement parties', 'Romantic rose and candle styling for intimate celebrations.', img('photo-1518895949257-7621c3c786d7')],
  ['Funeral services', 'Respectful arrangements for memorial tables, services, and family delivery.', img('photo-1508610048659-a06b669e3321')],
  ['Custom installations', 'Bespoke floral styling for launches, photoshoots, windows, and brand activations.', img('photo-1511285560929-80b456fea0bc')]
].map(([title, description, image]) => ({ title, description, image }));

const testimonials = [
  ['Nadia P.', 'Mississauga', 'The bouquet felt custom and elevated. The order flow is exactly what a premium flower shop needs.'],
  ['Alyssa M.', 'Toronto', 'Soft, romantic, and easy to shop on my phone. I loved the gift add-ons and delivery time choices.'],
  ['Priya S.', 'Brampton', 'The wedding inquiry page feels thoughtful and high-end without being overwhelming.']
];
const blogPosts = [
  ['How to Care for Fresh Flowers', 'Flower Care', 'Simple steps to keep roses, tulips, lilies, and mixed bouquets fresher for longer.', '4 min read', img('photo-1490750967868-88aa4486c946')],
  ['Best Flowers for Birthdays', 'Gift Guide', 'Colourful stems, keepsake boxes, and delivery ideas for every birthday personality.', '5 min read', img('photo-1468327768560-75b778cbb551')],
  ['Wedding Flower Trends in Canada', 'Weddings', 'Romantic palettes, garden-style aisles, and statement installations for modern Canadian weddings.', '6 min read', img('photo-1526047932273-341f2a7631f9')],
  ['Same-Day Flower Delivery Guide', 'Delivery', 'How cutoff times, delivery zones, and gift notes make last-minute flowers feel thoughtful.', '3 min read', img('photo-1561181286-d3fee7d55364')],
  ['Flower Colours and Their Meanings', 'Floral Meaning', 'A soft guide to choosing blush, white, lavender, red, yellow, and green arrangements.', '5 min read', img('photo-1520763185298-1b434c919102')],
  ['Best Floral Gifts for Mother’s Day', 'Seasonal Gifts', 'Elegant bouquet and add-on ideas for meaningful Mother’s Day delivery.', '4 min read', img('photo-1525310072745-f49212b5ac6d')]
].map(([title, category, excerpt, readTime, image]) => ({ title, category, excerpt, readTime, image, author: 'Maryam' }));
const galleryItems = [
  ['Bouquets', img('photo-1561181286-d3fee7d55364')],
  ['Weddings', img('photo-1526047932273-341f2a7631f9')],
  ['Events', img('photo-1519167758481-83f550bb49b3')],
  ['Gift boxes', img('photo-1501004318641-b39e6451bec6')],
  ['Store styling', img('photo-1487070183336-b863922373d4')],
  ['Seasonal blooms', img('photo-1494972308805-463bc619d34e')],
  ['Preserved roses', img('photo-1518709779341-56cf4535e94b')],
  ['Corporate flowers', img('photo-1495231916356-a86217efff12')],
  ['Flower subscriptions', img('photo-1519378058457-4c29a0a2efac')]
].map(([title, image]) => ({ title, image }));
const planDetails = [
  ['Weekly Blooms', 58, 'Weekly', 'A petite-to-classic rotating bouquet for desks, kitchens, and front counters.', img('photo-1495231916356-a86217efff12')],
  ['Bi-Weekly Blooms', 72, 'Every two weeks', 'A balanced seasonal arrangement for homes, studios, and recurring gifts.', img('photo-1519378058457-4c29a0a2efac')],
  ['Monthly Blooms', 95, 'Monthly', 'A fuller statement bouquet with premium stems and optional gift note.', img('photo-1525310072745-f49212b5ac6d')]
].map(([name, price, frequency, description, image]) => ({ name, price, frequency, description, image }));
const addOns = ['Greeting card', 'Chocolate box', 'Teddy bear', 'Candle', 'Balloon', 'Vase'];

const CartContext = createContext(null);
const useCart = () => useContext(CartContext);

const cleanPhone = (value) => value.replace(/[^\d]/g, '');
const currency = (value) => `$${Math.round(value)}`;
const itemSummary = (items) => items.length
  ? items.map((item) => {
      const addons = item.options?.selectedAddOns?.length ? ` | Add-ons: ${item.options.selectedAddOns.join(', ')}` : '';
      return `- ${item.name} | Qty: ${item.qty} | Price: ${currency(item.price)}${addons}`;
    }).join('\n')
  : '- Custom bouquet inquiry | Qty: 1 | Price: To be confirmed';

function buildOrderBody(details, items, total) {
  return [
    'New Flower Order Inquiry - Bloom by Maryam',
    '',
    `Customer full name: ${details.name || 'Not provided'}`,
    `Customer phone: ${details.phone || 'Not provided'}`,
    `Customer email: ${details.email || 'Not provided'}`,
    `Delivery address: ${details.address || 'Not provided'}`,
    `City: ${details.city || 'Not provided'}`,
    `Postal code: ${details.postal || 'Not provided'}`,
    `Preferred delivery date: ${details.date || 'Not provided'}`,
    `Preferred delivery time: ${details.time || 'Not provided'}`,
    '',
    'Selected products:',
    itemSummary(items),
    '',
    `Gift message: ${details.giftMessage || 'None'}`,
    `Occasion: ${details.occasion || 'Not provided'}`,
    `Special instructions: ${details.instructions || 'None'}`,
    `Estimated total: ${currency(total || 0)}`,
    '',
    'Submitted from Bloom by Maryam website'
  ].join('\n');
}

function mailtoHref(details, items, total) {
  const subject = 'New Flower Order Inquiry - Bloom by Maryam';
  return `mailto:${business.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(buildOrderBody(details, items, total))}`;
}

function whatsappHref(message) {
  return `https://wa.me/${cleanPhone(business.whatsappNumber)}?text=${encodeURIComponent(message)}`;
}

function productWhatsappMessage(product, qty = 1, giftMessage = '') {
  return [
    `Hi ${business.businessName}, I would like to place an order:`,
    `Product: ${product?.name || ''}`,
    `Quantity: ${qty}`,
    'Delivery Date:',
    'Delivery Area:',
    `Gift Message: ${giftMessage}`,
    'My Name:',
    'My Phone:'
  ].join('\n');
}

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
    document.title = `${title} | Bloom by Maryam`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', description);
  }, [title, description]);
  return null;
}

function LogoMark() {
  return <span className="logo-mark" aria-hidden="true"><i /><i /><i /><i /><b /></span>;
}

function Header() {
  const [open, setOpen] = useState(false);
  const [desktopOpen, setDesktopOpen] = useState('');
  const [mobileOpen, setMobileOpen] = useState('');
  const { items } = useCart();
  const headerRef = React.useRef(null);
  React.useEffect(() => {
    const onPointerDown = (event) => {
      if (!headerRef.current?.contains(event.target)) setDesktopOpen('');
    };
    document.addEventListener('pointerdown', onPointerDown, true);
    return () => document.removeEventListener('pointerdown', onPointerDown, true);
  }, []);
  const closeDesktop = () => setDesktopOpen('');
  const closeMobile = () => setOpen(false);
  return (
    <header className="site-header" ref={headerRef}>
      <Link className="brand" to="/" aria-label="Bloom by Maryam home"><LogoMark /><strong>{brand.name}</strong></Link>
      <nav className="desktop-nav" aria-label="Primary navigation">
        <NavLink to="/">Home</NavLink>
        {headerDropdowns.map((group) => (
          <div className="nav-dropdown" key={group.key}>
            <button type="button" onClick={() => setDesktopOpen(desktopOpen === group.key ? '' : group.key)} aria-expanded={desktopOpen === group.key} aria-haspopup="true">{group.label} <ChevronDown size={15} /></button>
            <AnimatePresence>
              {desktopOpen === group.key && (
                <motion.div className="mega-menu" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.16 }}>
                  <div className="mega-links">
                    <NavLink to={group.base} onClick={closeDesktop}>{group.baseLabel}</NavLink>
                    {group.links.map(([label, href]) => <NavLink key={`${group.key}-${href}-${label}`} to={href} onClick={closeDesktop}>{label}</NavLink>)}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </nav>
      <div className="header-actions">
        <Link className="cart-pill" to="/cart" aria-label={`Cart with ${items.length} items`}><ShoppingBag size={18} /><span>{items.length}</span><em>Order</em></Link>
        <a className="header-whatsapp whatsapp-action" href={whatsappHref(productWhatsappMessage({ name: 'Custom bouquet' }))}><MessageCircle size={17} /> WhatsApp</a>
        <button className="menu-button" type="button" onClick={() => setOpen(!open)} aria-label="Toggle mobile menu">{open ? <X /> : <Menu />}</button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav className="mobile-nav" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
            <NavLink to="/" onClick={closeMobile}>Home</NavLink>
            {headerDropdowns.map((group) => (
              <div className="mobile-accordion" key={group.key}>
                <button type="button" onClick={() => setMobileOpen(mobileOpen === group.key ? '' : group.key)} aria-expanded={mobileOpen === group.key}>{group.label}<ChevronDown size={16} /></button>
                <AnimatePresence>
                  {mobileOpen === group.key && (
                    <motion.div className="mobile-submenu" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                      <NavLink to={group.base} onClick={closeMobile}>{group.baseLabel}</NavLink>
                      {group.links.map(([label, href]) => <NavLink key={`${group.key}-mobile-${href}-${label}`} to={href} onClick={closeMobile}>{label}</NavLink>)}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
            <NavLink to="/cart" onClick={closeMobile}>Order Cart</NavLink>
            <a className="whatsapp-action" href={whatsappHref(productWhatsappMessage({ name: 'Custom bouquet' }))} onClick={closeMobile}>Order on WhatsApp</a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-cta"><span className="eyebrow">Bloom by Maryam concierge</span><h2>Ready to send something beautiful?</h2><p>No account needed. Build a cart, send an email inquiry, or start a WhatsApp order with Maryam’s boutique-style flow.</p><div className="button-row"><Link className="primary btn-large" to="/cart">Start Order Inquiry</Link><a className="whatsapp-action btn-large" href={whatsappHref(productWhatsappMessage({ name: 'Custom bouquet' }))}><MessageCircle size={18} /> Order on WhatsApp</a></div></div>
      <div>
        <Link className="brand footer-brand" to="/"><LogoMark /><strong>{brand.name}</strong></Link>
        <p>Premium Canadian flower boutique experience. Elegant bouquets, wedding florals, gifts, subscriptions, and same-day GTA delivery pathways.</p>
      </div>
      <div><h3>Shop</h3><Link to="/shop">Shop all flowers</Link><Link to="/occasions/wedding">Wedding flowers</Link><Link to="/subscription">Subscriptions</Link><Link to="/delivery-areas">Delivery areas</Link></div>
      <div><h3>Explore</h3><Link to="/occasions/birthday">Birthday flowers</Link><Link to="/events/corporate-events">Corporate events</Link><Link to="/gallery">Gallery</Link><Link to="/blog">Floral journal</Link></div>
      <div><h3>Contact</h3><p><Mail size={16} /> {brand.email}</p><p><Phone size={16} /> {brand.phone}</p><p><MessageCircle size={16} /> +1 (437) 973-1724</p><p><Instagram size={16} /> Instagram</p></div>
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
      <a className="floating-whatsapp" href={whatsappHref(productWhatsappMessage({ name: 'Custom bouquet' }))} aria-label="Order on WhatsApp"><MessageCircle /></a>
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

function ImageFrame({ src, alt, className = '', children }) {
  return (
    <div className={`image-frame ${className}`}>
      <img src={src} alt={alt} loading="lazy" />
      {children}
    </div>
  );
}

function ProductCard({ product }) {
  const { add } = useCart();
  return (
    <Reveal className="product-card">
      <Link to={`/shop/${product.id}`} className="product-image">
        <ImageFrame src={product.image} alt={`${product.name} floral arrangement`} />
        <div className="badge-stack">{product.sameDay && <em>Same-day</em>}{product.stock === 'Limited' && <em className="sale-badge">Limited</em>}</div>
      </Link>
      <div className="product-meta">
        <div><p>{product.category}</p><h3>{product.name}</h3></div>
        <button aria-label={`Save ${product.name} to wishlist`}><Heart size={18} /></button>
      </div>
      <p className="product-copy">{product.description}</p>
      <div className="rating"><Star size={16} fill="currentColor" /> {product.rating} · {product.colour} · {product.flowerType}</div>
      <div className="product-actions"><strong>${product.price}</strong><Link to={`/shop/${product.id}`}>Quick View</Link><button type="button" onClick={() => add(product)}>Add to Cart</button><a className="whatsapp-action" href={whatsappHref(productWhatsappMessage(product))}>WhatsApp</a></div>
    </Reveal>
  );
}

function Home() {
  return (
    <>
      <Seo title="Fresh Blooms, Beautifully Delivered" description="Premium girl-owned Canadian flower boutique for bouquets, wedding flowers, gifts, subscriptions, and GTA flower delivery." />
      <section className="hero">
        <PetalAnimation />
        <div className="hero-copy">
          <span className="eyebrow">Girl-owned Canadian flower boutique</span>
          <h1>Fresh Blooms, Beautifully Delivered</h1>
          <p>A girl-owned Canadian floral boutique creating elegant bouquets, wedding flowers, and thoughtful gifts for life’s most beautiful moments.</p>
          <div className="button-row"><Link className="primary btn-large" to="/shop">Shop Flowers</Link><a className="whatsapp-action btn-large" href={whatsappHref(productWhatsappMessage({ name: 'Custom bouquet' }))}>Order by WhatsApp</a><Link className="secondary btn-large" to="/occasions/wedding">Book Wedding Consultation</Link></div>
          <div className="same-day"><Truck size={18} /> Same-day GTA delivery before {business.sameDayCutoff}. No account needed.</div>
        </div>
        <div className="hero-visual"><ImageFrame src={img('photo-1525310072745-f49212b5ac6d')} alt="Luxury blush floral bouquet on a boutique studio table" className="hero-photo" /><div className="floating-stat"><Sparkles /> 16 curated bouquets ready to shop</div><div className="floating-stat second"><MapPin /> Toronto and GTA delivery</div></div>
      </section>
      <section><SectionHeading eyebrow="Best sellers" title="Bouquets customers love first" text="Customer-ready bouquets with ratings, colour tags, thoughtful add-ons, and same-day delivery badges." /><div className="product-grid">{products.slice(0, 4).map((product) => <ProductCard key={product.id} product={product} />)}</div></section>
      <section className="soft-band"><SectionHeading eyebrow="Occasions" title="Shop by the moment" /><div className="occasion-grid">{occasionDetails.slice(0, 8).map((item) => <OccasionCard key={item.title} item={item} />)}</div></section>
      <section className="split"><Reveal><span className="eyebrow">Wedding floral studio</span><h2>Romantic florals for ceremonies, receptions, and intimate celebrations.</h2><p>From silk-wrapped bridal bouquets to candlelit centrepieces, the wedding occasion page feels like a real consultation pathway for high-intent couples.</p><Link className="primary" to="/occasions/wedding">Explore Weddings</Link></Reveal><Reveal className="feature-panel"><ImageFrame src={img('photo-1526047932273-341f2a7631f9')} alt="Romantic wedding bouquet with soft cream flowers" /></Reveal></section>
      <section><SectionHeading eyebrow="Subscriptions" title="Fresh flowers on a rhythm" text="Weekly, bi-weekly, and monthly plans make recurring revenue easy to present to flower business owners." /><PlanGrid /></section>
      <WhyChoose />
      <section className="soft-band delivery-preview"><SectionHeading eyebrow="Delivery" title="Designed for local GTA flower shoppers" /><div className="split compact"><ImageFrame src={img('photo-1561181286-d3fee7d55364')} alt="Fresh flower delivery bouquet wrapped for local GTA delivery" /><div><h3>Same-day clarity at a glance</h3><p>Delivery pages and banners highlight the 12 PM cutoff, GTA area coverage, fee expectations, and easy contact options so local shoppers can decide quickly.</p><AreaChips /></div></div></section>
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
    <PageShell title="Shop Flowers" eyebrow="Online flower delivery" text="Search, filter, and shop bouquets with elegant controls built for quick mobile gifting.">
      <Seo title="Shop Flowers" description="Shop bouquets, roses, orchids, tulips, wedding flowers, preserved roses, and gift boxes with GTA same-day delivery." />
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
    <Seo title={product.name} description={`${product.name} product page with size options, gift add-ons, delivery date, message, care instructions, and reviews.`} />
      <div className="product-detail">
        <div className="gallery-detail"><ImageFrame src={product.image} alt={`${product.name} large floral image`} />{[0, 1, 2].map((i) => <ImageFrame key={i} src={productImages[(products.indexOf(product) + i + 1) % productImages.length]} alt={`${product.name} floral detail thumbnail ${i + 1}`} />)}</div>
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
          <div className="detail-actions"><button className="primary full" type="button" onClick={() => Array.from({ length: qty }).forEach(() => add({ ...product, price }, { size, selectedAddOns }))}>Add to Cart</button><Link className="secondary full" to="/cart">Order Inquiry</Link><a className="whatsapp-action full" href={whatsappHref(productWhatsappMessage(product, qty))}>Order on WhatsApp</a></div>
          <div className="info-list"><p><Leaf /> Care instructions included with every bouquet.</p><p><PackageCheck /> Freshness guidance included with every arrangement.</p><p><Truck /> Same-day delivery before 12 PM where available.</p></div>
        </div>
      </div>
      <Reviews />
    </PageShell>
  );
}

function Occasions() {
  return <PageShell title="Flowers by Occasion" eyebrow="Thoughtful gifting" text="Image-rich category cards for every high-intent shopping moment." image={img('photo-1520763185298-1b434c919102')} ctaLabel="Shop Occasion Flowers" ctaTo="/shop" secondaryLabel="Order on WhatsApp" secondaryHref={whatsappHref(productWhatsappMessage({ name: 'Occasion flowers' }))}><Seo title="Flowers by Occasion" description="Shop flower occasion categories including birthday, anniversary, sympathy, funeral, wedding, get well, thank you, holidays, and corporate gifts." /><div className="occasion-grid large">{occasionPages.map((item) => <OccasionCard item={item} key={item.title} />)}</div></PageShell>;
}

function OccasionLanding() {
  const { slug } = useParams();
  const occasion = occasionPages.find((item) => item.slug === slug) || occasionPages[0];
  const collection = products.filter((product) => product.occasion === occasion.slug || product.occasion === occasion.slug.replace('-flowers', '') || product.category.toLowerCase().includes(occasion.title.toLowerCase().split(' ')[0].replace("'", ''))).slice(0, 4);
  const picks = collection.length >= 3 ? collection : products.filter((product) => ['Luxury', 'Gift Box', 'Rose', 'Wedding', 'Sympathy', 'Plants'].includes(product.category)).slice(0, 4);
  return (
    <PageShell title={occasion.headline} eyebrow={`${occasion.title} flowers`} text={occasion.description} image={occasion.image} ctaLabel={occasion.cta} ctaTo="/order-inquiry" secondaryLabel="Order on WhatsApp" secondaryHref={whatsappHref(`Hi ${business.businessName}, I would like help with ${occasion.title} flowers.\nDelivery Date:\nDelivery Area:\nBudget:\nMy Name:\nMy Phone:`)}>
      <Seo title={`${occasion.title} Flowers`} description={`${occasion.description} Same-day floral inquiry options for ${occasion.title.toLowerCase()} flowers in Toronto and the GTA.`} />
      <div className="landing-banner"><ImageFrame src={occasion.image} alt={`${occasion.title} premium floral banner`} /><div><span className="eyebrow">Curated collection</span><h2>{occasion.banner}</h2><p>Choose a prepared arrangement or request a custom palette. Every order path includes gift message support, delivery timing, and WhatsApp follow-up.</p><div className="button-row"><Link className="primary" to="/shop">Browse Flowers</Link><a className="whatsapp-action" href={whatsappHref(`Hi ${business.businessName}, I need ${occasion.title} flowers.\nPreferred Colours:\nDelivery Area:\nMy Name:\nMy Phone:`)}>WhatsApp {occasion.title}</a></div></div></div>
      <SectionHeading eyebrow="Recommended flowers" title={`${occasion.title} collection`} text="A polished selection of bouquets and gifts that fit this occasion." />
      <div className="product-grid">{picks.map((product) => <ProductCard key={`${occasion.slug}-${product.id}`} product={product} />)}</div>
      <div className="cta-panel"><h2>Need something custom?</h2><p>Share the occasion, delivery city, preferred palette, and budget. Maryam can shape a personal floral recommendation through email or WhatsApp.</p><div className="button-row"><Link className="primary" to="/order-inquiry">Send Order Inquiry</Link><a className="whatsapp-action" href={whatsappHref(`Hi ${business.businessName}, I would like a custom ${occasion.title} flower order.\nOccasion:\nDelivery Date:\nDelivery Area:\nBudget:\nMy Name:\nMy Phone:`)}>Order on WhatsApp</a></div></div>
    </PageShell>
  );
}

function Wedding() {
  return (
    <PageShell title="Wedding Flowers" eyebrow="Romantic floral studio" text="A graceful wedding inquiry experience for bridal bouquets, ceremony flowers, reception centrepieces, and installations.">
      <Seo title="Wedding Flowers" description="Wedding flower page with bridal bouquets, ceremony arches, reception centrepieces, installations, packages, gallery, and consultation form." />
      <div className="service-grid wedding-services">{weddingServices.map((item) => <ServiceCard key={item.title} {...item} />)}</div>
      <div className="pricing-grid">{[
        ['Petite Ceremony', 1200, 'For city hall, intimate restaurants, and small ceremonies.', ['Bridal bouquet', 'Boutonniere set', 'Pickup or local delivery'], img('photo-1519741497674-611481863552')],
        ['Signature Wedding', 2800, 'A balanced ceremony and reception floral plan for modern GTA weddings.', ['Personal flowers', 'Ceremony focal blooms', 'Reception centrepieces'], img('photo-1469371670807-013ccf25f16a')],
        ['Luxe Floral Weekend', 5200, 'High-touch floral styling for full wedding weekends and statement installations.', ['Design consultation', 'Installations', 'Setup and strike support'], img('photo-1519167758481-83f550bb49b3')]
      ].map(([plan, price, copy, features, image], i) => <div className={`pricing-card wedding-package ${i === 1 ? 'featured' : ''}`} key={plan}><ImageFrame src={image} alt={`${plan} wedding floral package`} /><h3>{plan}</h3>{i === 1 && <span className="recommended">Recommended</span>}<strong>${price}+</strong><p>{copy}</p><ul>{features.map((f) => <li key={f}>{f}</li>)}</ul><Link className={i === 1 ? 'primary' : 'secondary'} to="/contact">Email Inquiry</Link><a className="whatsapp-action" href={whatsappHref(`Hi ${business.businessName}, I would like to ask about ${plan} wedding flowers.\nWedding Date:\nVenue:\nCity:\nGuest Count:\nMy Name:\nMy Phone:`)}>WhatsApp Wedding Inquiry</a></div>)}</div>
      <ConsultationForm />
    </PageShell>
  );
}

function Events() {
  return <PageShell title="Events & Corporate Flowers" eyebrow="Polished recurring florals" text="Corporate, hospitality, celebration, and sympathy floral services presented for lead generation." image={img('photo-1519167758481-83f550bb49b3')} ctaLabel="Plan Event Flowers" ctaTo="/events/corporate-events" secondaryLabel="WhatsApp Event Inquiry" secondaryHref={whatsappHref(`Hi ${business.businessName}, I need event flowers.\nEvent Type:\nDate:\nCity:\nGuest Count:\nMy Name:\nMy Phone:`)}><Seo title="Events and Corporate Flowers" description="Corporate weekly flowers, office reception flowers, restaurant arrangements, hotel lobby flowers, baby showers, birthdays, engagements, funeral services, and installations." /><div className="service-grid">{eventPages.map((item) => <EventCard key={item.slug} item={item} />)}</div><div className="cta-panel"><h2>Planning an event?</h2><p>Send a quick inquiry with your date, city, guest count, and floral style. Maryam can respond with a polished quote pathway.</p><a className="whatsapp-action" href={whatsappHref(`Hi ${business.businessName}, I need event flowers.\nEvent Type:\nDate:\nCity:\nGuest Count:\nMy Name:\nMy Phone:`)}>WhatsApp Event Inquiry</a></div></PageShell>;
}

function EventLanding() {
  const { slug } = useParams();
  const event = eventPages.find((item) => item.slug === slug) || eventPages[0];
  const packages = [
    ['Petite Styling', '$350+', 'A focused floral moment for small gatherings, welcome tables, or intimate dinners.'],
    ['Signature Event', '$950+', 'Coordinated arrangements for tables, entry areas, and key photo moments.'],
    ['Luxe Installation', 'Custom', 'Statement floral styling for hospitality spaces, launches, weddings, and full-room impact.']
  ];
  return (
    <PageShell title={event.headline} eyebrow={event.title} text={event.description} image={event.image} ctaLabel="Start Event Inquiry" ctaTo="/order-inquiry" secondaryLabel="WhatsApp Event" secondaryHref={whatsappHref(`Hi ${business.businessName}, I would like to inquire about ${event.title}.\nDate:\nVenue:\nCity:\nGuest Count:\nBudget:\nMy Name:\nMy Phone:`)}>
      <Seo title={event.title} description={`${event.description} Premium event floral inquiry page for Toronto and GTA clients.`} />
      <div className="landing-banner"><ImageFrame src={event.image} alt={`${event.title} floral styling hero`} /><div><span className="eyebrow">Event design pathway</span><h2>Flowers shaped around the room, the guests, and the mood.</h2><p>Bloom by Maryam can support focal arrangements, table florals, recurring hospitality flowers, and custom installations with a calm inquiry-first flow.</p></div></div>
      <SectionHeading eyebrow="Gallery" title={`${event.title} inspiration`} text="A concise visual set showing how this service can feel in a premium florist website." />
      <div className="gallery-grid">{[event.image, img('photo-1469371670807-013ccf25f16a'), img('photo-1507504031003-b417219a0fde')].map((image, index) => <Reveal className="gallery-card" key={`${event.slug}-${index}`}><ImageFrame src={image} alt={`${event.title} floral gallery ${index + 1}`} /><span>{['Feature flowers', 'Table styling', 'Room moment'][index]}</span></Reveal>)}</div>
      <SectionHeading eyebrow="Packages" title="Event floral packages" />
      <div className="pricing-grid">{packages.map(([title, price, copy]) => <div className="pricing-card" key={title}><h3>{title}</h3><strong>{price}</strong><p>{copy}</p><Link className="primary" to="/order-inquiry">Request Package</Link></div>)}</div>
      <div className="cta-panel"><h2>Share your event details</h2><p>Send the date, venue, city, guest count, colour palette, and budget range for a tailored floral inquiry.</p><a className="whatsapp-action" href={whatsappHref(`Hi ${business.businessName}, I would like ${event.title} flowers.\nDate:\nVenue:\nCity:\nGuest Count:\nStyle:\nBudget:\nMy Name:\nMy Phone:`)}>WhatsApp Inquiry</a></div>
    </PageShell>
  );
}

function Subscription() {
  return <PageShell title="Flower Subscription" eyebrow="Fresh flowers on repeat" text="Recurring bouquet plans for homes, offices, gifting, and hospitality spaces. No account required to request a subscription."><Seo title="Flower Subscription" description="Weekly, bi-weekly, and monthly flower subscription plans with pause anytime, gift options, and local delivery." /><PlanGrid /><div className="cta-panel"><h2>Request a subscription</h2><p>Choose a cadence and send an inquiry by email or WhatsApp. A production form handler can be connected later without redesigning the experience.</p><Link className="primary" to="/cart">Start Subscription Inquiry</Link></div></PageShell>;
}

function Delivery() {
  const [postal, setPostal] = useState('');
  return (
    <PageShell title="Delivery Areas" eyebrow="GTA same-day delivery" text="Local delivery guidance with a postal checker, delivery fees, cutoff timing, and service FAQs.">
      <Seo title="Delivery Areas" description="Same-day flower delivery for Toronto, Brampton, Mississauga, Vaughan, Markham, Richmond Hill, North York, Etobicoke, and Scarborough." />
      <div className="delivery-layout"><ImageFrame src={img('photo-1561181286-d3fee7d55364')} alt="Wrapped flowers ready for delivery across the GTA" /><div className="checker"><h2>Postal code checker</h2><label>Enter postal code<input value={postal} onChange={(e) => setPostal(e.target.value)} placeholder="M5V 2T6" /></label><p>{postal ? 'Great news: this postal code is inside the sample GTA delivery zone.' : `Same-day delivery cutoff is ${business.sameDayCutoff}.`}</p><a className="whatsapp-action" href={whatsappHref(`Hi ${business.businessName}, can you deliver flowers to my postal code?\nPostal Code:\nDelivery Date:\nMy Name:\nMy Phone:`)}>Ask on WhatsApp</a></div></div>
      <div className="pricing-grid">{['Toronto core $14', 'GTA nearby $18', 'Extended GTA $24'].map((fee) => <div className="pricing-card" key={fee}><Truck /><h3>{fee}</h3><p>Clear delivery fee guidance helps customers choose the right flower delivery option.</p></div>)}</div><AreaChips /><FAQ />
    </PageShell>
  );
}

function About() {
  return <PageShell title="About Maryam" eyebrow="Founder story" text="Bloom by Maryam is a girl-owned Canadian flower boutique shaped around graceful design, thoughtful gifting, and reliable GTA delivery."><Seo title="About" description="Professional brand story for Bloom by Maryam, a girl-owned Canadian floral boutique focused on elegant design, sustainability, GTA delivery, and personal service." /><div className="split"><Reveal><h2>Flowers with softness, intention, and a personal touch.</h2><p>Maryam started Bloom by Maryam to make premium florals feel warm and approachable. Every bouquet is designed to feel chosen with care, from a soft birthday wrap to a full wedding floral story.</p><p>The boutique philosophy is simple: use beautiful seasonal flowers, keep the palette refined, package every detail thoughtfully, and make ordering feel calm for busy gift-givers across Toronto and the GTA.</p><div className="button-row"><Link className="primary" to="/shop">Shop Flowers</Link><a className="whatsapp-action" href={whatsappHref(productWhatsappMessage({ name: 'Custom bouquet' }))}>Ask Maryam on WhatsApp</a></div></Reveal><Reveal className="feature-panel"><ImageFrame src={img('photo-1487070183336-b863922373d4')} alt="Founder-style floral studio table with flowers and tools" /></Reveal></div><div className="service-grid">{[
    ['Brand story', 'A modern Canadian floral studio built around meaningful gifts, romantic textures, and boutique service.', img('photo-1525310072745-f49212b5ac6d')],
    ['Mission', 'To help customers send flowers that feel personal, polished, fresh, and easy to order.', img('photo-1501004318641-b39e6451bec6')],
    ['Floral philosophy', 'Soft movement, balanced colour, premium stems, and arrangements that feel elegant without feeling overly formal.', img('photo-1490750967868-88aa4486c946')],
    ['GTA delivery', 'Clear delivery areas, same-day cutoff guidance, and practical order details for Toronto and nearby cities.', img('photo-1561181286-d3fee7d55364')],
    ['Sustainability', 'Seasonal choices, careful stem planning, and thoughtful packaging keep waste lower wherever possible.', img('photo-1519378058457-4c29a0a2efac')],
    ['Why choose us', 'A warm owner-led experience with custom bouquet support, wedding inquiries, and WhatsApp ordering.', img('photo-1520763185298-1b434c919102')]
  ].map(([title, description, image]) => <ServiceCard key={title} title={title} description={description} image={image} />)}</div></PageShell>;
}

function Gallery() {
  return <PageShell title="Gallery" eyebrow="Floral inspiration" text="A polished image-style grid for bouquets, weddings, events, gift boxes, store styling, and seasonal blooms."><Seo title="Gallery" description="Gallery for bouquets, weddings, events, gift boxes, store styling, and seasonal blooms." /><InstagramGrid expanded /></PageShell>;
}

function Blog() {
  return <PageShell title="Floral Journal" eyebrow="Helpful flower content" text="Flower care, gifting, wedding planning, and local delivery articles for thoughtful shoppers."><Seo title="Blog" description="Flower care, birthday flowers, wedding trends, same-day delivery, flower meanings, and Mother's Day gift ideas." /><div className="blog-grid">{blogPosts.map((post) => <article className="blog-card" key={post.title}><ImageFrame src={post.image} alt={`${post.title} flower lifestyle article`} /><div className="blog-meta"><span>{post.category}</span><small>{post.readTime} · By {post.author}</small></div><h3>{post.title}</h3><p>{post.excerpt}</p><Link className="secondary" to="/contact">Read Article</Link></article>)}</div></PageShell>;
}

function Contact() {
  return (
    <PageShell title="Contact Bloom by Maryam" eyebrow="We would love to help" text="Contact paths for orders, weddings, events, subscriptions, and delivery questions.">
      <Seo title="Contact" description="Contact Bloom by Maryam flower boutique by form, phone, email, WhatsApp, business hours, Instagram, and location section." />
      <div className="contact-layout"><DemoForm title="Send a message" fields={['Full name', 'Email', 'Phone', 'Message']} /><div className="contact-card"><ImageFrame src={img('photo-1519378058457-4c29a0a2efac')} alt="Bloom by Maryam studio flowers prepared for customer pickup" /><p><Phone /> {brand.phone}</p><p><Mail /> {brand.email}</p><p><Clock /> Mon-Sat 9 AM - 6 PM</p><p><MapPin /> Toronto GTA studio location</p><div className="map-placeholder">Toronto GTA floral delivery area</div><div className="button-row"><Link className="primary" to="/order-inquiry">Email Order</Link><a className="whatsapp-action" href={whatsappHref(productWhatsappMessage({ name: 'Custom bouquet' }))}>WhatsApp Order</a></div></div></div>
    </PageShell>
  );
}

function Cart() {
  const { items, total, updateQty, remove } = useCart();
  return <PageShell title="Cart & Order Inquiry" eyebrow="No account required" text="Review your flowers, then send an order inquiry by email or WhatsApp.">
    <Seo title="Cart and Order Inquiry" description="No-login flower order inquiry cart with email and WhatsApp order options." />
    {items.length === 0 ? <EmptyState text="Your cart is ready for fresh blooms. You can still send a custom bouquet inquiry." cta="/shop" label="Shop flowers" /> : <div className="cart-layout"><div>{items.map((item) => <div className="cart-row" key={item.key}><ImageFrame src={item.image} alt={`${item.name} cart thumbnail`} /><div><h3>{item.name}</h3><p>{item.options?.size || 'Classic'} · ${currency(item.price)}</p></div><div className="quantity"><button onClick={() => updateQty(item.key, item.qty - 1)}>-</button><span>{item.qty}</span><button onClick={() => updateQty(item.key, item.qty + 1)}>+</button></div><button onClick={() => remove(item.key)} aria-label={`Remove ${item.name}`}><Trash2 /></button></div>)}</div><aside className="summary"><h2>Inquiry summary</h2><p>Subtotal <strong>{currency(total)}</strong></p><p>Delivery estimate <strong>$14</strong></p><p>Estimated HST <strong>{currency(total * 0.13)}</strong></p><h3>Estimated total {currency(total + 14 + total * 0.13)}</h3><Link className="primary full" to="/order-inquiry">Continue to Order Inquiry</Link><a className="whatsapp-action full" href={whatsappHref(productWhatsappMessage({ name: items.map((item) => `${item.name} x${item.qty}`).join(', ') || 'Custom bouquet' }))}>Order on WhatsApp</a></aside></div>}
  </PageShell>;
}

function OrderInquiry() {
  const { items, total } = useCart();
  const [sent, setSent] = useState(false);
  const [details, setDetails] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    postal: '',
    date: '',
    time: '10 AM - 1 PM',
    occasion: '',
    giftMessage: '',
    instructions: ''
  });
  const estimatedTotal = total ? total + 14 + total * 0.13 : 0;
  const emailLink = mailtoHref(details, items, estimatedTotal);
  const whatsappLink = whatsappHref(buildOrderBody(details, items, estimatedTotal));
  const update = (key, value) => setDetails((current) => ({ ...current, [key]: value }));
  return (
    <PageShell title="Order Inquiry" eyebrow="Email or WhatsApp" text="No login required. Fill in delivery details, then send the prepared email or WhatsApp message.">
      <Seo title="Order Inquiry" description="Bloom by Maryam no-login flower order inquiry form with mailto and WhatsApp fallback." />
      <div className="order-layout">
        <form className="demo-form order-form" onSubmit={(event) => { event.preventDefault(); setSent(true); }}>
          <h2>Delivery details</h2>
          <div className="form-grid"><label>Customer full name<input value={details.name} onChange={(e) => update('name', e.target.value)} required /></label><label>Customer phone<input value={details.phone} onChange={(e) => update('phone', e.target.value)} required /></label></div>
          <label>Customer email<input type="email" value={details.email} onChange={(e) => update('email', e.target.value)} /></label>
          <label>Delivery address<input value={details.address} onChange={(e) => update('address', e.target.value)} /></label>
          <div className="form-grid"><label>City<input value={details.city} onChange={(e) => update('city', e.target.value)} placeholder={business.city} /></label><label>Postal code<input value={details.postal} onChange={(e) => update('postal', e.target.value)} /></label></div>
          <div className="form-grid"><label>Preferred delivery date<input type="date" value={details.date} onChange={(e) => update('date', e.target.value)} /></label><label>Preferred delivery time<select value={details.time} onChange={(e) => update('time', e.target.value)}><option>10 AM - 1 PM</option><option>1 PM - 4 PM</option><option>4 PM - 7 PM</option></select></label></div>
          <label>Occasion<input value={details.occasion} onChange={(e) => update('occasion', e.target.value)} placeholder="Birthday, sympathy, wedding, thank you..." /></label>
          <label>Gift message<textarea rows="3" value={details.giftMessage} onChange={(e) => update('giftMessage', e.target.value)} /></label>
          <label>Special instructions<textarea rows="4" value={details.instructions} onChange={(e) => update('instructions', e.target.value)} placeholder="Add-ons, colours, recipient notes, delivery instructions..." /></label>
          <button className="primary" type="submit">Prepare Order Inquiry</button>
          {sent && <div className="success order-success"><Sparkles /><span>Order inquiry prepared. Use email or WhatsApp below to send it.</span></div>}
        </form>
        <aside className="summary order-summary">
          <h2>Prepared inquiry</h2>
          <pre>{buildOrderBody(details, items, estimatedTotal)}</pre>
          <a className="primary full" href={emailLink}>Send Email Inquiry</a>
          <a className="whatsapp-action full" href={whatsappLink}>Order on WhatsApp</a>
          <p className="integration-note">This inquiry can be sent by email or WhatsApp. A production form handler can be connected when live email sending is required.</p>
        </aside>
      </div>
    </PageShell>
  );
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

function PageShell({ eyebrow, title, text, image = img('photo-1561181286-d3fee7d55364'), ctaLabel = 'Start Order Inquiry', ctaTo = '/order-inquiry', secondaryLabel = 'Order on WhatsApp', secondaryHref = whatsappHref(productWhatsappMessage({ name: title })), children }) {
  return (
    <>
      <section className="page-hero">
        <div className="page-hero-copy">
          <span className="eyebrow">{eyebrow}</span>
          <h1>{title}</h1>
          <p>{text}</p>
          <div className="button-row"><Link className="primary btn-large" to={ctaTo}>{ctaLabel}</Link><a className="whatsapp-action btn-large" href={secondaryHref}><MessageCircle size={18} /> {secondaryLabel}</a></div>
          <div className="trust-row"><span><Truck size={15} /> Same-day before {business.sameDayCutoff}</span><span><MapPin size={15} /> Toronto + GTA</span><span><Heart size={15} /> Custom gift messages</span></div>
        </div>
        <Reveal className="page-hero-media"><ImageFrame src={image} alt={`${title} premium flower hero`} /></Reveal>
      </section>
      <section>{children}</section>
    </>
  );
}

function Select({ label, value, onChange, options }) {
  return <label>{label}<select value={value} onChange={(e) => onChange(e.target.value)}>{options.map((item) => <option key={item} value={item}>{item}</option>)}</select></label>;
}

function PlanGrid() {
  return <div className="pricing-grid">{planDetails.map(({ name, price, frequency, description, image }) => <div className="pricing-card" key={name}><ImageFrame src={image} alt={`${name} flower subscription arrangement`} /><h3>{name}</h3><strong>${price}</strong><p>{frequency} delivery. {description} Pause anytime, add a gift option, and keep the delivery cadence simple.</p><Link className="primary" to="/order-inquiry">Request Plan</Link><a className="whatsapp-action" href={whatsappHref(`Hi ${business.businessName}, I would like to request the ${name} subscription.\nDelivery Area:\nStart Date:\nMy Name:\nMy Phone:`)}>WhatsApp Plan</a></div>)}</div>;
}

function WhyChoose() {
  return <section><SectionHeading eyebrow="Why choose us" title="Built around trust, beauty, and conversion" /><div className="service-grid">{services.map((item) => <ServiceCard key={item.title} {...item} />)}</div></section>;
}

function OccasionCard({ item }) {
  const href = item.slug ? `/occasions/${item.slug}` : '/occasions';
  return <Link className="occasion-card image-card" to={href} key={item.title}><ImageFrame src={item.image} alt={`${item.title} flower occasion arrangement`} /><div className="card-icon"><Gift /></div><h3>{item.title}</h3><p>{item.description}</p><span className="card-cta">{item.cta || 'Shop This Occasion'}</span></Link>;
}

function EventCard({ item }) {
  return <Link className="service-card image-card" to={`/events/${item.slug}`}><ImageFrame src={item.image} alt={`${item.title} floral event service`} /><div className="card-icon"><CalendarDays /></div><h3>{item.title}</h3><p>{item.description}</p><span className="card-cta">View Event Page</span></Link>;
}

function ServiceCard({ title, description, image, price }) {
  return <Reveal className="service-card image-card">{image && <ImageFrame src={image} alt={`${title} floral service`} />}<div className="card-icon"><Leaf /></div><h3>{title}</h3><p>{description}</p>{price && <strong className="service-price">{price}</strong>}</Reveal>;
}

function AreaChips() {
  return <div className="area-chips">{brand.areas.map((area) => <span key={area}><MapPin size={15} /> {area}</span>)}</div>;
}

function Testimonials() {
  return <section><SectionHeading eyebrow="Testimonials" title="Soft social proof without fake claims" /><div className="testimonial-row">{testimonials.map(([name, city, quote], index) => <Reveal className="testimonial" key={name}><div className="avatar" style={{ backgroundImage: `url(${[img('photo-1494790108377-be9c29b29330'), img('photo-1534528741775-53994a69daeb'), img('photo-1517841905240-472988babdf9')][index]})` }} /><div className="rating"><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /></div><p>“{quote}”</p><strong>{name}</strong><span>{city}</span></Reveal>)}</div></section>;
}

function InstagramGrid({ expanded = false }) {
  return <section><SectionHeading eyebrow="Gallery" title="Instagram-style floral moments" /><div className="gallery-grid">{galleryItems.slice(0, expanded ? galleryItems.length : 6).map((item) => <Reveal className="gallery-card" key={item.title}><ImageFrame src={item.image} alt={`${item.title} Bloom by Maryam gallery image`} /><span>{item.title}</span></Reveal>)}</div></section>;
}

function Newsletter() {
  return <section className="newsletter"><h2>Join the Bloom list</h2><p>Seasonal flower notes, gift reminders, wedding inspiration, and fresh boutique updates.</p><form onSubmit={(e) => e.preventDefault()}><label>Email address<input type="email" placeholder="you@example.com" /></label><button className="primary" type="submit">Sign Up</button></form></section>;
}

function ConsultationForm() {
  return <div className="form-panel"><h2>Wedding consultation form</h2><DemoForm fields={['Full name', 'Email', 'Phone', 'Wedding date', 'Venue', 'City', 'Guest count', 'Budget range', 'Colour palette', 'Flower preferences', 'Inspiration upload demo field', 'Notes']} button="Submit consultation request" /><div className="button-row"><Link className="secondary" to="/order-inquiry">Email Wedding Inquiry</Link><a className="whatsapp-action" href={whatsappHref(`Hi ${business.businessName}, I would like to book a wedding flower consultation.\nWedding Date:\nVenue:\nCity:\nGuest Count:\nBudget:\nMy Name:\nMy Phone:`)}>WhatsApp Wedding Inquiry</a></div></div>;
}

function DemoForm({ title, fields, button = 'Submit', onSuccess }) {
  const [sent, setSent] = useState(false);
  const submit = (event) => { event.preventDefault(); setSent(true); onSuccess?.(); };
  return <form className="demo-form" onSubmit={submit}>{title && <h2>{title}</h2>}{fields.map((field) => <label key={field}>{field}{field.toLowerCase().includes('message') || field === 'Notes' ? <textarea rows="4" /> : field.toLowerCase().includes('upload') ? <span className="upload"><Upload size={16} /> Add inspiration image</span> : <input type={field.toLowerCase().includes('email') ? 'email' : field.toLowerCase().includes('date') ? 'date' : 'text'} />}</label>)}<button className="primary" type="submit">{button}</button>{sent && <p className="success">Your message is ready to review.</p>}</form>;
}

function FAQ() {
  const faqs = [
    ['How do I place an order?', 'Browse the shop, add flowers to your cart, then send the prepared order inquiry by email or WhatsApp. Maryam can confirm availability, delivery timing, and final details.'],
    ['Can I order through WhatsApp?', 'Yes. Use any WhatsApp button to send the bouquet name, delivery date, area, gift message, and your contact details.'],
    ['Where do you deliver?', `Bloom by Maryam supports Toronto and GTA areas including ${brand.areas.slice(1, 5).join(', ')}. Delivery availability is confirmed before the order is finalized.`],
    ['What is the same-day cutoff?', `Same-day requests should be sent before ${business.sameDayCutoff}. Seasonal rush periods may need more notice.`],
    ['Can I include a gift message?', 'Yes. Add a gift message in the order inquiry form or include it in your WhatsApp message.'],
    ['Do you design wedding flowers?', 'Yes. Wedding inquiries can include bridal bouquets, ceremony flowers, reception centrepieces, and floral installations.'],
    ['Can you handle event flowers?', 'Yes. Event options include corporate flowers, birthdays, baby showers, private dinners, hospitality styling, and custom installations.'],
    ['Can I request a custom bouquet?', 'Yes. Share the occasion, budget, colours, delivery city, and any flower preferences for a custom recommendation.'],
    ['How do I care for fresh flowers?', 'Trim stems, refresh the water every two days, keep flowers away from heat and direct sun, and remove tired stems as needed.'],
    ['Are subscriptions available?', 'Yes. Weekly, bi-weekly, and monthly flower plans are available as inquiry flows for homes, studios, and offices.'],
    ['How do I contact the boutique?', `Use the contact form, email ${brand.email}, or send a WhatsApp inquiry for the quickest order conversation.`]
  ];
  return <div className="faq" id="faq">{faqs.map(([q, answer]) => <details key={q}><summary>{q}</summary><p>{answer}</p></details>)}</div>;
}

function Reviews() {
  return <div className="reviews"><h2>Reviews</h2>{testimonials.map(([name, city, quote]) => <article key={name}><strong>{name}</strong><span>{city}</span><p>{quote}</p></article>)}</div>;
}

function EmptyState({ text, cta, label }) {
  return <div className="empty"><Flower2 /><p>{text}</p><Link className="primary" to={cta}>{label}</Link></div>;
}

function AuthPage({ title, text, register = false }) {
  return <PageShell title={title} eyebrow="Account demo" text={text}><Seo title={title} description={`${title} page for Bloom by Maryam demo accounts.`} /><div className="auth-card"><DemoForm fields={register ? ['Full name', 'Email', 'Password'] : ['Email', 'Password']} button={title} /><div className="button-row"><Link to="/customer-dashboard">Customer Dashboard</Link><Link to="/admin">Admin Dashboard</Link><Link to={register ? '/login' : '/register'}>{register ? 'Login' : 'Register'}</Link></div></div></PageShell>;
}

function Dashboard({ title, items }) {
  return <PageShell title={title} eyebrow="Account workspace" text="A polished demo dashboard for repeat flower customers."><Seo title={title} description={`${title} for Bloom by Maryam demo users.`} /><div className="dashboard-grid">{items.map((item, index) => <div className="dash-card" key={item}><PackageCheck /><p>{item}</p><strong>{index + 1}{item.includes('timeline') ? ' active' : ''}</strong></div>)}</div></PageShell>;
}

function AdminTable({ onEdit, onToast }) {
  return <div className="table-wrap"><table><thead><tr><th>Product</th><th>Category</th><th>Stock</th><th>Status</th><th>Actions</th></tr></thead><tbody>{products.slice(0, 8).map((p) => <tr key={p.id}><td><div className="table-product"><ImageFrame src={p.image} alt={`${p.name} admin thumbnail`} /><span>{p.name}</span></div></td><td>{p.category}</td><td><span className={`status-badge ${p.stock === 'Limited' ? 'limited' : ''}`}>{p.stock}</span></td><td><select onChange={() => onToast('Demo order status updated')}><option>Active</option><option>Draft</option><option>Low stock</option></select></td><td><button onClick={onEdit} aria-label={`Edit ${p.name}`}><Edit3 size={16} /></button><button onClick={() => onToast('Demo delete action shown')} aria-label={`Delete ${p.name}`}><Trash2 size={16} /></button></td></tr>)}</tbody></table></div>;
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
              <Route path="/occasions/:slug" element={<OccasionLanding />} />
              <Route path="/wedding-flowers" element={<Wedding />} />
              <Route path="/events-corporate" element={<Events />} />
              <Route path="/events/:slug" element={<EventLanding />} />
              <Route path="/subscription" element={<Subscription />} />
              <Route path="/delivery-areas" element={<Delivery />} />
              <Route path="/about" element={<About />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<OrderInquiry />} />
              <Route path="/order-inquiry" element={<OrderInquiry />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/customer-dashboard" element={<CustomerDashboard />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/privacy-policy" element={<PageShell title="Privacy Policy" eyebrow="Demo policy" text="This demo site uses placeholder contact details and does not collect real payments or private client information." image={img('photo-1501004318641-b39e6451bec6')}><Seo title="Privacy Policy" description="Demo privacy policy for Bloom by Maryam florist website." /><div className="form-panel"><h2>Privacy-first demo experience</h2><p>Bloom by Maryam is a portfolio demo for MSPixelPulse. Order forms prepare email and WhatsApp messages on your device; no live payment, customer database, or private account system is connected.</p><p>Future production builds can add secure form handling, consent text, analytics configuration, and privacy policy details matched to the real business.</p></div></PageShell>} />
              <Route path="/terms" element={<PageShell title="Terms" eyebrow="Demo terms" text="Clear, customer-friendly terms help a florist explain orders, delivery timing, substitutions, and consultation expectations." image={img('photo-1519378058457-4c29a0a2efac')}><Seo title="Terms" description="Demo terms page for Bloom by Maryam florist website." /><div className="form-panel"><h2>Demo ordering terms</h2><p>Prices, products, delivery fees, and availability shown on this website are sample content for a florist sales demo. A live business would confirm seasonal substitutions, delivery windows, refund policy, and consultation terms before accepting payment.</p></div></PageShell>} />
            </Routes>
          </React.Suspense>
        </Layout>
      </CartProvider>
    </BrowserRouter>
  );
}

createRoot(document.getElementById('root')).render(<App />);
