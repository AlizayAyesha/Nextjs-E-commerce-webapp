"use client";

import { useState } from 'react';
import { useShoppingCart } from "use-shopping-cart";
import { urlFor } from "@/lib/imageUrl";

const ShipmentForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    zipCode: '',
    email: '',
    phone: ''
  });

  const { cartDetails } = useShoppingCart();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Shipment details submitted:", formData);
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Shipment Form</h1>

      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Products in Your Cart:</h2>
        {Object.values(cartDetails || {}).length > 0 ? (
          <ul className="list-disc pl-5">
            {Object.values(cartDetails || {}).map((item) => (
              <li key={item.name} className="mb-2 flex items-center">
                {/* Check if item.image is defined and process it accordingly */}
                {item.image ? (
                  <img
                    src={
                      typeof item.image === 'string'
                        ? item.image // Use directly if it's a string
                        : urlFor(item.image as any) // Cast to 'any' for flexibility; ensure urlFor returns string
                    }
                    alt={item.name}
                    className="h-20 w-20 object-cover mr-2 inline"
                  />
                ) : (
                  <span>No image available</span> // Fallback when image is undefined
                )}
                <span>{item.name} - {item.quantity} x {item.price} {item.currency}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No products in your cart.</p>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        {/* Form fields */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 p-2 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 p-2 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 p-2 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">Zip Code</label>
          <input
            type="text"
            id="zipCode"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 p-2 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 p-2 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 p-2 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-500 transition duration-300"
        >
          Submit Shipment Details
        </button>
      </form>
    </div>
  );
};

export default ShipmentForm;
