import React, {useEffect, useState} from 'react'
import Order from "../interfaces/Order"
import OrderNew from "../components/OrderNew"
import OrderDTO from "../interfaces/OrderDTO";
import OrderList from "./OrderList";

const OrderManager = () => {
    const [orders, setOrders] = useState<Order[]>([])
    const [searchTerm, setSearchTerm] = useState('')
    const [newOrder, setNewOrder] = useState<OrderDTO>({
        productName: '',
        quantity: 1
    })

    const fetchOrders = async (productName?: string) => {
        try {
            const queryParams = productName ? `?productName=${encodeURIComponent(productName)}` : ''
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/orders${queryParams}`)
            if (response.ok) {
                const data = await response.json()
                setOrders(data)
            }
        } catch (error) {
            console.error('Error fetching orders:', error)
        }
    }

    useEffect(() => {
        fetchOrders(searchTerm)
    }, [searchTerm])

    const handleCreateOrder = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newOrder),
            })

            if (response.ok) {
                setNewOrder({productName: '', quantity: 1})
                fetchOrders(searchTerm)
            }
        } catch (error) {
            console.error('Error creating order:', error)
        }
    }

    return (
        <div className="max-w-4xl mx-auto p-4 space-y-6">
            <OrderNew onSubmit={handleCreateOrder}
                      newOrder={newOrder}
                      onChange={(e) => {
                          console.log(e.target.name);
                          setNewOrder({...newOrder, [e.target.name]: e.target.value})}}/>

            <OrderList orders={orders}
                       searchTerm={searchTerm}
                       setSearchTerm={setSearchTerm}/>
        </div>
    )
}

export default OrderManager