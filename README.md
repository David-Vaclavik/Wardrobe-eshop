# 👗 Wardrobe E-Shop

A modern, responsive e-commerce application built with React, TypeScript, and Vite.

## 🚀 Live Demo

[View Live Demo](url here)

## ✨ Features

- **Product Browsing**: Browse a wide range of products with infinite scroll
- **Product Details**: View detailed product information with image gallery
- **Smart Cart**: Add, remove, and update quantities with real-time totals
- **Persistent Cart**: Cart state syncs across browser tabs and persists after refresh
- **Search & Filter**: Search products and filter by categories
- **Sorting**: Sort products by price, rating, or title
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Loading States**: Skeleton loaders and spinners for better UX

## 🛠️ Tech Stack

- **Frontend Framework**: React
- **Language**: TypeScript
- **Build Tool**: Vite
- **Routing**: React Router
- **Styling**: CSS
- **API**: DummyJSON API
- **State Management**: React Context API
- **Storage**: localStorage for cart persistence
- **Icons**: Lucide Icons

## 📦 Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/wardrobe-eshop.git
cd wardrobe-eshop
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

4. Start the development server:

```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

## 🚀 Deployment

This project is configured for deployment on Vercel with SPA routing support.

```bash
npm run build
```

The `vercel.json` configuration ensures all routes are handled correctly by the client-side router.

## 📂 Project Structure

```
src/
├── components/      # Reusable UI components
├── pages/           # Page components
├── hooks/           # Custom React hooks
├── context/         # React Context providers
├── services/        # API service layer
├── types/           # TypeScript type definitions
├── styles/          # CSS stylesheets
├── config/          # Configuration files
└── assets/          # Static assets
```

## 🔑 Environment Variables

```env
VITE_API_BASE_URL=https://dummyjson.com
```

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**David Václavík**

- GitHub: [@David-Vaclavik](https://github.com/David-Vaclavik)

## 🙏 Acknowledgments

- Product data provided by [DummyJSON](https://dummyjson.com/)
- Logo placeholder from [Logoipsum](https://logoipsum.com/)
- Icons from [Lucide React](https://lucide.dev/)
- Fonts: Inter and Orbitron from [Google Fonts](https://fonts.google.com/)

---

**Note**: This is a demonstration project for educational purposes. It is not a real e-commerce store and does not process actual payments.
