# MyKROSS dashboard

### Prerequisites

1. Clone backend project and follow readme.
   [https://gitlab.com/solveq/mykross/backend](https://gitlab.com/solveq/mykross/backend)

### Steps for running development instance

Follow this steps only if you wish to develop dashboard.
If not, follow only instruction for running backend instance and use command
`docker compose --profile dashboard up`

1. In: `solveq-kross-dashboard` `.env`:

-   Add:

```
NEXTAUTH_URL="http://localhost:3001"
API_URL="http://localhost:3000"
NEXT_PUBLIC_URL="http://localhost:3001"
```

2. Run: `npx next dev -p 3001`
