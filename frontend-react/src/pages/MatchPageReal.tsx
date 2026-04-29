import React, { useEffect, useMemo, useState } from "react";
import { apiService, Course, Institution, MatchRequest } from '../services/api';

function MatchPageReal() {

  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedInstitution, setSelectedInstitution] = useState<number | null>(null);
  const [fromSearch, setFromSearch] = useState("");
  const [toSearch, setToSearch] = useState("");
  const [selectedFromCourses, setSelectedFromCourses] = useState<number[]>([]);
  const [selectedToCourse, setSelectedToCourse] = useState<number | null>(null);
  const [matchResult, setMatchResult] = useState("");
  const [showCourseDetails, setShowCourseDetails] = useState(false);
  const [savedMessage, setSavedMessage] = useState("");
  const [savedTransferPlans, setSavedTransferPlans] = useState<any[]>([]);

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [institutionsData, coursesData] = await Promise.all([
          apiService.getInstitutions(),
          apiService.getCourses()
        ]);
        
        setInstitutions(institutionsData);
        setCourses(coursesData);
      } catch (err) {
        console.error('Failed to fetch data:', err);
        setError('Failed to load data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter courses for transfer institutions (not Roosevelt)
  const transferInstitutions = institutions.filter(inst => !inst.name.toLowerCase().includes('roosevelt'));
  const rooseveltInstitution = institutions.find(inst => inst.name.toLowerCase().includes('roosevelt'));

  const filteredFromCourses = useMemo(() => {
    if (!selectedInstitution) return [];
    return courses.filter(course => 
      course.institutionId === selectedInstitution &&
      course.courseName.toLowerCase().includes(fromSearch.toLowerCase())
    );
  }, [courses, selectedInstitution, fromSearch]);

  const filteredToCourses = useMemo(() => {
    if (!rooseveltInstitution) return [];
    return courses.filter(course => 
      course.institutionId === rooseveltInstitution.institutionId &&
      course.courseName.toLowerCase().includes(toSearch.toLowerCase())
    );
  }, [courses, rooseveltInstitution, toSearch]);

  const handleFromCourseToggle = (courseId: number) => {
    setSelectedFromCourses((prev) =>
      prev.includes(courseId)
        ? prev.filter((item) => item !== courseId)
        : [...prev, courseId]
    );
  };

  const handleMatch = async () => {
    setSavedMessage("");
    setShowCourseDetails(false);

    if (selectedFromCourses.length === 0 || !selectedToCourse) {
      setMatchResult("Please select at least one course and one Roosevelt course.");
      return;
    }

    try {
      // For each selected course, calculate match with the target course
      const matchResults = [];
      for (const fromCourseId of selectedFromCourses) {
        const matchRequest: MatchRequest = {
          courseIdFrom: fromCourseId,
          courseIdTo: selectedToCourse
        };
        
        const result = await apiService.calculateMatch(matchRequest);
        matchResults.push({
          fromCourseId,
          result
        });
      }

      // Determine overall match result based on individual matches
      const hasFullMatch = matchResults.some(r => r.result.includes('100%'));
      const hasPartialMatch = matchResults.some(r => r.result.includes('%') && !r.result.includes('100%'));

      if (hasFullMatch) {
        setMatchResult("Full Match ✅\nGreat news! Your courses line up with your Roosevelt requirement. Save your transfer plan.");
      } else if (hasPartialMatch) {
        setMatchResult("Partial Match ⚠️\nYou have a strong match. You may need additional courses. Browse other options to complete your plan.");
      } else {
        setMatchResult("No Match ❌\nWe didn't find a strong match with your current choices. Try different courses to see better options.");
      }
    } catch (error) {
      console.error('Match calculation failed:', error);
      setMatchResult("We couldn't calculate a match right now. Please try again.");
    }
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
      fromCourses: selectedFromCourses,
      toCourse: selectedToCourse,
      institution: selectedInstitution,
      result: matchResult
    };

    setSavedTransferPlans((prev) => [...prev, newPlan]);
    setSavedMessage("Transfer plan saved successfully.");
  };

  const handleReset = () => {
    setFromSearch("");
    setToSearch("");
    setSelectedFromCourses([]);
    setSelectedToCourse(null);
    setMatchResult("");
    setShowCourseDetails(false);
    setSavedMessage("");
  };

  const handleRemovePlan = (id: number) => {
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

  if (loading) {
    return (
      <div style={{ padding: "36px 20px", textAlign: "center" }}>
        <p>Loading course data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "36px 20px", textAlign: "center" }}>
        <p style={{ color: "red" }}>{error}</p>
      </div>
    );
  }

  return (
    <div style={pageStyle}>
      <div style={heroStyle}>
        <h1 style={heroTitleStyle}>Match Courses</h1>
        <p style={heroSubtitleStyle}>
          Compare transfer courses to Roosevelt University requirements and build a sample transfer plan.
        </p>
      </div>

      <div style={summaryCardStyle}>
        <div style={programRowStyle}>
          <label style={programLabelStyle}>Transfer Institution</label>
          <select
            value={selectedInstitution || ""}
            onChange={(e) => setSelectedInstitution(e.target.value ? Number(e.target.value) : null)}
            style={programSelectStyle}
          >
            <option value="">Select Transfer Institution</option>
            {transferInstitutions.map((institution) => (
              <option key={institution.institutionId} value={institution.institutionId}>
                {institution.name}
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
                <label key={course.courseId} style={checkboxCardStyle}>
                  <input
                    type="checkbox"
                    checked={selectedFromCourses.includes(course.courseId)}
                    onChange={() => handleFromCourseToggle(course.courseId)}
                  />
                  <span>{course.courseCode}: {course.courseName} ({course.credits} credits)</span>
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
              value={selectedToCourse || ""}
              onChange={(e) => setSelectedToCourse(e.target.value ? Number(e.target.value) : null)}
              style={selectStyle}
            >
              <option value="">Select Roosevelt Course</option>
              {filteredToCourses.map((course) => (
                <option key={course.courseId} value={course.courseId}>
                  {course.courseCode}: {course.courseName} ({course.credits} credits)
                </option>
              ))}
            </select>
          </div>
        </div>

        <div style={selectionSummaryStyle}>
          <p style={summaryTextStyle}>
            <strong>Your transfer courses:</strong>{" "}
            {selectedFromCourses.length > 0
              ? selectedFromCourses.map(id => {
                  const course = courses.find(c => c.courseId === id);
                  return course ? `${course.courseCode}: ${course.courseName}` : '';
                }).join(", ")
              : "None selected"}
          </p>
          <p style={summaryTextStyle}>
            <strong>Chosen Roosevelt course:</strong>{" "}
            {selectedToCourse ? (() => {
                const course = courses.find(c => c.courseId === selectedToCourse);
                return course ? `${course.courseCode}: ${course.courseName}` : '';
              })() : "None selected"}
          </p>
        </div>

        <div style={buttonRowStyle}>
          <button style={primaryButtonStyle} onClick={handleMatch}>
            Find my match
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
          {matchResult || 'No results yet. Choose your courses and click "Find my match."'}
        </div>

        {matchResult && (
          <div style={{ ...buttonRowStyle, marginTop: "16px" }}>
            <button
              style={secondaryButtonStyle}
              onClick={() => setShowCourseDetails((prev) => !prev)}
            >
              {showCourseDetails ? "Hide Course Details" : "View Course Details"}
            </button>
          </div>
        )}

        {showCourseDetails && (
          <div style={detailsCardStyle}>
            <h4 style={detailsHeadingStyle}>Course Details</h4>
            <div style={detailsGridStyle}>
              <div style={detailColumnStyle}>
                <h5 style={detailSubheadingStyle}>Your transfer courses</h5>
                {selectedFromCourses.length > 0 ? (
                  selectedFromCourses.map((courseId) => {
                    const course = courses.find(c => c.courseId === courseId);
                    return course ? (
                      <div key={courseId} style={detailItemStyle}>
                        <p style={detailTitleStyle}>{course.courseCode}: {course.courseName}</p>
                        <p style={detailTextStyle}><strong>Credits:</strong> {course.credits}</p>
                        <p style={detailTextStyle}><strong>Institution:</strong> {institutions.find(i => i.institutionId === course.institutionId)?.name}</p>
                      </div>
                    ) : null;
                  })
                ) : (
                  <p style={emptyTextStyle}>No transfer courses selected.</p>
                )}
              </div>

              <div style={detailColumnStyle}>
                <h5 style={detailSubheadingStyle}>Chosen Roosevelt course</h5>
                {selectedToCourse ? (() => {
                  const course = courses.find(c => c.courseId === selectedToCourse);
                  return course ? (
                    <div style={detailItemStyle}>
                      <p style={detailTitleStyle}>{course.courseCode}: {course.courseName}</p>
                      <p style={detailTextStyle}><strong>Credits:</strong> {course.credits}</p>
                      <p style={detailTextStyle}><strong>Institution:</strong> {institutions.find(i => i.institutionId === course.institutionId)?.name}</p>
                    </div>
                  ) : null;
                })() : (
                  <p style={emptyTextStyle}>No Roosevelt course selected.</p>
                )}
              </div>
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
                    <strong>Transfer Institution:</strong> {institutions.find(i => i.institutionId === plan.institution)?.name}
                  </p>
                  <p style={planTextStyle}>
                    <strong>Transfer Course(s):</strong> {plan.fromCourses.map((id: number) => {
                      const course = courses.find(c => c.courseId === id);
                      return course ? `${course.courseCode}: ${course.courseName}` : '';
                    }).join(", ")}
                  </p>
                  <p style={planTextStyle}>
                    <strong>Roosevelt Course:</strong> {(() => {
                      const course = courses.find(c => c.courseId === plan.toCourse);
                      return course ? `${course.courseCode}: ${course.courseName}` : '';
                    })()}
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

// Styles (same as original MatchPage)
const pageStyle = {
  padding: "36px 20px 56px",
  maxWidth: "1150px",
  margin: "0 auto",
  backgroundColor: "#f7faf8",
  minHeight: "100vh",
};

const heroStyle = {
  background: "linear-gradient(135deg, #f5fff5 0%, #e8f8e7 55%, #dff1dc 100%)",
  border: "1px solid #c9e5d4",
  borderRadius: "24px",
  padding: "42px 28px",
  marginBottom: "20px",
  boxShadow: "0 18px 40px rgba(16, 24, 40, 0.06)",
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

const programRowStyle: React.CSSProperties = {
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

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: "12px",
  border: "1px solid #cad8cf",
  backgroundColor: "#fff",
  marginBottom: "12px",
  outline: "none",
  boxSizing: "border-box",
};

const selectStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: "12px",
  border: "1px solid #cad8cf",
  backgroundColor: "#fff",
  outline: "none",
  boxSizing: "border-box",
};

const checkboxListStyle: React.CSSProperties = {
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

const buttonRowStyle: React.CSSProperties = {
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

const detailColumnStyle: React.CSSProperties = {
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

const plansListStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "14px",
};

const planCardStyle: React.CSSProperties = {
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

export default MatchPageReal;
