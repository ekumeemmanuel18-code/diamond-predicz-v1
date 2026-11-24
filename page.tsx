import { Activity, BarChart3, CalendarDays, ChevronRight, CircleDot, Gem, Globe2, LayoutDashboard, Search, ShieldCheck, Target, Trophy } from "lucide-react";
import { demoMatches } from "@/lib/matches";
import { predictMatch } from "@/lib/prediction";

const nav = [
  ["Overview", LayoutDashboard], ["Matches", CalendarDays], ["Match Lab", Target],
  ["Live Centre", Activity], ["Countries & Leagues", Globe2], ["Rollover", BarChart3]
] as const;

export default function Home() {
  return (
    <main className="shell">
      <aside className="sidebar">
        <a className="brand" href="#"><span className="brand-gem">◆</span><span>DIAMOND<small>PREDICZ</small></span></a>
        <div className="nav-label">WORKSPACE</div>
        {nav.map(([label, Icon], i) => <a className={`nav-item ${i===0?"active":""}`} href="#" key={label}><Icon size={18}/><span>{label}</span>{i===0 && <i/>}</a>)}
        <div className="sidebar-bottom"><div className="status-dot"/> Platform foundation <span>v1.0</span></div>
      </aside>

      <section className="main">
        <header className="topbar">
          <div className="mobile-brand"><span>◆</span> DIAMOND PREDICZ</div>
          <div className="crumb">Football intelligence <b>/</b> Overview</div>
          <div className="top-actions"><button className="icon-button" aria-label="Search"><Search size={18}/></button><div className="avatar">DP</div></div>
        </header>

        <section className="welcome">
          <div><div className="eyebrow"><span className="live-pulse"/> THE DATA-DRIVEN GAME</div><h1>See the game<br/><em>before it happens.</em></h1><p>Football statistics, probability models and match intelligence — brought together in one place.</p></div>
          <div className="hero-mark"><div className="diamond-large">◆</div><div className="orbit orbit-one"/><div className="orbit orbit-two"/><span>INTELLIGENCE<br/>ENGINE</span></div>
        </section>

        <div className="section-heading"><div><span className="eyebrow">YOUR CONTROL CENTRE</span><h2>Today's overview</h2></div><span className="date-pill"><CalendarDays size={14}/> Match data preview</span></div>
        <div className="stat-grid">
          <Stat icon={<CalendarDays/>} label="Scheduled matches" value="—" note="Connect a football data API"/>
          <Stat icon={<Activity/>} label="Live matches" value="—" note="Live feed not connected"/>
          <Stat icon={<Target/>} label="Model predictions" value="Demo" note="Poisson engine included"/>
          <Stat icon={<ShieldCheck/>} label="Data integrity" value="Protected" note="No fabricated live data"/>
        </div>

        <div className="section-heading match-heading"><div><span className="eyebrow">MATCH CENTRE</span><h2>Featured fixtures</h2></div><button className="text-button">View all <ChevronRight size={16}/></button></div>
        <div className="notice"><CircleDot size={16}/><span><b>Demo preview:</b> these example fixtures are illustrative only. Connect API-Football before using real match data or publishing predictions.</span></div>
        <div className="match-list">
          {demoMatches.map((match) => {
            const prediction = predictMatch(match.homeGoals, match.awayGoals);
            return <article className="match-card" key={match.id}>
              <div className="match-meta"><span>{match.competition}</span><span>{match.kickoff} · {match.status}</span></div>
              <div className="match-body">
                <div className="teams"><div className="team"><span className="team-badge">{match.home.slice(0,1)}</span><b>{match.home}</b></div><div className="team"><span className="team-badge">{match.away.slice(0,1)}</span><b>{match.away}</b></div></div>
                <div className="prediction-box"><span className="prediction-label">MODEL 1X2</span><div className="probabilities"><span><b>{prediction.homeWin}%</b><small>HOME</small></span><span><b>{prediction.draw}%</b><small>DRAW</small></span><span><b>{prediction.awayWin}%</b><small>AWAY</small></span></div></div>
                <div className="score-box"><span>TOP SCORE</span><strong>{prediction.correctScore}</strong><small>Illustrative model output</small></div>
              </div>
              <div className="match-footer"><span><Trophy size={13}/> {match.region}</span><span>Expected goals: {match.homeGoals.toFixed(1)} – {match.awayGoals.toFixed(1)}</span><button aria-label={`Analyze ${match.home} versus ${match.away}`}>Analysis <ChevronRight size={14}/></button></div>
            </article>
          })}
        </div>
        <footer><span>◆ DIAMOND PREDICZ</span><span>Probability is not certainty. Predictions are analytical estimates, never guarantees.</span></footer>
      </section>
    </main>
  );
}

function Stat({icon,label,value,note}:{icon:React.ReactNode,label:string,value:string,note:string}) {
  return <div className="stat-card"><div className="stat-icon">{icon}</div><div><span>{label}</span><strong>{value}</strong><small>{note}</small></div></div>;
}
