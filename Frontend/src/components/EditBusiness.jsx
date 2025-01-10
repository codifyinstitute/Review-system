import { useState } from 'react';
import * as XLSX from 'xlsx';

function EditBusiness() {
  const [businesses, setBusinesses] = useState([
    { id: 1, name: 'Business 1', link: 'https://example1.com' },
    { id: 2, name: 'Business 2', link: 'https://example2.com' },
  ]);
  
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState({ name: '', link: '' });
  const [reviewForm, setReviewForm] = useState({
    name: '',
    email: '',
    stars: 5,
    description: ''
  });

  const handleEdit = (business) => {
    setEditMode(true);
    setEditForm({ name: business.name, link: business.link });
    setSelectedBusiness(business);
  };

  const handleDelete = (businessId) => {
    setBusinesses(businesses.filter(b => b.id !== businessId));
    if (selectedBusiness?.id === businessId) {
      setSelectedBusiness(null);
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setBusinesses(businesses.map(b => 
      b.id === selectedBusiness.id 
        ? { ...b, name: editForm.name, link: editForm.link }
        : b
    ));
    setEditMode(false);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    console.log('Review submitted:', reviewForm);
    setReviewForm({ name: '', email: '', stars: 5, description: '' });
  };

  const handleBulkReview = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      console.log('Bulk review data:', jsonData);
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="p-4 md:p-8">
      {!selectedBusiness ? (
        <div>
          <h2 className="text-2xl font-bold mb-6">Edit Business</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {businesses.map((business) => (
              <div 
                key={business.id} 
                className="border rounded-lg p-4 shadow hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setSelectedBusiness(business)}
              >
                <h3 className="text-xl font-semibold mb-2">{business.name}</h3>
                <a 
                  href={business.link} 
                  className="text-blue-600 hover:underline mb-4 block"
                  onClick={(e) => e.stopPropagation()}
                >
                  {business.link}
                </a>
                <div className="flex space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(business);
                    }}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(business.id);
                    }}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Reviews</h2>
            <button
              onClick={() => setSelectedBusiness(null)}
              className="text-gray-600 hover:text-gray-800"
            >
              ← Back to businesses
            </button>
          </div>

          {editMode ? (
            <form onSubmit={handleUpdate} className="mb-8 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Edit Business</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2">Business Name</label>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Business Link</label>
                  <input
                    type="url"
                    value={editForm.link}
                    onChange={(e) => setEditForm({ ...editForm, link: e.target.value })}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div className="flex space-x-2">
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditMode(false)}
                    className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <div className="mb-8">
              <h3 className="text-xl font-semibold">{selectedBusiness.name}</h3>
              <a href={selectedBusiness.link} className="text-blue-600 hover:underline">
                {selectedBusiness.link}
              </a>
            </div>
          )}

          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Add Single Review</h3>
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    value={reviewForm.name}
                    onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={reviewForm.email}
                    onChange={(e) => setReviewForm({ ...reviewForm, email: e.target.value })}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Stars (1-5)</label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={reviewForm.stars}
                    onChange={(e) => setReviewForm({ ...reviewForm, stars: parseInt(e.target.value) })}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Description</label>
                  <textarea
                    value={reviewForm.description}
                    onChange={(e) => setReviewForm({ ...reviewForm, description: e.target.value })}
                    className="w-full p-2 border rounded"
                    rows="4"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Submit Review
                </button>
              </form>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Bulk Review Upload</h3>
              <label className="block">
                <span className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 cursor-pointer inline-block">
                  Upload Excel File
                  <input
                    type="file"
                    accept=".xlsx,.xls"
                    className="hidden"
                    onChange={handleBulkReview}
                  />
                </span>
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditBusiness;