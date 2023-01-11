import '../styles/globals.css'
import type { AppProps } from 'next/app'

import { Session, createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { useState } from 'react'

import { Analytics } from '@vercel/analytics/react';

export default function App({ Component, pageProps }: AppProps<{initialSession: Session}>) {

  const [supabaseClient] = useState(() => createBrowserSupabaseClient())
  
  return (
    <SessionContextProvider supabaseClient={supabaseClient} initialSession={pageProps.initialSession}>
      <Component {...pageProps} />
      <Analytics />
    </SessionContextProvider>
  )
}
