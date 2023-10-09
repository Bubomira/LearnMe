using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Migrations
{
    /// <inheritdoc />
    public partial class mindmaps : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Mindmaps",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    OwnerId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Mindmaps", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Mindmaps_Users_OwnerId",
                        column: x => x.OwnerId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "LikedUsersMindmaps",
                columns: table => new
                {
                    MindmapId = table.Column<int>(type: "int", nullable: false),
                    LikerUserId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LikedUsersMindmaps", x => new { x.MindmapId, x.LikerUserId });
                    table.ForeignKey(
                        name: "FK_LikedUsersMindmaps_Mindmaps_MindmapId",
                        column: x => x.MindmapId,
                        principalTable: "Mindmaps",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_LikedUsersMindmaps_Users_LikerUserId",
                        column: x => x.LikerUserId,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "MindmapsTags",
                columns: table => new
                {
                    MindmapId = table.Column<int>(type: "int", nullable: false),
                    TagId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MindmapsTags", x => new { x.MindmapId, x.TagId });
                    table.ForeignKey(
                        name: "FK_MindmapsTags_Mindmaps_MindmapId",
                        column: x => x.MindmapId,
                        principalTable: "Mindmaps",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MindmapsTags_Tags_TagId",
                        column: x => x.TagId,
                        principalTable: "Tags",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_LikedUsersMindmaps_LikerUserId",
                table: "LikedUsersMindmaps",
                column: "LikerUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Mindmaps_OwnerId",
                table: "Mindmaps",
                column: "OwnerId");

            migrationBuilder.CreateIndex(
                name: "IX_MindmapsTags_TagId",
                table: "MindmapsTags",
                column: "TagId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "LikedUsersMindmaps");

            migrationBuilder.DropTable(
                name: "MindmapsTags");

            migrationBuilder.DropTable(
                name: "Mindmaps");
        }
    }
}
