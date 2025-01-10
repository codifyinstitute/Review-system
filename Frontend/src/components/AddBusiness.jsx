import { useState } from "react";
import { motion } from "framer-motion";

function AddBusiness() {
  const [formData, setFormData] = useState({
    businessName: "",
    businessLink: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <motion.div
      className="max-w-md mx-auto p-8 bg-white shadow-lg rounded-lg"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="mt-10 text-2xl font-bold text-center text-blue-600 mb-8">
        Add Business
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-xl text-gray-700 mb-2">
            Business Name
          </label>
          <input
            type="text"
            value={formData.businessName}
            onChange={(e) =>
              setFormData({ ...formData, businessName: e.target.value })
            }
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-base"
            required
          />
        </div>
        <div>
          <label className="block text-xl text-gray-700 mb-2">
            Business Link
          </label>
          <input
            type="url"
            value={formData.businessLink}
            onChange={(e) =>
              setFormData({ ...formData, businessLink: e.target.value })
            }
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-base"
            required
          />
        </div>
        <motion.button
          type="submit"
          className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 text-base"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Submit
        </motion.button>
      </form>
    </motion.div>
  );
}

export default AddBusiness;
