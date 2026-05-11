import { Outlet } from 'react-router'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/footer'

const PublicLayout = () => {
  return (
    <div className='w-full min-h-screen flex flex-col'>
        <Header />
        <main className='flex-1'>
            <Outlet />
        </main>
        <Footer />
    </div>
  )
}

export default PublicLayout