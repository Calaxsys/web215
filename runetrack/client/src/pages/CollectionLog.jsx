import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CollectionLog() {
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState("");
  const [amount, setAmount] = useState(1);

  const API = "http://localhost:5050/collection";

  /* ==========================
     Fetch all items
  ========================== */
  const fetchItems = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setItems(data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  /* ==========================
     Add new item
  ========================== */
  const addItem = async (e) => {
    e.preventDefault();

    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ itemName, amount }),
    });

    setItemName("");
    setAmount(1);
    fetchItems();
  };

  /* ==========================
     Increase amount (+1)
  ========================== */
  const increaseAmount = async (id) => {
    await fetch(`${API}/${id}/increase`, { method: "PATCH" });
    fetchItems();
  };

  /* ==========================
     Edit amount manually
  ========================== */
  const editAmount = async (id, newAmount) => {
    await fetch(`${API}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: Number(newAmount) }),
    });

    fetchItems();
  };

  /* ==========================
     Delete item
  ========================== */
  const deleteItem = async (id) => {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    fetchItems();
  };

  return (
    <div className="min-h-screen bg-green-100 p-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-6">Collection Log</h1>

      {/* Return Home Button */}
      <button
        onClick={() => navigate("/dashboard")}
        className="mb-6 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition cursor-pointer"
      >
        ← Back to Dashboard
      </button>

      {/* Add New Item Form */}
      <form
        onSubmit={addItem}
        className="bg-white p-4 rounded shadow w-full max-w-md mb-8"
      >
        <h2 className="text-xl font-semibold mb-3">Add New Item</h2>

        <input
          className="border p-2 w-full mb-2 rounded"
          type="text"
          placeholder="Item Name"
          required
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />

        <input
          className="border p-2 w-full mb-2 rounded"
          type="number"
          min="1"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button className="w-full bg-green-500 text-black py-2 rounded hover:bg-green-600 transition cursor-pointer">
          Add Item
        </button>
      </form>

      {/* Item List */}
      <div className="w-full max-w-lg">
        {items.length === 0 && (
          <p className="text-gray-700 text-center">No items added yet.</p>
        )}

        {items.map((item) => (
          <div
            key={item._id}
            className="bg-white p-4 rounded shadow mb-4 flex justify-between items-center"
          >
            <div>
              <h3 className="text-lg font-bold">{item.itemName}</h3>
              <p className="text-gray-600">Amount: {item.amount}</p>
            </div>

            <div className="flex gap-2 items-center">

              {/* Increase Button */}
              <button
                onClick={() => increaseAmount(item._id)}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                +1
              </button>

              {/* Edit Amount */}
              <input
                type="number"
                min="0"
                className="border w-16 text-center rounded"
                value={item.amount}
                onChange={(e) => editAmount(item._id, e.target.value)}
              />

              {/* Delete Button */}
              <button
                onClick={() => deleteItem(item._id)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                ✕
              </button>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
