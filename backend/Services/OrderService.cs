using backend.Models;
using backend.DTO;

namespace backend.Services;

public class OrderService : IOrderService
{
    private List<Order> _orders = new();
    private int _nextId = 1;

    public Task<IEnumerable<Order>> GetOrdersAsync(String? productName = null)
    {
        var orders = _orders.AsEnumerable();
        
        if (!string.IsNullOrWhiteSpace(productName))
        {
            orders = orders.Where(o => o.ProductName != null && o.ProductName.Contains(productName, StringComparison.OrdinalIgnoreCase));
        }
        
        return Task.FromResult<IEnumerable<Order>>(orders.OrderByDescending(o => o.OrderDate));
    }

    public Task<Order> CreateOrderAsync(OrderDTO orderDTO)
    {
        var order = new Order
        {
            Id = _nextId++,
            ProductName = orderDTO.ProductName,
            Quantity = orderDTO.Quantity,
            OrderDate = DateTime.UtcNow
        };

        _orders.Add(order);
        return Task.FromResult(order);
    }
}