namespace OnlineAptitudeTestDB.ViewModel
{
    public class QuestionViewModel
    {
        public int Id { get; set; }
        public int QuestionId { get; set; }
        public string TopicName { get; set; } = null!;

        public string ContentQuestion { get; set; } = null!;
        public int TestCode { get; set; }
        public List<AnswerViewModel> ContentAnswer { get; set; } = null!;
        public List<string> CorrectAnswer { get; set; } = null!;

    }
}
