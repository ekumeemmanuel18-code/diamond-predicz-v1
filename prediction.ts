/**
 * Independent Poisson model utility.
 * Inputs are expected goals (lambda) for home and away teams, not raw scores.
 * Outputs 1X2 probabilities normalized to 100% and the most likely scoreline
 * in the 0..6 goal grid. This is a baseline model, not a trained AI model.
 */
function factorial(n: number): number {
  let result = 1;
  for (let i = 2; i <= n; i++) result *= i;
  return result;
}
function poisson(lambda: number, goals: number): number {
  return (Math.exp(-lambda) * Math.pow(lambda, goals)) / factorial(goals);
}
export function predictMatch(homeXg: number, awayXg: number) {
  if (!Number.isFinite(homeXg) || !Number.isFinite(awayXg) || homeXg < 0 || awayXg < 0) {
    throw new Error("Expected goals must be finite non-negative numbers.");
  }
  const maxGoals = 8;
  const home = Array.from({length:maxGoals+1},(_,i)=>poisson(homeXg,i));
  const away = Array.from({length:maxGoals+1},(_,i)=>poisson(awayXg,i));
  let h=0,d=0,a=0,best=-1,score=[0,0];
  for(let i=0;i<=maxGoals;i++) for(let j=0;j<=maxGoals;j++) {
    const p=home[i]*away[j];
    if(i>j) h+=p; else if(i===j) d+=p; else a+=p;
    if(p>best){best=p;score=[i,j];}
  }
  const total=h+d+a;
  const pct=(v:number)=>Math.round((v/total)*100);
  const hp=pct(h), dp=pct(d);
  return {homeWin:hp,draw:dp,awayWin:100-hp-dp,correctScore:`${score[0]}–${score[1]}`};
}
