using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Migrations
{
    /// <inheritdoc />
    public partial class likeduserdecks : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "LikedUserDecks",
                columns: table => new
                {
                    DeckId = table.Column<int>(type: "int", nullable: false),
                    LikerUserId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LikedUserDecks", x => new { x.DeckId, x.LikerUserId });
                    table.ForeignKey(
                        name: "FK_LikedUserDecks_Decks_DeckId",
                        column: x => x.DeckId,
                        principalTable: "Decks",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_LikedUserDecks_Users_LikerUserId",
                        column: x => x.LikerUserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_LikedUserDecks_LikerUserId",
                table: "LikedUserDecks",
                column: "LikerUserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "LikedUserDecks");
        }
    }
}
