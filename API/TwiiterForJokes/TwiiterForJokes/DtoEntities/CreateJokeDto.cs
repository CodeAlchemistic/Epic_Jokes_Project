namespace TwiiterForJokes.DtoEntities
{
    /// <summary>
    /// DTO entities for creation restrictions during HttpPost API calls 
    /// To transfer just part of the entity from UI (user interface)
    /// </summary>

    public class CreateJokeDto
    {
        /// <summary>
        /// TEMPORARY attribute
        /// Is going to be deleted and unavaliable to create and transfer from user interface in future
        /// </summary>
        //public int UsrId { get; set; }
        public string JokeContent { get; set; }
        public int Rating { get; set; }
    }
}
