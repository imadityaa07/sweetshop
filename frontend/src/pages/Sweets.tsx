import { useEffect, useState } from 'react';
import api from '../api/axios';
import AddSweetForm from '../components/AddSweetForm';
import { getUserRole } from '../utils/auth';

interface Sweet {
  id: number;
  name: string;
  category: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

function Sweets() {
  const role = getUserRole();
  const isAdmin = role === 'ADMIN';

  const [sweets, setSweets] = useState<Sweet[]>([]);
  const [loading, setLoading] = useState(true);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editPrice, setEditPrice] = useState(0);
  const [editQuantity, setEditQuantity] = useState(0);
  const [editImageUrl, setEditImageUrl] = useState('');

  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const fetchSweets = async () => {
    setLoading(true);
    try {
      const res = await api.get('/sweets');
      setSweets(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSweets();
  }, []);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const res = await api.get('/sweets/search', {
        params: {
          q: search || undefined,
          category: categoryFilter || undefined,
          minPrice: minPrice || undefined,
          maxPrice: maxPrice || undefined
        }
      });
      setSweets(res.data);
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = async (id: number) => {
    await api.post(`/sweets/${id}/purchase`, { quantity: 1 });
    fetchSweets();
  };

  const startEdit = (sweet: Sweet) => {
    setEditingId(sweet.id);
    setEditPrice(sweet.price);
    setEditQuantity(sweet.quantity);
    setEditImageUrl(sweet.imageUrl || '');
  };

  const saveEdit = async (id: number) => {
    await api.put(`/sweets/${id}`, {
      price: editPrice,
      quantity: editQuantity,
      imageUrl: editImageUrl
    });
    setEditingId(null);
    fetchSweets();
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this sweet?')) return;
    await api.delete(`/sweets/${id}`);
    fetchSweets();
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading sweets...</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-1">
        Available Sweets
      </h2>
      <p className="text-sm text-gray-500 mb-4">
        Search and filter sweets by name, category, or price
      </p>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <input
            placeholder="Search name..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="border rounded px-3 py-2 focus:ring-2 focus:ring-purple-500"
          />
          <input
            placeholder="Category"
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
            className="border rounded px-3 py-2 focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="number"
            placeholder="Min ₹"
            value={minPrice}
            onChange={e => setMinPrice(e.target.value)}
            className="border rounded px-3 py-2 focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="number"
            placeholder="Max ₹"
            value={maxPrice}
            onChange={e => setMaxPrice(e.target.value)}
            className="border rounded px-3 py-2 focus:ring-2 focus:ring-purple-500"
          />
          <div className="flex gap-2">
            <button
              onClick={handleSearch}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white rounded px-4 py-2"
            >
              Search
            </button>
            <button
              onClick={() => {
                setSearch('');
                setCategoryFilter('');
                setMinPrice('');
                setMaxPrice('');
                fetchSweets();
              }}
              className="flex-1 bg-gray-300 hover:bg-gray-400 rounded px-4 py-2"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {isAdmin && <AddSweetForm onAdded={fetchSweets} />}

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {sweets.map(sweet => (
          <div
            key={sweet.id}
            className="group bg-white/90 backdrop-blur-md rounded-xl p-5 flex flex-col
                       shadow-md border border-pink-100
                       transition-all duration-300
                       hover:-translate-y-1
                       hover:shadow-[0_10px_30px_rgba(236,72,153,0.25)]"
          >
            <div className="h-32 rounded mb-4 overflow-hidden bg-gray-100">
              {sweet.imageUrl ? (
                <img
                  src={sweet.imageUrl}
                  alt={sweet.name}
                  onError={e =>
                    ((e.target as HTMLImageElement).src =
                      'https://via.placeholder.com/300x200?text=Sweet')
                  }
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="h-full flex items-center justify-center text-purple-600 font-semibold">
                  🍬 {sweet.name}
                </div>
              )}
            </div>

            <h3 className="text-lg font-semibold">{sweet.name}</h3>
            <p className="text-sm text-gray-500">{sweet.category}</p>
            <p className="mt-2 font-bold text-purple-700">₹{sweet.price}</p>
            <p className={`mt-1 text-sm ${sweet.quantity > 0 ? 'text-green-600' : 'text-red-500'}`}>
              Stock: {sweet.quantity}
            </p>

            <div className="mt-auto pt-4 space-y-2">
              {!isAdmin && (
                <button
                  disabled={sweet.quantity === 0}
                  onClick={() => handlePurchase(sweet.id)}
                  className={`w-full py-2 rounded text-white ${
                    sweet.quantity === 0
                      ? 'bg-gray-400'
                      : 'bg-green-600 hover:bg-green-700'
                  }`}
                >
                  Purchase
                </button>
              )}

              {isAdmin && editingId !== sweet.id && (
                <>
                  <button
                    onClick={() => startEdit(sweet)}
                    className="w-full py-2 rounded bg-yellow-500 hover:bg-yellow-600 text-white"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(sweet.id)}
                    className="w-full py-2 rounded bg-red-500 hover:bg-red-600 text-white"
                  >
                    Delete
                  </button>
                </>
              )}

              {isAdmin && editingId === sweet.id && (
                <div className="space-y-2">
                  <input
                    type="number"
                    value={editPrice}
                    onChange={e => setEditPrice(Number(e.target.value))}
                    className="w-full border rounded px-3 py-1"
                    placeholder="Price"
                  />
                  <input
                    type="number"
                    value={editQuantity}
                    onChange={e => setEditQuantity(Number(e.target.value))}
                    className="w-full border rounded px-3 py-1"
                    placeholder="Quantity"
                  />
                  <input
                    type="text"
                    value={editImageUrl}
                    onChange={e => setEditImageUrl(e.target.value)}
                    className="w-full border rounded px-3 py-1"
                    placeholder="Image URL"
                  />
                  <button
                    onClick={() => saveEdit(sweet.id)}
                    className="w-full py-2 bg-green-600 text-white rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="w-full py-2 bg-gray-400 text-white rounded"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sweets;
