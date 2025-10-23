using System.ComponentModel.DataAnnotations.Schema;

namespace project_backend.Models
{
    [Table("item")]
    public class Item
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Quantity { get; set; }
        public double Price { get; set; }
    }
}
