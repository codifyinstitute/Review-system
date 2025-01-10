import { useState, useEffect } from "react";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

function EditBusiness() {
  const navigate = useNavigate();
  const [businesses, setBusinesses] = useState([]);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState({ name: "", link: "" });
  const [reviewForm, setReviewForm] = useState({
    name: "",
    email: "",
    stars: 5,
    description: "",
  });

  // Fetch all businesses from the API
  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const response = await axios.get("http://localhost:5000/businesses/all");
        setBusinesses(response.data);
      } catch (error) {
        console.error("Error fetching businesses:", error);
      }
    };

    fetchBusinesses();
  }, []); // Empty dependency array ensures the effect runs only once

  const handleEdit = (business) => {
    setEditMode(true);
    setEditForm({ name: business.name, link: business.link });
    setSelectedBusiness(business);
  };

  const handleDelete = async (businessId) => {
    try {
      await axios.delete(`/api/business/${businessId}`); // Add backend delete API endpoint
      setBusinesses(businesses.filter((b) => b._id !== businessId)); // Remove from UI
      if (selectedBusiness?._id === businessId) {
        setSelectedBusiness(null);
      }
    } catch (error) {
      console.error("Error deleting business:", error);
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setBusinesses(
      businesses.map((b) =>
        b._id === selectedBusiness._id
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

  const copyToClipboard = (data) => {
    const textToCopy = `${window.location.origin}/review/${data}`;
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        console.log("Copied!");
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };


  return (
    <div className="p-4 md:p-8">
      <div>
        <h2 className=" mt-12 text-2xl font-bold mb-6">Edit Business</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {businesses?.map((business) => (
            <div
              key={business._id} // Use _id for unique key in MongoDB
              className="border rounded-lg p-4 shadow hover:shadow-lg transition-shadow cursor-pointer"
            >
              <h3 className="text-xl font-semibold mb-2">{business.Name}</h3>
              <div className="flex space-x-2">
                <button
                  onClick={(e) => navigate("/dash/add-review")}
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(business._id); // Use _id for deleting business
                  }}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
                <button
                  onClick={() => copyToClipboard(business.BusinessId)}
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
