using System.ComponentModel.DataAnnotations.Schema;

namespace project_backend.Models
{
    [Table("companydata")]
    public class CompanyData
    {
        public int Id { get; set; }
        public string Department { get; set; }
        public double Revenue { get; set; }
        public double Expenses { get; set; }
    }
}
