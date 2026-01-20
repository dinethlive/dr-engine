# Technical Architecture

> DR-Engine technical documentation covering project structure, technology stack, and architecture patterns.

## Technology Stack

| Category | Technology | Version |
|----------|------------|---------|
| Framework | Next.js | 16.1.1 |
| UI Library | React | 19.2.3 |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS | 4.x |
| UI Components | Radix UI | Various |
| Database | Dexie.js (IndexedDB) | 4.2.1 |
| AI Provider | Perplexity AI | REST API |
| Animation | Framer Motion, GSAP | Latest |
| Markdown | react-markdown, remark-gfm | 10.x |

---

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (dashboard)/        # Dashboard route group
│   │   ├── history/        # Research history
│   │   ├── how-to-use/     # User guide
│   │   ├── prompts/        # Prompt management
│   │   ├── settings/       # App settings
│   │   ├── usage/          # Usage tracking
│   │   ├── video-machine/  # Video tools
│   │   └── workspace/      # Research workspace
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
│
├── components/             # React Components
│   ├── chat/               # Chat interface
│   ├── history/            # History display
│   ├── how-to-use/         # Help components
│   ├── layout/             # Layout (sidebar, header)
│   ├── prompts/            # Prompt management
│   ├── settings/           # Settings UI
│   ├── ui/                 # Shared UI (shadcn/ui)
│   ├── usage/              # Usage statistics
│   ├── video-machine/      # Video tools
│   └── workspace/          # Workspace components
│
├── hooks/                  # Custom React Hooks
│   ├── chat/               # Chat-related hooks
│   ├── history/            # History hooks
│   ├── prompts/            # Prompt hooks
│   ├── settings/           # Settings hooks
│   ├── usage/              # Usage hooks
│   └── workspace/          # Workspace hooks
│
├── lib/                    # Core Logic
│   ├── api/                # API integrations
│   │   ├── perplexity.ts   # Perplexity AI client
│   │   ├── prompts.ts      # Prompt generation
│   │   ├── sections.ts     # Section processing
│   │   ├── workflows.ts    # Workflow management
│   │   └── types.ts        # API types
│   ├── workspace/          # Workspace utilities
│   ├── db.ts               # Database schema
│   └── utils.ts            # Utility functions
│
└── types/                  # TypeScript Types
    └── index.ts            # Shared types
```

---

## Architecture Patterns

### Component Architecture

Components follow a modular pattern with separation of concerns:

```
component-folder/
├── component.tsx           # Main component
├── component-item.tsx      # Sub-components
├── use-component.ts        # Custom hook (logic)
└── index.ts                # Barrel export
```

### State Management

- **Local State**: React `useState` for component state
- **Custom Hooks**: Business logic in dedicated hooks
- **Database**: Dexie.js for persistent storage
- **Live Queries**: `useLiveQuery` for reactive data

### Data Flow

```
User Action → Hook → API/DB → State Update → UI Re-render
```

---

## Key Features

### 1. Research Workflow

1. User enters research topic
2. AI generates themed questions
3. Questions grouped into sections
4. Each section gets detailed answers
5. Results merged into final document

### 2. Prompt System

- Custom prompt templates
- Template variables: `{topic}`, `{theme_title}`, `{questions}`
- Question and Answer prompt types

### 3. Usage Tracking

- Token counting (input/output)
- Cost calculation per model
- Daily aggregation

---

## Development Commands

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
npm run kill     # Kill port 3000
```

---

## Browser Support

- Chrome 90+
- Firefox 90+
- Safari 15+
- Edge 90+

Requires IndexedDB support for local storage.
