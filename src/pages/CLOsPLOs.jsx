import { useState, useEffect, useMemo, useCallback } from 'react';
import { api } from '../data/api';
import Loader from '../components/Loader';

const domainColors = {
  Cognitive: { bg: '#e0f2fe', text: '#0369a1', border: '#7dd3fc' },
  Psychomotor: { bg: '#d1fae5', text: '#047857', border: '#6ee7b7' },
  Affective: { bg: '#fef3c7', text: '#92400e', border: '#fcd34d' },
};

export default function CLOsPLOs() {
  const [subjects, setSubjects] = useState([]);
  const [activeSubject, setActiveSubject] = useState('');
  const [mapping, setMapping] = useState(null);
  const [allPLOs, setAllPLOs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('clos');

  useEffect(() => {
    Promise.all([api.getSubjects(), api.getPLOs()]).then(([subs, ploList]) => {
      setSubjects(subs);
      setAllPLOs(ploList);
      if (subs.length > 0) setActiveSubject(subs[0].id);
    });
  }, []);

  const loadMapping = useCallback(async (subjectId) => {
    if (!subjectId) return;
    setLoading(true);
    try {
      const data = await api.getCLOPLOMapping(subjectId);
      setMapping(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadMapping(activeSubject);
  }, [activeSubject, loadMapping]);

  const mappingMatrix = useMemo(() => {
    if (!mapping) return null;
    return mapping.clos.map(clo => ({
      ...clo,
      ploMap: allPLOs.map(plo => clo.mappedPLOs.includes(plo.id)),
    }));
  }, [mapping, allPLOs]);

  const plosCoverage = useMemo(() => {
    if (!mapping) return {};
    const coverage = {};
    for (const plo of allPLOs) {
      coverage[plo.id] = mapping.clos.filter(c => c.mappedPLOs.includes(plo.id)).length;
    }
    return coverage;
  }, [mapping, allPLOs]);

  return (
    <div className="clo-plo-page">
      <div className="page-header">
        <h1>CLOs & PLOs</h1>
        <p>Course Learning Outcomes mapped to Program Learning Outcomes</p>
      </div>

      <div className="clo-tabs-row">
        <button
          className={`clo-main-tab ${activeTab === 'clos' ? 'active' : ''}`}
          onClick={() => setActiveTab('clos')}
        >
          CLO Details
        </button>
        <button
          className={`clo-main-tab ${activeTab === 'mapping' ? 'active' : ''}`}
          onClick={() => setActiveTab('mapping')}
        >
          CLO-PLO Mapping
        </button>
        <button
          className={`clo-main-tab ${activeTab === 'plos' ? 'active' : ''}`}
          onClick={() => setActiveTab('plos')}
        >
          PLO Overview
        </button>
      </div>

      {(activeTab === 'clos' || activeTab === 'mapping') && (
        <div className="class-tabs">
          {subjects.map(s => (
            <button
              key={s.id}
              className={`class-tab ${activeSubject === s.id ? 'active' : ''}`}
              onClick={() => setActiveSubject(s.id)}
            >
              {s.name}
            </button>
          ))}
        </div>
      )}

      {loading && <Loader text="Loading CLO/PLO data..." />}

      {!loading && activeTab === 'clos' && mapping && (
        <div className="clo-cards">
          <div className="clo-subject-header">
            <h2>{mapping.subject?.name}</h2>
            <span className="clo-subject-code">{mapping.subject?.code}</span>
            <span className="clo-count">{mapping.clos.length} CLOs</span>
          </div>

          {mapping.clos.map(clo => {
            const dColor = domainColors[clo.domain] || domainColors.Cognitive;
            return (
              <div key={clo.id} className="card clo-card">
                <div className="clo-card-top">
                  <div className="clo-card-header">
                    <span className="clo-code-badge">{clo.code}</span>
                    <h3>{clo.title}</h3>
                  </div>
                  <div className="clo-card-badges">
                    <span
                      className="clo-domain-badge"
                      style={{ background: dColor.bg, color: dColor.text, borderColor: dColor.border }}
                    >
                      {clo.domain}
                    </span>
                    <span className="clo-level-badge">Level {clo.level}</span>
                  </div>
                </div>
                <p className="clo-description">{clo.description}</p>
                <div className="clo-mapped-plos">
                  <span className="clo-mapped-label">Mapped PLOs:</span>
                  {clo.ploDetails.map(plo => (
                    <span key={plo.id} className="clo-plo-chip" title={plo.description}>
                      {plo.code} — {plo.title}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}

          {mapping.clos.length === 0 && (
            <div className="empty-state"><p>No CLOs defined for this subject.</p></div>
          )}
        </div>
      )}

      {!loading && activeTab === 'mapping' && mapping && mappingMatrix && (
        <div className="card">
          <div className="card-header">
            <h2>CLO-PLO Mapping Matrix — {mapping.subject?.name}</h2>
          </div>
          <div className="card-body table-responsive">
            <table className="mapping-table">
              <thead>
                <tr>
                  <th className="mapping-corner">CLO / PLO</th>
                  {allPLOs.map(plo => (
                    <th key={plo.id} className="mapping-plo-header" title={plo.description}>
                      {plo.code}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {mappingMatrix.map(clo => (
                  <tr key={clo.id}>
                    <td className="mapping-clo-cell">
                      <strong>{clo.code}</strong>
                      <span>{clo.title}</span>
                    </td>
                    {clo.ploMap.map((mapped, i) => (
                      <td key={i} className={`mapping-cell ${mapped ? 'mapped' : ''}`}>
                        {mapped && (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                            <path d="M5 12l5 5L20 7" />
                          </svg>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr className="mapping-coverage-row">
                  <td className="mapping-clo-cell"><strong>Coverage</strong></td>
                  {allPLOs.map(plo => (
                    <td key={plo.id} className="mapping-coverage-cell">
                      {plosCoverage[plo.id] || 0}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {!loading && activeTab === 'plos' && (
        <div className="plo-overview">
          <div className="plo-grid">
            {allPLOs.map(plo => (
              <div key={plo.id} className="card plo-card">
                <div className="plo-card-header">
                  <span className="plo-code">{plo.code}</span>
                  <h3>{plo.title}</h3>
                </div>
                <p className="plo-description">{plo.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
