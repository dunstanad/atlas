export default function Footer() {
  return (
    <footer className="w-full bg-gray-800 text-gray-400 text-sm py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 text-center">
        © {new Date().getFullYear()} Atlas Game — Open Source under the MIT License.
      </div>
    </footer>
  );
}
