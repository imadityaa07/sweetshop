import Login from './pages/login';
import Register from './pages/Register';
import Sweets from './pages/Sweets';

function App() {
  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">

      {/* Sweet Shop Management WINDOW */}
      <div className="relative w-full max-w-6xl rounded-3xl shadow-2xl overflow-hidden">

        {/* INNER background image */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/sweets-inner-bg.pngss')",
            backgroundSize: 'cover',
          }}
        />

        {/* Soft overlay so content is readable */}
        <div className="absolute inset-0 bg-white/70 backdrop-blur-sm"></div>

        {/* CONTENT */}
        <div className="relative z-10 p-10">

  {/* Logout button */}
  {isLoggedIn && (
    <div className="flex justify-end mb-6">
      <button
        onClick={() => {
          localStorage.removeItem('token');
          window.location.reload();
        }}
        className="
          px-5 py-2 rounded-lg
          bg-red-500 hover:bg-red-600
          text-white font-medium
          transition-all duration-200
          hover:scale-105
        "
      >
        Logout
      </button>
    </div>
  )}

  <h1 className="text-5xl font-extrabold text-pink-600 text-center mb-10">
    Sweet Shop Management
  </h1>

  {!isLoggedIn && (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <Login />
      <Register />
    </div>
  )}

  {isLoggedIn && <Sweets />}
</div>

      </div>
    </div>
  );
}

export default App;

