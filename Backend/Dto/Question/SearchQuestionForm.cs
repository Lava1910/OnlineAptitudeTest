namespace OnlineAptitudeTestDB.Dto.Question
{
    public class SearchQuestionForm
    {
        public string? Search {get; set;}
        public string? Type { get; set; }
        public string? Topic { get; set; }
        public int? DifficultyLevel { get; set; }
    }
}
