import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

function MatchPage() {
  const location = useLocation();

  const sharedProgramData = {
    fromCourses: [
      "Course 1",
      "Course 2",
      "Course 3",
      "Course 4",
      "Course 5",
      "Course 6",
    ],
    toCourses: ["RU_C1", "RU_C2", "RU_C3", "RU_C4"],
    matches: {
      "Course 1": { to: "RU_C2", type: "Full Match" },
      "Course 2": { to: "RU_C1", type: "Partial Match" },
      "Course 3": { to: "RU_C1", type: "Full Match" },
      "Course 4": { to: "RU_C1", type: "Partial Match" },
      "Course 5": { to: "RU_C3", type: "Full Match" },
      "Course 6": { to: "RU_C4", type: "Full Match" },
    },
  };

  const programCourseData = {
    "Program 1": sharedProgramData,
    "Program 2": sharedProgramData,
    "Program 3": sharedProgramData,
    "Program 4": sharedProgramData,
    "Program 5": sharedProgramData,
    "Program 6": sharedProgramData,
  };

  const programOptions = Object.keys(programCourseData);

  const initialProgram =
    location.state?.selectedProgram &&
    programCourseData[location.state.selectedProgram]
      ? location.state.selectedProgram
      : "Program 1";

  const [program, setProgram] = useState(initialProgram);
  const [fromSearch, setFromSearch] = useState("");
  const [toSearch, setToSearch] = useState("");
  const [selectedFromCourses, setSelectedFromCourses] = useState([]);
  const [selectedToCourse, setSelectedToCourse] = useState("");
  const [matchResult, setMatchResult] = useState("");
  const [showCourseDetails, setShowCourseDetails] = useState(false);
  const [showAlternativeCourses, setShowAlternativeCourses] = useState(false);
  const [savedMessage, setSavedMessage] = useState("");
  const [savedTransferPlans, setSavedTransferPlans] = useState([]);

  const currentProgramData = programCourseData[program];

  useEffect(() => {
    setSelectedFromCourses([]);
    setSelectedToCourse("");
    setFromSearch("");
    setToSearch("");
    setMatchResult("");
    setShowCourseDetails(false);
    setShowAlternativeCourses(false);
    setSavedMessage("");
  }, [program]);

  const filteredFromCourses = useMemo(() => {
    return currentProgramData.fromCourses.filter((course) =>
      course.toLowerCase().includes(fromSearch.toLowerCase())
    );
  }, [currentProgramData.fromCourses, fromSearch]);

  const filteredToCourses = useMemo(() => {
    return currentProgramData.toCourses.filter((course) =>
      course.toLowerCase().includes(toSearch.toLowerCase())
    );
  }, [currentProgramData.toCourses, toSearch]);

  const handleFromCourseToggle = (course) => {
    setSelectedFromCourses((prev) =>
      prev.includes(course)
        ? prev.filter((item) => item !== course)
        : [...prev, course]
    );
  };

  const handleMatch = () => {
    setSavedMessage("");
    setShowCourseDetails(false);
    setShowAlternativeCourses(false);

    if (selectedFromCourses.length === 0 || !selectedToCourse) {
      setMatchResult("Please select at least one course and one Roosevelt course.");
      return;
    }

    if (selectedToCourse === "RU_C1") {
      const hasCourse2 = selectedFromCourses.includes("Course 2");
      const hasCourse3 = selectedFromCourses.includes("Course 3");
      const hasCourse4 = selectedFromCourses.includes("Course 4");

      if (hasCourse3) {
        setMatchResult("Full Match ✅\nSave your transfer plan.");
        return;
      }

      if (hasCourse2 && hasCourse4) {
        setMatchResult(
          "Full Match ✅\nCombined partial matches complete the requirement. Save your transfer plan."
        );
        return;
      }

      if (hasCourse2 || hasCourse4) {
        setMatchResult(
          "Partial Match ⚠️\nBrowse other courses to complete your match."
        );
        return;
      }
    }

    if (
      selectedFromCourses.length === 1 &&
      selectedFromCourses.includes("Course 1") &&
      selectedToCourse === "RU_C2"
    ) {
      setMatchResult("Full Match ✅\nSave your transfer plan.");
      return;
    }

    if (
      selectedFromCourses.length === 1 &&
      selectedFromCourses.includes("Course 5") &&
      selectedToCourse === "RU_C3"
    ) {
      setMatchResult("Full Match ✅\nSave your transfer plan.");
      return;
    }

    if (
      selectedFromCourses.length === 1 &&
      selectedFromCourses.includes("Course 6") &&
      selectedToCourse === "RU_C4"
    ) {
      setMatchResult("Full Match ✅\nSave your transfer plan.");
      return;
    }

    if (
      selectedFromCourses.includes("Course 2") ||
      selectedFromCourses.includes("Course 4")
    ) {
      setMatchResult(
        "Partial Match ⚠️\nBrowse other courses to complete your match."
      );
      return;
    }

    setMatchResult("No Match ❌\nBrowse other courses to find your match.");
  };

  const handleSavePlan = () => {
    if (!matchResult.includes("Full Match")) {
      setSavedMessage("Only full matches can be saved to the transfer plan.");
      return;
    }

    if (selectedFromCourses.length === 0 || !selectedToCourse) {
      setSavedMessage("Please complete your course selection first.");
      return;
    }

    const newPlan = {
      id: Date.now(),
      program,
      fromCourses: [...selectedFromCourses],
      toCourse: selectedToCourse,
    };

    setSavedTransferPlans((prev) => [...prev, newPlan]);
    setSavedMessage("Transfer plan saved successfully.");
  };

  const handleReset = () => {
    setFromSearch("");
    setToSearch("");
    setSelectedFromCourses([]);
    setSelectedToCourse("");
    setMatchResult("");
    setShowCourseDetails(false);
    setShowAlternativeCourses(false);
    setSavedMessage("");
  };

  const handleRemovePlan = (id) => {
    setSavedTransferPlans((prev) => prev.filter((plan) => plan.id !== id));
  };

  const getResultStyle = () => {
    if (matchResult.includes("Full Match")) {
      return {
        backgroundColor: "#edfdf4",
        border: "1px solid #b7ebc6",
        color: "#166534",
      };
    }
    if (matchResult.includes("Partial Match")) {
      return {
        backgroundColor: "#fff8e8",
        border: "1px solid #f7d08a",
        color: "#9a6700",
      };
    }
    if (matchResult.includes("No Match")) {
      return {
        backgroundColor: "#fff1f2",
        border: "1px solid #fecdd3",
        color: "#be123c",
      };
    }
    return {
      backgroundColor: "#f8fafc",
      border: "1px solid #dbe4ee",
      color: "#334155",
    };
  };

  const selectedMappings = selectedFromCourses.map((course) => {
    const mapping = currentProgramData.matches[course];
    return {
      course,
      to: mapping?.to ?? "No direct match",
      type: mapping?.type ?? "No Match",
    };
  });

  const alternativeCourses = currentProgramData.toCourses.filter(
    (course) => course !== selectedToCourse
  );

  return (
    <div style={pageStyle}>
      <div style={heroStyle}>
        <h1 style={heroTitleStyle}>Match Courses</h1>
        <p style={heroSubtitleStyle}>
          Compare transfer courses to Roosevelt University requirements and build
          a sample transfer plan.
        </p>
      </div>

      <div style={summaryCardStyle}>
        <div style={programRowStyle}>
          <label style={programLabelStyle}>Selected Roosevelt Program</label>
          <select
            value={program}
            onChange={(e) => setProgram(e.target.value)}
            style={programSelectStyle}
          >
            {programOptions.map((programName) => (
              <option key={programName} value={programName}>
                {programName}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div style={sectionCardStyle}>
        <h3 style={sectionTitleStyle}>Course Selection</h3>

        <div style={gridStyle}>
          <div style={panelStyle}>
            <h4 style={panelHeadingStyle}>Transfer Courses</h4>
            <input
              type="text"
              placeholder="Search transfer courses..."
              value={fromSearch}
              onChange={(e) => setFromSearch(e.target.value)}
              style={inputStyle}
            />

            <div style={checkboxListStyle}>
              {filteredFromCourses.map((course) => (
                <label key={course} style={checkboxCardStyle}>
                  <input
                    type="checkbox"
                    checked={selectedFromCourses.includes(course)}
                    onChange={() => handleFromCourseToggle(course)}
                  />
                  <span>{course}</span>
                </label>
              ))}
            </div>
          </div>

          <div style={panelStyle}>
            <h4 style={panelHeadingStyle}>Roosevelt Courses</h4>
            <input
              type="text"
              placeholder="Search Roosevelt courses..."
              value={toSearch}
              onChange={(e) => setToSearch(e.target.value)}
              style={inputStyle}
            />

            <select
              value={selectedToCourse}
              onChange={(e) => setSelectedToCourse(e.target.value)}
              style={selectStyle}
            >
              <option value="">Select Roosevelt Course</option>
              {filteredToCourses.map((course) => (
                <option key={course} value={course}>
                  {course}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div style={selectionSummaryStyle}>
          <p style={summaryTextStyle}>
            <strong>Selected Transfer Course(s):</strong>{" "}
            {selectedFromCourses.length > 0
              ? selectedFromCourses.join(", ")
              : "None selected"}
          </p>
          <p style={summaryTextStyle}>
            <strong>Selected Roosevelt Course:</strong>{" "}
            {selectedToCourse || "None selected"}
          </p>
        </div>

        <div style={buttonRowStyle}>
          <button style={primaryButtonStyle} onClick={handleMatch}>
            Submit Match Request
          </button>
          <button style={saveButtonStyle} onClick={handleSavePlan}>
            Save Transfer Plan
          </button>
          <button style={secondaryButtonStyle} onClick={handleReset}>
            Reset
          </button>
        </div>

        {savedMessage && <p style={savedMessageStyle}>{savedMessage}</p>}
      </div>

      <div style={sectionCardStyle}>
        <h3 style={sectionTitleStyle}>Match Result</h3>
        <div style={{ ...resultBoxStyle, ...getResultStyle() }}>
          {matchResult || "No result yet. Submit a match request to view results."}
        </div>

        {matchResult && (
          <div style={{ ...buttonRowStyle, marginTop: "16px" }}>
            <button
              style={secondaryButtonStyle}
              onClick={() => setShowCourseDetails((prev) => !prev)}
            >
              {showCourseDetails ? "Hide Course Details" : "View Course Details"}
            </button>

            {(matchResult.includes("No Match") ||
              matchResult.includes("Partial Match")) && (
              <button
                style={ghostButtonStyle}
                onClick={() => setShowAlternativeCourses((prev) => !prev)}
              >
                {showAlternativeCourses
                  ? "Hide Other Courses"
                  : "Browse Other Courses"}
              </button>
            )}
          </div>
        )}

        {showCourseDetails && (
          <div style={detailsCardStyle}>
            <h4 style={detailsHeadingStyle}>Course Details</h4>

            <div style={detailsGridStyle}>
              <div style={detailColumnStyle}>
                <h5 style={detailSubheadingStyle}>Selected Transfer Course(s)</h5>

                {selectedFromCourses.length > 0 ? (
                  selectedMappings.map((item) => (
                    <div key={item.course} style={detailItemStyle}>
                      <p style={detailTitleStyle}>{item.course}</p>
                      <p style={detailTextStyle}>
                        <strong>Description:</strong>
                      </p>
                      <p style={detailTextStyle}>
                        <strong>Credits:</strong>
                      </p>
                    </div>
                  ))
                ) : (
                  <p style={emptyTextStyle}>No transfer courses selected.</p>
                )}
              </div>

              <div style={detailColumnStyle}>
                <h5 style={detailSubheadingStyle}>Selected Roosevelt Course</h5>

                {selectedToCourse ? (
                  <div style={detailItemStyle}>
                    <p style={detailTitleStyle}>{selectedToCourse}</p>
                    <p style={detailTextStyle}>
                      <strong>Description:</strong>
                    </p>
                    <p style={detailTextStyle}>
                      <strong>Credits:</strong>
                    </p>
                  </div>
                ) : (
                  <p style={emptyTextStyle}>No Roosevelt course selected.</p>
                )}
              </div>
            </div>
          </div>
        )}
        {showAlternativeCourses && (
          <div style={detailsCardStyle}>
            <h4 style={detailsHeadingStyle}>Other Roosevelt Course Options</h4>
            <div style={detailsListStyle}>
              {alternativeCourses.map((course) => (
                <div key={course} style={detailItemStyle}>
                  <p style={detailTitleStyle}>{course}</p>
                  <p style={detailTextStyle}>
                    <strong>Description:</strong>
                  </p>
                  <p style={detailTextStyle}>
                    <strong>Credits:</strong>
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div style={sectionCardStyle}>
        <h3 style={sectionTitleStyle}>Saved Transfer Plans</h3>

        {savedTransferPlans.length === 0 ? (
          <p style={emptyTextStyle}>No transfer plans saved yet.</p>
        ) : (
          <div style={plansListStyle}>
            {savedTransferPlans.map((plan) => (
              <div key={plan.id} style={planCardStyle}>
                <div>
                  <p style={planTextStyle}>
                    <strong>Program:</strong> {plan.program}
                  </p>
                  <p style={planTextStyle}>
                    <strong>Transfer Course(s):</strong> {plan.fromCourses.join(", ")}
                  </p>
                  <p style={planTextStyle}>
                    <strong>Roosevelt Course:</strong> {plan.toCourse}
                  </p>
                </div>

                <button
                  style={removeButtonStyle}
                  onClick={() => handleRemovePlan(plan.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const pageStyle = {
  padding: "36px 20px 56px",
  maxWidth: "1150px",
  margin: "0 auto",
  backgroundColor: "#f7faf8",
  minHeight: "100vh",
};

const heroStyle = {
  background:
    "linear-gradient(135deg, #f5fff5 0%, #e8f8e7 55%, #dff1dc 100%)",
  border: "1px solid #c9e5d4",
  borderRadius: "24px",
  padding: "42px 28px",
  marginBottom: "20px",
  boxShadow: "0 18px 40px rgba(16, 24, 40, 0.06)",
};

const heroBadgeStyle = {
  display: "inline-block",
  padding: "8px 12px",
  borderRadius: "999px",
  backgroundColor: "#eaf8ec",
  color: "#2f6f44",
  fontWeight: "700",
  fontSize: "0.85rem",
  marginBottom: "16px",
};

const heroTitleStyle = {
  margin: "0 0 10px 0",
  fontSize: "clamp(2rem, 5vw, 3.25rem)",
  fontWeight: "800",
  color: "#111827",
};

const heroSubtitleStyle = {
  margin: 0,
  maxWidth: "720px",
  color: "#4b5563",
  fontSize: "1.02rem",
  lineHeight: "1.7",
};

const summaryCardStyle = {
  backgroundColor: "#ffffff",
  border: "1px solid #dfe7e2",
  borderRadius: "18px",
  padding: "18px 20px",
  marginBottom: "20px",
  boxShadow: "0 8px 24px rgba(16, 24, 40, 0.04)",
};

const programRowStyle = {
  display: "flex",
  gap: "12px",
  alignItems: "center",
  flexWrap: "wrap",
};

const programLabelStyle = {
  fontWeight: "700",
  color: "#111827",
};

const programSelectStyle = {
  minWidth: "220px",
  padding: "12px 14px",
  borderRadius: "12px",
  border: "1px solid #cad8cf",
  backgroundColor: "#fff",
  color: "#111827",
  outline: "none",
};

const sectionCardStyle = {
  backgroundColor: "#ffffff",
  border: "1px solid #dfe7e2",
  borderRadius: "20px",
  padding: "24px",
  marginBottom: "20px",
  boxShadow: "0 10px 28px rgba(16, 24, 40, 0.04)",
};

const sectionTitleStyle = {
  marginTop: 0,
  marginBottom: "18px",
  color: "#111827",
  fontSize: "1.2rem",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "1.2fr 1fr",
  gap: "20px",
  marginBottom: "20px",
};

const panelStyle = {
  backgroundColor: "#f9fcfa",
  border: "1px solid #dfe7e2",
  borderRadius: "16px",
  padding: "18px",
};

const panelHeadingStyle = {
  marginTop: 0,
  marginBottom: "14px",
  color: "#1f2937",
};

const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: "12px",
  border: "1px solid #cad8cf",
  backgroundColor: "#fff",
  marginBottom: "12px",
  outline: "none",
  boxSizing: "border-box",
};

const selectStyle = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: "12px",
  border: "1px solid #cad8cf",
  backgroundColor: "#fff",
  outline: "none",
  boxSizing: "border-box",
};

const checkboxListStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  maxHeight: "260px",
  overflowY: "auto",
};

const checkboxCardStyle = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  padding: "12px 14px",
  border: "1px solid #e3ebe5",
  borderRadius: "12px",
  backgroundColor: "#ffffff",
  color: "#1f2937",
};

const selectionSummaryStyle = {
  backgroundColor: "#f7faf8",
  border: "1px solid #dfe7e2",
  borderRadius: "14px",
  padding: "14px 16px",
  marginBottom: "18px",
};

const summaryTextStyle = {
  margin: "6px 0",
  color: "#4b5563",
  lineHeight: "1.6",
};

const buttonRowStyle = {
  display: "flex",
  gap: "12px",
  flexWrap: "wrap",
};

const primaryButtonStyle = {
  backgroundColor: "#2f7e41",
  color: "#ffffff",
  border: "none",
  padding: "12px 18px",
  borderRadius: "12px",
  fontWeight: "700",
  cursor: "pointer",
  boxShadow: "0 8px 18px rgba(47, 126, 65, 0.22)",
};

const saveButtonStyle = {
  backgroundColor: "#2f7e41",
  color: "#ffffff",
  border: "none",
  padding: "12px 18px",
  borderRadius: "12px",
  fontWeight: "700",
  cursor: "pointer",
};

const secondaryButtonStyle = {
  backgroundColor: "#ffffff",
  color: "#374151",
  border: "1px solid #cad8cf",
  padding: "12px 18px",
  borderRadius: "12px",
  fontWeight: "700",
  cursor: "pointer",
};

const ghostButtonStyle = {
  backgroundColor: "#fefce8",
  color: "#854d0e",
  border: "1px solid #f5d58b",
  padding: "12px 18px",
  borderRadius: "12px",
  fontWeight: "700",
  cursor: "pointer",
};

const savedMessageStyle = {
  marginTop: "14px",
  color: "#374151",
  fontWeight: "600",
};

const resultBoxStyle = {
  minHeight: "88px",
  borderRadius: "14px",
  padding: "18px",
  display: "flex",
  alignItems: "center",
  fontWeight: "700",
  whiteSpace: "pre-line",
  lineHeight: "1.6",
};

const detailsCardStyle = {
  marginTop: "16px",
  padding: "16px",
  border: "1px solid #dfe7e2",
  borderRadius: "16px",
  backgroundColor: "#f9fcfa",
};

const detailsHeadingStyle = {
  margin: "0 0 12px 0",
  color: "#111827",
};

const detailsGridStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "16px",
  marginTop: "12px",
};

const detailColumnStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "12px",
};

const detailSubheadingStyle = {
  margin: "0 0 4px 0",
  fontSize: "1rem",
  fontWeight: "700",
  color: "#111827",
};

const detailsListStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  marginTop: "12px",
};

const detailItemStyle = {
  backgroundColor: "#ffffff",
  border: "1px solid #e3ebe5",
  borderRadius: "14px",
  padding: "14px",
};

const detailTitleStyle = {
  margin: "0 0 8px 0",
  fontWeight: "700",
  color: "#111827",
};

const detailTextStyle = {
  margin: "4px 0",
  color: "#4b5563",
  lineHeight: "1.6",
};

const emptyTextStyle = {
  color: "#6b7280",
  margin: 0,
};

const plansListStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "14px",
};

const planCardStyle = {
  border: "1px solid #e3ebe5",
  backgroundColor: "#f9fcfa",
  borderRadius: "16px",
  padding: "16px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "12px",
  flexWrap: "wrap",
};

const planTextStyle = {
  margin: "4px 0",
  color: "#4b5563",
};

const removeButtonStyle = {
  backgroundColor: "#ffffff",
  color: "#374151",
  border: "1px solid #cad8cf",
  padding: "10px 14px",
  borderRadius: "12px",
  fontWeight: "700",
  cursor: "pointer",
};

export default MatchPage;