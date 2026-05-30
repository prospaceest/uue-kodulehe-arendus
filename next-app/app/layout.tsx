import {ClerkProvider} from "@clerk/nextjs";
// Root layout — locale-specific layout is in app/[locale]/layout.tsx
// This file is required by Next.js App Router but the real layout lives one level down.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}