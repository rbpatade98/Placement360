const Footer = () => {
  return (
    <div className='w-full border-t border-border bg-card text-card-foreground mt-auto py-8'>
      <footer className='container mx-auto flex flex-col md:flex-row justify-between items-center gap-6 px-4'>
        <div className='font-bold text-xl tracking-tight flex items-center gap-2 text-primary'>
          <div className="w-6 h-6 bg-primary rounded-md flex items-center justify-center text-primary-foreground">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
          </div>
          Placement360
        </div>
        <div className="flex gap-6">
          <div className='text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer'>About Us</div>
          <div className='text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer'>Privacy</div>
          <div className='text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer'>Contact</div>
        </div>
        <div className='text-sm text-muted-foreground'>© 2026 All rights reserved.</div>
      </footer>
    </div>  
  )
}

export default Footer