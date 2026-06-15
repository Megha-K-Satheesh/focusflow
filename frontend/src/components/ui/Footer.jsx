export default function Footer() {
  return (
    <footer className="bg-white   mt-10">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-center text-gray-600">
        
        <p className="text-sm">
          © {new Date().getFullYear()} Study Planner. All rights reserved.
        </p>

       

      </div>
    </footer>
  );
}
