import { useState } from "react"

const Scheduler = () => {

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <div className="flex h-screen bg-slate-50">

        {/* Mobile Overlay  */}
        { isMobileMenuOpen && <div className="fixed inset-0 bg-slate-900/50 z-40 md:hidden" /> }

      Scheduler
    </div>
  )
}

export default Scheduler
