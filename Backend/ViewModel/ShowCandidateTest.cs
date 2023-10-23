namespace OnlineAptitudeTestDB.ViewModel
{
    public class ShowCandidateTest
    {
        public string ContentQuestion { get; set; } = null!;
        public List<string> ContentAnswer { get; set; } = null!;
        public List<string> CorrectAnswer { get; set; } = null!;
        public List<string>? CandidateAnswer { get; set; }
    }
}
