﻿namespace OnlineAptitudeTestDB.Dto.User
{
    public class UserData
    {
        public int Id { get; set; }

        public string? Name { get; set; }

        public string? UserName { get; set; }
        public int? TotalScore { get; set; }
        public int? Status { get; set; }

        public string? Token { get; set; }
    }
}
