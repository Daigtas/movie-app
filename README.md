# 🎬 Movie Explorer App

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TMDB API](https://img.shields.io/badge/TMDB_API-01D277?style=for-the-badge&logo=themoviedatabase&logoColor=white)

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://weather.sandboxas.lt/)
A responsive movie discovery application powered by The Movie Database (TMDB) API, featuring modern React patterns and TypeScript safety.
![Screen](https://movie.sandboxas.lt/movie.png)
## 🌟 Key Features (Verified in Code)
- **Movie search** with debounced queries (`useDebounce` hook)
- **Dynamic pagination** (infinite scroll implementation)
- **Genre filtering** (multi-select capability)
- **Responsive card grid** (CSS Grid + Flexbox)
- **Type-safe API client** (Axios + TypeScript interfaces)

## 🛠 Tech Stack
- **Frontend**: React 18 + Vite
- **State Management**: React Query (for API caching)
- **Styling**: Tailwind CSS
- **API**: TMDB REST API
- **Testing**: Vitest + React Testing Library

## 🚀 Quick Start
```bash
git clone https://github.com/Daigtas/movie-app.git
cd movie-app
npm install
npm run dev

⚙️ Configuration

Create .env file:
ini

VITE_TMDB_API_KEY=your_api_key_here
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3

📂 Code Structure

/src
├── api/            # TMDB API client and types
├── components/     # Reusable UI components
├── hooks/          # Custom hooks (useDebounce, useInfiniteScroll)
├── pages/          # Main views (Home, Search, MovieDetails)
├── styles/         # Tailwind config and CSS
└── utils/          # Helper functions

📝 Notes from Code Analysis

    Performance Optimizations:

        Memoized selectors with useMemo

        Request deduplication via React Query

    Type Safety:

        Full TMDB API response typings

        Component prop interfaces

    Accessibility:

        ARIA labels on interactive elements

        Semantic HTML structure

🤝 Contributing

PRs welcome! Please:

    Follow existing TypeScript patterns

    Add tests for new features

    Update corresponding documentation

📜 License

MIT
