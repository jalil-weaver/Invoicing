# Services Catalog

Document each reusable service/helper as a separate Markdown file here (e.g., `clients.md`, `projects.md`).

Template:

```
# <Service Name>

## Purpose
Short description of what the service does.

## API
```ts
export async function doThing(params: Input): Promise<Output>
```
Explain parameters, return types, errors.

## Data sources / dependencies
- Supabase tables / views touched
- External APIs (PennyLane, etc.)

## Usage
```ts
import { doThing } from '@shared/<path>'
```

## Tests
Link to the test file(s) covering the service.
```

Update this catalog every time you create or modify a shared service so other agents can quickly discover existing building blocks.
