using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Migrations
{
    /// <inheritdoc />
    public partial class newMindmapColumn : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {

            migrationBuilder.AddColumn<string>(
                name: "JSONDiagram",
                table: "Mindmaps",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

        }
        protected override void Down(MigrationBuilder migrationBuilder)
        {
          

            migrationBuilder.DropColumn(
                name: "JSONDiagram",
                table: "Mindmaps");

        }
    }
}
