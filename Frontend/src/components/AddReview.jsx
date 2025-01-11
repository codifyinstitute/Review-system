// import React, { useEffect, useState } from "react";
// import { ArrowLeft } from "lucide-react";

// const AddReview = () => {
//   const [editMode, setEditMode] = useState(false);
//   const [selectedBusiness, setSelectedBusiness] = useState(null);
//   const [editForm, setEditForm] = useState({ name: "", link: "" });
//   const [reviewForm, setReviewForm] = useState({
//     name: "",
//     email: "",
//     stars: 5,
//     description: "",
//   });
//   // const handleReviewSubmit = (e) => {
//   //     e.preventDefault();
//   //     console.log("Review submitted:", reviewForm);
//   //     setReviewForm({ name: "", email: "", stars: 5, description: "" });
//   // };

//   const handleBulkReview = async (event) => {
//     const file = event.target.files[0];
//     const reader = new FileReader();

//     reader.onload = (e) => {
//       const data = new Uint8Array(e.target.result);
//       const workbook = XLSX.read(data, { type: "array" });
//       const sheetName = workbook.SheetNames[0];
//       const worksheet = workbook.Sheets[sheetName];
//       const jsonData = XLSX.utils.sheet_to_json(worksheet);
//       console.log("Bulk review data:", jsonData);
//     };

//     reader.readAsArrayBuffer(file);
//   };

//   const handleReviewSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       console.log(location.state);
//       const response = await axios.post(
//         `http://localhost:5000/businesses/add/${location.state.Id}/review`,
//         {
//           Description: description,
//         }
//       );
//       setDescription(""); // Reset the form
//     } catch (error) {
//       console.log(error); // Error message
//     }
//   };

//   const submitBulkData = async () => {
//     try {
//       if (jsonData.length === 0) {
//         alert("Please upload an Excel file before submitting.");
//         return;
//       }
//       const response = await axios.post(
//         `http://localhost:5000/businesses/${location.state.Id}/reviews/bulk-upload`,
//         {
//           reviews: jsonData,
//         }
//       );
//       alert("Bulk reviews uploaded successfully!");
//       setJsonData([]); // Clear JSON data after successful upload
//     } catch (error) {
//       console.error("Error uploading bulk reviews:", error);
//       alert("Failed to upload bulk reviews. Please try again.");
//     }
//   };

//   // const handleBulkReview = async (event) => {
//   //     const file = event.target.files[0];
//   //     const reader = new FileReader();

//   //     reader.onload = (e) => {
//   //         const data = new Uint8Array(e.target.result);
//   //         const workbook = XLSX.read(data, { type: "array" });
//   //         const sheetName = workbook.SheetNames[0];
//   //         const worksheet = workbook.Sheets[sheetName];
//   //         const jsonData = XLSX.utils.sheet_to_json(worksheet);
//   //         console.log("Bulk review data:", jsonData);
//   //     };

//   //     reader.readAsArrayBuffer(file);
//   // };
//   return (
//     <div className="p-4 md:p-8">
//       <div className="max-w-2xl mx-auto">
//         <div className="flex items-center justify-between mb-6">
//           <h2 className=" mt-12 text-2xl font-bold">Reviews</h2>
//           <ArrowLeft
//             onClick={() => window.history.back()}
//             className="text-black mt-14  hover:text-gray-800 cursor-pointer"
//             size={24} // Adjust size as needed
//           />
//         </div>

//         <div>
//           <h3 className="text-lg font-bold mb-2">
//             Business Id:- {businessData?.BusinessId}
//           </h3>
//           <h3 className="text-lg font-bold mb-2">
//             Business Name:- {businessData?.Name}
//           </h3>
//           <p>Complete Review:- {completeCount.length}</p>
//           <p>Incomplete Review:- {incompleteCount.length}</p>
//         </div>

//         {editMode ? (
//           <form
//             onSubmit={handleUpdate}
//             className="mb-8 p-4 bg-gray-50 rounded-lg"
//           >
//             <h3 className="text-lg font-semibold mb-4">Edit Business</h3>
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-gray-700 mb-2">
//                   Business Name
//                 </label>
//                 <input
//                   type="text"
//                   value={editForm.name}
//                   onChange={(e) =>
//                     setEditForm({ ...editForm, name: e.target.value })
//                   }
//                   className="w-full p-2 border rounded"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-gray-700 mb-2">
//                   Business Link
//                 </label>
//                 <input
//                   type="url"
//                   value={editForm.link}
//                   onChange={(e) =>
//                     setEditForm({ ...editForm, link: e.target.value })
//                   }
//                   className="w-full p-2 border rounded"
//                   required
//                 />
//               </div>
//               <div className="flex space-x-2">
//                 <button
//                   type="submit"
//                   className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//                 >
//                   Save Changes
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => setEditMode(false)}
//                   className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </form>
//         ) : (
//           <div className="mb-8">
//             <h3 className="text-xl font-semibold">{selectedBusiness?.name}</h3>
//             <a
//               href={selectedBusiness?.link}
//               className="text-blue-600 hover:underline"
//             >
//               {selectedBusiness?.link}
//             </a>
//           </div>
//         )}

//         <div className="space-y-8">
//           <div className="bg-white p-6 rounded-lg shadow">
//             <h3 className="text-lg font-semibold mb-4">Add Single Review</h3>
//             <form onSubmit={handleReviewSubmit} className="space-y-4">
//               <div>
//                 <label className="block text-gray-700 mb-2">Description</label>
//                 <textarea
//                   value={reviewForm.description}
//                   onChange={(e) =>
//                     setReviewForm({
//                       ...reviewForm,
//                       description: e.target.value,
//                     })
//                   }
//                   className="w-full p-2 border rounded"
//                   rows="4"
//                   required
//                 />
//               </div>
//               <button
//                 type="submit"
//                 className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//               >
//                 Submit Review
//               </button>
//             </form>
//           </div>

//           <div className="bg-white p-6 rounded-lg shadow">
//             <h3 className="text-lg font-semibold mb-4">Bulk Review Upload</h3>
//             <label className="block">
//               <span className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 cursor-pointer inline-block">
//                 Upload Excel File
//                 <input
//                   type="file"
//                   accept=".xlsx,.xls"
//                   className="hidden"
//                   onChange={handleBulkReview}
//                 />
//               </span>
//             </label>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddReview;

import React, { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useLocation } from "react-router-dom";
import * as XLSX from "xlsx";
import axios from "axios";

const AddReview = () => {
  const location = useLocation();
  const [editMode, setEditMode] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", link: "" });
  const [reviewForm, setReviewForm] = useState({
    name: "",
    email: "",
    stars: 5,
    description: "",
  });
  const [description, setDescription] = useState("");
  const [jsonData, setJsonData] = useState([]);
  const [businessData, setBusinessData] = useState(null);
  const [completeCount, setCompleteCount] = useState(0);
  const [incompleteCount, setIncompleteCount] = useState(0);

  // Fetch business data
  const fetchBusinessData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/businesses/get/${location.state.Id}`
      );
      var unFilterData = response.data.Review.filter(
        (value) => value.Status === "Incomplete"
      );
      var filterData = response.data.Review.filter(
        (value) => value.Status === "Approved"
      );
      setCompleteCount(filterData);
      setIncompleteCount(unFilterData);
      // console.log(unFilterData)
      setBusinessData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching business data", error);
    }
  };
  useEffect(() => {
    fetchBusinessData();
  }, [location.state.Id]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0]; // Get the first sheet
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }); // Convert sheet to JSON (as a 2D array)
      const columnData = jsonData.map((row) => row[0]).filter((item) => item);
      const formattedArray = columnData.map((item) => ({
        Description: item,
        Status: "Incomplete",
      }));
      setJsonData(formattedArray); // Update state with array of data
    };

    reader.readAsArrayBuffer(file);
  };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(location.state)
            const response = await axios.post(`http://localhost:5000/businesses/add/${location.state.Id}/review`, {
                Description: description,
            });
            setDescription(""); // Reset the form
            fetchBusinessData()
        } catch (error) {
            console.log(error); // Error message
        }

    };

  const submitBulkData = async () => {
    try {
      if (jsonData.length === 0) {
        alert("Please upload an Excel file before submitting.");
        return;
      }
      const response = await axios.post(
        `http://localhost:5000/businesses/${location.state.Id}/reviews/bulk-upload`,
        {
          reviews: jsonData,
        }
      );
      alert("Bulk reviews uploaded successfully!");
      fetchBusinessData()
      setJsonData([]); // Clear JSON data after successful upload
    } catch (error) {
      console.error("Error uploading bulk reviews:", error);
      alert("Failed to upload bulk reviews. Please try again.");
    }
  };

  // const handleBulkReview = async (event) => {
  //     const file = event.target.files[0];
  //     const reader = new FileReader();

  //     reader.onload = (e) => {
  //         const data = new Uint8Array(e.target.result);
  //         const workbook = XLSX.read(data, { type: "array" });
  //         const sheetName = workbook.SheetNames[0];
  //         const worksheet = workbook.Sheets[sheetName];
  //         const jsonData = XLSX.utils.sheet_to_json(worksheet);
  //         console.log("Bulk review data:", jsonData);
  //     };

  //     reader.readAsArrayBuffer(file);
  // };
  return (
    <div className="p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className=" mt-12 text-2xl font-bold">Reviews</h2>
          <ArrowLeft
            onClick={() => window.history.back()}
            className="text-black mt-14  hover:text-gray-800 cursor-pointer"
            size={24} // Adjust size as needed
          />
        </div>

        <div>
          <h3 className="text-lg font-bold mb-2">
            Business Id:- {businessData?.BusinessId}
          </h3>
          <h3 className="text-lg font-bold mb-2">
            Business Name:- {businessData?.Name}
          </h3>
          <h3 className="text-lg font-bold mb-2">
            Business Link:- {businessData?.Link}
          </h3>
          <p>Complete Review:- {completeCount.length}</p>
          <p>Incomplete Review:- {incompleteCount.length}</p>
        </div>

        {editMode ? (
          <form
            onSubmit={handleUpdate}
            className="mb-8 p-4 bg-gray-50 rounded-lg"
          >
            <h3 className="text-lg font-semibold mb-4">Edit Business</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">
                  Business Name
                </label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) =>
                    setEditForm({ ...editForm, name: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">
                  Business Link
                </label>
                <input
                  type="url"
                  value={editForm.link}
                  onChange={(e) =>
                    setEditForm({ ...editForm, link: e.target.value })
                  }
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
            <h3 className="text-xl font-semibold">{selectedBusiness?.name}</h3>
            <a
              href={selectedBusiness?.link}
              className="text-blue-600 hover:underline"
            >
              {selectedBusiness?.link}
            </a>
          </div>
        )}

        <div className="space-y-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Add Single Review</h3>
            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
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
            <label className="block mb-4">
              <span className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 cursor-pointer inline-block">
                Upload Excel File
                <input
                  type="file"
                  accept=".xlsx,.xls"
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </span>
            </label>
            <button
              onClick={submitBulkData}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Submit Bulk Reviews
            </button>
          </div>
        </div>
      </div>
      {jsonData.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-bold mb-2">Converted JSON Data:</h3>
          <pre className="bg-gray-100 p-4 rounded-lg max-h-96 overflow-auto">
            {JSON.stringify(jsonData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default AddReview;
