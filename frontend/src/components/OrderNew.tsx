import React from "react";
import OrderDTO from "../interfaces/OrderDTO";

export default function OrderNew(props: {
    onSubmit: (e: React.FormEvent) => Promise<void>,
    newOrder: OrderDTO,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
}) {
    return <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Nouvelle Commande</h2>
        <form onSubmit={props.onSubmit} className="space-y-4">
            <input
                name="productName"
                type="text"
                placeholder="Nom du produit"
                value={props.newOrder.productName}
                onChange={props.onChange}
                required
                className="w-full p-2 border rounded-md"
            />
            <input
                name="quantity"
                type="number"
                min="1"
                value={props.newOrder.quantity}
                onChange={props.onChange}
                required
                className="w-full p-2 border rounded-md"
            />
            <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            >
                Créer la commande
            </button>
        </form>
    </div>;
}