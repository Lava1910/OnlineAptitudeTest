using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace OnlineAptitudeTestDB.Entities;

public partial class OnlineAptitudeTestDbContext : DbContext
{
    public OnlineAptitudeTestDbContext()
    {
    }

    public OnlineAptitudeTestDbContext(DbContextOptions<OnlineAptitudeTestDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<AdminManager> AdminManagers { get; set; }

    public virtual DbSet<Answer> Answers { get; set; }

    public virtual DbSet<Candidate> Candidates { get; set; }

    public virtual DbSet<CandidateAnswer> CandidateAnswers { get; set; }

    public virtual DbSet<Question> Questions { get; set; }

    public virtual DbSet<QuestionTopic> QuestionTopics { get; set; }

    public virtual DbSet<QuestionType> QuestionTypes { get; set; }

    public virtual DbSet<Test> Tests { get; set; }

    public virtual DbSet<TestQuestion> TestQuestions { get; set; }

//    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
//#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
//        => optionsBuilder.UseSqlServer("Data Source=vietanh-pc;Initial Catalog=OnlineAptitudeTestDB;Integrated Security=True;TrustServerCertificate=true");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<AdminManager>(entity =>
        {
            entity.HasKey(e => e.AdminManagerId).HasName("PK__AdminMan__8B21DC4959C841F3");

            entity.ToTable("AdminManager");

            entity.Property(e => e.AdminManagerId).HasColumnName("AdminManagerID");
            entity.Property(e => e.Birthday).HasColumnType("date");
            entity.Property(e => e.Email)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Gender)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Password)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Phone)
                .HasMaxLength(45)
                .IsUnicode(false);
            entity.Property(e => e.Role)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Username)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Answer>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Answer__3214EC2798EF04BB");

            entity.ToTable("Answer");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.ContentAnswer).HasColumnType("ntext");
            entity.Property(e => e.QuestionId).HasColumnName("QuestionID");

            entity.HasOne(d => d.Question).WithMany(p => p.Answers)
                .HasForeignKey(d => d.QuestionId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Answer__Question__45F365D3");
        });

        modelBuilder.Entity<Candidate>(entity =>
        {
            entity.HasKey(e => e.CandidateId).HasName("PK__Candidat__DF539BFCADDC8610");

            entity.ToTable("Candidate");

            entity.Property(e => e.CandidateId).HasColumnName("CandidateID");
            entity.Property(e => e.Birthday).HasColumnType("date");
            entity.Property(e => e.DisabledUntil).HasColumnType("date");
            entity.Property(e => e.EducationDetails)
                .HasColumnType("ntext")
                .HasColumnName("Education_Details");
            entity.Property(e => e.Email)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Gender)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Password)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Phone)
                .HasMaxLength(45)
                .IsUnicode(false);
            entity.Property(e => e.Role)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Username)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.WorkExperience)
                .HasColumnType("ntext")
                .HasColumnName("Work_Experience");

            entity.HasOne(d => d.TestCodeNavigation).WithMany(p => p.Candidates)
                .HasForeignKey(d => d.TestCode)
                .HasConstraintName("FK__Candidate__TestC__6FE99F9F");
        });

        modelBuilder.Entity<CandidateAnswer>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Candidat__3214EC27FBA92BFC");

            entity.ToTable("Candidate_Answer");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.ContentCandidateAnswer).HasColumnType("ntext");
            entity.Property(e => e.QuestionId).HasColumnName("QuestionID");

            entity.HasOne(d => d.Question).WithMany(p => p.CandidateAnswers)
                .HasForeignKey(d => d.QuestionId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Candidate__Quest__76969D2E");

            entity.HasOne(d => d.TestCodeNavigation).WithMany(p => p.CandidateAnswers)
                .HasForeignKey(d => d.TestCode)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Candidate__TestC__778AC167");
        });

        modelBuilder.Entity<Question>(entity =>
        {
            entity.HasKey(e => e.QuestionId).HasName("PK__Question__0DC06F8C0C702E6E");

            entity.ToTable("Question");

            entity.Property(e => e.QuestionId).HasColumnName("QuestionID");
            entity.Property(e => e.ContentQuestion).IsUnicode(false);
            entity.Property(e => e.TimeStamp)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.TopicId).HasColumnName("TopicID");
            entity.Property(e => e.TypeId).HasColumnName("TypeID");

            entity.HasOne(d => d.Topic).WithMany(p => p.Questions)
                .HasForeignKey(d => d.TopicId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Question__TopicI__412EB0B6");

            entity.HasOne(d => d.Type).WithMany(p => p.Questions)
                .HasForeignKey(d => d.TypeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Question__TypeID__4222D4EF");
        });

        modelBuilder.Entity<QuestionTopic>(entity =>
        {
            entity.HasKey(e => e.TopicId).HasName("PK__Question__022E0F7DA6F0D4D3");

            entity.ToTable("QuestionTopic");

            entity.Property(e => e.TopicId).HasColumnName("TopicID");
            entity.Property(e => e.TopicName)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<QuestionType>(entity =>
        {
            entity.HasKey(e => e.TypeId).HasName("PK__Question__516F0395C2C1856B");

            entity.ToTable("QuestionType");

            entity.Property(e => e.TypeId).HasColumnName("TypeID");
            entity.Property(e => e.Type)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Test>(entity =>
        {
            entity.HasKey(e => e.TestCode).HasName("PK__Test__0B0C35F6F5492D8F");

            entity.ToTable("Test");

            entity.Property(e => e.TimeStart).HasColumnType("datetime");
            entity.Property(e => e.TimeToDo).HasColumnName("Time_To_Do");
        });

        modelBuilder.Entity<TestQuestion>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__TestQues__3214EC27133F6E32");

            entity.ToTable("TestQuestion");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.QuestionId).HasColumnName("QuestionID");

            entity.HasOne(d => d.Question).WithMany(p => p.TestQuestions)
                .HasForeignKey(d => d.QuestionId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__TestQuest__Quest__73BA3083");

            entity.HasOne(d => d.TestCodeNavigation).WithMany(p => p.TestQuestions)
                .HasForeignKey(d => d.TestCode)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__TestQuest__TestC__72C60C4A");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
