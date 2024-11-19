using Microsoft.AspNetCore.Mvc;
using backend.DTO;
using backend.Models;
using backend.Services;

namespace backend.Controllers;

[Route("/api/[controller]")]
[ApiController]
public class OrdersController : ControllerBase
{
    private readonly IOrderService _orderService;

    public OrdersController(IOrderService orderService)
    {
        _orderService = orderService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Order>>> GetOrders([FromQuery] String? productName)
    {
        var orders = await _orderService.GetOrdersAsync(productName);
        return Ok(orders);
    }

    [HttpPost]
    public async Task<ActionResult<Order>> CreateOrder([FromBody] OrderDTO orderDTO)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var order = await _orderService.CreateOrderAsync(orderDTO);
        return CreatedAtAction(nameof(GetOrders), new { id = order.Id }, order);
    }
}