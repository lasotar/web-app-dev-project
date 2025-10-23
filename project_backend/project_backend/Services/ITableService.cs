
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace project_backend.Services
{
    public interface ITableService
    {
        Task<IEnumerable<object>> GetTableDataAsync(string tableName, ClaimsPrincipal user);
        Task<bool> UpdateTableRowAsync(string tableName, string id, object rowData, ClaimsPrincipal user);
    }
}
