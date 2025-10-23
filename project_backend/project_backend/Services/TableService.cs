using System.Security.Claims;
using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using project_backend.Data;
using project_backend.Models;

namespace project_backend.Services
{
    public class TableService : ITableService
    {
        private readonly AppDbContext _context;

        public TableService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<object>> GetTableDataAsync(string tableName, ClaimsPrincipal user)
        {
            return tableName.ToLower() switch
            {
                "users" => await GetUsersTableData(user),
                "items" => await GetItemsTableData(user),
                "companydata" => await GetCompanyDataTableData(user),
                _ => throw new ArgumentException("Invalid table name")
            };
        }

        public async Task<bool> UpdateTableRowAsync(string tableName, string id, object rowData, ClaimsPrincipal user)
        {
            return tableName.ToLower() switch
            {
                "users" => await UpdateUsersTableRow(id, rowData, user),
                "items" => await UpdateItemsTableRow(id, rowData, user),
                "companydata" => await UpdateCompanyDataTableRow(id, rowData, user),
                _ => throw new ArgumentException("Invalid table name")
            };
        }

        private async Task<IEnumerable<object>> GetUsersTableData(ClaimsPrincipal user)
        {
            if (!user.IsInRole("Admin"))
            {
                throw new UnauthorizedAccessException("You do not have permission to view user data.");
            }
            return await _context.Users
                .Select(u => new { u.Id, u.Email, u.Role })
                .ToListAsync();
        }

        private async Task<IEnumerable<object>> GetItemsTableData(ClaimsPrincipal user)
        {
            return await _context.Items.ToListAsync();
        }

        private async Task<IEnumerable<object>> GetCompanyDataTableData(ClaimsPrincipal user)
        {
            if (!user.IsInRole("Admin") && !user.IsInRole("Manager"))
            {
                throw new UnauthorizedAccessException("You do not have permission to view company data.");
            }

            return await _context.CompanyData.ToListAsync();
        }

        private async Task<bool> UpdateUsersTableRow(string id, object rowData, ClaimsPrincipal user)
        {
            if (!user.IsInRole("Admin"))
            {
                throw new UnauthorizedAccessException("You do not have permission to modify user data.");
            }

            if (!int.TryParse(id, out var userId))
            {
                return false;
            }

            var userToUpdate = await _context.Users.FindAsync(userId);
            if (userToUpdate == null) return false;

            var userDto = JsonSerializer.Deserialize<User>(JsonSerializer.Serialize(rowData), new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
            if (userDto == null) return false;

            userToUpdate.Email = userDto.Email;
            userToUpdate.Role = userDto.Role;

            await _context.SaveChangesAsync();
            return true;
        }

        private async Task<bool> UpdateItemsTableRow(string id, object rowData, ClaimsPrincipal user)
        {
            if (!int.TryParse(id, out var itemId)) return false;
            
            var itemToUpdate = await _context.Items.FindAsync(itemId);
            if (itemToUpdate == null) return false;

            var itemDto = JsonSerializer.Deserialize<Item>(JsonSerializer.Serialize(rowData), new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
            if (itemDto == null) return false;

            itemToUpdate.Name = itemDto.Name;
            itemToUpdate.Quantity = itemDto.Quantity;
            itemToUpdate.Price = itemDto.Price;

            await _context.SaveChangesAsync();
            return true;
        }

        private async Task<bool> UpdateCompanyDataTableRow(string id, object rowData, ClaimsPrincipal user)
        {
            if (!user.IsInRole("Admin") && !user.IsInRole("Manager"))
            {
                throw new UnauthorizedAccessException("You do not have permission to modify company data.");
            }
            
            if (!int.TryParse(id, out var companyDataId)) return false;

            var companyDataToUpdate = await _context.CompanyData.FindAsync(companyDataId);
            if (companyDataToUpdate == null) return false;

            var companyDataDto = JsonSerializer.Deserialize<CompanyData>(JsonSerializer.Serialize(rowData), new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
            if (companyDataDto == null) return false;

            companyDataToUpdate.Department = companyDataDto.Department;
            companyDataToUpdate.Revenue = companyDataDto.Revenue;
            companyDataToUpdate.Expenses = companyDataDto.Expenses;

            await _context.SaveChangesAsync();
            return true;
        }
    }
}
