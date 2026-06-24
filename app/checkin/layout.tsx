// Check-in section has its OWN layout — completely isolated from the main site layout
// The main app/layout.tsx wraps everything with Navbar+Footer
// We override that here by NOT including them, using a clean full-screen layout

export default function CheckInLayout({ children }: { children: React.ReactNode }) {
  return (
    // This replaces the <main> content but the root layout still wraps it
    // To fully isolate, the scanner page uses a fixed full-screen overlay approach
    <>{children}</>
  )
}
