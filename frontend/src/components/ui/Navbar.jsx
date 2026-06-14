

export default function Navbar() {


  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white border-b border-purple-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <h1 className="text-xl font-bold text-purple-700 tracking-wide">
          FocusFlow
        </h1>

      </div>
    </header>
  );
}
