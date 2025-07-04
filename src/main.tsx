import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { App as AntdApp } from 'antd'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const queryClient = new QueryClient();
createRoot(document.getElementById('root')!).render(

    <StrictMode>
        <AntdApp>
            <QueryClientProvider client={queryClient}>
                <App />
            </QueryClientProvider>
        </AntdApp>
    </StrictMode>
)
