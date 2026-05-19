
const LogoContainer = () => {
  return (
    <div className='font-bold text-2xl tracking-tight text-primary flex items-center gap-2'>
      <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground">
        {/* simple icon abstraction */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
      </div>
      Placement360
    </div>
  )
}

export default LogoContainer