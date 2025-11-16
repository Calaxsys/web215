import { useEffect, useState } from "react";
import { Link, Navigate, useOutletContext } from "react-router-dom";
import { API_URL } from "../config";

const CollectionItem = (props) => (
  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
      {props.item.itemName}
    </td>
    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
      {props.item.source}
    </td>
    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
      {props.item.amountCollected}
    </td>
    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
      <div className="flex gap-2">
        <Link
          className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3"
          to={`/collection-log/edit/${props.item._id}`}
        >
          Edit
        </Link>
        <button
          className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 hover:text-accent-foreground h-9 rounded-md px-3"
          type="button"
          onClick={() => {
            props.deleteItem(props.item._id);
          }}
        >
          Delete
        </button>
      </div>
    </td>
  </tr>
);

export default function CollectionLog() {
  const [items, setItems] = useState([]);
  const { isAuthenticated } = useOutletContext();

  useEffect(() => {
    document.title = "Collection Log - RuneTrack 2.0";
  }, []);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Fetch collection log items from the database
  useEffect(() => {
    async function getItems() {
      const response = await fetch(`${API_URL}/collection-log/`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const items = await response.json();
      setItems(items);
    }
    getItems();
    return;
  }, [items.length]);

  // Delete a collection log item
  async function deleteItem(id) {
    await fetch(`${API_URL}/collection-log/${id}`, {
      method: "DELETE",
    });
    const newItems = items.filter((el) => el._id !== id);
    setItems(newItems);
  }

  // Map out the collection log items in the table
  function itemList() {
    return items.map((item) => {
      return (
        <CollectionItem
          item={item}
          deleteItem={() => deleteItem(item._id)}
          key={item._id}
        />
      );
    });
  }

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold p-4">Collection Log</h3>
        <Link
          to="/collection-log/add"
          className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-blue-600 text-white hover:bg-blue-700 h-9 rounded-md px-4"
        >
          Add Item
        </Link>
      </div>
      <div className="border rounded-lg overflow-hidden">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  Item Name
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  Source
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  Amount Collected
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {itemList()}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
