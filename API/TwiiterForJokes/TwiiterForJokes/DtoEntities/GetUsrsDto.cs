using TwiiterForJokes.Entitys;

namespace TwiiterForJokes.DtoEntities
{
    /// <summary>
    /// special users DTO class to transfer specific data of User's name and jokes
    /// </summary>
    public class GetUsrsDto
    {
     
        public string UserName { get; set; }
        public ICollection<Joke> Jokes { get; set; }
    }
}
