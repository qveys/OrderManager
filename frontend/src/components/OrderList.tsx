import Order from "../interfaces/Order"

export default function OrderList(props: {
    orders: Order[],
    searchTerm: string,
    setSearchTerm: (term: string) => void
}) {
    return (
        <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Liste des Commandes</h2>
            <input
                type="text"
                placeholder="Rechercher par nom de produit..."
                value={props.searchTerm}
                onChange={(e) => props.setSearchTerm(e.target.value)}
                className="w-full p-2 border rounded-md mb-4"
            />
            <div className="divide-y">
                <ul>
                    {props.orders.map(order => (
                        <li key={order.id}>
                            {order.productName} - {order.quantity} - {new Date(order.orderDate).toLocaleDateString()}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}