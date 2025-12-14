import { useState } from 'react';
import api from '../api/axios';

function AddSweetForm({ onAdded }: { onAdded: () => void }) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);
  const [imageUrl, setImageUrl] = useState(''); // ✅ added

  const handleSubmit = async () => {
    if (!name || !category) {
      alert('Please fill all required fields');
      return;
    }

    try {
      await api.post('/sweets', {
        name,
        category,
        price,
        quantity,
        imageUrl // ✅ send to backend
      });

      // reset form
      setName('');
      setCategory('');
      setPrice(0);
      setQuantity(0);
      setImageUrl('');

      onAdded();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to add sweet');
    }
  };

  return (
    <div
      className="bg-gray-50 border rounded-lg p-5
                 transition-all duration-300
                 hover:shadow-md"
    >
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Add Sweet (Admin)
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {/* Sweet Name */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Sweet Name
          </label>
          <input
            type="text"
            placeholder="e.g. Laddu"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full border rounded px-3 py-2
                       focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Category
          </label>
          <input
            type="text"
            placeholder="e.g. Indian"
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="w-full border rounded px-3 py-2
                       focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Image URL
          </label>
          <input
            type="text"
            placeholder="https://example.com/sweet.jpg"
            value={imageUrl}
            onChange={e => setImageUrl(e.target.value)}
            className="w-full border rounded px-3 py-2
                       focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Price (₹)
          </label>
          <input
            type="number"
            min="0"
            value={price}
            onChange={e => setPrice(Number(e.target.value))}
            className="w-full border rounded px-3 py-2
                       focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Quantity */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Quantity
          </label>
          <input
            type="number"
            min="0"
            value={quantity}
            onChange={e => setQuantity(Number(e.target.value))}
            className="w-full border rounded px-3 py-2
                       focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="mt-5 bg-purple-600 hover:bg-purple-700
                   text-white px-6 py-2 rounded
                   transition-all duration-200
                   hover:shadow-lg hover:-translate-y-0.5"
      >
        Add Sweet
      </button>
    </div>
  );
}

export default AddSweetForm;
