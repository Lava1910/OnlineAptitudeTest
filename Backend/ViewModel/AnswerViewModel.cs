using System.Diagnostics.Eventing.Reader;

namespace OnlineAptitudeTestDB.ViewModel
{
    public class AnswerViewModel
    {
        public string Title { get; set; } = null!;
        public bool Checked { get; set; }
        public bool Correct { get; set; }
    }
}
