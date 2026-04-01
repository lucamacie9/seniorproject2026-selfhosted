import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

function ProgramsPage() {
  const navigate = useNavigate();

  const programs = [
    {
      id: 1,
      name: "Program 1",
      type: "",
      location: "Chicago",
      description:
        "Program description for Program 1.",
      programDetails:
        "Program details and sample courses for Program 1",
    },
    {
      id: 2,
      name: "Program 2",
      type: "",
      location: "Schaumburg",
      description:
        " Program description for Program 2",
      programDetails:
        "Program details and sample courses for Program 2 ",
    },
    {
      id: 3,
      name: "Program 3",
      type: "",
      location: "Online",
      description:
        "Program description for Program 3",
      programDetails:
        "Program details and sample courses for program 3",
    },
    {
      id: 4,
      name: "Program 4",
      type: "",
      location: "Chicago",
      description:
        "Program description for Program 4 ",
      programDetails:
        "Program details and sample courses for Program 4",
    },
    {
      id: 5,
      name: "Program 5",
      type: "",
      location: "Online",
      description:
        "Program description for Program 5",
      programDetails:
        "Program details and sample courses for Program 5",
    },
    {
      id: 6,
      name: "Program 6",
      type: "",
      location: "Schaumburg",
      description:
        "Program description for Program 6",
      programDetails:
        "Program details and sample courses for Program 6",
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [expandedProgramId, setExpandedProgramId] = useState(null);

  const filteredPrograms = useMemo(() => {
    return programs.filter((program) => {
      const matchesSearch =
        program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        program.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesLocation =
        selectedLocation === "All" || program.location === selectedLocation;

      return matchesSearch && matchesLocation;
    });
  }, [programs, searchTerm, selectedLocation]);

  const handleStartMatching = (programName) => {
    navigate("/match", { state: { selectedProgram: programName } });
  };

  const toggleDetails = (programId) => {
    setExpandedProgramId(expandedProgramId === programId ? null : programId);
  };

  return (
    <div style={pageStyle}>
      <section style={heroStyle}>
        <h1 style={heroTitleStyle}>ROOSEVELT UNIVERSITY PROGRAMS</h1>
        <p style={heroSubtitleStyle}>
          Browse Roosevelt programs and explore course information
          before moving into the transfer matching process.
        </p>
      </section>

      <section style={topControlsWrapperStyle}>
        <div style={topButtonRowStyle}>
          <button
            style={primaryButtonStyle}
            onClick={() => {
              setSearchTerm("");
              setSelectedLocation("All");
            }}
          >
            SHOW ALL PROGRAMS
          </button>

          <button style={secondaryTopButtonStyle}>PROGRAMS BY TYPE</button>
        </div>
      </section>

      <section style={filterBarStyle}>
        <div style={searchRowStyle}>
          <input
            type="text"
            placeholder="Search Roosevelt programs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={searchInputStyle}
          />

          <select style={selectStyle} defaultValue="">
            <option value="">Programs by Type</option>
          </select>
        </div>

        <div style={locationRowStyle}>
          <span style={locationLabelStyle}>Filter by location:</span>

          {["All", "Chicago", "Schaumburg", "Online"].map((location) => (
            <button
              key={location}
              onClick={() => setSelectedLocation(location)}
              style={{
                ...locationButtonStyle,
                ...(selectedLocation === location
                  ? activeLocationButtonStyle
                  : {}),
              }}
            >
              {location.toUpperCase()}
            </button>
          ))}
        </div>
      </section>

      <section style={gridStyle}>
        {filteredPrograms.length > 0 ? (
          filteredPrograms.map((program) => (
            <div key={program.id} style={cardStyle}>
              <div>
                <h3 style={cardTitleStyle}>{program.name}</h3>
                <p style={cardLocationStyle}>{program.location}</p>
                <p style={cardDescriptionStyle}>{program.description}</p>
              </div>

              <div style={buttonGroupStyle}>
                <button
                  style={detailsButtonStyle}
                  onClick={() => toggleDetails(program.id)}
                >
                  {expandedProgramId === program.id
                    ? "HIDE COURSE DETAILS"
                    : "VIEW COURSE DETAILS"}
                </button>

                <button
                  style={matchButtonStyle}
                  onClick={() => handleStartMatching(program.name)}
                >
                  START MATCHING
                </button>
              </div>

              {expandedProgramId === program.id && (
                <div style={detailsBoxStyle}>
                  <h4 style={detailsHeadingStyle}>Course Description</h4>
                  <p style={detailsTextStyle}>{program.programDetails}</p>
                </div>
              )}
            </div>
          ))
        ) : (
          <div style={emptyStateStyle}>
            No programs match your current search or filters.
          </div>
        )}
      </section>
    </div>
  );
}

const pageStyle = {
  minHeight: "100vh",
  backgroundColor: "#f4fbf6",
  paddingBottom: "50px",
};

const heroStyle = {
  background: "linear-gradient(to bottom, #effaf1 0%, #e6f7ea 100%)",
  textAlign: "center",
  padding: "70px 20px 45px",
  borderBottom: "2px solid #24844f",
};

const heroTitleStyle = {
  margin: 0,
  fontSize: "clamp(2.2rem, 6vw, 4.5rem)",
  fontWeight: "800",
  letterSpacing: "1px",
  color: "#1f5f3f",
};

const heroSubtitleStyle = {
  margin: "18px auto 0",
  maxWidth: "760px",
  color: "#2e6b45",
  fontSize: "1.05rem",
  lineHeight: "1.6",
};

const topControlsWrapperStyle = {
  padding: "26px 20px 10px",
};

const topButtonRowStyle = {
  display: "flex",
  justifyContent: "center",
  gap: "14px",
  flexWrap: "wrap",
};

const primaryButtonStyle = {
  backgroundColor: "#2f6f44",
  border: "2px solid #3f8d58",
  color: "white",
  fontWeight: "700",
  padding: "14px 24px",
  cursor: "pointer",
  borderRadius: "8px",
};

const secondaryTopButtonStyle = {
  backgroundColor: "#eaf8ec",
  border: "2px solid #92b898",
  color: "#2f6f44",
  fontWeight: "700",
  padding: "14px 24px",
  cursor: "pointer",
  borderRadius: "8px",
};

const filterBarStyle = {
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "26px 20px 10px",
};

const searchRowStyle = {
  display: "flex",
  gap: "14px",
  flexWrap: "wrap",
  justifyContent: "center",
  marginBottom: "24px",
};

const searchInputStyle = {
  minWidth: "300px",
  maxWidth: "500px",
  width: "100%",
  padding: "14px 16px",
  borderRadius: "8px",
  border: "1px solid #b8d8bf",
  backgroundColor: "white",
  color: "#1f1f1f",
  outline: "none",
};

const selectStyle = {
  minWidth: "220px",
  padding: "14px 16px",
  borderRadius: "8px",
  border: "1px solid #b8d8bf",
  backgroundColor: "white",
  color: "#1f1f1f",
  outline: "none",
};

const locationRowStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "10px",
  flexWrap: "wrap",
  color: "#355e3b",
  marginBottom: "30px",
};

const locationLabelStyle = {
  fontWeight: "700",
  marginRight: "6px",
};

const locationButtonStyle = {
  background: "transparent",
  border: "1px solid transparent",
  color: "#2f6f44",
  padding: "8px 10px",
  cursor: "pointer",
  fontWeight: "700",
  fontSize: "0.85rem",
};

const activeLocationButtonStyle = {
  color: "#2f6f44",
  borderBottom: "2px solid #2f6f44",
};

const gridStyle = {
  maxWidth: "1400px",
  margin: "0 auto",
  padding: "0 20px",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: "18px",
};

const cardStyle = {
  backgroundColor: "white",
  border: "1px solid #d5ead8",
  borderRadius: "14px",
  padding: "24px",
  display: "flex",
  flexDirection: "column",
  gap: "18px",
  boxShadow: "0 4px 12px rgba(46, 139, 87, 0.08)",
};

const cardTitleStyle = {
  fontSize: "1.6rem",
  margin: "0 0 10px 0",
  color: "#1f4d2e",
};

const cardLocationStyle = {
  color: "#4f7a57",
  fontSize: "0.95rem",
  fontWeight: "600",
  marginBottom: "14px",
};

const cardDescriptionStyle = {
  color: "#355e3b",
  lineHeight: "1.6",
  fontSize: "0.97rem",
  margin: 0,
};

const buttonGroupStyle = {
  display: "flex",
  gap: "10px",
  flexWrap: "wrap",
};

const detailsButtonStyle = {
  backgroundColor: "#edf8f0",
  color: "#2e6b3a",
  border: "1px solid #7bc47f",
  padding: "12px 16px",
  borderRadius: "8px",
  fontWeight: "700",
  cursor: "pointer",
};

const matchButtonStyle = {
  backgroundColor: "#2e8b57",
  color: "white",
  border: "none",
  padding: "12px 16px",
  borderRadius: "8px",
  fontWeight: "800",
  cursor: "pointer",
};

const detailsBoxStyle = {
  marginTop: "4px",
  padding: "16px",
  borderRadius: "10px",
  backgroundColor: "#f3fbf5",
  border: "1px solid #cfe7d4",
};

const detailsHeadingStyle = {
  margin: "0 0 8px 0",
  color: "#1f4d2e",
  fontSize: "1rem",
};

const detailsTextStyle = {
  margin: 0,
  color: "#355e3b",
  lineHeight: "1.6",
};

const emptyStateStyle = {
  gridColumn: "1 / -1",
  textAlign: "center",
  padding: "40px 20px",
  color: "#355e3b",
  border: "1px solid #d5ead8",
  backgroundColor: "white",
  borderRadius: "12px",
};

export default ProgramsPage;