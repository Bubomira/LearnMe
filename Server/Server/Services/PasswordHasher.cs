
using Server.Interfaces.ServiceInterfaces;
using System.Security.Cryptography;

namespace Server.Services
{
    public class PasswordHasher : IPasswordHasher
    {
        private const int _saltSize = 128 / 8;
        private const int _keySize = 256 / 8;
        private const int _iterations = 10000;
        private static readonly HashAlgorithmName _hashAlgorithmName = HashAlgorithmName.SHA256;
        private static char Delimeter = ';';
        public Task<string> CreatePasswordHash(string password)
        {
            var salt = RandomNumberGenerator.GetBytes(_saltSize);
            var hash = Rfc2898DeriveBytes.Pbkdf2(password, salt, _iterations, _hashAlgorithmName, _keySize);

            return Task.Run(() => string.Join(Delimeter, Convert.ToBase64String(salt), Convert.ToBase64String(hash)));
        }
        public async Task<bool> CheckIfPasswordsAreEqual(string inputPassword, string originalHash)
        {
            var elements = originalHash.Split(Delimeter);
            var salt = Convert.FromBase64String(elements[0]);
            var hash = Convert.FromBase64String(elements[1]);

            var hashInput = Rfc2898DeriveBytes.Pbkdf2(inputPassword, salt, _iterations, _hashAlgorithmName, _keySize);

            return CryptographicOperations.FixedTimeEquals(hash, hashInput);
        }
    }
}
