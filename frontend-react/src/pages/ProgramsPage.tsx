import { useMemo, useState } from "react";

type Program = {
  id: number;
  name: string;
  institution: string;
  degreeType: string;
  credits: number;
  description: string;
};

const mockPrograms: Program[] = [
  {
    id: 1,
    name: "Program 1",
    institution: "University 1",
    degreeType: "BS",
    credits: 120,
    description:
      "description for program ",
  },
  {
    id: 2,
    name: "Program 2",
    institution: "University 1",
    degreeType: "BS",
    credits: 120,
    description:
      "description for program",
  },
  {
    id: 3,
    name: "Program 3",
    institution: "University 2",
    degreeType: "AA",
    credits: 60,
    description:
      "description for program ",
  },
  {
    id: 4,
    name: "Program 4",
    institution: "University 1",
    degreeType: "BA",
    credits: 120,
    description:
      "description for program ",
  },
  {
    id: 5,
    name: "Program 5",
    institution: "University 3",
    degreeType: "AS",
    credits: 60,
    description:
      "description for program ",
  },
];

function ProgramsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [institutionFilter, setInstitutionFilter] = useState("");
  const [degreeFilter, setDegreeFilter] = useState("");

  const institutions = [...new Set(mockPrograms.map((program) => program.institution))];
  const degreeTypes = [...new Set(mockPrograms.map((program) => program.degreeType))];

  const filteredPrograms = useMemo(() => {
    return mockPrograms.filter((program) => {
      const matchesSearch =
        program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        program.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesInstitution =
        institutionFilter === "" || program.institution === institutionFilter;

      const matchesDegree =
        degreeFilter === "" || program.degreeType === degreeFilter;

      return matchesSearch && matchesInstitution && matchesDegree;
    });
  }, [searchTerm, institutionFilter, degreeFilter]);

  const handleClearFilters = () => {
    setSearchTerm("");
    setInstitutionFilter("");
    setDegreeFilter("");
  };

  return (
    <div style={styles.page}>
      <div style={styles.headerSection}>
        <h1 style={styles.title}>Programs</h1>
        <p style={styles.subtitle}>
          Browse and manage academic programs. This page currently uses placeholder
          data and can later be connected to backend program information.
        </p>
      </div>

      <div style={styles.filterContainer}>
        <input
          type="text"
          placeholder="Search by program name or keyword"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.input}
        />

        <select
          value={institutionFilter}
          onChange={(e) => setInstitutionFilter(e.target.value)}
          style={styles.select}
        >
          <option value="">All Institutions</option>
          {institutions.map((institution) => (
            <option key={institution} value={institution}>
              {institution}
            </option>
          ))}
        </select>

        <select
          value={degreeFilter}
          onChange={(e) => setDegreeFilter(e.target.value)}
          style={styles.select}
        >
          <option value="">All Degree Types</option>
          {degreeTypes.map((degree) => (
            <option key={degree} value={degree}>
              {degree}
            </option>
          ))}
        </select>

        <button onClick={handleClearFilters} style={styles.clearButton}>
          Clear
        </button>
      </div>

      <div style={styles.resultsHeader}>
        <p style={styles.resultsText}>
          Showing {filteredPrograms.length} program
          {filteredPrograms.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div style={styles.cardsContainer}>
        {filteredPrograms.length > 0 ? (
          filteredPrograms.map((program) => (
            <div key={program.id} style={styles.card}>
              <div style={styles.cardTop}>
                <div>
                  <h2 style={styles.cardTitle}>{program.name}</h2>
                  <p style={styles.cardInstitution}>{program.institution}</p>
                </div>
                <span style={styles.badge}>{program.degreeType}</span>
              </div>

              <p style={styles.description}>{program.description}</p>

              <div style={styles.metaRow}>
                <span style={styles.metaItem}>
                  <strong>Credits:</strong> {program.credits}
                </span>
              </div>

              <div style={styles.buttonRow}>
                <button style={styles.primaryButton}>View Details</button>
                <button style={styles.secondaryButton}>Edit</button>
              </div>
            </div>
          ))
        ) : (
          <div style={styles.emptyState}>
            <h3 style={styles.emptyTitle}>No programs found</h3>
            <p style={styles.emptyText}>
              Try changing your search term or filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "32px 24px 48px",
    fontFamily: "Arial, sans-serif",
    color: "#1f2937",
    backgroundColor: "#f9fafb",
    minHeight: "100vh",
  },
  headerSection: {
    marginBottom: "24px",
  },
  title: {
    fontSize: "36px",
    fontWeight: 700,
    marginBottom: "8px",
  },
  subtitle: {
    fontSize: "16px",
    color: "#4b5563",
    margin: 0,
    lineHeight: 1.5,
  },
  filterContainer: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr 1fr auto",
    gap: "12px",
    backgroundColor: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: "16px",
    padding: "16px",
    marginBottom: "20px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
  },
  input: {
    padding: "12px 14px",
    borderRadius: "10px",
    border: "1px solid #d1d5db",
    fontSize: "14px",
    outline: "none",
  },
  select: {
    padding: "12px 14px",
    borderRadius: "10px",
    border: "1px solid #d1d5db",
    fontSize: "14px",
    backgroundColor: "#fff",
    outline: "none",
  },
  clearButton: {
    padding: "12px 18px",
    borderRadius: "999px",
    border: "none",
    backgroundColor: "#111827",
    color: "#ffffff",
    fontWeight: 600,
    cursor: "pointer",
  },
  resultsHeader: {
    marginBottom: "16px",
  },
  resultsText: {
    fontSize: "14px",
    color: "#6b7280",
    margin: 0,
  },
  cardsContainer: {
    display: "grid",
    gap: "16px",
  },
  card: {
    backgroundColor: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: "18px",
    padding: "20px",
    boxShadow: "0 3px 10px rgba(0,0,0,0.05)",
  },
  cardTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "12px",
    marginBottom: "12px",
  },
  cardTitle: {
    fontSize: "22px",
    margin: 0,
    fontWeight: 700,
  },
  cardInstitution: {
    margin: "6px 0 0",
    color: "#6b7280",
    fontSize: "14px",
  },
  badge: {
    backgroundColor: "#e5e7eb",
    color: "#111827",
    padding: "6px 12px",
    borderRadius: "999px",
    fontSize: "13px",
    fontWeight: 600,
    whiteSpace: "nowrap",
  },
  description: {
    margin: "0 0 12px",
    fontSize: "15px",
    color: "#374151",
    lineHeight: 1.5,
  },
  metaRow: {
    marginBottom: "16px",
  },
  metaItem: {
    fontSize: "14px",
    color: "#374151",
  },
  buttonRow: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },
  primaryButton: {
    padding: "10px 16px",
    borderRadius: "10px",
    border: "none",
    backgroundColor: "#2563eb",
    color: "#ffffff",
    fontWeight: 600,
    cursor: "pointer",
  },
  secondaryButton: {
    padding: "10px 16px",
    borderRadius: "10px",
    border: "1px solid #d1d5db",
    backgroundColor: "#ffffff",
    color: "#111827",
    fontWeight: 600,
    cursor: "pointer",
  },
  emptyState: {
    backgroundColor: "#ffffff",
    border: "1px dashed #d1d5db",
    borderRadius: "16px",
    padding: "32px",
    textAlign: "center",
  },
  emptyTitle: {
    margin: "0 0 8px",
    fontSize: "20px",
  },
  emptyText: {
    margin: 0,
    color: "#6b7280",
  },
};

export default ProgramsPage;