import React from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'

//Componentes Layouts
import { Header } from './features/layout/Header'
import { Footer } from './features/layout/Footer'
import { Content } from './features/layout/Content'

//Api
import { Api } from './shared/components/ApiRy'

//Componentes Auth
import  Myaccount  from './features/auth/components/Myaccount'

// Rutas de la aplicación
import App from './App'

export const AppRoutes = () => {
    return (
        <HashRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Content />} />
                <Route path="/Myaccount" element={<Myaccount />} />
                <Route path="/Api" element={<Api />} />
                <Route path="/posts" element={<App />} />
            </Routes>
            <Footer />
        </HashRouter>
    )
}
