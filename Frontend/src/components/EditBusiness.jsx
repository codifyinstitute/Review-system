import { useState } from "react";
import * as XLSX from "xlsx";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

function EditBusiness() {
  const navigate = useNavigate();
  const [businesses, setBusinesses] = useState([
    { id: 1, name: "Business 1", link: "https://example1.com" },
    { id: 2, name: "Business 2", link: "https://example2.com" },
  ]);

  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState({ name: "", link: "" });
  const [reviewForm, setReviewForm] = useState({
    name: "",
    email: "",
    stars: 5,
    description: "",
  });

  const handleEdit = (business) => {
    setEditMode(true);
    setEditForm({ name: business.name, link: business.link });
    setSelectedBusiness(business);
  };

  const handleDelete = (businessId) => {
    setBusinesses(businesses.filter((b) => b.id !== businessId));
    if (selectedBusiness?.id === businessId) {
      setSelectedBusiness(null);
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setBusinesses(
      businesses.map((b) =>
        b.id === selectedBusiness.id
          ? { ...b, name: editForm.name, link: editForm.link }
          : b
      )
    );
    setEditMode(false);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    console.log("Review submitted:", reviewForm);
    setReviewForm({ name: "", email: "", stars: 5, description: "" });
  };

  const handleBulkReview = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      console.log("Bulk review data:", jsonData);
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="p-4 md:p-8">
      <div>
        <h2 className=" mt-12 text-2xl font-bold mb-6">Edit Business</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {businesses.map((business) => (
            <div
              key={business.id}
              className="border rounded-lg p-4 shadow hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => navigate("/dash/add-review")}
            >
              <h3 className="text-xl font-semibold mb-2">{business.name}</h3>
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
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="bg-green-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Copy Url
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EditBusiness;
