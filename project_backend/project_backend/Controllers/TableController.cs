
using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using project_backend.Services;

namespace project_backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class TableController : ControllerBase
    {
        private readonly ITableService _tableService;

        public TableController(ITableService tableService)
        { 
            _tableService = tableService;
        }

        [HttpGet("{tableName}")]
        public async Task<IActionResult> GetTableData(string tableName)
        {
            try
            {
                var data = await _tableService.GetTableDataAsync(tableName, HttpContext.User);
                return Ok(data);
            }
            catch (UnauthorizedAccessException ex)
            {
                return StatusCode(403, ex.Message);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{tableName}/{id}")]
        public async Task<IActionResult> UpdateTableRow(string tableName, string id, [FromBody] object rowData)
        {
            try
            {
                var result = await _tableService.UpdateTableRowAsync(tableName, id, rowData, HttpContext.User);
                if (result)
                {
                    return NoContent();
                }
                return NotFound();
            }
            catch (UnauthorizedAccessException ex)
            {
                return StatusCode(403, ex.Message);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
