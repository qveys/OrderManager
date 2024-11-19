using System.ComponentModel.DataAnnotations;

namespace backend.DTO;

public class OrderDTO
{
    [StringLength(100)]
    public String? ProductName { get; set; }
    
    [Required]
    [Range(1, Int32.MaxValue)]
    public Int32 Quantity { get; set; }
}