# Bloom by Maryam

Premium React + Vite demo website for a girl-owned Canadian flower boutique, created for MSPixelPulse Agency.

## Business Concept

Bloom by Maryam is a polished demo brand for a Toronto/GTA flower boutique offering online flower delivery, same-day delivery, wedding flowers, event florals, subscriptions, gift boxes, preserved flowers, plants, and floral consultations.

## Demo Admin

- Email: `admin@bloombymaryam.ca`
- Password: `demo123`

## Features

- Responsive premium storefront with soft floral branding, pastel gradients, elegant typography, and tasteful animation.
- Shop page with search, filters, sorting, product cards, wishlist buttons, quick view links, and cart actions.
- Product detail pages with size options, delivery date/time, gift message, add-ons, quantity, care notes, guarantee, delivery info, and reviews.
- No-login cart and Order Inquiry flow with totals, delivery fee, estimated HST calculation, generated email template, mailto fallback, and prefilled WhatsApp fallback.
- Luxury-style navigation with primary Shop, Occasions, Events, and Contact dropdowns plus mobile accordion menus.
- Dedicated landing routes for every major occasion and event service.
- Wedding flowers page with packages, services, gallery-style visuals, and a detailed consultation form.
- Hidden customer/admin demo routes remain available for internal presentation, but the public navigation focuses on ordering, services, delivery, gallery, blog, and contact.
- SEO-ready pages for local GTA flower delivery, wedding florals, subscriptions, occasions, delivery areas, and blog topics.

## Pages

Public pages: Home, Shop, Product Details, Occasions, individual Occasion landing pages, Events & Corporate Flowers, individual Event landing pages, Flower Subscription, Delivery Areas, About, Gallery, Blog, Contact, Privacy Policy, Terms, Cart, Order Inquiry.

Hidden demo routes: Login, Register, Customer Dashboard, Admin Dashboard.

## Order Flow

- Customers can browse and add products to cart without an account.
- Order Inquiry generates a professional email template for `hello@mspixelpulse.com`.
- WhatsApp buttons use a prefilled message and WhatsApp number `+1 (437) 973-1724` / `14379731724`.
- Real email sending is not configured in this static demo. The inquiry payload is structured so EmailJS or Formspree can be added later without redesigning the form.

## Tech Stack

- React
- Vite
- React Router
- Framer Motion
- Lucide React
- CSS

## Run Locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deployment

Production deployment is intended for Vercel with:

- Framework: Vite
- Install command: `npm install`
- Build command: `npm run build`
- Output directory: `dist`
- Root directory: `./`

## Demo Safety

All contact details, dashboard data, products, orders, prices, testimonials, and business details are demo/static placeholders. Do not add real client details unless explicitly provided and authorized.

## Credit

Built as a premium flower business sales demo for MSPixelPulse Agency.
