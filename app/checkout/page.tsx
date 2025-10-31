"use client";

import { useState } from 'react';
import { useShoppingCart } from "use-shopping-cart";
import { urlFor } from "../../lib/imageUrl";
import Header from "../components/Header";
import Script from "next/script";



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
    <>
      {/* Modal and overlay */}
      <div className="overlay" data-overlay></div>

      <main>
        <div className="container mx-auto px-4 py-8">
          <div className="payment-page">
            <h1 className="text-3xl font-bold mb-6 text-center">Payment Methods</h1>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Products in Your Cart:</h2>
              {Object.values(cartDetails || {}).length > 0 ? (
                <ul className="space-y-4">
                  {Object.values(cartDetails || {}).map((item) => (
                    <li key={item.name} className="flex items-center bg-white p-4 rounded-lg shadow-md">
                      {item.image ? (
                        <img
                          src={
                            typeof item.image === 'string'
                              ? item.image
                              : urlFor(item.image as any)
                          }
                          alt={item.name}
                          className="h-20 w-20 object-cover mr-4"
                        />
                      ) : (
                        <span className="text-gray-500 mr-4">No image</span>
                      )}
                      <span className="text-lg">{item.name} - {item.quantity} x {item.price} {item.currency}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No products in your cart.</p>
              )}
            </div>

            <div className="payment-section space-y-8">
              <div className="payment-methods">
                <h3 className="text-xl font-semibold mb-4">Saved Payment Methods</h3>

                <div className="space-y-4">
                  <div className="payment-method-card flex justify-between items-center bg-white p-4 rounded-lg shadow-md">
                    <div className="payment-method-info flex items-center">
                      <ion-icon name="card-outline" className="text-2xl mr-2"></ion-icon>
                      <div>
                        <div className="payment-method-type font-medium">Visa ****1234</div>
                        <p className="text-gray-500">Expires 12/26</p>
                      </div>
                    </div>
                    <div className="payment-method-actions space-x-2">
                      <button className="btn btn-outline btn-sm px-3 py-1 border border-gray-300 rounded hover:bg-gray-100">Edit</button>
                      <button className="btn btn-danger btn-sm px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">Remove</button>
                    </div>
                  </div>

                  <div className="payment-method-card flex justify-between items-center bg-white p-4 rounded-lg shadow-md">
                    <div className="payment-method-info flex items-center">
                      <ion-icon name="card-outline" className="text-2xl mr-2"></ion-icon>
                      <div>
                        <div className="payment-method-type font-medium">Mastercard ****5678</div>
                        <p className="text-gray-500">Expires 08/27</p>
                      </div>
                    </div>
                    <div className="payment-method-actions space-x-2">
                      <button className="btn btn-outline btn-sm px-3 py-1 border border-gray-300 rounded hover:bg-gray-100">Edit</button>
                      <button className="btn btn-danger btn-sm px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">Remove</button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="add-payment-method">
                <h3 className="text-xl font-semibold mb-4">Add New Payment Method</h3>

                <div className="payment-form bg-white p-6 rounded-lg shadow-md">
                  <form onSubmit={handleSubmit}>
                    <div className="form-group mb-4">
                      <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        className="form-control w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="form-row flex space-x-4 mb-4">
                      <div className="form-group flex-1">
                        <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                        <input
                          type="text"
                          id="expiryDate"
                          name="expiryDate"
                          placeholder="MM/YY"
                          className="form-control w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="form-group flex-1">
                        <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                        <input
                          type="text"
                          id="cvv"
                          name="cvv"
                          placeholder="123"
                          className="form-control w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div className="form-group mb-4">
                      <label htmlFor="cardholderName" className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
                      <input
                        type="text"
                        id="cardholderName"
                        name="cardholderName"
                        placeholder="John Doe"
                        className="form-control w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-500 transition duration-300"
                    >
                      Add Card
                    </button>
                  </form>
                </div>
              </div>

              <div className="payment-settings">
                <h3 className="text-xl font-semibold mb-4">Payment Preferences</h3>

                <div className="setting-item flex justify-between items-center bg-white p-4 rounded-lg shadow-md mb-4">
                  <div className="setting-info">
                    <h4 className="font-medium">Default Payment Method</h4>
                    <p className="text-gray-500">Set your preferred payment method for quick checkout</p>
                  </div>
                  <select className="form-control form-control-sm px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Visa ****1234</option>
                    <option>Mastercard ****5678</option>
                  </select>
                </div>

                <div className="setting-item flex justify-between items-center bg-white p-4 rounded-lg shadow-md">
                  <div className="setting-info">
                    <h4 className="font-medium">Billing Address</h4>
                    <p className="text-gray-500">Update your billing address information</p>
                  </div>
                  <button className="btn btn-outline px-4 py-2 border border-gray-300 rounded hover:bg-gray-100">Update</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>


      {/* Scripts */}
      <Script src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js" strategy="afterInteractive" />
      <Script src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js" strategy="afterInteractive" />
    </>
  );
};

export default ShipmentForm;
