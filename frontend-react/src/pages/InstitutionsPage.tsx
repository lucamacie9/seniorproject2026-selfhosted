import { useEffect, useMemo, useState } from 'react'

declare global {
  interface Window {
    ROOSEVELT_PROGRAMS?: string[]
  }
}

type CurrentInstitutionGroup = {
  optgroup: string
  options: Array<{ value: string; label: string }>
}

type CurrentInstitutionSingle = {
  value: string
  label: string
}

type CurrentInstitutionEntry = CurrentInstitutionGroup | CurrentInstitutionSingle

const CURRENT_INSTITUTION_STRUCTURE: CurrentInstitutionEntry[] = [
  {
    optgroup: 'City Colleges of Chicago',
    options: [
      { value: 'ccc-truman', label: 'Truman College' },
      { value: 'ccc-harold-washington', label: 'Harold Washington College' },
      { value: 'ccc-wilbur-wright', label: 'Wilbur Wright College' },
      { value: 'ccc-olive-harvey', label: 'Olive-Harvey College' },
      { value: 'ccc-kennedy-king', label: 'Kennedy-King College' },
    ],
  },
  { value: 'other-community-college', label: 'Other Community College' },
  { value: 'other-university', label: 'Other University' },
]

function normalizeForSearch(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
}

function InstitutionsPage() {
  const [programs, setPrograms] = useState<string[]>([])
  const [loadingPrograms, setLoadingPrograms] = useState(true)
  const [currentInstitutionId, setCurrentInstitutionId] = useState('')
  const [currentInstitutionQuery, setCurrentInstitutionQuery] = useState('')
  const [targetInstitutionId] = useState('__roosevelt__')
  const [targetProgramValue, setTargetProgramValue] = useState('')
  const [targetProgramQuery, setTargetProgramQuery] = useState('')
  const [selectionSummary, setSelectionSummary] = useState(
    'Select your current institution and your target program at Roosevelt University.',
  )

  const currentInstitutionItems = useMemo(() => {
    const items: Array<{ value: string; display: string }> = []
    CURRENT_INSTITUTION_STRUCTURE.forEach((entry) => {
      if ('optgroup' in entry) {
        entry.options.forEach((opt) => {
          items.push({
            value: opt.value,
            display: `${entry.optgroup} — ${opt.label}`,
          })
        })
      } else {
        items.push({
          value: entry.value,
          display: entry.label,
        })
      }
    })
    return items
  }, [])

  const targetProgramItems = useMemo(
    () => programs.map((name, index) => ({ value: `p-${index}`, display: name })),
    [programs],
  )

  useEffect(() => {
    if (Array.isArray(window.ROOSEVELT_PROGRAMS)) {
      setPrograms(window.ROOSEVELT_PROGRAMS)
      setLoadingPrograms(false)
      return
    }

    const script = document.createElement('script')
    script.src = '/roosevelt_programs.js'
    script.async = true
    script.onload = () => {
      setPrograms(Array.isArray(window.ROOSEVELT_PROGRAMS) ? window.ROOSEVELT_PROGRAMS : [])
      setLoadingPrograms(false)
    }
    script.onerror = () => {
      setPrograms([])
      setLoadingPrograms(false)
    }
    document.body.appendChild(script)
  }, [])

  useEffect(() => {
    if (!loadingPrograms && programs.length === 0) {
      setSelectionSummary('No programs are available for Roosevelt University.')
      return
    }
    setSelectionSummary('Select your current institution and target program, then confirm.')
  }, [loadingPrograms, programs.length])

  const canConfirm = Boolean(currentInstitutionId && targetInstitutionId === '__roosevelt__' && targetProgramValue)

  function resolveCurrentInstitution(rawValue: string) {
    const query = normalizeForSearch(rawValue)
    if (!query) {
      setCurrentInstitutionId('')
      return
    }

    const match =
      currentInstitutionItems.find(
        (item) => normalizeForSearch(item.display) === query,
      ) ??
      currentInstitutionItems.find((item) =>
        normalizeForSearch(item.display).startsWith(query),
      ) ??
      currentInstitutionItems.find((item) =>
        normalizeForSearch(item.display).includes(query),
      )

    if (!match) {
      setCurrentInstitutionId('')
      return
    }

    setCurrentInstitutionId(match.value)
    setCurrentInstitutionQuery(match.display)
  }

  function resolveTargetProgram(rawValue: string) {
    const query = normalizeForSearch(rawValue)
    if (!query) {
      setTargetProgramValue('')
      return
    }

    const match =
      targetProgramItems.find(
        (item) => normalizeForSearch(item.display) === query,
      ) ??
      targetProgramItems.find((item) =>
        normalizeForSearch(item.display).startsWith(query),
      ) ??
      targetProgramItems.find((item) =>
        normalizeForSearch(item.display).includes(query),
      )

    if (!match) {
      setTargetProgramValue('')
      return
    }

    setTargetProgramValue(match.value)
    setTargetProgramQuery(match.display)
  }

  function handleConfirmSelection() {
    if (!canConfirm) {
      setSelectionSummary('Please select your current institution and a target program.')
      return
    }

    const currentItem = currentInstitutionItems.find(
      (item) => item.value === currentInstitutionId,
    )
    const currentLabel = currentItem ? currentItem.display : currentInstitutionId
    const targetLabel = 'Roosevelt University'
    const targetProgramMatch = targetProgramItems.find((item) => item.value === targetProgramValue)
    const targetProgramLabel = targetProgramMatch ? targetProgramMatch.display : targetProgramValue

    setSelectionSummary(
      `Current: ${currentLabel} (${currentProgramLabel}) → Target: ${targetLabel} | Target Program: ${targetProgramLabel}`,
    )
  }

  return (
    <>
      <style>{`
        :root{
          --mm-bg: #f3fbf4;
          --mm-surface: #ffffff;
          --mm-text: #0f172a;
          --mm-muted: rgba(15, 23, 42, 0.7);
          --mm-shadow: 0 18px 40px rgba(15, 23, 42, 0.10);
          --mm-green: #9ad28a;
          --mm-pill: rgba(15, 23, 42, 0.06);
        }
        .mm-page {
          background:
            radial-gradient(900px 260px at 0% 0%, #ffffff 0%, #ffffff 45%, rgba(255,255,255,0) 100%),
            linear-gradient(#ffffff, #ffffff) top / 100% 120px no-repeat,
            radial-gradient(1200px 500px at 20% 0%, rgba(154, 210, 138, 0.30), transparent 60%),
            radial-gradient(900px 420px at 90% 20%, rgba(154, 210, 138, 0.22), transparent 60%),
            linear-gradient(180deg, #ffffff 0%, var(--mm-bg) 45%, rgba(154, 210, 138, 0.25) 100%);
          color: var(--mm-text);
        }
        .mm-container{
          max-width: 1080px;
          margin: 0 auto;
          padding: 0 1rem;
        }
        .mm-title{
          font-weight: 800;
          letter-spacing: -0.02em;
          font-size: clamp(44px, 5vw, 74px);
          margin: 26px 0 14px 0;
        }
        .mm-hero{
          position: relative;
          height: 240px;
          border-radius: 16px;
          overflow:hidden;
          background:
            linear-gradient(90deg, rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.55) 55%, rgba(0,0,0,0.70) 100%),
            url('https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=2400&q=70') center/cover no-repeat;
          box-shadow: var(--mm-shadow);
        }
        .mm-hero-content{
          position:absolute;
          inset:0;
          display:flex;
          align-items:center;
          justify-content:flex-end;
          padding: 20px 24px;
          color:#fff;
          text-align:right;
        }
        .mm-hero h2{
          margin:0;
          font-weight:900;
          letter-spacing:-0.02em;
          font-size: clamp(34px, 4vw, 58px);
        }
        .mm-hero p{
          margin: 10px 0 0 0;
          max-width: 520px;
          color: rgba(255,255,255,0.88);
          line-height: 1.35;
          font-size: 14px;
        }
        .mm-grid{
          display:grid;
          grid-template-columns: minmax(280px, 1fr) minmax(70px, 90px) minmax(280px, 1fr);
          gap: 16px;
          align-items: stretch;
        }
        .mm-card{
          background: var(--mm-surface);
          border: 2px solid rgba(15, 23, 42, 0.35);
          border-radius: 18px;
          padding: 22px 22px 18px 22px;
          box-shadow: var(--mm-shadow);
        }
        .mm-card h5{
          font-size: 16px;
          margin-bottom: 10px;
          color: rgba(15, 23, 42, 0.82);
          font-weight: 700;
        }
        .mm-input{
          width:100%;
          min-height:40px;
          border-radius:10px;
          border:1px solid rgba(15,23,42,0.30);
          padding: 8px 10px;
          box-sizing: border-box;
        }
        .mm-arrow{
          display:flex;
          align-items:center;
          justify-content:center;
          font-size:34px;
          color: rgba(15,23,42,0.75);
        }
        .mm-bottom{
          margin-top: 12px;
          display:flex;
          align-items:center;
          justify-content:space-between;
          flex-wrap:wrap;
          gap: 12px;
        }
        .mm-cta{
          border: 0;
          background: var(--mm-green);
          color: #0b0f14;
          border-radius: 999px;
          padding: 10px 20px;
          font-weight: 700;
          opacity: 1;
        }
        .mm-cta:disabled{
          opacity: 0.55;
        }
        .mm-summary{
          color: var(--mm-muted);
          font-size: 12px;
        }
        .mm-footer{
          color: rgba(15, 23, 42, 0.65);
          font-size: 12px;
          padding: 18px 0 26px 0;
          text-align:center;
        }
        @media (max-width: 991.98px){
          .mm-grid{
            grid-template-columns: 1fr;
          }
          .mm-arrow{
            display:none;
          }
          .mm-hero{
            height:210px;
          }
        }
      `}</style>
      <div className="mm-page">
        <main className="mm-container">
          <h1 className="mm-title">FIND YOUR</h1>
          <section className="mm-hero" aria-label="Transfer path hero">
            <div className="mm-hero-content">
              <div>
                <h2>TRANSFER PATH</h2>
                <p>
                  Choose your current institution, your target institution, and the target program you want to transfer into.
                </p>
              </div>
            </div>
          </section>

          <section style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
            <div className="mm-grid">
              <div className="mm-card">
                <h5>Current Institution</h5>
                <input
                  id="currentInstitutionAutocomplete"
                  className="mm-input"
                  list="currentInstitutionDatalist"
                  value={currentInstitutionQuery}
                  onChange={(e) => setCurrentInstitutionQuery(e.target.value)}
                  onBlur={(e) => resolveCurrentInstitution(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      resolveCurrentInstitution((e.target as HTMLInputElement).value)
                    }
                  }}
                  placeholder=" "
                  autoComplete="off"
                />
                <datalist id="currentInstitutionDatalist">
                  {currentInstitutionItems.map((item) => (
                    <option key={item.value} value={item.display} />
                  ))}
                </datalist>

                <h5 style={{ marginTop: 12 }}>Current Program</h5>
                <input className="mm-input" type="text" placeholder=" " disabled />
              </div>

              <div className="mm-arrow">→</div>

              <div className="mm-card">
                <h5>Target Institution</h5>
                <select id="targetInstitutionSelect" className="mm-input" value={targetInstitutionId} disabled>
                  <option value="__roosevelt__">Roosevelt University</option>
                </select>

                <h5 style={{ marginTop: 12 }}>Target Program</h5>
                <input
                  id="targetProgramAutocomplete"
                  className="mm-input"
                  list="targetProgramDatalist"
                  value={targetProgramQuery}
                  onChange={(e) => setTargetProgramQuery(e.target.value)}
                  onBlur={(e) => resolveTargetProgram(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      resolveTargetProgram((e.target as HTMLInputElement).value)
                    }
                  }}
                  placeholder=" "
                  autoComplete="off"
                  disabled={loadingPrograms || programs.length === 0}
                />
                <datalist id="targetProgramDatalist">
                  {targetProgramItems.map((item) => (
                    <option key={item.value} value={item.display} />
                  ))}
                </datalist>

                <div className="mm-bottom">
                  <button id="confirmSelectionBtn" className="mm-cta" onClick={handleConfirmSelection} disabled={!canConfirm}>
                    Confirm Transfer Goal
                  </button>
                  <div id="selectionSummary" className="mm-summary">{selectionSummary}</div>
                </div>
              </div>
            </div>
          </section>

          <footer className="mm-footer">
            <div>© 2026 Transfer Credit Match. All rights reserved.</div>
          </footer>
        </main>
      </div>
    </>
  )
}

export default InstitutionsPage
