using backend.Models;
using backend.DTO;

namespace backend.Services;

public interface IOrderService
{
    Task<IEnumerable<Order>> GetOrdersAsync(String? productName = null);
    Task<Order> CreateOrderAsync(OrderDTO orderDTO);
}